/**
 * @name: 路径管理
 * @author: itmobai
 * @date: 2023-07-09 18:31
 * @description：路径管理
 * @update: 2023-07-09 18:31
 */
import { resolve } from "path"
// 项目主目录
export const projRoot = resolve(__dirname, "../../")
// 打包主目录
export const buildRoot = resolve(projRoot, "dist")
// package根目录
export const pkgRoot = resolve(projRoot, "packages")
