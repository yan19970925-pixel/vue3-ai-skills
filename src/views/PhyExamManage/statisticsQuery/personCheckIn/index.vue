<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="cont-span">单位代码:</span>
            <el-input
              style="width: 12vw"
              v-model="certName"
              placeholder="请输入"
              class="select-item"
            />
            <span class="label-fixed-width">时间区间:</span>
            <el-date-picker
              style="width: 10%"
              v-model="value2"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-value="[new Date(), new Date()]"
            />
            <el-radio-group v-model="radio">
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">检中</el-radio>
              <el-radio :label="3">检完</el-radio>
              <el-radio :label="4">单位查询（无时间段）</el-radio>
              <el-radio :label="5">签到</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="handleSaveDocument">提取数据</el-button>
          <el-button class="resetBtn" @click="exportData">
            <img
              src="@/assets/imgs/Export2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
          <el-button class="resetBtn" @click="printData">
            <img
              src="@/assets/imgs/print2x.png"
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
            <!-- 判断是否是统计行 -->
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
          <span v-if="radio == 2 || radio == 5">
            合计检中：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检中').length
            }}人
          </span>
          <span v-else-if="radio === 3">
            合计检完：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检完').length
            }}人
          </span>
          <span v-else-if="radio === 4">
            合计检中：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检中').length
            }}人 &nbsp;&nbsp; 合计检完：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检完').length
            }}人 &nbsp;&nbsp;合计未检：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '未检').length
            }}人 &nbsp;&nbsp; 合计人数：{{ filteredAddList.filter((i) => !i._isSummary).length }}人
          </span>
          <span v-else>
            合计检中：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检中').length
            }}人 &nbsp;&nbsp; 合计检完：{{
              filteredAddList.filter((i) => !i._isSummary && i.completionStatus === '检完').length
            }}人 &nbsp;&nbsp; 合计人数：{{ filteredAddList.filter((i) => !i._isSummary).length }}人
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
const certName = ref('')
const value2 = ref([new Date(), new Date()])
const radio = ref(1)
const currentPage = ref(1)
const pageSize = 20

// 所有列定义
const allColumns = [
  { prop: 'unitName', label: '单位名称', align: 'center' },
  { prop: 'physicalExamId', label: '体检号', align: 'center' },
  { prop: 'name', label: '姓名', align: 'center' },
  { prop: 'gender', label: '性别', align: 'center' },
  { prop: 'age', label: '年龄', align: 'center' },
  { prop: 'personalCount', label: '个人次数', align: 'center', width: '120px' },
  { prop: 'completionStatus', label: '完成情况', align: 'center', width: '120px' },
  { prop: 'finishDate', label: '检完日期', align: 'center' },
  { prop: 'reportDate', label: '报到日期', align: 'center', width: '100px' },
  { prop: 'doctor', label: '体检医生', align: 'center' },
  { prop: 'remark', label: '备注', align: 'center' }
]

// 切换radio 为 2、4时只筛选出表格中 completionStatus为 '检中' 的数据和统计行
// 切换radio 为 3时只筛选出表格中 completionStatus为 '检完' 的数据和统计行
// 根据 radio 控制显示哪些列
const visibleColumns = computed(() => {
  if ([2, 3, 5].includes(radio.value)) {
    return allColumns.filter((col) => col.prop !== 'completionStatus')
  }
  return allColumns
})

// mock 数据生成函数
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

function randomName(): string {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']
  return names[Math.floor(Math.random() * names.length)]
}

