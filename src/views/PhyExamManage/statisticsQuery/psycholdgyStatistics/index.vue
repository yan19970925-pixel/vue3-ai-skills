<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-8px" style="background-color: #fff">
        <div class="base-cont">
          <span class="cont-span">统计时间:</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="searchParams.preBeginDate"
            value-format="YYYY-MM-DD"
            @change="search"
          />
          <span class="ml-6px mr-6px">至</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="searchParams.preEndDate"
            value-format="YYYY-MM-DD"
            @change="search"
          />
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <div class="mt-4px" style="padding: 10px; background-color: #fff">
        <!-- <el-table
          ref="adviceTableRef"
          :data="tableData"
          border
          style="width: 540px; height: calc(100vh - 170px)"
          highlight-current-row
          stripe
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
          </el-table-column>
        </el-table> -->
        <div class="r-left-inp">
          <p
            class="message-title"
            style="color: #333; font-size: 18px; width: 100%; text-align: center; font-weight: bold"
            >心理问卷统计</p
          >
          <div
            ref="checkupAllRef"
            style="width: 98%; height: calc(100vh - 190px); position: relative"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, computed } from 'vue'
import { formatDate } from '@/utils/formatTime'
import * as Api from '@/api/PerPhyExamination/QuestionSurvey/index'
import { da } from 'element-plus/es/locale'
// const allColumns = [
//   { prop: 'peDeptName', label: '科室名称', align: 'center', width: '300px' },
//   { prop: 'peDeptCode', label: '科室编码', align: 'center', width: '110px' },
//   { prop: 'peItemCount', label: '工作量', align: 'center', width: '120px' }
// ]
const searchParams = ref({
  preBeginDate: formatDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
  preEndDate: formatDate(new Date(), 'YYYY-MM-DD')
})
const tableData = ref([])
const search = async () => {
  tableData.value = await Api.getQuestionnairePercent(searchParams.value)
  nextTick(() => {
    showAllCheckupChart(tableData.value)
  })
}
const checkupAllRef = ref<HTMLDivElement | null>(null)
const showAllCheckupChart = (data: []) => {
  if (data) {
    // let xData = [],
    //   yData = []
    // data.forEach((item) => {
    //   xData.push(item.peDeptName)
    //   yData.push(item.peItemCount)
    // })
    if (checkupAllRef.value) {
      const chartInstance = echarts.init(checkupAllRef.value)
      window.addEventListener('resize', () => {
        chartInstance.resize()
      })
      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
          // show: false // 隐藏图例
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false // 隐藏引导线
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            data: [
              {
                value: data.questionPeople,
                name: '已完成',
                itemStyle: {
                  color: '#165DFF' // 为“团检”设置颜色，例如番茄红
                }
              },
              {
                value: data.visitCount - data.questionPeople,
                name: '未完成',
                itemStyle: {
                  color: '#F7BA1E' // 为“个检”设置颜色，例如钢蓝色
                }
              }
            ]
          }
        ]
      }
      chartInstance.setOption(option)
    }
  }
}
onMounted(() => {
  search()
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
    width: 80px;
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
.mt-4px {
  display: flex;
  justify-content: space-between;
  .r-left-inp {
    height: 100%;
    width: calc(100vw - 550px);
  }
}
</style>
