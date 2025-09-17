import { cssStyle } from './index'
const cssObj = {
  ...cssStyle,
  printContainer:
    'width:90%;height:96vh;position:relative;box-sizing:border-box;padding-top:10px;font-family:SimSun;font-size:14px;',
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;',
  tdCenter: `${cssStyle.tdBorder};height:32px;text-align:center;`,
  tdH: 'height:32px;'
}
const getLists = (dataList) => {
  return dataList
    .map((item) => {
      if (
        item.inpPatsCostOneDaySubQueryRespVOList &&
        item.inpPatsCostOneDaySubQueryRespVOList.length > 0
      ) {
        return `<div style="margin-bottom:10px;"><div style="${cssStyle.title}${
          cssStyle.titleSize
        }${cssObj.fontBold};margin-bottom:10px;">${item.hospitalName}</div>
  <div style="${cssStyle.title}${cssStyle.titleSize}${cssStyle.titleSize}${
          cssObj.fontBold
        };margin-bottom:15px;">病人住院费用一日清单</div>
  <section style="display:flex;font-size:18px;${
    cssObj.fontBold
  };margin-bottom:4px;"> <span style="width:30%;">患者ID：${
          item.patientId
        }</span><span style="width:25%;">姓名：${item.name}</span><span style="width:20%;">性别：${
          item.sex
        }</span><span style="width:25%;">费别：${item.chargeType}</span></section>
  <section style="display:flex;font-size:18px;${
    cssObj.fontBold
  };margin-bottom:4px;"> <span style="width:30%;">科室：${
          item.deptName
        }</span><span style="width:25%;">床位：${
          item.bedNo
        }</span><span style="width:45%;">入院时间：${item.admissionDateTime}</span></section>
  <section style="display:flex;font-size:18px;${
    cssObj.fontBold
  };margin-bottom:4px;"> <span style="width:100%;">费用区间：${
          item.startDateTime
        }<span style="margin-left:12px;margin-right:12px;">至</span>${
          item.endDateTime
        }</span></section>
            <section style="margin-top:10px;width:100%;">
              <table style="${cssStyle.tableBorder}font-size:14px;">
              <thead style="width:100%;">
              <tr style="width:100%;"><th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        }">代码</th><th style="width:28%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        };overflow:hidden;">项目名称</th><th style="width:10%;${cssObj.tdCenter}${
          cssStyle.tdBorder
        }${cssObj.tdH}">单位</th><th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        };overflow:hidden;">规格</th><th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        }">数量</th><th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        }">单价</th><th style="width:10%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        }">金额</th><th style="width:8%;${cssObj.tdCenter}${cssStyle.tdBorder}${
          cssObj.tdH
        }">收费等级</th></tr>
              </thead>
                <tbody style="white-space: nowrap;">
                  ${getRow(item.inpPatsCostOneDaySubQueryRespVOList)}
                </tbody>
            </table>
            <div style="font-size:16px;height:24px;margin-top:6px;text-align:right;">合计：${
              item.totalCost || '0'
            }</div>
            </section>
            <div style="font-size:16px;height:24px;margin-top:6px;${cssObj.flexBetween}">
              <div>总费用：${item.totalCharges || '0'}</div>
              <div>预交金：${item.prepayments || '0'}</div>
              <div>预交金余额：${item.zyyjye || '0'}</div>
            </div>
          </div>`
      }
    })
    .join('')
}
const getRow = (inpPatsCostOneDaySubQueryRespVOList) => {
  return inpPatsCostOneDaySubQueryRespVOList
    .map((item) => {
      return `<tr>
        <td style="width:10%;text-align:left;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.itemCode
      }</td>
        <td style="width:28%;text-align:left;${cssStyle.tdBorder}${cssObj.tdH};overflow:hidden">${
        item.itemName
      }</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${item.units}</td>
        <td style="width:8%;font-size:12px;${cssStyle.tdBorder}${cssObj.tdH};overflow:hidden;">
        ${item.itemSpec}</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.amount
      }</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.itemPrice
      }</td>
        <td style="width:10%;text-align:center;${cssStyle.tdBorder}${cssObj.tdH}">${
        item.charges
      }</td>
        <td style="text-align:center;${cssStyle.tdBorder}${
        cssObj.tdH
      };"><div style="width:60px;height:12px;overfow:hidden;font-size:12px;line-height:12px;overflow-wrap: break-word;">${
        item.insurClass ? item.insurClass.substring(0, 5) : ''
      }</div><div style="width:60px;height:12px;overfow:hidden;font-size:12px;line-height:12px;overflow-wrap: break-word;">${
        item.insurClass && item.insurClass.length > 5 ? item.insurClass.substring(5, 10) : ''
      }</div></td>
    </tr>`
    })
    .join('')
}
const html = (data): string => {
  return `<section style="${
    cssObj.printContainer
  };padding-left:10px;padding-right:10px;width:100%;height:96vh;padding-bottom:10px;">
  <style type="text/css" media="print">@page { size: A4}</style>
          ${getLists(data.dataList)}
          </section><div class="paging"></div>`
}
export default html
