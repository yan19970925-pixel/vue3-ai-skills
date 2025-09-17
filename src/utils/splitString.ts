import { accAdd } from '@/utils/index'
function getTextWidth(text: string) {
  // 检查参数是否为字符串
  if (typeof text !== 'string') {
    throw new Error('getTextWidth requires a string parameter')
  }
  // 创建一个canvas元素
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Failed to get canvas context')
  }
  // 设置所需的字体样式
  context.font = '13px Arial' // 使用和页面相同的字体和大小
  // 计算宽度
  const width = context.measureText(text).width

  return width
}

const charWidths: { [key: string]: number } = {}
const measurementString =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.。！？、；;：“”‘’（）《》=-【】[]°%@&/*(){} '
for (let i = 0; i < measurementString.length; i++) {
  const char = measurementString.indexOf(measurementString[i])
  if (
    measurementString[i] == '“' ||
    measurementString[i] == '”' ||
    measurementString[i] == '‘' ||
    measurementString[i] == '’' ||
    measurementString[i] == '°' ||
    measurementString[i] == '；' ||
    measurementString[i] == '，'
  ) {
    charWidths[measurementString[i]] = 13
  } else if (char > 51 && char < 62) {
    charWidths[measurementString[i]] = 7
  } else if (
    char < 53 ||
    measurementString[i] == ';' ||
    measurementString[i] == ',' ||
    measurementString[i] == '%' ||
    measurementString[i] == '@' ||
    measurementString[i] == '&' ||
    measurementString[i] == '/' ||
    measurementString[i] == '*' ||
    measurementString[i] == '(' ||
    measurementString[i] == ')' ||
    measurementString[i] == '[' ||
    measurementString[i] == ']' ||
    measurementString[i] == '{' ||
    measurementString[i] == '}' ||
    measurementString[i] == '.' ||
    measurementString[i] == ' ' ||
    measurementString[i] == '=' ||
    measurementString[i] == '-'
  ) {
    charWidths[measurementString[i]] = 7
  } else {
    charWidths[measurementString[i]] = getTextWidth(measurementString[i])
  }
}

// 分割字符串为指定宽度的部分
export const splitStringByWidth = (str: string, targetWidth: number) => {
  const parts: string[] = []
  let currentPart = ''
  let currentWidth = 0
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const charWidth = charWidths[char] || getTextWidth(char) // 如果字符不在测量字符串中，则单独测量
    if (currentWidth + charWidth > targetWidth) {
      // 如果当前部分的宽度加上当前字符的宽度超过了目标宽度，则开始新的部分
      parts.push(currentPart)
      currentPart = ''
      currentWidth = 0
    }
    currentPart += char
    currentWidth = accAdd(currentWidth, charWidth)
  }

  // 添加最后一个部分
  parts.push(currentPart)

  return parts
}
