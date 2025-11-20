// 引入windi css
import '@/plugins/windi.css'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 若element日期选择框或其他组件报如下错误可以注释掉此处
// Unable to preventDefault inside passive event listener invocation.
// 一般情况下报错不影响使用
// import 'default-passive-events'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入 element-plus
import { setupElementPlus } from '@/plugins/elementPlus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入 form-create
import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'
import { setupFormCreate } from '@/plugins/formCreate'

// 引入全局样式
import '@/styles/index.scss'

// 引入动画
import '@/plugins/animate.css'

// 路由
import router, { setupRouter } from '@/router'

// 权限
import { setupAuth } from '@/directives'

import { createApp } from 'vue'

import App from './App.vue'
import { clickOutside } from '@/utils/clickOutside'

import './permission'

import { isDevMode } from '@/utils/env'

import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/github.css' //导入代码高亮样式  新版
import Logger from '@/utils/Logger'
import './mock'
// 全局引入icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import { printPlugin } from 'vue-print-next'
// import { queryMessages } from '@/layout/components/NewMessage/src/queryMsgNoRead'

// 本地开发模式 全局引入 element-plus 样式，加快第一次进入速度
if (isDevMode()) {
  import('element-plus/dist/index.css')
}

// 创建实例
const setupAll = async () => {
  const app = createApp(App)

  //自定义一个代码高亮指令
  app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('code')
    blocks.forEach((block: any) => {
      hljs.highlightElement(block)
    })
  })

  // 全局注册
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.directive('click-outside', clickOutside)

  app.use(VCalendar, {})
  app.use(ElementPlus)
  app.use(formCreate)
  app.use(FcDesigner)
  app.use(FcDesigner.formCreate)
  app.use(printPlugin)
  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupFormCreate(app)

  setupRouter(app)

  setupAuth(app)

  // 注册全局指令
  app.directive('trim', {
    mounted(el, binding) {
      if (binding.value) {
        el.value = binding.value.replace(/\s/g, '')
      }
    },
    updated(el, binding) {
      if (binding.value) {
        el.value = binding.value.replace(/\s/g, '')
      }
    }
  })
  await router.isReady()

  app.mount('#app')
}

setupAll()

Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE)
