/*
 * @Author: zequan.wu
 * @Date: 2024-04-08 16:51:02
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-11 11:19:31
 * @FilePath: \dy-devpage-tools\entrypoints\content\index.ts
 * @Description: 
 * 
 */
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineContentScript({
  matches: ['*://developer.open-douyin.com/microapp/tt1bdf6d6284f58a92/feedback*'],
  cssInjectionMode: "ui",
  
  async main(ctx) {
    const ui = await createIntegratedUi(ctx, {
      name: 'wxt-vue-example',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        console.log(App)
        const rootDom = document.createElement('div');
        rootDom.id = '__app__'
        container.append(rootDom);
        const root = createApp(App);
        root.use(ElementPlus)
        root.mount(rootDom)
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
