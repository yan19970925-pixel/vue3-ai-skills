<template>
  <div>
    <el-form :inline="true" ref="ruleFormRef" :model="formInline" class="demo-form-inline">
      <el-form-item label="	查询级别" prop="level">
        <el-select v-model="formInline.level" placeholder="请选择">
          <el-option label="平台级" value="1" />
          <el-option label="模块级" value="2" />
          <el-option label="部门级" value="3" />
          <el-option label="位置" value="4" />
          <el-option label="个人级" value="5" />
          <el-option label="全部" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="formInline.level == '2'" label="模块" prop="appName">
        <el-select
          v-model="formInline.appName"
          placeholder="请选择"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in modeList"
            :key="item.application"
            :label="item.description"
            :value="item.application"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="formInline.level == '3'" label="部门" prop="deptCode">
        <el-select
          v-model="formInline.deptCode"
          placeholder="请选择"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in deptList"
            :key="item.deptCode"
            :label="item.deptName"
            :value="item.deptCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="	搜索条件" prop="searchCriteria" clearable>
        <el-select v-model="formInline.searchCriteria" placeholder="请选择">
          <el-option label="应用模块" value="1" />
          <el-option label="配置名" value="2" />
          <el-option label="参数名" value="3" />
          <el-option label="参数说明" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="	搜索值" prop="searchParam" clearable>
        <el-input v-model="formInline.searchParam" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">查询</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" class="!ml-60px" plain icon="Plus" @click="handleAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="overflow: auto" max-height="calc(-260px + 100vh)">
      <el-table-column align="center" prop="appName" label="应用模块" width="150" />
      <el-table-column align="center" prop="empNo" label="配置名" width="150" />
      <el-table-column align="center" prop="deptCode" label="科室" width="150" />
      <el-table-column align="center" prop="position" label="位置" width="150" />
      <el-table-column align="center" prop="creater" label="操作员" width="150" />
      <el-table-column align="center" prop="parameterValue" label="值" width="300" />
      <el-table-column prop="description" label="参数说明" />
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template #default="scope">
          <el-button @click="detailBtn(scope.row)" link type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      v-model:page="formInline.pageNo"
      v-model:limit="formInline.pageSize"
      @pagination="getList"
    />
    <!-- 对话框 -->
    <Dialog v-model="dialogVisible" :title="title" width="800" :before-close="handleClose">
      <div>
        <el-form :model="form" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="应用模块">
                <el-select v-model="form.appName" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in modeList"
                    :key="item.application"
                    :label="item.description"
                    :value="item.application"
                  />
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="配置名">
                <el-input placeholder="请输入" v-model="form.parameterName" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="科室">
                <el-select
                  v-model="form.deptCode"
                  placeholder="请选择科室"
                  style="width: 100%"
                  filterable
                  remote
                  :remote-method="filterDept"
                >
                  <el-option
                    v-for="(item, index) in DeptList"
                    :key="index"
                    :label="item.deptName"
                    :value="item.deptCode"
                  >
                    <span style="display: inline-block; width: 100px">{{ item.deptCode }}</span>
                    <span style="display: inline-block; width: 160px">{{ item.deptName }}</span>
                  </el-option>
                </el-select>
                <!-- <el-input placeholder="请输入" v-model="form.deptCode" />  -->
              </el-form-item></el-col
            >
            <el-col :span="12">
              <el-form-item label="位置">
                <el-input placeholder="请输入" v-model="form.position" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="操作员">
                <el-input placeholder="请输入" v-model="form.empNo" /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="值">
                <el-input placeholder="请输入" v-model="form.parameterValue" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-date-picker
                  style="width: 100%"
                  format="YYYY-MM-DD"
                  v-model="form.createDate"
                  type="date"
                  placeholder="请选择"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="创建者">
                <el-input placeholder="请输入" v-model="form.creater" /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="参数说明">
                <el-input
                  :rows="2"
                  placeholder="请输入"
                  type="textarea"
                  v-model="form.description"
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
import type { FormInstance } from 'element-plus'
import * as platApi from '@/api/system/platformManger'
import { getDictByConfig } from '@/api/system/publicDictionary/index'
import { useUserStore } from '@/store/modules/user'
import { formatDate } from '@/utils/formatTime'
const userStore = useUserStore()
const userInfo = userStore.getUser || {}
const ruleFormRef = ref<FormInstance>()
const total = ref(100)
const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
const formInline = ref({
  level: '0',
  searchCriteria: '',
  searchParam: '',
  appName: '',
  deptCode: '',
  pageSize: 40,
  pageNo: 1
})
// const queryParams = reactive({
//   current: 1,
//   size: 10
// })
const state = ref(false)
const tableData = ref()
const modeList = ref()
const deptList = ref()
const title = ref('新增')
const form = ref({
  appName: '',
  parameterName: '',
  deptCode: '',
  position: '',
  isUpdate: '1',
  creater: userInfo.nickname,
  empNo: '',
  parameterValue: '',
  createDate: formatDate(new Date(), 'YYYY-MM-DD'),
  description: '',
  pk: {}
})
const colse = () => {
  form.value.appName = ''
  form.value.parameterName = ''
  form.value.deptCode = ''
  form.value.position = ''
  form.value.parameterValue = ''
  form.value.createDate = ''
  form.value.description = ''
  form.value.isUpdate = '1'
  form.value.creater = ''
  form.value.empNo = ''
}
const detailBtn = (row) => {
  form.value = row
  form.value.isUpdate = '2'
  delete form.value.pageNo
  delete form.value.pageSize
  dialogVisible.value = true
  state.value = true
  title.value = '编辑'
}
const getList = async () => {
  let dataValue = await platApi.getAppConfigerParameterByLevel(formInline.value)
  tableData.value = dataValue.records
  total.value = dataValue.total
}
const check = () => {
  getList()
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  getList()
}
const handleAdd = () => {
  state.value = false
  colse()
  form.value.isUpdate = '1'
  form.value.creater = userInfo.nickname
  form.value.createDate = formatDate(new Date(), 'YYYY-MM-DD')
  dialogVisible.value = true
}
const addBtn = async () => {
  await platApi.addAppConfigerParameter(form.value)
  dialogVisible.value = false
  ElMessage.success('保存成功！')
  // colse()
  getList()
}
const closeBtn = () => {
  dialogVisible.value = false
  // colse()
}
const DeptList = ref<any>([])
onMounted(async () => {
  modeList.value = await platApi.getApplications()
  modeList.value.unshift({
    application: '*',
    description: '*'
  })
  deptList.value = await platApi.getDeptListAll()
  getList()
  DeptList.value = await getDictByConfig({
    dictType: '科室',
    counts: 50
  })
  DeptList.value.unshift({
    deptCode: '*',
    deptName: '全部科室'
  })
})
const filterDept = async (v) => {
  DeptList.value = await getDictByConfig({
    dictType: '科室',
    keyWord: v,
    counts: 50
  })
  DeptList.value.unshift({
    deptCode: '*',
    deptName: '全部科室'
  })
}
</script>
<style scoped></style>
