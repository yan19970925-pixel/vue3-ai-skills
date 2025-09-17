// 数据元跟字典
export function initTree({ pid, pidStr, list }) {
  const child = list.filter((item) => item[pidStr] == pid)
  if (child.length != 0) {
    child.sort((a, b) => {
      if (a.parent != null && b.parent != null && a.sortNumber && b.sortNumber) {
        return a.sortNumber - b.sortNumber
      }
    })
  }
  return child.map((item) => {
    if (initTree({ pid: item._id, pidStr, list }).length > 0) {
      return {
        ...item,
        label: item.name,
        value: item._id,
        children: initTree({ pid: item._id, pidStr, list }),
        disabled: false
      }
    } else {
      return {
        ...item,
        label: item.name,
        value: item._id,
        disabled: true
      }
    }
  })
}
// 大成数据 创建病历
export function initTreeDc({ pid, pidStr, list }) {
  const child = list.filter((item) => item[pidStr] == pid)
  if (child.length != 0) {
    child.sort((a, b) => {
      if (a.parent != null && b.parent != null && a.sortNumber && b.sortNumber) {
        return a.sortNumber - b.sortNumber
      }
    })
  }
  return child.map((item) => {
    if (initTreeDc({ pid: item._id, pidStr, list }).length > 0) {
      return {
        ...item,
        label: item.name,
        name: item.name,
        _id: item._id,
        code: item.code,
        documentType: item.code,
        parent: item.parent,
        children: initTreeDc({ pid: item._id, pidStr, list }),
        disabled: false
      }
    } else {
      return {
        ...item,
        label: item.name,
        name: item.name,
        _id: item._id,
        code: item.code,
        documentType: item.code,
        parent: item.parent,
        disabled: true
      }
    }
  })
}
