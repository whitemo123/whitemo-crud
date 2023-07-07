import { series } from "gulp"
import {rimraf} from "rimraf"
import { projectPath } from "./utils/paths"

const projectNo = process.argv[process.argv.length - 1]

/**
 * 清理打包文件
 * @returns 
 */
export const cleanBuild = () => {
  return rimraf(`${projectPath}/${projectNo}/dist`)
}

export default series(
  async () => cleanBuild()
)