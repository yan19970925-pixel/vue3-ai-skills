<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: hidden">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="base-cont">
          <span class="cont-span">单位代码:</span>
          <el-input
            v-model="unitCode"
            @keyup.enter="searchByUnitCode"
            placeholder="请输入"
            class="select-item !w-70px"
            clearable
          /><span class="selectBtn"> <el-button :icon="Search" @click="onFocusUnitCode()" /></span>
          <el-input
            v-model="certName"
            readonly
            placeholder="对应单位"
            class="select-item !w-180px ml-12px mr-12px"
          />
          <span class="ml-14px">体检分组:</span>
          <el-select
            placeholder="请选择"
            v-model="selectGroupCode"
            filterable
            remote
            clearable
            class="select-item !w-120px"
          >
            <el-option
              v-for="(item, index) in groupList"
              :key="index"
              :label="item.unitName + '-' + item.groupingName"
              :value="item.groupingCode"
          /></el-select>
          <span class="cont-span">具体项目:</span>
          <el-select
            placeholder="请选择"
            v-model="selectItemCode"
            filterable
            clearable
            remote
            class="select-item !w-190px"
          >
            <el-option
              v-for="(item, index) in allDataSelected"
              :key="index"
              :label="item.itemAssemName"
              :value="item.itemAssemCode"
          /></el-select>
          <span class="cont-span">预约日期:</span>
          <el-date-picker
            v-model="appointDate"
            class="select-item !w-130px"
            style="display: inline-flex"
            value-format="YYYY-MM-DD"
            type="date"
            ref="appiontStartDateRef"
            placeholder="请选择"
          />
          <el-checkbox v-model="jx" label="加项标志" class="ml-24px" />
          <el-button class="ml-16px" type="primary" @click="handleAppoint"> 预约 </el-button>
          <!-- <el-button class="resetBtn" @click="handleSaveDocument"> 指引单 </el-button> -->
          <el-button class="resetBtn" @click="moreAddItemList"> 批量增加项目 </el-button>
          <el-button class="resetBtn" @click="moreDeleteItemList"> 批量删除项目 </el-button>
        </div>
        <div class="base-cont">
          <span class="ml-18px">年龄:</span>
          <el-select
            v-model="searchParams.ageCompare"
            filterable
            clearable
            @change="searchInfo()"
            class="select-item !w-80px"
          >
            <el-option label="任意" value="任意" />
            <el-option label="小于" value="小于" />
            <el-option label="大于" value="大于" />
            <el-option label="区间" value="区间"
          /></el-select>
          <el-input-number
            :min="1"
            :max="100"
            :disabled="searchParams.ageCompare == '任意' || searchParams.ageCompare == '小于'"
            v-model="searchParams.ageMin"
            input-style="text-align: left;"
            controls-position="right"
            :controls="false"
            :precision="0"
            step="1"
            @change="searchInfo()"
            placeholder=""
            clearable
            style="width: 80px !important"
          />
          <span>至</span>
          <el-input-number
            :min="1"
            :max="100"
            :disabled="searchParams.ageCompare == '任意' || searchParams.ageCompare == '大于'"
            v-model="searchParams.ageMax"
            input-style="text-align: left;"
            controls-position="right"
            :controls="false"
            :precision="0"
            @change="searchInfo()"
            step="1"
            clearable
            placeholder=""
            style="width: 80px !important; margin-right: 16px"
          /><span>性别:</span>
          <el-select
            @change="searchInfo()"
            v-model="searchParams.sex"
            filterable
            clearable
            class="select-item !w-80px"
          >
            <el-option label="任意" value="任意" />
            <el-option label="男" value="男" />
            <el-option label="女" value="女"
          /></el-select>
          <span class="ml-16px">婚姻:</span
          ><el-select
            v-model="searchParams.maritalStatus"
            filterable
            clearable
            @change="searchInfo()"
            class="select-item !w-100px"
          >
            <el-option label="任意" value="任意" />
            <el-option label="已婚" value="已婚" />
            <el-option label="未婚" value="未婚" />
            <el-option label="其他" value="其他" /></el-select
          ><span class="ml-16px">职务:</span
          ><el-select
            v-model="searchParams.position"
            filterable
            clearable
            @change="searchInfo()"
            class="select-item !w-100px"
          >
            <el-option label="任意" value="任意" /></el-select
          ><span class="ml-16px">分组选择:</span
          ><el-select
            placeholder="请选择"
            v-model="searchParams.groupingCode"
            filterable
            remote
            clearable
            @change="searchInfo()"
            class="select-item !w-120px"
          >
            <el-option
              v-for="(item, index) in groupList"
              :key="index"
              :label="item.groupingName + '-' + item.groupingCode"
              :value="item.groupingCode" /></el-select
          ><span class="ml-16px">状态:</span
          ><el-select
            v-model="searchParams.visitStatus"
            filterable
            clearable
            @change="searchInfo()"
            class="select-item !w-100px"
          >
            <el-option label="任意" value="任意" />
            <el-option label="未预约" value="未预约" />
            <el-option label="未完成" value="未完成" />
            <el-option label="完成" value="完成" /></el-select
          ><span class="ml-16px">部门:</span
          ><el-input
            v-model="searchParams.department"
            placeholder="部门"
            @change="searchInfo()"
            class="select-item !w-120px"
          />
          <el-button type="primary" @click="searchInfo"> 查询 </el-button>
          <el-button class="resetBtn" @click="printInfo">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button>
          <el-button class="resetBtn" @click="handleEmport">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出
          </el-button>
          <!-- <el-checkbox label="是否显示分组及状态信息"
        /> -->
        </div>
      </div>
      <div style="padding: 10px; background-color: #fff; height: calc(100% - 100px)">
        <!-- 表格 -->
        <div class="flex mt-5px mb-5px w-1630px" style="justify-content: space-between">
          <p style="color: red">{{ selectStr }}</p>
          <p v-if="rightInfo"
            ><span class="mr-24px">未预约：{{ rightInfo.unApp ? rightInfo.unApp : '' }}</span
            ><span class="mr-24px"
              >未完成：{{ rightInfo.unFinished ? rightInfo.unFinished : '' }}</span
            ><span>完成：{{ rightInfo.finished ? rightInfo.finished : '' }}</span></p
          ></div
        >
        <el-table
          ref="itemTableRef"
          :data="peVisitListRespList"
          border
          :row-class-name="setAdviceRowClass"
          style="width: 1630px; height: calc(100% - 30px); min-height: 300px"
          @selection-change="handleSelectionChange"
          highlight-current-row
          stripe
        >
          <el-table-column :resizable="false" type="selection" align="center" width="50px" />
          <el-table-column
            show-overflow-tooltip
            prop="peId"
            label="体检号"
            align="center"
            width="220"
          />
          <el-table-column
            show-overflow-tooltip
            prop="peVisitId"
            label="体检次数"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="姓名"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="sex"
            label="性别"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="age"
            label="年龄"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="maritalStatus"
            label="婚姻"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="visitStatus"
            label="体检状态"
            align="center"
            width="200"
          />
          <el-table-column
            show-overflow-tooltip
            prop="groupingName"
            label="体检分组"
            align="center"
            width="200"
          />
          <el-table-column
            show-overflow-tooltip
            prop="department"
            label="部门"
            align="center"
            width="150"
          />
          <el-table-column fixed="right" label="操作" align="center" width="60">
            <template #default="scope">
              <el-button
                type="text"
                style="color: rgb(243, 61, 33)"
                @click.stop="handleDeleteItem(scope.row, scope.$index)"
                >移除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { ElMessage, ElTable, ElMessageBox } from 'element-plus'
