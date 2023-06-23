import 'vue-router'

export {}
declare global {
    declare module '*.js';

    interface Window {
        _configs: any;
    }

    // 为第三方js库Demo编写声明示例
    // declare module 'Demo' {
    //     const Demo: any;
    //     export default Demo
    // }
}

// 路由元信息扩展
declare module 'vue-router' {
    interface RouteMeta {
        title?: string, // 标题栏
        hideNavbar?: boolean, // 隐藏标题栏
        tabBar?: boolean, // 是否显示底部导航
        keepAlive?: boolean, // 是否缓存
        refresh?: boolean, // 开启下拉刷新
        showBack?: boolean, // 顶部导航栏是否显示返回按钮
        noToken?: true, // 无需登录验证的界面
        pageStyle?: Partial<any>, // 页面默认样式
        pageBgColor?: string, // 页面背景色（会覆盖pageStyle的backgroundColor）
    }
}

