/**
 * @name: 表单组件属性
 * @author: itmobai
 * @date: 2023-08-02 13:36
 * @description：表单组件属性
 * @update: 2023-08-02 13:36
 */
import type { CommonColumn } from "../../../types/common";
export interface FormProps {
  /**
   * 表单数据
   */
  modelValue: any;
  /**
   * 表单label宽度
   */
  labelWidth: string | number;
  /**
   * 表单项
   */
  column: CommonColumn[];
}