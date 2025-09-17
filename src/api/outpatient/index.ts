import request from '@/config/axios'
import {
  FirstClinicPatParam,
  OutpDoctorRoomParam,
  PatInfoByPatientIdParam,
  OutpMrListParam,
  HistoryMrListParam,
  OutpMrModelListParams,
  QueryPatienParam,
  QueryCardPatienParam,
  CreateRegParam,
  CreatePatInfoParam,
  OutpMrModelListProps,
  SaveTransferProps,
  PrintAllParams,
  PayBigOrderParams,
  InsurPreSettleParams,
  InsurSettleParams
} from './types'
const VITE_E_INFETION_URL = import.meta.env.VITE_E_INFETION_URL
// 查询用户应用权限
export const getAppGrants = () => {
  return request.post({ url: '/admin-api/system/permission/app-grants' })
}

// 查询初诊队列
export const getFirstClinicPatList = (data: FirstClinicPatParam) => {
  return request.post({ url: '/outp-api/outpD/reg-info/getFirstClinicPatList', data })
}

// 查询已诊队列
export const getClinicedPatList = (data: FirstClinicPatParam) => {
  return request.post({ url: '/outp-api/outpD/reg-info/getClinicedPatList', data })
}

// 查询门诊医生诊室
export const getOutpDoctorRoom = (data: Partial<OutpDoctorRoomParam>) => {
  return request.post({ url: '/outp-api/outpD/doctor-info/getOutpDoctorRoom', data })
}

// 根据病人id查询患者信息
export const getPatInfoByPatientId = (data: Partial<OutpMrListParam>) => {
  return request.post({ url: '/outp-api/outpD/pat-info/getPatInfoByPatientId', data })
}

// 修改患者信息
export const updatePatInfo = (data) => {
  return request.post({ url: '/outp-api/outpD/pat-info/updatePatInfo', data })
}

// 中医诊断 将弃用
export const getVDiagZDict = (data) => {
  return request.post({ url: '/outp-api/outpD/disDict/queryVDiagZDict', data })
}

// 西医诊断 将弃用
export const getVDiagXDict = (data) => {
  return request.post({ url: '/outp-api/outpD/disDict/queryVDiagXDict', data })
}

// 病人门诊病例查询
export const getOutpMrList = (data: OutpMrListParam) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/getOutpMrList', data })
}

// 病人门诊病例保存
export const saveOutpMr = (data) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/saveOutpMr', data })
}

// 获取医院信息
export const getHospital = () => {
  return request.post({ url: '/admin-api/infra/hospital/queryHospital' })
}

// 患者历史病例及诊断查询
export const getHistoryMrList = (data: HistoryMrListParam) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/getHistoryMrList', data })
}

// 门诊病例模板新建
export const creatOutpMrModel = (data: Partial<OutpMrModelListProps>) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/creatOutpMrModel', data })
}

// 门诊病例模板查询
export const getOutpMrModelList = (data: OutpMrModelListParams) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/getOutpMrModelList', data })
}

// 门诊病例模板修改
export const updateOutpMrModel = (data: OutpMrModelListProps) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/updateOutpMrModel', data })
}

// 门诊病例模板删除
export const deleteOutpMrModel = (data: Partial<OutpMrModelListProps>) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/deleteOutpMrModel', data })
}

//查询患者信息
export const getPatInfoList = (data: QueryPatienParam) => {
  return request.post({ url: '/outp-api/outpD/pat-info/getPatInfoList', data })
}
//根据卡号查询患者信息
export const getPatInfoByCardNo = (data: QueryCardPatienParam) => {
  return request.post({ url: '/outp-api/outpD/pat-info/getPatInfoByCardNo', data })
}
//保存挂号
export const getCreateReg = (data: CreateRegParam) => {
  return request.post({ url: '/outp-api/outpD/reg-info/createReg', data })
}
//建档
export const getcreatePatInfo = (data: Partial<CreatePatInfoParam>) => {
  return request.post({ url: '/outp-api/outpD/pat-info/createPatInfo', data })
}

// 查询字典配置
export const getDictSetting = (data: { dictType: string }) => {
  return request.post({ url: '/admin-api/infra/inputSetting/queryDictSetting', data })
}

// 就诊完毕
export const finishClinic = (data: {
  visitDate: string
  visitNo: number
  doctorId: string
  doctor: string
}) => {
  return request.post({ url: '/outp-api/outpD/reg-info/finishClinic', data })
}

// 获取转诊的诊室列表 查询转诊信息
export const getDeptList = (data: { visitDate: string }) => {
  return request.post({ url: '/outp-api/outpD/transfer/queryTransferInfo', data })
}

// 转诊 TODO
export const switchDept = (data: SaveTransferProps) => {
  return request.post({ url: '/outp-api/outpD/transfer/saveTransfer', data })
}

