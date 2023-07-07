import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      input: ['index.ts'],
      external: ["vue", /\.scss/, "@whitemo-crud/utils"],
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
    vue(),
    dts({
      entryRoot: './components',
      outputDir: ['./dist/es/components', './dist/lib/components'],
      tsConfigFilePath: '../../tsconfig.vite-config.json'
    }),
    DefineOptions(),
  ]
});
