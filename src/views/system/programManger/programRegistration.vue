<template>
  <!-- <el-card> -->
  <div class="app-container">
    <el-card>
      <el-row :gutter="10" class="mb-15px">
        <el-col :span="1.5">
          <el-button type="primary" :disabled="state" plain @click="handleAdd"
            >导入注册信息</el-button
          >
          <el-button plain type="danger" @click="delBtn()">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="overflow: auto"
        border
        max-height="calc(-230px + 100vh)"
      >
        <el-table-column prop="productCode" align="center" width="240" label="产品代码" />
        <el-table-column prop="productName" align="center" width="240" label="产品名换" />
        <el-table-column prop="registKey" label="注册码" />
        <el-table-column prop="routePath" label="路由地址" />
      </el-table>
      <pagination
        :total="total"
        v-model:page="queryParams.pageNo"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>
  </div>
  <!-- 对话框 增加 -->
  <Dialog
    append-to-body
    v-model="addDialog"
    title="导入注册信息"
    width="500"
    :before-close="addClose"
  >
    <div>
      <el-upload
        ref="uploadRef"
        accept=".txt"
        :limit="1"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :on-exceed="handleExceed"
        :on-error="excelUploadError"
        :auto-upload="false"
        drag
      >
        <Icon icon="ep:upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip text-center">
            <span>仅允许导入txt格式文件。</span>
          </div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm()">关闭</el-button>
      </div>
    </template>
  </Dialog>
  <!-- </el-card> -->
</template>
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const total = ref()
// import type { UploadProps } from 'element-plus'
import { getAccessToken } from '@/utils/auth'
import * as programApi from '@/api/system/programManger'
import { ElMessage, ElMessageBox } from 'element-plus'
const queryParams = ref({
  pageNo: 1,
  pageSize: 30
})
const addDialog = ref(false)
const uploadRef = ref()
const upload = reactive({
  // // 是否显示弹出层（模板导入）
  // open: false,
  // 弹出层标题（模板导入）
  title: '导入',
  // 是否禁用上传
  isUploading: false,
  // 设置上传的请求头部
  headers: {
    Authorization: 'Bearer ' + getAccessToken()
  },
  // 上传的地址
  url: import.meta.env.VITE_BASE_URL + '/adminM-api/adminM/dictionary/uploadFile'
})
const tableData = ref()
const handleAdd = () => {
  addDialog.value = true
}
const delBtn = () => {
  ElMessageBox.confirm(
    '一旦删除注册信息，在没有导入新注册信息前所有系统将不能使用？确定删除注册信息吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    await programApi.deleteRegInformation()
    getList()
  })
}
const state = ref(false)
const getList = async () => {
  let list = await programApi.getKeyDictList(queryParams.value)
  tableData.value = list.records
  total.value = list.total
  // if (list.records.value.length > 0) {
  //   state.value = true
  // }
  // return false
}
const submitForm = () => {
  // addDialog.value = false
  uploadRef.value?.submit()
}
const resetForm = () => {
  addDialog.value = false
}
const addClose = () => {
  addDialog.value = false
  uploadRef.value?.clearFiles()
}
const closeDialog = () => {
  addDialog.value = false
  uploadRef.value?.clearFiles()
}
const handleFileSuccess = (response: any) => {
  console.log(response)

  if (response.code !== 0) {
    ElMessage.error(response.msg)
    setTimeout(() => {
      uploadRef.value?.clearFiles()
      upload.isUploading = false
    }, 1000)
    return
  }
  upload.isUploading = false
  uploadRef.value?.clearFiles()
  // 拼接提示语
  const data = response.data
  // ElMessage.warning(data)
  closeDialog()
  // 导入url
  fileUploadImport(data)
}
const fileUploadImport = async (data) => {
  let obj = {
    pageNo: 1,
    pageSize: 10,
    url: data
  }
  await programApi.importRegInformation(obj)
  ElMessage.success('导入成功')
  getList()
}
const handleFileUploadProgress = () => {
  upload.isUploading = true
}
// 文件数超出提示
const handleExceed = (): void => {
  ElMessage.error('最多只能上传一个文件！')
}
// 上传错误提示
const excelUploadError = (): void => {
  ElMessage.error('导入数据失败，请您重新上传！')
}
watch(tableData, (newVal) => {
  if (newVal.length > 0) {
    console.log('22222')

    state.value = true
  } else {
    state.value = false
  }
  {
    deep: true // 开启深度监听
  }
})
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  background: #fff;
}
</style>
