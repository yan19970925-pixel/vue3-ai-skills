import { cssStyle } from './index'
export const getCheckItem = (item): string => {
  return `<div style="width:100%;height:24px;line-height:24px;${cssStyle.flexBetween}">
              <section style="width:30%;overflow:hidden;height:24px;">${
                item.itemCode || ''
              }</section>
              <section style="width:55%;overflow:hidden;height:24px;">${
                item.itemName || ''
              }</section>
              <section style="width:15%;text-align:center">${item.charges || ''}</section>
            </div>`
}
const html = (data) => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}height: 48vh;width:40%;">
        <style type="text/css" media="print">@page { size: A4; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName || ''}</div>
            <div style="${cssStyle.title}${
    cssStyle.subTitleSize
  };margin: 10px 0 10px;position:relative;">
              <span>退费申请凭证</span>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 40%;"><span style="${cssStyle.formLabel}">姓名：</span>${
    data.name || ''
  }</section>
            <section style="width: 60%;"><span style="${cssStyle.formLabel}">病人ID：</span>${
    data.patientId || ''
  }</section>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 40%;"><span style="${cssStyle.formLabel}">费别：</span>${
    data.chargeType || ''
  }</section>
              <section style="width: 60%;"><span style="${cssStyle.formLabel}">科室：</span>${
    data.deptName || ''
  }</section>
            </div>
            <div style="width:100%;height:24px;line-height:24px;${
              cssStyle.flexBetween
            };border-top:2px solid black;">
              <section style="width:30%;font-size:15px;">项目编码</section>
              <section style="width:55%;text-align:center;font-size:15px;">项目名称</section>
              <section style="width:15%;text-align:center;font-size:15px;">金额</section>
            </div>
         ${data.checkItems.map((item) => getCheckItem(item)).join('')}
            <div style="margin-bottom:10px;margin-top:15px;">退费原因：</div>
            <div style="width:100%;display:flex;justify-content:space-between;">           
            <section style="width: 50%;">医生手签：</section><section style="width: 50%;">${
              data.reqDateTime || ''
            }</section></div>
          </section><div class="paging"></div>`
}

export default html
