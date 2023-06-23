import {defineStore} from "pinia";
import {reactive} from "vue";
import {EGender, IUserInfo} from "@/api/modules/User";
import AuthHelpers from "@/utils/AuthHelpers";

// 用户登录信息

export const useUserStore = defineStore("userInfo", () => {
    const userinfo = reactive<IUserStore>({
        token: "",
        refreshToken: "",
        info: {
            id: 0,
            phone: "",
            headImg: "",
            name: "",
            nickname: "",
            sex: EGender.male,
            status: 1,
        }
    });


    return {
        userinfo,
        isLogin() {
            return userinfo.token.length > 0 || AuthHelpers.getToken()
        },
        setToken(token: string) {
            userinfo.token = token;
        },
        setRefreshToken(token: string) {
            userinfo.refreshToken = token;
        },
        setUserinfo(data: IUserInfo) {
            userinfo.info = data;
        }
    }
});

interface IUserStore {
    token: string
    refreshToken: string
    info: IUserInfo
}