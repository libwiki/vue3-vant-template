import {canSetParams} from "@/utils/helpers";
import _ from "lodash";
import request from '../utils/net';
import {AxiosRequestConfig} from "axios";
import Configs from "@/config/Configs";

export interface IApiResult<D = any> {
    data: D
    message: string
    result: boolean
    resultCode: string

}

/**
 * 泛型说明：
 *  1、 T:请求参数
 *  1、 D:实际返回的data属性的值类型
 */
export class HttpProxy {
    private readonly config: AxiosRequestConfig;

    constructor(config: AxiosRequestConfig = {}) {
        this.config = config
    }

    getConfigs(configs: AxiosRequestConfig = {}) {
        return _.cloneDeep({
            ...this.config,
            ...(configs || {})
        })
    }

    put<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return request.put<T, IApiResult<D>>(url, data, this.getConfigs(configs));
    }

    post<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return request.post<T, IApiResult<D>>(url, data, this.getConfigs(configs));
    }

    patch<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return request.patch<T, IApiResult<D>>(url, data, this.getConfigs(configs));
    }

    get<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return this.request<T, D>(url, 'get', data, configs);
    }

    head<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return this.request<T, D>(url, 'head', data, configs);
    }

    delete<T = any, D = any>(url: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        return this.request<T, D>(url, 'delete', data, configs);
    }

    request<T extends any, D = any>(url: string, method: string, data?: T, configs: AxiosRequestConfig<D> = {}): Promise<IApiResult<D>> {
        const can = canSetParams(method);
        return request.request<T, IApiResult<D>>({
            url,
            method,
            data: can ? {} : data,
            params: can ? data : {},
            ...this.getConfigs(configs),
        });
    }

}


// 例：请求其他JSONHttp api的一个例子
export const Http = new HttpProxy()

export const JsonHttp = new HttpProxy({
    baseURL: `${Configs.baseUrl}/json`,
})
