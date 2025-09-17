import { cssStyle } from './index'
import { formatDate } from '@/utils/formatTime'
import groupitem from '@/assets/INP/DoctorAdvice/groupitem.svg'
import groupstart from '@/assets/INP/DoctorAdvice/groupstart.svg'
import groupend from '@/assets/INP/DoctorAdvice/groupend.svg'
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
const getStringLength = (str) => {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length / 2
}
const getRow = (list) => {
  return list
    .map((item) => {
      return `<tr>
        <td style="width:50px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.itemClass === 'A' ? '药品' : '非药品'
      }</td>
        <td style="width:184px;height:28px;line-height:${
          item.itemName && getStringLength(item.itemName) > 12 ? '14px' : '28px'
        };font-size:${item.itemName && getStringLength(item.itemName) > 12 ? '12px' : '14px'};${
        cssStyle.tdBorder
      }">${item.itemName || ''}</td>
        <td style="width:80px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.itemSpec || ''
      }</td>
        <td style="width:40px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.amount || ''
      }</td>
        <td style="width:50px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.units || ''
      }</td>
        <td style="width:40px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.itemPrice || ''
      }</td>
        <td style="width:40px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.costs || ''
      }</td>
        <td style="width:60px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.charges || ''
      }</td>
        <td style="width:80px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.performedByName || ''
      }</td>
      <td style="width:80px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.orderedByName || ''
      }</td>
      <td style="width:60px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.orderDoctor || ''
      }</td>
      <td style="width:50px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.operatorName || ''
      }</td>
      <td style="width:80px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.billingDateTime ? formatDate(new Date(item.billingDateTime), 'YYYY-MM-DD') : ''
      }</td>
      <td style="width:80px;height:28px;text-align:center;${cssStyle.tdBorder}">${
        item.memo || ''
      }</td>
    </tr>`
    })
    .join('')
}

const getItem = (dataList) => {
  return dataList.map((item) => {
    return `<section style="${cssObj.printContainer}${
      cssStyle.padding10LR
    }height:96vh;margin:0 auto 0;">
  <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}${
      cssObj.fontBold
    };margin-bottom:10px;">${item.hospitalName} <span style="margin-left:20px;font-size:20px">${
      item.wardName || ''
    }<span/></div>
  <div style="${cssStyle.title}${cssStyle.subTitleSize}${cssObj.fontBold};margin-bottom:15px;">${
      item.repeatIndicator || ''
    } 医嘱计价单</div>
  <section style="display:flex;justify-content:space-between;font-size:16px;${
    cssObj.fontBold
  };margin-bottom:5px;">
        <span style="width:50%;">打印日期：${item.printDate}</span>
        <span style="padding-right:10px;">第${item.pageNo}/${item.totalPages}页</span>
      </section>
            <section style="width:100%;padding: 10px 5px;">
              <table style="${cssStyle.tableBorder}font-size:14px;width:100%;">
              <thead>
              <tr>
                    <th style="width:50px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">类别</th>
                    <th style="width:184px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">项目名称</th>
                    <th style="width:80px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">规格</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">数量</th>
                    <th style="width:50px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">单位</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">单价</th>
                    <th style="width:40px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">计价金额</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">应收金额</th>
                    <th style="width:80px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">执行科室</th>
                    <th style="width:80px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">申请科室</th>
                    <th style="width:60px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">开单医生</th>
                    <th style="width:50px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">录入员</th>
                    <th style="width:80px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">日期</th>
                    <th style="width:80px;${cssObj.tdCenter}${cssStyle.tdBorder}${
      cssObj.tdH
    }">备注说明</th>
                  </tr>
              </thead>
                <tbody>
                ${getRow(item.checkLists)}
                </tbody>
            </table>
            </section>
          </section><div class="paging"></div>`
  })
}
const html = (data): string => {
  return `${getItem(data.dataList)}`
}
export default html
