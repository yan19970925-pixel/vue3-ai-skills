export interface FirstClinicPatParam {
  clinicDept: string
  clinicLabel: string
  counselNo?: string
  visitDate?: string
  queueName?: string
  isAllDept?: string
  isCurrDay?: string
}

export interface OutpDoctorRoomParam {
  doctorNo: string
  clinicDept: string
  dayOfWeek: number
}

export interface PatInfoByPatientIdParam {
  patientId: string
  name: string
  nextOfKinPhone: string
  idNo: string
  cardNo: string
}

export interface OutpMrListParam {
  patientId: string
  visitNo: number
  visitDate: string
  ordinal: number
  source?: string
}

export interface HistoryMrListParam extends Partial<OutpMrListParam> {
  timeType: number | string
  visitDateStart?: string
  visitDateEnd?: string
}

export interface OutpMrModelListProps {
  modelFlag: string
  modelName: string
  illnessDesc: string
  anamnesis: string
  individual: string
  familyIll: string
  menses: string
  medHistory: string
  operationRecord: string
  diagDesc: string
  cdiag: string
  bodyExam: string
  medicalRecord: string
  advice: string
  operatorNo: string
  deptCode: string
  inputCode: string
  inputCodeWb: string
  insertDate: string
  modelSerialno: string
  memo: string
  doctor: string
  marrital: string
  cdiagCode: string
  diagCode: string
  epidemic: string
}

export interface OutpMrModelListParams {
  modelFlag?: string
  modelName?: string
  deptCode: string
  operatorNo: string
}

export interface QueryPatienParam {
  patientId?: string
  name?: string
  nextOfKinPhone?: string
  idNo?: string
  cardNo?: string
  phoneNumberHome?: string
}
export interface QueryCardPatienParam {
  patientId: string
  name: string
  phoneNumberHome: string
  idNo: string
  cardNo: string
}
export interface NationalityParam {
  keyWord?: string
  dictType: string
  groupClass?: string
}
export interface CreateRegParam {
  deptId: string
  deptName?: string
  doctorId: string
  doctor: string
  clinicLabel: string
  clinicType: string
  timeFlag: string
  firstVisitIndicator: string
  regDate?: String
  patientId: string
  cardName: string
  cardNo: string
  operator: string
}
export interface CreatePatInfoParam {
  patientId: string
  name: string
  namePhonetic: string
  sex: string
  dateOfBirth: string
  birthPlace: string
  citizenship: string
  nation: string
  idNo: string
  identity: string
  chargeType: string
  unitInContract: string
  mailingAddress: string
  nextOfKin: string
  relationship: string
  nextOfKinAddr: string
  nextOfKinPhone?: string
  nativePlace: string
  idType: string
  cardNo: string
  occupation: string
  operator: string
  phoneNumberHome: string
}

export interface SaveTransferProps {
  visitNo: number
  visitDate: string
  clinicLabel: string
  clinicDept: string
  doctor: string
  doctorName: string
  price: number
}

export interface PrintAllParams {
  patientId?: string
  visitDate: string
  visitNo: number
  examNo?: string
}

export interface PayBigOrderParams {
  patientId: string
  visitDate: string
  visitNo: number
  payAmount: number
  orderId?: string
  treadNo?: string
  payMode?: string
  payTime?: string
  serialNoGroup?: string[]
  insuplcAdmdvs?: string
  setlInfo?: string
  payWay?: string
}

export interface InsurPreSettleParams {
  patientId: string
  visitDate: string
  visitNo: number
  serialNoGroup?: string[]
  mdtrtCertType: string
  mdtrtCertNo: string
  cardSn?: string
  insuplcAdmdvs?: string
  psnCertType?: string
  certNo?: string
  psnName?: string
  acctUsedFlag?: string
}

export interface InsurSettleParams {
  patientId: string
  visitDate: string
  visitNo: number
  payAmount: number
  orderId?: string
  treadNo?: string
  payWay?: string
  payTime?: string
  serialNoGroup?: string[]
  setlIn?: object
}
