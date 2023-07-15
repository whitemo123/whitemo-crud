/**
 * @name: table
 * @author: itmobai
 * @date: 2023-07-13 17:21
 * @description：table
 * @update: 2023-07-13 17:21
 */
import {Size} from "../../../types/size";
import {CommonColumn} from "../../../types/common";

export interface TableColumn extends CommonColumn {
  /**
   * 对齐方式(默认left)
   */
  align?: string;
  /**
   * 超出隐藏
   */
  overHidden?: boolean;
  /**
   * 列表图片宽度
   */
  imgWidth?: string;
  /**
   * 列表图片高度
   */
  imgHeight?: string;
  /**
   * 图片间隔符
   */
  imgSuffix?: string;
  /**
   * 图片前缀
   */
  imgPrefix?: string;
}

export interface TableProps extends Size {
  /**
   * 表格数据
   */
  data: any;
  /**
   * 表格配置
   */
  column: TableColumn[];
  /**
   * 数据总数
   */
  total?: number;
  /**
   * 分页
   */
  page?: number;
  /**
   * 分页大小
   */
  limit?: number;
  /**
   * 多选单选下选择的数据
   */
  select?: any;
  /**
   * 表格加载状态
   */
  loading?: boolean;
}
