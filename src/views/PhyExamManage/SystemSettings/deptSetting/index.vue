<template>
  <div class="main">
    <div class="base-box">
      <!-- <div class="base-title">科室列表</div> -->
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
        <div class="info" style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap">
          <div class="form-item">
            <span class="label-fixed-width">执行时间:</span>
            <el-date-picker
              v-model="startDate"
              type="date"
              value-format="YYYY-MM"
              style="width: 180px"
            />
          </div>

          <div class="form-item">
            <span class="label-fixed-width">操作者:</span>
            <el-input v-model="searchKeyword" placeholder="请输入" style="width: 180px" />
          </div>

          <el-button type="primary" @click="setClass">费用分类维护</el-button>
          <el-button class="resetBtn" @click="handleAddDocument">新增</el-button>
          <el-button type="danger" @click="delPeDeptDict">删除</el-button>
          <el-button type="primary" @click="getDept">提取</el-button>
          <el-button type="primary" @click="savePeDeptDict">保存</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px table-container" style="padding: 10px; background-color: #fff; height: 100%">
      <el-table
        ref="adviceTableRef"
        :data="paginatedData"
        border
        :row-class-name="setAdviceRowClass"
        style="width: 100%; height: calc(100vh - 220px)"
        highlight-current-row
        stripe
        @row-click="handleRowClick"
      >
        <!-- <el-table-column type="selection" width="38" prop="orderNo" />
        <el-table-column
          :resizable="false"
          type="index"
          align="center"
          label="序号"
          width="54"
          fixed="left"
          show-overflow-tooltip
        /> -->
        <el-table-column
          v-for="item in addColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <div v-if="item.prop === 'peDeptClass'">
              <el-select v-model="row.peDeptClass" size="small" style="width: 100%">
                <el-option
                  v-for="item in AssemClassList"
                  :key="item.classCode"
                  :label="item.className"
                  :value="item.className"
                />
              </el-select>
            </div>
            <div v-else-if="item.prop === 'label1'">
              <el-select v-model="row.label1" size="small" style="width: 100%">
                <el-option
                  v-for="item in AssemFeeList"
                  :key="item.feeClassCode"
                  :label="item.feeClassName"
                  :value="item.feeClassCode"
                />
              </el-select>
            </div>
            <div v-else-if="item.prop === 'label3'">
              <el-select v-model="row.label3" size="small" style="width: 100%">
                <el-option
                  v-for="item in CooperationSystemList"
                  :key="item.sysCode"
                  :label="item.sysName"
                  :value="item.sysCode"
                />
              </el-select>
            </div>
            <div v-else-if="item.prop === 'label4'">
              <el-select v-model="row.label4" size="small" style="width: 100%">
                <el-option
                  v-for="item in CooperationSystemList"
                  :key="item.sysCode"
                  :label="item.sysName"
                  :value="item.sysCode"
                />
              </el-select>
            </div>
            <div v-else-if="item.prop === 'reportFlag'">
              <el-select v-model="row.reportFlag" size="small" style="width: 100%">
                <el-option value="0" label="出报告" />
                <el-option value="1" label="不出报告" />
              </el-select>
            </div>
            <div v-else-if="item.prop === 'inGuide'">
              <el-select v-model="row.inGuide" size="small" style="width: 100%">
                <el-option value="1" label="是" />
                <el-option value="2" label="否" />
              </el-select>
            </div>
            <div v-else>
              <el-input v-model="row[item.prop]" size="small" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container mt-12px mb-12px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="deptList.length"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <Dialog
      :fullscreen="false"
      :model-value="setClassDialog"
      title="类别维护"
      width="45%"
      style="height: 70%"
      class="auditDialog"
      :before-close="beforeCloseDialog"
      @close="setClassDialog = false"
    >
      <div class="con">
        <div class="base-cont mb-6px">
          <span class="cont-span">执行时间：</span>
          <el-date-picker
            style="width: 12vw"
            v-model="value1"
            type="date"
            placeholder="请选择"
            :default-value="new Date()"
          />
          <span class="cont-span ml-4px">操作者：</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
        </div>
      </div>
      <el-table
        :data="AssemFeeList"
        border
        @row-click="handleAssemRowClick"
        style="text-align: center; height: 300px"
      >
        <el-table-column prop="serialNo" label="序号" width="80"> </el-table-column>
        <el-table-column prop="feeClassCode" label="代码"> </el-table-column>
        <el-table-column prop="feeClassName" label="名称"> </el-table-column>
        <!-- 可删除的操作列 -->
        <el-table-column
          label="操作"
          width="60px
        "
        >
          <template #default="scoped">
            <!-- 使用迷你尺寸的按钮 -->
            <span style="font-weight: 500; color: red" @click="delPeRcptFeeDict(scoped.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="base-cont mt-6px">
        <span class="cont-span">序号:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.serialNo"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">名称:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.feeClassCode"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">代码:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.feeClassName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="setClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveAssemClass">保 存</el-button>
        </div>
      </template>
    </Dialog>
    <!-- 在现有模板中的 Dialog 之前添加新增弹窗 -->
    <Dialog
      :fullscreen="false"
      :model-value="addDialogVisible"
      title="新增科室"
      width="60%"
      class="add-dialog"
      :before-close="handleAddDialogClose"
      @close="addDialogVisible = false"
    >
      <el-form
        ref="addFormRef"
        :model="newDeptData"
        :rules="deptRules"
        label-width="120px"
        class="add-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科室编码" prop="peDeptCode">
              <el-input v-model="newDeptData.peDeptCode" placeholder="请输入科室编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科室名称" prop="peDeptName">
              <el-input v-model="newDeptData.peDeptName" placeholder="请输入科室名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科室类别" prop="peDeptClass">
              <el-select
                v-model="newDeptData.peDeptClass"
                placeholder="请选择科室类别"
                style="width: 100%"
              >
                <el-option
                  v-for="item in AssemClassList"
                  :key="item.className"
                  :label="item.className"
                  :value="item.className"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用分类" prop="label1">
              <el-select
                v-model="newDeptData.label1"
                placeholder="请选择费用分类"
                style="width: 100%"
              >
                <el-option
                  v-for="item in AssemFeeList"
                  :key="item.feeClassCode"
                  :label="item.feeClassName"
                  :value="item.feeClassCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="执行科室名" prop="label2">
              <el-input v-model="newDeptData.label2" placeholder="请输入执行科室名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请发往" prop="label3">
              <el-select
                v-model="newDeptData.label3"
                placeholder="请选择申请发往系统"
                style="width: 100%"
              >
                <el-option
                  v-for="item in CooperationSystemList"
                  :key="item.sysCode"
                  :label="item.sysName"
                  :value="item.sysCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="结果所在" prop="label4">
              <el-select
                v-model="newDeptData.label4"
                placeholder="请选择结果所在系统"
                style="width: 100%"
              >
                <el-option
                  v-for="item in CooperationSystemList"
                  :key="item.sysCode"
                  :label="item.sysName"
                  :value="item.sysCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顺序" prop="peDeptOrder">
              <el-input-number
                v-model="newDeptData.peDeptOrder"
                :min="0"
                controls-position="right"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="输入码" prop="inputCode">
              <el-input v-model="newDeptData.inputCode" placeholder="请输入输入码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="不出报告" prop="reportFlag">
              <el-select v-model="newDeptData.reportFlag" style="width: 100%">
                <el-option value="0" label="出报告" />
                <el-option value="1" label="不出报告" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="参加导检否" prop="inGuide">
              <el-select v-model="newDeptData.inGuide" style="width: 100%">
                <el-option value="1" label="是" />
                <el-option value="2" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="默认医生" prop="defaultDoctor">
              <el-input v-model="newDeptData.defaultDoctor" placeholder="请输入默认医生" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleAddDialogClose">取 消</el-button>
          <el-button type="primary" @click="confirmAddDept">确 定</el-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/systemSetting/deptSetting/index'
