import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // 服务配置
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: '自己的ip端口',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // elementplus按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 加载scss变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/base.scss";'
      }
    }
  }
})
