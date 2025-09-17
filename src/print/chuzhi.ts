import { cssStyle, drawLine } from './index'

export interface CheckItemProps {
  id?: string
  text: string // 项目内容
  deptName: string //执行科室
  count: string // 数量
  price: string // 价格
}
export interface DataProps {
  isBatch?: boolean // 是否批量打印
  hospitalName: string // 医院名称
  billType: string //申请单
  name: string // 姓名
  gender: string // 性别
  age: string // 年龄
  phoneNumberHome?: string // 病人电话
  expenseType: string // 费别
  ID: string // ID编号
  diagnose: string // 诊断
  img: string // 条形码
  applyDepatment: string // 开单科室
  applyDoc: string // 开单医生
  amount: string // 检查金额
  printTime: string // 打印时间
  // 检查项目
  ewmUrl: string // 支付二维码
  checkItems: CheckItemProps[]
  ukeySignValue: string
}

const getRow = (list: CheckItemProps[]) => {
  return list
    .map((item, index) => {
      return `<tr>
        <td style="text-align:left;">${index + 1}.${item.text}</td>
        <td style="text-align:left;">${item.deptName}</td>
        <td style="text-align:center;">${item.count}</td>
        <td style="text-align:left;">${item.price}</td>
    </tr>`
    })
    .join('')
}

const html = (data: DataProps): string => {
  return `<section style="${cssStyle.printContainer}${
    cssStyle.padding20LR
  }width:50%;margin-left:50%;">
        <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}">${data.billType}</div>
            <div style="${cssStyle.flexBetween}">
              <section><span style="${cssStyle.formLabel}line-height:32px;">ID号：</span>${
    data.ID
  }</section>
    <section><span style="${cssStyle.formLabel}line-height:32px;">患者电话：</span>${
    data.phoneNumberHome
  }</section>
    <img style="width:142px;height:32px;" src="${data.img}" alt="" /></div>
            <div style="${cssStyle.border2pxBottom}${
    cssStyle.flexBetween
  }margin-bottom:4px;padding-bottom:4px;">
              <section><span style="${cssStyle.formLabel}">姓名：</span>${data.name}</section>
              <section><span style="${cssStyle.formLabel}">性别：</span>${data.gender}</section>
              <section><span style="${cssStyle.formLabel}">年龄：</span>${data.age}</section>
              <section><span style="${cssStyle.formLabel}">费别：</span>${
    data.expenseType
  }</section>
            </div>
            <div style="${cssStyle.border1pxBottom}padding-bottom:4px;">
              <span style="${cssStyle.formLabel}${cssStyle.labelStyle}">临床诊断</span>：<span>${
    data.diagnose
  }</span>
            </div>
            <table style="width:100%;border-collapse: collapse;">
              <tr>
                <td style="padding-bottom:4px;">项目名称</td>
                <td style="padding-bottom:4px;">执行科室</td>
                <td style="padding-bottom:4px;text-align:center;">数量</td>
                <td style="padding-bottom:4px;">金额</td>
              </tr>
              ${getRow(data.checkItems)}
            </table>
            
            <div style="position:absolute;left:0;bottom:10px;width:100%;box-sizing:border-box;${
              cssStyle.padding10LR
            }">
            <div style="display:inline-block;width:200px;text-align:center;position:absolute;right:20px;top:-140px;">
          <img src="${data.ewmUrl}" style="width:120px;height:120px;" v-if="${
    data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
  }">
          <div style="text-align:center;">扫描上方二维码支付</div>
        </div>
              <section style="font-weight:400;${
                cssStyle.flexBetween
              }border-bottom:2px solid black;">
                  <section>开单科室：${data.applyDepatment}</section>
            </section>
            <section style="${cssStyle.flexBetween};position:relative;">
              <section>开单医生：${
                data.ukeySignValue == undefined || data.ukeySignValue == ''
                  ? `<span>${data.applyDoc || ''}</span>`
                  : `<img src="${
                      data.ukeySignValue || ''
                    }" style="position:absolute;left:60px;top:1px;width:60px;height:30px;" />`
              }</section>
              <section>合计：${data.amount}元</section>
              <section><span style="font-weight:bold">打印时间：</span>${data.printTime}</section>
            </section>
            </div>
          </section><div class="paging"></div>`
}

export default html
