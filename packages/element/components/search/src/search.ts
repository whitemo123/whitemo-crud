/**
 * @name: search
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：search
 * @update: 2023-07-09 11:27
 */

/**
 * 尺寸枚举
 */
export enum SizeEnum {
  small = "small",
  large = "large"
}

export interface SearchProps {
  /**
   * 搜索参数
   */
  modelValue: Object;
  /**
   * 组件尺寸
   */
  size?: SizeEnum;
}