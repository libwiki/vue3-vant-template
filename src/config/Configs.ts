// 这里的env可以自动渠道.env.*文件的值
// 本地开发环境取 .env.development文件
// 正式打包环境取 .env.production文件
// 在生产环境中，这些环境变量会在构建时被静态替换。例：动态 key 取值 import.meta.env[key] 是无效的。
// https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement
import {IConfigs} from "@/types/configs";
import _ from "lodash";

const isDev = import.meta.env.DEV;


function getBaseUrl() {
    if (isDev) {
        return import.meta.env.VITE_API_HOST || '/';
    }
    const l = window.location;
    return `${l.protocol}//${l.host}/`
}

// 配置信息
const Configs: IConfigs = {
    isDev,
    debug: import.meta.env.VITE_DEBUG || false,
    baseUrl: getBaseUrl(),
    version: import.meta.env.VITE_VERSION || '1.0.0',
    siteName: import.meta.env.VITE_SITE_NAME || 'vue3-system-admin',
    homeRouteName: import.meta.env.VITE_HOME_NAME || 'home',
    loginRouteName: import.meta.env.VITE_LOGIN_NAME || 'login',
};

/**
 * window._configs
 * 1、是为了方便外部注入的配置项目
 * 2、使用此种方式是为了在项目中可以方便的同步使用配置项
 * 3、window._configs具体注入的位置位于public/configs.js
 * 4、index.html 中第一个引入的 js脚本 即是 public/configs.js
 * 5、public/configs.js中的配置会覆盖源码中的配置项
 */
export default _.merge<IConfigs, IConfigs>(Configs, _.cloneDeep(window._configs || {}))