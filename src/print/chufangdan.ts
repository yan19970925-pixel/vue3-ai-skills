import { cssStyle as style, drawLine2 } from './index'

export interface CheckItemProps {
  index?: number
  id?: string
  name?: string
  capacity?: string
  unit?: string
  usage?: string
  subOrderNo?: number
  dosage?: string
  frequency?: string
  administration?: string
  footnote?: string
  firmId?: string //厂家
  amount?: string
  freqDetail?: string
}
export interface ChuFangDanProps {
  ewmUrl?: string
  id?: string
  hospitalName: string // 医院名称
  billType: string //申请单类型
  applicationNo: string //申请单号
  name: string // 姓名
  gender: string // 性别
  age: string // 年龄
  phoneNumberHome?: string // 病人电话
  expenseType: string // 费别
  patientID: string //病人ID
  prescriptionID: string // 处方号
  seeDocNO: string // 就诊号
  weight: string // 体重
  allergy: string // 药物过敏史
  address: string // 住址
  prescribeDate: string // 开方日期
  diagnose: string // 诊断
  ticDiagnose: string //中医诊断
  executiveDepartmen: string // 就诊科室
  docotor: string // 医师
  checkName: string // 审核
  verify: string // 核对
  amount: string // 金额合计
  deploy: string // 调配
  dispensing: string // 发药
  pharmacy: string // 药房
  checkItems: CheckItemProps[]
  prescMemo: string // 备注
  administration?: string // 用法
  frequency?: string // 频次
  repetition?: string // 付数
  isTCM: boolean // 是否中药
  infusionSheetFlag?: boolean // 是否注射单
  transfusionSheetFlag?: boolean // 是否输液单
  testNoImg?: string
  sign?: string // 标识
  prescAttr?: string //处方属性
  idNo?: string //患者身份证号
  deputyName?: string //代办人姓名
  deputySex?: string //代办人性别
  deputyId?: string //代办人身份证
  deputyPhone?: string //代办人手机号
  prescRedFlag?: boolean //毒麻标志
  ukeySignValue?: string //医师签名图片
  chargeItemName?: string
  totalCharge?: string
  isLastFlag?: boolean
}
const cssStyle = {
  ...style,
  divLine: `${style.flexBetween}line-height:24px;`,
  growleft: 'width:33%;text-align:left;line-height:20px;'
}
// 中药
const getListTcm = (item: CheckItemProps): string => {
  return `<div style="width:25%;padding-top:18px;">
    <span style="position:relative;">${item.name}${
    item.dosage
  }<span style="position:absolute;font-size:14px;right:0;bottom:-15px;transform:scale(.8);color:#333;text-align:right">${
    item.footnote ? '(' + item.footnote + ')' : ''
  }</span></span>
  </div>`
}

