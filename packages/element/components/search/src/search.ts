/**
 * @name: search
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：search
 * @update: 2023-07-09 11:27
 */
import {ICommonColumn} from "../../../types/common";
import { ISize } from "../../../types/size";

export interface SearchProps extends ISize {
  /**
   * 搜索参数
   */
  modelValue: Object;
  /**
   * 搜索项
   */
  column: ICommonColumn[];
}
