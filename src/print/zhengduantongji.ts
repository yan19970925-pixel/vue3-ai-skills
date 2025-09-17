/**
 * 诊断统计
 */

import { cssStyle } from './index'
export const getItem1 = (item, index): string => {
  return `${
    index > 0
      ? `<th style="width:10%;height:22px;line-height:22px;overflow:hidden;border-right:1px solid black;border-bottom:1px solid black;border-top:1px solid black">${item.label}</th>`
      : `<th style="width:20%;height:22px;line-height:22px;overflow:hidden;text-align:left;border-right:1px solid black;border-bottom:1px solid black;border-top:1px solid black">${item.label}</th>`
  }`
}
export const getItem2 = (item): string => {
  return `<tr style="font-size:13px;height:22px;line-height:22px;width:100%;display:flex;">
            ${item.value.map((item2, index) => getItem3(item2, index)).join('')}
          </tr>`
}
export const getItem3 = (item, index): string => {
  return `${
    index > 0
      ? `<td style="width:10%;height:22px;line-height:22px;overflow:hidden;text-align:center;border-right:1px solid black;border-bottom:1px solid black">${item}</td>`
      : `<td style="width:20%;height:22px;line-height:22px;overflow:hidden;text-align:left;border-right:1px solid black;border-bottom:1px solid black">${item}</td>`
  }`
}
const html = (data): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}height:46vh;">
            <style type="text/css" media="print">@page { size: A4 portrait;margin:0mm; }</style>
            <table style="width:100%;border-left:1px solid black;" cellspacing="0">
              <tr style="font-size:13px;height:22px;line-height:22px;width:100%;display:flex;">
                  ${data.columnList.map((item, index) => getItem1(item, index)).join('')}
              </tr>
              ${data.diagList.map((item) => getItem2(item)).join('')}
            </table>
          </section>`
}

export default html
