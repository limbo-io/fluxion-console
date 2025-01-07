// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    eslint({
      fix: true, // 修复错误
      include: [
        'src/**/*.vue',
        'src/**/*.ts',
        'src/**/*.js',
      ],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 5000,
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '^/api': { // 正则表达式写法
        target: 'http://localhost:9786', // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
