import { cssStyle } from './index'

export interface CheckItemProps {
  itemNo: number
  itemName: string // 项目内容
  charges: string // 价格
  sampleSize?: string
}

export interface LabBloodItemProps {
  itemNo: string
  itemName: string
  charges: number
}
export interface DataProps {
  hospitalName: string // 医院名称
  billType: string //申请单类型
  testNo: string //申请单号
  name: string // 姓名
  sex: string // 性别
  age: string // 年龄
  phoneNumberHome?: string // 病人电话
  chargeType: string // 费别
  patientId: string // ID编号
  specimen: string // 标本
  relevantClinicDiag: string // 诊断
  img: string // id条形码
  testNoImg: string // 申请单号条形码
  zxks: string // 执行科室
  sqks: string // 申请科室
  orderingProvider: string // 申请医生
  sqrq: string // 申请时间
  totalFee: string // 检查金额
  printTime: string // 打印时间
  ewmUrl: string // 支付二维码
  labBloodItems: LabBloodItemProps[] // 材料
  // 检查项目
  labPrintItems: CheckItemProps[]
  priorityIndicator?: number
  deptAddr?: string
  ukeySignValue: string //医师签名图片
}

const labBlood = (list: LabBloodItemProps[]) => {
  return list
    .map((item) => `<div style="${cssStyle.fontBold}">${item.itemName}：${item.charges}</div>`)
    .join('')
}

const getCheckItem = (item: CheckItemProps): string => {
  return `<div style="${cssStyle.fontFamily}padding-left:2%;padding-right:2%;font-weight:bold;${
    cssStyle.flexBetween
  }">
              <section style="min-width:150px;flex-grow:1;">${item.itemNo}、${
    item.itemName
  }</section>
              <section style="width:100px;flex-shrik:0;margin-left:10px;">${item.charges}</section>
              <section style="text-align:right; width:100px;flex-shrik:0;margin-left:10px;">${
                item.sampleSize || ''
              }</section>
            </div>`
}

const html = (data: DataProps): string => {
  const str = data.priorityIndicator
    ? `<span style="width:30px;height:30px;line-height:30px;padding:2px;border-radius: 50%;border:1px solid black;position:absolute;right:26%">${
        data.priorityIndicator ? '急' : ''
      }</span>`
    : ``
  return `<section style="${cssStyle.printContainer}${
    cssStyle.padding10LR
  }width:50%;margin-left:50%;">
  <style type="text/css" media="print">@page { size: A4 landscape;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}position:relative">${
    data.billType
  }${str}</div>
            <div style="${cssStyle.flexBetween}">
              <img style="width:142px;height:32px;" src="${data.testNoImg}" alt="" />
              <section style="line-height:32px;">病人电话：${data.phoneNumberHome}</section>
              <img style="width:142px;height:32px;" src="${data.img}" alt="" /></div>
            <div style="${cssStyle.flexBetween}margin-bottom:4px">
              <section>申请单号：${data.testNo}</section>
              <section>姓名：${data.name}</section>
              <section>性别：${data.sex}</section>
              <section>年龄：${data.age}${Number(data.age) < 1 ? '月' : '岁'}</section>
            </div>
            <div style="${cssStyle.border2pxBottom}${cssStyle.flexBetween}margin-bottom:4px">
              <section>费别：${data.chargeType}</section>
              <section>ID号：${data.patientId}</section>
            </div>
            <div style="padding-left:5%;">
              <span style="${cssStyle.wordBetween}${cssStyle.labelStyle}">临床诊断</span>：<span>${
    data.relevantClinicDiag || ''
  }</span>
            </div>
            <div style="padding-left:5%"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">标本</span>：${data.specimen}</div>
            <div style="padding-left:5%;${
              cssStyle.flexBetween
            }"><div style="width:50%;"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">执行科室</span>：<span>${data.zxks}</span></div><div style="width:50%;"><span style="${
    cssStyle.labelStyle
  }">执行科室地址</span>：<span>${data.deptAddr ? data.deptAddr : ''}</span></div>
            </div>
            <div style="padding-left:5%;">
              <section style="font-weight:bold;margin-bottom:7px;">检验项目：</section>
              ${data.labPrintItems
                .sort((a, b) => a.itemNo - b.itemNo)
                .map((item) => getCheckItem(item))
                .join('')}
            </div>
            <div style="position:absolute;left:0;bottom:10px;width:100%;${cssStyle.padding10LR}">
            ${labBlood(data.labBloodItems || [])}
             <div style="display:inline-block;width:200px;text-align:center;position:absolute;right:20px;top:-140px;">
          <img src="${data.ewmUrl}" style="width:120px;height:120px;" v-if="${
    data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
  }">
          <div style="text-align:center;">扫描上方二维码支付</div>
        </div>
              <section style="font-weight:400;${
                cssStyle.flexBetween
              }border-bottom:2px solid black; padding-right:20px">
                  <section>申请科室：${data.sqks}</section>
                  <section style="position:relative">申请医生：${
                    data.ukeySignValue == undefined || data.ukeySignValue == ''
                      ? `<span>${data.orderingProvider}</span>`
                      : `<img src="${
                          data.ukeySignValue || ''
                        }" style="position:absolute;left:60px;bottom:1px;width:60px;height:30px;" />`
                  }</section>
                  <section>申请时间：${data.sqrq}</section>
            </section>
            <section style="${cssStyle.flexBetween}padding-right:20px">
              <section><span style="font-weight:bold">温馨提示：此单检验金额：</span>${
                data.totalFee
              }元</section>
              <section><span style="font-weight:bold">打印时间：</span>${data.printTime}</section>
            </section>
            </div>
          </section><div class="paging"></div>`
}

export default html
