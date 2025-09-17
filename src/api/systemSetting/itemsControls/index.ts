import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--检验组合项目对照
 * @returns
 */

// 检验组合项目对照-检验类组合项目查询
export const getPeAssemItemLab = (data) => {
  return request.post({ url: '/health-api/health/assemItem/getPeAssemItemLab', data })
}
// 检验类组合项目保存
export const savePeAssemItemLab = (data) => {
  return request.post({ url: '/health-api/health/assemItem/savePeAssemItemLab', data })
}
// 检验类组合项目删除
export const delPeAssemItemLab = (data) => {
  return request.post({ url: '/health-api/health/assemItem/delPeAssemItemLab', data })
}
// 检验试管查询
export const getPeTestTubeDictList = (
  data = {
    testTubeCode: ''
  }
) => {
  return request.post({ url: '/health-api/health/dict/getPeTestTubeDictList', data })
}
// 检验标本查询
export const getPeSpecimanDictList = (
  data = {
    specimanCode: ''
  }
) => {
  return request.post({ url: '/health-api/health/dict/getPeSpecimanDictList', data })
}
