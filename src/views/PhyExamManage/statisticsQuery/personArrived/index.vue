<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width" style="width: 30%">人员所到时间区间:</span>
            <el-date-picker
              style="width: 10%"
              v-model="value2"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-value="[new Date(), new Date()]"
            />
          </div>
          <el-button type="primary" @click="handleSaveDocument">提取数据</el-button>
          <el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
          <el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px" style="padding: 10px; background-color: #fff; height: calc(100vh - 176px)">
      <el-table
        ref="adviceTableRef"
        :data="paginatedData"
        border
        :row-class-name="setAdviceRowClass"
        style="width: 100%; height: calc(100% - 116px); min-height: 300px"
        highlight-current-row
        stripe
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
      <div
        class="pagination-container mt-12px mb-12px"
        style="display: flex; justify-content: space-between"
      >
        <!-- 合计 -->
        <div style="color: #3473d1; margin-right: 20px; font-size: 16px; font-weight: 700">
          合计：{{ filteredAddList.length }} 条
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredAddList.length"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// ===================== 响应式数据 =====================
const startDate = ref(new Date().toISOString().substr(0, 10)) // 格式：YYYY-MM-DD

const searchKeyword = ref('')
const noPrintStopOrdersFlag = ref(true)
const inStoreType = ref('')
const subWarehouseFilter = ref('')
const dosageForm = ref('')

const inTypeList = [
  { label: '全部', value: '' },
  { label: '中成药', value: 'zhongchengyao' },
  { label: '中药材', value: 'zhongyaocai' },
  { label: '西药', value: 'xiyao' },
  { label: '医疗器械', value: 'yiliaoqixie' }
]

const addColumns = [
  { prop: 'medicineName', label: '单位代码', align: 'center' },
  { prop: 'specification', label: '单位名称', align: 'center' },
  { prop: 'unit', label: '体检号', align: 'center' },
  { prop: 'unitPrice', label: '姓名', align: 'center' },
  { prop: 'beginningAmount', label: '人数', align: 'center', width: '120px' }
  // { prop: 'manufacturer', label: '联系电话', align: 'center' },
  // { prop: 'beginningQty', label: '单位类别', align: 'center', width: '100px' },
  // { prop: 'inStoreQty', label: '体检总次数', align: 'center' }
  // { prop: 'inStoreAmount', label: '疾病解释', align: 'center' }
  // { prop: 'returnOutQty', label: '参加导检否', align: 'center', width: '120px' },
  // { prop: 'returnOutAmount', label: '默认医生', align: 'center', width: '140px' }
]

const mockData = {
  medicineName: '阿莫西林胶囊',
  specification: '0.25g×24粒/盒',
  unit: '盒',
  unitPrice: '15.00',
  manufacturer: '某某制药有限公司',
  beginningQty: '200',
  beginningAmount: '3000.00',
  inStoreQty: '100',
  inStoreAmount: '1500.00',
  returnOutQty: '10',
  returnOutAmount: '150.00',
  lossOutQty: '5',
  lossOutAmount: '75.00',
  outStoreQty: '105',
  outStoreAmount: '1575.00',
  currentStockQty: '195',
  currentStockAmount: '2925.00',
  adjustProfitLoss: '0.00',
  monthEndFlag: false,
  monthStartFlag: true
}

const addList = Array.from({ length: 32 }, () => ({ ...mockData }))

// 过滤后的列表
const filteredAddList = computed(() => {
  return addList.filter((item) => {
    const matchKeyword =
      !searchKeyword.value ||
      item.medicineName.includes(searchKeyword.value) ||
      item.specification.includes(searchKeyword.value) ||
      item.manufacturer.includes(searchKeyword.value)

    const matchCategory = !inStoreType.value || item.type === inStoreType.value

    const matchWarehouse =
      !subWarehouseFilter.value ||
      (subWarehouseFilter.value === 'westMedicineStore' && item.unitPrice > 20) ||
      (subWarehouseFilter.value === 'traditionalMedicineStore' && item.unitPrice < 20)

    if (noPrintStopOrdersFlag.value) {
      return (
        matchKeyword &&
        matchCategory &&
        matchWarehouse &&
        !(
          item.beginningQty === '0' &&
          item.inStoreQty === '0' &&
          item.outStoreQty === '0' &&
          item.currentStockQty === '0'
        )
      )
    }

    return matchKeyword && matchCategory && matchWarehouse
  })
})

// ======================== 方法定义 ========================

// 新开单据
const handleNewDocument = () => {
  console.log('新开单据')
  // 实际业务逻辑：初始化新单据数据
}

// 保存单据
const handleSaveDocument = () => {
  console.log('保存单据')
  // 实际业务逻辑：保存当前表单数据
}

// 单据记账
const handleAccounting = () => {
  if (!startDate.value) {
    ElMessage.warning('请选择转结月份')
    return
  }
  console.log('单据记账')
  // 实际业务逻辑：执行记账操作
}

// 查询单据
const handleSearchDocuments = () => {
  console.log('查询单据:', {
    month: startDate.value,
    keyword: searchKeyword.value,
    category: inStoreType.value
  })
  // 实际业务逻辑：根据条件查询单据
}

// 导出
const handleExport = () => {
  console.log('导出数据')
  // 调用 xlsx 或其他导出逻辑
}

// 打印
const handlePrint = () => {
  console.log('打印')
  // 实际业务逻辑：触发打印功能
}

// 表格操作相关
const selectedRows = ref<any[]>([])
const setCurrentRow = (row: any) => {
  console.log('当前选中行:', row)
}
const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const setAdviceRowClass = () => {
  return 'advice-row'
}

// 分页相关
const currentPage = ref(1)
const pageSize = 20

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredAddList.value.slice(start, end)
})

const handleCurrentChange = (val: number) => {
  currentPage.value = val
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
  overflow: auto;
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

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
</style>
