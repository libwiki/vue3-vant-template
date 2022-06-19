import request from '../utils/net';
import {canSetParams} from "../utils/helpers";

/**
 * Axios请求的进一步封装（目的是为了快捷使用）
 * Es5的类的写法 ：
 * 1、主要是为了方便使用 ，以类的形势使用： (new Http('api','get')） 或者 直接以函数的形势使用 Http('api','get')
 * 2、既他是一个类也是一个函数 ，类的用法就可以扩展静态方法。函数的形势又可以直接快捷调用
 * @param url 请求的接口地址
 * @param method 使用的http方法 get、post等
 * @param data 传递的数据（请求参数）
 * @param config 额外的配置信息（请求头等）
 * @returns {AxiosPromise<any>}
 * @constructor
 */
const Http = function (url, method, data = {}, config = {}) {
    const can = canSetParams(method);
    return request({
        url,
        method,
        data: can ? {} : data,
        params: can ? data : {},
        ...config,
    });
};
// Es5的静态类方法的写法
Http.put = request.put;
Http.post = request.post;
Http.patch = request.patch;
Http.options = request.patch;
Http.get = (url, data = {}, config = {}) => Http(url, 'get', data, config);
Http.head = (url, data = {}, config = {}) => Http(url, 'head', data, config);
Http.delete = (url, data = {}, config = {}) => Http(url, 'delete', data, config);

export default Http;
