import Main from "../layouts/Main.vue"

const pageBgColor = "#f8f8f8"; // 默认的页面底色
export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: "登录", // 标题栏
            noToken: true, // 无需登录验证的界面
            pageBgColor, // 页面背景色（会覆盖pageStyle的backgroundColor）

        },
        component: () => import('../views/login/Login.vue'),
    },
    {
        path: '/',
        component: Main,
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: "首页", // 标题栏
                    tabbar: true, // 是否显示底部导航
                    refresh: true, // 是否开启下拉刷新（开启后还需要页面进行刷新函数处理监听）
                    // navbar: true, // 是否显示顶部导航
                    // showBack: true, // 顶部导航栏是否显示返回按钮
                    // noToken: true, // 无需登录验证的界面
                    // pageStyle:{}, // 页面默认样式
                    // pageBgColor, // 页面背景色（会覆盖pageStyle的backgroundColor）

                },
                component: () => import('../views/home/Home.vue'),
            },

        ],
    },
    {
        path: '/_cate',
        component: Main,
        redirect: "/category",
        children: [
            {
                path: '/category',
                name: 'category',
                meta: {
                    title: "分类", // 标题栏
                    tabbar: true, // 是否显示底部导航
                    refresh: true, // 开启下拉刷新
                    pageBgColor, // 页面背景色

                },
                component: () => import('../views/category/Category.vue'),
            },

        ],
    },
    {
        path: '/_mine',
        component: Main,
        redirect: "/mine",
        children: [
            {
                path: '/mine',
                name: 'mine',
                meta: {
                    title: "我的", // 标题栏
                    tabbar: true, // 是否显示底部导航
                    refresh: true, // 开启下拉刷新
                    pageBgColor, // 页面背景色

                },
                component: () => import('../views/mine/Mine.vue'),
            },
            {
                path: '/coupons',
                name: 'coupons',
                meta: {
                    title: "我的卡包", // 标题栏
                    refresh: true, // 开启下拉刷新
                    navbar: true, // 是否显示顶部导航
                    showBack: true, // 顶部导航栏是否显示返回按钮
                    pageBgColor, // 页面背景色

                },
                component: () => import('../views/mine/coupons/Coupons.vue'),
            },

        ],
    },
]
