## Vue3 + VantUI移动端基础模板

### 在线预览地址

<a target="_blank" href="https://libwiki.github.io/vue3-vant-template/">https://libwiki.github.io/vue3-vant-template/</a>

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
    * 注1：其中 ```window.emitter```对象有```mitt```库提供。具体注册位置在```main.js```文件中
    * 注2：```EventsEnum.onRefresh```下拉刷新事件在```App.vue```中触发

```js
import {EventsEnum} from "@/events/EventsEnum";
import {useRefreshStore} from "@/store/refreshStore";
import {onMounted, onUnmounted} from "vue";

const refreshStore = useRefreshStore()
onMounted(() => { // 页面渲染时进行事件监听
    window.emitter.on(EventsEnum.onRefresh, () => {
        console.log('下拉刷新触发')
        refreshStore.loading = false; // 关闭下拉刷新动画
    }); // 监听处理页面的下拉刷新事件
})

onUnmounted(() => { // 离开页面时移除事件监听
    window.emitter.off(EventsEnum.onRefresh)
})
```

### 基础配置文件与导航菜单配置

* 1、```src/config/Config.js```为项目全局基础配置，项目中将直接引用该文件。配置的上游数据来源于项目根目录下的```.env.*```
* 2、```src/config/TabbarConfig.js```为项目的底部导航栏菜单的名称与图标配置（是否开启导航需要配合路由文件的```meta.tabbar使用```）

### axios网络请求库的两次封装

* 1、```src/utils/net.js```文件主要为```axios```的实例创建以及前置、后置处理
* 2、```src/api/Http.js```文件为```axios```实例的易用性封装（实际进行网络请求会直接使用该模块）
* 3、网络库的具体使用案例请参考：```src/api/modules/User.js````

### 用户登录功能hooks参考

* 1、用户登录等相关功能均在```src/hooks/user/useUserLogin.js```文件中处理了（该文件仅是一个hooks使用案例，抛砖引玉，可移除。如果需要使用请完善内部的登录、退出、请求用户信息函数的功能）


### rem适配说明
* [rem布局适配是什么？](https://www.jianshu.com/p/8feec432c01a)
* 项目使用rem进行移动端的布局大小适配，项目中书写的css中```px```单位的值将自动转换为```rem```，（具体的转换配置参考：```postcss.config.js```）
* ```px => rem```的转换倍数 参考：```src/utils/flexible.js```
* 其中不同的设计稿宽度和项目最大视口均可在```design.config.js```中进行配置
  * ```designWidth``` 设计稿宽度
  * ```maxViewPort``` 最大视口宽度（当使用pc端访问项目页面时，每一个页面的最大宽度，保证在pc的视觉问题）
  * ```pxToRem``` js中进行像素转换为rem时应用（注：为保证项目模块的统一，该函数会引用至```src/utils/helpers.js px2rem()```，故在项目中需要动态的进行像素转换rem是请使用此处的助手函数）
  * ```twRem2Rem``` 项目中使用了```tailwindcss```由于设计稿宽度可能不同，会导致```tailwindcss```默认提供的rem值与项目中的值不一致，故提供了该助手函数进行将```tailwindcss```中的rem转换为项目对应的设计稿的rem，具体用法参考```tailwind.config.js```(注：项目中需要使用到同```px2rem()```)

### 关于Tailwindcss原子css库的配置说明
* 项目中的配置请查看：```tailwind.config.js```文件
* 项目中使用的```spacing```与```tailwindcss```的官方有所区别，使用了```0~96px => rem```的数值。（需要改动可自行配置即可）
* 注：项目中页面如果发现```Tailwindcss```无效问题，只需要在```style```区块中提供任意的css即可，例：```.t{}```


### 关于全局less的使用
* 项目在使用```Tailwindcss```的同时依然支持```less```,```vite.config.js css.preprocessorOptions```中自动引入了```src/styles/index.less```文件
* 故如果需要设置任何全局样式，或者使用```less 变量```，在上述文件中设置 即可。页面中可直接使用
