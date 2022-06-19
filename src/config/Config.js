// 这里的env可以自动渠道.env.*文件的值
// 本地开发环境取 .env.development文件
// 正式打包环境取 .env.production文件
// 在生产环境中，这些环境变量会在构建时被静态替换。例：动态 key 取值 import.meta.env[key] 是无效的。
// https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement
const isDev = import.meta.env.DEV;


function getBaseUrl() {
    if (isDev) { // 测试环境取配置的api_host
        return import.meta.env.VITE_API_HOST || '/';
    }
    // 正式环境取部署的域名地址
    const l = window.location;
    return `${l.protocol}//${l.host}/`
}

// 配置信息
export default {
    isDev, // 是否开发环境
    debug: import.meta.env.VITE_DEBUG || false, // 是否开启debug (暂未使用)
    baseUrl: getBaseUrl(), // 请求的服务器api接口基础url
    wxAppId: import.meta.env.VITE_WX_APP_ID, // 微信公众号appId
    version: import.meta.env.VITE_VERSION || '1.0.0', // 当前版本号（暂未有实际用处）
    siteName: import.meta.env.VITE_SITE_NAME || 'vue3-vant-template', // 当前网站名称
    homeRouteName: import.meta.env.VITE_HOME_NAME || 'home', // 首页的路由名称
    loginRouteName: import.meta.env.VITE_LOGIN_NAME || 'login', // 登录页的路由名称
};
