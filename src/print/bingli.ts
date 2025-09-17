import { cssStyle as style } from './index'
import dayjs from 'dayjs'

const cssStyle = {
  ...style,
  formRow: 'display:flex;margin-top:8px;',
  title: `${style.flexCenter};align-items:center;font-size:26px;font-weight:700;color:#000000;font-family:SimSun;`,
  divLine: `${style.flexBetween}line-height:24px;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  labelWidth: 'width:76px;',
  rowBottomBorder: 'border-bottom:1px solid black;padding-bottom:4px;',
  rowStyle: `margin-top:8px;border-bottom:1px solid black;padding-bottom:4px;`
}

export interface BingLiProps {
  id?: string
  hospitalName: string // 医院名称
  name: string // 姓名
  gender: string // 性别
  age: string // 年龄
  sex: string // 性别
  patientId: string //病人ID
  birthPlaceName: string // 籍贯
  nation: string // 民族
  dateOfBirth: string // 出生日期
  marrital: string // 婚否
  idNo: string // 身份证号
  nextOfKinPhone: string // 电话号码
  unitInContract: string // 工作单位
  mailingAddress: string // 常住地址
  visitDate: string // 就诊时间
  deptName: string // 就诊科室
  illnessDate: string // 发病时间
  illnessDesc: string // 主诉
  medHistory: string // 现病史
  anamnesis: string // 既往史
  familyIll: string // 家族史
  maternity: string // 婚孕史
  menses: string // 月经史
  individual: string // 过敏史
  bodyHeight: string | number // 身高
  bodyWeight: string | number // 体重
  bloodPressure: string | number // 收缩压
  bloodPressureL: string | number // 舒张压 低压
  ffever: string | boolean // 是否发热
  temperature: string | number // 体温
  infectiousDisease: string // 是否接触传染病
  riskArea: string // 是否中高风险地区
  riskAreaName: string // 地区名称
  epidemic: string // 流行病史
  bodyExam: string // 体检
  operationRecord: string // 处理
  medicalRecord: string // 病程
  diagDesc: string // 西医诊断
  cdiag: string // 中医诊断
  fourDiagnosis: string // 中医四诊
  memo: string // 备注
  doctor: string // 医生
  visitNo: string | number // 就诊序号
  occupation: string // 职业
  advice: string // 建议
  registerDate: string // 接诊时间
  hzqx: string // 患者去向
  anciExam: string //
  docImage: Object
}

interface FormItemProps {
  label: string
  value?: string | boolean | number
  unit?: string
  rowStyle?: string
  labelStyle?: string
  valueStyle?: string
}

export const formItem = (param: FormItemProps, isPre = false) => {
  let str = ''
  if (param.value == 'aa') {
    str = ''
  } else if (param.value == 'bb') {
    str = `<div style="box-sizing: border-box;display:flex;font-size: 14px;font-family:SimSun;font-weight:700;color: #000000;${param.rowStyle}">
              <section style="${param.labelStyle}">${param.label}：</section>
              <section style="font-weight:normal;${param.valueStyle}"></section>
          </div>`
  } else {
    str = `<div style="box-sizing: border-box;display:flex;font-size: 14px;font-family:SimSun;font-weight:700;color: #000000;${
      param.rowStyle
    }">
              <section style="${param.labelStyle}">${param.label}：</section>
              <section style="font-weight:normal;${param.valueStyle}">${
      isPre ? '<pre style="font-family:SimSun;font-weight:500;">' : ''
    }${(param.value || '').toString()}${param.unit && param.value ? param.unit : ''}${
      isPre ? '</pre>' : ''
    }</section>
          </div>`
  }
  return str
}
//  ${
//    data.sex == '女'
//      ? formItem({
//          label: '月经史',
//          value: data.menses?.trim(),
//          unit: '。',
//          labelStyle: `width:80px;flex-shrink:0;`,
//          rowStyle: `${cssStyle.rowStyle}`
//        })
//      : ''
//  }
//  ${
//    data.sex == '女'
//      ? formItem({
//          label: '婚育史',
//          value: data.maternity?.trim(),
//          unit: '。',
//          labelStyle: `width:80px;flex-shrink:0;`,
//          rowStyle: `${cssStyle.rowStyle}`
//        })
//      : ''
//  }
const getItem = (dataList) => {
  return dataList.map((item) => {
    return `<section style="${
      cssStyle.printContainer
    }width:50%;margin-left:50%;position:relative;padding-top:30px;font-size:14px;font-family:SimSun;padding-left:38px;padding-right:38px;${
      cssStyle.borderbox
    }">
  <style type="text/css" media="print">@page { size: A4 landscape;margin:0mm; }</style>
              <div style="${cssStyle.title}margin-bottom:8px;font-size:22px;">${
      item.hospitalName
    }</div>
              <div style="${
                cssStyle.title
              }margin-bottom:16px;"><span style="border-bottom:1px solid black;font-size:18px;">病人门(急)诊病历</span></div>
              <div style="${cssStyle.formRow}justify-content:space-between;">
                ${formItem({ label: '姓名', value: item.name })}
                ${formItem({ label: '性别', value: item.sex })}
                ${formItem({ label: '年龄', value: item.age })}
                ${formItem({ label: '民族', value: item.nation })}
                ${formItem({
                  label: '出生日期',
                  value: dayjs(item.dateOfBirth).format('YYYY-MM-DD')
                })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '病人ID', value: item.patientId })}
                ${formItem({
                  label: '婚否',
                  value: item.marrital,
                  labelStyle: 'margin-left:10px;'
                })}
                ${formItem({
                  label: '籍贯',
                  value: item.birthPlaceName,
                  labelStyle: 'margin-left:10px;'
                })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({
                  label: '身份证号',
                  value: item.idNo,
                  rowStyle: 'width:48%;margin-right:2%;',
                  labelStyle: cssStyle.labelWidth,
                  valueStyle: `border-bottom:1px solid black;flex-grow:1;`
                })}
                ${formItem({
                  label: '电话号码',
                  value: item.nextOfKinPhone,
                  rowStyle: 'width:50%',
                  valueStyle: `border-bottom:1px solid black;flex-grow:1;`
                })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({
                  label: '工作单位',
                  value: item.unitInContract,
                  rowStyle: 'width:48%;margin-right:2%;',
                  labelStyle: cssStyle.labelWidth,
                  valueStyle: `border-bottom:1px solid black;flex-grow:1;`
                })}
                ${formItem({
                  label: '常住地址',
                  value: item.mailingAddress,
                  rowStyle: 'width:50%',
                  valueStyle: `border-bottom:1px solid black;flex-grow:1;`
                })}
              </div>
              <div style="${cssStyle.flexBetween}padding-top:8px;">
              ${formItem({ label: '就诊号', value: item.visitNo, rowStyle: 'width:50%' })}
                ${formItem({
                  label: '接诊时间',
                  value: item.registerDate,
                  rowStyle: 'width:50%',
                  labelStyle: cssStyle.labelWidth
                })}
              </div>
              <div style="${cssStyle.flexBetween}padding-top:8px;">
                ${formItem({
                  label: '就诊时间',
                  value: item.visitDate,
                  rowStyle: 'width:50%',
                  labelStyle: cssStyle.labelWidth
                })}
              </div>
              ${formItem({
                label: '主诉',
                value: item.illnessDesc?.trim(),
                unit: '。',
                labelStyle: `${cssStyle.labelWidth}flex-shrink: 0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '现病史',
                value: item.medHistory?.trim(),
                unit: '。',
                labelStyle: `width:80px;flex-shrink:0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '既往史',
                value: item.anamnesis?.trim(),
                unit: '。',
                labelStyle: `width:80px;flex-shrink:0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
               ${formItem({
                 label: '家族史',
                 value: item.familyIll?.trim(),
                 unit: '。',
                 labelStyle: `width:80px;flex-shrink:0;`,
                 rowStyle: `${cssStyle.rowStyle}`
               })}
               ${formItem({
                 label: '过敏史',
                 value: item.individual?.trim(),
                 unit: '。',
                 labelStyle: `width:80px;flex-shrink:0;`,
                 rowStyle: `${cssStyle.rowStyle}`
               })}
              <div style="display:${item.bodyExam == 'aa' ? 'none' : 'block'}">
                <div style="${cssStyle.formRow}${cssStyle.rowStyle}">
                  <div style="display:${item.bodyExam == 'aa' ? 'none' : 'block'}">${formItem({
      label: '体格检查',
      labelStyle: cssStyle.labelWidth
    })}</div>
                  <div>
                    <section style="display:flex;flex-wrap: wrap;align-items:center;">
                      ${
                        item.bodyHeight == null || item.bodyHeight == ''
                          ? ''
                          : formItem({
                              label: '身高',
                              value: item.bodyHeight,
                              unit: 'cm'
                            })
                      }
                      ${
                        item.bodyWeight == null || item.bodyWeight == ''
                          ? ''
                          : formItem({
                              label: '体重',
                              value: item.bodyWeight,
                              unit: 'kg'
                            })
                      }
                      ${
                        item.temperature == null || item.temperature == ''
                          ? ''
                          : formItem({
                              label: '体温',
                              value: item.temperature,
                              unit: '°C'
                            })
                      }
                      ${
                        item.bloodPressure == null || item.bloodPressure == ''
                          ? ''
                          : formItem({
                              label: '收缩压',
                              value: item.bloodPressure,
                              unit: 'mmHg'
                            })
                      }
                      ${
                        item.bloodPressureL == null || item.bloodPressureL == ''
                          ? ''
                          : formItem({
                              label: '舒张压',
                              value: item.bloodPressureL,
                              unit: 'mmHg'
                            })
                      }
                      ${' ' + item.bodyExam == 'aa' || item.bodyExam == 'bb' ? '' : item.bodyExam}
                    </section>
                  </div>
                </div>
              </div>
              <div style="${cssStyle.flexBetween}padding-top:8px;border-bottom:${
      dataList.length > 1 ? '1px' : '1px'
    } solid black;">
              ${formItem({
                label: '辅助检查',
                value: item.anciExam,
                unit: '。',
                labelStyle: `width:80px;flex-shrink:0;`
              })}
              </div>
              ${formItem({
                label: '西医诊断',
                value: item.diagDesc,
                labelStyle: `width:80px;flex-shrink:0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '中医诊断',
                value: item.cdiag,
                labelStyle: `width:80px;flex-shrink:0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '中医四诊',
                value: item.fourDiagnosis,
                labelStyle: `width:80px;flex-shrink:0;`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '处理',
                value: item.operationRecord?.trim(),
                unit: '。',
                labelStyle: `width:80px;flex-shrink:0`,
                rowStyle: `${cssStyle.rowStyle}`
              })}
               ${formItem({
                 label: '建议',
                 value: item.advice?.trim(),
                 unit: '。',
                 labelStyle: `width:80px;flex-shrink:0;`,
                 rowStyle: `${cssStyle.rowStyle}`
               })}
              ${formItem({
                label: '备注',
                value: item.memo?.trim(),
                unit: '。',
                labelStyle: cssStyle.labelWidth,
                rowStyle: `${cssStyle.rowStyle}`
              })}
              ${formItem({
                label: '患者去向',
                value: item.hzqx,
                unit: '。',
                labelStyle: cssStyle.labelWidth,
                rowStyle: `${cssStyle.rowStyle}`
              })}
            <div style="${
              cssStyle.flexBetween
            }position:fixed;right:38px;bottom:38px;width:44%;margin-left:50%;padding-left:4px;">
                ${formItem({
                  label: '打印时间',
                  value: new Date().toLocaleString(),
                  labelStyle: `width:80px;flex-shrink:0`
                })}
                ${formItem({
                  label: '科室',
                  labelStyle: `width:50px;flex-shrink:0`,
                  value: item.deptName
                })}
                ${
                  item.docImage
                    ? `医生<img src='${item.docImage[0].value}' style='width:90px;height:32px;position:relative;top:-5px;left:-3px;' />`
                    : formItem({
                        label: '医生',
                        value: item.doctor,
                        labelStyle: `width:50px;flex-shrink:0`
                      })
                }
            </div>
          </section>`
  })
}
// 门诊病历 模版
const html = (data: Partial<BingLiProps>) => {
  return `${getItem(data)}`
}

export default html
