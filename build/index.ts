/**
 * @name: index
 * @author: itmobai
 * @date: 2023-07-09 18:36
 * @description：index
 * @update: 2023-07-09 18:36
 */
import { series, parallel } from "gulp"
import {withTaskName} from "./utils/task";
import {run} from "./utils/process";
import { pkgRoot } from "./utils/paths"
import { buildCss } from "./tasks/css"
import {copyFiles} from "./tasks/file";

// 打包项目
const projectNo = process.argv[process.argv.length - 1]

export default series(
  // 移除打包产物
  withTaskName("clean", () => run(`rimraf dist/${projectNo}`)),
  parallel(
    // 打包css
    withTaskName("build-css", async () => buildCss(projectNo)),
    // 打包ts及组件
    withTaskName("build-component", async () => run(`pnpm run build`, `${pkgRoot}/${projectNo}`))
  ),
  parallel(
    // 复制package.json文件
    withTaskName("copy", async () => copyFiles(projectNo))
  )
)
