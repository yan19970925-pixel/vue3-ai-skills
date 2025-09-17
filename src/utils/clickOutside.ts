export const clickOutside = {
  // 指令的定义
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      // 检查点击事件是否发生在元素外部
      if (!(el === event.target || el.contains(event.target))) {
        // 调用指令绑定的值（即传入的方法）
        binding.value(event)
      }
    }
    // 在 document 上添加事件监听器
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    // 清理事件监听器，防止内存泄漏
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
