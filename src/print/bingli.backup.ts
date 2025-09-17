import { cssStyle as style } from './index'

const cssStyle = {
  ...style,
  formRow: 'display:flex;margin-top:8px;',
  title: `${style.flexCenter};align-items:center;font-size:26px;font-weight:700;color:#000000;font-family:SimSun;`,
  divLine: `${style.flexBetween}line-height:24px;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  labelWidth: 'width:76px;'
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
  return `<div style="box-sizing: border-box;display:flex;font-size: 14px;font-family:SimSun;font-weight:700;color: #000000;${
    param.rowStyle
  }">
              <section style="${param.labelStyle}">${param.label}：</section>
              <section style="font-weight:normal;${param.valueStyle}">${
    isPre ? '<pre style="font-family:SimSun;font-weight:500;">' : ''
  }${param.value || ''}${param.unit && param.value ? param.unit : ''}${
    isPre ? '</pre>' : ''
  }</section>
          </div>`
}

// 处方单 模板
const html = (data: Partial<BingLiProps>) => {
  return `<section style="width:100%;height:98vh;position:relative;padding-top:38px;font-size:14px;font-family:SimSun;padding-left:38px;padding-right:38px;${
    cssStyle.borderbox
  }">
  <style type="text/css" media="print">@page { margin:0mm; }</style>
              <div style="${cssStyle.title}margin-bottom:8px;font-size:22px;">${
    data.hospitalName
  }</div>
              <div style="${cssStyle.title}margin-bottom:16px;">病人门（急）诊病历</div>
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '姓名', value: data.name, rowStyle: 'width:25%' })}
                ${formItem({ label: '性别', value: data.sex, rowStyle: 'width:25%' })}
                ${formItem({
                  label: '年龄',
                  value: data.age,
                  rowStyle: 'width:25%'
                })}
                ${formItem({ label: '病人ID', value: data.patientId, rowStyle: 'width:25%' })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '籍贯', value: data.birthPlaceName, rowStyle: 'width:50%' })}
                ${formItem({ label: '民族', value: data.nation, rowStyle: 'width:50%' })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '出生日期', value: data.dateOfBirth, rowStyle: 'width:50%' })}
                ${formItem({
                  label: '婚否',
                  value: data.marrital,
                  rowStyle: 'width:50%',
                  labelStyle: 'width:61px'
                })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({
                  label: '身份证号',
                  value: data.idNo,
                  rowStyle: 'width:50%',
                  labelStyle: cssStyle.labelWidth
                })}
                ${formItem({
                  label: '电话号码',
                  value: data.nextOfKinPhone,
                  rowStyle: 'width:50%'
                })}
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({
                  label: '工作单位',
                  value: data.unitInContract,
                  rowStyle: 'width:50%',
                  labelStyle: cssStyle.labelWidth
                })}
                ${formItem({
                  label: '常住地址',
                  value: data.mailingAddress,
                  rowStyle: 'width:50%'
                })}
              </div>
              <div style="${
                cssStyle.flexBetween
              }border-top: 1px solid black;margin-top:8px;padding-top:8px;">
              ${formItem({ label: '就诊序号', value: data.visitNo, rowStyle: 'width:50%' })}
                ${formItem({
                  label: '就诊时间',
                  value: data.visitDate,
                  rowStyle: 'width:50%',
                  labelStyle: cssStyle.labelWidth
                })}
              </div>
              <div style="${cssStyle.flexBetween}padding-top:8px;">
                ${formItem({ label: '就诊科室', value: data.deptName, rowStyle: 'width:50%' })}
                ${formItem({ label: '发病时间', value: data.illnessDate, rowStyle: 'width:50%' })}
              </div>
              ${formItem(
                {
                  label: '主诉',
                  value: data.illnessDesc,
                  unit: '。',
                  labelStyle: `${cssStyle.labelWidth}flex-shrink: 0;`,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '现病史',
                  value: data.medHistory,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '既往史',
                  value: data.anamnesis,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '家族史',
                  value: data.familyIll,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '婚孕史',
                  value: data.maternity,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${
                data.sex === '女'
                  ? formItem(
                      {
                        label: '月经史',
                        value: data.menses,
                        unit: '。',
                        labelStyle: cssStyle.labelWidth,
                        rowStyle: 'margin-top:8px;'
                      },
                      true
                    )
                  : ''
              }
              ${formItem(
                {
                  label: '过敏史',
                  value: data.individual,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '体格检查' })}
                <section style="display:flex;flex-wrap: wrap;align-items:flex-end;">
                  ${formItem({
                    label: '身高',
                    value: data.bodyHeight,
                    unit: 'cm'
                  })}，
                  ${formItem({
                    label: '体重',
                    value: data.bodyWeight,
                    unit: 'kg'
                  })}，
                  ${formItem({
                    label: '收缩压',
                    value: data.bloodPressure,
                    unit: 'mmHg'
                  })}，
                  ${formItem({
                    label: '舒张压',
                    value: data.bloodPressureL,
                    unit: 'mmHg'
                  })}，
                  ${formItem({
                    label: '是否发热',
                    value: data.ffever
                  })}，
                  ${formItem({
                    label: '体温',
                    value: data.temperature,
                    unit: '°C。'
                  })}
                </section>
              </div>
              <div style="${cssStyle.formRow}">
                ${formItem({ label: '传染病史' })}
                <section style="display:flex;flex-wrap: wrap;align-items:flex-end;">
                  ${formItem({
                    label: '是否接触传染病',
                    value: data.infectiousDisease
                  })}，
                  ${formItem({
                    label: '是否中高风险地区',
                    value: data.riskArea
                  })}，
                  ${formItem({
                    label: '地区名称',
                    value: data.riskAreaName,
                    unit: '。'
                  })}
                </section>
              </div>
              ${formItem(
                {
                  label: '流行病史',
                  value: data.epidemic,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '体检',
                  value: data.bodyExam,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem(
                {
                  label: '处理',
                  value: data.operationRecord,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}

              ${formItem(
                {
                  label: '病程',
                  value: data.medicalRecord,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
              ${formItem({
                label: '西医诊断',
                value: data.diagDesc,
                unit: '。',
                labelStyle: `${cssStyle.labelStyle}flex-shrink:0;`,
                rowStyle: 'margin-top:8px;'
              })}
              ${formItem({
                label: '中医诊断',
                value: data.cdiag,
                unit: '。',
                labelStyle: cssStyle.labelStyle,
                rowStyle: 'margin-top:8px;'
              })}
              ${formItem({
                label: '中医四诊',
                value: data.fourDiagnosis,
                unit: '。',
                labelStyle: cssStyle.labelStyle,
                rowStyle: 'margin-top:8px;'
              })}
              ${formItem(
                {
                  label: '备注',
                  value: data.memo,
                  unit: '。',
                  labelStyle: cssStyle.labelWidth,
                  rowStyle: 'margin-top:8px;'
                },
                true
              )}
            <div style="${cssStyle.flexBetween}position:fixed;left:38px; right:38px;bottom:38px;">
                ${formItem({
                  label: '打印时间',
                  value: new Date().toLocaleString(),
                  labelStyle: cssStyle.labelStyle
                })}
                <section style="display:flex;">
                    ${formItem({
                      label: '科室',
                      value: data.deptName
                    })}
                    ${formItem({
                      label: '医生',
                      value: data.doctor,
                      rowStyle: 'margin-left:32px;'
                    })}
                </section>
            </div>
          </section>`
}

export default html
