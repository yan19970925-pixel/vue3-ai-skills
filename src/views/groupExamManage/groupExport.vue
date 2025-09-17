<template>
  <div class="base-setting">
    <div style="width: 100%">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="base-cont">
          <span class="cont-span mr-6px">单位代码:</span>
          <el-input
            v-model="searchParams.unitCode"
            placeholder="请输入"
            class="select-item !w-180px"
          />
          <span class="cont-span mr-6px">单位名称:</span>
          <el-input
            v-model="searchParams.unitName"
            placeholder="请输入"
            class="select-item !w-180px"
          />
          <span class="ml-24px mr-6px">类别:</span>
          <el-input
            v-model="searchParams.unitType"
            placeholder="请输入"
            class="select-item !w-180px"
          />
          <span class="ml-24px mr-6px">地址:</span>
          <el-input
            v-model="searchParams.address"
            placeholder="请输入"
            class="select-item !w-240px mr-16px"
          />
          <el-button type="primary" @click="search"> 查询 </el-button>
          <!-- <el-button class="resetBtn" @click="handleSaveDocument"> 复位 </el-button
          ><el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button> -->
          <el-button class="resetBtn" @click="exportReportWord">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
        </div>
      </div>
      <div style="padding: 10px; background-color: #fff">
        <!-- 表格 -->
        <el-table
          ref="adviceTableRef"
          :data="paginatedData"
          border
          :row-class-name="paginatedRowClass"
          style="width: 100%; height: calc(100vh - 170px)"
          highlight-current-row
          stripe
          @row-click="handleRowClick"
        >
          <el-table-column
            show-overflow-tooltip
            prop="unitCode"
            label="单位代码"
            width="120"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitName" label="单位名称" width="auto" />
          <el-table-column show-overflow-tooltip prop="address" label="地址" width="350" />
          <el-table-column show-overflow-tooltip prop="connecter" label="联系人" width="160" />
          <el-table-column show-overflow-tooltip prop="phone" label="电话" width="160" />
          <el-table-column show-overflow-tooltip prop="unitNumber" label="编制数" width="160" />
          <el-table-column show-overflow-tooltip prop="unitType" label="单位类别" width="160" />
          <el-table-column show-overflow-tooltip prop="unitVisitId" label="体检次数" width="120" />
          <el-table-column show-overflow-tooltip prop="total" label="已终审人数" width="120" />
        </el-table>
      </div>
    </div>
    <!-- <ExportReport v-if="showExportData" ref="exportReportRef" :data="exportData"></ExportReport> -->
    <div ref="ageDistributionChart" style="width: 650px; height: 400px"></div>
    <div ref="MWabnormalitiesChart" style="width: 650px; height: 400px"></div>
    <div ref="WabnormalitiesChart" style="width: 650px; height: 400px"></div>
    <div ref="MabnormalitiesChart" style="width: 650px; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import ExportReport from '@/views/components/exportWord/Index'
import { getPeUnitResultList, peUnitReportPreview } from '@/api/Dictionary/groupExport/index'
import { exportWordImage, getWordImage } from '@/utils/print/exportFile'
import * as echarts from 'echarts'
// 示例：根据环境使用不同路径
const docPath =
  process.env.NODE_ENV === 'development' ? '../../../public/reportDemo.docx' : '/reportDemo.docx'
