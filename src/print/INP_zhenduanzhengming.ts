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
            <div style="${cssStyle.title}${cssStyle.titleSize}margin:6px 0;">诊断证明书<span>${
    data.printNo && Number(data.printNo) > 1 ? '（补）' : ''
  }</span></div>
            <div style="text-align: left;margin:15px 0;">就诊科室：${data.deptName}</div>
            <div style="border:1px solid black;margin-bottom:12px;height:calc(96vh - 180px);width: 96%;">
            <div style="${cssStyle.flexBetween}${
    cssStyle.border1pxBottom
  }height:45px;line-height:45px;">
                  <section style="width:15%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">姓名：</section>
                  <section style="width:30%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">${data.name}</section>
                  <section style="width:10%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">性别：</section>
                  <section style="width:10%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">${data.sex}</section>
                  <section style="width:10%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">年龄：</section>
                  <section style="width:25%;padding-left:5px;${cssStyle.borderbox}">${
    data.age
  }</section>
                </div>
            <div style="${cssStyle.flexBetween}${
    cssStyle.border1pxBottom
  }height:45px;line-height:45px;"">
                  <section style="width:15%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">病人ID：</section>
                  <section style="width:30%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">${data.patientId || ''}</section>
                  <section style="width:10%;padding-left:5px;border-right:1px solid black;${
                    cssStyle.borderbox
                  }">住址：</section>
                  <section style="width:45%;padding-left:5px;${
                    cssStyle.borderbox
                  };height:45px;overflow:hidden;">${data.mailingAddress || ''}</section>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">诊断</div>
              <div style="width:85%;padding-left:5px;padding-top:5px;${
                cssStyle.borderbox
              };line-height:24px;height:96px;overflow:hidden">${data.diagDescArr
    .map((item) => getItem1(item))
    .join('')}</div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:192px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:192px;${
                cssStyle.borderbox
              }">建议</div>
              <div style="width:85%;padding-left:5px;padding-top:5px;${
                cssStyle.borderbox
              };line-height:24px;height:192px;overflow:hidden">${data.proPoseArr
    .map((item) => getItem1(item))
    .join('')}</div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:48px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:48px;${
                cssStyle.borderbox
              }"><span>生化检查</span></div>
              <div style="width:85%;${
                cssStyle.borderbox
              };line-height:24px;padding-left:5px;overflow:hidden;height:48px;"></div>
            </div>
            <div style="${cssStyle.flexBetween}${cssStyle.border1pxBottom};height:96px;">
              <div style="width:15%;padding-left:5px;border-right:1px solid black;text-align:center;line-height:96px;${
                cssStyle.borderbox
              }">处理</div>
              <div style="width:85%;${
                cssStyle.borderbox
              };line-height:24px;padding-left:5px;overflow:hidden;height:96px;">${
    data.operationRecord
  }</div>
            </div>
            <div style="${cssStyle.flexBetween}height:32px;line-height:32px;${cssStyle.borderbox}">
              <div style="width:40%;padding-left:5px;position:relative;top:8px;">日期：${new Date().toLocaleString()}</div>
              ${
                data.ukeySignValue == undefined || data.ukeySignValue == ''
                  ? `<div style="width:60%;position:relative;top:8px;">医生签字：<span>${
                      data.doctor || ''
                    }</span></div>`
                  : `<div style="width:60%;">医生签字：<img src="${data.ukeySignValue}" style="position:relative;top:8px;width:60px;height:30px;" /></div>`
              }
            </div>

          </section>`
}

export default html
