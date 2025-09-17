import { jsPDF } from 'jspdf'
// import { pinyin } from 'pinyin'
import { uploadPDF } from '@/api/INPNurse/exportPDF/index'
const patientIdData = ref<any>('')
const visitIdData = ref<any>('')
const docNameData = ref<any>('')
export const getSavePdf = async (res: string, patientId: string, visitId: any, docName: string) => {
  const pdf = new jsPDF()
  patientIdData.value = patientId
  visitIdData.value = visitId
  docNameData.value = patientId + '_' + visitId + docName.replace(/([-: ])/g, '')
  // docNameData.value = pinyin(docName, {
  //   style: pinyin.STYLE_NORMAL, // 指定输出格式，这里选择普通风格
  //   heteronym: false, // 是否输出多音字的不同拼音，这里选择不输出
  //   format: 'a' // 指定输出格式，这里选择全小写拼音
  // }).join('')
  for (let index = 0; index < res.length; index++) {
    const item = res[index]
    const compressImageResult = await compressImage(item, 0.6)
    convertBase64ToPdf(compressImageResult, index, res, pdf)
  }
}
const compressImage = (base64Image, quality) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = base64Image
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedBase64)
    }
  })
}
const convertBase64ToPdf = async (base64Data, index, res, pdf) => {
  try {
    const canvasWidth = 210 //A4纸的宽度，单位为毫米
    const canvasHeight = 297 // A4纸的高度，单位为毫米
    const leftMargin = 1
    const heightMargin = 1
    if (index !== 0) {
      pdf.addPage()
    }
    pdf.addImage(base64Data, 'JPEG', leftMargin, heightMargin, canvasWidth, canvasHeight) // 添加图片到PDF
    // 获取PDF文件的数据
    if (index == res.length - 1) {
      // pdf.save('base64-image.pdf') // 保存PDF文件
      const pdfData = pdf.output('datauristring')
      const pafBase64Data = extractBase64Pdf(pdfData)
      // const pdfData = pdf.output('blob') //获取blob
      uploadPdfFunc(pafBase64Data)
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
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
