import { createApp } from "vue";
import App from "./App.vue"

import element from "element-plus"
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import crud from "whitemo-crud-element"

const app = createApp(App)
app.use(element,{locale: zhCn})
app.use(crud)
app.mount("#app")
