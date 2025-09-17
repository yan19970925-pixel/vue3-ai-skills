import request from '@/config/axios'
import { getRefreshToken } from '@/utils/auth'
import type { UserLoginVO } from './types'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface CodeImgResult {
  captchaOnOff: boolean
  img: string
  uuid: string
}
export interface SmsCodeVO {
  mobile: string
  scene: number
}
export interface SmsLoginVO {
  mobile: string
  code: string
}

export const loginTest = () => {
  return request.get({ url: ADMIN_API_URL + `/api/user/test` })
}

// 登录
export const loginApi = (data: UserLoginVO) => {
  return request.post({ url: ADMIN_API_URL + '/system/auth/login', data })
}

// CA登录
export const loginWithCA = (data) => {
  return request.post({ url: ADMIN_API_URL + '/system/auth/loginWithCA', data })
}

// 刷新访问令牌
export const refreshToken = () => {
  return request.post({
    url: ADMIN_API_URL + '/system/auth/refresh-token?refreshToken=' + getRefreshToken()
  })
}

// 登出
export const loginOutApi = () => {
  return request.post({ url: ADMIN_API_URL + '/system/auth/logout' })
}

// 获取用户权限信息
export const getInfoApi = () => {
  return request.get({ url: ADMIN_API_URL + '/system/auth/get-permission-info' })
}

// 路由
export const getAsyncRoutesApi = () => {
  return request.get({ url: ADMIN_API_URL + '/system/auth/list-menus' })
}
// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
// 获取CA登录二维码
export const getQrcode = () => {
  return request.post({ url: '/admin-api/system/mkey/qrcode' })
}
// 获取CA登录扫码信息
export const getQrcodeLogin = () => {
  return request.post({ url: '/admin-api/system/mkey/qrcodeLogin' })
}
// 用户名口令登录
export const simpleAuth = (data) => {
  return request.post({ url: '/inpN-api/inpN/auth/simpleAuth', data })
}
// 查询消息数量
export const queryMessageCount = (data) => {
  return request.post({ url: '/admin-api/system/message/queryMessageCount', data })
}
// 查询选择护理单元字典
export const queryChooseWardDict = (data) => {
  return request.post({ url: '/admin-api/infra/unitDict/queryChooseWardDict', data })
}
// 查询院区信息
export const getHospitalConfigInfos = (data) => {
  return request.post({ url: '/admin-api/infra/hospitalList/getHospitalConfigInfos', data })
}
//切换院区
export const switchHospital = (data) => {
  return request.post({ url: '/admin-api/infra/hospitalList/switchHospital', data })
}
//获取患者所有的住院信息
export const infoList = (data) => {
  return request.post({ url: '/admin-api/infra/info/list', data })
}
//使用UKey登录
export const loginWithUKey = (data) => {
  return request.post({ url: '/admin-api/system/auth/loginWithUKey', data })
}
//使用UKey登录,保存签名图片
export const saveSignWithUKey = (data) => {
  return request.post({ url: '/admin-api/system/auth/saveSignWithUKey', data })
}
//根据工号查询签名值
export const querySignValueById = (data) => {
  return request.post({ url: '/admin-api/system/auth/querySignValueById', data })
}
//获取参数值-- 是否进行Ca校验
export const queryParameterValue = (params) => {
  return request.get({ url: '/admin-api/infra/config/queryParameterValue', params })
}
export const getDictByConfig = (data) => {
  return request.post({ url: '/admin-api/infra/inputSetting/queryDictByConfig', data })
}
//工作台校验模块权限
export const checkRegistCode = (data) => {
  return request.post({ url: '/admin-api/infra/common/checkRegistCode', data })
}
// 获取系统时间
export const getSystemDateTime = () => {
  return request.get({ url: '/admin-api/infra/config/getSystemDateTime' })
}
// 查询消耗品申请单
export const queryExpProvideApplication = (data) => {
  return request.post({
    url: '/admin-api/infra/exp/queryExpProvideApplication',
    data
  })
}
// 保存消耗品发放申请
export const saveExpProvideApplication = (data) => {
  return request.post({
    url: '/admin-api/infra/exp/saveExpProvideApplication',
    data
  })
}
// 消耗品发放库房
export const queryExpCurrdept = (data) => {
  return request.post({
    url: '/admin-api/infra/unitDict/queryCurrDept',
    data
  })
}
