/**
 * 诊断证明
 */

import { cssStyle } from './index'
export const getItem1 = (item): string => {
  return `<section>${item}</section>`
}
export const getItem2 = (item): string => {
  return `<section>${item}</section>`
}
export const getItem3 = (item): string => {
  return `<section>${item}</section>`
}

const html = (data): string => {
  return `<section style="${cssStyle.printContainer}${
    cssStyle.padding10LR
  }height:96vh;width:148mm;margin-left:50%;">
            <style type="text/css" media="print">@page { size: A4 landscape;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}">
            ${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.titleSize}margin:6px 0 15px;">治疗报告单</div>
            <div style="display:flex;border-bottom:1px solid #333;padding-bottom:6px;">
            <span style="width:33%">患者姓名：${data.name}</span>
            <span style="width:33%">患者ID：${data.patientId}</span>
            <span style="width:34%"
              >来源：${
                data.patientSourc == '1' ? '门诊' : data.patientSourc == '2' ? '住院' : ''
              }</span
            >
          </div>
          <div style="width:100%;display:flex;padding-top:8px;margin-bottom:5px;">
            <span style="width:33%;">开单医生：${data.reqDoctorName}</span>
            <span style="width:33%;">开单日期：${data.reqDateTime}</span>
            <span style="width:34%;">申请单号：${data.appointsId}</span>
          </div>
          <div style="width:100%;display:flex;margin-bottom:5px;">
            <span style="width:33%;">治疗项目：${data.cureClass}</span>
            <span style="width:33%;">治疗频次：${data.frequency}</span>
            <span style="width:34%;">治疗次数：${data.amount}</span>
          </div>
          <div style="width:100%;padding-bottom:8px;display:flex;">
            <span style="width:33%;">计费状态：${data.chargeIndicator}</span>
            <span style="width:38%;">执行科室：${data.cureDeptName}</span>
          </div>
            <div style="border:1px solid black;margin-top:6px;margin-bottom:12px;height:calc(96vh - 252px);width:100%;">     
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">治疗方式</div>
              <div style="width:85%;padding-left:5px;padding-top:5px;${
                cssStyle.borderbox
              };line-height:24px;height:96px;overflow:hidden">${data.description || ''}</div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:120px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;padding-top:20px;line-height:24px;${
                cssStyle.borderbox
              }">治疗过程记录</div>
              <div style="width:85%;padding-left:5px;padding-top:5px;${
                cssStyle.borderbox
              };line-height:24px;height:120px;overflow:hidden">${data.cureImpression || ''}</div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">治疗效果</div>
              <div style="width:85%;padding-left:5px;padding-top:5px;${
                cssStyle.borderbox
              };line-height:24px;height:96px;overflow:hidden">${data.cureResult || ''}</div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">治疗建议</div>
              <div style="width:85%;${
                cssStyle.borderbox
              };line-height:24px;padding-left:5px;overflow:hidden;height:96px;">${
    data.advice || ''
  }</div>
            </div>
            <div style="${cssStyle.flexBetween};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">备注</div>
              <div style="width:85%;${
                cssStyle.borderbox
              };line-height:24px;padding-left:5px;overflow:hidden;height:96px;">${
    data.memo || ''
  }</div>
            </div></div>
            <div style="${cssStyle.flexBetween}height:32px;line-height:32px;${cssStyle.borderbox}"> 
            <div style="width:70%;padding-left:5px;"></div>
              <div style="width:30%;padding-left:5px;">打印日期：${data.printDate}</div>
            </div>
          </section>`
}

export default html
