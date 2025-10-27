<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">复检日期:</span>
            <el-date-picker style="width: 140px" v-model="params.reCheckDate" type="date" />
          </div>
          <span class="span1">体检号：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="params.peId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px" style="padding: 10px; background-color: #fff; height: calc(100vh - 176px)">
      <el-table
        ref="adviceTableRef"
        :data="recheckData"
        border
        style="width: 100%; height: 100%"
        highlight-current-row
        stripe
      >
        <el-table-column
          v-for="item in recheckColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import * as Api from '@/api/PerPhyExamination/statisticsQuery/personArrived/index'
const params = ref({
  peId: '',
  peVisitId: '',
  abnormalItemRemark: '',
  reCheckDate: ''
})
const recheckData = ref([])
const recheckColumns = ref([
  {
    label: '体检号',
    prop: 'peId',
    align: 'center',
    width: 120
  },
  {
    label: '体检次数',
    prop: 'peVisitId',
    align: 'center',
    width: 100
  },
  {
    label: '复检日期',
    prop: 'reCheckDate',
    align: 'center',
    width: 160
  },
  {
    label: '复检原因',
    prop: 'abnormalItemRemark',
    align: 'center'
  }
])
const search = () => {
  Api.getReCheckPlanList(params.value).then((res) => {
    recheckData.value = res
  })
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
