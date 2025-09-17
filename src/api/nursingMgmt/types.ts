// 模板组
export interface addTempGroupParams {
  typeName: string
  typeId: any
  typeSort?: any
  parentId?: any
}

export interface editTempGroupParams {
  typeId: any
  typeSort?: any
}

export interface QueryNursingTemplateTypeListParams {
  typePid?: string
  typeName?: string
}
export interface SaveNursingTemplateTypeParams {
  operFlag: string;
  typeId: number;
  typePid: number;
  typeName: string;
  typeSort: string;
  intro?: string;
  path?: string;
  imgName?: string;
}

// 模板
export interface addTempParams {
  templateId: any
  templateName: string
  templateTypeId: any
  templateTypeName: string
  eventCategory: string
  templateIcon: string
  createBy?: string
  createTime?: any
  updateBy?: string
  updateTime?: any
  templateSort?: any
  data?: any
  iconActive?: string
  path?: string
}

export interface eventAnalysis {
  reportId: string
  analysisData: any
}

export interface QueryNursingTemplateListParams {
  typeId?: number
  typeName?: string
  templateName?: string
}
export interface SaveNursingTemplateParams {
  templateSort: string;
  templateId?: string;
  templateDocumentId?: string;
  templateTypeId: number;
  templateName: string;
  templateIcon?: string;
  id?: string;
  data?: string;
  iconActive?: string;
  path?: string;
  component?: string;
}
