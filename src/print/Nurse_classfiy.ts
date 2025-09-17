import { cssStyle } from './index'
import { formatDate } from '@/utils/formatTime'
import groupitem from '@/assets/INP/DoctorAdvice/groupitem.svg'
import groupstart from '@/assets/INP/DoctorAdvice/groupstart.svg'
import groupend from '@/assets/INP/DoctorAdvice/groupend.svg'
const cssObj = {
  ...cssStyle,
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  tHCenter: `height:24px;line-height:24px;text-align:center;border: .5px solid black;border-top-width: 0;border-left-width: 0;`,
  tdH: 'height:32px;line-height:32px;border: .5px solid black;border-top-width: 0;border-left-width: 0;'
}
// 分组标志
const mapGroupIcon = (row) => {
  let imgsrc = ''
  if (row.orderNum > 1) {
    if (row.orderSubNo === 1) {
      imgsrc = groupstart
    } else if (row.orderNum !== row.orderSubNo) {
      imgsrc = groupitem
    } else {
      imgsrc = groupend
    }
    return !!row.orderNum
      ? `<img alt="" style="width:14px;height:14px;float:right;margin-top:5px;" src="${imgsrc}" />`
      : ''
  } else {
    return ''
  }
}
const getRow = (list) => {
  return list
    .map((item) => {
      if (!item.patientId) {
        return `<tr style="width:100%;display:flex">
                  <td style="width:100%;text-align:left;${cssStyle.tdBorder}${
          cssObj.tdH
        };height:32px;line-height:32px;overflow:hidden;font-weight:bold;font-size:16px"><span>床号：${
          item.bedLabel || ''
        }</span><span style="margin-left:20px;">姓名：${
          item.name || ''
        }</span><span style="margin-left:20px;">性别：${
          item.sex || ''
        }</span><span style="margin-left:20px;">年龄：${
          item.age || ''
        }</span><span style="margin-left:20px;">住院号：${item.inpNo || ''}</span></td>
                </tr>`
      }
      return `<tr style="width:100%;display:flex">
        <td style="width:12%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;">${
        item.startDateTime ? formatDate(new Date(item.startDateTime), 'MM-DD HH:mm') : ''
      }</td>
        <td style="width:32%;text-align:left;overflow:hidden;${cssStyle.tdBorder}${
        cssObj.tdH
      };line-height:${item.orderText && item.orderText.length >= 20 ? '14px' : '32px'};font-size:${
        item.orderText && item.orderText.length >= 20 ? '12px' : '14px'
      };">${item.orderText ? item.orderText : ''}${mapGroupIcon(item)}</td>
        <td style="width:7%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;">${item.dosage ? item.dosage : ''}${
        item.dosageUnits ? item.dosageUnits : ''
      }</td>
        <td style="width:8%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;">${item.frequency ? item.frequency : ''}</td>
        <td style="width:10%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;line-height:${
        item.administration && item.administration.length > 4 ? '16px' : '32px'
      };font-size:${item.administration && item.administration.length > 4 ? '12px' : '14px'};">${
        item.administration ? item.administration : ''
      }</td>
        <td style="width:11%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;line-height:${
        item.freqDetail && item.freqDetail.length > 8 ? '16px' : '32px'
      };font-size:${item.freqDetail && item.freqDetail.length > 8 ? '12px' : '14px'};">${
        item.freqDetail ? item.freqDetail : ''
      }</td>
        <td style="width:10%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;line-height:${
        item.performSchedule && item.performSchedule.length > 8 ? '16px' : '32px'
      };font-size:${item.performSchedule && item.performSchedule.length > 8 ? '12px' : '14px'};">${
        item.performSchedule ? item.performSchedule : ''
      }</td>
        <td style="width:10%;text-align:left;${cssStyle.tdBorder}${
        cssObj.tdH
      };height:32px;overflow:hidden;"></td>
    </tr>`
    })
    .join('')
}

const getItem = (dataList) => {
  return dataList.map((item) => {
    return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR};height:96vh;">
  <style type="text/css" media="print">@page { size: A4;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}${
      cssObj.fontBold
    };margin-bottom:12px;">分类执行单（ ${item.ordersType || ''}）</div>
  <section style="display:flex;justify-content:center;font-size:16px;height:32px;line-height:32px;"> <span style="width:22%;text-align:center">日期：${
    item.printTime
  }</span><span style="width:28%;text-align:center">${
      item.hospitalName
    }</span><span style="width:25%;text-align:center">${
      item.deptName
    }</span><span style="width:25%;text-align:center">打印时间:${formatDate(
      new Date(),
      'MM-DD HH:mm'
    )}</span></section>
            <section style="width:100%;">
              <table style="border-collapse: collapse;border-top: 1px solid black;border-left: 1px solid black;width:100%;">
                <tr style="width:100%;display:flex">
                    <th style="width:12%;${cssObj.tHCenter}">开始时间</th>
                    <th style="width:32%;${cssObj.tHCenter}">药品名称</th>
                    <th style="width:7%;${cssObj.tHCenter}">剂量</th>
                    <th style="width:8%;${cssObj.tHCenter}">频次</th>
                    <th style="width:10%;${cssObj.tHCenter}">用法</th>
                    <th style="width:11%;${cssObj.tHCenter}">医生说明</th>
                    <th style="width:10%;${cssObj.tHCenter}">执行时间</th>
                    <th style="width:10%;${cssObj.tHCenter}">签名</th>
                  </tr>
                ${getRow(item.checkLists)}
            </table>
            </section>
          </section><div class="paging"></div>`
  })
}

const html = (data): string => {
  return `${getItem(data.dataList)}`
}
export default html