import { getPeItemAssembledList } from '@/api/PerPhyExamination/perExamination/index'
import {
  getSystemDateTime,
  getBatchAppointUnitInfo,
  getPeUnitList,
  batchAppoint,
  batchAddItems,
  batchDelItems,
  exportPeUnitPersonal,
  peUnitVisitFilter
} from '@/api/allProcess/index'
import { formatDate } from '@/utils/formatTime'
import download from '@/utils/download'
import { print } from '@/print/index'
import renyuanliebiaoHTML from '@/print/tj_renyuanliebiao'
const allDataSelected = ref<any>([]) //项目
const selectItemCode = ref('')
const certName = ref('')
const unitCode = ref('')
const groupList = ref<any>([]) //分组
const selectGroupCode = ref<any>([])
const unitInfo = ref<any>({})
const appointDate = ref('')
const nowDate = ref('')
const peVisitListRespList = ref<any>([]) //人员列表
const peVisitAllList = ref<any>([]) //人员列表
const peVisitFilterList = ref<any>([])
const itemTableRef = ref()
const selectStr = ref('')
const jx = ref(false)
const searchByUnitCode = async () => {
  if (unitCode.value) {
    getBatchAppointUnitInfo({
      unitCode: unitCode.value
    })
      .then((res) => {
        if (res) {
          groupList.value = res.groupingDictDOList
          peVisitListRespList.value = res.peVisitListRespList
          peVisitAllList.value = JSON.parse(JSON.stringify(peVisitListRespList.value))
          peVisitFilterList.value = JSON.parse(JSON.stringify(peVisitListRespList.value))
          unitInfo.value = res
          certName.value = res.unitName + '第' + res.unitVisitId + '次'
          appointDate.value = formatDate(new Date(nowDate.value), 'YYYY-MM-DD')
          if (peVisitListRespList.value && peVisitListRespList.value.length > 0) {
            peVisitListRespList.value.forEach((item) => {
              nextTick(() => {
                itemTableRef.value?.toggleRowSelection(item, true)
              })
            })
            selectStr.value =
              '共选' +
              peVisitListRespList.value.length +
              '个，其中男：' +
              peVisitListRespList.value.filter((res) => res.sex && res.sex == '男').length +
              '人，女：' +
              peVisitListRespList.value.filter((res) => res.sex && res.sex == '女').length +
              '人，其他：' +
              peVisitListRespList.value.filter(
                (res) => res.sex && res.sex != '男' && res.sex != '女'
              ).length +
              '人'
          }
        }
      })
      .catch(() => {
        certName.value = ''
        groupList.value = []
        peVisitListRespList.value = []
        peVisitAllList.value = []
        unitInfo.value = {}
        selectStr.value = ''
        selectGroupCode.value = ''
        selectItemCode.value = ''
      })
  }
}
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
  unitCode.value = row.unitCode
  certName.value = row.unitName
  selectUnitCodeVisiable.value = false
  await searchByUnitCode()
}
// 设置行样式
const setAdviceRowClass = () => {
  return 'advice-row'
}
onMounted(async () => {
  let arr = await getPeItemAssembledList({
    pageNo: 1,
    pageSize: 10000000,
    form: ''
  })
  allDataSelected.value = arr.records
  let res = await getSystemDateTime()
  nowDate.value = formatDate(res, 'YYYY-MM-DD HH:mm:ss')
})
const selectPeVisitList = ref<any>([])
const handleSelectionChange = (val: any) => {
  selectPeVisitList.value = val
}
const handleAppoint = async () => {
  //预约
  if (!unitCode.value) {
    ElMessage.error('请输入单位代码')
    return false
  }
  if (!selectGroupCode.value && !selectItemCode.value) {
    ElMessage.error('请体检分组或者项目')
    return false
  }
  if (!appointDate.value) {
    ElMessage.error('请选择预约日期')
    return false
  }
  if (!selectPeVisitList.value || selectPeVisitList.value.length == 0) {
    ElMessage.error('请选择人员')
    return false
  }
  ElMessageBox.confirm('确认预约下列项目吗？', '提示', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await batchAppoint({
        unitCode: unitCode.value,
        unitVisitId: unitInfo.value.unitVisitId,
        unitName: certName.value,
        groupingCode: selectGroupCode.value,
        preDate: appointDate.value,
        assemCode: selectGroupCode.value ? '' : selectItemCode.value,
        peVisitListRespList: selectPeVisitList.value
      })
      ElMessage.success('预约成功')
      searchByUnitCode()
    })
    .catch(() => {})
}
const moreAddItemList = async () => {
  if (!unitCode.value) {
    ElMessage.error('请输入单位代码')
    return false
  }
  ElMessageBox.confirm(
    '该处只能对已经预约过的人员增加项目，没有预约的不能增加项目！是否继续？',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(async () => {
    if (!selectItemCode.value) {
      ElMessage.error('请选择需要增加的项目')
      return false
    }
    if (!selectPeVisitList.value || selectPeVisitList.value.length == 0) {
      ElMessage.error('请选择人员')
      return false
    }
    await batchAddItems({
      unitCode: unitCode.value,
      unitVisitId: unitInfo.value.unitVisitId,
      unitName: certName.value,
      assemCode: selectItemCode.value,
      peVisitListRespList: selectPeVisitList.value,
      jx: jx.value
    })
    ElMessage.success('增加成功')
    searchByUnitCode()
  })
}
const moreDeleteItemList = async () => {
  if (!unitCode.value) {
    ElMessage.error('请输入单位代码')
    return false
  }
  ElMessageBox.confirm('确认要删除该项目吗？', '提示', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    if (!selectItemCode.value) {
      ElMessage.error('请选择项目')
      return false
    }
    if (!selectPeVisitList.value || selectPeVisitList.value.length == 0) {
      ElMessage.error('请选择人员')
      return false
    }
    await batchDelItems({
      unitCode: unitCode.value,
      unitVisitId: unitInfo.value.unitVisitId,
      unitName: certName.value,
      assemCode: selectItemCode.value,
      peVisitListRespList: selectPeVisitList.value
    })
    ElMessage.success('删除成功')
    selectItemCode.value = ''
    searchByUnitCode()
  })
}
const searchParams = ref({
  ageCompare: '任意',
  ageMin: null,
  ageMax: null,
  sex: '任意',
  maritalStatus: '任意',
  visitStatus: '',
  groupingCode: '',
  department: '',
  position: '任意'
})
const rightInfo = ref<any>({})
const searchInfo = async () => {
  if (peVisitAllList.value.length == 0) return
  let res = await peUnitVisitFilter({
    ageCompare: searchParams.value.ageCompare,
    ageMin:
      searchParams.value.ageCompare == '任意' || searchParams.value.ageCompare == '小于'
        ? null
        : searchParams.value.ageMin,
    ageMax:
      searchParams.value.ageCompare == '任意' || searchParams.value.ageCompare == '大于'
        ? null
        : searchParams.value.ageMax,
    sex: searchParams.value.sex,
    maritalStatus: searchParams.value.maritalStatus,
    position: searchParams.value.position,
    groupingCode: searchParams.value.groupingCode,
    visitStatus: searchParams.value.visitStatus,
    department: searchParams.value.department,
    peVisitListRespList: peVisitFilterList.value
  })
  peVisitListRespList.value = res.peVisitListRespList
  rightInfo.value = res
  if (peVisitListRespList.value && peVisitListRespList.value.length > 0) {
    peVisitListRespList.value.forEach((item) => {
      nextTick(() => {
        itemTableRef.value?.toggleRowSelection(item, true)
      })
    })
    selectStr.value =
      '共选' +
      peVisitListRespList.value.length +
      '个，其中男：' +
      peVisitListRespList.value.filter((res) => res.sex && res.sex == '男').length +
      '人，女：' +
      peVisitListRespList.value.filter((res) => res.sex && res.sex == '女').length +
      '人，其他：' +
      peVisitListRespList.value.filter((res) => res.sex && res.sex != '男' && res.sex != '女')
        .length +
      '人'
  } else {
    selectStr.value = ''
  }
}
const printInfo = async () => {
  //
  if (peVisitAllList.value.length == 0) return
  let chunk = 34
  const newArr1 = ref<any>([])
  const newArr2 = ref<any>([])
  for (let i = 0; i < peVisitAllList.value.length; i += chunk) {
    newArr1.value.push(peVisitAllList.value.slice(i, i + chunk))
  }
  newArr1.value.forEach((item, index) => {
    newArr2.value.push({
      currentPage: index + 1,
      total: peVisitAllList.value.length,
      checkList: item
    })
  })
  const html = renyuanliebiaoHTML({
    dataList: newArr2.value
  })
  print(html)
}
const handleEmport = async () => {
  //导出
  if (!unitCode.value) {
    ElMessage.error('请输入单位代码')
    return false
  }
  const data = await exportPeUnitPersonal({
    unitName: unitInfo.value.unitName,
    peVisitListRespList: peVisitAllList.value
  })
  download.excel(data, '人员信息.xlsx')
}
const handleDeleteItem = async (row, index) => {
  peVisitListRespList.value.splice(index, 1)
  let zIndex = peVisitFilterList.value.findIndex((res) => res.peId == row.peId)
  peVisitFilterList.value.splice(zIndex, 1)
}
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
  gap: 4px;
  padding: 8px 0px;

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
.base-cont:nth-child(1) {
  border-bottom: 1px solid #c5dcff;
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
.selectBtn {
  .el-button {
    position: relative;
    top: 0px;
    margin-left: -5px;
    background: #f5f7fa !important;
    color: #999 !important;
  }
}
</style>

<style>
.el-table--default .cell {
  padding: 0 6px !important;
}
</style>
