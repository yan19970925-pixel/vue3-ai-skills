<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">时间区间:</span>
            <el-date-picker
              style="width: 10%"
              v-model="time"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :default-value="[new Date(), new Date()]"
            />
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px" style="padding: 10px; background-color: #fff; height: calc(100vh - 176px)">
      <el-table
        ref="adviceTableRef"
        :data="tableData"
        border
        style="width: 100%; height: calc(100vh - 240px)"
        highlight-current-row
      >
        <el-table-column
          v-for="item in allColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
          <template #default="{ row }" v-if="item.prop == 'betweenDate'">
            <div>{{ (Number(row.betweenDate) / 60).toFixed(2) }}（h）</div>
          </template>
        </el-table-column>
      </el-table>
      <div
        style="height: 40px; line-height: 40px; padding: 0 20px; color: #3473d1; font-size: 20px"
      >
        平均完成时间：
        {{
          averageTime
            ? (Number(averageTime ? averageTime : 0) / 60 / tableData.length).toFixed(2)
            : 0
        }}（h）
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/PerPhyExamination/statisticsQuery/personCheckIn/index'
// 所有列定义
const allColumns = [
  { prop: 'unitName', label: '单位名称', align: 'center' },
  { prop: 'peId', label: '体检号', align: 'center', width: '140px' },
  { prop: 'peVisitId', label: '体检次数', align: 'center', width: '120px' },
  { prop: 'name', label: '姓名', align: 'center', width: '160px' },
  { prop: 'sex', label: '性别', align: 'center', width: '90px' },
  { prop: 'age', label: '年龄', align: 'center', width: '100px' },
  { prop: 'maritalStatus', label: '婚姻状况', align: 'center', width: '120px' },
  { prop: 'dateOfReg', label: '登记日期', align: 'center', width: '180px' },
  { prop: 'betweenDate', label: '完成总时间', align: 'center', width: '160px' }
]
const time = ref([])
const tableData = ref([])
const averageTime = ref(0)
const search = () => {
  let params = {
    startDate: time.value && time.value.length > 0 ? time.value[0] : '',
    endDate: time.value && time.value.length > 0 ? time.value[1] : ''
  }
  Api.getExamFinishTimeCount(params)
    .then((result) => {
      tableData.value = result.ExamFinishTimeCountRespVo
      averageTime.value = result.averageTime
    })
    .catch((err) => {})
}
onMounted(() => {
  search()
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
