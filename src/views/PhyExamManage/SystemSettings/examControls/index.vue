<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="content">
        <!-- 操作按钮 -->
        <div class="base-cont mt-4px">
          <!-- <el-button class="resetBtn" @click="handleAdd">
            <el-icon><Plus /></el-icon>新增
          </el-button> -->
          <el-button type="danger" @click="delPeAssemItemExam">删除</el-button>
          <el-button type="primary" @click="savePeAssemItemLab('2')">保存</el-button>
          <!-- <el-button type="primary" @click="handlePrint">打印</el-button> -->
        </div>

        <!-- 表格 -->
        <el-table
          :data="tableList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100vh - 200px); overflow: auto"
          highlight-current-row
          stripe
          @row-click="handleRowClick"
        >
          <template #default>
            <el-table-column
              v-for="item in columns"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              :align="item.prop === 'printFlag' || 'examNoRule' ? 'center' : null"
            >
              <template #default="{ row }">
                <!-- 默认展示文本 -->
                <span v-if="!editableFields.includes(item.prop)">{{ row[item.prop] }}</span>

                <!-- 打印列用复选框 -->
                <el-checkbox
                  v-if="item.prop === 'printFlag'"
                  v-model="row[item.prop]"
                  true-label="1"
                />
                <!-- 检查分类 -->
                <el-select
                  v-else-if="item.prop === 'examClass'"
                  v-model="row[item.prop]"
                  size="small"
                  @click.stop="handleSelectClick(row)"
                >
                  <el-option
                    v-for="option in peClassList"
                    :key="option.examClassCode"
                    :label="option.examClassName"
                    :value="option.examClassName"
                  />
                </el-select>
                <!-- 检查子类 -->
                <el-input
                  v-else-if="item.prop === 'examSubClass'"
                  type="text"
                  v-model.trim="row.examSubClass"
                  placeholder="请输入"
                  clearable
                  :maxlength="50"
                >
                  <template #append>
                    <el-button :icon="Search" @click="onMailingAddressAreaAddress(row)" />
                  </template>
                </el-input>

                <!-- 其他可编辑字段 -->
                <el-select
                  v-else-if="selectFields.includes(item.prop)"
                  v-model="row[item.prop]"
                  size="small"
                >
                  <el-option
                    v-for="option in optionsMap[item.prop]"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>

                <!-- 输入框字段 -->
                <!-- <el-input v-else v-model="row[item.prop]" size="small" style="width: 120px" /> -->
              </template>
            </el-table-column>
          </template>
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
    </div>
    <Dialog v-model="dialogVisible" width="600px" :fullscreen="false">
      <template #title>
        <div class="dialog-title">新增</div>
      </template>
      <div class="mb-8px">
        <el-form :model="rowdetail" label-width="120px" size="small">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="组合代码">
                <el-input v-model="rowdetail.itemAssemCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目组合名称">
                <el-input v-model="rowdetail.itemAssemName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查类别">
                <el-select v-model="rowdetail.examClass" style="width: 100%">
                  <el-option
                    v-for="option in peClassList"
                    :key="option.examClassCode"
                    :label="option.examClassName"
                    :value="option.examClassCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查子类">
                <!-- <el-select v-model="rowdetail.examSubClass" style="width: 100%">
                  <el-option
                    v-for="option in peSubClassList"
                    :key="option.examSubclassName"
                    :label="option.examSubclassName"
                    :value="option.examSubclassName"
                  />
                </el-select> -->
                <el-input
                  type="text"
                  v-model.trim="rowdetail.examSubclassName"
                  placeholder="请输入"
                  clearable
                  :maxlength="50"
                >
                  <template #append>
                    <el-button :icon="Search" @click="onMailingAddressAreaAddress1(rowdetail)" />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="序号发生器">
                <el-select v-model="rowdetail.examNoSeq" style="width: 100%">
                  <el-option
                    v-for="option in optionsMap.examNoSeq"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请号规则">
                <el-select v-model="rowdetail.examNoRule" style="width: 100%">
                  <el-option
                    v-for="option in optionsMap.examNoRule"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="打印">
                <el-checkbox v-model="rowdetail.value.printFlag" />
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
      <div class="flex justify-end">
        <div class="base-cont mt-4px">
          <el-button class="resetBtn" @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="savePeAssemItemLab('1')">保存</el-button>
        </div>
      </div>
    </Dialog>
    <DictDialog
      :visible="mailingAddressDialogVisible"
      title="地区字典"
      :query-params="diquQueryParams"
      width="800px"
      @callback="onMailingAddressDictCallback"
      @on-close="mailingAddressDialogVisible = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/systemSetting/examControls/index'
