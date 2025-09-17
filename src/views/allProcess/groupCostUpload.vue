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
          <el-button class="resetBtn" @click="emportData"> 费用上传 </el-button>
        </div>
      </div>
    </div>

    <div
      class="mt-4px table-container"
      style="padding: 10px; background-color: #fff; height: calc(100% - 65px)"
    >
      <div class="base-setting" style="height: 100%">
        <div class="total_span">
          <!-- <div class="base-cont">
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
          </div> -->
          <!-- <div class="base-cont">
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
          </div> -->
          <span>总人数：{{ tableList.length }}人</span>
        </div>
        <div style="width: 100%; background-color: pink">
          <div class="content">
            <el-table
              :data="tableList"
              border
              style="height: calc(100vh - 220px)"
              highlight-current-row
              stripe
            >
              <!-- 选择 -->
              <!-- <el-table-column type="selection" width="40" /> -->
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
                width="60"
                show-overflow-tooltip
              />
              <el-table-column
                label="姓名"
                prop="name"
                width="200"
                align="center"
                show-overflow-tooltip
              />
              <!-- <el-table-column label="年龄" prop="sex" show-overflow-tooltip /> -->
              <el-table-column
                label="体检日期"
                prop="pePreDate"
                align="center"
                show-overflow-tooltip
                width="160"
              />
              <el-table-column
                label="婚姻"
                prop="maritalStatus"
                align="center"
                show-overflow-tooltip
                width="80"
              />
              <el-table-column
                label="出生日期"
                prop="dateOfBirth"
                align="center"
                show-overflow-tooltip
                width="160"
              />
              <el-table-column
                label="结算标志"
                prop="finishedSign"
                align="center"
                width="160"
                show-overflow-tooltip
              />
              <el-table-column
                label="预约人员"
                prop="pePreOperator"
                align="center"
                show-overflow-tooltip
                width="160"
              />
              <el-table-column label="职务" prop="deptname" align="center" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <Dialog
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
    <Dialog
      v-model="costDetailsVisiable"
      title="费用明细"
      width="800"
      @close="costDetailsVisiable = false"
    >
      <div class="costDetails_con">
        <el-table :data="costDetailsList" border style="height: 400px" highlight-current-row>
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column
            label="项目名称"
            prop="itemAssemName"
            align="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="单价" width="90" prop="charges" align="center"></el-table-column>
          <el-table-column label="数量" width="100" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.amount"
                @change="handleNumChange(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="总金额"
            width="150"
            prop="sumcharges"
            align="center"
          ></el-table-column>
        </el-table>
        <div style="width: 100%; text-align: center; margin-top: 20px">
          <el-button type="primary" @click="submitCostDetails">确定并上传明细</el-button>
          <el-button @click="costDetailsVisiable = false">取消</el-button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {
  getSystemDateTime,
  getPeUnitList,
  getUnitInfo,
  getPeUnitVisitPersonalList,
  peUnitBillUploadHis,
  getPeUnitBill,
  updateUnitBillDetail
} from '@/api/allProcess/index'
import { formatDate } from '@/utils/formatTime'
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
const costDetailsVisiable = ref(false)
const costDetailsList = ref<any>([])

const emportData = async () => {
  if (searchKeyword.value && searchVisitId.value) {
    await getPeUnitBill({ unitCode: searchKeyword.value, unitVisitId: searchVisitId.value })
      .then((res) => {
        costDetailsList.value = res || []
        costDetailsVisiable.value = true
      })
      .catch((err) => {})
  }
}
const handleNumChange = (index, row) => {
  console.log(index, row)
  row.sumcharges = Number(row.amount) * Number(row.charges)
}
const submitCostDetails = () => {
  if (costDetailsList.value.length === 0) return ElMessage.error('暂无可上传费用明细')

  updateUnitBillDetail(costDetailsList.value).then((res) => {
    peUnitBillUploadHis({
      unitCode: searchKeyword.value,
      unitVisitId: searchVisitId.value
    })
      .then((res) => {
        ElMessage.success('费用上传成功')
        costDetailsVisiable.value = false
      })
      .catch((err) => {
        ElMessage.error('费用上传失败')
        costDetailsVisiable.value = false
      })
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
  .total_span {
    background-color: #fff;
    padding: 8px;
    span {
      display: inline-block;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      color: #3473d1;
      /* border-bottom: #3473d1 solid 1px; */
    }
  }
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