function generateMockData(unitNames: string[], count: number) {
  const genders = ['男', '女']
  const statuses = ['检中', '检完', '未检']

  const dataList = []

  for (let i = 0; i < count; i++) {
    const unitName = unitNames[Math.floor(Math.random() * unitNames.length)]

    dataList.push({
      unitName,
      physicalExamId: `PE2024${String(i + 1000).slice(-4)}`,
      name: randomName(),
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: String(Math.floor(Math.random() * 50) + 20),
      personalCount: String(Math.floor(Math.random() * 10) + 1),
      completionStatus: statuses[Math.floor(Math.random() * 3)],
      finishDate: i % 3 === 0 ? '' : randomDate(new Date(2024, 0, 1), new Date()),
      reportDate: randomDate(new Date(2024, 0, 1), new Date()),
      doctor: ['张医生', '李医生', '王医生'][Math.floor(Math.random() * 3)],
      remark: i % 5 === 0 ? '特殊备注' : ''
    })
  }

  return dataList
}

// 数据源
const addList = ref([])

// 提取数据按钮点击事件
const handleSaveDocument = () => {
  console.log('提取数据')

  const list1 = generateMockData(['神马单位'], Math.floor(Math.random() * 10) + 5)
  const list2 = generateMockData(['星星单位'], Math.floor(Math.random() * 10) + 5)
  const list3 = generateMockData(['月亮单位'], Math.floor(Math.random() * 15) + 5)

  addList.value = [...list1, ...list2, ...list3]
}

// 过滤后带统计行的数据
const filteredAddList = computed(() => {
  const list = [...addList.value]

  // 先排序
  const sortedList = [...list].sort((a, b) => a.unitName.localeCompare(b.unitName))

  const result = []
  let i = 0

  while (i < sortedList.length) {
    const currentUnit = sortedList[i].unitName
    const group = []

    // 收集相同单位的数据
    while (i < sortedList.length && sortedList[i].unitName === currentUnit) {
      group.push(sortedList[i])
      i++
    }

    // 备份原始 group 用于计算统计行
    const originalGroup = [...group]

    // 根据 radio 过滤数据
    let filteredGroup = group
    if (radio.value === 2 || radio.value === 5) {
      filteredGroup = group.filter((item) => item.completionStatus === '检中')
    } else if (radio.value === 3) {
      filteredGroup = group.filter((item) => item.completionStatus === '检完')
    }

    // 如果过滤后为空则不加入该单位
    if (filteredGroup.length === 0) continue

    // 添加单位数据
    result.push(...filteredGroup)

    // 添加统计行
    const inCount = originalGroup.filter((item) => item.completionStatus === '检中').length
    const outCount = originalGroup.filter((item) => item.completionStatus === '检完').length

    let summaryText = ''

    if ([2, 5].includes(radio.value)) {
      summaryText = `检中：<span style="font-weight:bold;color:#3473d1;">${inCount}</span>人`
    } else if (radio.value === 3) {
      summaryText = `检完：<span style="font-weight:bold;color:#3473d1;">${outCount}</span>人`
    } else if (radio.value === 4) {
      summaryText = `
        检中：<span style="font-weight:bold;color:#3473d1;">${inCount}</span>人 &nbsp;&nbsp;
        检完：<span style="font-weight:bold;color:#3473d1;">${outCount}</span>人
      `
    } else {
      summaryText = `
        检中：<span style="font-weight:bold;color:#3473d1;">${inCount}</span>人 &nbsp;&nbsp;
        检完：<span style="font-weight:bold;color:#3473d1;">${outCount}</span>人
      `
    }

    // ✅ 允许 radio=2/3/5 显示统计行
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

// 单位名称合并逻辑
const spanUnitNameMethod = (() => {
  let lastUnitName = ''
  return (params: any) => {
    const { row, column, rowIndex, columnIndex } = params

    // 统计行跨所有列
    if (row._isSummary) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: allColumns.length }
      } else {
        return { rowspan: 0, colspan: 0 }
      }
    }

    // 只处理“单位名称”列
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
.advice-list-table .el-table__header-wrapper th {
  background-color: #f5f7fa !important;
}

.form {
  background-color: #fff;
  padding: 8px 8px 20px 8px;
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

    &.dif &::before {
      width: 170px;
    }
  }
}

:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow-y: auto !important;
}
</style>
