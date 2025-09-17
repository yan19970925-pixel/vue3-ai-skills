import { cssStyle } from './index'
const cssObj = {
  ...cssStyle,
  printContainer:
    'width:98%;height:96vh;position:relative;box-sizing:border-box;padding-top:10px;font-family:Arial, sans-serif;font-size:12px;',
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  title: 'text-align:center;',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;',
  tdCenter: `${cssStyle.tdBorder};height:32px;text-align:center;`,
  tdH: 'height:24px;white-space:nowrap;overflow:hidden;'
}
const getStringLength = (str) => {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length / 2
}
const getRow = (infusionCardSubQueryRespVOList) => {
  return infusionCardSubQueryRespVOList
    .map((data) => {
      return `<tr>
        <td style="text-align:center;${cssStyle.tdBorder}${
        cssObj.tdH
      };width:24px;word-wrap;word-break"></td>
        <td style="width:23%;height:28px;line-height:${
          data.drugName && getStringLength(data.drugName + data.dosage + data.dosageUnits) > 10
            ? '14px'
            : '28px'
        };font-size:${
        data.drugName && getStringLength(data.drugName + data.dosage + data.dosageUnits) > 10
          ? '12px'
          : '12px'
      };${cssStyle.tdBorder};width:56%;">${data.drugName}<span> ${data.dosage}${
        data.dosageUnits
      }</span></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH};width:10%;">${
        data.subOrderNo == 1 ? data.administration : ''
      }</td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH};width:7%;"></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH};width:8%;"></td>
        <td style="text-align:center;${cssStyle.tdBorder}${cssObj.tdH};width:10%;"></td>
    </tr>`
    })
    .join('')
}
const html = (data): string => {
  return `<section style="${
    cssObj.printContainer
  };padding-left:4px;padding-right:4px;width:56%;height:96vh;font-size:12px;">
  <style type="text/css" media="print">@page { size: A4;margin: 0mm;}</style><div style="width:90%;margin:0 auto;">
            <div style="${cssObj.title};font-size:14px;margin-top:6px;">${data.hospitalName}</div>
  <div style="${cssObj.title};font-size:16px;">${data.printType}</div>
  <section style="display:flex;font-size:12px;margin-bottom:2px;"> 
      <span style="width:30%;">姓名：${data.patName}</span>
        <span style="width:30%;">性别：${data.sex || ''}</span>
        <span style="width:30%;">年龄：${data.age || ''}</span>
      </section>
      <section style="display:flex;font-size:12px;margin-bottom:5px;">
        <span style="width:30%;">病人ID：${
          data.patientId || ''
        }</span><span style="width:30%;">日期：${data.printDateTime || ''}</span>
      </section>
            <section style="margin-top:4px;width:100%;">
              <table style="${cssStyle.tableBorder}font-size:12px;">
              <thead>
              <tr><th style="width:24px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal;word-wrap;word-break""><div>瓶</div><div>次</div></th>
                    <th style="width:56%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal">药品名称/剂量</th>
                    <th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal">用法</th>
                    <th style="width:7%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal;height:24px;line-height:12px;"><div>滴</div><div>速</div></th>
                    <th  style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal;height:24px;line-height:12px;"><div>开始</div><div>时间</div></th>
                    <th  style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  };font-weight:normal">签名</th>
                  </tr>
              </thead>
                <tbody>
                ${getRow(data.infusionCardSubQueryRespVOList)}
                </tbody>
            </table>
            </section>
            <section style="text-align:center;padding-left:120px;display:none">打印时间：${
              data.printDateTime
            }</section></div></section><div class="paging"></div>`
}
export default html