// 查询门诊处方打印
export const getOutpPrescPrint = (data: PrintAllParams) => {
  return request.post({ url: '/outp-api/outpD/outp-presc/getOutpPrescPrint', data })
}

// 查询检查打印
export const getExamPrint = (data) => {
  return request.post({ url: '/outp-api/outpD/outp-exam/queryExamPrint', data })
}

// 查询检验打印
export const getLabPrintForView = (data) => {
  return request.post({ url: '/outp-api/outpD/lab-test/labPrintForView', data })
}
// 查询单个检验打印
export const getLabRePrint = (data) => {
  return request.post({ url: '/outp-api/outpD/lab-test/labRePrint', data })
}

// 查询患者就诊费用总额
export const getClinicCharges = (data: PrintAllParams) => {
  return request.post({ url: '/outp-api/outpD/outp-orders/getClinicCharges', data })
}
// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
//
export const checkClinicOrders = (data) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/checkClinicOrders', data })
}
//
export const createClinicOrders = (data) => {
  return request.post({ url: '/outp-api/outpD/outp-mr/createClinicOrders', data })
}
//患者列表叫号
export const savecallOut = (data) => {
  return request.post({ url: '/outp-api/outpD/clinic/savecallOut', data })
}
export const checkReportCard = (data) => {
  return request.getNew({
    url: VITE_E_INFETION_URL + '/nis7/bk001Sbk/f_json/checkReportCard.shtml?' + data
  })
}
//总览计算自费支付金额
export const queryOutpOrdersCostsDO = (data) => {
  return request.post({ url: '/outp-api/outpD/payment/queryOutpOrdersCostsDO', data })
}
//诊间支付
export const payBigOrder = (data: PayBigOrderParams) => {
  return request.post({ url: '/outp-api/outpD/payment/payBigOrder', data })
}
//医保预结算
export const insurPreSettle = (data: InsurPreSettleParams) => {
  return request.post({ url: '/outp-api/outpD/payment/insurPreSettle', data })
}
//医保结算
export const insurSettle = (data: InsurSettleParams) => {
  return request.post({ url: '/outp-api/outpD/payment/insurSettle', data })
}
//查询过敏源字典
export const queryAllergicDrugsDict = (data) => {
  return request.post({ url: '/outp-api/outpD/pat-info/queryAllergicDrugsDict', data })
}
// 查询病人过敏史
export const queryAllergyHistory = (data) => {
  return request.post({ url: '/outp-api/outpD/pat-info/queryAllergyHistory', data })
}
// 保存病人过敏史
export const saveAllergyHistory = (data) => {
  return request.post({ url: '/outp-api/outpD/pat-info/saveAllergyHistory', data })
}
// 查询门诊收据记录
export const queryOutpRcptMasterList = (data) => {
  return request.post({ url: '/outp-api/outpD/outpBill/queryOutpRcptMasterList', data })
}
// 查询门诊诊疗费用项目
export const queryOutpBillItems = (data) => {
  return request.post({ url: '/outp-api/outpD/outpBill/queryOutpBillItems', data })
}
// 保存退费申请
export const saveRefundCostApply = (data) => {
  return request.post({ url: '/outp-api/outpD/outpBill/saveRefundCostApply', data })
}
// 取消退费申请
export const cancelRefundCostApply = (data) => {
  return request.post({ url: '/outp-api/outpD/outpBill/cancelRefundCostApply', data })
}
// 打印退号条
export const printRefund = (data) => {
  return request.post({ url: '/outp-api/outpD/outpBill/printRefund', data })
}
// 查询本科室专家预约信息
export const queryDoctorRegistApp = (data) => {
  return request.post({ url: '/outp-api/outpD/reservate/queryDoctorRegistApp', data })
}
// 查询某个医生的预约排班详情
export const queryDoctorRegistDetail = (data) => {
  return request.post({ url: '/outp-api/outpD/reservate/queryDoctorRegistDetail', data })
}
// 保存预约信息
export const saveRegistInfo = (data) => {
  return request.post({ url: '/outp-api/outpD/reservate/saveRegistInfo', data })
}
// 根据医生或科室查询全部预约信息
export const queryAllRegistInfo = (data) => {
  return request.post({ url: '/outp-api/outpD/reservate/queryAllRegistInfo', data })
}
// 取消预约信息
export const cancleRegistInfo = (data) => {
  return request.post({ url: '/outp-api/outpD/reservate/cancleRegistInfo', data })
}
// 查询常用诊断信息
export const queryCommonUse = (data) => {
  return request.post({ url: '/admin-api/infra/commUse/queryCommonUse', data })
}
// 查询常用处置
export const queryCommonUseClinicNoForm = (data) => {
  return request.post({ url: '/admin-api/infra/commUse/queryCommonUseClinicNoForm', data })
}
// 查询常用诊疗药品
export const queryCommonUseDrugLists = (data) => {
  return request.post({ url: '/admin-api/infra/commUse/queryCommonUseDrugLists', data })
}
