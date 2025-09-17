import request from '@/config/axios'

/**
 *
 * @param data 系统设置--特定病种
 * @returns
 */

// 特定病种-特定病种查询
export const getPePositiveList = (data) => {
  return request.post({ url: '/health-api/health/positive/getPePositiveList', data })
}

// 特定病种-特定病种保存
export const savePePositive = (data) => {
  return request.post({ url: '/health-api/health/positive/savePePositive', data })
}

// 特定病种-特定病种删除
export const delPePositive = (data) => {
  return request.post({ url: '/health-api/health/positive/delPePositive', data })
}
