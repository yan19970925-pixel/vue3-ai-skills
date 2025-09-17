<template>
  <div class="main">
    <div class="base-box">
      <!-- <div class="base-title">病例列表</div> -->
      <div class="form">
        <!-- 第一行 -->
        <div
          class="info mt-6px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">单位代码:</span>
            <el-input
              v-model="searchKeyword"
              @keyup.enter="searchByUnitCode"
              placeholder="请输入"
              style="width: 180px"
            /><span class="selectBtn">
              <el-button :icon="Search" @click="onFocusUnitCode()"
            /></span>
            <span class="label-fixed-width">次数:</span>
            <el-input v-model="searchVisitId" placeholder="请输入" style="width: 180px" />
            <span class="label-fixed-width">名称:</span>
            <el-input v-model="searchCertName" readonly placeholder="请输入" style="width: 180px" />
          </div>

          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button class="resetBtn" @click="emportData">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
          <!-- <el-button class="resetBtn" @click="handleSaveDocument">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button> -->
          <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
        </div>
      </div>
    </div>

    <div
      class="mt-4px table-container"
      style="padding: 10px; background-color: #fff; height: calc(100% - 65px)"
    >
      <!-- 一个tab栏三个tab -->

      <ElTabs v-model="currentActiveType" type="card" style="height: 100%">
        <ElTabPane label="单位体检自然信息" name="Nature" style="margin-bottom: 0px; height: 100%">
          <div class="base-setting" style="height: calc(100vh - 210px)">
            <div class="base-box mb-8px" style="background-color: #fff; height: 80px">
              <!-- <div class="base-title mb-2px">组合详情</div> -->

              <div class="base-cont">
                <span class="cont-span">单位名称:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.unitName"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">联系人:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.connecter"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">电话:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.phone"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">编制数:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.unitNumber"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">体检类别:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.peType"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
              </div>
              <div class="base-cont">
                <span class="cont-span">单位类别:</span>
                <el-input style="width: 12vw" placeholder="请输入" readonly class="select-item" />
                <span class="cont-span">单位地址:</span>
                <el-input
                  style="width: 12vw"
                  v-model="searchParams.address"
                  readonly
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">体检日期:</span>
                <el-date-picker
                  v-model="startDate"
                  style="width: 12vw; display: inline-flex"
                  value-format="YYYY-MM-DD"
                  type="date"
                  ref="appiontStartDateRef"
                  placeholder="请选择"
                />
                <span class="ml-6px mr-6px">至</span>
                <el-date-picker
                  v-model="endDate"
                  style="width: 12vw; display: inline-flex"
                  value-format="YYYY-MM-DD"
                  type="date"
                  ref="appiontStartDateRef"
                  placeholder="请选择"
                />
                <el-button type="primary" @click="changeDate()">查看</el-button>
                <span>总人数：{{ tableList.length }}</span>
              </div>
            </div>
            <div style="width: 100%; height: calc(100% - 0px); background-color: pink">
              <div class="content">
                <el-table
                  :data="tableList"
                  border
                  class="mt-6px"
                  style="width: 100%; height: calc(100% - 104px); min-height: 300px; overflow: auto"
                  highlight-current-row
                  stripe
                >
                  <!-- 选择 -->
                  <el-table-column type="selection" width="40" />
                  <el-table-column
                    label="体检号"
                    prop="peId"
                    align="center"
                    width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="次数"
                    prop="peVisitId"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column label="姓名" prop="name" align="center" show-overflow-tooltip />
                  <!-- <el-table-column label="年龄" prop="sex" show-overflow-tooltip /> -->
                  <el-table-column
                    label="体检日期"
                    prop="pePreDate"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="婚姻"
                    prop="maritalStatus"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="职务"
                    prop="deptname"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="出生日期"
                    prop="dateOfBirth"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="结算标志"
                    prop="finishedSign"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="预约人员"
                    prop="pePreOperator"
                    align="center"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
            </div>
          </div>
        </ElTabPane>
        <ElTabPane
          label="单位体检项目预定及完成情况"
          name="Scheduled"
          style="margin-bottom: 0px; height: 100%"
        >
          <div class="base-setting" style="height: calc(100vh - 210px)">
            <div class="base-box mb-8px" style="background-color: #fff; height: 40px">
              <!-- <div class="base-title mb-2px">组合详情</div> -->

              <div class="base-cont">
                <el-radio-group v-model="radio" @change="changeRadioItem">
                  <el-radio label="1">按体检个人查询体检项目</el-radio>
                  <el-radio label="2">按体检单位体检项目查询</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div style="width: 100%; height: 100%; background-color: pink; display: flex">
              <div class="content" style="flex: 4; padding-right: 6px">
                <el-table
                  :data="tableList"
                  border
                  class="mt-6px"
                  style="width: 100%; height: calc(100% - 64px); min-height: 300px; overflow: auto"
                  highlight-current-row
                  @row-click="searchpersonal"
                  :row-class-name="setRowClassName1"
                  stripe
                >
                  <!-- 选择 -->
                  <el-table-column label="姓名" prop="name" show-overflow-tooltip />
                  <el-table-column label="体检号" prop="peId" width="120" show-overflow-tooltip />
                  <el-table-column label="次数" prop="peVisitId" show-overflow-tooltip />
                </el-table>
              </div>
              <div class="content" style="flex: 14">
                <el-table
                  :data="itemList"
                  border
                  class="mt-6px"
                  style="width: 100%; height: calc(100% - 64px); min-height: 300px; overflow: auto"
                  highlight-current-row
                  stripe
                >
                  <!-- 选择 -->
                  <el-table-column type="selection" width="40" />
                  <el-table-column
                    label="体检项目"
                    prop="itemAssemName"
                    width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    v-if="radio == '1'"
                    label="自费标志"
                    prop="zfSign"
                    show-overflow-tooltip
                  />
                  <el-table-column label="完成标志" prop="finishedSign" show-overflow-tooltip />
                  <el-table-column label="体检科室" prop="peDeptName" show-overflow-tooltip />
                  <el-table-column
                    label="指引单分类"
                    v-if="radio == '1'"
                    prop="chartName"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="体检医生"
                    v-if="radio == '1'"
                    prop="doctor"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="体检日期"
                    v-if="radio == '1'"
                    prop="peDate"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    label="数量"
                    v-if="radio == '2'"
                    prop="amount"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
            </div>
          </div>
        </ElTabPane>
        <ElTabPane label="单位体检费用查询" name="CostQ" style="margin-bottom: 0px; height: 100%">
          <div class="base-setting" style="height: calc(100vh - 210px)">
            <div class="base-box mb-8px" style="background-color: #fff; height: 40px">
              <div class="base-cont">
                <el-radio-group v-model="costRadio" @change="changeCostRadio">
                  <el-radio label="1">按个人查询体检费用</el-radio>
                  <el-radio label="2">按项目查询体检费用</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div style="width: 100%; height: 100%; background-color: pink; display: flex">
              <div class="content" style="flex: 4; padding-right: 6px">
                <el-table
                  :data="tableList"
                  border
                  style="width: 100%; height: calc(100% - 64px); min-height: 300px; overflow: auto"
                  highlight-current-row
                  @row-click="searchpersonalCost"
                  :row-class-name="setRowClassName2"
                  stripe
                >
                  <!-- 选择 -->
                  <el-table-column label="姓名" prop="name" show-overflow-tooltip />
                  <el-table-column label="体检号" prop="peId" width="120" show-overflow-tooltip />
                  <el-table-column label="次数" prop="peVisitId" show-overflow-tooltip />
                </el-table>
              </div>
              <div class="content" style="flex: 14">
                <el-table
                  :data="costList"
                  border
                  style="width: 100%; height: calc(100% - 64px); min-height: 300px; overflow: auto"
                  highlight-current-row
                  stripe
                >
                  <!-- 选择 -->
                  <el-table-column type="selection" width="40" />
                  <el-table-column
                    label="项目代码"
                    prop="itemAssemCode"
                    width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column label="项目名称" prop="itemAssemName" show-overflow-tooltip />
                  <el-table-column label="数量" prop="amount" show-overflow-tooltip />
                  <el-table-column label="应收" prop="costs" show-overflow-tooltip />
                  <el-table-column label="实收" prop="charges" show-overflow-tooltip />
                </el-table>
              </div>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </div>
    <Dialog
      append-to-body
      v-model="selectUnitCodeVisiable"
      title="单位选择"
      width="800"
      @close="selectUnitCodeVisiable = false"
      class="package-advice-container"
    >
      <div
        ><el-input
          ref="queryInput"
          class="queryInput !w-300px"
          v-model="keyWord"
          @input="handleQueryItem"
          autofocus="true"
          placeholder="请输入拼音码"
      /></div>
      <el-table
        :data="unitCodeList"
        border
        style="width: 100%; margin-top: 10px; height: 500px"
        highlight-current-row
        @row-dblclick="selectUnitCodeClick"
        ><el-table-column
          :resizable="false"
          align="center"
          label="单位代码"
          show-overflow-tooltip
          prop="unitCode"
          width="100" /><el-table-column
          :resizable="false"
          align="left"
          label="单位名称"
          show-overflow-tooltip
          prop="unitName" /><el-table-column
          :resizable="false"
          align="center"
          label="联系人"
          width="100"
          show-overflow-tooltip
          prop="connecter" /><el-table-column
          :resizable="false"
          align="center"
          label="联系电话"
          width="120"
          show-overflow-tooltip
          prop="phone" /><el-table-column
          :resizable="false"
          align="left"
          label="地址"
          width="140"
          show-overflow-tooltip
          prop="address" /><el-table-column
          :resizable="false"
          align="center"
          label="拼音码"
          width="100"
          show-overflow-tooltip
          prop="inputCode"
      /></el-table>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import download from '@/utils/download'
