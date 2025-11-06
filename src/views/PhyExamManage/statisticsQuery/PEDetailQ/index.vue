<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-8px" style="background-color: #fff">
        <div class="base-cont">
          <span class="span1" style="margin-left: 10px"> 预约时间区间：</span>
          <!-- format="YYYY-MM-DD" -->
          <div style="width: 346px">
            <el-date-picker
              v-model="time"
              value-format="YYYY-MM-DD"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              @change="getOpjectList()"
              :default-time="[
                formatDate(new Date(), 'YYYY-MM-DD'),
                formatDate(new Date(), 'YYYY-MM-DD')
              ]"
            />
          </div>
          <el-button type="primary" @click="getOpjectList">查询</el-button>
          <!-- <span class="cont-span">检查类型:</span>
          <el-select v-model="value" placeholder="请选择" style="width: 12vw">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span class="cont-span">项目代码:</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">项目名称:</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          /> -->
        </div>
        <!-- <div class="base-cont">
          <span class="cont-span">统计方式:</span>
          <el-radio-group v-model="radio">
            <el-radio :label="1">统计单位</el-radio>
          </el-radio-group>
          <span class="cont-span">单位代码:</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">体检次数:</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <el-checkbox v-model="checked1" style="" label="子单位" />

          <el-radio-group v-model="radio">
            <el-radio :label="2">统计个人</el-radio>
          </el-radio-group>
          <span class="cont-span">报到时间:</span>
          <el-date-picker
            style="width: 12vw"
            v-model="value1"
            type="date"
            placeholder="请选择"
            :default-value="new Date()"
          />

          <el-radio-group v-model="radio">
            <el-radio :label="3">统计项目</el-radio>
          </el-radio-group>
          <el-checkbox v-model="checked4" @change="handleCheckboxChange('unit')" label="单位" />
          <el-checkbox v-model="checked3" @change="handleCheckboxChange('person')" label="个人" />
          <span class="cont-span">完成时间:</span>
          <el-date-picker
            style="width: 12vw"
            v-model="value1"
            type="date"
            placeholder="请选择"
            :default-value="new Date()"
          />
        </div> -->
        <!-- <div class="base-cont">
          <span class="cont-span" style="width: 1vw"></span>

          <el-button type="primary" @click="handleSaveDocument">统计</el-button>
          <el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button>
          <el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
        </div> -->
      </div>
      <div class="mt-4px table_con" style="padding: 10px; background-color: #fff">
        <div class="left_table">
          <div
            style="
              height: 40px;
              line-height: 40px;
              font-size: 18px;
              padding: 0 20px;
              color: #3473d1;
              border-bottom: 2px solid #3473d1;
              margin-bottom: 8px;
            "
            >项目数量（{{ objectList.length }}个）</div
          >
          <el-table
            ref="adviceTableRef"
            :data="objectList"
            border
            :row-class-name="setRowClassName"
            style="width: 100%; height: calc(100vh - 220px)"
            highlight-current-row
            @row-click="clickLeftRow"
            stripe
          >
            <el-table-column
              v-for="item in leftColumns"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <!-- <template v-slot="{ row }">
                <div v-if="row._isSummary" v-html="row.unitName" style="text-align: left"></div>
                <div v-else>{{ row[item.prop] }}</div>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
        <div class="right_table">
          <div
            style="
              height: 40px;
              line-height: 40px;
              font-size: 18px;
              padding: 0 20px;
              color: #3473d1;
              border-bottom: 2px solid #3473d1;
              margin-bottom: 8px;
            "
            >人数（{{ personalList.length }}人）</div
          >
          <el-table
            ref="adviceTableRef"
            :data="personalList"
            border
            style="width: 100%; height: calc(100vh - 220px)"
            highlight-current-row
            stripe
          >
            <el-table-column
              v-for="item in rightColumns"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <!-- <template v-slot="{ row }">
                <div v-if="row._isSummary" v-html="row.unitName" style="text-align: left"></div>
                <div v-else>{{ row[item.prop] }}</div>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/PerPhyExamination/QuestionSurvey/index'
import { formatDate } from '@/utils/formatTime'
const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])

// 所有列定义
const leftColumns = [
  { prop: 'peDeptName', label: '科室名称', align: 'center', width: '120px' },
  { prop: 'itemAssemName', label: '项目名称', align: 'center' },
  { prop: 'costs', label: '价格', align: 'center', width: '60px' },
  { prop: 'finishedAmount', label: '完成数量', align: 'center', width: '100px' },
  { prop: 'notFinishedAmount', label: '未完成数量', align: 'center', width: '100px' }
]
// 所有列定义
const rightColumns = [
  { prop: 'peId', label: '体检号', align: 'center', width: '120px' },
  { prop: 'peVisitId', label: '体检次数', align: 'center', width: '100px' },
  { prop: 'name', label: '姓名', align: 'center', width: '120px' },
  { prop: 'sex', label: '性别', align: 'center', width: '120px' },
  { prop: 'peQueueDate', label: '体检日期', align: 'center' }
]
const objectList = ref([])
const leftTableRow = ref({})
const setRowClassName = ({ row }) => {
  if (row.itemAssemCode == leftTableRow.value.itemAssemCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const personalList = ref([])

const clickLeftRow = async (row) => {
  leftTableRow.value = row
  let params = {
    preBeginDate: time.value[0] || '',
    preEndDate: time.value[1] || '',
    itemAssemCode: row.itemAssemCode
  }
  personalList.value = await Api.getTimeItemPerson(params)
}
const getOpjectList = async () => {
  let params = {
    preBeginDate: time.value[0] || '',
    preEndDate: time.value[1] || '',
    itemAssemCode: ''
  }
  objectList.value = await Api.getTimeItemCount(params)
  if (objectList.value.length > 0) {
    clickLeftRow(objectList.value[0])
  }
}
onMounted(() => {
  getOpjectList()
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
  width: 800px;
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
.table_con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left_table {
    width: 49.6%;
  }
  .right_table {
    width: 49.6%;
  }
}
</style>