import { ElMessage } from 'element-plus'

// ===================== 响应式数据 =====================
const deptList = ref([])
const startDate = ref(new Date().toISOString().substr(0, 10)) // 格式：YYYY-MM-DD

const searchKeyword = ref('')

// ======================== 方法定义 ========================

const setAdviceRowClass = () => {
  return 'advice-row'
}
const addColumns = [
  { prop: 'peDeptCode', label: '代码', align: 'center', width: '150px' },
  { prop: 'peDeptName', label: '科室名称', align: 'center' },
  { prop: 'peDeptClass', label: '科室类别', align: 'center', width: '140px' },
  { prop: 'label1', label: '费用分类', align: 'center', width: '120px' },
  { prop: 'label2', label: '执行科室名', align: 'center', width: '140px' },
  { prop: 'label3', label: '申请发往', align: 'center' },
  { prop: 'label4', label: '结果所在', align: 'center' },
  { prop: 'peDeptOrder', label: '顺序', align: 'center', width: '120px' },
  { prop: 'inputCode', label: '输入码', align: 'center', width: '100px' },
  { prop: 'reportFlag', label: '不出报告', align: 'center', width: '120px' },
  { prop: 'inGuide', label: '参加导检否', align: 'center', width: '120px' },
  { prop: 'defaultDoctor', label: '默认医生', align: 'center', width: '140px' }
]

// 分页相关
const currentPage = ref(1)
const pageSize = 20

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return deptList.value.slice(start, end)
})

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 获取分类数据
const getDept = async () => {
  const res = await Api.getPeDeptList('application/x-www-form-urlencoded')
  deptList.value = res
  if (res.length > 0) {
    handleRowClick(res[0])
  }
}

