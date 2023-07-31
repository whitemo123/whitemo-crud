/**
 * @name: 视频预览属性
 * @author: itmobai
 * @date: 2023-07-31 15:33
 * @description：视频预览属性
 * @update: 2023-07-31 15:33
 */

// 视频预览组件属性
export interface VideoViewerProps {
  /**
   * 预览视频列表
   */
  urlList: string[]
  /**
   * 初始索引(默认0)
   */
  initialIndex?: number;
  /**
   * 是否插入至 body 元素上(默认 false)
   */
  teleported?: boolean;
  /**
   * 是否可以通过点击遮罩层关闭预览(默认 不关闭)
   */
  hideOnClickModal?: boolean;
  /**
   * 是否可以无限循环预览(默认 无限循环)
   */
  infinite?: boolean;
}