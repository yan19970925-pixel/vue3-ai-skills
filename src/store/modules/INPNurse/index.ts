import { defineStore } from 'pinia'
import { IStatInfo, IPatientInfo, DiagInfo, NurseYlkInfo } from './types'
import { useCache } from '@/hooks/web/useCache'
const HOSPITAL_NAME_KEY = 'HOSPITAL_NAME_KEY'
const HOSPITAL_CODE_KEY = 'HOSPITAL_CODE_KEY'
const { wsCache } = useCache()
const INPPatientInfoKey = 'INPPatientInfoKey'
interface INPDoctorState {
  statInfo: IStatInfo
  patientInfo: IPatientInfo
  hospitalName: string // 医院名称
  hospitalCode: string // 医疗机构编码
  diagInfo: DiagInfo // 主诊断信息
  nurseYlkInfo: NurseYlkInfo
}

const useINPNurseStore = defineStore('INP-nurse', {
  state: (): INPDoctorState => ({
    statInfo: {
      otherDept: 0,
      newEntryToday: 0,
      dischargedToday: 0,
      daySurgery: 0,
      currentlyInDept: 0,
      pendingEnrollment: 0,
      sameDaySettlement: 0
    },
    patientInfo: {
      patientId: '',
      visitId: 1,
      bedLabel: '',
      wardCode: '',
      bedNo: '',
      bedNo1: '',
      inpNo: '',
      name: '',
      sex: '',
      age: 0,
      dateOfBirth: '',
      ageMonths: '',
      admissionDateTime: '',
      ryxs: 0,
      nurstime: 0,
      zyyjye: 0,
      inpDays: 0,
      newState: 0,
      arrearsState: 0,
      allergyState: 0,
      dangerState: 0,
      importState: 0,
      operationState: 0,
      prepayments: 0,
      totalCosts: 0,
      operatingDate: '',
      doctorInCharge: '',
      doctorInChargeName: '',
      patientCondition: '',
      nursingClass: '',
      diagnosis: '',
      bedStatus: '',
      bedSexType: '',
      deptCode: '',
      deptName: '',
      admWardDateTime: '',
      bedApprovedType: '',
      chargeType: '',
      bedPrice: 0,
      drgs: '',
      patientClass: '',
      xzlhff: '',
      pkry: '',
      orderVerify: 0,
      roomNo: '',
      rightMenuVisible: false,
      clientX: 0,
      clientY: 0,
      totalSanctifiedAmount: 0,
      skinResultState: 0,
      transferState: 0,
      expandBedNum: 0,
      occupiedBedNum: 0,
      unoccupiedBedNum: 0,
      dischargeDateTime: '',
      isZhuanKe: '',
      insutype: '',
      idNo: ''
    },
    hospitalName: '',
    hospitalCode: '',
    diagInfo: {
      diagDesc: '',
      diagCode: '',
      cdiagCode: '',
      cdiag: ''
    },
    nurseYlkInfo: {
      listType: '',
      nullBed: ''
    }
  }),
  getters: {
    //查询住院医生统计
    getStatInfo(): IStatInfo {
      return this.statInfo
    },
    // 患者信息
    getPatientInfo(): IPatientInfo {
      return this.patientInfo.patientId ? this.patientInfo : wsCache.get(INPPatientInfoKey)
    },
    getHospitalName(): string {
      return this.hospitalName || wsCache.get(HOSPITAL_NAME_KEY)
    },
    getHospitalCode(): string {
      return this.hospitalCode || wsCache.get(HOSPITAL_CODE_KEY)
    },
    getDiagInfo(): DiagInfo {
      return this.diagInfo
    },
    getNurseYlkInfo(): NurseYlkInfo {
      return this.nurseYlkInfo
    }
  },
  actions: {
    setStatInfo(val: IStatInfo) {
      this.statInfo = { ...val }
    },
    // 患者信息
    setPatientInfo(val: IPatientInfo) {
      wsCache.set(INPPatientInfoKey, { ...val })
      this.patientInfo = { ...val }
    },
    setHospitalName(val: string) {
      wsCache.set(HOSPITAL_NAME_KEY, val)
      this.hospitalName = val
    },
    setHospitalCode(val: string) {
      wsCache.set(HOSPITAL_CODE_KEY, val)
      this.hospitalCode = val
    },
    setDiagInfo(val: DiagInfo) {
      this.diagInfo = { ...this.diagInfo, ...val }
    },
    setNurseYlkInfo(val: NurseYlkInfo) {
      this.nurseYlkInfo = { ...this.nurseYlkInfo, ...val }
    }
  }
})

export default useINPNurseStore
