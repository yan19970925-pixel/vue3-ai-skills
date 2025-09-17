<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="cont-span">预约时间:</span>
            <el-date-picker
              style="width: 12vw"
              v-model="value1"
              type="date"
              placeholder="请选择"
              :default-value="new Date()"
            />
            <el-radio-group v-model="radio">
              <el-radio :label="1">医生工作量</el-radio>
              <el-radio :label="2">护士工作量</el-radio>
              <el-radio :label="3">终检工作量</el-radio>
              <el-radio :label="4">项目完成工作量</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="handleSaveDocument">查询</el-button>
          <el-button class="resetBtn" @click="printData">
            <img
              src="@/assets/imgs/print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button>
          <el-button class="resetBtn" @click="exportData">
            <img
              src="@/assets/imgs/Export2x.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
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
        :span-method="spanUnitNameMethod"
      >
        <el-table-column
          v-for="item in visibleColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
          <template v-slot="{ row }">
            <div v-if="row._isSummary" v-html="row.unitName" style="text-align: left"></div>
            <div v-else>{{ row[item.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="pagination-container mt-12px mb-12px"
        style="display: flex; justify-content: space-between"
      >
        <!-- 合计 -->
        <div style="color: #3473d1; margin-right: 20px; font-size: 16px; font-weight: 700">
          <span>
            总合计：完成人次：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检中').length
            }}人
          </span>
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

// ===================== 响应式数据 =====================
const value1 = ref<Date | null>(new Date())
const radio = ref(1)
const currentPage = ref(1)
const pageSize = 20

// 列定义
const allColumns = [
  { prop: 'unitName', label: '医生', align: 'center', width: '120px' },
  { prop: 'projectName', label: '项目名称', align: 'center', width: '120px' },
  { prop: 'completedCount', label: '完成人次', align: 'center', width: '120px' },
  { prop: 'amount', label: '项目完成金额', align: 'center', width: '120px' }
]
const allColumns1 = [
  { prop: 'unitName', label: '医生', align: 'center', width: '120px' },
  { prop: 'projectName', label: '项目名称', align: 'center', width: '120px' },
  { prop: 'completedCount', label: '完成人次', align: 'center', width: '120px' }
]
const allColumns2 = [
  { prop: 'projectName', label: '职位', align: 'center', width: '120px' },
  { prop: 'unitName', label: '护士', align: 'center', width: '120px' },
  { prop: 'completedCount', label: '完成人次', align: 'center', width: '120px' }
]
const allColumns3 = [
  { prop: 'projectName', label: '项目名称', align: 'center', width: '120px' },
  { prop: 'unitName', label: '套餐名称', align: 'center', width: '120px' },
  { prop: 'completedCount', label: '数量', align: 'center', width: '120px' }
]

const visibleColumns = computed(() => {
  if (radio.value === 1) return allColumns
  if (radio.value === 2) return allColumns1
  if (radio.value === 3) return allColumns2
  return allColumns3
})

// mock 数据生成函数
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

function generateMockData(unitNames: string[], count: number, type: number) {
  const statuses = ['检中', '检完', '未检']
  const projects = ['血常规', '尿常规', '心电图', 'B超', 'CT检查']
  const unitPriceMap: Record<string, number> = {
    血常规: 200,
    尿常规: 150,
    心电图: 300,
    B超: 250,
    CT检查: 500
  }

  const dataList = []

  for (let i = 0; i < count; i++) {
    const projectName = projects[Math.floor(Math.random() * projects.length)]
    const unitName = unitNames[Math.floor(Math.random() * unitNames.length)]
    const completedCount = Math.floor(Math.random() * 10) + 1
    const completionStatus = statuses[Math.floor(Math.random() * 3)]

    let item: any = {
      unitName,
      projectName,
      completedCount,
      completionStatus,
      finishDate: i % 3 === 0 ? '' : randomDate(new Date(2024, 0, 1), new Date()),
      reportDate: randomDate(new Date(2024, 0, 1), new Date())
    }

    // 只有医生工作量包含金额
    if (type === 1) {
      item.amount = `¥${(unitPriceMap[projectName] * completedCount).toFixed(2)}`
    }

    dataList.push(item)
  }

  return dataList
}

// 数据源
const addList = ref<any[]>([])

// 提取数据按钮点击事件
const handleSaveDocument = () => {
  const list1 = generateMockData(
    ['张医生', '李医生', '王医生'],
    Math.floor(Math.random() * 25) + 5,
    1
  )
  const list2 = generateMockData(
    ['赵护士', '钱护士', '孙护士'],
    Math.floor(Math.random() * 15) + 5,
    2
  )
  const list3 = generateMockData(
    ['体检中心A', '体检中心B', '体检中心C'],
    Math.floor(Math.random() * 25) + 5,
    3
  )
  const list4 = generateMockData(['项目A', '项目B', '项目C'], Math.floor(Math.random() * 10) + 5, 4)

  switch (radio.value) {
    case 1:
      addList.value = list1
      break
    case 2:
      addList.value = list2
      break
    case 3:
      addList.value = list3
      break
    case 4:
      addList.value = list4
      break
  }
}

// 过滤后带统计行的数据
const filteredAddList = computed(() => {
  const list = [...addList.value].sort((a, b) => a.unitName.localeCompare(b.unitName))

  const result = []
  let i = 0

  while (i < list.length) {
    const currentUnit = list[i].unitName
    const group = []

    while (i < list.length && list[i].unitName === currentUnit) {
      group.push(list[i])
      i++
    }

    // 根据 radio 过滤数据
    let filteredGroup = [...group]
    if (radio.value === 2) {
      filteredGroup = group.filter((item) => item.completionStatus === '检中')
    } else if (radio.value === 3) {
      filteredGroup = group.filter((item) => item.completionStatus === '检完')
    }

    if (filteredGroup.length === 0) continue

    result.push(...filteredGroup)

    // 计算统计行
    let summaryText = ''
    let totalCompleted = 0
    let totalAmount = 0

    for (const item of group) {
      if (item.completedCount) totalCompleted += Number(item.completedCount)
      if (item.amount) totalAmount += parseFloat(item.amount.replace('¥', ''))
    }

    if ([1, 2].includes(radio.value)) {
      summaryText = `
        完成人次：<span style="font-weight:bold;color:#3473d1;">${totalCompleted}</span>人 &nbsp;&nbsp;
        已完成金额：<span style="font-weight:bold;color:#3473d1;">¥${totalAmount.toFixed(2)}</span>
      `
    } else if (radio.value === 3) {
      summaryText = `
        完成人次：<span style="font-weight:bold;color:#3473d1;">${totalCompleted}</span>人
      `
    } else if (radio.value === 4) {
      summaryText = `
        数量合计：<span style="font-weight:bold;color:#3473d1;">${totalCompleted}</span>项
      `
    }

    result.push({
      _isSummary: true,
      unitName: `<span>${summaryText}</span>`
    })
  }

  return result
})

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredAddList.value.slice(start, end)
})

