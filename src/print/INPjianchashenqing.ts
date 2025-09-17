import { cssStyle } from './index'

export interface CheckItemProps {
  examNo?: string
  examItemNo: string // 序号
  examItem: string // 项目内容
  costs: number // 计价费用
  bodyName: string
}
export interface DataProps {
  hospitalName?: string // 医院名称
  examClass?: string //申请单类型
  examNo?: string //申请单号
  performedByName?: string // 执行科室
  name?: string // 姓名
  sex?: string // 性别
  age?: string // 年龄
  chargeType?: string // 费别
  ID?: string // ID编号
  clinSymp?: string // 症状
  physSign?: string // 体征
  clinDiag?: string // 诊断
  img?: string // 条形码
  examNoImg: string // 申请单号二维码
  executiveDepartmen?: string // 执行科室
  reqDeptName?: string // 申请科室
  reqPhysician?: string // 申请医生
  reqDateTime?: string // 申请时间
  costs?: number // 检查金额
  printTime?: string // 打印时间
  printItemRespVOList: CheckItemProps[] // 检查项目
  bedNo: string
  inpNo: string
  relevantLabTest: string
  relevantDiag: string
  notice: string
  deptAddr?: string
  doctorUser: string
  ukeySignValue: string
}
export const getCheckItem = (item: CheckItemProps, index: number): string => {
  return `<div style="padding-left:2%;padding-right:20%;font-weight:bold;${cssStyle.flexBetween}">
              <section style="width:65%;">${index + 1}、${item.examItem}</section>
              <section style="width:20%;">${item.costs}</section>
            </div>`
}

const html = (data: DataProps): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}height:46vh;">
            <style type="text/css" media="print">@page { size: A4 portrait;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}margin-bottom:10px;">住院${
    data.examClass
  }申请单</div>
            <div style="${
              cssStyle.border2pxBottom
            };margin-bottom:4px;width:100%;padding-bottom:4px;"><div style="display:flex;"><img style="width:130px;height:38px;" src="${
    data.examNoImg
  }" alt="" />
              <div style="flex:1">
                <div style="${cssStyle.flexBetween};width:100%;">
                
                  <section style="width:30%;line-height: 38px;overflow:hidden;">姓名:${
                    data.name
                  }</section>
                  <section style="width:15%;line-height: 38px;">性别:${data.sex}</section>
                  <section style="width:15%;line-height: 38px;">年龄:${data.age}${
    Number(data.age) < 1 ? '月' : '岁'
  }</section>
                  <section style="width:15%;line-height: 38px">床号:${data.bedNo}</section>
                  <section style="width:25%;line-height: 38px">费别:${data.chargeType}</section>
                </div>
              </div>
              <img style="width: 130px; height: 38px;" src="${data.img}" alt="" /></div>
              <div style="display:flex">
                  <section style="width:25%;">申请单号:${data.examNo}</section>
                  <section style="width:20%;">住院号:${data.inpNo}</section>
                  <section style="width:30%">执行科室:${data.performedByName}</section>
                  <section style="width:25%;text-align:right;">ID号:${data.ID}</section>
              </div>
            </div>
            <div>
              <span style="${cssStyle.wordBetween}${cssStyle.labelStyle}">症状</span>：<span>${
    data.clinSymp || ''
  }</span>
  </div>
            <div><span style="${cssStyle.wordBetween}${cssStyle.labelStyle}">体征</span>：${
    data.physSign || ''
  }</div>
            <div style="${cssStyle.flexBetween}"><div style="flex:1;"><span style="${
    cssStyle.wordBetween
  }${cssStyle.labelStyle}">临床诊断</span>：<span>${data.clinDiag || ''}</span></div>
  <div style="flex:1;"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">其他诊断</span>：<span>${data.relevantDiag || ''}</span></div>
            </div>
            <div><span style="${cssStyle.wordBetween}${cssStyle.labelStyle}">相关化验</span>：${
    data.relevantLabTest || ''
  }</div>
  <div style="${cssStyle.flexBetween}"><div style="width:50%"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">注意事项</span>：${data.notice || ''}</div>
              <section style="width:50%">执行科室地址：${
                data.deptAddr ? data.deptAddr : ''
              }</section></div>
            <div style="margin-bottom:7px;width:70%;${cssStyle.flexBetween}">
              <section style="font-weight:bold;">检查项目：</section>
            </div>
         ${data.printItemRespVOList.map((item, index) => getCheckItem(item, index)).join('')}
            <div style="position:absolute;left:0;bottom:10px;width:100%">
              <section style="font-weight:400;${
                cssStyle.flexBetween
              }border-bottom:2px solid black; padding-right:20px">
                  <section>申请科室：${data.reqDeptName}</section>
                  <section style="position:relative">申请医生：${
                    data.ukeySignValue == undefined || data.ukeySignValue == ''
                      ? `<span>${data.reqPhysician}</span>`
                      : `<img src="${
                          data.ukeySignValue || ''
                        }" style="position:absolute;left:60px;bottom:1px;width:60px;height:30px;" />`
                  }</section>
                  <section>申请时间：${data.reqDateTime}</section>
            </section>
            <section style="${cssStyle.flexBetween}padding-right:20px">
              <section><span style="font-weight:bold">温馨提示：此单检查金额：</span>${
                data.costs || ''
              }元</section>
              <section><span style="font-weight:bold">打印时间：</span>${new Date().toLocaleString()}</section>
            </section>
            </div>
          </section><div class="paging"></div>`
}

export default html
