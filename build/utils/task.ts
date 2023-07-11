/**
 * @name: task
 * @author: itmobai
 * @date: 2023-07-09 18:40
 * @description：task
 * @update: 2023-07-09 18:40
 */
import {TaskFunction} from "gulp";

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })
