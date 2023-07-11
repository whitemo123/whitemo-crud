/**
 * @name: index
 * @author: itmobai
 * @date: 2023-07-09 19:58
 * @description：index
 * @update: 2023-07-09 19:58
 */
import * as components from "./components"
export * from "./components"
import { App } from "vue"

export default {
  install: (app: App) => {
    for (const c in components) {
      // @ts-ignore
      app.use(components[c]);
    }
  }
}
