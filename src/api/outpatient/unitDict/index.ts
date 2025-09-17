import request from '@/config/axios'
const OUTP_API_URL = import.meta.env.VITE_OUTP_API_URL
import type { clinicNoFormDictParam, drugStorageDictParam, NationalityParam } from './types'

//查询执行科室字典
export const getPerformedByDeptDict = () => {
  return request.post({ url: '/admin-api/infra/unitDict/queryPerformedByDeptDict' })
}

//查询诊疗项目_不开申请单字典
export const getVClinicNoFormDict = (data: clinicNoFormDictParam) => {
  return request.post({ url: OUTP_API_URL + '/outpD/disDict/queryVClinicNoFormDict', data })
}

//查询医嘱执行频率字典
export const getPerformFreqDict = () => {
  return request.post({ url: '/admin-api/infra/disDict/queryPerformFreqDict' })
}

//查询临床诊疗项目分类字典
export const getClinicItemClassDict = () => {
  return request.post({ url: '/admin-api/infra/disDict/queryClinicItemClassDict' })
}

// 查询给药途径字典
export const getAdministrationDict = () => {
  return request.post({ url: '/admin-api/infra/disDict/queryAdministrationDict' })
}

// 查询重要脚注字典
export const getChineseDrugUsageDict = () => {
  return request.post({ url: '/admin-api/infra/medDict/queryChineseDrugUsageDict' })
}

// 查询职业分类字典
export const getOccupationDict = () => {
  return request.post({ url: '/admin-api/infra/perDict/queryOccupationDict' })
}

// 查询民族字典
export const getNationDict = () => {
  return request.post({ url: '/outp-api/outpD/perDict/queryNationDict' })
}

// 查询病人来源字典
export const getMrAreaDict = () => {
  return request.post({ url: '/outp-api/outpD/perDict/queryMrAreaDict' })
}

// 查询地区字典 zm未调用
// export const getAreaDict = () => {
//   return request.post({ url: '/outp-api/outpD/unitDict/queryAreaDict' })
// }

// 查询药房字典
export const getDrugStorageDict = (data: drugStorageDictParam) => {
  return request.post({ url: '/admin-api/infra/medDict/queryDrugStorageDict', data })
}

// 查询处方属性字典
export const getDrugPrescAttrDict = () => {
  return request.post({ url: '/admin-api/infra/medDict/queryDrugPrescAttrDict' })
}

//查询国籍字典 所有字典推荐调用这个接口
export const getDictByConfig = (data: NationalityParam) => {
  return request.post({ url: '/admin-api/infra/inputSetting/queryDictByConfig', data })
}

// 查询与病人关系字典
export const getRelationshipDict = () => {
  return request.post({ url: '/admin-api/infra/perDict/queryRelationshipDict' })
}

// 查询职业分类字典
export const getPatientClassDict = () => {
  return request.post({ url: '/admin-api/infra/perDict/queryPatientClassDict' })
}

// 查询入院病情字典
export const getPatAdmConditionDict = () => {
  return request.post({ url: '/admin-api/infra/perDict/queryPatAdmConditionDict' })
}

// 查询入院病情字典
export const refreshRedisDict = (data: { dictType: string }) => {
  return request.post({ url: '/admin-api/infra/inputSetting/refreshRedisDict', data })
}
//查询医疗卡类型字典
export const queryMedicalCardTypeDict = (data: { dictType: string }) => {
  return request.post({ url: '/admin-api/infra/medDict/queryMedicalCardTypeDict', data })
}
