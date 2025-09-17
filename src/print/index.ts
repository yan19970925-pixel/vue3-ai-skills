import printJS from 'print-js'
import { jsPDF } from 'jspdf'
import { pinyin } from 'pinyin'
// import { uploadPDF } from '@/api/INPNurse/exportPDF/index'
import html2Canvas from 'html2canvas'
export const cssStyle = {
  printContainer:
    'width:100%;height:96vh;position:relative;box-sizing:border-box;padding-top:12px;font-family:SimSun;font-size:14px;',
  relative: 'position:relative;',
  borderbox: 'box-sizing: border-box;',
  title: 'text-align:center;font-weight:bold;',
  titleSize: 'font-size:24px;',
  subTitleSize: 'font-size:20px;',
  formLabel: 'font-weight:bold;',
  flexCenter: 'display:flex;justify-content:center;',
  flex: 'display:flex;',
  flexWrap: 'display:flex;flex-wrap: wrap;',
  flexBetween: 'display:flex;justify-content:space-between;',
  flexAround: 'display:flex;justify-content:space-around;',
  fontBold: 'font-weight:bold;',
  border2pxBottom: 'border-bottom:2px solid black;',
  border1pxBottom: 'border-bottom:1px solid black;',
  wordBetween:
    'display: inline-block; width: 130px;text-align: justify;text-justify: distribute-all-lines;text-align-last: justify;',
  wordBetween2:
    'display: inline-block; width: 80px;text-align: justify;text-justify: distribute-all-lines;text-align-last: justify;',
  labelStyle: 'margin-bottom:7px;width:80px;',
  labelStyle2: 'margin-bottom:7px;width:60px;',
  redBorder: 'border:1px solid red;',
  line: 'border-bottom: 1px solid black;transform-origin:right bottom;transform: rotate(-15deg);margin-left:30px;margin-top:10px; width:80px;',
  line2: 'border-left:1px solid black;transform: rotate(30deg)',
  transformRotate:
    'transform-origin:0 0;transform: rotate(45deg);margin-left:30px;margin-top:30px;',
  circle: 'border:1px solid black;border-radius:50% 50%;',
  padding10LR: `padding-left:15px;padding-right:15px;`,
  padding20LR: `padding-left:20px;padding-right:20px;`,
  padding40LR: `padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;`,
  lineHeight: 'height:18px;line-height:18px;',
  flexgrow: 'flex-grow:1',
  fontFamily: `font-family:SimSun;`,
  tableBorder: `border-collapse:collapse;
		border-spacing:0;
		border:1px solid;
`,
  tdBorder: 'border:1px solid black;padding-left:4px;'
}

export const getCheckItem = (item, index): string => {
  return `<div style="padding-left:2%;padding-right:20%;font-weight:bold;${cssStyle.flexBetween}">
              <section>${index + 1}、${item.text}</section>
              <section>${item.price}</section>
            </div>`
}

export const drawLine = (count: number): string => {
  return new Array(count)
    .fill(' ')
    .map(() => `<section style="${cssStyle.line}"></section>`)
    .join('')
}

// 画一条长度不一样的线
export const drawLine2 = (count: number): string => {
  return `<div style="${cssStyle.line2};height:${50 * count}px;width:1px;"></div>`
}
// a4纸高度450

// 打印功能
export const print = (html: string) => {
  printJS({
    documentTitle: '',
    printable: html,
    type: 'raw-html',
    style: `@page { size: auto;margin:0mm;} .paging{page-break-after: always;}`
  })
}
export const printById = (id: string) => {
  printJS({
    documentTitle: '',
    printable: id,
    type: 'html'
  })
}

