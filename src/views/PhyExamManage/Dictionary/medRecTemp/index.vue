<template>
  <div class="main">
    <div class="base-box">
      <!-- <div class="base-title">病例列表</div> -->
      <div class="form">
        <!-- 按钮行 -->
        <!-- <div class="btn mt-12px">
        <el-button class="resetBtn" @click="handleNewDocument">提取</el-button>
        <el-button class="resetBtn" @click="handleSaveDocument">统计</el-button>
        <el-button class="resetBtn" @click="handleSaveDocument">保存</el-button>
        <el-button class="resetBtn" @click="handleSaveDocument">另存</el-button>
        <el-button class="resetBtn" @click="handlePrint">打印</el-button>
        <el-button class="resetBtn" @click="handleExport">导出</el-button>
        <el-button class="resetBtn" @click="handlePrint">月结处理入出操作</el-button>
      </div> -->
        <!-- 第一行 -->
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">疾病代码:</span>
            <el-input v-model="diseaseCode" placeholder="请输入" style="width: 180px" />
            <span class="label-fixed-width">疾病名称:</span>
            <el-input v-model="diseaseName" placeholder="请输入" style="width: 180px" />
          </div>

          <el-button type="primary" @click="getPeDisease">查询</el-button>
          <el-button class="resetBtn" @click="handleAddClick">新增</el-button>
          <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button>
          <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px table-container" style="padding: 10px; background-color: #fff; height: 100%">
      <el-table
        ref="adviceTableRef"
        :data="tableList"
        border
        :row-class-name="setAdviceRowClass"
        style="width: 100%; height: calc(100vh - 240px)"
        highlight-current-row
        stripe
        @row-click="handleRowClick"
      >
        <el-table-column
          v-for="item in addColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        style="margin-top: 15px; text-align: center"
      />
    </div>
    <Dialog v-model="dialogVisible" width="600px" :fullscreen="false">
      <template #title>
        <div v-if="optionFlag === '1'" class="dialog-title">新增</div>
        <div v-else class="dialog-title">编辑</div>
      </template>
      <div class="mb-8px">
        <el-form :model="rowdetail" label-width="120px" size="small">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="疾病代码">
                <el-input v-model="rowdetail.diseaseCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="疾病名称">
                <el-input v-model="rowdetail.diseaseName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对应科室">
                <!-- <el-select v-model="rowdetail.peDeptCode" placeholder="请选择科室">
                  <el-option
                    v-for="item in $store.state.deptList"
                    :key="item.deptCode"
                    :label="item.deptName"
                    :value="item.deptCode"
                  />
                </el-select> -->
                <el-input
                  type="text"
                  v-model.trim="rowdetail.peDeptCode"
                  placeholder="请输入"
                  clearable
                  :maxlength="50"
                >
                  <template #append>
                    <el-button :icon="Search" @click="onMailingAddressAreaAddress(rowdetail)" />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="输入码">
                <el-input v-model="rowdetail.inputCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="疾病解释">
                <el-input v-model="rowdetail.explanation" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="flex justify-end">
        <div class="base-cont mt-4px">
          <el-button v-if="optionFlag === '1'" class="resetBtn" @click="dialogVisible = false">
            取消
          </el-button>
          <el-button v-else class="resetBtn" @click="handleDel"> 删除 </el-button>
          <el-button type="primary" @click="savePeDisease()">保存</el-button>
        </div>
      </div>
    </Dialog>
    <Dialog v-model="deptDialogVisible" width="600px">
      <template #title>
        <div class="dialog-title">选择科室</div>
      </template>
      <div style="max-height: 400px; overflow-y: auto">
        <el-table :data="peDeptList" @row-click="handleDeptSelect">
          <el-table-column prop="peDeptCode" label="科室代码" align="center"></el-table-column>
          <el-table-column prop="peDeptName" label="科室名称" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="flex justify-end mt-4">
        <el-button @click="deptDialogVisible = false">关闭</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import * as Api from '@/api/Dictionary/medRecTemp/index'
import DictDialog from '@/views/components/DictDialog/Index.vue'

// ===================== 响应式数据 =====================
const tableList = ref([])
const peDeptList = ref([])
const total = ref(0)
const pageSize = ref(29)
const currentPage = ref(1)
const diseaseCode = ref()
const diseaseName = ref()
const dialogVisible = ref(false)
const rowdetail = ref({
  diseaseCode: '',
  diseaseName: '',
  peDeptCode: '',
  inputCode: '',
  explanation: '',
  optionFlag: '' // 用于区分新增或编辑状态 1-新增 2-编辑
})
const optionFlag = ref('')
const addColumns = [
  { prop: 'diseaseCode', label: '疾病代码', align: 'center' },
  { prop: 'diseaseName', label: '疾病名称', align: 'center' },
  { prop: 'peDeptCode', label: '对应科室', align: 'center' },
  { prop: 'inputCode', label: '输入码', align: 'center', width: '200px' },
  { prop: 'explanation', label: '疾病解释', align: 'center', width: '600px' }
]
// 保存单据
const handleSaveDocument = () => {
  console.log('保存单据')
  // 实际业务逻辑：保存当前表单数据
}