import { queryDictByConfig } from '@/api/system/deptManage'
import { Search } from '@element-plus/icons-vue'
import DictDialog from '@/views/components/DictDialog/Index.vue'
import { table } from 'console'

const peClassList = ref([])
const peSubClassList = ref([])
// ===================== 响应式数据 =====================
const dialogVisible = ref(false)
const columns = ref([
  { label: '组合代码', prop: 'itemAssemCode', width: '120' },
  { label: '项目组合名称', prop: 'itemAssemName' },
  { label: '执行科室', prop: 'label2' },
  { label: '检查类别', prop: 'examClass' },
  { label: '检查子类', prop: 'examSubClass' },
  { label: '序号发生器', prop: 'examNoSeq' },
  { label: '申请号规则', prop: 'examNoRule' },
  { label: '打印', prop: 'printFlag', width: '60' }
])
// 可编辑的字段
const editableFields = ['examClass', 'examSubClass', 'examNoSeq', 'examNoRule', 'printFlag']

// 下拉字段列表
const selectFields = ['examClass', 'examSubClass', 'examNoSeq', 'examNoRule']

// 下拉选项映射表
const optionsMap = {
  examClass: [],
  examSubClass: [
    { label: '生化', value: '生化' },
    { label: '免疫', value: '免疫' }
  ],
  examNoSeq: [{ label: 'exam_no_seq', value: 'exam_no_seq' }],
  examNoRule: [
    { label: '日期 + 序号', value: '0' },
    { label: '仅序号', value: '1' }
  ]
}

const tableList = ref([])
const total = ref(0)
const pageSize = ref(23)
const currentPage = ref(1)

const rowdetail = ref({})

