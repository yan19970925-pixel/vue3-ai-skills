<template>
  <div class="main">
    <div class="base-box">
      <div class="form">
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">体检号:</span>
            <el-input
              v-model="searchKeyword.peId"
              clearable
              placeholder="请输入"
              style="width: 180px"
            />
            <span class="label-fixed-width">体检次数:</span>
            <el-input
              v-model="searchKeyword.peVisitId"
              clearable
              placeholder="请输入"
              style="width: 100px"
            />
          </div>
          <el-button type="primary" @click="getWeiJiZhiList">查询</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px table-container" style="padding: 10px; background-color: #fff; height: 100%">
      <el-table
        ref="adviceTableRef"
        :data="crisisData"
        border
        style="width: 100%; height: calc(100vh - 240px)"
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
          <template #default="scope" v-if="item.prop == 'abnormalIndicator'">
            <span
              :style="[
                scope.row.abnormalIndicator == 'H'
                  ? { color: 'red', fontWeight: 'bold' }
                  : scope.row.abnormalIndicator == 'L'
                  ? { color: 'green', fontWeight: 'bold' }
                  : {}
              ]"
              >{{
                scope.row.abnormalIndicator == 'H'
                  ? '⬆ 偏高'
                  : scope.row.abnormalIndicator == 'L'
                  ? '⬇ 偏低'
                  : ''
              }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getPeAbnormalItemList } from '@/api/PerPhyExamination/perExamination/index'
const searchKeyword = ref({
  peId: '',
  peVisitId: ''
})
onMounted(async () => {
  await getWeiJiZhiList()
})
const crisisData = ref<any>([])
const addColumns = [
  { prop: 'peId', label: '体检号', align: 'center', width: '120px' },
  { prop: 'peVisitId', label: '次数', align: 'center', width: '100px' },
  { prop: 'name', label: '姓名', align: 'center', width: '160px' },
  { prop: 'sex', label: '性别', align: 'center', width: '80px' },
  { prop: 'age', label: '年龄', align: 'center', width: '80px' },
  { prop: 'itemName', label: '项目名称', align: 'center' },
  { prop: 'peResult', label: '结果', align: 'center', width: '80px' },
  { prop: 'abnormalIndicator', label: '提示', align: 'center', width: '100px' },
  { prop: 'printContext', label: '参考范围', align: 'center', width: '120px' },
  { prop: 'units', label: '单位', align: 'center', width: '140px' }
]
const getWeiJiZhiList = () => {
  getPeAbnormalItemList(searchKeyword.value).then((res) => {
    crisisData.value = res
  })
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
</style>
