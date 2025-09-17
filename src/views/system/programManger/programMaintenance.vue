<template>
  <!-- <el-card> -->
  <div class="app-container">
    <el-card>
      <el-row :gutter="10" class="mb-15px">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
        </el-col>
      </el-row>
      <el-table
        style="overflow: auto"
        max-height="calc(-230px + 100vh)"
        v-loading="loading"
        :data="tableData"
        border
      >
        <el-table-column prop="application" label="程序标识" />
        <el-table-column prop="text" label="程序名称" />
        <el-table-column prop="sortNo" label="排序" width="80" align="center" />
        <el-table-column prop="link" label="跳转路由" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" align="center" width="120">
          <template #default="scope">
            <el-button link type="primary" @click.stop="editBtn(scope.row)"> 修改 </el-button>
            <el-button link type="danger" @click.stop="delBtn(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
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
  <Dialog append-to-body v-model="addDialog" :title="title" width="600" :before-close="addClose">
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="formRules"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="程序标识" prop="application" required>
          <el-input
            v-model="ruleForm.application"
            type="input"
            show-word-limit
            maxlength="16"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="程序名称" prop="text" required>
          <el-input
            v-model="ruleForm.text"
            type="input"
            show-word-limit
            maxlength="20"
            @change="changeText"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="跳转路由" prop="link" required>
          <template #label>
            <Tooltip
              titel="路由地址"
              message="访问的路由地址，如：`/system/userManger/staffMaintenance`。如需外网地址时，则以 `http(s)://` 开头"
            />
          </template>
          <el-input
            type="textarea"
            show-word-limit
            maxlength="40"
            v-model="ruleForm.link"
            @change="changeRemark"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="图标名称" prop="icon" required>
          <el-input type="input" v-model="ruleForm.icon" placeholder="请输入" />
          <p>图标本地路径：fims-ui-manage/src/assets/home/</p>
        </el-form-item>
        <el-form-item label="排序" prop="sortNo">
          <el-input-number
            type="textarea"
            v-model="ruleForm.sortNo"
            :max="99"
            :min="1"
            step="1"
            step-strictly
            controls-position="right"
            :controls="false"
          />
        </el-form-item>
        <el-form-item label="是否添加标签页" prop="showTag">
          <el-radio-group v-model="ruleForm.showTag">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="description" required>
          <el-input
            type="textarea"
            show-word-limit
            maxlength="80"
            v-model="ruleForm.description"
            placeholder="请输入"
          />
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
  <!-- </el-card> -->
</template>
<script setup lang="ts">
import { ref } from 'vue'
import * as programApi from '@/api/system/programManger'

const loading = ref(false)
const total = ref()
const queryParams = ref({
  pageNo: 1,
  pageSize: 30
})
const addDialog = ref(false)
const ruleForm = ref({
  application: '',
  description: '',
  text: '',
  link: '',
  remark: '',
  showTag: '',
  icon: '',
  oldApplication: '',
  sortNo: null
})
const formRules = reactive({
  application: [{ required: true, message: '程序标识不能为空', trigger: 'blur' }],
  text: [{ required: true, message: '程序名称不能为空', trigger: 'blur' }],
  link: [{ required: true, message: '跳转路由不能为空', trigger: 'blur' }],
  icon: [{ required: true, message: '图标名称不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
})
const title = ref('新增')
const tableData = ref([
  {
    inputName: '11'
  }
])
const handleAdd = () => {
  title.value = '新增'
  ruleForm.value.showTag = '2'
  addDialog.value = true
}
const delBtn = (row) => {
  ElMessageBox.confirm('确定删除该数据？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await programApi.deleteApplicationDo({ oldApplication: row.oldApplication })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getList()
  })
}
const getList = async () => {
  let list = await programApi.getFimsDictionaryList(queryParams.value)
  tableData.value = list.records
  tableData.value.forEach((item: any) => {
    if (item.remark) {
      let res = JSON.parse(item.remark)
      item.text = res && res.text ? res.text : ''
      item.link = res && res.link ? res.link : ''
      item.icon = res && res.icon ? res.icon : ''
      item.showTag = res.showTag ? '1' : '2'
    }
  })
  console.log(tableData.value)
  total.value = list.total
}
const submitForm = async () => {
  changeRemark()
  if (title.value == '新增') {
    await programApi.insertApplicationDo(ruleForm.value)
    addDialog.value = false
    ElMessage({
      message: '新增成功',
      type: 'success'
    })
    getList()
    closeFrom()
  } else {
    await programApi.updateApplicationDo(ruleForm.value)
    addDialog.value = false
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    closeFrom()
    getList()
  }
  addDialog.value = false
}
const resetForm = () => {
  addDialog.value = false
  closeFrom()
}
const addClose = () => {
  addDialog.value = false
}
const editBtn = (rows) => {
  console.log(rows)
  title.value = '修改'
  addDialog.value = true
  ruleForm.value.application = rows.application
  ruleForm.value.description = rows.description
  ruleForm.value.oldApplication = rows.oldApplication
  ruleForm.value.remark = rows.remark
  ruleForm.value.text = rows.text
  ruleForm.value.link = rows.link
  ruleForm.value.showTag = rows.showTag
  ruleForm.value.icon = rows.icon
  ruleForm.value.sortNo = rows.sortNo
}
const closeFrom = () => {
  ruleForm.value.application = ''
  ruleForm.value.description = ''
  ruleForm.value.oldApplication = ''
  ruleForm.value.remark = ''
  ruleForm.value.text = ''
  ruleForm.value.link = ''
  ruleForm.value.showTag = ''
  ruleForm.value.icon = ''
}
const changeText = () => {
  if (!ruleForm.value.description && ruleForm.value.text) {
    ruleForm.value.description = ruleForm.value.text
  }
  changeRemark()
}
const changeRemark = () => {
  let res = {
    text: ruleForm.value.text,
    link: ruleForm.value.link,
    icon: ruleForm.value.icon,
    showTag: ruleForm.value.showTag == '1' ? true : ruleForm.value.showTag == '2' ? false : false
  }
  ruleForm.value.remark = JSON.stringify(res)
}
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
