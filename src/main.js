import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'normalize.css'
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from './router/index.js'

createApp(App)
.use(router)
.use(ElementPlus)
.mount("#app")
.$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
