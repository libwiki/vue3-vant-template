import request from '../utils/net';
import {canSetParams} from "../utils/helpers";
import _ from "lodash";

export class HttpProxy {
    constructor(config = {}) {
        this.config = config
    }

    getConfigs(configs = {}) {
        return _.cloneDeep({
            ...this.config,
            ...(configs || {})
        })
    }

    put(url, data = {}, configs = {}) {
        return request.put(url, data, this.getConfigs(configs));
    }

    post(url, data = {}, configs = {}) {
        return request.post(url, data, this.getConfigs(configs));
    }

    patch(url, data = {}, configs = {}) {
        return request.patch(url, data, this.getConfigs(configs));
    }

    options(url, data = {}, configs = {}) {
        return this.request(url, 'options', data, configs);
    }

    get(url, data = {}, configs = {}) {
        return this.request(url, 'get', data, configs);
    }

    head(url, data = {}, configs = {}) {
        return this.request(url, 'head', data, configs);
    }

    delete(url, data = {}, configs = {}) {
        return this.request(url, 'delete', data, configs);
    }

    request(url, method, data = {}, configs = {}) {
        const can = canSetParams(method);
        return request({
            url,
            method,
            data: can ? {} : data,
            params: can ? data : {},
            ...this.getConfigs(configs),
        });
    }
}

export const Http = new HttpProxy({})
// 例：请求其他json api的一个例子
export const JsonHttp = new HttpProxy({
    baseURL: "http://localhost:8080/json/"
})
