import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--检验试管设置
 * @returns
 */

// 检验试管查询
export const getPeTestTubeDictList = (data) => {
  return request.post({ url: '/health-api/health/dict/getPeTestTubeDictList', data })
}

// 检验试管保存
export const savePeTestTubeDict = (data) => {
  return request.post({ url: '/health-api/health/dict/savePeTestTubeDict', data })
}

// 检验试管删除
export const delPeTestTubeDict = (data) => {
  return request.post({ url: '/health-api/health/dict/delPeTestTubeDict', data })
}
