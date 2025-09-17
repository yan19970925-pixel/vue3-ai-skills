import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
export function exportToExcel(data, name) {
  //   const data = [
  //   {
  //     表头: 内容
  //   }
  //   ]
  // 创建一个工作簿和一个工作表
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(data) // 注意：这里假设数据是二维数组，如果不是，可能需要转换
  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  // 生成Excel文件的二进制内容
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  // 创建一个Blob对象，该对象包含要保存到文件的二进制数据
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  // 使用FileSaver.js保存文件
  saveAs(blob, name + '.xlsx')
}

export function exportToExcelWithMultiHeader(data: any[], headers: any[][], name: string) {
  // 创建一个工作簿
  const workbook = XLSX.utils.book_new()

  // 初始化工作表
  const worksheet: any = []
  const workhead: any = []
  // 填充多级表头并创建映射
  const headerMap: { [key: string]: number } = {}
  let maxColumns = 0
  headers.forEach((headerRow, rowIndex) => {
    const row = []
    let colIndex = 0 // 重置列索引
    if (rowIndex === 0) {
      return workhead.push([{ v: headerRow[0], t: 's' }])
    }
    headerRow.forEach((value, index) => {
      let titleName = ''
      // 如果当前行的值是空的，尝试从第一组中获取值
      if (rowIndex === 2) {
        if (!value && headers[1][index]) {
          titleName = headers[1][index] // 使用第一组的值
        } else {
          titleName = headers[2][index]
        }
      } else if (rowIndex === 1) {
        titleName = value
      }
      if (titleName) {
        // 创建一个单元格对象
        const cell = {
          v: titleName,
          t: 's'
        } // 假设表头为字符串
        row[index] = cell
        // 如果这是第一次遇到这个值，记录列索引
        if (!headerMap[titleName] && rowIndex === 2) {
          headerMap[titleName] = colIndex
        }
        // 递增列索引
        colIndex++
        // 更新最大列数
        if (index >= maxColumns) {
          maxColumns = index + 1
        }
      }
    })
    // 填充空单元格以确保表头对齐
    while (row.length < maxColumns) {
      row.push({ v: '', t: 's' })
    }
    workhead.push(row)
  })
  // 添加数据行
  data.forEach((rowData) => {
    worksheet.push(...workhead)
    rowData.forEach((item) => {
      const row = new Array(maxColumns).fill({ v: '', t: 's' }) // 初始化数据行为空字符串
      for (const header in headerMap) {
        if (headerMap.hasOwnProperty(header)) {
          // 根据标题获取对应的数据
          const value = item[header] || ''
          // 创建一个单元格对象
          const cell = typeof value === 'number' ? { v: value, t: 'n' } : { v: value, t: 's' } // 根据数据类型设置单元格类型
          // 使用映射来确定列索引
          row[headerMap[header]] = cell
        }
      }
      worksheet.push(row)
    })
  })
  // 将工作表数组转换为工作表对象
  const ws = XLSX.utils.aoa_to_sheet(worksheet)

  // 将工作表数组转换为工作表对象并添加到工作簿
  XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1')

  // 将工作簿写入 Blob 对象并保存文件
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  })
  saveAs(blob, `${name}.xlsx`)
}
