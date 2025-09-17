import { cssStyle } from './index'
import { parseTime } from '@/utils/formatTime'

// 母婴同室护理记录单
const styles = {
  ...cssStyle,
  td: 'border: 1px solid black;text-align:center;height:26px;line-height:14px;',
  marginright10px: 'margin-right:10px'
}

export interface ITableData {
  inputDate: string
  nurseName: string // 护士名称
  Time2: string //日期时间
  temperature: string // 体温
  huxi: string // 呼吸
  mainse: string // 面色
  skin: string // 皮肤
  kusheng: string // 哭声
  qibu: string //脐部
  weiyang: string // 喂养方式
  shunxi: string // 吮吸能力
  huangdanT: string // 黄疸头
  huangdanX: string // 黄疸胸
  dabian: string // 大便
  xiaobian: string // 小便
  other: string // 其他
  nurseUkeySign: string
}
export interface DataProps {
  hospitalName: string // 医院名称
  billType: string //申请单类型
  zxks: string // 执行科室
  name: string // 姓名
  sex: string // 性别
  age: string // 年龄
  bedNo: string // 床号
  inpNo: string //住院号
  inpTime: string // 入院时间
  diagnose: string // 诊断
  // remark: string // 分娩描述
  pageIndex: string // 页码
  headNurse: string // 护士长
  headNurseUkeySign: string
  tableData: ITableData[]
}

const formBlock = (label, value) => {
  return `<div style="margin-right:10px;">${label}：${value}</div>`
}

const getValue = (val) => val || ''

const getDBP = (sbp, dbp) => {
  return sbp ? `${sbp}/${dbp}` : ''
}
// ${trdata(data.tableData)}
// 格内底部对齐 vertical-align: bottom;
const trdata = (list) => {
  return list
    .map(
      (item) => `
    <tr>
    <td rowspan="1" style="${styles.td}width:110px">${getValue(
        parseTime(item.inputDate) ? parseTime(item.inputDate) : ''
      )}</td>
        <td style="${styles.td}" rowspan="1">${getValue(item.temperature)}</td>
      <td rowspan="1" style="${styles.td}">${getValue(item.huxi)}</td>
      <td rowspan="1" style="${styles.td}">${getValue(item.mainse)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.skin)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.kusheng)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.qibu)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.weiyang)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.shunxi)}</td>
      <td style="${styles.td}" rowspan="1">${getValue(item.huangdanT)}</td>
      <td rowspan="1" style="${styles.td}">${getValue(item.huangdanX)}</td>
      <td rowspan="1" style="${styles.td}">${getValue(item.dabian == '0' ? '0' : item.dabian)}</td>
      <td rowspan="1" style="${styles.td}">${getValue(
        item.xiaobian == '0' ? '0' : item.xiaobian
      )}</td>
      <td rowspan="1" style="${styles.td}word-wrap: break-word; text-aline: left;">${getValue(
        item.other
      )}</td>
      <td rowspan="1" style="${
        styles.td
      }width:60px;padding: 1px;box-sizing:border-box;font-family: '华文隶书', sans-serif;">
       ${
         getValue(item.nurseUkeySign)
           ? `<img src="${getValue(
               item.nurseUkeySign
             )}" style="width:40px;height:17px;overflow:hidden;margin:0 auto" />`
           : `<span>${getValue(item.nurseName)}</span>`
       }
      </td>
      </tr>
      `
    )
    .join('')
}
const html = (data: DataProps): string => {
  return `<section id="pdf-content" style="${cssStyle.printContainer}${
    cssStyle.padding10LR
  }height:98vh;">
            <style type="text/css" media="print">@page { size: A4 landscape;margin:0mm; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize}">${data.hospitalName}</div>
            <div style="${cssStyle.title}${cssStyle.subTitleSize}">${data.billType}</div>
            <div style="display:flex;flex-wrap: wrap;">
              ${formBlock('病区', data.zxks)}
              ${formBlock('姓名', data.name)}
              ${formBlock('性别', data.sex)}
              ${formBlock('年龄', data.age)}
              ${formBlock('床号', data.bedNo)}
              ${formBlock('住院号', getValue(data.inpNo))}
              ${formBlock('入院时间', getValue(data.inpTime))}
              ${formBlock('诊断', getValue(data.diagnose))}
            </div>
            <table style="border-collapse: collapse; vertical-align: middle; border-spacing: 0;border: 1px solid;">
              <tr>
                <td rowspan="2" style="${styles.td}width:110px">时间</td>
                <td rowspan="2" style="${styles.td}width:50px">体温</td>
                <td rowspan="2" style="${styles.td}width:50px">呼吸</td>
                <td rowspan="2" style="${styles.td}width:50px">面色</td>
                <td rowspan="2" style="${styles.td}width:65px">皮肤</td>
                <td rowspan="2" style="${styles.td}width:50px">哭声</td>
                <td rowspan="2" style="${styles.td}width:50px">脐部</td>
                <td colspan="2" style="${styles.td}width:120px">喂养情况</td>
                <td colspan="2" style="${styles.td}width:120px">黄疸</td>
                <td rowspan="2" style="${styles.td}width:50px">大便次</td>
                <td rowspan="2" style="${styles.td}width:50px">小便次</td>
                <td rowspan="2" style="${styles.td}width:245px;">其他</td>
                <td rowspan="2" style="${styles.td}width:60px;">护士签名</td>
                </tr>
                <tr>
                <td style="${styles.td}" rowspan="1">喂养方式</td>
                <td style="${styles.td}" rowspan="1">吮吸能力</td>
                <td style="${styles.td}" rowspan="1">头mg/dl</td>
                <td style="${styles.td}" rowspan="1">胸mg/dl</td>
              </tr>
              ${trdata(data.tableData)}
            </table>
              <section style="width:100%;padding:12px;overflow:hidden;position:absolute;bottom:18px;">
                <div style="display:flex;justify-content: center;width:100%;">第 ${
                  data.pageIndex
                } 页</div>
                <div style="position:absolute;bottom:18px;right:10px;width:240px;">护士长/质控护士：
                   ${
                     getValue(data.headNurseUkeySign)
                       ? `<img src="${getValue(
                           data.headNurseUkeySign
                         )}" style="width:40px;height:18px;overflow:hidden;vertical-align:middle;" />`
                       : `<span style="font-family: '华文隶书', sans-serif;">${getValue(
                           data.headNurse
                         )}</span>`
                   }    
                </div>
              </section>
            </section>
              `
}

export default html
