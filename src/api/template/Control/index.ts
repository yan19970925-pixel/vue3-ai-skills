import request from '@/config/axios'
import type { timeRuleParams, DictByConfigParams } from './types'

// 查询规则时控列表
export const timeRuleList = (params: timeRuleParams) => {
  return request.get({ url: '/emr-api/emr/timeRule/list', params })
}

// 获取时控规则详情
export const timeRuleDetail = (id: string) => {
  return request.get({ url: '/emr-api/emr/timeRule/' + id })
}

// 添加时控规则
export const addTimeRule = (data: timeRuleParams) => {
  return request.post({ url: '/emr-api/emr/timeRule', data })
}

// 修改时控规则
export const editTimeRule = (data: timeRuleParams) => {
  return request.put({ url: '/emr-api/emr/timeRule', data })
}

// 获取时控规则详情
export const delTimeRule = (id: string) => {
  return request.delete({ url: '/emr-api/emr/timeRule/' + id })
}

// 查询字典
export const queryDictByConfig = (data: DictByConfigParams) => {
  return request.post({
    url: '/admin-api/infra/inputSetting/queryDictByConfig',
    data
  })
}

// 合理性规则
// 查询合理性规则列表
export const rationalList = (params: timeRuleParams) => {
  return request.get({ url: '/emr-api/emr/rational/list', params })
}

// 获取时控规则详情
export const rationalDetail = (id: string) => {
  return request.get({ url: '/emr-api/emr/rational/' + id })
}

// 添加时控规则
export const addRational = (data: rationalParams) => {
  return request.post({ url: '/emr-api/emr/rational', data })
}

// 修改时控规则
export const editRational = (data: rationalParams) => {
  return request.put({ url: '/emr-api/emr/rational', data })
}

// 获取时控规则详情
export const delRational = (id: string) => {
  return request.delete({ url: '/emr-api/emr/rational/' + id })
}

//未提交病案室解锁记录
export const medApplyList = (params) => {
  return request.get({ url: '/emr-api/emr/medApply/list', params })
}
export const medApply = (params) => {
  return request.post({ url: '/emr-api/emr/medApply', params })
}
export const medApplyPut = (params) => {
  return request.put({ url: '/emr-api/emr/medApply', params })
}
