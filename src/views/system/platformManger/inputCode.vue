<template>
  <!-- <div class="box"> -->
  <div class="app-container">
    <el-card>
      <el-row :gutter="10" class="mb-15px">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
        </el-col>
      </el-row>
      <el-table
        style="overflow: auto"
        max-height="calc(-200px + 100vh)"
        v-loading="loading"
        :data="tableData"
      >
        <el-table-column prop="inputName" align="center" label="输入码类别" />
        <el-table-column prop="inputCode" align="center" label="类别代码" />
        <el-table-column fixed="right" align="center" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="editBtn(scope.row)">
              修改
            </el-button>
            <el-button link type="danger" size="small" @click="delBtn(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <!-- 对话框 增加 -->
  <Dialog append-to-body v-model="addDialog" :title="title" width="500" :before-close="addClose">
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="输入码类别" prop="date">
          <el-input v-model="ruleForm.inputName" maxlength="10" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类别代码" prop="name">
          <el-input v-model="ruleForm.inputCode" maxlength="2" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="resetForm()">关闭</el-button>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
import * as platApi from '@/api/system/platformManger'
const tableData = ref()
const ruleForm = reactive({
  inputName: '',
  inputCode: ''
})
const newForm = reactive({
  inputNameNew: '',
  inputCodeNew: ''
})
const title = ref('新增')
const addDialog = ref(false)
const ruleFormRef = ref<FormInstance>()
const loading = ref(true) // 列表的加载中
const close = () => {
  ruleForm.inputName = ''
  ruleForm.inputCode = ''
  addDialog.value = false
}
const addClose = () => {
  close()
}
const delBtn = (row) => {
  let obj = {
    inputName: row.inputName,
    inputCode: row.inputCode
  }
  ElMessageBox.confirm('确认删除数据?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await platApi.deleteInputType(obj)
      ElMessage.success('删除成功')
      getList()
    } catch (error) {
      // console.error(error)
    }
  })
}
const resetForm = () => {
  addDialog.value = false
  close()
}
const submitForm = async () => {
  if (title.value == '新增') {
    await platApi.saveInputType(ruleForm)
    ElMessage.success('保存成功')
  } else {
    let obj = {
      inputNameNew: ruleForm.inputName,
      inputCodeNew: ruleForm.inputCode,
      inputName: newForm.inputNameNew,
      inputCode: newForm.inputCodeNew
    }
    await platApi.updateInputType(obj)
    ElMessage.success('修改成功')
  }
  addDialog.value = false
  close()
  getList()
}
const getList = async () => {
  loading.value = true
  try {
    tableData.value = await platApi.getplatList()
  } finally {
    loading.value = false
  }
}
const handleAdd = async () => {
  addDialog.value = true
  title.value = '新增'
}
const editBtn = (row) => {
  ruleForm.inputName = row.inputName
  ruleForm.inputCode = row.inputCode
  newForm.inputNameNew = row.inputName
  newForm.inputCodeNew = row.inputCode
  title.value = '修改'
  addDialog.value = true
}
/** 初始化 **/
onMounted(() => {
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
