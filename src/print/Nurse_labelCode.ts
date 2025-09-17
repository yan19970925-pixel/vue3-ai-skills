import { cssStyle } from './index'
const cssObj = {
  ...cssStyle,
  printContainer:
    'width:100%;height:96vh;position:relative;box-sizing:border-box;padding-top:12px;font-family:SimSun;font-size:14px;',
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold;line-height:1;',
  fontBold: 'font-weight:bold',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;',
  tdCenter: `${cssStyle.tdBorder};height:32px;text-align:center;`,
  tdH: 'height:32px;'
}
const getList = (checkItems) => {
  return checkItems
    .map((item) => {
      return `
      <div style="width:25%;margin-bottom:5px;">
    <div style="display:flex;"><img style="width:90px;height:44px;" src="${
      item.testNoImg
    }" alt="" />
    <div style="line-height:1;overflow:hidden">
      <span style="${cssObj.alinCenter};font-size:16px;width:100%;display:block;">${
        item.name
      }</span>
      <span style="${cssObj.alinCenter};font-size:13px;width:100%;display:block;">${
        item.bedLabel
      }床${item.age}${item.age && Number(item.age) < 1 ? '月' : '岁'}</span>
      <span style="line-height:1;font-size:13px;width:100%;">${item.deptName}</span>
    </div></div>
    <div style="line-height:1;overflow:hidden">PID:${
      item.patientId
    }<span style="margin-left:2px;margin-right:2px;">${item.specimen}${
        item.priorityIndicator == 0 ? '普通' : item.priorityIndicator == 1 ? '急诊' : ''
      }</span></div>
    <div style="line-height:1;overflow:hidden;height:14px;">${item.itemName}</div></div>`
    })
    .join('')
}
const html = (data): string => {
  return `<section style="${cssObj.printContainer}${
    cssStyle.padding10LR
  }height:96vh;margin:0 auto 0;">
  <style type="text/css" media="print">@page { size: A4}</style>
  ${getList(data.checkItems)}
          </section><div class="paging"></div>`
}
export default html
