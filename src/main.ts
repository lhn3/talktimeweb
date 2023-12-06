import './assets/css/index.scss'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入图标
import 'element-plus/dist/index.css' //引入样式
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/icons/iconfont.js'
import SvgIcon from '@/components/svg-icon/svg-icon.vue'
import { useUserStore, keepStore } from '@/stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const user: any = useUserStore()
keepStore(user)
/**
 * 全局自定义指令
 * 按钮权限
 */
app.directive('hasPermission', {
  mounted(el: any, binding: any) {
    const permissions = user.userInfo.permissions
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const _isPermission = value.some(item => permissions.includes(item) || item == '')
      if (!_isPermission) el.parentNode && el.parentNode.removeChild(el)
    }
  }
})
/**
 * 全局自定义指令
 * 保留具体位数并不四舍五入
 * el-input-number标签上绑定 v-input="保留的位数" 即可
 */
app.directive('input', {
  mounted(el, bindings) {
    const input = el.getElementsByTagName('input')[0]
    input.oninput = () => {
      if (input.value.split('.')[1]?.length > bindings.value) {
        const oldValue = input.value
        input.value = Number(oldValue.replace(/[^\d.]/g, '').substring(0, oldValue.indexOf('.') + bindings.value + 1))
      }
    }
  }
})

// 引入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载组件
app.component(SvgIcon.name, SvgIcon)

// 挂载全局方法
app.mount('#app')
