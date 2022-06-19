import Http from "../Http";

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
