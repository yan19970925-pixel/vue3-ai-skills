<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="content">
        <!-- <div class="base-title">检验项目列表</div> -->

        <div class="base-cont mt-4px">
          <el-button type="primary" @click="savePeAssemItemLab">保存</el-button>
          <!-- <el-button class="resetBtn" @click="handleSaveDocument">
            <el-icon><RefreshLeft /></el-icon>还原
          </el-button> -->
        </div>
        <el-table
          :data="tableList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100vh - 216px); overflow: auto"
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
            >
              <template #default="{ row }">
                <span v-if="!editableFields.includes(item.prop)">{{ row[item.prop] }}</span>
                <el-input
                  v-else-if="['upperLimit', 'lowerLimit'].includes(item.prop)"
                  v-model="row[item.prop]"
                  size="small"
                  style="width: 120px"
                  type="number"
                  :min="0"
                  :max="999999"
                  step="0.01"
                  @input="handleDecimalInput(row, item.prop, $event, 999999)"
                />
                <el-input
                  v-else-if="['unit'].includes(item.prop)"
                  v-model="row[item.prop]"
                  size="small"
                  style="width: 120px"
                  maxlength="10"
                  show-word-limit
                />
                <el-input v-else v-model="row[item.prop]" size="small" style="width: 120px" />
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/systemSetting/reportComparison/index'

const tableList = ref([])
const total = ref(0)
const pageSize = ref(22)
const currentPage = ref(1)

const editableFields = ['upperLimit', 'lowerLimit', 'unit', 'relateCode', 'relateName']
const rowdetail = ref({})
const columns = ref([
  { label: '项目代码', prop: 'peItemCode', width: '150' },
  { label: '项目组合名称', prop: 'peItemName' },
  { label: '体检科室', prop: 'peDeptName' },
  { label: '报告类型', prop: 'peResultClass' },
  { label: '上限', prop: 'upperLimit' },
  { label: '下限', prop: 'lowerLimit' },
  { label: '单位', prop: 'unit' },
  { label: '外部对照码', prop: 'relateCode' },
  { label: '外部对照名称', prop: 'relateName' }
])
// 处理小数输入（用于上下限字段）
const handleDecimalInput = (row, prop, value, maxValue) => {
  if (value === '' || value === null) return

  const numValue = parseFloat(value)
  if (isNaN(numValue)) {
    row[prop] = ''
    return
  }

  // 限制最大值
  if (numValue > maxValue) {
    row[prop] = maxValue
    return
  }

  // 保留最多2位小数
  const fixedValue = parseFloat(numValue.toFixed(2))
  row[prop] = fixedValue
}

// 处理整数输入（用于对照码字段）
const handleIntegerInput = (row, prop, value, maxValue) => {
  if (value === '' || value === null) return

  const numValue = parseInt(value, 10)
  if (isNaN(numValue)) {
    row[prop] = ''
    return
  }

  // 限制最大值
  if (numValue > maxValue) {
    row[prop] = maxValue
    return
  }

  row[prop] = numValue
}

const getPeAssemItemLab = async (page = 1) => {
  const response = await Api.getPeAssemItemLab({
    pageNo: page,
    pageSize: pageSize.value,
    className: '检验类'
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

const handleRowClick = (row) => {
  console.log('Row clicked:', row)
  rowdetail.value = row
}
const validateTableData = () => {
  for (const row of tableList.value) {
    if (row.lowerLimit !== '' && row.upperLimit !== '') {
      const lower = parseFloat(row.lowerLimit)
      const upper = parseFloat(row.upperLimit)
      if (lower > upper) {
        ElMessage.error(`项目 "${row.peItemName}" 的下限不能大于上限`)
        return false
      }
    }
    if (row.lowerLimit !== '' && parseFloat(row.lowerLimit) < 0) {
      ElMessage.error(`项目 "${row.peItemName}" 的下限不能小于0`)
      return false
    }
    if (row.unit && row.unit.length > 10) {
      ElMessage.error(`项目 "${row.peItemName}" 的单位长度不能超过10个字符`)
      return false
    }
  }
  return true
}
const savePeAssemItemLab = async () => {
  if (!validateTableData()) return // 校验失败则不提交
  try {
    // 设置 optionFlag
    // rowdetail.value.optionFlag = '2'

    // 调用接口保存数据
    const response = await Api.savePeAssemItemLab({
      list: [...tableList.value] // 假设接口支持直接传入 rowdetail 数据
      // list: [rowdetail.value] // 假设接口支持直接传入 rowdetail 数据
    })

    if (response) {
      ElMessage.success('保存成功')
      getPeAssemItemLab() // 刷新表格数据
    }
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  }
}

onMounted(() => {
  getPeAssemItemLab()
})
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
