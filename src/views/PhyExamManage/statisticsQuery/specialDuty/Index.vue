<template>
  <div class="special-duty-container">
    <div class="box">
      <div class="title">特勤人员查询</div>
      <div class="content">
        <div class="search-box">
          <span>日期范围：</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 320px"
            class="compact-datepicker"
          ></el-date-picker>
          <!-- :disabled-date="disabledDate" -->
          <el-button type="primary" @click="handleQuery" style="margin-top: -6px">查询</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%" border height="calc(100vh - 200px)">
          <el-table-column prop="peId" label="体检号" width="120"></el-table-column>
          <el-table-column
            prop="peVisitId"
            label="体检次数"
            width="120"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="80"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="80"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话"
            width="160"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="idNo"
            label="身份证"
            width="200"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="maritalStatus"
            label="婚姻状态"
            width="120"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="pePreDate"
            label="预约体检时间"
            width="160"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="unitname"
            label="单位名称"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="peTypeName"
            label="体检类型"
            width="180"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/PerPhyExamination/perExamination/index.ts'
import { formatDate } from '@/utils/formatTime'

const dateRange = ref<[string, string]>(['', ''])
const tableData = ref([])

// 禁用未来日期
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

// 获取最近30天的日期范围
const getLast30Days = () => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)

  return [formatDate(startDate, 'YYYY-MM-DD'), formatDate(endDate, 'YYYY-MM-DD')]
}

// 查询方法
const handleQuery = () => {
  if (!dateRange.value[0] || !dateRange.value[1]) {
    alert('请选择完整的日期范围')
    return
  }

  Api.selectPeVisitList({
    preBeginDate: dateRange.value[0],
    preEndDate: dateRange.value[1],
    isSpecial: 1
  }).then((res) => {
    tableData.value = res
  })
}

onMounted(() => {
  // 初始化为最近30天
  dateRange.value = getLast30Days()
  // 自动查询
  handleQuery()
})
</script>
<style lang="scss" scoped>
.special-duty-container {
  background-color: #edf1fc;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100vw;
  height: calc(100vh - 54px);
  overflow: auto;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .box {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    height: calc(100vh - 106px);
  }
  .title {
    margin-bottom: 8px;
    width: 100px;
    background-color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid #234fd8;
  }
  .content {
    width: 100%;
    .search-box {
      width: 100%;
      height: 40px;
      line-height: 40px;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
