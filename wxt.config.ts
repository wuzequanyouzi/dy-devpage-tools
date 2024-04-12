/*
 * @Author: zequan.wu
 * @Date: 2024-04-08 16:50:18
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-11 11:22:25
 * @FilePath: \dy-devpage-tools\wxt.config.ts
 * @Description: 
 * 
 */
import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  vite: () => ({
    plugins: [vue()],
    build: {
      sourcemap: false,
      cssCodeSplit: true
    }
  }),
});
