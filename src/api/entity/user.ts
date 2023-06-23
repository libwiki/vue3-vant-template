import {EGender} from "@/api/entity/globals";

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


