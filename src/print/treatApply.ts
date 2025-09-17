import { cssStyle } from './index'

const html = (data) => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}height: 48vh;">
        <style type="text/css" media="print">@page { size: A4; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${
    cssStyle.subTitleSize
  };margin: 15px 0 10px;padding-bottom:15px;${cssStyle.border2pxBottom};position:relative;">
              <span>介入放射诊治申请单</span>
              <div style="position:absolute;right:0;bottom:0;font-size:14px;">
              <span>发送部门：${data.cureDeptName || ''}</span></div>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
            <section style="width: 20%;"><span style="${cssStyle.formLabel}">病人ID：</span>${
    data.patientId || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">姓名：</span>${
    data.name || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">性别：</span>${
    data.sex || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">年龄：</span>${
    data.age || ''
  }</section>
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">申请类别：</span>${
    data.cureClass || ''
  }</section>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 25%;"><span style="${cssStyle.formLabel}">科别：</span>${
    data.deptName || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">床位：</span>${
    data.bedLabel || ''
  }</section>
              <section style="width: 15%;"><span style="${cssStyle.formLabel}">住院标识：${
    data.visitId || ''
  }</span></section><section style="width: 25%;"><span style="${
    cssStyle.formLabel
  }">病人来源：</span>${
    data.patientSourc == '1'
      ? '门诊'
      : data.patientSourc == '2'
      ? '病房'
      : data.patientSourc == '3'
      ? '外来'
      : data.patientSourc == '4'
      ? '急诊'
      : ''
  }</section>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;margin-top:6px;">
              <section style="width: 100%;height:60px;"><span style="${
                cssStyle.formLabel
              }">病历摘要：</span>${data.summary || ''}</section>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 100%;height:60px;"><span style="${
                cssStyle.formLabel
              }">临床诊断：</span>${data.clinic || ''}</section>
            </div>
            <div style="${cssStyle.flexBetween}padding:4px 0;">
              <section style="width: 100%;height:60px;"><span style="${
                cssStyle.formLabel
              }">治疗部位及方法：</span>${data.reqMemo || ''}</section>
            </div>
            <div style="width:100%;border-top:2px solid black;position:absolute;bottom:0;left:0;display:flex;justify-content:space-between;"><section style="width: 33%;">申请科室：${
              data.reqDeptName || ''
            }</section>
            <section style="width: 33%;">申请医师：${
              data.reqDoctorName || ''
            }</section><section style="width: 33%;">申请时间：${
    data.reqDateTime || ''
  }</section></div>
          </section><div class="paging"></div>`
}

export default html
