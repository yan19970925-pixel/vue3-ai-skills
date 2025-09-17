export interface clinicNoFormDictParam {
  keyWord: string //拼音码,示例值(ZX)
}
export interface drugStorageDictParam {
  deptCode: string //科室代码,示例值(2001)
  parameterName: string //参数名称,示例值(DISP)
  appName: string //应用名,示例值(OUTPDOCTOR)
}
export interface NationalityParam {
  keyWord?: string
  dictType: string
  groupClass?: string
  cons?: string
  drugCode?: string
  counts?: Number
  drugSpec?: string
}

export interface DiagDictProps {
  diagnosisName: string
  inputCode: string
  diagnosisCode: string
}

export interface DiagColumnProps {
  dataCol: string
  dataTitle: string
  showWidth: string
}

export interface DictSettingProps {
  dataTable: string
  dataCol: string
  inputCode: string
  dataTitle: string
  flagShow: string
  showSort: string
  flagIsname: string
  resultSort: string
  showWidth?: string | number
  sortFlag?: string
}

// 工作职别
export interface OccupationProps {
  occupationCode: string
  occupationName: string
}

//与病人关系
export interface RelationShipProps {
  relationshipCode: string
  relationshipName: string
}

// 入院方式
export interface rygdOptionsProps {
  patientClassName: string
  patientClassCode: string
}

// 入院情况
export interface ryqkOptionsProps {
  patConditionName: string
  patConditionCode: string
}

// 入院科室
export interface DeptOptionsPorps {
  deptName: string
  deptCode: string
}
