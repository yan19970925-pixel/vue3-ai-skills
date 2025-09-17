<template>
  <div>
    <el-row :gutter="10" class="mb-15px">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table border style="overflow: auto" max-height="calc(-260px + 100vh)" :data="tableData">
      <el-table-column align="center" prop="appName" label="应用名" width="200" />
      <el-table-column prop="parameterName" label="参数名" />
      <el-table-column align="center" prop="parainitValue" label="参数初始值" width="200" />
      <el-table-column prop="parameterScope" label="取值范围" />
      <el-table-column prop="explanation" label="说明" />
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template #default="scope">
          <el-button @click="detailBtn(scope.row)" link type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 对话框 -->
    <Dialog v-model="dialogVisible" :title="title" width="800" :before-close="handleClose">
      <div>
        <el-form :model="form" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="应用名">
                <el-input placeholder="请输入" v-model="form.appName" /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="参数编号">
                <el-input
                  placeholder="请输入"
                  :disabled="state"
                  v-model="form.parameterNo"
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="参数名称">
                <el-input placeholder="请输入" v-model="form.parameterName" /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="参数初始值">
                <el-input placeholder="请输入" v-model="form.parainitValue" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="取值范围">
                <el-input placeholder="请输入" v-model="form.parameterScope" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="说明">
                <el-input
                  :rows="2"
                  placeholder="请输入"
                  type="textarea"
                  v-model="form.explanation"
                /> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeBtn">关闭</el-button>
          <el-button type="primary" @click="addBtn"> 确定 </el-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
// import { reactive, ref } from 'vue'
import * as platApi from '@/api/system/platformManger'
// import type { FormInstance } from 'element-plus'
// const ruleFormRef = ref<FormInstance>()
const total = ref(100)
const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
// const formInline = reactive({
//   user: '',
//   department: '平台级'
// })
const queryParams = ref({
  pageNo: 1,
  pageSize: 40
})
const state = ref(false)
const tableData = ref()
const title = ref('新增')
const form = ref({
  appName: '',
  parameterNo: '',
  parameterName: '',
  parainitValue: '',
  parameterScope: '',
  isUpdate: '1',
  explanation: ''
})
const colse = () => {
  form.value.appName = ''
  form.value.parameterNo = ''
  form.value.parameterName = ''
  form.value.parainitValue = ''
  form.value.parameterScope = ''
  form.value.explanation = ''
}
const detailBtn = (row) => {
  dialogVisible.value = true
  state.value = true
  title.value = '编辑'
  form.value = row
  form.value.isUpdate = '2'
}
const getList = async () => {
  let datavalue = await platApi.getAppConfigerBaseinfo(queryParams.value)
  console.log(datavalue)
  tableData.value = datavalue.records
  total.value = datavalue.total
}

// const check = () => {}
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
const handleAdd = () => {
  state.value = false
  dialogVisible.value = true
  title.value = '新增'
  colse()
  form.value.isUpdate = '1'
  form.value.pk = {}
}
const addBtn = async () => {
  await platApi.addAppConfigerBaseinfo(form.value)
  dialogVisible.value = false
  ElMessage.success('保存成功！')
  getList()
  // colse()
}
const closeBtn = () => {
  dialogVisible.value = false
  // colse()
}
onMounted(async () => {
  getList()
})
</script>
<style scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  background: #fff;
}
</style>
