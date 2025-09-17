import { cssStyle } from './index'
import { formItem } from './bingli'

export interface DataProps {
  hospitalName: string // 医院名称
  waitNo?: number | null
  patientId: string
  name: string
  namePhonetic: string
  sex: string
  dateOfBirth: string
  birthPlace: string
  identity: string
  chargeType: string
  mailingAddress: string
  zipCode: string
  contactPerson: string
  phoneNumber: string
  clinicDiagnosis: string
  patientCondition: string
  deptWaitingFor: string
  consultingDoctor: string
  registeringDate: string
  lastNotingDate: string
  serviceAgency: string
  phoneNumberMail: string
  notice: string
  visitNo: number
  patientClass: string
  inpNo: string
  doctorId: string
  visitDate: string
  zw: string
  ybrgx: string
  rycs: string
  rygd: string
  lxrgzdw: string
  hyzk: string
  minz: string
  perpayments: string
  contactPersonAddress: string
  contactPersonPhone: string
  idNo: string
  cdiagDesc: string
  cdiagCode: string
  ybcard: string
  abzsfDiagCode: string
  icd10: string
  notifyTimes: number
  visitId: number
  age: string
  deptPosition: string
  ukeySignValue: string
}

const styles = {
  ...cssStyle,
  formRow:
    'box-sizing: border-box;width:100%;display:flex;justify-content:space-between;align-items:center;height:35px;padding: 0 8px;',
  bottomBorder: 'border-bottom: 1px solid #333333;'
}

const html = (data: DataProps): string => {
  console.log(data)
  return `<section style="${
    cssStyle.fontFamily
  }width:100%;height:98vh;position:relative;padding-top:38px;font-size:14px;font-family:SimSun;padding-left:38px;padding-right:38px;${
    cssStyle.borderbox
  }">
             <div style="${cssStyle.title}margin-bottom:8px;font-size:18.66px;">${
    data.hospitalName
  }</div>
             <div style="${cssStyle.title}margin-bottom:8px;font-size:18.66px;">住院证</div>
             <div style="${styles.formRow}">
                ${formItem({
                  label: '病人ID',
                  value: data.patientId,
                  rowStyle: 'width:25%;'
                })}
                ${formItem({ label: '费别', value: data.chargeType, rowStyle: 'width:20%' })}
                ${formItem({ label: '医保卡号', value: data.ybcard, rowStyle: 'width:25%' })}
                ${formItem({
                  label: '等床序号',
                  value: data.waitNo,
                  rowStyle: 'justify-content: flex-end;flex-grow: 1;',
                  valueStyle: 'min-width:60px'
                })}
             </div>
             <div style="border: 2px solid #333333ff;width: 100%;${styles.bottomBorder}">
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({ label: '病人姓名', value: data.name, rowStyle: 'width:25%' })}
                    ${formItem({ label: '性别', value: data.sex, rowStyle: 'width:20%' })}
                    <div style="${styles.flexBetween}${styles.flexgrow}">
                      ${formItem({ label: '年龄', value: data.age })}
                      ${formItem({ label: '民族', value: data.minz })}
                      ${formItem({
                        label: '婚姻状况',
                        value: data.hyzk,
                        valueStyle: 'min-width:30px;'
                      })}
                    </div>
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '出生地点',
                      value: data.birthPlace,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({ label: '身份证号', value: data.idNo, rowStyle: 'width:55%' })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '工作单位',
                      value: data.lxrgzdw,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({ label: '工作职别', value: data.zw, rowStyle: 'width:55%' })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '家庭地址',
                      value: data.mailingAddress,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({
                      label: '电话手机',
                      value: data.phoneNumber,
                      rowStyle: 'width:55%'
                    })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '联系人',
                      value: data.contactPerson
                    })}
                    ${formItem({ label: '与病人关系', value: data.ybrgx })}
                    ${formItem({
                      label: '联系人电话',
                      value: data.contactPersonPhone
                    })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '联系人地址',
                      value: data.contactPersonAddress,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({
                      label: '邮政编码',
                      value: data.zipCode,
                      rowStyle: 'width:55%'
                    })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '入院方式',
                      value: data.patientClass,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({
                      label: '入院情况',
                      value: data.patientCondition,
                      rowStyle: 'width:55%'
                    })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '入院科室',
                      value: data.deptWaitingFor,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({ label: '预交款', value: data.perpayments, rowStyle: 'width:55%' })}
                </section>
                <section style="${styles.formRow}${styles.bottomBorder}">
                    ${formItem({
                      label: '入院诊断',
                      value: data.clinicDiagnosis,
                      rowStyle: 'width:45%'
                    })}
                    ${formItem({
                      label: '诊断编码',
                      value: data.icd10,
                      rowStyle: 'width:55%'
                    })}
                </section>
             </div>
             <div style="${styles.formRow}">
                    ${formItem({
                      label: '登记日期',
                      value: data.registeringDate
                    })}
                    ${formItem({
                      label: '病区位置',
                      value: data.deptPosition
                    })}
                    ${
                      data.ukeySignValue == undefined || data.ukeySignValue == ''
                        ? `${formItem({
                            label: '医生签名',
                            value: data.consultingDoctor
                          })}`
                        : `<div style="box-sizing: border-box;display:flex;font-size: 14px;font-family:SimSun;font-weight:700;color: #000000;"><span style="position:relative;top:6px;">医生签名：</span><img src="${
                            data.ukeySignValue || ''
                          }" style="width:60px;height:30px;" /></div>`
                    }
                </div>
          </section>`
}

export default html
