import { cssStyle } from './index'
const cssObj = {
  ...cssStyle,
  printContainer:
    'width:98%;height:96vh;margin:0 auto 0;position:relative;box-sizing:border-box;padding-top:12px;font-family:SimSun;font-size:14px;',
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;',
  tdCenter: `${cssStyle.tdBorder};height:32px;text-align:center;`,
  tdH: 'height:28px;white-space:nowrap;overflow:hidden;'
}
const getRow = (list) => {
  return list
    .map((item) => {
      return `<tr>
      <td style="width:8%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.status || ''
      }</td>
        <td style="width:6%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.bedLabel || ''
      }</td>
        <td style="width:8%;${cssStyle.tdBorder}${cssObj.tdH}">${item.name || ''}</td>
        <td style="width:auto;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.drugName || ''
      }</td>
        <td style="width:8%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.dosageEach || ''
      }${item.dosageUnits || ''}</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.administration || ''
      }</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.frequency || ''
      }</td>
        <td style="width:8%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.quantity || ''
      }${item.packageUnits || ''}</td>
        <td style="width:12%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH};overflow:hidden">${
        item.packageSpec || ''
      }</td>
        <td style="width:6%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.costs || ''
      }</td>
      <td style="width:8%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}"></td>
    </tr>`
    })
    .join('')
}

const html = (data): string => {
  return `<section style="${cssObj.printContainer}${
    cssStyle.padding10LR
  }width:210mm;height:96vh;margin:0 auto 0;">
  <style type="text/css" media="print">@page { size: A4}</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}${
    cssObj.fontBold
  };margin-bottom:10px;">${data.hospitalName}</div>
  <div style="${cssStyle.title}${cssStyle.subTitleSize}${cssObj.fontBold};margin-bottom:15px;">${
    data.wardName
  }处方汇总（${data.fillTitle}）</div>
  <section style="display:flex;font-size:16px;${cssObj.fontBold};margin-bottom:5px;">
        <span style="width:70%;">处方日期：${data.startDate}至${data.endDate}</span>
      </section>
            <section style="margin-top:10px;">
              <table style="${cssStyle.tableBorder}font-size:14px;">
              <thead>
              <tr>
                    <th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">发药状态</th>
                    <th style="width:6%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">床号</th>
                    <th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">姓名</th>
                    <th style="width:auto;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">药品名称</th>
                    <th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">剂量</th>
                    <th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">途径</th>
                    <th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">频次</th>
                    <th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">总量</th>
                    <th style="width:12%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">规格</th>
                    <th style="width:6%;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">计价</th><th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${cssObj.tdH}">签名</th>
                  </tr>
              </thead>
                <tbody>
                ${getRow(data.list)}
                </tbody>
            </table>
            </section>
          </section><div class="paging"></div>`
}
export default html
