import { cssStyle } from './index'

const styles = {
  ...cssStyle,
  table: `border-collapse: collapse;border: 1px solid black;width:100%;`,
  cell: `border: .3px solid black;
         border-top-width: 0;
         border-left-width: 0;
         height:32px;`,
  th: `position: sticky;
       top: 0;
      `,
  td: 'border: 1px solid black;text-align:center;height:24px;line-height:14px;box-sizing:border-box;',
  hiddenBoder: `border:1px solid transparent;`,
  hiddenText: `color:transparent;`
}

const getRow = (checkList) => {
  return checkList
    .map((item) => {
      return `<tr>
                  <td style="${styles.td};">${item.peId || ''}</td>
                  <td style="${styles.td};">${item.peVisitId || ''}</td>
                  <td style="${styles.td};">${item.name || ''}</td>
                  <td style="${styles.td};">${item.sex || ''}</td>
                  <td style="${styles.td};">${item.age || ''}</td>
                  <td style="${styles.td};">${item.maritalStatus || ''}</td>
                  <td style="${styles.td};">${item.visitStatus || ''}</td>
                  <td style="${styles.td};">${item.groupingName || ''}</td>
                  <td style="${styles.td};">${item.department || ''}</td>
    </tr>`
    })
    .join('')
}
const getItem = (dataList) => {
  return dataList.map((item, index) => {
    return `<html><section style="
  ${
    cssStyle.printContainer
  }height:96vh;box-sizing:border-box;padding-top:12px;padding-left:10px;padding-right:10px;position:relative;box-sizing:border-box;"><style type="text/css" media="print">@page {size: A4 portrait;margin:0mm;}</style>
     <div>       
            <table style="${styles.table}font-size:13px;box-sizing:border-box;">
                <thead style="font-size:12px;">
                  <tr>
                    <th style="${styles.td};height:24px;">体检号</th>
                    <th style="${styles.td};height:24px;">体检次数</th>
                    <th style="${styles.td};height:24px;">姓名</th>
                    <th style="${styles.td};height:24px;">性别</th>
                    <th style="${styles.td};height:24px;">年龄</th>
                    <th style="${styles.td};height:24px;">婚姻</th>
                    <th style="${styles.td};height:24px;">体检状态</th>
                    <th style="${styles.td};height:24px;">体检分组</th>
                    <th style="${styles.td};height:24px;">部门</th>
                  </tr>
                </thead>
                <tbody>
                  ${getRow(item.checkList)}
                </tbody>
            </table></div>            
              <div style="position:absolute;bottom:0;left:0;text-align:center;">第${index + 1}/${
      item.total || ''
    }页</div>
          </section><div class="paging"></div></html>`
  })
}
const html = (data): string => {
  return `${getItem(data.dataList)}`
}
export default html