// 合并单元格逻辑
const spanUnitNameMethod = (() => {
  let lastUnitName = ''
  return (params: any) => {
    const { row, column, rowIndex, columnIndex } = params

    if (row._isSummary) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: allColumns.length }
      } else {
        return { rowspan: 0, colspan: 0 }
      }
    }

    if (columnIndex === 0) {
      const globalIndex = (currentPage.value - 1) * pageSize + rowIndex

      const isNewGroup =
        rowIndex === 0 ||
        filteredAddList.value[globalIndex - 1]?._isSummary ||
        (globalIndex > 0 && filteredAddList.value[globalIndex - 1]?.unitName !== row.unitName)

      if (isNewGroup) {
        let count = 1
        while (
          globalIndex + count < filteredAddList.value.length &&
          !filteredAddList.value[globalIndex + count]._isSummary &&
          filteredAddList.value[globalIndex + count].unitName === row.unitName
        ) {
          count++
        }
        lastUnitName = row.unitName
        return { rowspan: count, colspan: 1 }
      } else if (row.unitName === lastUnitName) {
        return { rowspan: 0, colspan: 0 }
      }
    }

    return { rowspan: 1, colspan: 1 }
  }
})()

// 设置行样式
const setAdviceRowClass = () => {
  return 'advice-row'
}

// 分页切换
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 导出和打印占位方法
const exportData = () => {
  console.log('导出')
}
const printData = () => {
  console.log('打印')
}

onMounted(() => {
  handleSaveDocument()
})
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
.advice-row {
  cursor: pointer;
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
  }
}

:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow-y: auto !important;
}
</style>
