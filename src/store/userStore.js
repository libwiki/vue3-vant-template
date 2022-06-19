import {defineStore} from "pinia";

// 用户登录信息
export const useUserInfoStore = defineStore("userInfo", {
    state() {
        return {
            token: "",
            userInfo: {
                id: 0,
                nickname: "",
                sex: "male",
                token: "",
                refreshToken: "",
            },
        }
    }
})
