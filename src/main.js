import { createApp } from 'vue'
import "@/styles/index.scss"
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import '@/common/style/elementReset.scss';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import "@/common/style/global.scss"
import App from './App.vue'
import router from './router'
const app  =  createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  });
app.use(router).mount('#app')
