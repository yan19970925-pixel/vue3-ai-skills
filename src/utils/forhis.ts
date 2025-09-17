/**
 * 通用js方法封装处理
 * Copyright (c) 2019 forhis
 */
// 日期格式化
export function parseTime(time: any, pattern?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  const search = params
  search.params = {}
  if (null != dateRange) {
    if (typeof propName === 'undefined') {
      search.params['admBeginTime'] = dateRange[0] || ''
      search.params['admEndTime'] = dateRange[1] || ''
    } else {
      search.params[propName + 'BeginTime'] = dateRange[0] || ''
      search.params[propName + 'EndTime'] = dateRange[1] || ''
    }
  }
  return search
}
// 添加日期范围
export function addDateRangeTwo(params, dateRange, propName) {
  const search = params
  search.params = {}
  if (null != dateRange) {
    if (typeof propName === 'undefined') {
      search.params['admBeginTime'] = dateRange[0] || ''
      search.params['admEndTime'] = dateRange[1] || ''
    } else {
      search.params['beginTime'] = dateRange[0] + ' 00:00:00' || ''
      search.params['endTime'] = dateRange[1] + ' 23:59:59' || ''
    }
  }
  return search
}
// 添加日期范围
export function addDateRangeThree(params, dateRange, propName) {
  const search = params
  search.params = {}
  if (null != dateRange) {
    if (typeof propName === 'undefined') {
      search.params['beginTime'] = dateRange[0]
      search.params['endTime'] = dateRange[1]
    } else {
      search.params['begin' + propName] = dateRange[0]
      search.params['end' + propName] = dateRange[1]
    }
  }
  return search
}
// 回显数据字典
export function selectDictLabel(datas, value) {
  const actions: any = []
  Object.keys(datas).some((key) => {
    if (datas[key].dictValue == '' + value) {
      actions.push(datas[key].dictLabel)
      return true
    }
  })
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  const actions: any = []
  const currentSeparator = undefined === separator ? ',' : separator
  const temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == '' + temp[val]) {
        actions.push(datas[key].dictLabel + currentSeparator)
      }
    })
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}
// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

//根据身份证号获取性别
export function getSex(identityCard) {
  const len = identityCard.length
  if (len == 0 || (len != 15 && len != 18)) {
    return null
  }
  let sexCode = ''
  if (len == 18) {
    //18位的身份证号码从号码中得到性别代码
    sexCode = identityCard.substr(16, 1)
  }
  if (len == 15) {
    //15位的身份证号码从号码中得到生日
    sexCode = identityCard.substr(14, 1)
  }
  if (parseInt(sexCode) % 2 == 1) {
    return '男'
  } else {
    return '女'
  }
}
// 对象取值
export function getObjValue(obj) {
  for (const i in obj) {
    return obj[i]
  }
}
export function toLowerLine(str) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') {
    //如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

// 年纪判断 14天以内用岁月天 0岁以内用天 14岁以上用岁
// export function calculateAge(birthday) {
//   const today: any = new Date()
//   const birthDate: any = new Date(birthday)
//   const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365
//   const agelnMilliseconds: number = today - birthDate
//   const agelnYears = agelnMilliseconds / millisecondsPerYear
//   if (agelnYears <= 0) {
//     return Math.ceil(agelnYears * 365) + '天'
//   }
//   if (agelnYears < 14) {
//     const years = Math.floor(agelnYears)
//     const months = Math.floor((agelnYears - years) * 12)
//     const days = Math.round((agelnYears - years - months / 12) * 30)
//     return `${years}岁${months}月${days}天`
//   }
//   return Math.floor(agelnYears) + '岁'
// }

// 新加
export function calculateAge(birth) {
  const today = new Date()
  const birthDate = new Date(birth)
  const birthYear = birthDate.getFullYear()
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()
  const age = today.getFullYear() - birthYear
  const monthDiff = today.getMonth() + 1 - birthMonth
  const dayDiff = today.getDate() - birthDay
  // 如果1岁以内
  if (age < 1) {
    monthDiff - 1
    dayDiff + 30
    return monthDiff * 30 + dayDiff + '天'
  }
  if (1 < age && age < 14) {
    // 如果天为0月大于0
    if (dayDiff == 0 && monthDiff > 0) {
      return `${age}岁${monthDiff}月`
    }
    if (dayDiff == 0 && monthDiff == 0) {
      return `${age}岁`
    }
    if (dayDiff < 0 && monthDiff > 1) {
      return `${age}岁${monthDiff - 1}月${dayDiff + 30}天`
    }
    if (dayDiff < 0 && monthDiff == 0 && age > 1) {
      return `${age - 1}岁11月${dayDiff + 30}天`
    }
    if (dayDiff > 0 && monthDiff == 0 && age > 1) {
      return `${age}岁${dayDiff}天`
    }
    if (dayDiff == 0 && monthDiff == 0 && age > 1) {
      return `${age}岁`
    }
    if (dayDiff == 0 && monthDiff !== 0 && age > 1) {
      return `${age}岁${monthDiff}月`
    }
  }
  return age + '岁'
}