const patientIdData = ref<any>('')
const visitIdData = ref<any>('')
const docNameData = ref<any>('')
const isLandscapeDate = ref<boolean>(false)
export const exportPDF = async (
  res: any,
  patientId: string,
  visitId: any,
  docName: string,
  isLandscape: boolean
) => {
  patientIdData.value = patientId
  visitIdData.value = visitId
  if (isLandscape) {
    isLandscapeDate.value = isLandscape
  } else {
    isLandscapeDate.value = false
  }
  const pdf = new jsPDF({
    format: 'a4',
    orientation: isLandscapeDate.value ? 'landscape' : 'portrait'
  })
  docNameData.value = patientId + '_' + visitId + docName
  // docNameData.value = pinyin(docName, {
  //   style: pinyin.STYLE_NORMAL, // 指定输出格式，这里选择普通风格
  //   heteronym: false, // 是否输出多音字的不同拼音，这里选择不输出
  //   format: 'a' // 指定输出格式，这里选择全小写拼音
  // }).join('')
  for (let index = 0; index < res.length; index++) {
    const item = res[index]
    // 创建一个新的 div 元素
    const div = document.createElement('div')
    div.innerHTML = item
    // div.style.position = 'relative'
    div.style.width = isLandscapeDate.value ? '1124px' : '794px'
    div.style.height = isLandscapeDate.value ? '794px' : '1124px'
    if (docName == '长期医嘱' || docName == '临时医嘱') {
      div.style.height = isLandscapeDate.value ? '794px' : '1184px'
    }
    document.body.appendChild(div)
    const content = div.querySelector('#pdf-content')
    if (content) {
      content.style.height = '100%'
      content.style.setProperty('height', '100%', 'important')
      content.style.fontSize = '12px'
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000)) // 设置延迟，单位为毫秒
    // 确保DOM已经加载完成
    await html2Canvas(div).then(async function (canvas) {
      // 获取图片的Data URL
      // const imageDataURL = canvas.toDataURL('image/png')
      // // 创建一个新的Image对象，并设置其src为Data URL
      // const img = new Image()
      // img.src = imageDataURL
      // // 当图片加载完成后，获取其原始宽度和高度，并添加到PDF
      // img.onload = function () {
      //   const originalWidth = img.width
      //   const originalHeight = img.height
      //   const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6)
      //   convertBase64ToPdf(compressedBase64, index, res, pdf)
      //   document.body.removeChild(div)
      // }
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6)
      await convertBase64ToPdf(compressedBase64, index, res, pdf)
      document.body.removeChild(div)
    })
  }
}
const convertBase64ToPdf = async (base64Data, index, res, pdf) => {
  return new Promise((resolve) => {
    try {
      // 获取 PDF 页面大小
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      // // 计算缩放比例
      // const scaleX = pdfWidth / imgWidth
      // const scaleY = pdfHeight / imgHeight
      // const scale = Math.min(scaleX, scaleY)
      // // 根据缩放比例调整图片的宽高
      // const newWidth = imgWidth * scale
      // const newHeight = imgHeight * scale
      if (index !== 0) {
        pdf.addPage()
      }
      if (isLandscapeDate.value) {
        // 设置页面方向为横向
        pdf.addImage(base64Data, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      } else {
        // 设置页面方向为纵向
        pdf.addImage(base64Data, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      }
      // 获取PDF文件的数据
      if (index == res.length - 1) {
        // pdf.save('base64-image.pdf') // 保存PDF文件
        const pdfData = pdf.output('datauristring')
        // console.log(pdfData, '保存的PDF文件123')
        // const pdfData = pdf.output('blob') //获取blob
        const pafBase64Data = extractBase64Pdf(pdfData)
        uploadPdfFunc(pafBase64Data)
      }
      resolve('')
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  })
}
const extractBase64Pdf = (text) => {
  // 定义开始和结束字符串
  const startStr = 'base64,'
  // 找到开始和结束字符串的位置
  const startIndex = text.indexOf(startStr) + startStr.length
  // 提取Base64编码部分
  const base64Data = text.substring(startIndex)
  return base64Data
}

const uploadPdfFunc = (pdfData) => {
  uploadPDF({
    uploadfile: pdfData + '',
    docName: docNameData.value + '.pdf',
    folderName: patientIdData.value + '_' + visitIdData.value //患者id_住院次数
  }).then(() => {})
}
