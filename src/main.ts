import {createApp} from 'vue'
import App from './App.vue'
import Vant from 'vant';
import "./styles/preflight.css"
import 'vant/lib/index.css';
import router from './router'
import {createPinia} from 'pinia'
import "./styles/tailwind.index.css"
import {StoreResetPlugin} from "@/store/plugins";


const app = createApp(App)
app.use(Vant);
app.use(router); // 使用 路由 文档参考：https://next.router.vuejs.org/zh/introduction.html
const pinia = createPinia(); // 状态管理器 文档参考：https://pinia.web3doc.top/
pinia.use(StoreResetPlugin)
app.use(pinia);
app.mount('#app')
