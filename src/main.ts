import './assets/css/index.scss'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入图标
import 'element-plus/dist/index.css' //引入样式
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/icons/iconfont.js'
import SvgIcon from '@/components/svg-icon/svg-icon.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 引入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component(SvgIcon.name, SvgIcon)

app.mount('#app')
