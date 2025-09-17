import { cssStyle } from './index'
const styles = {
  ...cssStyle,
  underline: `text-decoration: underline;padding: 0 5px;`
}
const getList = (list) => {
  return list
    .map((item) => {
      return `<section style="${cssStyle.printContainer}${
        cssStyle.padding10LR
      }height:48vh;width:50%;float:left;">
            <div style="${cssStyle.title}${cssStyle.titleSize}margin:6px 0;">催缴住院费通知单</div>
            <div style="${cssStyle.flex}border-top: 1px solid #000;margin-top:5px;">
              <span style="width: 50%">科室：${item.wardName || ''}</span>
              <span style="width: 50%">入院时间：${item.admissionDateTime || ''}</span>
            </div>
            <div style="${cssStyle.flex}margin-top:5px;">
              <span style="width: 40%">姓名：${item.name || ''}</span>
              <span span style = "width: 40%">病人ID：${item.patientId || ''} </span>
              <span span style = "width: 20%">性别：${item.sex || ''} </span>
            </div>
            <div style="${cssStyle.flex}margin-top:5px;">
              <span style="width: 40%">费别：${item.chargeType || ''} </span>
              <span span style = "width: 40%">住院次数：${item.visitId || ''} </span>
              <span span style = "width: 20%">床号：${item.bedNo || ''} </span>
            </div>
            <div style="margin-top:20px;letter-spacing: 1px;">
              <p style="padding-left:30px;"
                >您好！您预交金金额为<span style="${styles.underline}">${
        item.prepayMents || ''
      }</span>元，已用费用金额为<span
                  style="${styles.underline}"
                >${item.totalCharges || ''}</span
                >元，余额:</p
              >
              <p><span style="${styles.underline}">${
        item.realMoney || ''
      }</span>元，请接到本通知后即到我院住院登记处补交<span
                  style="${
                    styles.underline
                  };display:inline-block;width:60px;border-bottom: 1px solid #000;"
                ></span
                >元，</p>
              <p>以便继续治疗。谢谢合作！</p>
              <p>单位名称: 中国人民解放军陆军第九四八医院</p>
              <p style="text-align:right;">打印时间: ${item.printTime || ''}</p>
            </div>           
          </section>`
    })
    .join('')
}
const html = ({ data }): string => {
  return data.map((item) => {
    return `<section style="width:100%;height:96vh">
            <style type="text/css" media="print">@page { size: A4 landscape;margin:0mm; }</style>${getList(
              item.checkLists
            )}</section><div class="paging"></div>`
  })
}

export default html
