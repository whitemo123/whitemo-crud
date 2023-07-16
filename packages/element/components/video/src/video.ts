/**
 * @name: 视频组件类型
 * @author: itmobai
 * @date: 2023-07-15 14:42
 * @description：视频组件类型
 * @update: 2023-07-15 14:42
 */
// 视频组件属性
export interface VideoProps {
  /**
   * 视频资源
   */
  src: string;
  /**
   * fit值
   */
  fit?: string;
  /**
   * 预览视频列表
   */
  previewSrcList?: string[];

  loading?: 'eager' | 'lazy';
}
