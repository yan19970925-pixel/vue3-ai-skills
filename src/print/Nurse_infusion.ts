import { cssStyle } from './index'
const cssObj = {
  ...cssStyle,
  printContainer:
    'width:98%;height:96vh;margin:0 auto 0;position:relative;box-sizing:border-box;padding-top:12px;font-family:SimSun;font-size:13px;',
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;',
  tdCenter: `${cssStyle.tdBorder};height:32px;text-align:center;`,
  tdH: 'height:28px;white-space:nowrap;overflow:hidden;'
}
const getStringLength = (str) => {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length / 2
}
const getRow = (infusionCardSubQueryRespVOList) => {
  return infusionCardSubQueryRespVOList
    .map((item) => {
      return `<tr>
      <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.repeatIndicator == 1 && item.orderSubNo == 1
          ? '长'
          : item.repeatIndicator == 0 && item.orderSubNo == 1
          ? '临'
          : ''
      }</td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.orderSubNo == 1 ? item.groupNo : ''
      }</td>
        <td style="width:23%;height:28px;line-height:${
          item.orderText && getStringLength(item.orderText + item.dosage + item.dosageUnits) > 10
            ? '14px'
            : '28px'
        };font-size:${
        item.orderText && getStringLength(item.orderText + item.dosage + item.dosageUnits) > 10
          ? '12px'
          : '14px'
      };${cssStyle.tdBorder}">${item.orderText}<span> ${item.dosage}${item.dosageUnits}</span></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.orderSubNo == 1 ? item.administration : ''
      }</td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}"></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}"></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH}"></td>
    </tr>`
    })
    .join('')
}
const getItem = (dataList) => {
  return dataList
    .map((item) => {
      return `<section style="${cssObj.printContainer}${
        cssStyle.padding10LR
      }width:116mm;height:96vh;margin:0 auto 0;">
  <style type="text/css" media="print">@page { size: A4}</style>
            <div style="${cssStyle.title};font-size:14px;${cssObj.fontBold};">${
        item.hospitalName
      }</div>
  <div style="${cssStyle.title};font-size:16px;${cssObj.fontBold};">输液观察卡</div>
  <section style="display:flex;font-size:14px;${
    cssObj.fontBold
  };margin-bottom:2px;"> <span style="width:35%;">科室:${item.deptName}</span>
      <span style="width:25%;">姓名:${item.patName}</span>
        <span style="width:20%;">年龄:${item.age || ''}</span>
        <span style="width:20%;">床号:${item.bedLabel || ''}</span>
      </section>
      <section style="display:flex;font-size:14px;${cssObj.fontBold};margin-bottom:5px;">
        <span style="width:35%;">病人Id:${
          item.patientId || ''
        }</span><span style="width:20%;">住院次数:${
        item.visitId || ''
      }</span><span style="width:45%;">医嘱执行时间:${item.conversionDateTime || ''}</span>
      </section>
            <section style="margin-top:4px;">
              <table style="${cssStyle.tableBorder}font-size:12px;">
              <thead>
              <tr>
              <th rowspan="2" style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">长/临</th>
                    <th rowspan="2" style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">组号</th>
                    <th rowspan="2" style="width:50%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">医嘱内容</th>
                    <th rowspan="2" style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">用法</th>
                    <th rowspan="2" style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">滴速</th>
                    <th rowspan="2" style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">开始时间</th>
                    <th rowspan="2" style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
        cssObj.tdH
      }">签名</th>
                  </tr>
              </thead>
                <tbody>
                ${getRow(item.infusionCardSubQueryRespVOList)}
                </tbody>
            </table>
            </section>
            <section style="text-align:right">打印时间：${item.printDateTime}</section>
          </section><div class="paging"></div>`
    })
    .join('')
}
const html = (data): string => {
  return `${getItem(data.dataList)}`
}
export default html
