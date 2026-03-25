import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/DRR-Link3/'   // แทนที่ <repository-name> ด้วยชื่อ repository ของคุณ
    : '/'
}
