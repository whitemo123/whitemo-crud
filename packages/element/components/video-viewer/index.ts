/**
 * @name: 视频预览组件入口
 * @author: itmobai
 * @date: 2023-07-31 15:35
 * @description：视频预览组件入口
 * @update: 2023-07-13 15:35
 */
import { withInstall } from "@whitemo-crud/utils";

import _VideoViewer from "./src/video-viewer.vue";
export const VideoViewer = withInstall(_VideoViewer)
export * from "./src/video-viewer"
export default VideoViewer
