import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import Config from "../config/Configs";
import Configs from "../config/Configs";
import AuthHelpers from "@/utils/AuthHelpers";
import router from "@/router";

// 创建一个 axios请求实例（用于接口的数据请求工具）
const service = axios.create({
    baseURL: Config.baseUrl,
    timeout: 5000,
    // paramsSerializer: {
    //     serialize(params: Record<string, any>) {
    //         return qs.stringify(params, {arrayFormat: 'indices'})
    //     }
    // }
});

// 发送请求的前置处理
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config.params) {
            config.params = {}
        }

        const url = config.url || "";
        config.headers['lang'] = "zh_CN";
        const token = AuthHelpers.getToken();
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        if (url.indexOf('/token/refresh') > -1) { // 刷新token
            const refreshToken = AuthHelpers.getRefreshToken()
            if (refreshToken) {
                config.headers['refreshToken'] = refreshToken;
            }
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
// 是否正在刷新的标记 (当前是否正在等待自动刷新token的接口返回数据)
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式 (用于当token过期时报错请求，自动刷新token成功后重新请求)
let retryRequests: any[] = [];
// 获取到请求后的后置处理
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) { // http状态码===200 成功获取到数据
            if (response.data && response.data.result) { // 接口数据中的data存在并且 服务器操作成功（data.success是服务器自定义的参数）
                return response.data;
            }
            // 操作失败
            return Promise.reject(response.data);
        } else { // 接口请求失败
            return Promise.reject(response.data);
        }
    },
    (error: any) => { // 下列进行token的自动刷新处理（可选）
        const response = error.response || {}
        //如果是刷新token接口请求失败
        if (response.config && response.config.url && response.config.url.indexOf("/token/refresh") !== -1) {
            //清除登录信息 返回登录页面
            AuthHelpers.removeUserInfo()
            router.replace({name: Configs.loginRouteName})
            return Promise.reject(response.data || error);
        } else {
            if (response.status === 401) { // 此处是401时进行token刷新（应该与服务端进行约定好）
                let config = error.config;
                if (!isRefreshing) {
                    isRefreshing = true;
                    return service.post("/token/refresh").then((resp) => {
                        // resp.data={token,refreshToken}
                        // 重新设置token
                        AuthHelpers.setToken(resp.data.token)
                        AuthHelpers.setRefreshToken(resp.data.refreshToken)
                        config.headers["Authorization"] = `Bearer ${resp.data.token}`;
                        // 已经刷新了token，将所有队列中的请求进行重试
                        retryRequests.forEach((cb) => cb());
                        // 重试完清空这个队列
                        retryRequests = [];
                        isRefreshing = false;
                        return service(config);
                    }).finally(() => {
                        isRefreshing = false;
                    });
                } else {
                    // 正在刷新token，返回一个未执行resolve的promise
                    return new Promise(resolve => {
                        retryRequests.push(() => {
                            resolve(service(config));
                        });
                    });
                }
            }
        }
        // 请求阶段报错（比如服务器报错，断网等）
        return Promise.reject(response.data || error);
    }
);

export default service;
