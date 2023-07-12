/**
 * @name: vite.config
 * @author: itmobai
 * @date: 2023-07-09 19:19
 * @description：vite.config
 * @update: 2023-07-09 19:19
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      external: ['vue', /\.less/, /\.scss/, '@whitemo-crud/utils'],
      input: ["./index.ts"],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../../dist/element/es'
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../../dist/element/lib'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      // formats: ["es", "cjs"]
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./",
      outDir: ["../../dist/element/es", "../../dist/element/lib"],
      exclude: ["vite.config.ts"],
      tsconfigPath: "../../tsconfig.json"
    }),
    {
      name: 'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          this.emitFile({
            type: 'asset',
            fileName: key,
            source: bundler.code.replace(/\.scss/g, '.css')
          });
        }
      }
    }
  ]
})
