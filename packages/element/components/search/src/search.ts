/**
 * @name: search
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：search
 * @update: 2023-07-09 11:27
 */
import {CommonColumn} from "../../../types/common";
import { Size } from "../../../types/size";

export interface SearchProps extends Size {
  /**
   * 搜索参数
   */
  modelValue: any;
  /**
   * 搜索项
   */
  column: CommonColumn[];
  /**
   * 搜索label宽度
   */
  labelWidth: string | number;
}
