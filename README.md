## Vue3 + typescript + VantUI移动端基础模板

> js版本请查看项目的js分支

### 在线预览地址

<a target="_blank" href="https://libwiki.github.io/vue3-vant-template/">https://libwiki.github.io/vue3-vant-template/ </a>

### 主要依赖

* [Vue3文档](https://v3.cn.vuejs.org/)
* [Vant组件库文档](https://vant-contrib.gitee.io/vant/)
* [VueRouter4路由文档](https://router.vuejs.org/zh/)
* [Tailwindcss原子css库文档](https://www.tailwindcss.cn/)
* [Pinia状态管理器参考文档](https://pinia.web3doc.top//)

### 开发启动

```shell
# 依赖安装
npm install

# 复制一份开发环境的env配置
copy .env.development.back .env.development

# 开发环境启动
npm run dev

# 打包编译
npm run build

```

### 推荐启动的IDE与插件

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


### 创建页面 样例参考

* 案例位置：```src/login/```
  ![页面分离样例参考](docs/image/page-demo.png)

### 路由```meta```页面配置说明

> 页面路由的```meta```参数配置均在```App.vue```中使用到，如果需要自定义可自行编辑逻辑

```js
const meta = {
    title: "首页", // 标题栏
    tabbar: true, // 是否显示底部导航
    refresh: true, // 是否开启下拉刷新（开启后还需要页面进行刷新函数处理监听）
    navbar: true, // 是否显示顶部导航
    showBack: true, // 顶部导航栏是否显示返回按钮
    noToken: true, // 无需登录验证的界面
    pageStyle: {}, // 页面默认样式
    pageBgColor, // 页面背景色（会覆盖pageStyle的backgroundColor）
}
```

### 如何开启页面的下拉刷新功能

* 1、设置路由meta的refresh选择为true
* 2、在页面中监听处理下拉刷新事件
  * 注：事件通知由```rxjs```进行调度处理

```js
import {useRefresh} from "@/hooks/useRefresh";

const refreshHelper = useRefresh();

refreshHelper.onRefresh(v => { // 监听处理页面的下拉刷新事件
  console.log('下拉刷新触发')
  refreshHelper.toggleLoading(false) // 关闭下拉刷新动画
})
```

### 基础配置文件与导航菜单配置

* 1、```src/config/Configs.ts```为项目全局基础配置，项目中将直接引用该文件。配置的上游数据来源于项目根目录下的```.env.*```
* 2、```src/config/TabbarConfig.ts```为项目的底部导航栏菜单的名称与图标配置（是否开启导航需要配合路由文件的```meta.tabbar使用```）

### axios网络请求库的两次封装

* 1、```src/utils/net.ts```文件主要为```axios```的实例创建以及前置、后置处理
* 2、```src/api/Http.ts```文件为```axios```实例的易用性封装（实际进行网络请求会直接使用该模块）
* 3、网络库的具体使用案例请参考：```src/api/modules/User.ts````

### 用户登录登录后的token、登录信息等相关存贮处理

* 1、用户的token存贮逻辑位于```src/utils/AuthHelpers.ts```文件中
* 2、其中```AuthHelpers.ts syncUserinfo()```方法是将```localStorage```的用户信息同步到```store```中，在```App.vue```
  中调用，故如果用户登录成功则```store```（```src/store/userStore.ts```）中即可获取到用户信息，无须从```localStorage```取。
* 3、```Pinia```状态管理器的用法参考上面的用户信息的处理，存值参考参考：```src/utils/AuthHelpers.ts syncUserinfo()```方法。


### vw适配说明
* [rem布局适配是什么？](https://www.jianshu.com/p/8feec432c01a)
* 项目使用vw进行移动端的布局大小适配，项目中书写的css中```px```单位的值将自动转换为```vw```，（具体的转换配置参考：```postcss.config.js```）
* ```px => vw```的转换倍数 参考：```src/utils/flexible.js```
* 其中不同的设计稿宽度和项目最大视口均可在```design.config.js```中进行配置
  * ```designWidth``` 设计稿宽度
  * ```maxViewPort``` 最大视口宽度（当使用pc端访问项目页面时，每一个页面的最大宽度，保证在pc的视觉问题）
  * ```pxToVw``` js中进行像素转换为vw时应用（注：为保证项目模块的统一，该函数会引用至```src/utils/helpers.ts px2vw()```，故在项目中需要动态的进行像素转换vw是请使用此处的助手函数）
  * ```pxToVw``` 项目中使用了```tailwindcss```由于设计稿宽度可能不同，会导致```tailwindcss```默认提供的vw值与项目中的值不一致，故提供了该助手函数进行将```tailwindcss```中的vw转换为项目对应的设计稿的vw，具体用法参考```tailwind.config.js```(注：项目中需要使用到同```px2vw()```)

### 关于Tailwindcss原子css库的配置说明
* 项目中的配置请查看：```tailwind.config.js```文件
* 项目中使用的```spacing```与```tailwindcss```的官方有所区别，使用了```0~96px => vw```的数值。（需要改动可自行配置即可）
* 注：项目中页面如果发现```Tailwindcss```无效问题，只需要在```style```区块中提供任意的css即可，例：```.t{}```


### 关于全局less的使用
* 项目在使用```Tailwindcss```的同时依然支持```less```,```vite.config.js css.preprocessorOptions```中自动引入了```src/styles/index.less```文件
* 故如果需要设置任何全局样式，或者使用```less 变量```，在上述文件中设置 即可。页面中可直接使用

### 内置的hooks说明```src/hooks/```

* ```usePageMeta```分页参数处理
* ```useSimpleFormMeta```简单的表单数据，仅仅实现了重置功能
* ```useFormMeta```繁杂的表单数据处理钩子，实现了重置、验证、弹框开关功能
* ```useCountDown```倒计时功能） 