const certName = ref('')
const paginatedData = ref<any>([])
const searchParams = reactive({
  unitCode: '',
  unitName: '',
  unitType: '',
  address: ''
})
const paginatedRowClass = ({ row }) => {
  if (row.unitCode == paginatedRowData.value.unitCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const paginatedRowData = ref<Boolean>({})
const handleRowClick = (row: Boolean) => {
  paginatedRowData.value = row
}
// 提取数据按钮点击事件
const search = async () => {
  getPeUnitResultList(searchParams).then((res) => {
    paginatedData.value = res
    paginatedRowData.value = {}
  })
}
//导出数据
const exportData = ref({})
// 导出按钮点击事件
const exportReportRef = ref<InstanceType<typeof ExportReport> | null>(null)
const exportReportWord = async () => {
  if (paginatedRowData.value.unitCode != '' && paginatedRowData.value.unitCode) {
    peUnitReportPreview({
      unitCode: paginatedRowData.value.unitCode,
      unitVisitId: paginatedRowData.value.unitVisitId
    }).then(async (res) => {
      if (res) {
        exportData.value = res
        if (res.groupingDictDOList && res.groupingDictDOList.length > 0) {
          let itemListName = []
          res.groupingDictDOList.forEach((item) => {
            if (item.itemListSelected && item.itemListSelected.length > 0) {
              item.itemListSelected.forEach((item1) => {
                if (item1.itemAssemName) {
                  itemListName.push(item1.itemAssemName)
                }
              })
            }
          })
          exportData.value.itemListName = itemListName.join(',')
        }
        if (exportData.value.diagnosisCountList && exportData.value.diagnosisCountList.length > 0) {
          exportData.value.MWtotal = exportData.value.diagnosisCountList.length
          res.diagnosisCountList.forEach((item, index) => {
            item.index = index + 1
            if (item.personalList && item.personalList.length > 0) {
              item.personalList.forEach((item1, index1) => {
                item1.order = index1 + 1
              })
            }
          })
        }
        if (
          exportData.value.diagnosisCountListFemale &&
          exportData.value.diagnosisCountListFemale.length > 0
        ) {
          exportData.value.Wtotal = exportData.value.diagnosisCountListFemale.length
          res.diagnosisCountListFemale.forEach((item, index) => {
            item.index = index + 1
            if (item.personalList && item.personalList.length > 0) {
              item.personalList.forEach((item1, index1) => {
                item1.order = index1 + 1
              })
            }
          })
        }
        if (
          exportData.value.diagnosisCountListMale &&
          exportData.value.diagnosisCountListMale.length > 0
        ) {
          exportData.value.Mtotal = exportData.value.diagnosisCountListMale.length
          res.diagnosisCountListMale.forEach((item, index) => {
            item.index = index + 1
            if (item.personalList && item.personalList.length > 0) {
              item.personalList.forEach((item1, index1) => {
                item1.order = index1 + 1
              })
            }
          })
        }

        await loadEchartOptions()
        await getBase64()
        // showExportData.value = true
        nextTick(() => {
          exportWordImage(docPath, exportData.value, exportData.value.unitName, imgSize.value)
          exportReportRef.value?.downLoad()
        })
      } else {
        ElMessage.error('暂无数据导出')
      }
    })
  } else {
    ElMessage.error('请选择要导出的体检单位')
  }
}
const imgSize = ref({
  ageDistributionChart: [650, 400],
  MWabnormalitiesChart: [650, 400],
  WabnormalitiesChart: [650, 400],
  MabnormalitiesChart: [650, 400]
})
//参检人员年龄分布图
const ageDistributionChart = ref(null)
//男女疾病分布图
const MWabnormalitiesChart = ref(null)
//女性疾病分布图
const WabnormalitiesChart = ref(null)
//男性疾病分布图
const MabnormalitiesChart = ref(null)
const loadEchartOptions = () => {
  let ageChart = null
  if (!ageDistributionChart.value) {
    return
  } else {
    ageChart = echarts.init(ageDistributionChart.value)
    ageChart.setOption({
      animation: false,
      legend: {
        data: ['男性', '女性', '总计'],
        top: 'bottom',
        padding: [0, 0, 20, 0]
      },
      xAxis: {
        type: 'category',
        data: exportData.value.ageCountList?.map((item) => item.age)
      },
      yAxis: {
        type: 'value',
        name: '人数',
        show: true
      },
      series: [
        {
          name: '男性',
          type: 'bar',
          data: exportData.value.ageCountList?.map((item) => item.man),
          label: { show: true, position: 'top' }
        },
        {
          name: '女性',
          type: 'bar',
          data: exportData.value.ageCountList?.map((item) => item.woman),
          label: { show: true, position: 'top' }
        },
        {
          name: '总计',
          type: 'bar',
          data: exportData.value.ageCountList?.map((item) => item.total),
          label: { show: true, position: 'top' }
        }
      ]
    })
  }
  let MWchart = null
  if (!MWabnormalitiesChart.value) {
    return
  } else {
    MWchart = echarts.init(MWabnormalitiesChart.value)

    // 1. 提取疾病名称（recContent），作为 xAxis categories 和 legend data
    const diseases = exportData.value.diagnosisCountList?.map((item) => item.recContent) || []
    // 智能颜色分配（基于哈希值确保一致性）
    const getStableColor = (name) => {
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      return `hsl(${hash % 360}, 70%, 60%)`
    }

    const option = {
      animation: false,
      color: diseases.map(getStableColor), // 稳定颜色分配
      legend: {
        data: diseases,
        type: 'scroll',
        top: 'bottom',
        pageIconColor: '#333',
        pageTextStyle: { color: '#666' }
      },
      xAxis: {
        type: 'category',
        data: diseases,
        axisLabel: {
          interval: 0,
          rotate: diseases.some((n) => n.length > 8) ? 30 : 0,
          formatter: (n) => (n.length > 12 ? `${n.substring(0, 5)}...` : n)
        }
      },
      yAxis: { type: 'value', name: '人数' },
      series: [
        {
          type: 'bar',
          data:
            exportData.value.diagnosisCountList?.map((item) => ({
              value: item.tempTotal,
              itemStyle: { color: getStableColor(item.recContent) }
            })) || [],
          barWidth: '50%',
          label: { show: true, position: 'top' }
        }
      ]
    }
    MWchart.setOption(option)
  }
  let Wchart = null
  if (!WabnormalitiesChart.value) {
    return
  } else {
    Wchart = echarts.init(WabnormalitiesChart.value)

    // 1. 提取疾病名称（recContent），作为 xAxis categories 和 legend data
    const diseases = exportData.value.diagnosisCountListFemale?.map((item) => item.recContent) || []
    // 智能颜色分配（基于哈希值确保一致性）
    const getStableColor = (name) => {
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      return `hsl(${hash % 360}, 70%, 60%)`
    }

    const option = {
      animation: false,
      color: diseases.map(getStableColor), // 稳定颜色分配
      legend: {
        data: diseases,
        type: 'scroll',
        top: 'bottom',
        pageIconColor: '#333',
        pageTextStyle: { color: '#666' }
      },
      xAxis: {
        type: 'category',
        data: diseases,
        axisLabel: {
          interval: 0,
          rotate: diseases.some((n) => n.length > 8) ? 30 : 0,
          formatter: (n) => (n.length > 12 ? `${n.substring(0, 5)}...` : n)
        }
      },
      yAxis: { type: 'value', name: '人数' },
      series: [
        {
          type: 'bar',
          data:
            exportData.value.diagnosisCountListFemale?.map((item) => ({
              value: item.tempTotal,
              itemStyle: { color: getStableColor(item.recContent) }
            })) || [],
          barWidth: '50%',
          label: { show: true, position: 'top' }
        }
      ]
    }
    Wchart.setOption(option)
  }
  let Mchart = null
  if (!MabnormalitiesChart.value) {
    return
  } else {
    Mchart = echarts.init(MabnormalitiesChart.value)

    // 1. 提取疾病名称（recContent），作为 xAxis categories 和 legend data
    const diseases = exportData.value.diagnosisCountListMale?.map((item) => item.recContent) || []
    // 智能颜色分配（基于哈希值确保一致性）
    const getStableColor = (name) => {
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      return `hsl(${hash % 360}, 70%, 60%)`
    }

    const option = {
      animation: false,
      color: diseases.map(getStableColor), // 稳定颜色分配
      legend: {
        data: diseases,
        type: 'scroll',
        top: 'bottom',
        pageIconColor: '#333',
        pageTextStyle: { color: '#666' }
      },
      xAxis: {
        type: 'category',
        data: diseases,
        axisLabel: {
          interval: 0,
          rotate: diseases.some((n) => n.length > 8) ? 30 : 0,
          formatter: (n) => (n.length > 12 ? `${n.substring(0, 5)}...` : n)
        }
      },
      yAxis: { type: 'value', name: '人数' },
      series: [
        {
          type: 'bar',
          data:
            exportData.value.diagnosisCountListMale?.map((item) => ({
              value: item.tempTotal,
              itemStyle: { color: getStableColor(item.recContent) }
            })) || [],
          barWidth: '50%',
          label: { show: true, position: 'top' }
        }
      ]
    }
    Mchart.setOption(option)
  }
  window.addEventListener('resize', () => {
    ageChart.resize()
    MWchart.resize()
    Wchart.resize()
    Mchart.resize()
  })
  nextTick(() => {
    ageDistributionChart.value = ageChart
    MWabnormalitiesChart.value = MWchart
    WabnormalitiesChart.value = Wchart
    MabnormalitiesChart.value = Mchart
  })
}
const getBase64 = () => {
  if (ageDistributionChart.value) {
    // 检查是否是ECharts实例
    if (typeof ageDistributionChart.value.getDataURL !== 'function') {
      console.error('当前对象不是有效的ECharts实例', ageDistributionChart.value)
      return
    }
    try {
      const ageBase64 = ageDistributionChart.value.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
      exportData.value.ageDistributionChart = ageBase64 // 年龄分布图片
    } catch (error) {
      console.error('获取图片失败', error)
    }
  }
  if (MWabnormalitiesChart.value) {
    const MWBase64 = MWabnormalitiesChart.value.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    exportData.value.MWabnormalitiesChart = MWBase64 // 男女疾病分布图
  }
  if (WabnormalitiesChart.value) {
    const WBase64 = WabnormalitiesChart.value.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    exportData.value.WabnormalitiesChart = WBase64 // 女性疾病分布图
  }
  if (MabnormalitiesChart.value) {
    const Mbase64 = MabnormalitiesChart.value.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    exportData.value.MabnormalitiesChart = Mbase64 // 男性疾病分布图
  }
}
// const showExportData = ref(false)
onMounted(() => {
  search()
})
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #edf1fc;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 8px;
  box-sizing: border-box;
}
.base-cont {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  gap: 6px;
  padding: 6px;

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
  padding: 0 15px;
}
.resetBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}
</style>

<style>
.el-table--default .cell {
  padding: 0 6px !important;
}
</style>
