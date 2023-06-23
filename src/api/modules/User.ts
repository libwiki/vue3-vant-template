import {Http} from "../Http";
import {IUserLoginFormData, IUserLoginResult} from "@/api/entity/user";

// 用户登录相关
export default {
    login(params: IUserLoginFormData) { // 登录请求
        return Http.post<IUserLoginFormData, IUserLoginResult>(
            '/login',
            params
        )
    },
    sendCode(params = {}) {
        return Http.post("/login/oauth/sendCode", params)
    },
    loginByWxCode(code: string) {
        return Http.post<string, IUserLoginResult>('/login/oauth/loginByWxCode', code)
    }
}

