import { cssStyle as style } from './index'

export interface CheckItemProps {
  consultationDoctorName: string
  consultationDeptName: string
}
export interface CheckIdeaProps {
  consultationDoctorName?: string
  consultationIdea?: string
}
export interface DataProps {
  hospitalName: string // 医院名称
  patientId: string
  visitId: number
  name: string
  age: string
  sex: string
  deptName: string
  inpNo: number
  applyDateTime: string
  consultationDateTime: string
  consultationExplain: string
  consultationType: string
  bedLabel: string
  consultationApplyDoctor: string
  prescDetailVOList: CheckItemProps[]
  submitIdeaLists: CheckIdeaProps[]
}
const cssStyle = {
  ...style,
  divLine: `${style.flexBetween}line-height:24px;`,
  growleft: 'width:33%;text-align:left;line-height:26px;'
}
export const getCheckItem = (item: CheckItemProps): string => {
  return `<div style="width:80%;height:30px;line-height:30px;display:flex;${cssStyle.flexBetween}">
              <section style="width:40%;height:30px;line-height:30px;display:flex;"><div style="flex:1;height:30px;line-height:30px;"><span style="display:block;width:100%;line-height:30px;text-align:center;border-bottom:1px solid black">${
                item.consultationDeptName
              }</span></div><div style="width:30px;text-align:center;height:30px;line-height:30px;">科</div></section>
              <section style="width:60%;height:30px;line-height:30px;display:flex;"><div style="flex:1;height:30px;line-height:30px;"><span style="display:block;width:100%;line-height:30px;height:30px;text-align:center;border-bottom:1px solid black">${
                item.consultationDoctorName || ''
              }</span></div><div style="width:84px;text-align:center;height:30px;line-height:30px;">医师会诊</div></section>
            </div>`
}
export const getCheckIdea = (item: CheckIdeaProps): string => {
  return `<div style="width:100%;line-height:24px;${cssStyle.flexBetween}">
              <section style="width:100%;">${item.consultationDoctorName}：${item.consultationIdea}</section>
            </div>`
}

const html = (data: DataProps): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}${cssStyle.borderbox}">
            <style type="text/css" media="print">@page { size: A4 portrait; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}margin-bottom:8px;margin-top:8px;${
    cssStyle.subTitleSize
  }">会诊申请单</div>
            <div style="margin-bottom:4px;width:100%;">             
                <section style="display:flex;justify-content: space-around;width:100%;">
              <div style="width:30%;text-align:left;line-height:26px;">姓名：${data.name}</div>
              <div style="width:15%;text-align:left;line-height:26px;">年龄：${data.age}</div>
              <div style="width:15%;text-align:left;line-height:26px;">性别：${data.sex}</div>
              <div style="width:40%;text-align:left;line-height:26px;">会诊日期：${
                data.applyDateTime
              }</div>
            </section>
                <section style="display:flex;width:100%;">
              <div style="width:30%;text-align:left;line-height:26px;">病人ID：${
                data.patientId
              }</div>
              <div style="width:30%;text-align:left;line-height:26px;display:${
                data.bedLabel ? 'block' : 'none'
              }">床号：${data.bedLabel}</div>
              <div style="width:40%;text-align:left;line-height:26px;display:${
                data.inpNo ? 'block' : 'none'
              }"">住院号：${data.inpNo}</div>
            </section>
            <section style="display:flex;justify-content: space-around;width:100%;">
              <div style="width:30%;text-align:left;line-height:26px;">申请医师：${
                data.consultationApplyDoctor || ''
              }</div>
              <div style="width:30%;text-align:left;line-height:26px;">申请时间：${
                data.consultationDateTime || ''
              }</div>
              <div style="width:40%;text-align:left;line-height:26px;">申请科室：${
                data.deptName
              }</div>
            </section>
            </div>
            <div style="border:1px solid black;height:calc(98vh - 190px)">
              <div style="border-bottom:1px solid black;height:30%;position:relative;padding:6px;">
                <div style="display:flex;">
                  <div style="flex:1;font-weight:bold;">简要病历及会诊目的：</div>
                  <div style="width:140px;font-weight:bold;">会诊类型：${
                    data.consultationType
                  }</div>
                </div>
                <div>${data.consultationExplain}</div>
                <div style="display:flex;position:absolute;left:0;bottom:4px;width:100%;padding-left:6px;">
                  <span style="width:30px;">请</span>
                  <div style="flex:1;clear:both">               
                      ${data.prescDetailVOList.map((item) => getCheckItem(item)).join('')}
                  </div>
                </div>
              </div>
              <div style="height:70%;padding:6px;overflow:hidden;">
                  <div style="font-weight:bold;">会诊意见：</div>
                  ${data.submitIdeaLists.map((item) => getCheckIdea(item)).join('')}
              </div>
            </div>         
            </div>
          </section><div class="paging"></div>`
}

export default html
