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
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.bedLabel || ''
      }</td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.name || ''
      }</td>
        <td style="width:40px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}"><span v-if="
        item.orderSubNo == 1">${
          item.orderSubNo == 1
            ? item.repeatIndicator === 0
              ? '临时'
              : item.repeatIndicator === 1
              ? '长期'
              : ''
            : ''
        }
              </span></td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.orderSubNo == 1 ? item.startDateTime || '' : ''
      }</td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.repeatIndicatorName || ''
      }</td>
        <td style="width:180px;text-align:left;${
          cssStyle.tdBorder
        }height:28px;overflow-wrap: break-word;">${
        item.orderText || ''
      }<span style="float:right;">${item.orderSubNo > 1 ? '(子)' : ''}</span></td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.billingAttr || ''
      }</td>
        <td style="width:40px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.dosage || ''
      }</td>
        <td style="width:40px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.dosageUnits || ''
      }</td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.orderSubNo == 1 ? item.administration || '' : ''
      }</td>
        <td style="width:60px;text-align:center;${cssStyle.tdBorder}${
        cssObj.tdH
      };overflow:hidden">${item.orderSubNo == 1 ? item.frequency || '' : ''}</td>
        <td style="width:120px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.freqDetail || ''
      }</td>
      <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.doctorSign == undefined || item.doctorSign == ''
          ? `<span>${item.doctor || ''}</span>`
          : `<img src="${item.doctorSign || ''}" style="width:40px;height:20px;" />`
      }</td>
      <td style="width:60px;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.stopDateTime || ''
      }</td>
    </tr>`
    })
    .join('')
}

const html = (data): string => {
  return `<section style="${cssObj.printContainer}${
    cssStyle.padding10LR
  }width:297mm;height:96vh;margin:0 auto 0;">
  <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}${
    cssObj.fontBold
  };margin-bottom:10px;">${data.hospitalName}</div>
  <div style="${cssStyle.title}${cssStyle.subTitleSize}${cssObj.fontBold};margin-bottom:15px;">${
    data.wardName
  }医嘱本</div>
  <section style="display:flex;font-size:16px;${cssObj.fontBold};margin-bottom:5px;">
        <span style="width:50%;">打印日期：${data.printDate}</span>
      </section>
            <section style="width:100%;padding: 10px 5px;">
              <table style="${cssStyle.tableBorder}font-size:14px;width:100%;">
              <thead>
              <tr>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">床标号</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">姓名</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">类别</th>
                    <th style="width:100px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">下达医嘱时间</th>
                    <th style="width:50px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">执/停</th>
                    <th style="width:180px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">医嘱内容</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">计价属性</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">剂量</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">单位</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">途径</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">频次</th>
                    <th style="width:120px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">医嘱说明</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">医生</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
    cssObj.tdH
  }">停止时间</th>
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
