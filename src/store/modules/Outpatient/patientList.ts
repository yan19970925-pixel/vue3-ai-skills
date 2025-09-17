import { store } from '../../index'
import { defineStore } from 'pinia'
import { PatInfoByPatientIdParam } from '@/api/outpatient/types'
import { useCache } from '@/hooks/web/useCache'
import { getDictSetting } from '@/api/outpatient/index'

const { wsCache } = useCache()

const OUTP_DOCTOR_ROOM_KEY = 'OUTP_DOCTOR_ROOM_KEY'
const HOSPITAL_NAME_KEY = 'HOSPITAL_NAME_KEY'
const DIAG_COLUMNS_KEY = 'DIAG_COLUMNS_KEY'
const C_DIAG_COLUMNS_KEY = 'C_DIAG_COLUMNS_KEY'
const INSUR_HOS_NO_KEY = 'INSUR_HOS_NO_KEY'
const OUTP_CURRENT_DOC_ROOM_KEY = 'OUTP_CURRENT_DOC_ROOM_KEY'
const OUTP_CURRENT_PATIENT_KEY = 'OUTP_CURRENT_PATIENT_KEY'

export interface ClinicPatListItem {
  name: string
  queueName: string
  registerDept: string
  queueSequence: number
  registerDate: string
  patientId: string
  sex: string
  chargeType: string
  clinicType: string
  visitDate: string // 就诊日期
  visitNo: number // 就诊序号
  serialNo: number
  visitDept: string
  deptName: string
  counselNo: string
  workedIndicator: number
  doctor: string
  doctorNo: string
  clinicNo?: string
  isCurrentDayPatient?: boolean
}

export interface CurrentPatientInfo {
  patientId: string
  name: string
  sex: string
  age: string
  medicalAge: string
  dateOfBirth: string
  birthPlace: string
  birthPlaceName: string
  chargeType: string
  nation: string // 民族
  idNo: string // 身份证号
  identity: string // 身份
  unitInContract: string // 单位名称
  mailingAddress: string // 家庭住址
  nextOfKin: string // 联系人
  nextOfKinPhone?: string // 联系电话
  occupation: string // 职业
  visitDate: string // 就诊日期
  visitNo: number // 就诊序号
  zipCode?: string // 邮政编码
  relationship?: string // 与患者关系
  nextOfKinAddr?: string // 联系人地址
  phoneNumberHome?: string // 病人电话
  marrital?: string
  registerDate?: string // 接诊时间
}

// 患者信息
export interface ClinicPatInfo {
  patientId: string
  visitDate: string // 就诊日期
  visitNo: number // 就诊序号
  visitDept: string
  registerDate: string // 接诊时间
  clinicNo?: string
}

export interface LabelOptionsProp {
  clinicLabel: string
  clinicType: string
  clinicDuration: string
  queueName: string
  counselNo: string
}

export interface OutpDoctorRoomProps {
  groupCode: string
  deptName: string
  counselNo?: string
  autoSign?: number
  counselMode?: number
  loginMode?: string
  clinicLabelList: LabelOptionsProp[]
}

export interface CurrentDoctorRoomProps {
  groupCode: string // 门诊code
  deptName: string // 门诊名称
  counselNo?: string
  clinicLabelList?: LabelOptionsProp[]
}

interface DiagInfo {
  diagDesc: string // 西医诊断
  diagCode: string
  cdiagCode: string
  cdiag: string // 中医诊断
}

interface DiagTableDataProps {
  id?: number | string
  serialNo: number
  diagFlag: number
  diagnosisDesc: string
  diagnosisCode: string
  diagnosisName: string
  deptCode: string // 科室编码
  diagType: number
}
interface AllergyTableDataProps {
  allergyDesc: string
  allergyId: string
  idNo: string
  itemNo: number
  patientId: string
}

interface DictSettingProps {
  dataTable: string
  dataCol: string
  inputCode: string
  dataTitle: string
  flagShow: string
  showSort: string
  flagIsname: string
  resultSort: string
  showWidth: string
  sortFlag: string
}

interface CostInfoProps {
  balance: string // 余额
  total: string // 总计
  unbilledTotal: string // 未计费
}

