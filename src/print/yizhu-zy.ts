import { cssStyle } from './index'
import printStartIcon from '@/assets/INP/DoctorAdvice/print-start.svg'
import printMiddletIcon from '@/assets/INP/DoctorAdvice/print-middle.svg'
import printEndIcon from '@/assets/INP/DoctorAdvice/print-end.svg'

const styles = {
  ...cssStyle,
  table: `border-collapse: collapse;border: 1px solid black;width:100%;`,
  cell: `border: .3px solid black;
         border-top-width: 0;
         border-left-width: 0;
         height:32px;`,
  th: `position: sticky;
       top: 0;
      `,
  hiddenBoder: `border:1px solid transparent;`,
  hiddenText: `color:transparent;`
}
export interface IPrintData {
  prescDate: string
  prescTime: string
  cdrug: string
  prescribedBy: string
  nurse: string
  performSchedule: number
  doctorSign: string
  nurseSign: string
}
export interface DataProps {
  hospitalName: string // 医院名称
  name: string // 姓名
  gender: string // 性别
  age: string // 年龄
  patientId: string // 患者ID
  inpNo: string // 住院号
  deptName: string // 科室
  isCover: boolean // 是否续打
  doctor: string // 签字医生
  nurse: string // 签字护士
  page: number | string // 页数
  bedNo: string // 床号
  // 检查项目
  printData: IPrintData[]
}

const getRow = (isCover: boolean, list: IPrintData[]) => {
  const getCellStyle = isCover ? `${styles.cell}${styles.hiddenBoder}` : `${styles.cell}`
  return list
    .map((item) => {
      return `<tr>
                    <td style="box-sizing:border-box;${getCellStyle}${
        isCover ? 'padding-left:8px;' : ''
      };"><div style="display:flex;width:80px;overflow:hidden;font-size:12px;">${
        item.prescDate ? item.prescDate : ''
      }</div></td>
      <td style="box-sizing:border-box;${getCellStyle}${
        isCover ? 'padding-left:8px;' : ''
      };"><div style="display:flex;overflow:hidden;font-size:12px;">${
        item.prescTime || ''
      }</div></td>
                    <td style="${getCellStyle}">
                    <div style="width:400px;">
                      ${item.cdrug}</div>
                    </td>
                    <td style="${getCellStyle}">
                    ${
                      item.doctorSign == undefined || item.doctorSign == ''
                        ? `<div style="width:40px;font-size:12px;">${item.prescribedBy || ''}</div>`
                        : `<img src="${
                            item.doctorSign || ''
                          }" style="width:40px;height:20px;overflow:hidden" />`
                    }</td>
                    <td style="${getCellStyle}">${
        item.nurseSign == undefined || item.nurseSign == ''
          ? `<div style="width:40px;font-size:12px;">${item.nurse || ''}</div>`
          : `<img src="${item.nurseSign || ''}" style="width:40px;height:20px;overflow:hidden" />`
      }</td><td style="${getCellStyle}"><div style="width:40px;font-size:12px;">${
        item.performSchedule || ''
      }</div></td>
    </tr>`
    })
    .join('')
}
const thStyle = `${styles.cell}${styles.th}`
const getThStyle = (isCover) => {
  const hidden = `${styles.hiddenBoder}${styles.hiddenText}`
  return `${thStyle}${isCover ? hidden : ''}`
}

export const longRender = (data: DataProps): string => {
  const height = 98
  return `<section style="
  ${
    cssStyle.fontFamily
  }height:${height}vh;box-sizing:border-box;border:1px solid transparent;padding-top:4px;padding-left:10px;padding-right:10px;">
            <div style="${cssStyle.title}${cssStyle.fontFamily}
            ${data.isCover ? styles.hiddenText : ''}font-size:20px;margin-top:8px;">${
    data.hospitalName
  }</div>
            <div style="${cssStyle.title}margin-bottom:15px;margin-top:8px;font-size:22px;
            ${data.isCover ? styles.hiddenText : ''}">中 药 医 嘱 记 录 单</div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
              <di>姓名：${data.name}</di>
              <di>年龄：${data.age}</di>
              <di>性别：${data.gender}</di>
              <di>科室：${data.deptName}</di>
              <di>床号：${data.bedNo || ''}</di>
              <di>住院号：${data.inpNo}</di>
            </div>
            <table style="${styles.table}${data.isCover ? styles.hiddenBoder : ''}font-size:13px;">
                <thead style="font-size:12px;">
                  <tr><th style="${getThStyle(
                    data.isCover
                  )};width:50px;height: 24px;" rowspan="2">日期</th><th style="${getThStyle(
    data.isCover
  )};width:50px;height: 24px;" rowspan="2">时间</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}height: 24px;font-size:14px;" rowspan="2">医嘱处方内容</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}height: 24px;font-size:14px;" colspan="2">签名</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}width:40px;height: 24px;" rowspan="2"><div>执行</div><div>时间</div></th>
                  </tr>
                  <tr>
                    
                    <th style="${getThStyle(data.isCover)}width:40px;height: 24px;">医师</th>
                    <th style="${getThStyle(data.isCover)}width:60px;height: 24px;">执行护士</th>
                  </tr>
                </thead>
                <tbody>
                  ${getRow(data.isCover, data.printData)}
                </tbody>
            </table>
            <div style="display:flex;justify-content:space-between;padding:4px 0px;font-size:14px;"><span style="width:33%;">医生签名：</span><span style="width:33%;"></span><span style="width:33%;">护士签名：</span></div>
            <div style="display:flex;justify-content:space-between;padding:4px 20px;font-size:14px;">
              <section style="flex-grow:1; text-align:center;">第${data.page || ''}页</section>
            </div>
          </section>`
}
