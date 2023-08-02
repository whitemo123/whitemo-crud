/**
 * @name: 表单组件入口
 * @author: itmobai
 * @date: 2023-08-02 13:36
 * @description：表单组件入口
 * @update: 2023-08-02 13:36
 */
import { withInstall } from "@whitemo-crud/utils";

import _Form from "./src/form.vue";
export const Form = withInstall(_Form)
export * from "./src/form"
export default Form
