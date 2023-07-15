/**
 * @name: common
 * @author: itmobai
 * @date: 2023-07-12 09:55
 * @description：common
 * @update: 2023-07-12 09:55
 */
// 通用字典项
export interface DicData {
  // 键
  label: string;
  // 值
  value: string | number;
  // 颜色
  color?: string;
}

// 通用列配置
export interface CommonColumn {
  // 名字
  label?: string;
  // 数据字段
  prop?: string;
  // 是否自定义显示
  slot?: boolean;
  // 是否隐藏
  hide?: boolean;
  // 字典
  dicData?: DicData[];
  // 组件类型
  type?: "" | "text" | "number" | "password" | "textarea" | "index" | "selection" | "image" | "video" | "select" | "radio" | "switch" | "date" | "daterange",
  // 默认值
  default?: any;
  // 排序
  sort?: number;
  // placeholder
  placeholder?: string;
  // span
  span?: number;
}
