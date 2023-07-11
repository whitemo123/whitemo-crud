/**
 * @name: vite.config
 * @author: itmobai
 * @date: 2023-07-09 20:30
 * @description：vite.config
 * @update: 2023-07-09 20:30
 */
import { defineConfig } from "vite";
import dts from "vite-plugin-dts"
import { resolve } from "path";


export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      input: ["./index.ts"],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          //不用打包成.mjs
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, './dist/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts'
    }
  },
  plugins: [
    dts({
      root: "./",
      entryRoot: "./",
      outDir: [
        "./dist/es",
        "./dist/lib"
      ],
      exclude: ["vite.config.ts", "node_modules/*"],
      tsconfigPath: "../../tsconfig.json"
    })
  ]
})
