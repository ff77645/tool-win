import { createApp } from "vue";
import ElementPlus from 'element-plus'
import './styles/tailwind.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from "./App.vue";
import router from './router/index.js'

createApp(App)
.use(router)
.use(ElementPlus)
.mount("#app")
.$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
