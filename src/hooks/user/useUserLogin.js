import {isEmpty, isPhone} from "../../utils/helpers";
import Config from "../../config/Config";
import {useRouter} from "vue-router";
import router from "../../router"
import {showToast} from "vant";
import User from "../../api/modules/User";
import {useUserInfoStore} from "../../store/userStore";

const StoreUserInfoKey = 'phone_userinfo'; // 当前登录用户信息存贮的key
const StoreUserTokenKey = 'phone_user_token'; // 当前登录用户token存贮的key
const StoreUserRefreshTokenKey = 'phone_user_refresh_token'; // 当前登录用户RefreshToken存贮的key
const Storage = localStorage; // 用户登录信息使用的storage类型


/**
 * 取localStore中存贮的token
 * @returns {string}
 */
export function getToken() {
    return Storage.getItem(StoreUserTokenKey)
}

/**
 * 保存token到localStore中
 * @param token
 */
export function setToken(token) {
    return Storage.setItem(StoreUserTokenKey, token)
}

/**
 * 保存refreshToken到localStore中
 */
export function setRefreshToken(token) {
    return Storage.setItem(StoreUserRefreshTokenKey, token)
}

/**
 * 取localStore中存贮的refreshToken
 * @returns {string}
 */
export function getRefreshToken() {
    return Storage.getItem(StoreUserRefreshTokenKey)
}

/**
 * 保存用户信息到localStorage中
 * @param userInfo {any|{}}
 */
export function setUserInfoToStorage(userInfo = {}) {
    Storage.setItem(StoreUserInfoKey, JSON.stringify(userInfo))
}

/**
 * 从localStorage中取用户的登录信息
 * @returns {any|{}|{}}
 */
export function getUserInfoWithStorage() {
    try {
        return JSON.parse(Storage.getItem(StoreUserInfoKey)) || {}
    } catch (e) {
        return {}
    }
}

/**
 * 清除登录信息
 * @param {boolean} isReplace 是否需要替换路由 true:清除后会自动调整到登录页面
 */
export function removeUserInfo(isReplace = true) {
    Storage.clear();
    if (isReplace) {
        router.replace({name: Config.loginRouteName})
    }
}

// 用户登录相关的处理函数集合
export function useUserLogin() {
    // 路由实例的获取（路由跳转操作使用）
    const router = useRouter(); // 获取router对象
    const userStore = useUserInfoStore(); // 保存用户登录信息的状态管理器

    /**
     * initUserInfo2Vuex
     * 初始化登录信息
     * 具体的功能：
     * 1、从localStorage中读取登录用户信息
     * 2、将信息保存到状态管理器中 方便后续操作
     * 使用地点：
     * 1、可通过全局搜索 .initUserInfo( 找到使用的位置
     * @param {boolean} checkToken 是否验证token true：验证token，如果没有登录则会自动跳转登录页面，控制台中未登录用户会自动跳转
     */
    async function initUserInfo(checkToken = true) {
        const info = await getUserInfo(checkToken, false); // 获取登录后存贮的用户信息
        saveUserInfo(info)
        return info;
    }


    /**
     * 将用户信息保存到sessionStorage中
     * @param data {any}
     */
    function saveUserInfo(data = {}) {
        // 保存到状态管理器
        userStore.token = data.token;
        userStore.userInfo = data;

        // 保存到localStorage
        setToken(data.token || '');
        setRefreshToken(data.refreshToken || '');
        setUserInfoToStorage(userStore.userInfo || {});
    }

    /**
     * 获取登录用户信息
     * @param checkToken {boolean} true:验证用户登录状态，移除则清除，跳转登录页面
     * @param refresh {boolean} true:重新请求用户信息
     * @returns {Promise<{id: string, avatar: string, isAdmin: (*|boolean), username: string, token: string}>}
     */
    async function getUserInfo(checkToken = true, refresh = false) {
        const token = getToken();
        let info = {};
        if (checkToken && isEmpty(token)) { // 用户信息异常
            removeUserInfo();
            return {}
        } else {
            try { // 从localStorage中获取用户信息
                info = getUserInfoWithStorage();
            } catch (e) {

            }
            if (refresh || isEmpty(info)) { // 重新获取用户信息

            }
            info.token = token;
            info.refreshToken = getRefreshToken();
        }

        return info;
    }

    /**
     * 发送短信验证码
     * @param phone {number} 手机号码
     * @returns {Promise<boolean>}
     */
    async function sendCode(phone) {
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
    }

    /**
     * 用户登录
     * @param username 账号、手机号
     * @param password 密码
     * @param replace 角色
     * @returns {Promise<boolean>}
     */
    async function login(username, password, replace = true) {
        try {
            if (!isPhone(username)) {
                throw new Error("请输入正确的手机号码")
            }
            if (isEmpty(password)) {
                throw new Error("请输入验证码")
            }
            const data = { // 模拟登录用户信息
                token: username, // 登录用户token
                refreshToken: username, // 用于刷新登录token的token
                nickname: username, // 昵称
            }
            saveUserInfo(data)
            showToast('登录成功');
            if (replace) { // 跳转首页
                await router.replace({name: Config.homeRouteName})
            }
            return true;
        } catch (e) {
            showToast(e.message)
        }
        return false;
    }

    /**
     * 微信登录
     * 参考：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
     * @param code {string} 微信网页code
     * @param replace {boolean} 登录成功是否自动跳转首页
     * @returns {Promise<boolean>}
     */
    async function wxLogin(code, replace = true) {
        try {
            if (isEmpty(code)) {
                throw new Error("微信登录失败...")
            }
            const res = await User.loginByWxCode(code)
            if (!res.result) {
                throw new Error(res.message)
            }
            saveUserInfo(res.data || {})
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

    /**
     * 退出登录
     * @param isReplace {boolean} 退出后是否跳转登录页面
     * @returns {Promise<void>}
     */
    async function logout(isReplace = true) {
        try {
            // 模拟退出
            // const res = await User.logout();
            removeUserInfo(isReplace);
        } catch (e) {
            showToast(e.message);
            removeUserInfo(isReplace);
        }
    }

    // 返回集合方法
    return {
        login,
        wxLogin,
        sendCode,
        logout,
        getUserInfo,
        initUserInfo,
        removeUserInfo,
    }

}
