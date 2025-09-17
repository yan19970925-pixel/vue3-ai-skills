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
  id?: string
  startDate: string
  startTime: string
  orderText: string
  freqDetail: string
  performResult: string
  dosage: number
  dosageUnits: string
  administration: string
  frequency: string
  doctor: string
  doctorSign: string
  stopDoctor: string
  stopDoctorSign: string
  stopFlag: string
  performSchedule: string
  stopDatetime: string
  nurse: string
  nurseSign: string
  stopNurse: string
  stopNurseSign: string
  stopPerformSchedule: string
  orderNo: number
  orderSubNo: number
  posiFlag: string
  firstDispenseAmount: string
  startPerformSchedule: string
  amount: string
  packUnit: string
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

const getIcon = (posiFlag) => {
  let imgsrc = ''
  if (posiFlag === 'S') {
    imgsrc = printStartIcon
  } else if (posiFlag === 'M') {
    imgsrc = printMiddletIcon
  } else if (posiFlag === 'E') {
    imgsrc = printEndIcon
  }
  return !!posiFlag
    ? `<img alt="" style="width:10px; hight:14px; margin:4px;" src="${imgsrc}" />`
    : ''
}

const getRow = (isCover: boolean, list: IPrintData[]) => {
  const getCellStyle = isCover ? `${styles.cell}${styles.hiddenBoder}` : `${styles.cell}`
  return list
    .map((item) => {
      return `<tr>
                    <td style="box-sizing:border-box;${getCellStyle}${
        isCover ? 'padding-left:8px;' : ''
      };"><div style="display:flex;overflow:hidden;font-size:12px;">${
        item.startDate ? item.startDate.substring(2, 14) : ''
      } ${item.startTime || ''}</div></td>
                    <td style="${getCellStyle}">
                    <div style="display:flex;width:334px;overflow:hidden;justify-content:space-between;align-item:center;">
                    <section style="width:190px;display:flex;justify-content:space-between;align-items:center;font-size:12px;">
                      ${item.orderText}${item.freqDetail ? '(' + item.freqDetail + ')' : ''}
                      ${getIcon(item.posiFlag)}
                   </section>
                    <section style="width:40px;overflow-wrap: break-word;font-size:12px;">
                      ${item.dosage || ''}${item.dosageUnits || ''}
                    </section>
                    <section style="width:52px;overflow-wrap: break-word;font-size:12px;">${
                      item.administration ? item.administration.substring(0, 8) : ''
                    }</section>
                    <section style="width:52px;overflow-wrap: break-word;font-size:12px;">${
                      item.frequency ? item.frequency.substring(0, 8) : ''
                    }</section>
                    </div>
                    </td>
                    <td style="${getCellStyle}">
                    ${
                      item.doctorSign == undefined || item.doctorSign == ''
                        ? `<div style="width:40px;font-size:12px;">${item.doctor || ''}</div>`
                        : `<img src="${
                            item.doctorSign || ''
                          }" style="width:40px;height:20px;overflow:hidden" />`
                    }</td>
                    <td style="${getCellStyle}">${
        item.nurseSign == undefined || item.nurseSign == ''
          ? `<div style="width:40px;font-size:12px;">${item.nurse || ''}</div>`
          : `<img src="${item.nurseSign || ''}" style="width:40px;height:20px;overflow:hidden" />`
      }</td><td style="${getCellStyle}"><div style="width:40px;font-size:12px;">${
        item.startPerformSchedule || ''
      }</div></td>
                    <td style="${getCellStyle}"><div style="font-size:12px;">${
        item.stopDatetime || ''
      }</div></td>
                    <td style="${getCellStyle}">${
        item.stopDoctorSign == undefined || item.stopDoctorSign == ''
          ? `<div style="width:40px;font-size:12px;">${item.stopDoctor || ''}</div>`
          : `<img src="${
              item.stopDoctorSign || ''
            }" style="width:40px;height:20px;overflow:hidden" />`
      }</td>
                    <td style="${getCellStyle}">${
        item.stopNurseSign == undefined || item.stopNurseSign == ''
          ? `<div style="width:40px;font-size:12px;">${item.stopNurse || ''}</div>`
          : `<img src="${
              item.stopNurseSign || ''
            }" style="width:40px;height:20px;overflow:hidden" />`
      }</td><td style="${getCellStyle};font-size:12px;">${item.stopPerformSchedule || ''}</td>
    </tr>`
    })
    .join('')
}

const getTmpRow = (isCover, list: IPrintData[]) => {
  const getCellStyle = isCover ? `${styles.cell}${styles.hiddenBoder}` : `${styles.cell}`
  return list
    .map((item) => {
      return `<tr>
                    <td style="${getCellStyle}">${item.startDate || ''} ${item.startTime || ''}</td>
                    <td style="${getCellStyle}">
                    <div style="display:flex;align-item:center;padding-right:4px;">
                    <section style="width:${
                      item.administration ? '230px' : '400px'
                    };display:flex;justify-content:space-between;align-items:center;font-size:12px;">
                      ${item.orderText}${item.performResult || ''}${
        item.freqDetail ? '(' + item.freqDetail + ')' : ''
      }
                      ${getIcon(item.posiFlag)}
                   </section>
                    <section style="width:${
                      item.administration ? '55px' : '60px'
                    };font-size:12px;display:${item.dosage ? 'block' : 'none'};">
                      ${item.dosage || ''}${item.dosageUnits || ''}
                    </section>
                    <section style="width:${
                      item.frequency || item.firstDispenseAmount ? '100px' : '140px'
                    };font-size:12px;overflow-wrap: break-word;display:${
        item.administration ? 'block' : 'none'
      };margin-right:2px;">${item.administration ? item.administration : ''}</section>
                    <section style="width:52px;font-size:12px;display:${
                      item.administration ? 'block' : 'none'
                    };">${item.frequency || ''}</section>
                    <section style="width:40px;font-size:12px;display:${
                      item.amount ? 'block' : 'none'
                    };">${item.amount || ''}${item.packUnit || ''}</section>
      <section style="width:40px;font-size:12px;display:${
        item.firstDispenseAmount ? 'block' : 'none'
      };">${item.firstDispenseAmount ? item.firstDispenseAmount : ''}</section>
                    </div>
                    </td>
                    <td style="${getCellStyle}text-align: center;">${
        item.doctorSign == undefined || item.doctorSign == ''
          ? `<span style="width:54px;display:block;">${item.doctor || ''}</span>`
          : `<img src="${item.doctorSign || ''}" style="width:40px;height:20px;overflow:hidden" />`
      }</td>
                    <td style="${getCellStyle}text-align: center;overflow:hidden">${
        item.performSchedule || ''
      }</td>
                    <td style="${getCellStyle}text-align: center;">${
        item.nurseSign == undefined || item.nurseSign == ''
          ? `<span style="width:54px;display:block;">${item.nurse || ''}</span>`
          : `<img src="${item.nurseSign || ''}" style="width:40px;height:20px;overflow:hidden" />`
      }</td>
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
            ${data.isCover ? styles.hiddenText : ''}">长 期 医 嘱 单</div>
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
                  <tr>
                    <th style="${getThStyle(
                      data.isCover
                    )}height: 24px;font-size:14px;" colspan="5">开始</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}height: 24px;font-size:14px;" colspan="4">停止</th>
                  </tr>
                  <tr>
                    <th style="${getThStyle(
                      data.isCover
                    )};width:50px;height: 24px;" rowspan="1"><div>起始</div><div>时间</div></th>
                    <th style="${getThStyle(
                      data.isCover
                    )}height: 24px;font-size:14px;" rowspan="1">医嘱内容</th>
                    <th style="${getThStyle(data.isCover)}width:40px;height: 24px;">医生</th>
                    <th style="${getThStyle(data.isCover)}width:40px;height: 24px;">护士</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}width:40px;height: 24px;"><div>执行</div><div>时间</div></th>
                    <th style="${getThStyle(
                      data.isCover
                    )}width:90px;height: 24px;" rowspan="1">停止时间</th>
                    <th style="${getThStyle(data.isCover)}width:40px;height: 24px;">医生</th>
                    <th style="${getThStyle(data.isCover)}width:40px;height: 24px;">护士</th>
                    <th style="${getThStyle(
                      data.isCover
                    )}width:40px;height: 24px;"><div>执行</div><div>时间</div></th>
                  </tr>
                </thead>
                <tbody>
                  ${getRow(data.isCover, data.printData)}
                </tbody>
            </table>
            <div style="display:flex;justify-content:space-between;padding:4px 0px;font-size:14px;"><span style="width:33%;">医生签名：</span><span style="width:33%;"></span><span style="width:33%;">护士签名：</span></div>
            <div style="display:flex;justify-content:space-between;padding:4px 20px;font-size:14px;">
              <section style="flex-grow:1; text-align:center;
              ${data.isCover ? styles.hiddenText : ''}">第${data.page || ''}页</section>
            </div>
          </section>`
}
export const temporaryRender = (data: DataProps): string => {
  const height = 98
  return `<section style="${cssStyle.fontFamily}height:${height}vh;font-family:SimSun;
  position:relative;box-sizing:border-box;
  ${cssStyle.padding10LR}border:1px solid transparent;padding-top:12px;">
            <div style="${cssStyle.title}${data.isCover ? styles.hiddenText : ''}font-size:20px;">
            ${data.hospitalName}</div>
            <div style="${cssStyle.title}margin-bottom:15px;margin-top:8px;font-size:22px;
            ${data.isCover ? styles.hiddenText : ''}">临 时 医 嘱 单</div>
            <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;">
              <di>姓名：${data.name}</di>
              <di>年龄：${data.age}</di>
              <di>性别：${data.gender}</di>
              <di>科室：${data.deptName}</di>
              <di>床号：${data.bedNo || ''}</di>
              <di>住院号：${data.inpNo}</di>
            </div>
            <table style="${styles.table}font-size:14px;">
                <thead>
                  <tr>
                    <th style="${getThStyle(data.isCover)};width: 70px;">开始时间</th>
                    <th style="${getThStyle(data.isCover)}">临时医嘱</th>
                    <th style="${getThStyle(data.isCover)}text-align: center;">医生签字</th>
                    <th style="${getThStyle(data.isCover)}text-align: center;">执行时间</th>
                    <th style="${getThStyle(data.isCover)}text-align: center;">执行者签名</th>
                  </tr>
                </thead>
                <tbody>
                  ${getTmpRow(data.isCover, data.printData)}
                </tbody>
            </table>
            <div style="display:flex;justify-content:space-between;padding:4px 0px;font-size:14px;"><span style="width:33%;">医生签名：</span><span style="width:33%;"></span><span style="width:33%;">护士签名：</span></div>
            <div style="display:flex;justify-content:space-between;padding:4px 20px;font-size:14px;">
              <section style="flex-grow:1; text-align:center;${
                data.isCover ? styles.hiddenText : ''
              }">第${data.page || ''}页</section>
            </div>
          </section>`
}