const getPeAssemItemLab = async (page = 1) => {
  const response = await Api.getPeAssemItemLab({
    pageNo: page,
    pageSize: pageSize.value,
    className: '检查类'
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

const handlePageChange = (newPage) => {
  getPeAssemItemLab(newPage)
}

const handleRowClick = async (row) => {
  console.log('Row clicked:', row)
  rowdetail.value = row
}
const savePeAssemItemLab = async (addFlag = '1') => {
  try {
    // 设置 optionFlag
    rowdetail.value.optionFlag = addFlag == '1' ? '1' : '2'
    rowdetail.value.printFlag = rowdetail.value.printFlag === true ? '1' : ''
    console.log(
      '%c Line:285 🍧 rowdetail.value.printFlag',
      'color:#b03734',
      rowdetail.value.printFlag
    )

    if (addFlag == '1') {
      // 调用接口保存数据
      const response = await Api.savePeAssemItemLab({
        // list: [...tableList.value] // 假设接口支持直接传入 rowdetail 数据
        list: [rowdetail.value] // 假设接口支持直接传入 rowdetail 数据
      })

      if (response) {
        ElMessage.success('新增成功')
        // 新增时清空 rowdetail
        rowdetail.value = {}
        dialogVisible.value = false // 关闭对话框
        getPeAssemItemLab() // 刷新表格数据
      }
    } else {
      // 调用接口保存数据
      const response = await Api.savePeAssemItemLab({
        // list: [...tableList.value] // 假设接口支持直接传入 rowdetail 数据
        list: [rowdetail.value] // 假设接口支持直接传入 rowdetail 数据
      })

      if (response) {
        ElMessage.success('保存成功')
        getPeAssemItemLab() // 刷新表格数据
      }
    }
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  }
}
const handleAdd = () => {
  rowdetail.value = {}
  dialogVisible.value = true
}
const delPeAssemItemExam = async () => {
  try {
    if (!rowdetail.value.itemAssemCode) {
      ElMessage.warning('请选择要删除的项目组合')
      return
    }
    const response = await Api.delPeAssemItemExam({
      list: [rowdetail.value]
    })
    if (response) {
      ElMessage.success('删除成功')
      rowdetail.value = {}
      getPeAssemItemLab() // 刷新表格数据
    }
  } catch (error) {
    console.error('删除失败:', error)
    ElMessage.error('删除失败，请重试')
  }
}

onMounted(async () => {
  peClassList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '检查分类字典',
    cons: ''
  })
  getPeAssemItemLab()
})

const diquQueryParams = ref({ dictType: '检查子类字典', cons: '', keyWord: '' })
const onMailingAddressDictCallback = (row) => {
  if (index.value !== undefined) {
    tableList.value[index.value].examSubclassName = row.examSubclassName
    tableList.value[index.value].examSubClass = row.examSubclassName
  }
  rowdetail.value.examSubclass = row.examSubclassName
  rowdetail.value.examSubclassName = row.examSubclassName
  mailingAddressDialogVisible.value = false
}

const mailingAddressDialogVisible = ref(false)

const index = ref()
const onMailingAddressAreaAddress = (row) => {
  rowdetail.value = row
  index.value = tableList.value.findIndex((item) => item === row)
  diquQueryParams.value = { dictType: '检查子类字典', cons: '', keyWord: row.examClass }
  mailingAddressDialogVisible.value = true
}
const onMailingAddressAreaAddress1 = (row) => {
  rowdetail.value.optionFlag = '1'
  diquQueryParams.value = { dictType: '检查子类字典', cons: '', keyWord: row.examClass }
  mailingAddressDialogVisible.value = true
}

const handleSelectClick = (rowData) => {
  // 在这里添加你想要对行数据执行的操作
  rowdetail.value = rowData
  index.value = tableList.value.findIndex((item) => item === rowData)
  handleRowClick(rowData)
}
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
}
:deep(.el-table) {
  font-size: 14px;
}
.base-title {
  padding: 0 20px;
  color: #3473d1;
  font-size: 16px;
  height: 29px;
  line-height: 29px;
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
    // height: 2px;
    // background-color: #3473d1;;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
.base-cont {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  gap: 15px;
  padding: 4px;

  &.auto {
    display: block;
  }

  .cont-span {
    display: inline-block;
    width: 100px;
    text-align: right;
    flex-shrink: 0;
  }
  .select-item {
    width: 240px;
  }

  .base-div {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;

    &.spec {
      justify-content: left;
      gap: 0;

      .select-area {
        width: 1290px;
      }
    }
  }
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
:deep(.el-transfer) {
  .el-transfer-panel {
    width: 40%;
    box-sizing: border-box;
  }

  .el-transfer__buttons {
    // display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
}
// --------------------------
.custom-transfer {
  display: flex;
  height: 400px;
  border: 1px solid #e4e7ed;
  padding: 10px;
  background-color: #f5f7fa;
}

.transfer-panel {
  flex: 1;
  background-color: white;
  margin: 0 5px;
  padding: 10px;
  border-radius: 4px;
  overflow-y: auto;
}

.transfer-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.list {
  max-height: 300px;
  overflow-y: auto;
}

.item {
  padding: 5px 10px;
}

.content {
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 0 8px 8px;
  overflow: auto;
}

.base-btn {
  display: flex;
  width: calc(100% - 20px);
  justify-content: center;
  align-items: center;
  height: 65px;
  background-color: #fff;
  .btn-box {
    width: 122px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #3473d1;
    color: #fff;
    cursor: pointer;
  }
}
</style>
