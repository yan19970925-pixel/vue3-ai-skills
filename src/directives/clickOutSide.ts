import type { App } from 'vue'

export function clickOutSide(app: App<Element>) {
  app.directive('clickOutSide', {
    mounted(el, binding) {
      function documentHandler(e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.value && typeof binding.value === 'function') {
          binding.value()
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = documentHandler
      document.addEventListener('click', documentHandler)
    },
    unmounted(el) {
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  })
}