const AssemClassList = ref([
  { className: '医生检查' },
  { className: '检查类' },
  { className: '检验类' }
])

// 获取分类列表
const getPeItemAssemClassList = async () => {
  const res = await Api.getPeItemAssemClassList('application/x-www-form-urlencoded')
  AssemClassList.value = res
  // filteredOptions.value = [{ classCode: 'option1', className: '全部类型' }, ...AssemClassList.value]
}
const AssemFeeList = ref([])

// 费用分类列表
const getPeRcptFeeDictList = async () => {
  const res = await Api.getPeRcptFeeDictList('application/x-www-form-urlencoded')
  AssemFeeList.value = res
  // filteredOptions.value = [{ classCode: 'option1', className: '全部类型' }, ...AssemClassList.value]
}

const CooperationSystemList = ref([])
// 获取分类列表
const getPeCooperationSystemList = async () => {
  const res = await Api.getPeCooperationSystemList()
  CooperationSystemList.value = res
}

const RowInfo = ref({})
const handleRowClick = (row: any) => {
  RowInfo.value = row
}
// 保存科室
const savePeDeptDict = async () => {
  RowInfo.value.optionFlag = 2
  await Api.savePeDeptDict(RowInfo.value).then((res) => {
    ElMessage.success('保存成功')
  })
}

const setClassDialog = ref(false)
const classitem = ref({})
// 类别维护
const setClass = () => {
  // 开启弹窗
  setClassDialog.value = true
  classitem.value = AssemFeeList.value[0]
}

// 点击费用类别维护保存
const handleSaveAssemClass = async () => {
  await Api.savePeRcptFeeDict(classitem.value).then((res) => {})
}
// 费用类别维护表格点击
const handleAssemRowClick = (row) => {
  classitem.value = row
}
// 删除费用类别维护表格点击
const delPeRcptFeeDict = (row) => {
  Api.delPeRcptFeeDict({
    feeClassCode: row.feeClassCode
  }).then((res) => {
    console.log('%c  res', 'color:#42b983', res)
  })
}
// 科室删除
const delPeDeptDict = async () => {
  await Api.delPeDeptDict({
    peDeptCode: RowInfo.value.peDeptCode
  }).then((res) => {
    ElMessage.success('删除成功')
    getDept()
  })
}

onMounted(() => {
  // getPeItemAssemClassList()
  getPeCooperationSystemList()
  getPeRcptFeeDictList()
  getDept()
})
// 在现有导入之后添加
import { FormInstance, FormRules } from 'element-plus'

// 在现有响应式数据之后添加
const addDialogVisible = ref(false)
const addFormRef = ref<FormInstance>()

// 新增科室表单数据
const newDeptData = ref({
  peDeptCode: '',
  peDeptName: '',
  peDeptClass: '',
  label1: '',
  label2: '',
  label3: '',
  label4: '',
  peDeptOrder: 0,
  inputCode: '',
  reportFlag: '0',
  inGuide: '1',
  defaultDoctor: '',
  optionFlag: 1 // 1表示新增
})

// 表单验证规则
const deptRules = reactive<FormRules>({
  peDeptCode: [{ required: true, message: '请输入科室编码', trigger: 'blur' }],
  peDeptName: [{ required: true, message: '请输入科室名称', trigger: 'blur' }]
})

// 在现有方法之后添加
// 显示新增弹窗
const showAddDialog = () => {
  // 重置表单数据
  newDeptData.value = {
    peDeptCode: '',
    peDeptName: '',
    peDeptClass: '',
    label1: '',
    label2: '',
    label3: '',
    label4: '',
    peDeptOrder: 0,
    inputCode: '',
    reportFlag: '0',
    inGuide: '1',
    defaultDoctor: '',
    optionFlag: 1
  }

  // 重置表单验证
  if (addFormRef.value) {
    addFormRef.value.resetFields()
  }

  addDialogVisible.value = true
}

// 关闭新增弹窗
const handleAddDialogClose = () => {
  addDialogVisible.value = false
}

// 确认新增科室
const confirmAddDept = async () => {
  if (!addFormRef.value) return
  const saveParams = ref([...paginatedData.value, newDeptData.value])
  saveParams.value.optionFlag = 1
  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await Api.savePeDeptDict({ list: saveParams.value })
        if (res == true) {
          ElMessage.success('新增科室成功')
          addDialogVisible.value = false
          // 重新获取科室列表
          await getDept()
        } else {
          ElMessage.error(res.msg || '新增科室失败')
        }
      } catch (error) {
        ElMessage.error('新增科室失败: ' + (error as Error).message)
      }
    }
  })
}

// 修改现有"新增"按钮的点击事件处理函数
// 将 handleSaveDocument 方法替换为:
const handleAddDocument = () => {
  showAddDialog()
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

:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow-y: auto !important;
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
  padding: 8px 8px 8px 8px;
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
</style>
