import {createApp} from 'vue'
import App from './App.vue'
import Vant, {Dialog, Toast} from 'vant';
import "./styles/preflight.css"
import 'vant/lib/index.css';
import router from './router'
import {createPinia} from 'pinia'
import mitt from "mitt";
import "./styles/tailwind.index.css"
// 简单事件处理
// 文档参考：https://github.com/developit/mitt
window.emitter = mitt();


const app = createApp(App)
app.use(Vant);
app.use(router); // 使用 路由 文档参考：https://next.router.vuejs.org/zh/introduction.html
app.use(createPinia()); // 状态管理器 文档参考：https://pinia.web3doc.top/
app.mount('#app')
