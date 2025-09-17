import { getCheckItem, cssStyle, drawLine } from './index'

export interface CheckItemProps {
  id?: string
  text: string // 项目内容
  price: string // 价格
}
export interface DataProps {
  hospitalName: string // 医院名称
  billType: string //申请单类型
  applicationNo: string //申请单号
  name: string // 姓名
  gender: string // 性别
  age: string // 年龄
  expenseType: string // 费别
  ID: string // ID编号
  specimen: string // 标本
  symptom: string // 症状
  sign: string // 体征
  diagnose: string // 诊断
  img: string // 条形码
  executiveDepartmen: string // 执行科室
  applyDepatment: string // 申请科室
  applyDoc: string // 申请医生
  applyTime: string // 申请时间
  amount: string // 检查金额
  printTime: string // 打印时间
  // 检查项目
  checkItems: CheckItemProps[]
  deptAddr?: string
}

const html = (data: DataProps): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding10LR}height:46vh;">
  <style type="text/css" media="print">@page { size: A4 portrait;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}">${data.billType}</div>
            <div style="${cssStyle.flexBetween}"><img style="width:142px;height:42px;" src="${
    data.img
  }" alt="" /> <img style="width:142px;height:42px;" src="${data.img}" alt="" /></div>
            <div style="${cssStyle.border2pxBottom}${cssStyle.flexBetween}margin-bottom:4px">
              <section>申请单号：${Date.now()}</section>
              <section>姓名：${data.name}</section>
              <section>性别：${data.gender}</section>
              <section>年龄：${data.age}${Number(data.age) < 1 ? '月' : '岁'}</section>
              <section>费别：${data.expenseType}</section>
              <section>ID号：${data.ID}</section>
            </div>
            <div style="padding-left:5%;">
              <span style="${cssStyle.wordBetween}${cssStyle.labelStyle}">临床诊断</span>：<span>${
    data.diagnose
  }</span>
            </div>
            <div style="padding-left:5%;"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">标本</span>：${data.specimen}</div>
            <div style="padding-left:5%;${
              cssStyle.flexBetween
            }"><div style="width:50%;"><span style="${cssStyle.wordBetween}${
    cssStyle.labelStyle
  }">执行科室</span>：<span>${
    data.executiveDepartmen
  }</span></div><div style="width:50%;"><span style="${
    cssStyle.labelStyle
  }">执行科室地址</span>：<span>${data.deptAddr ? data.deptAddr : ''}</span></div>
            </div>
            <div style="padding-left:5%;">
              <section style="font-weight:bold;margin-bottom:7px;">检查项目：</section>
              ${data.checkItems.map((item, index) => getCheckItem(item, index)).join('')}
            </div>
     
            <div style="display:flex;justify-content:center;align-items:center;flex-direction:column;">
            ${drawLine(5 - data.checkItems.length)}
            </div>
            
            <div style="position:absolute;left:0;bottom:10px;width:100%;${cssStyle.padding10LR}">
            <div style="${cssStyle.fontBold}">静脉注射（含静脉采血）：5.20</div>
              <section style="font-weight:400;${
                cssStyle.flexBetween
              }border-bottom:2px solid black; padding-right:20px">
                  <section>申请科室：${data.applyDepatment}</section>
                  <section>申请医生：${data.applyDoc}</section>
                  <section>申请时间：${data.applyTime}</section>
            </section>
            <section style="${cssStyle.flexBetween}padding-right:20px">
              <section><span style="font-weight:bold">温馨提示：此单检验金额：</span>${
                data.amount
              }</section>
              <section><span style="font-weight:bold">打印时间：</span>${data.printTime}</section>
            </section>
            </div>
          </section><div class="paging"></div>`
}

export default html