import { Search } from '@element-plus/icons-vue'
import {
  getSystemDateTime,
  getPeUnitList,
  getUnitInfo,
  getPeUnitItemCountList,
  getPeUnitVisitPersonalList,
  getPeUnitPersonalItemCountList,
  getPeUnitItemBillCountList,
  getPeUnitPersonalBillCountList,
  exportPeUnitVisitPersonalList,
  exportPeUnitItemCountList,
  exportPeUnitPersonalItemCountList,
  exportPeUnitItemBillCountList,
  exportPeUnitPersonalBillCountList
} from '@/api/allProcess/index'
import { formatDate } from '@/utils/formatTime'
const currentActiveType = ref('Nature') // 当前激活的tab类型
const searchKeyword = ref('')
const searchVisitId = ref('')
const searchCertName = ref('')
const searchUnitInfo = ref<any>({})
const selectUnitCodeVisiable = ref(false)
const keyWord = ref('')
const unitCodeList = ref<any>([])
const queryInput = ref()
const onFocusUnitCode = async () => {
  keyWord.value = ''
  handleQueryItem()
  selectUnitCodeVisiable.value = true
  nextTick(() => {
    queryInput.value.focus()
  })
}
const handleQueryItem = async () => {
  unitCodeList.value = await getPeUnitList({
    input: keyWord.value
  })
}
const selectUnitCodeClick = async (row) => {
  searchKeyword.value = row.unitCode
  searchCertName.value = row.unitName
  selectUnitCodeVisiable.value = false
  await searchByUnitCode()
}
const searchByUnitCode = async () => {
  if (searchKeyword.value) {
    let res = await getUnitInfo({
      unitCode: searchKeyword.value
    })
    if (res) {
      searchUnitInfo.value = res
      searchVisitId.value = res.unitVisitId
      searchCertName.value = res.unitName
    } else {
      searchParams.value.unitName = ''
      searchParams.value.connecter = ''
      searchParams.value.phone = ''
      searchParams.value.address = ''
      searchParams.value.unitNumber = ''
      searchParams.value.peType = ''
      searchUnitInfo.value = {}
      searchVisitId.value = ''
      searchCertName.value = ''
    }
  }
}
const searchParams = ref({
  unitName: '',
  connecter: '',
  phone: '',
  address: '',
  unitNumber: '',
  peType: ''
})
const startDate = ref('')
const endDate = ref('')
const tableList = ref<any>([])
onMounted(async () => {
  let res = await getSystemDateTime()
  startDate.value = formatDate(res, 'YYYY-MM-DD')
  endDate.value = formatDate(res, 'YYYY-MM-DD')
})
const handleSearch = async () => {
  if (searchKeyword.value && searchVisitId.value) {
    tableList.value = await getPeUnitVisitPersonalList({
      unitCode: searchKeyword.value,
      unitVisitId: searchVisitId.value,
      pePreDateStart: '',
      pePreDateEnd: ''
    })
    searchParams.value = searchUnitInfo.value
    if (radio.value == '2') {
      itemList.value = await getPeUnitItemCountList({
        unitCode: searchKeyword.value,
        unitVisitId: searchVisitId.value,
        pePreDateStart: '',
        pePreDateEnd: ''
      })
    }
    if (costRadio.value == '2') {
      costList.value = await getPeUnitItemBillCountList({
        unitCode: searchKeyword.value,
        unitVisitId: searchVisitId.value,
        pePreDateStart: '',
        pePreDateEnd: ''
      })
    }
  } else {
    ElMessage.error('请先查询单位信息')
  }
}
const changeDate = async () => {
  if (tableList.value && tableList.value.length > 0) {
    tableList.value = await getPeUnitVisitPersonalList({
      unitCode: searchKeyword.value,
      unitVisitId: searchVisitId.value,
      pePreDateStart: startDate.value,
      pePreDateEnd: endDate.value
    })
  } else {
    ElMessage.error('请先查询数据')
  }
}
// 导出
const emportData = async () => {
  if (currentActiveType.value == 'Nature') {
    if (searchKeyword.value && searchVisitId.value) {
      const data = await exportPeUnitVisitPersonalList({
        unitCode: searchKeyword.value,
        unitVisitId: searchVisitId.value
      })
      download.excel(data, '体检人员列表.xlsx')
    } else {
      ElMessage.error('请先查询单位信息')
    }
  } else if (currentActiveType.value == 'Scheduled') {
    if (radio.value == '1') {
      if (searchKeyword.value && searchVisitId.value) {
        if (currentItemRow.value && currentItemRow.value!.peId) {
          const data = await exportPeUnitPersonalItemCountList({
            peId: currentItemRow.value!.peId,
            peVisitId: currentItemRow.value!.peVisitId
          })
          download.excel(data, currentItemRow.value!.name + '体检项目.xlsx')
        } else {
          ElMessage.error('请先选择人员')
        }
      } else {
        ElMessage.error('请先查询单位信息')
      }
    } else if (radio.value == '2') {
      if (searchKeyword.value && searchVisitId.value) {
        const data = await exportPeUnitItemCountList({
          unitCode: searchKeyword.value,
          unitVisitId: searchVisitId.value
        })
        download.excel(data, '单位体检项目.xlsx')
      } else {
        ElMessage.error('请先查询单位信息')
      }
    }
  } else if (currentActiveType.value == 'CostQ') {
    if (costRadio.value == '1') {
      if (searchKeyword.value && searchVisitId.value) {
        if (currentCostRow.value && currentCostRow.value!.peId) {
          const data = await exportPeUnitPersonalBillCountList({
            peId: currentCostRow.value!.peId,
            peVisitId: currentCostRow.value!.peVisitId
          })
          download.excel(data, currentCostRow.value!.name + '体检费用.xlsx')
        } else {
          ElMessage.error('请先选择人员')
        }
      } else {
        ElMessage.error('请先查询单位信息')
      }
    } else if (costRadio.value == '2') {
      if (searchKeyword.value && searchVisitId.value) {
        const data = await exportPeUnitItemBillCountList({
          unitCode: searchKeyword.value,
          unitVisitId: searchVisitId.value
        })
        download.excel(data, '单位体检费用.xlsx')
      } else {
        ElMessage.error('请先查询单位信息')
      }
    }
  }
}
const radio = ref('2')
const currentItemRow = ref<any>({})
const itemList = ref<any>([])
const searchpersonal = async (row) => {
  if (radio.value == '2') return
  currentItemRow.value = row
  itemList.value = []
  itemList.value = await getPeUnitPersonalItemCountList({
    peId: row.peId,
    peVisitId: row.peVisitId
  })
}
const changeRadioItem = async () => {
  if (radio.value == '2') {
    currentItemRow.value = {}
    itemList.value = await getPeUnitItemCountList({
      unitCode: searchKeyword.value,
      unitVisitId: searchVisitId.value,
      pePreDateStart: '',
      pePreDateEnd: ''
    })
  } else {
    itemList.value = []
    if (tableList.value && tableList.value.length > 0) {
      searchpersonal(tableList.value[0])
    }
  }
}
const costRadio = ref('2')
const currentCostRow = ref<any>({})
const costList = ref<any>([])
const changeCostRadio = async () => {
  if (costRadio.value == '2') {
    currentCostRow.value = {}
    costList.value = await getPeUnitItemBillCountList({
      unitCode: searchKeyword.value,
      unitVisitId: searchVisitId.value,
      pePreDateStart: '',
      pePreDateEnd: ''
    })
  } else {
    costList.value = []
    if (tableList.value && tableList.value.length > 0) {
      searchpersonalCost(tableList.value[0])
    }
  }
}
const searchpersonalCost = async (row) => {
  if (costRadio.value == '2') return
  currentCostRow.value = row
  costList.value = []
  costList.value = await getPeUnitPersonalBillCountList({
    peId: row.peId,
    peVisitId: row.peVisitId
  })
}
const setRowClassName1 = ({ row }) => {
  if (row.peId === currentItemRow.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const setRowClassName2 = ({ row }) => {
  if (row.peId === currentCostRow.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
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
  padding: 8px;
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
  margin-bottom: 6px;
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
.selectBtn {
  margin-left: -4px;
  .el-button {
    position: relative;
    top: 0px;
    margin-left: -4px;
    background: #f5f7fa !important;
    color: #999 !important;
  }
}
.base-setting {
  // background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // padding: 40px 8px 0;
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
    // background-color: #3473d1;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
.base-cont {
  width: 100%;
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
  // padding: 0 8px 8px;
  overflow: auto;
}
:deep(.el-tabs--top .el-tabs__header) {
  margin-bottom: 0 !important;
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
.base-title1 {
  padding: 0 0px;
  color: #3473d1;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  position: relative;
  font-weight: 700;
  // border-bottom: 1px solid #c5dcff;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 2px;
    // background-color: #3473d1;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
:deep(.table-checked-row-style) {
  background: #eaeffc !important;
  color: #3473d1 !important;
}
</style>
