// 日期时间排序
import { parseTime } from '@/utils/formatTime'
// type 1 正序 2倒序
export function sortDate(params, type) {
  params.forEach((item) => {
    item.data.inputDate = item.data.inputDate ? parseTime(item.data.inputDate) : ''
  })
  if (type === 1) {
    const arr = params.sort((a, b) => {
      if (a.data.inputDate < b.data.inputDate) {
        return -1
      } else if (a.data.inputDate > b.data.inputDate) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  } else if (type === 2) {
    const arr = params.sort((a, b) => {
      if (a.data.inputDate > b.data.inputDate) {
        return -1
      } else if (a.data.inputDate < b.data.inputDate) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  }
}

// 数组排序
// type 1 正序 2倒序 name: 排序字段 需要是数字类型
export function sortList(params, name, type) {
  params.forEach((item) => {
    item[name] = item[name] ? Number(item[name]) : 0
  })
  if (type === 1) {
    const arr = params.sort((a, b) => {
      if (a[name] < b[name]) {
        return -1
      } else if (a[name] > b[name]) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  } else if (type === 2) {
    const arr = params.sort((a, b) => {
      if (a[name] > b[name]) {
        return -1
      } else if (a[name] < b[name]) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  }
}
