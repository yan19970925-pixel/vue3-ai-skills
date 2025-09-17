// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import watermark from './watermark'
import printJS from 'print-js'

export default class HTML2JsPdf {
  constructor(el, title, option) {
    this.container = typeof el === 'string' ? document.querySelector(el) : el
    this.option = {
      pageBreak: null,
      pageStartOffset: 0,
      ...option
    }
    this.title = title
    this.top = 0 // 修改成弹出窗截图，top永远是0
    /*window.pageYoffset = 0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0*/
    this.watermarkInstance = null
  }

  outImage(callback) {
    let source = this.cloneNode(this.container, false)
    this.mountNode(source)
    if (this.option.watermarkOption) {
      this.watermarkInstance = new watermark({
        watermark_parent_node: source,
        ...this.option.watermarkOption
      })
      this.watermarkInstance.init()
    }
    return html2Canvas(source, {
      scale: 5,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const img = canvas.toDataURL('image/png')
      printJS({ printable: img, type: 'image', base64: true })
      callback && callback()
      this.overlay.remove()
    })
  }
  mountNode(source) {
    let overlayCSS = {
      position: 'fixed',
      overflow: 'hidden',
      zIndex: 1000,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: 'rgba(0,0,0,0.8)'
    }
    let containerCSS = {
      position: 'absolute',
      width: this.container.clientWidth + 'px',
      left: 0,
      right: 0,
      top: 0,
      height: this.container.clientHeight + 'px',
      margin: 'auto',
      backgroundColor: 'white'
    }
    overlayCSS.opacity = 0
    this.overlay = this.createElement('div', {
      className: 'html2pdf__overlay',
      style: overlayCSS
    })
    this.containerBox = this.createElement('div', {
      className: 'html2pdf__container',
      style: containerCSS
    })
    this.containerBox.appendChild(source)
    this.overlay.appendChild(this.containerBox)
    document.body.appendChild(this.overlay)
  }

  // Deep-clone a node and preserve contents/properties.
  cloneNode(node, javascriptEnabled) {
    // Recursively clone the node.
    let clone =
      node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false)
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
        clone.appendChild(this.cloneNode(child, javascriptEnabled))
      }
    }

    if (node.nodeType === 1) {
      // Preserve contents/properties of special nodes.
      if (node.nodeName === 'CANVAS') {
        clone.width = node.width
        clone.height = node.height
        // clone.height.SVGAnimatedLength.animVal.value = 1180
        // clone.height.SVGAnimatedLength.animVal.valueInSpecifiedUnits = 1180
        // clone.height.SVGAnimatedLength.animVal.valueAsString = '1180'

        // clone.height.baseVal.value = 1180
        // clone.height.baseVal.valueInSpecifiedUnits = 1180
        // clone.height.baseVal.valueAsString = '1180'

        clone.getContext('2d').drawImage(node, 0, 0)
      } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
        clone.value = node.value
      }
      // console.log('ddsdsd', node.height)

      // Preserve the node's scroll position when it loads.
      clone.addEventListener(
        'load',
        function () {
          clone.scrollTop = node.scrollTop
          clone.scrollLeft = node.scrollLeft
        },
        true
      )
    }

    // Return the cloned node.
    return clone
  }

  // Create an HTML element with optional className, innerHTML, and style.
  createElement(tagName, opt) {
    let el = document.createElement(tagName)
    if (opt.className) el.className = opt.className
    if (opt.innerHTML) {
      el.innerHTML = opt.innerHTML
      let scripts = el.getElementsByTagName('script')
      for (let i = scripts.length; i-- > 0; null) {
        scripts[i].parentNode.removeChild(scripts[i])
      }
    }
    for (let key in opt.style) {
      el.style[key] = opt.style[key]
    }
    return el
  }
}
