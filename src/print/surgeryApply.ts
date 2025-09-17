import { cssStyle } from './index'

const html = (data) => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}height: 48vh;">
        <style type="text/css" media="print">@page { size: A4; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}margin: 5px 0;">
              <span>手术申请单</span>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 30%;"><span style="${cssStyle.formLabel}">姓名：</span>${
    data.name || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">性别：</span>${
    data.gender || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">年龄：</span>${
    data.age || ''
  }</section>
              <section style="width: 30%;"><span style="${cssStyle.formLabel}">[${
    data.emergencyIndicator ? '急诊' : '平诊'
  }]</span></section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 30%;"><span style="${cssStyle.formLabel}">科别：</span>${
    data.deptName || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">病室：</span>${
    data.operatingRoomName || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">床位：</span>${
    data.bedNo || ''
  }</section>
              <section style="width: 30%;"><span style="${cssStyle.formLabel}">住院号：${
    data.inpNo || ''
  }</span></section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 100%;"><span style="${cssStyle.formLabel}">诊断：</span>${
    data.diagBeforeOperation || ''
  }</section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 100%;"><span style="${cssStyle.formLabel}">手术名称：</span>${
    data.operationName || ''
  }</section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">手术者：</span>${
    data.surgeon || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">第一助手：</span>${
    data.firstAssistant || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">第二助手：</span>${
    data.secondAssistant || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">第三助手：${
    data.thirdAssistant || ''
  }</span></section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 100%;"><span style="${
                cssStyle.formLabel
              }">术中特殊准备：</span>${data.notesOnOperation || ''}</section>
            </div>
            <div style="${cssStyle.border1pxBottom}${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">麻醉者：</span>${
    data.anesthesiaDoctor || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">麻醉方式：</span>${
    data.anesthesiaMethod || ''
  }</section>
              <section style="width: 50%;"><span style="${
                cssStyle.formLabel
              }">计划施术日期：</span>${data.scheduledDateTime || ''}</section>
            </div>
            <div style="padding:8px;">科主任意见：</div>
            <div style="padding:4px 15px;">1.凡需审批的手术均需事先通知（急诊除外）</div>
            <div style="padding:4px 15px;">2.四级及特殊手术科主任审批后需报送至医务科审核备案</div>
            <div style="padding:4px 0;display:flex;justify-content: end;">
              <section style="${cssStyle.flexBetween}width: 25%;padding-right: 20px;">
                <section style="width: 25%;">年</section>
                <section style="width: 25%;">月</section>
                <section style="width: 1%;">日</section>
              </section>
            </div>
          </section><div class="paging"></div>`
}

export default html
