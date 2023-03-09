import cssVars from "*.less?export";

export interface IConfigs {
    isDev: boolean, // 是否开启调试环境
    debug: boolean, // 是否是在开发环境中
    baseUrl: string, // api默认请求的初始网址
    version: string, // 版本号 例：1.0.0
    siteName: string, // 网站名称
    homeRouteName: string, // 登录成功后默认的跳转的首页路由名称
    loginRouteName: string, // 注销后默认的跳转的登录页面的路由名称
}