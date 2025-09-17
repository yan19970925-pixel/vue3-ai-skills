import { ElMessageBox } from 'element-plus'
import { createApp, nextTick } from 'vue'

interface MessageBoxOptions {
  title?: string
  closeOnClickModal?: boolean
  [propName: string]: any
}

export function useMessageBox() {
  const showCustomMessageBox = (options: MessageBoxOptions) => {
    const {
      messageMain = '', //  文本内容
      iconCnt, //  图标组件
      closeOnClickModal,
      title,
      customClass = 'custom-message-box' //MessageBox 的自定义类名
    } = options

    return new Promise<void>((resolve, reject) => {
      const MessageBoxConstructor = ElMessageBox as any
      MessageBoxConstructor({
        ...options,
        closeOnClickModal,
        customClass,
        title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: `<div class="message-content">
                    <div class="icon-class"></div>
                    <div class="title-class">${messageMain}</div>
                </div>`,
        callback: (action: string) => {
          if (action === 'confirm') {
            resolve()
          } else {
            reject()
          }
        },
        dangerouslyUseHTMLString: true,
        showClose: false,
        showCancelButton: true
      })
      const button = document.querySelector('.el-button--primary')
      if (button) {
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            if (document.activeElement !== button) {
              button.focus()
            }
          }
        })
        button.tabIndex = 0 // 确保按钮可以通过 tab 键获得焦点
      } else {
        console.log('未找到按钮')
      }
      nextTick(() => {
        const app = createApp(iconCnt) //创建实例
        app.mount('.el-message-box__message .icon-class') //挂载
      })
    })
  }
  return {
    showCustomMessageBox
  }
}
