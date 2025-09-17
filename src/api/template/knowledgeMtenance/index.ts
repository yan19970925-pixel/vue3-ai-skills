import request from '@/config/axios'
import type { listTreeParams, addKnowledgeParams } from './types'

// 查询知识库数据树形结构
export const selectTreeKnowledge = (data: listTreeParams) => {
  return request.post({ url: '/emr-api/emr/knowledge/selectTreeKnowledge', data })
}
// 查询知识库目录
export const selectKnowledgeByDirectory = (data: listTreeParams) => {
  return request.post({ url: '/emr-api/emr/knowledge/selectKnowledgeByDirectory', data })
}
// 添加知识库数据
export const addKnowledge = (data: addKnowledgeParams) => {
  return request.post({ url: '/emr-api/emr/knowledge/addKnowledge', data })
}
// 修改知识库数据
export const updateKnowledge = (data: addKnowledgeParams) => {
  return request.put({ url: '/emr-api/emr/knowledge/updateKnowledge', data })
}
// 删除知识库数据
export const deleteKnowledge = (id: string) => {
  return request.delete({ url: '/emr-api/emr/knowledge/deleteKnowledge/' + id })
}