const setAdviceRowClass = () => {
  return 'advice-row'
}
const page = ref()
const handlePageChange = (newPage) => {
  page.value = newPage
  getPeDisease()
}
const getPeDisease = async () => {
  const response = await Api.getPeDisease({
    pageNo: page.value,
    pageSize: pageSize.value,
    diseaseCode: diseaseCode.value,
    diseaseName: diseaseName.value
  })
  if (response.records && response.records.length > 0) {
    tableList.value = response.records
    total.value = response.total
    currentPage.value = page
  } else {
    tableList.value = []
    total.value = 0
  }
}

//点击新增
const handleAddClick = () => {
  dialogVisible.value = true
  optionFlag.value = '1' // 设置为新增状态
  rowdetail.value = {
    diseaseCode: '',
    diseaseName: '',
    peDeptCode: '',
    inputCode: '',
    explanation: '',
    optionFlag: optionFlag.value
  }
}
// 保存体检项目组合
const savePeDisease = async () => {
  try {
    const res = await Api.savePeDisease({ list: [rowdetail.value] })
    if (res) {
      // 刷新列表
      getPeDisease()
      // 清空表单
      rowdetail.value = {
        diseaseCode: '',
        diseaseName: '',
        peDeptCode: '',
        inputCode: '',
        explanation: ''
      }
      // 关闭弹窗
      dialogVisible.value = false
      if (optionFlag.value === '1') {
        ElMessage.success('新增成功')
      } else {
        ElMessage.success('保存成功')
      }
    }
  } catch (error) {
    console.log('%c Line: 168 ⚠️ error', 'color:#ea7e5c', error)
  }
}
// 点击删除
const handleDel = async () => {
  try {
    const response = await Api.delPeDisease({
      pageNo: page.value,
      pageSize: pageSize.value,
      diseaseCode: rowdetail.value.diseaseCode,
      diseaseName: rowdetail.value.diseaseName
    })
    if (response) {
      ElMessage.success('删除成功')
      dialogVisible.value = false // 关闭弹窗
      getPeDisease() // 刷新列表
    }
  } catch (error) {
    console.error('删除特定病种时发生错误:', error)
  }
}
// 点击表格
const handleRowClick = (row) => {
  optionFlag.value = '2' // 设置为编辑状态
  if (row) {
    rowdetail.value = row
  }
  dialogVisible.value = true
  optionFlag.value = '2'
}
// 获取科室列表
const getDeptList = async () => {
  await Api.getDeptList()
    .then((res) => {
      peDeptList.value = res
    })
    .catch((error) => {
      console.error('获取科室列表时发生错误:', error)
    })
}
onMounted(() => {
  getPeDisease()
  getDeptList()
})

const onMailingAddressAreaAddress = (row) => {
  rowdetail.value = row
  deptDialogVisible.value = true // 打开科室弹窗
}

// 科室弹窗可见性
const deptDialogVisible = ref(false)
// 当前选中的科室行数据
const selectedDeptRow = ref(null)

const handleDeptSelect = (row) => {
  if (row) {
    rowdetail.value.peDeptCode = row.peDeptName
    deptDialogVisible.value = false
  }
}
</script>

<style scoped lang="scss">
.main {
  background-color: #edf1fc;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
}

.btn {
  margin-left: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
}
.resetBtn {
  border: 1px solid #3473d1 !important;
  color: #3473d1 !important;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
.resetBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
}
.label-fixed-width {
  width: 65px;
  text-align: right;
  margin-right: 4px;
  font-weight: 400;
}
.advice-row {
  cursor: pointer;
}
.advice-list-table {
  .el-table__header-wrapper {
    th {
      background-color: #f5f7fa !important;
    }
  }
}

.form {
  background-color: #fff;
  padding: 8px 8px 20px 8px;
  // border-radius: 4px;
  // border: 1px solid #e4e7ed;
}

.table {
  // margin: 10px auto;
  // background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  width: 100%;
  overflow: auto;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.table-container {
  width: 100%;
  white-space: nowrap; // 防止表格内容换行
  height: calc(100vh - 330px); // 减去其他元素的高度
  overflow: auto;
}
.base-box {
  background-color: #fff;
  margin-bottom: 10px;
  .base-title {
    padding: 0 20px;
    color: #3473d1;
    font-size: 16px;
    height: 46px;
    line-height: 46px;
    position: relative;
    font-weight: 700;
    border-bottom: 1px solid #c5dcff;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100px;
      height: 2px;
      background-color: #3473d1;
    }

    &.dif {
      &::before {
        width: 170px;
      }
    }
  }
}

:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow-y: auto !important;
}
// 在style部分添加
.dept-dialog .el-dialog__body {
  padding: 20px;
}
:deep(.el-form-item__label) {
  font-size: 14px !important;
}
</style>
