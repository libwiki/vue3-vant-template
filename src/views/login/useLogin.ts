import {useSimpleFormMeta} from "@/hooks/useSimpleFormMeta";
import {isEmpty, isPhone} from "@/utils/helpers";
import User, {EGender, IUserLoginFormData} from "@/api/modules/User";
import {useRouter} from "vue-router";
import Config from "@/config/Configs";
import AuthHelpers from "@/utils/AuthHelpers";
import {showToast} from "vant";


/**
 * 登录功能合集
 * 逻辑与页面分离主要是为了减少 ./Login.vue文件的大小
 * 如果逻辑很少也可直接写在./Login.vue中，此处做个样例参考
 * 假设./Login.vue页面同时包含登录、注册功能，则可将注册逻辑另外剖开成另一个合集，每个页面的功能越少，后续维护越方便，则也可创建文件，目录如下
 *
 * src/login{ // 登录、注册页面
 *     hooks{ // 这是逻辑分离文件夹
 *         useLogin.ts
 *         useLogin.ts
 *         useRegister.ts
 *     }
 *     kits{ // 这是页面组件更细化的分离(如果页面过大，则此文件夹为当前登录、注册页面功能独有的组件分块)
 *         Login.vue
 *         Register.vue
 *     }
 *     Index.vue
 * }
 */
export function useLogin() {
    const form = useSimpleFormMeta<IUserLoginFormData>({
        username: "13188888888",
        code: "123456",
    });
    const router = useRouter();

    const formData = form.formData;
    return {
        form,
        formData,
        async sendCode(phone: string) {
            try {
                if (!isPhone(phone)) {
                    throw new Error('请输入正确的手机号码')
                }
                showToast("发送验证码成功");
                return true
            } catch (e) {
                showToast(e.message)
                return false
            }
        },
        // 登录提交
        async login(replace = true) {
            try {
                if (!this.check()) { // 表单验证
                    return
                }
                const params = form.getFormData();
                const data = { // 模拟登录用户信息
                    token: params.username, // 登录用户token
                    refreshToken: params.username, // 用于刷新登录token的token
                    data: {
                        id: 1,
                        phone: params.username,
                        headImg: '',
                        name: params.username,
                        nickname: params.username,
                        sex: EGender.male,
                        status: 1
                    }
                }

                // 存贮用户登录信息
                AuthHelpers.setToken(data.token);
                AuthHelpers.setRefreshToken(data.refreshToken);
                AuthHelpers.setUserinfo(data.data);
                AuthHelpers.syncUserinfo(false); // 同步用户信息到store中
                showToast('登录成功');
                if (replace) { // 跳转首页
                    await router.replace({name: Config.homeRouteName})
                }
                return true;
            } catch (e) {
                showToast(e.message)
            }
            return false;
        },
        // 表单检测
        check() {
            try {
                if (isEmpty(formData.value.username)) {
                    throw new Error("请填写用户名")
                }
                if (isEmpty(formData.value.code)) {
                    throw new Error("请填写验证码")
                }
                return true
            } catch (e) {
                showToast(e.message)
                return false
            }
        },

        /**
         * 微信登录
         * 参考：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
         * @param code {string} 微信网页code
         * @param replace {boolean} 登录成功是否自动跳转首页
         * @returns {Promise<boolean>}
         */
        async wxLogin(code:string, replace = true) {
            try {
                if (isEmpty(code)) {
                    throw new Error("微信登录失败...")
                }
                const res = await User.loginByWxCode(code)
                if (!res.result) {
                    throw new Error(res.message)
                }
                // 存贮用户登录信息
                AuthHelpers.setToken(res.data.token);
                AuthHelpers.setRefreshToken(res.data.refreshToken);
                AuthHelpers.setUserinfo(res.data);
                AuthHelpers.syncUserinfo(false); // 同步用户信息到store中
                showToast('登录成功');
                if (replace) {
                    await router.replace({name: Config.homeRouteName})
                }
                return true;
            } catch (e) {
                showToast(e.message)
            }
            return false;
        }
    }
}