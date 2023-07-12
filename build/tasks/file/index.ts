/**
 * @name: index
 * @author: itmobai
 * @date: 2023-07-11 16:45
 * @description：index
 * @update: 2023-07-11 16:45
 */
import { readFile, writeFile, copyFile } from "fs/promises";
import {buildRoot, pkgRoot} from "../../utils/paths"

export const copyFiles = async (projectNo: string) => {
  let packageJSON: any = await readFile(`${pkgRoot}/${projectNo}/package.json`, {encoding: "utf-8"})
  packageJSON = JSON.parse(packageJSON);
  packageJSON.name = `whitemo-crud-${projectNo}`
  await writeFile(`${buildRoot}/${projectNo}/package.json`, JSON.stringify(packageJSON, null, 2), {encoding: "utf-8"})
  // 复制global.d.ts
  await copyFile(`${pkgRoot}/${projectNo}/global.d.ts`, `${buildRoot}/${projectNo}/global.d.ts`)
}
