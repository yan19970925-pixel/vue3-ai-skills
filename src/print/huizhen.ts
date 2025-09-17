import { cssStyle as style } from './index'

export interface CheckItemProps {
  consultationDoctor: string
  consultationDept: string
}
export interface CheckIdeaProps {
  consultationDoctor?: string
  consultationIdea?: string
}
export interface DataProps {
  hospitalName: string // 医院名称
  patientId: string
  name: string
  visitDate: string
  visitNo: number
  deptName: string
  applyDateTime: string
  consultationExplain: string
  consultationType: string
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
  return `<div style="width:100%;height:30px;line-height:30px;display:flex;${cssStyle.flexBetween}">
              <section style="width:50%;height:30px;line-height:30px;display:flex;"><div style="flex:1;height:30px;line-height:30px;"><span style="display:block;width:100%;line-height:30px;text-align:center;text-decoration: underline;">${
                item.consultationDept
              }</span></div><div style="width:30px;text-align:center;height:30px;line-height:30px;">科</div></section>
              <section style="width:50%;height:30px;line-height:30px;display:flex;"><div style="flex:1;height:30px;line-height:30px;"><span style="display:block;width:100%;line-height:30px;text-align:center;text-decoration: underline;">${
                item.consultationDoctor || ''
              }</span></div><div style="width:84px;text-align:center;height:30px;line-height:30px;">医师会诊</div></section>
            </div>`
}
export const getCheckIdea = (item: CheckIdeaProps): string => {
  return `<div style="width:100%;height:30px;line-height:30px;${cssStyle.flexBetween}">
              <section style="width:100%;">${item.consultationDoctor}：${item.consultationIdea}</section>
            </div>`
}

const html = (data: DataProps): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}${
    cssStyle.borderbox
  };height:46vh;width:90%;margin-left:5%;">
            <style type="text/css" media="print">@page {size: A4 portrait;margin:0mm;}</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}">会诊申请单</div>
            <div style="margin-bottom:4px;width:100%;padding-bottom:4px;">             
                <section style="display:flex;justify-content: space-around;">
              <div style="${cssStyle.growleft}">姓名：${data.name}</div>
              <div style="${cssStyle.growleft}">病人ID：${data.patientId}</div>
              <div style="${cssStyle.growleft}">就诊日期：${data.visitDate}</div>
            </section>
            <section style="display:flex;justify-content: space-around;">
              <div style="${cssStyle.growleft}">申请科室：${data.deptName}</div>
              <div style="${cssStyle.growleft}">申请医师：${data.consultationApplyDoctor}</div>
              <div style="${cssStyle.growleft}">会诊日期：${data.applyDateTime}</div>
            </section>
            </div>
            <div style="border:1px solid black;height:calc(46vh - 220px)">
              <div style="border-bottom:1px solid black;height:40%;position:relative;padding:6px;">
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
              <div style="height:60%;padding:6px;">
                  <div style="font-weight:bold;">会诊意见：</div>
                  ${data.submitIdeaLists.map((item) => getCheckIdea(item)).join('')}
              </div>
            </div>         
            </div>
          </section><div class="paging"></div>`
}

export default html
