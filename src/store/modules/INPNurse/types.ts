// 查询住院医生统计
export interface IStatInfo {
  otherDept: number
  newEntryToday: number
  dischargedToday: number
  daySurgery: number
  currentlyInDept: number
  pendingEnrollment: number
  sameDaySettlement: number
}

export interface IPatientInfo {
  patientId: string //病人ID
  visitId: number //住院次数
  bedLabel: string //床标号
  wardCode: string //护理单元代码
  deptCode: string //所属科室代码
  deptName: string //所属科室名称
  bedNo: string //	床号
  bedNo1: string //床号1
  inpNo: string //	住院号
  name: string //姓名
  sex: string //性别
  age: number //年龄
  dateOfBirth: string //出生日期
  ageMonths: string //年龄月数
  admissionDateTime: string //入院日期及时间
  ryxs: number //入院小时
  nurstime: number //	入院多少小时内病人的入院时间显示红色,默认是12个小时
  inpDays: number //入院天数
  zyyjye: number //	住院预交余额
  prepayments: number //预交金余额
  totalCosts: number //累计未结费用
  operatingDate: string //手术日期
  doctorInCharge: string //经治医生编码
  doctorInChargeName: string //经治医生姓名
  patientCondition: string //病情
  nursingClass: string //护理等级 0特级 1一级 2二级 3三级 5病重 4病危 6整体
  diagnosis: string //主要诊断
  bedStatus: string //床位状态
  bedSexType: string //床位类型
  admWardDateTime: string //入科日期及时间
  bedApprovedType: string //床位编制类型
  chargeType: string //费别
  bedPrice: number //床位费
  drgs: string //单病种付费标识
  patientClass: string //入院方式
  xzlhff: string //先诊疗后付费
  pkry: string //困难群众
  orderVerify: number //待校验医嘱数量
  roomNo: string //房间
  newState: number //	新入状态
  arrearsState: number //	欠费状态  0否  1是
  allergyState: number //	过敏状态 0否  1是
  dangerState: number //	危急状态 0否  1是
  importState: number //	重症状态 0否  1是
  operationState: number //手术状态 0否  1是
  skinResultState: number //皮试结果 0阴  1阳
  transferState: number //转科状态 0否  1是
  rightMenuVisible: boolean
  clientX: number
  clientY: number
  expandBedNum: number
  occupiedBedNum: number
  unoccupiedBedNum: number
  dischargeDateTime: string
  totalSanctifiedAmount: number
  isZhuanKe: string
  reliefFlag: string
  insutype: string
  idNo: string
}
export interface DiagInfo {
  diagDesc?: string // 西医诊断
  diagCode?: string
  cdiagCode?: string
  cdiag?: string // 中医诊断
}
export interface NurseYlkInfo {
  nullBed?: string
  listType?: string
}
