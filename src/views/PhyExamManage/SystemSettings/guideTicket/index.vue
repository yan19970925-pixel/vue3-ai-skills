<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="content">
        <!-- <div class="base-title">指引单列表</div> -->

        <div class="base-cont mt-4px">
          <el-button class="resetBtn" @click="savePeChartDict(1)">
            <el-icon><Plus /></el-icon>新增
          </el-button>
          <!-- <el-button type="danger" @click="delPeChartDict">删除</el-button> -->
          <el-button type="primary" @click="savePeChartDict(2)">保存</el-button>
        </div>
        <el-table
          :data="ChartDictList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
          @current-change="handleRowClick"
        >
          <el-table-column
            v-for="item in addColumns"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
            @row-click="handleRowClick"
          >
            <template #default="{ row }">
              <div v-if="item.prop === 'chartStatus'">
                <el-select
                  @change="handleRowClick(row)"
                  v-model="row.chartStatus"
                  size="small"
                  style="width: 100%"
                >
                  <el-option label="正常" value="0" />
                  <el-option label="停用" value="1" />
                </el-select>
              </div>
              <div v-else>
                <el-input v-model="row[item.prop]" size="small" />
              </div>
            </template>
          </el-table-column>
          <!-- 添加一个操作列 功能：删除 -->
          <el-table-column label="操作" width="100" align="center">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                style="color: red"
                @click="delPeChartDict(scope.row)"
              >
                删除
              </el-button>
              <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/systemSetting/guideTicket/index'
// ===================== 响应式数据 =====================
const ChartDictList = ref([])
// ===================== 表格列 =====================
const addColumns = ref([
  { prop: 'chartCode', label: '区域代码', align: 'center', width: 200 },
  { prop: 'chartNo', label: '序号', align: 'center', width: 100 },
  { prop: 'chartName', label: '体检区域名称', align: 'center', width: 300 },
  { prop: 'chartDescribe', label: '提示描述', align: 'center' },
  { prop: 'chartStatus', label: '状态', align: 'center', width: 100 }
])
// ===================== 获取数据 =====================
const chartCode = ref('')
const getPeChartDictList = async () => {
  await Api.getPeChartDictList({}).then((res) => {
    // res 根据chartCode字段按照1到0排序
    res.sort((a, b) => {
      return a.chartCode.localeCompare(b.chartCode)
    })
    ChartDictList.value = res
    chartCode.value = String(Number(res[res.length - 1].chartCode) + 1)
    chartCode.value = chartCode.value.padStart(3, '0')
    if (res.length > 0) {
      handleRowClick(res[0])
    }
  })
}
const RowInfo = ref({})
// ===================== 点击行 =====================
const handleRowClick = (row: any) => {
  RowInfo.value = row
}
// ===================== 保存 =====================
const savePeChartDict = async (optionFlag = 2) => {
  await Api.savePeChartDict({
    list: [
      {
        chartCode: optionFlag == 2 ? RowInfo.value.chartCode : chartCode.value,
        chartNo: optionFlag == 2 ? RowInfo.value.chartNo : 0,
        chartName: optionFlag == 2 ? RowInfo.value.chartName : '',
        chartDescribe: optionFlag == 2 ? RowInfo.value.chartDescribe : '',
        chartStatus: optionFlag == 2 ? RowInfo.value.chartStatus : '',
        optionFlag: optionFlag
      }
    ]
  }).then((res) => {
    if (res) getPeChartDictList()
    if (optionFlag == 1) {
      ElMessage.success('新增成功')
      // 在 savePeChartDict 的 then 分支中添加
      setTimeout(() => {
        // 获取所有行
        const rows = document.querySelectorAll('.el-table__row')
        if (rows.length > 0) {
          // 获取最后一行
          const lastRow = rows[rows.length - 1]

          // 查找该行第一列的 input
          const firstInput = lastRow.querySelector('.el-table__cell:nth-child(1) input')

          if (firstInput) {
            firstInput.focus()
            console.log('✅ 已聚焦到最后一行第一列 input')
          } else {
            console.warn('❌ 未找到最后一行第一列的 input')
          }
        }
      }, 100)
    } else if (optionFlag == 2) {
      ElMessage.success('保存成功')
    }
  })
}
// ===================== 删除 =====================
const delPeChartDict = async (row) => {
  await Api.delPeChartDict({
    chartCode: row.chartCode || RowInfo.value.chartCode
  }).then((res) => {
    if (res) getPeChartDictList()
    ElMessage.success('删除成功')
  })
}
// ===================== 生命周期 =====================
onMounted(() => {
  getPeChartDictList()
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