const getList = (data, item: CheckItemProps, index): string => {
  const needDosa = reactive<any>([])
  data.forEach((eee, ii) => {
    if (eee.subOrderNo === 1 && data[ii + 1] && data[ii + 1].subOrderNo !== 1) {
      needDosa.unshift(data[ii])
    } else if (eee.subOrderNo !== 1) {
      needDosa.push(eee)
    }
  })
  // 排序
  needDosa.sort((a, b) => a.index - b.index)
  if (
    (item.subOrderNo === 1 && data[index + 1] && data[index + 1].subOrderNo === 1) ||
    (item.subOrderNo === 1 && data.length == index + 1)
  ) {
    return `<div style="width:94%;">
    <section style="padding-left:44px;line-height:24px;${cssStyle.flexBetween}"><span>${item.name}${
      item.firmId ? '（' + item.firmId + '）' : ''
    }</span><span>${item.capacity}</span><span>${item.unit}</span></section>
    <section style="padding-left:70px;line-height:24px;padding-bottom:10px;">用法：每次${
      item.dosage
    } ${item.usage}${item.freqDetail ? '（' + item.freqDetail + '）' : ''}</section>
  </div>`
  } else {
    // 拿到当前子处方的最后一个数据 把前面的数据拼接起来
    if ((data[index + 1] && data[index + 1].subOrderNo === 1) || data.length == index + 1) {
      // needDosa.slice(0, index)
      // 找到当前索引在needDosa里面 上一个subOrderNo为1的数据
      const prev = needDosa
        .slice(0, index)
        .reverse()
        .find((item) => item.subOrderNo === 1)
      // 截取当前索引到上一个subOrderNo为1的数据
      const current = needDosa.slice(prev.index, index + 1)
      // 提取dosage
      // 通过 || 拼接
      const dosage = current.map((item) => item.dosage).join('||')
      return `<div style="width:94%;">
        <section style="padding-left:70px;line-height:24px;padding-bottom:10px;${
          cssStyle.flexBetween
        }"><span>┗${item.name}${item.firmId ? '（' + item.firmId + '）' : ''}</span><span>${
        item.capacity
      }</span><span>${item.unit}</span></section>
        <section style="padding-left:70px;line-height:24px;padding-bottom:10px;">用法：每次${dosage} ${
        item.usage
      }${item.freqDetail ? '（' + item.freqDetail + '）' : ''}</section>
      </div>`
    } else {
      // 子处方跟父处方样式不同
      if (data[index].subOrderNo === 1) {
        return `<div style="width:90%;">
    <section style="padding-left:44px;line-height:24px;padding-bottom:10px;${cssStyle.flexBetween}"><span>${item.name}</span><span>${item.capacity}</span><span>${item.unit}</span></section>
    </div>`
      } else {
        return `<div style="width:90%;">
    <section style="padding-left:70px;line-height:24px;padding-bottom:10px;${cssStyle.flexBetween}"><span>┗${item.name}</span><span>${item.capacity}</span><span>${item.unit}</span></section>
    </div>`
      }
    }
  }
}
const getTreatList = (data, item: CheckItemProps, index): string => {
  const needDosa = reactive<any>([])
  data.forEach((eee, ii) => {
    if (eee.subOrderNo === 1 && data[ii + 1] && data[ii + 1].subOrderNo !== 1) {
      needDosa.unshift(data[ii])
    } else if (eee.subOrderNo !== 1) {
      needDosa.push(eee)
    }
  })
  // 排序
  needDosa.sort((a, b) => a.index - b.index)
  if (
    (item.subOrderNo === 1 && data[index + 1] && data[index + 1].subOrderNo === 1) ||
    (item.subOrderNo === 1 && data.length == index + 1)
  ) {
    return `<div style="width:100%;display:flex;">
    <section style="width:40%;padding-left:8px;line-height:24px;${cssStyle.flexBetween}"><span>${
      item.name
    }${item.firmId ? '（' + item.firmId + '）' : ''}</span></section>
    <section style="width:22%;padding-left:8px;line-height:24px;padding-bottom:10px;text-align:center;"><span>${
      item.capacity
    }</span><span>${item.unit}</span></section>
    <section style="width:25%;padding-left:8px;line-height:24px;text-align:center;">每次${
      item.dosage
    } ${item.frequency}</section>
    <section style="width:13%;padding-left:8px;line-height:24px;text-align:center;">${
      item.administration
    }</section>
  </div>`
  } else {
    // 拿到当前子处方的最后一个数据 把前面的数据拼接起来
    if ((data[index + 1] && data[index + 1].subOrderNo === 1) || data.length == index + 1) {
      return `<div style="width:100%;display:flex;">
    <section style="width:40%;padding-left:8px;line-height:24px;${cssStyle.flexBetween}"><span>┗${
        item.name
      }${item.firmId ? '（' + item.firmId + '）' : ''}</span></section>
    <section style="width:22%;padding-left:8px;line-height:24px;padding-bottom:10px;text-align:center;"><span>${
      item.capacity
    }</span><span>${item.unit}</span></section>
    <section style="width:25%;padding-left:8px;line-height:24px;text-align:center;">每次${
      item.dosage
    } ${item.frequency}</section>
    <section style="width:13%;padding-left:8px;line-height:24px;text-align:center;">${
      item.administration
    }</section>
  </div>`
    } else {
      // 子处方跟父处方样式不同
      if (data[index].subOrderNo === 1) {
        return `<div style="width:100%;display:flex;">
                  <section style="width:40%;padding-left:8px;line-height:24px;${cssStyle.flexBetween}"><span>${item.name}</span></section>
                  <section style="width:22%;padding-left:8px;line-height:24px;padding-bottom:10px;text-align:center;"><span>${item.capacity}</span><span>${item.unit}</span></section>
                  <section style="width:25%;padding-left:8px;line-height:24px;text-align:center;">每次${item.dosage} ${item.frequency}</section>
                  <section style="width:13%;padding-left:8px;line-height:24px;text-align:center;">${item.administration}</section>
                </div>`
      } else {
        return `<div style="width:100%;display:flex;">
                  <section style="width:40%;padding-left:44px;line-height:24px;${cssStyle.flexBetween}"><span>┗${item.name}</span></section>
                  <section style="width:22%;padding-left:8px;line-height:24px;padding-bottom:10px;text-align:center;"><span>${item.capacity}</span><span>${item.unit}</span></section>
                  <section style="width:25%;padding-left:8px;line-height:24px;text-align:center;">每次${item.dosage} ${item.frequency}</section>
                  <section style="width:13%;padding-left:8px;line-height:24px;text-align:center;">${item.administration}</section>
                </div>`
      }
    }
  }
}
// 处方单 模板
const html = (data: ChuFangDanProps) => {
  // 中药处方单
  if (data.isTCM) {
    return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}${
      cssStyle.borderbox
    }width:50%;margin-left:50%;">
  <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.title}${cssStyle.flexCenter}margin-top:10px;;font-size:18px;${
      cssStyle.padding10LR
    }">${data.hospitalName}处方笺
    ${
      data.sign === '' || data.sign === undefined || data.sign == null
        ? ''
        : `<section style="${cssStyle.circle}margin-left:24px;width:30px;height:30px;line-height:30px;text-align:center;font-size:12px">${data.sign}</section>`
    }
  </div>
    <div style="${cssStyle.divLine}${cssStyle.padding10LR}${
      cssStyle.lineHeight
    }padding-top:10px;padding-bottom:3px;">
      <section><span style="${cssStyle.formLabel}">姓名：</span>${data.name}</section>
      <section><span style="${cssStyle.formLabel}">性别：</span>${data.gender}</section>
      <section><span style="${cssStyle.formLabel}">年龄：</span>${data.age}</section>
      <section><span style="${cssStyle.formLabel}">费别：</span>${data.expenseType}</section>
    </div>
    <div style="${cssStyle.divLine}${cssStyle.padding10LR}${
      cssStyle.lineHeight
    }padding-bottom:3px;">
      <section><span style="${cssStyle.formLabel}">病人ID：</span>${data.patientID}</section>
      <section><span style="${cssStyle.formLabel}">处方号：</span>${data.prescriptionID}</section>
      <section><span style="${cssStyle.formLabel}">就诊序号：</span>${data.seeDocNO}</section>
      <section><span style="${cssStyle.formLabel}">体重：</span>${
      data.weight ? data.weight + '(kg)' : ''
    }</section>
    </div>
    <div style="${cssStyle.divLine}${cssStyle.padding10LR}${
      cssStyle.lineHeight
    }padding-bottom:3px;height:auto;">
      <section style="width:50%;height:20px;line-height:20px;overflow:hidden;"><span style="${
        cssStyle.formLabel
      }">药物过敏史：</span>${data.allergy ? data.allergy : '无'}</section>
      <section style="width:50%;height:20px;line-height:20px;overflow:hidden;"><span style="${
        cssStyle.formLabel
      }">住址：</span>${
      data.address == undefined || data.address == null ? '' : data.address
    }</section>
    </div>
    <div style="${cssStyle.divLine}${cssStyle.padding10LR}${cssStyle.lineHeight}">
      <section style="width:50%;"><span style="${cssStyle.formLabel}">开方日期：</span>${
      data.prescribeDate
    }</section>
      <section style="width:50%;"><span style="${cssStyle.formLabel}">就诊科室：</span>${
      data.executiveDepartmen
    }</section>
    </div>
    <div style="${cssStyle.divLine}${cssStyle.padding10LR}${cssStyle.lineHeight}">
      <section style="width:50%;"><span style="${cssStyle.formLabel}">患者电话：</span>${
      data.phoneNumberHome || ''
    }</section>${
      data.prescRedFlag && data.deputyId == ''
        ? `<section style="width:50%;"><span style="${cssStyle.formLabel}">患者身份证：</span>${
            data.idNo ? data.idNo : ''
          }</section>`
        : ''
    }
    </div>
    ${
      data.prescRedFlag
        ? `
    <div style="min-height:18px;line-height:18px;${
      cssStyle.padding10LR
    }display:flex;"><section style="width:28%;line-height:18px;height:18px;overflow:hidden;"><span style="${
            cssStyle.formLabel
          }">代办人姓名：</span>${data.deputyName || ''}</section>
    <section style="width:15%;line-height:18px;height:18px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">性别：</span>${data.deputySex || ''}</section>
    <section style="width:55%;line-height:18px;height:18px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">手机号:</span>${data.deputyPhone || ''}</section>
    <section style="width:55%;line-height:18px;height:18px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">身份证号：</span>${data.deputyId || ''}</section></div>`
        : ''
    }
    <div style="border-top:1px solid black;height:20px;line-height:18px;${
      cssStyle.padding10LR
    }display:flex;"><section style="width:100%;height:20px;overflow:hidden;">临床诊断：${
      data.diagnose ? data.diagnose : ''
    }</section></div>
    <div style="border-bottom:1px solid black;height:20px;line-height:18px;${
      cssStyle.padding10LR
    }display:flex;"><section style="width:100%;height:20px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">中医诊断：</span>${data.ticDiagnose ? data.ticDiagnose : ''}</section></div>
    <div style="${cssStyle.padding10LR}${cssStyle.relative}">
        <span style="${
          cssStyle.fontBold
        }font-size:30px;display:inline-block;">R</span><span style="${
      cssStyle.fontBold
    }font-size:30px;display:inline-block;${cssStyle.relative}bottom:-8px;">P</span><span style="${
      cssStyle.fontBold
    }font-size:30px;display:inline-block;">：</span>
    </div>
    <div style="display:flex;padding:0 20px 0 20px;flex-wrap:wrap;">
    ${data.checkItems.map((item, index) => getListTcm(item)).join('')}
    </div>
    <div style="position:absolute;left:0;bottom:0px;width:100%">
      <div style="display:inline-block;width:200px;text-align:center;position:absolute;right:0;top:-120px;">
        <img src="${data.ewmUrl}" style="width:120px;height:120px;" v-if="${
      data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
    }">
        <div style="text-align:center;position:relative;top:-5px;">扫描上方二维码支付</div>
      </div>
      <section style="display:${
        data.isLastFlag ? 'flex' : 'none'
      };justify-content:flex-start;padding-bottom:6px;padding-left:8%;">
        用法：${data.administration} ${data.frequency} 共${data.repetition}付
      </section>
      <section style="display:${
        data.isLastFlag ? 'flex' : 'none'
      };justify-content:flex-start;padding-bottom:6px;padding-left:8%;">
        ${data.prescMemo ? '备注：' + data.prescMemo : ''}
      </section>
      <section style="display:flex;justify-content:center;padding-bottom:6px;">
        (以下空白)
      </section>
      <section style="display:flex;justify-content:flex-end;border-bottom:2px solid black; padding-left:8%;padding-right:18%;padding-bottom:6px;">
        医师：${
          data.ukeySignValue == undefined || data.ukeySignValue == ''
            ? `<span>${data.docotor}</span>`
            : `<img src="${data.ukeySignValue || ''}" style="width:60px;height:30px;" />`
        }
      </section>
    <section style="display:flex;justify-content: space-around;padding-right:8%;padding-left:8%;">
      <div style="${cssStyle.growleft}">审核、调配：${data.checkName}</div>
      <div style="${cssStyle.growleft}">核对、发药：${data.verify}</div>
      <div style="${cssStyle.growleft}">合计金额：${data.amount}元</div>
    </section>
    <section style="display:flex;justify-content: space-around;padding-right:8%;padding-left:8%;justify-content: flex-end;">
      <div style="${cssStyle.growleft}">药房：${data.pharmacy}</div></div>
    </section>
    </div>
  </section><div class="paging"></div>`
  } else {
    if (data.infusionSheetFlag || data.transfusionSheetFlag) {
      return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}${
        cssStyle.borderbox
      }width:50%;margin-left:50%;">
  <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.flexBetween};align-items:center;">
              <img style="width:130px;height:32px;" src="${data.testNoImg}" alt="" />
              <div style="${cssStyle.title}${cssStyle.titleSize}${cssStyle.flexCenter}${
        cssStyle.padding10LR
      }">${data.hospitalName}处方笺
              </div>
              <span style="width:132px;">${
                data.infusionSheetFlag
                  ? '门诊注射治疗单'
                  : data.transfusionSheetFlag
                  ? '门诊输液治疗单'
                  : ''
              }</span></div>
            
      <div style="${cssStyle.divLine}${cssStyle.padding10LR}${
        cssStyle.lineHeight
      }padding-top:10px;padding-bottom:3px;">
        <section><span style="${cssStyle.formLabel}">姓名：</span>${data.name}</section>
        <section><span style="${cssStyle.formLabel}">性别：</span>${data.gender}</section>
        <section><span style="${cssStyle.formLabel}">年龄：</span>${data.age}</section>
        <section style="${cssStyle.formLabel}"><span style="${cssStyle.formLabel}">病人ID：</span>${
        data.patientID
      }</section>
      </div>
      <div style="${cssStyle.divLine}${cssStyle.padding10LR}${
        cssStyle.lineHeight
      }padding-bottom:3px;">
        <section style="width:50%;"><span style="${cssStyle.formLabel}">申请科室：</span>${
        data.executiveDepartmen
      }</section>
        <section style="width:50%;"><span style="${cssStyle.formLabel}">申请日期：</span>${
        data.prescribeDate
      }</section>
      </div>
      <div style="border-bottom:1px solid black;padding:5px 0;line-height:20px;${
        cssStyle.padding10LR
      }display:flex;"><span style="${
        cssStyle.formLabel
      }display:inline-block;width:54px;">诊断：</span>${data.diagnose ? data.diagnose : ''}</div>
      <div style="text-align:center;display:flex;padding: 10px 0;font-weight: 600;">
        <section style="width:42%;">药品名称</section>
        <section style="width:20%;">药品数量</section>
        <section style="width:25%;">用法</section>
        <section style="width:13%;">方式</section>
      </div>
    ${data.checkItems.map((item, index) => getTreatList(data.checkItems, item, index)).join('')}
      <div style="display:flex;justify-content:center;flex-direction:column;padding-left:40%;">
      ${drawLine2(6 - data.checkItems.length)}
      </div>
      <div style="position:absolute;left:0;bottom:10px;width:100%">
        <section style="display:flex;justify-content:flex-start;padding-bottom:6px;padding-left:8%;">
          ${data.prescMemo ? '备注：' + data.prescMemo : ''}
        </section>
        <section style="display:flex;justify-content:flex-end;border-bottom:2px solid black; padding-right:18%;padding-bottom:6px;">
          <div style="${cssStyle.growleft}width: 28%">摆药人：${data.dispensing}</div>
          <div style="${cssStyle.growleft}width: 28%">核对人：${data.verify}</div>
          <div style="${cssStyle.growleft}width: 42%;position:relative;">医生：${
        data.ukeySignValue == undefined || data.ukeySignValue == ''
          ? `<span>${data.docotor}</span>`
          : `<img src="${
              data.ukeySignValue || ''
            }" style="position:absolute;bottom:0px;width:60px;height:30px;" />`
      }</div>
          <div style="${cssStyle.growleft}width: 30%">签字：</div>
        </section>
      </div>
    </section><div class="paging"></div>`
    } else {
      return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}${
        cssStyle.borderbox
      }width:50%;margin-left:50%;">
  <style type="text/css" media="print">@page { size: A4 landscape; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}${cssStyle.flexCenter}${
        cssStyle.padding10LR
      }">${data.hospitalName}处方笺
    ${
      data.sign === '' || data.sign === undefined || data.sign == null
        ? ''
        : `<section style="${cssStyle.circle}margin-left:24px;width:30px;height:30px;line-height:30px;text-align:center;font-size:12px">${data.sign}</section>`
    }
  </div>
      <div style="${cssStyle.divLine};padding-left:4px;${
        cssStyle.lineHeight
      }padding-top:10px;padding-bottom:3px;">
        <section><span style="${cssStyle.formLabel}">姓名：</span>${data.name}</section>
        <section><span style="${cssStyle.formLabel}">性别：</span>${data.gender}</section>
        <section><span style="${cssStyle.formLabel}">年龄：</span>${data.age}</section>
        <section><span style="${cssStyle.formLabel}">费别：</span>${data.expenseType}</section>
      </div>
      <div style="${cssStyle.divLine};padding-left:4px;${cssStyle.lineHeight}padding-bottom:3px;">
        <section><span style="${cssStyle.formLabel}">病人ID：</span>${data.patientID}</section>
        <section><span style="${cssStyle.formLabel}">处方号：</span>${data.prescriptionID}</section>
        <section><span style="${cssStyle.formLabel}">就诊序号：</span>${data.seeDocNO}</section>
        <section><span style="${cssStyle.formLabel}">体重：</span>${
        data.weight ? data.weight + '(kg)' : ''
      }</section>
      </div>
      <div style="${cssStyle.divLine};padding-left:4px;${
        cssStyle.lineHeight
      }padding-bottom:3px;height:auto;">
        <section style="width:50%;height:20px;line-height:20px;overflow:hidden;"><span style="${
          cssStyle.formLabel
        }">药物过敏史：</span>${data.allergy ? data.allergy : '无'}</section>
        <section style="width:50%;height:20px;line-height:20px;overflow:hidden;"><span style="${
          cssStyle.formLabel
        }">住址：</span>${
        data.address == undefined || data.address == null ? '' : data.address
      }</section>
      </div>
      <div style="${cssStyle.divLine};padding-left:4px;${cssStyle.lineHeight}padding-bottom:3px;">
        <section style="width:50%;"><span style="${cssStyle.formLabel}">开方日期：</span>${
        data.prescribeDate
      }</section>
        <section style="width:50%;"><span style="${cssStyle.formLabel}">就诊科室：</span>${
        data.executiveDepartmen
      }</section>
      </div>
      <div style="${cssStyle.divLine};padding-left:4px;padding-bottom:3px;">
        <section style="width:50%;"><span style="${cssStyle.formLabel}">患者电话：</span>${
        data.phoneNumberHome || ''
      }</section>
        ${
          data.prescRedFlag && data.deputyId == ''
            ? `<section style="width:50%;"><span style="${cssStyle.formLabel}">患者身份证：</span>${
                data.idNo ? data.idNo : ''
              }</section>`
            : ''
        }
      </div>
      ${
        data.prescRedFlag
          ? `
    <div style="min-height:30px;line-height:18px;padding-left:4px;display:flex;"><section style="width:28%;line-height:30px;height:30px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">代办人姓名:</span>${data.deputyName || ''}</section>
    <section style="width:15%;line-height:30px;height:30px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">性别:</span>${data.deputySex || ''}</section>
    <section style="width:25%;line-height:30px;height:30px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">电话:</span>${data.deputyPhone || ''}</section>
    <section style="width:38%;line-height:30px;height:30px;overflow:hidden;"><span style="${
      cssStyle.formLabel
    }">身份证:</span>${data.deputyId || ''}</section></div>`
          : ''
      }
      <div style="border-top:1px solid black;padding:5px 0;line-height:20px;padding-left:4px;display:flex;overflow:hidden;"><span style="${
        cssStyle.formLabel
      }">临床诊断：</span>${
        data.diagnose ? data.diagnose : ''
      }</div><div style="border-bottom:1px solid black;padding:0 0 5px;line-height:20px;display:flex;"><span style="${
        cssStyle.formLabel
      }">中医诊断：</span>${data.ticDiagnose ? data.ticDiagnose : ''}</div>
      <div style="${cssStyle.padding10LR}${cssStyle.relative}">
          <span style="${
            cssStyle.fontBold
          }font-size:30px;display:inline-block;">R</span><span style="${
        cssStyle.fontBold
      }font-size:30px;display:inline-block;${cssStyle.relative}bottom:-8px;">P</span><span style="${
        cssStyle.fontBold
      }font-size:30px;display:inline-block;">：</span>
      </div>
    ${data.checkItems.map((item, index) => getList(data.checkItems, item, index)).join('')}
      <div style="display:flex;justify-content:center;flex-direction:column;padding-left:40%;">
      ${drawLine2(6 - data.checkItems.length)}
      </div>
      <div style="position:absolute;left:0;bottom:0px;width:100%">
        <div style="display:inline-block;width:200px;text-align:center;position:absolute;right:0;top:-130px;">
          <img src="${data.ewmUrl}" style="width:120px;height:120px;overflow:hidden;" v-if="${
        data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
      }" />
          <div style="text-align:center;position:relative;top:-12px;z-index:10;">扫描上方二维码支付</div>
        </div>
        <section style="display:flex;justify-content:flex-start;padding-bottom:6px;padding-left:8%;">
          ${data.prescMemo ? '备注：' + data.prescMemo : ''}
        </section>
        <section style="display:flex;padding-left:8%;border-bottom:2px solid black; padding-right:18%;padding-bottom:6px;">
            <span style="width:50%;">${data.chargeItemName ? data.chargeItemName + '：' : ''}${
        data.totalCharge ? data.totalCharge + '元' : ''
      }</span>
        <span style="width:50%;display:flex;justify-content: flex-end;">医师：${
          data.ukeySignValue == undefined || data.ukeySignValue == ''
            ? `<span>${data.docotor}</span>`
            : `<img src="${data.ukeySignValue || ''}" style="width:60px;height:30px;" />`
        }</span>
        </section>
      <section style="display:flex;justify-content: space-between;padding-right:8%;padding-left:8%;">
        <div style="${cssStyle.growleft}">审核、调配：${data.checkName}</div>
        <div style="${cssStyle.growleft}">核对、发药：${data.verify}</div>
        <div style="${cssStyle.growleft}">合计金额：${data.amount}元</div>
      </section>
      <section style="display:flex;justify-content: space-around;padding-right:8%;padding-left:8%;justify-content: flex-end;">
        <div style="${cssStyle.growleft}">药房：${data.pharmacy}</div>
      </section>
      </div>
      </section><div class="paging"></div>`
    }
    // <section style="display:flex;justify-content: space-between;padding-right:8%;padding-left:8%;">
    //   <div style="${cssStyle.growleft}width: 28%">调配：${data.deploy}</div>
    //   <div style="${cssStyle.growleft}width: 28%">发药：${data.dispensing}</div>
    //   <div style="${cssStyle.growleft} ${
    //   cssStyle.flex
    // }width: 44%"><div style="flex-shrink: 0;">药房：</div><div>${data.pharmacy}</div></div>
    // </section>
  }
}

export default html
