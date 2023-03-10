import {Http} from "../Http";

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
    loginByWxCode(code:string) {
        return Http.post<string, IUserLoginResult>('/login/oauth/loginByWxCode', code)
    }
}

export interface IUserLoginFormData { // 登录参数
    username: string,
    code: string,
}


export interface IUserLoginResult extends IUserInfo { // 登录结果
    token: string
    safety: string
    refreshToken: string
}


export interface IUserInfo { // 用户信息
    id: number
    phone: string
    headImg: string
    name: string
    nickname: string
    sex: EGender
    status: number
    birthday?: string
    isTest?: boolean
}


export enum EGender { // 性别枚举
    male = "male",
    female = "female",
}


