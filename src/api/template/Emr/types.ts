export interface addMiddleInfoParams {}
export interface addEmrCategoryParams {
  id: string
  valid: number
  isPreset?: string
  labels?: any
  sortNumber?: number
  type?: string
  name?: string
  parent?: any
  code?: string
  description?: any
  groupTeam?: string
  data?: string
  margins?: string
  version?: string
  watermark?: string
  width?: string
  height?: string
  parentCategory?: string
  categoryRole?: string
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
  paperDirection?: string
}
export interface updateEmrCategoryParams {
  id: string
  category?: string
  valid: number
  data?: string
  margins?: string
  version?: string
  watermark?: string
  width?: string
  height?: string
  parent?: string
  categoryRole?: string
  paperDirection?: string
}
export interface insertEmrDictionaryParams {
  _id: string
  valid: number
  multiple: string
  items?: any
  code?: any
  name: string
  parent: string
  sortNumber: number
  type: string
  description?: any
}
export interface updateDictionaryTitleParams {
  children?: any
  code?: string
  description?: string
  items?: any
  name?: string
  parent?: string
  sortNumber?: number
  type?: string
  valid?: string
  _id?: string
}
export interface addMiddleInfoParams {
  id: string
  patientId: string
  visitId: string
  documentId?: string
  categoryId: string
  docName: string
  docSortTime: string
  delFlag: string
  emrDocData?: string
  docProperties: string
}
export interface listTreeParams {
  patientId?: any
  visitId?: any
  categoryArea?: any // 院区
  hospitalId?: string // 医院id
  categoryOwnerId?: string // 所属id
}

export interface addTemplateParams {
  tplType?: number
  tplId: string
  tplName: string
  parentId: string
  document: string
  layout: string
  styles: string
  properties: string
  categoryid: string
  parentCategory: string
  code: string
  data: string
  tplDrName: string
  tplDrId: string
  tplDrNo?: string
  tplDeptName: string
}

export interface insertEmrElementParams {
  _id?: string
  valid?: number
  labels?: string
  components?: string
  type?: string
  parent?: string
  name?: string
  sortNumber?: number
  code?: string
  definition?: string
  format?: string
  controlId?: string
  children?: any
}

export interface updateEmrElementParams {
  _id: string
  valid?: number
  labels?: string
  components?: string
  type?: string
  parent: string
  name: string
  sortNumber: number
  code?: string
  definition?: string
  format?: string
  controlId?: string
  children?: any
}

// 模版导出
export interface categoryExportParams {}
