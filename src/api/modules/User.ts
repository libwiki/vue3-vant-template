import {Http} from "../Http";

// 用户登录相关
export default {
    sendCode(params = {}) {
        return Http.post("/login/oauth/sendCode", params)
    },
    loginByCode(params = {}) {
        return Http.post("/login/oauth/loginByCode?", params)
    },
    loginByWxCode(params = {}) {
        return Http.post('/login/oauth/loginByWxCode', params)
    }
}


export interface IUserInfo { // 用户信息
    id: number
    phone: string
    headImg: string
    name: string
    nickname: string
    email: string
    sex: EGender
    status: number
    birthday?: string
    isTest?: boolean
}


export enum EGender { // 性别枚举
    male = "male",
    female = "female",
}