interface PatientListState {
  curentPatient: ClinicPatInfo // 当前患者简单参数
  currentPatientInfo: CurrentPatientInfo // 完整的患者信息
  firstClinicPatList: ClinicPatListItem[] // 初诊
  clinicedPatList: ClinicPatListItem[] // 已诊
  patInfoByPatIdParam: PatInfoByPatientIdParam // 根据病人id查询患者信息 参数
  showDialog: boolean
  currentPatientId: string
  outpDoctorRoom: OutpDoctorRoomProps[] // 就诊科室列表
  currentDocRoom: CurrentDoctorRoomProps // 当前科室信息
  diagInfo: Partial<DiagInfo> // 主诊断信息
  diagList: DiagTableDataProps[] // 诊断列表
  allergyList: AllergyTableDataProps[] //过敏史列表
  allergyListName: string //过敏史列表名称拼接
  hospitalName: string // 医院名称
  insurHosno: string // 医院编号
  chargingQrUrl: string // 支付二维码
  diagColumns: DictSettingProps[] // 西医诊断列表的列数据
  cdiagColumns: DictSettingProps[] // 西医诊断列表的列数据
  costInfo: CostInfoProps
  currentDocument: any // 当前病历信息
}

const usePatientListStore = defineStore('patient-list', {
  state: (): PatientListState => ({
    curentPatient: {
      patientId: '',
      visitDate: '', // 就诊日期
      visitNo: 0, // 就诊序号
      visitDept: '',
      registerDate: '',
      clinicNo: ''
    },
    currentPatientInfo: {
      patientId: '',
      name: '',
      sex: '男',
      age: '',
      dateOfBirth: '',
      birthPlace: '',
      medicalAge: '',
      birthPlaceName: '', //出生地名称
      nation: '', // 民族
      idNo: '', // 身份证号
      identity: '', // 身份
      chargeType: '', // 费别
      unitInContract: '', // 单位名称
      mailingAddress: '', // 家庭住址
      nextOfKin: '', // 联系人
      nextOfKinPhone: '', // 联系电话
      occupation: '', // 职业
      visitDate: '', // 就诊日期
      visitNo: -1 // 就诊序号
    },
    firstClinicPatList: [],
    clinicedPatList: [],
    patInfoByPatIdParam: {
      patientId: '',
      name: '',
      nextOfKinPhone: '',
      idNo: '',
      cardNo: ''
    },
    showDialog: false,
    currentPatientId: '',
    outpDoctorRoom: [],
    currentDocRoom: {
      groupCode: '', // 科室编码
      deptName: '', // 科室名称
      counselNo: '',
      clinicLabelList: []
    },
    diagInfo: {
      diagDesc: '',
      diagCode: '',
      cdiagCode: '',
      cdiag: ''
    },
    diagList: [],
    allergyList: [], //过敏史
    allergyListName: '',
    hospitalName: '',
    insurHosno: '',
    chargingQrUrl: '',
    diagColumns: [],
    cdiagColumns: [],
    costInfo: { balance: '-', total: '-', unbilledTotal: '-' },
    currentDocument: {}
  }),
  getters: {
    getCurrentPatient(): ClinicPatInfo {
      return this.curentPatient || wsCache.get(OUTP_CURRENT_PATIENT_KEY)
    },
    getCurrentPatientInfo(): CurrentPatientInfo {
      return this.currentPatientInfo
    },
    getFirstClinicPatList(): ClinicPatListItem[] {
      return this.firstClinicPatList
    },
    getClinicedPatList(): ClinicPatListItem[] {
      return this.clinicedPatList
    },
    getPatInfoByPatIdParam(): PatInfoByPatientIdParam {
      return this.patInfoByPatIdParam
    },
    getShowDialog(): boolean {
      return this.showDialog
    },
    getCurrentPatientId(): string {
      return this.currentPatientId
    },
    getOutpDoctorRoom(): OutpDoctorRoomProps[] {
      return this.outpDoctorRoom && this.outpDoctorRoom.length > 0
        ? this.outpDoctorRoom
        : wsCache.get(OUTP_DOCTOR_ROOM_KEY)
    },
    getCurrentDocRoom(): CurrentDoctorRoomProps {
      return this.currentDocRoom && this.currentDocRoom.groupCode
        ? this.currentDocRoom
        : wsCache.get(OUTP_CURRENT_DOC_ROOM_KEY) // 获取当前科室
    },
    getDiagInfo(): Partial<DiagInfo> {
      return this.diagInfo
    },
    getDiagList(): DiagTableDataProps[] {
      return this.diagList
    },
    getAllergyList(): AllergyTableDataProps[] {
      return this.allergyList
    },
    getAllergyListName(): string {
      return this.allergyListName
    },
    getHospitalName(): string {
      return this.hospitalName || wsCache.get(HOSPITAL_NAME_KEY)
    },
    getInsurHosno(): string {
      if (!this.insurHosno) {
        this.insurHosno = wsCache.get(INSUR_HOS_NO_KEY)
      }
      return this.insurHosno
    },
    getDiagColumns(): DictSettingProps[] {
      return this.diagColumns.length > 0 ? this.diagColumns : wsCache.get(DIAG_COLUMNS_KEY)
    },
    getCDiagColumns(): DictSettingProps[] {
      return this.cdiagColumns.length > 0 ? this.cdiagColumns : wsCache.get(C_DIAG_COLUMNS_KEY)
    },
    getCostInfo(): CostInfoProps {
      return this.costInfo
    },
    getChargingQrUrl(): string {
      return this.chargingQrUrl
    },
    getCurrentDocumentInfo(): any {
      return this.currentDocument
    }
  },
  actions: {
    setCurrentPatient(val: ClinicPatInfo) {
      wsCache.set(OUTP_CURRENT_PATIENT_KEY, { ...val })
      this.curentPatient = { ...val }
    },
    setCurrentPatientInfo(val: CurrentPatientInfo) {
      this.currentPatientInfo = { ...val }
    },
    setCurrentPatientMarry(val: string) {
      this.currentPatientInfo = { ...this.currentPatientInfo, marrital: val }
    },
    setFirstClinicPatList(val: ClinicPatListItem[]) {
      this.firstClinicPatList = [...val]
    },
    setClinicedPatList(val: ClinicPatListItem[]) {
      this.clinicedPatList = [...val]
    },
    setPatInfoByPatIdParam(val: PatInfoByPatientIdParam) {
      this.patInfoByPatIdParam = { ...val }
    },
    setShowDialog(val: boolean) {
      this.showDialog = val
    },
    setCurrentPatientId(val: string) {
      this.currentPatientId = val
    },
    setOutpDoctorRoom(val: OutpDoctorRoomProps[]) {
      wsCache.set(OUTP_DOCTOR_ROOM_KEY, val)
      this.outpDoctorRoom = val
    },
    setCurrentDocRoom(val: CurrentDoctorRoomProps) {
      wsCache.set(OUTP_CURRENT_DOC_ROOM_KEY, { ...val })
      this.currentDocRoom = { ...val }
    },
    setDiagInfo(val: Partial<DiagInfo>) {
      this.diagInfo = { ...this.diagInfo, ...val }
    },
    setDiagList(val: DiagTableDataProps[]) {
      this.diagList = val
    },
    setAllergyList(val: AllergyTableDataProps[]) {
      this.allergyList = val
    },
    setAllergyListName(val: string) {
      this.allergyListName = val
    },
    setHospitalName(val: string) {
      wsCache.set(HOSPITAL_NAME_KEY, val)
      this.hospitalName = val
    },
    setInsurHosno(val: string) {
      wsCache.set(INSUR_HOS_NO_KEY, val)
      this.insurHosno = val
    },
    setDiagColumns() {
      getDictSetting({ dictType: '西医诊断' }).then((res: DictSettingProps[]) => {
        wsCache.set(DIAG_COLUMNS_KEY, res)
        this.diagColumns = res
      })
    },
    setCDiagColumns() {
      getDictSetting({ dictType: '中医诊断' }).then((res: DictSettingProps[]) => {
        wsCache.set(C_DIAG_COLUMNS_KEY, res)
        this.cdiagColumns = res
      })
    },
    setCostInfo(val: CostInfoProps) {
      this.costInfo = { ...val }
    },
    setChargingQrUrl(val: string) {
      this.chargingQrUrl = val
    },
    setCurrentDocumentInfo(val) {
      this.currentDocument = val
    }
  }
})

export const usePatientListStoreWithOut = () => {
  return usePatientListStore(store)
}

export default usePatientListStore
