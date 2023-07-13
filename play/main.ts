import { createApp } from "vue";
import App from "./App.vue"

import element from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import crud from "whitemo-crud-element"

const app = createApp(App)
app.use(element,{locale: zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(crud)
app.mount("#app")

