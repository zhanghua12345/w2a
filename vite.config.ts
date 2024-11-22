import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), uniTailwind()],
  base: './',
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 5112, // 将3000修改为你想要的端口号
  },
})
