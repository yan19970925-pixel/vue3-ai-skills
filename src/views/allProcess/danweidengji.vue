<template>
  <div class="base-register">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="10" class="pr-6px" style="height: 100%">
          <div class="content" style="height: 370px">
            <div class="base-title mb-16px">单位基本信息</div>
            <el-form ref="formRef" label-width="90px" style="width: 96%">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="单位代码:">
                    <el-input
                      v-model="formInfo.unitCode"
                      @keyup.enter="searchByUnitCode"
                      placeholder="请输入"
                      style="width: calc(100% - 46px)"
                      type="text"
                      clearable
                    /><span class="selectBtn">
                      <el-button :icon="Search" @click="onFocusUnitCode()"
                    /></span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <div class="unitVisit" v-if="formInfo.unitVisitId && formInfo.unitVisitId != 0">
                    <span>次数：{{ formInfo.unitVisitId }}</span>
                    <span class="ml-16px"
                      >日期：{{
                        formInfo.status && formInfo.status == '尚未预约'
                          ? formInfo.status
                          : formInfo.appointsDate
                      }}</span
                    ></div
                  >
                  <div v-else class="unitVisit">单位未注册</div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="单位名称:">
                    <el-input
                      ref="unitNameRef"
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.unitName"
                      placeholder="请输入"
                      type="text"
                      clearable
                      @blur="generateInputCode"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="简称:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.unitAlias"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系人:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.connecter"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.phone"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="地址:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.address"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="编制数:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.unitNumber"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="业务员:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.poststTypename"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="体检类型:">
                    <el-select
                      v-model="formInfo.peType"
                      clearable
                      style="width: 100%"
                      :disabled="!formInfo.unitVisitId"
                    >
                      <el-option label="来院" value="来院" />
                      <el-option label="外出" value="外出" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="输入码:">
                    <el-input
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.inputCode"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="上级单位:">
                    <el-select
                      placeholder="请选择"
                      v-model="formInfo.parentUnitCode"
                      filterable
                      remote
                      :remote-method="filterParentUnit"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="(item, index) in unitCodeList"
                        :key="index"
                        :label="item.unitName"
                        :value="item.unitCode"
                      >
                        <span style="display: inline-block; width: 150px">{{ item.unitCode }}</span>
                        <span style="display: inline-block; width: 300px">{{ item.unitName }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div class="content" style="height: calc(100% - 376px); margin-top: 6px">
            <div class="base-box" style="height: 100%">
              <div class="base-title base-title2"
                >体检分组列表
                <el-button
                  class="resetBtn"
                  :disabled="!formInfo.unitVisitId"
                  style="height: 28px; line-height: 28px; margin-top: 3px"
                  @click="handleAddNewItem"
                  >新建分组</el-button
                >
              </div>
              <el-table
                :data="itemsList"
                border
                class="mt-8px"
                style="width: 100%; height: calc(100% - 42px); min-height: 300px; overflow: auto"
                :row-class-name="setRowClassName"
                @row-click="choseRow"
                stripe
              >
                <el-table-column
                  label="分组代码"
                  width="140"
                  align="center"
                  prop="groupingCode"
                  show-overflow-tooltip
                />
                <el-table-column label="分组名称" prop="groupingName" show-overflow-tooltip>
                  <template #default="scope">
                    <el-input
                      v-model="scope.row.groupingName"
                      ref="groupingNameRef"
                      size="small"
                      type="text"
                      style="width: 100%"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="性别"
                  prop="sex"
                  width="84"
                  align="center"
                  show-overflow-tooltip
                >
                  <template #default="scope">
                    <el-select v-model="scope.row.sex" clearable size="small">
                      <el-option label="男" value="男" />
                      <el-option label="女" value="女" />
                      <el-option label="未知" value="未知" />
                    </el-select> </template
                ></el-table-column>
                <el-table-column
                  label="年龄上限"
                  width="86"
                  align="center"
                  prop="ageUpperLimit"
                  show-overflow-tooltip
                  ><template #default="scope">
                    <el-input-number
                      :min="0"
                      :max="100"
                      v-model="scope.row.ageUpperLimit"
                      input-style="text-align: left;"
                      controls-position="right"
                      :controls="false"
                      size="small"
                      :precision="0"
                      step="1"
                      placeholder=""
                      style="width: 100% !important"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="年龄下限"
                  width="86"
                  align="center"
                  prop="ageLowLimit"
                  show-overflow-tooltip
                  ><template #default="scope">
                    <el-input-number
                      :min="0"
                      :max="100"
                      v-model="scope.row.ageLowLimit"
                      input-style="text-align: left;"
                      controls-position="right"
                      :controls="false"
                      size="small"
                      :precision="0"
                      step="1"
                      placeholder=""
                      style="width: 100% !important"
                    />
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="折扣"
                  prop="groupDiscount"
                  width="70"
                  align="center"
                  show-overflow-tooltip
                /> -->
                <el-table-column fixed="right" label="操作" align="center" width="60">
                  <template #default="scope">
                    <el-button
                      type="text"
                      style="color: rgb(243, 61, 33)"
                      @click.stop="handleDeleteItem(scope.row, scope.$index)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="14" style="height: 100%">
          <div class="content" style="height: 340px">
            <div class="base-title">套餐选择</div>
            <el-row style="width: 100%">
              <el-col :span="14" class="pl-10px pr-10px">
                <div class="flex mt-10px align-items">
                  <span class="cont-span">未选：</span>
                  <el-input
                    :disabled="!formInfo.unitVisitId"
                    style="width: calc(100% - 42px)"
                    v-model="taocanSearch"
                    placeholder="请输入"
                    class="select-item"
                    @change="taocanFiter"
                  />
                </div>
                <div class="unSelectpackage mt-6px"
                  ><div
                    class="div"
                    v-show="formInfo.unitVisitId && formInfo.unitVisitId != 0"
                    v-for="item in shaixuanpeSetList"
                    :key="item.setCode"
                  >
                    <el-radio-group
                      v-model="checkedPeSetListData"
                      @change="handleItemsClick(item, checkedPeSetListData)"
                    >
                      <el-radio :label="item.setCode" size="large">{{ item.setName }}</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="pl-10px pr-10px"
                ><div class="flex mt-10px" style="height: 32px"> </div>
                <div class="unSelectpackage mt-6px"
                  ><div
                    class="div"
                    style="width: 100%"
                    v-show="xuanzhongData && xuanzhongData.setCode"
                  >
                    <el-radio
                      :label="xuanzhongData.setCode"
                      @click="quxiaoItemsClick"
                      size="large"
                      >{{ xuanzhongData.setName }}</el-radio
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 项目组合选择 -->
          <div class="content" style="height: calc(100% - 346px); margin-top: 6px">
            <div class="base-title">项目组合选择</div>
            <div class="project-class"
              ><el-radio-group v-model="selectedCategory">
                <el-radio-button
                  v-for="item in categories"
                  :key="item.className"
                  :label="item.className"
                  class="category-tag"
                >
                  {{ item.className }}
                </el-radio-button>
              </el-radio-group></div
            >
            <el-row style="width: 100%; height: calc(100% - 110px)">
              <el-col :span="14" class="pl-10px pr-10px" style="height: 100%; display: block">
                <div class="flex mt-10px align-items">
                  <span class="cont-span">未选：</span>

                  <el-input
                    :disabled="!formInfo.unitVisitId"
                    style="width: calc(100% - 42px)"
                    v-model="zuheSearch"
                    placeholder="请输入"
                    class="select-item"
                    @input="zuheFiter"
                  />
                </div>
                <div class="selectedpackage mt-6px"
                  ><div class="div" v-for="item in shaixuanAllDataList" :key="item.itemAssemCode">
                    <el-checkbox-group
                      v-model="shaixuanChecked"
                      @change="shaixuanHandleItem(item, shaixuanChecked)"
                    >
                      <el-checkbox :label="item.itemAssemCode" size="large">
                        {{ item.itemAssemName }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="pl-10px pr-10px" style="height: 100%; display: block"
                ><div class="flex mt-10px">
                  <span class="cont-span">已选：</span>

                  <el-input
                    :disabled="!formInfo.unitVisitId"
                    style="width: calc(100% - 42px)"
                    v-model="formInfo.setCode"
                    @change="yixuanzuheFiter()"
                    placeholder="请输入"
                    class="select-item"
                  />
                </div>
                <div class="selectedpackage mt-6px"
                  ><div class="div" v-for="item in allDataSelected" :key="item.itemAssemCode">
                    <el-checkbox-group
                      v-model="xuanzhongChecked"
                      @change="xuanzhongHandleItem(item, xuanzhongChecked)"
                    >
                      <el-checkbox :label="item.itemAssemCode">
                        <span :style="!item.isTaocan ? 'color:#3473d1' : 'color:#333'">{{
                          item.itemAssemName
                        }}</span>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="flex mt-10px">
              <span class="span1">单价：</span>

              <el-input
                :disabled="!formInfo.unitVisitId"
                v-model="filterInfo"
                placeholder="请输入"
                class="select-item !w-160px mr-24px"
              />
              <span class="span1">总金额：</span>

              <el-input
                :disabled="!formInfo.unitVisitId"
                class="select-item !w-160px mr-24px"
                v-model="formInfo.totalCharges"
                placeholder="请输入"
                clearable
              />
              <el-button class="resetBtn" @click="appiontDate">预约体检</el-button>
              <el-button type="primary" @click="saveDengJi()">保存</el-button>
              <el-button type="danger" @click="handleDeleteAppoint">删除预约</el-button></div
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog
      v-model="appiontDateVisible"
      width="500px"
      max-height="300px"
      :fullscreen="false"
      :close-on-click-modal="false"
    >
      <template #title>
        <div class="dialog-title">体检预约</div>
      </template>
      <div class="more-advice-detail">
        <section class="mb-16px"
          ><span style="font-size: 16px">体检开始时间：</span
          ><el-date-picker
            v-model="appiontStartDate"
            style="width: 240px; height: 40px !important; display: inline-flex"
            value-format="YYYY-MM-DD"
            type="datet"
            size="large"
            ref="appiontStartDateRef"
            placeholder="请选择"
          />
        </section>
        <section class="mb-16px"
          ><span style="font-size: 16px">体检结束时间：</span
          ><el-date-picker
            v-model="appiontEndDate"
            style="width: 240px; height: 40px !important; display: inline-flex"
            value-format="YYYY-MM-DD"
            type="datet"
            size="large"
            ref="appiontEndDateRef"
            placeholder="请选择"
          />
        </section>
        <section class="flex mt-16px justify-center w-full mt-24px">
          <el-button type="primary" @click="appiontDateVisible = false">放弃</el-button>
          <el-button type="primary" @click="appiontDateConfirms()">预约</el-button>
        </section>
      </div>
    </Dialog>
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
        :data="unitCodeListNew"
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
import {
  getPeSetList,
  // getPeSetItemUnselectList,
  getPeSetItemSelectedList,
  getPeItemAssembledList
} from '@/api/PerPhyExamination/perExamination/index'
import { getPeItemAssemClass } from '@/api/systemSetting/PEPackage/index'
import {
  getSystemDateTime,
  getMaxGroupNo,
  getUnitInfo,
  getMaxUnitCode,
  deleteAppointment,
  deleteGroup,
  appointSaveAll,
  appointmentExam,
  getPeUnitList
} from '@/api/allProcess/index'
import { formatDate } from '@/utils/formatTime'
import { Search } from '@element-plus/icons-vue'
const itemsList = ref<any>([])
// 点击新增分组
const unitNameRef = ref()
const currentGroupRow = ref<any>({})
const handleAddNewItem = async () => {
  if (!formInfo.unitName) {
    ElMessage.warning('请输入单位名称')
    unitNameRef.value.focus()
    return
  }
  if (itemsList.value && itemsList.value.length > 0) {
    if (!itemsList.value[itemsList.value.length - 1].groupingName) {
      ElMessage.error('请输入分组名称')
      nextTick(() => {
        groupingNameRef.value[0]?.focus()
      })
      return
    }
  }
  let res = ''
  if (itemsList.value.length == 0) {
    res = await getMaxGroupNo({
      unitCode: formInfo.unitCode,
      unitVisitId: formInfo.unitVisitId
    })
  } else {
    res = itemsList.value[itemsList.value.length - 1].groupingCode
      ? String(Number(itemsList.value[itemsList.value.length - 1].groupingCode) + 1)
      : ''
  }
  let newItem = {
    operateType: 'add',
    groupingCode: res,
    groupingName: '',
    unitCode: formInfo.unitCode,
    unitVisitId: formInfo.unitVisitId,
    unitName: formInfo.unitName,
    peGroupingDate: formatDate(new Date(nowDate.value), 'YYYY-MM-DD'),
    sex: '',
    ageUpperLimit: null,
    ageLowLimit: null,
    peLevel: '',
    groupingPrice: '',
    groupingDiscountPrice: '',
    groupDiscount: '',
    occTypecode: '',
    occTypename: '',
    poststTypecode: '',
    poststTypename: '',
    setListSelected: [], //套餐
    itemListSelected: [] //项目
  }
  itemsList.value.push(newItem)
  choseRow(newItem)
  peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
  shaixuanpeSetList.value = peSetList.value
  xuanzhongData.value = {}
  allDataSelected.value = []
  checkedPeSetListData.value = ''
}
const handleDeleteItem = async (row, index) => {
  if (row.operateType && row.operateType == 'add') {
    itemsList.value.splice(index, 1)
  } else {
    await deleteGroup({
      unitCode: row.unitCode,
      unitVisitId: row.unitVisitId,
      maxGroup: itemsList.value[itemsList.value.length - 1].groupingCode,
      groupingCode: row.groupingCode
    })
    itemsList.value.splice(index, 1)
    ElMessage.success('删除成功')
  }
  if (itemsList.value.length > 0) {
    choseRow(itemsList.value[0])
  } else {
    currentGroupRow.value = {}
    peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
    let res = await getPeItemAssembledList({
      pageNo: 1,
      pageSize: 10000000,
      form: '',
      clinicFlag: 1
    })
    selectedCategory.value = '全部'
    allDataUnselect.value = res.records || []
    shaixuanAllDataList.value = res.records || []
    allDataSelected.value = []
    xuanzhongData.value = {}
    shaixuanpeSetList.value = peSetList.value
    setCode.value = ''
    shaixuanChecked.value = []
    xuanzhongChecked.value = []
    taocanSearch.value = ''
    zuheSearch.value = ''
    formInfo.setCode = ''
  }
}
const filterInfo = ref('')
const shaixuanpeSetList = ref<any>([]) //筛选套餐列表
const checkedPeSetListData = ref<any>('') // 已选套餐列表
const setCode = ref({})
const xuanzhongData = ref<any>({})
const taocanSearch = ref('')
const price = ref(0) // 单价
const selectedCategory = ref('全部') // 当前选中分类
const categories = ref<any>([]) // 分类列表
const allDataUnselect = ref<any>([]) // 可选项目列表
const shaixuanAllDataList = ref<any>([])
const shaixuanChecked = ref<any>([])
const xuanzhongChecked = ref<any>([])
const peSetList = ref<any>([])
const formInfo = reactive({
  unitVisitId: 0,
  unitCode: '',
  unitName: '',
  connecter: '',
  unitAlias: '',
  address: '',
  unitNumber: '',
  phone: '',
  poststTypename: '',
  peType: '',
  inputCode: '',
  parentUnitCode: '',
  totalCharges: '',
  unitType: '',
  allowFlag: '',
  occTypecode: '',
  occTypename: '',
  poststTypecode: '',
  status: '',
  appointsDate: '',
  optionFlag: null,
  itemList: []
})
// 点击套餐行时触发
const handleItemsClick = async (row, val) => {
  if (!currentGroupRow.value) {
    ElMessage.error('请先选择分组')
    return false
  }
  console.log(row, val)
  row.groupingCode = currentGroupRow.value!.groupingCode
  xuanzhongData.value = row
  setCode.value = row.setCode
  if (xuanzhongData.value && xuanzhongData.value.setCode) {
    if (taocanSearch.value) {
      shaixuanpeSetList.value = shaixuanpeSetList.value.filter(
        (item) => item.setCode != row.setCode
      )
    } else {
      shaixuanpeSetList.value = peSetList.value.filter((item) => item.setCode != row.setCode)
    }
  }
  await getItemUnselectList(
    row.setCode,
    selectedCategory.value == '全部' ? '' : selectedCategory.value
  )
  selectedCategory.value = '全部'
  await getTaoCanList(row.setCode)
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
}
const allDataSelected = ref<any>([]) // 套餐已选项目列表
const getTaoCanList = async (setCode) => {
  const res = await getPeSetItemSelectedList({
    form: '',
    pageNo: 1,
    pageSize: 10000000,
    setCode: setCode
  })
  allDataSelected.value = res || []
  fuzhiAllDataSelected.value = allDataSelected.value
  let num = 0
  allDataSelected.value.forEach((item) => {
    num += item.personPrice * 100
    item.groupingCode = currentGroupRow.value.groupingCode
    item.isTaocan = true
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
  if (allDataSelected.value.length > 0) {
    const allDataSelectedItemCodes = new Set(
      allDataSelected.value.map((item) => item.itemAssemCode)
    )
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
}
// 取消套餐行时触发
const quxiaoItemsClick = () => {
  xuanzhongData.value = {}
  checkedPeSetListData.value = ''
  shaixuanpeSetList.value = peSetList.value
  const filterAllDataSelected = allDataSelected.value.filter((res) => res.isTaocan)
  allDataSelected.value = allDataSelected.value.filter((res) => !res.isTaocan)
  const allDataSelectedItemCodes = new Set(filterAllDataSelected.map((item) => item.itemAssemCode))
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })
  checkedPeSetListData.value = ''
  let num = 0
  allDataSelected.value.forEach((item) => {
    num += item.personPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
}
// 获取可选项目
const getItemUnselectList = async (setCode, form = '') => {
  const res = await getPeItemAssembledList({
    pageNo: 1,
    pageSize: 10000000,
    // setCode: setCode || '',
    form: form || '',
    clinicFlag: 1
  })
  allDataUnselect.value = res.records || []
  shaixuanAllDataList.value = res.records || []
}
//组合未选筛选
const zuheSearch = ref('')
const zuheFiter = () => {
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  if (zuheSearch.value) {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) =>
      item.itemAssemName.includes(zuheSearch.value)
    )
    shaixuanAllDataList.value = shaixuanAllDataList.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  } else {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
}
const shaixuanHandleItem = (item, checked) => {
  console.log(item, checked)
  item.isTaocan = false
  allDataSelected.value.unshift(item)
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  if (zuheSearch.value) {
    shaixuanAllDataList.value = shaixuanAllDataList.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  } else {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
  let num = 0
  allDataSelected.value.forEach((item) => {
    num += item.personPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
  // xuanzhongData.value = {}
  shaixuanpeSetList.value = peSetList.value
  checkedPeSetListData.value = ''
  fuzhiAllDataSelected.value = allDataSelected.value
}
const xuanzhongHandleItem = (item, checked) => {
  console.log(item, checked)
  allDataSelected.value = allDataSelected.value.filter((item1) => {
    return item1.itemAssemCode !== item.itemAssemCode
  })
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
  if (item.isTaocan) {
    xuanzhongData.value = {}
    allDataSelected.value.forEach((item) => {
      item.isTaocan = false
    })
  }
  shaixuanpeSetList.value = peSetList.value
  checkedPeSetListData.value = ''
  let num = 0
  allDataSelected.value.forEach((item) => {
    num += item.personPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
}
const taocanFiter = () => {
  if (taocanSearch.value) {
    shaixuanpeSetList.value = shaixuanpeSetList.value.filter(
      (item) => item.setCode != xuanzhongData.value.setCode
    )
    shaixuanpeSetList.value = shaixuanpeSetList.value.filter((item) =>
      item.setName.includes(taocanSearch.value)
    )
  } else {
    shaixuanpeSetList.value = peSetList.value.filter(
      (item) => item.setCode != xuanzhongData.value.setCode
    )
  }
}
watch(selectedCategory, (newValue) => {
  console.log(newValue)
  if (currentGroupRow.value && currentGroupRow.value!.groupingCode) {
    if (newValue === '全部') {
      getItemUnselectList(setCode.value)
    } else {
      getItemUnselectList(setCode.value, newValue)
    }
  }
})
//已选组合筛选
const yixuanzuhe = ref('')
const fuzhiAllDataSelected = ref<any>([])
const yixuanzuheFiter = () => {
  if (yixuanzuhe.value) {
    allDataSelected.value = allDataSelected.value.filter((item) =>
      item.itemAssemName.includes(yixuanzuhe.value)
    )
  } else {
    allDataSelected.value = fuzhiAllDataSelected.value
  }
}
const unitCodeList = ref<any>([])
onMounted(async () => {
  formInfo.unitCode = await getMaxUnitCode({})
  let res = await getSystemDateTime()
  nowDate.value = formatDate(res, 'YYYY-MM-DD HH:mm:ss')
  unitCodeList.value = await getPeUnitList({
    input: ''
  })
  getClass()
})
const filterParentUnit = async (v) => {
  unitCodeList.value = await getPeUnitList({
    input: v
  })
}
const saveDengJi = async () => {
  if (!formInfo.unitName) {
    ElMessage.warning('请输入单位名称')
    unitNameRef.value.focus()
    return
  }
  let lock = false
  if (itemsList.value && itemsList.value.length > 0) {
    itemsList.value.some((item, index) => {
      if (!item.groupingName) {
        lock = true
        ElMessage.warning('第' + index + 1 + '行组名不能为空')
        return true
      }
    })
  }
  if (!lock) {
    let itemList: any = []
    let num = 0
    allDataSelected.value.forEach((item) => {
      num += item.personPrice * 100
    })
    formInfo.totalCharges = (num / 100).toFixed(2)
    formInfo.itemList = itemList
    console.log(allDataSelected.value, itemList, num)
    await appointSaveAll({
      unitCode: formInfo.unitCode,
      unitVisitId: formInfo.unitVisitId,
      unitName: formInfo.unitName,
      connecter: formInfo.connecter,
      phone: formInfo.phone,
      address: formInfo.address,
      unitNumber: formInfo.unitNumber,
      unitType: formInfo.unitType,
      peType: formInfo.peType,
      inputCode: formInfo.inputCode,
      unitAlias: formInfo.unitAlias,
      parentUnitCode: formInfo.parentUnitCode,
      allowFlag: formInfo.allowFlag,
      occTypecode: formInfo.occTypecode,
      occTypename: formInfo.occTypename,
      poststTypecode: formInfo.poststTypecode,
      poststTypename: formInfo.poststTypename,
      optionFlag: formInfo.optionFlag,
      groupingDictDOList: itemsList.value
    })
    ElMessage.success('保存成功')
    formInfo.unitCode = await getMaxUnitCode({})
    await searchByUnitCode()
  }
}
//单位代码查询
const searchByUnitCode = async () => {
  //
  let res = await getUnitInfo({
    unitCode: formInfo.unitCode
  })
  if (res) {
    formInfo.unitVisitId = res.unitVisitId || 1
    if (res.unitVisitId) {
      formInfo.unitName = res.unitName || ''
      formInfo.unitAlias = res.unitAlias || ''
      formInfo.connecter = res.connecter || ''
      formInfo.phone = res.phone || ''
      formInfo.address = res.address || ''
      formInfo.unitNumber = res.unitNumber || ''
      formInfo.poststTypename = res.poststTypename || ''
      formInfo.peType = res.peType || ''
      formInfo.inputCode = res.inputCode || ''
      formInfo.parentUnitCode = res.parentUnitCode || ''
      formInfo.status = res.status || ''
      formInfo.appointsDate = res.appointsDate || ''
    }
    formInfo.optionFlag = res.optionFlag
    if (res.groupingDictDOList && res.groupingDictDOList.length > 0) {
      itemsList.value = res.groupingDictDOList
      itemsList.value.forEach((item) => {
        item.operateType = 'del'
      })
      choseRow(itemsList.value[0])
    } else {
      itemsList.value = []
      currentGroupRow.value = {}
      peSetList.value = []
      allDataUnselect.value = []
      shaixuanAllDataList.value = []
      checkedPeSetListData.value = ''
      allDataSelected.value = []
      xuanzhongData.value = {}
      shaixuanpeSetList.value = peSetList.value
      setCode.value = ''
      shaixuanChecked.value = []
      xuanzhongChecked.value = []
      taocanSearch.value = ''
      zuheSearch.value = ''
      formInfo.setCode = ''
    }
    unitNameRef.value.focus()
  }
}
const handleDeleteAppoint = async () => {
  if (formInfo.unitCode && formInfo.unitName && formInfo.unitVisitId && formInfo.unitVisitId != 0) {
    ElMessageBox.confirm('删除预约会将分组和单位信息一起删除，确认要删除该预约吗？', '提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(async () => {
        await deleteAppointment({
          unitCode: formInfo.unitCode,
          unitVisitId: formInfo.unitVisitId,
          unitName: formInfo.unitName
        })
        ElMessage.success('删除预约成功')
        await searchByUnitCode()
      })
      .catch(() => {})
  }
}
const groupingNameRef = ref()
const appiontStartDate = ref('')
const appiontEndDate = ref('')
const appiontDateVisible = ref(false)
const nowDate = ref('')
const appiontDate = async () => {
  if (!formInfo.unitCode) {
    ElMessage.warning('请输入单位代码')
    unitNameRef.value.focus()
    return
  }
  if (!formInfo.unitName) {
    ElMessage.warning('请输入单位名称')
    unitNameRef.value.focus()
    return
  }
  if (itemsList.value && itemsList.value.length == 1 && !itemsList.value[0].groupingName) {
    ElMessage.error('请输入分组名称')
    nextTick(() => {
      groupingNameRef.value[0]?.focus()
    })
    return
  }
  appiontStartDate.value = formatDate(new Date(nowDate.value), 'YYYY-MM-DD')
  appiontEndDate.value = formatDate(new Date(nowDate.value), 'YYYY-MM-DD')
  appiontDateVisible.value = true
}
const appiontDateConfirms = async () => {
  if (appiontStartDate.value && appiontEndDate.value) {
    appiontDateVisible.value = false
    await appointmentExam({
      unitCode: formInfo.unitCode,
      unitVisitId: formInfo.unitVisitId,
      unitName: formInfo.unitName,
      connecter: formInfo.connecter,
      phone: formInfo.phone,
      address: formInfo.address,
      unitNumber: formInfo.unitNumber,
      unitType: formInfo.unitType,
      peType: formInfo.peType,
      inputCode: formInfo.inputCode,
      unitAlias: formInfo.unitAlias,
      parentUnitCode: formInfo.parentUnitCode,
      allowFlag: formInfo.allowFlag,
      occTypecode: formInfo.occTypecode,
      occTypename: formInfo.occTypename,
      poststTypecode: formInfo.poststTypecode,
      poststTypename: formInfo.poststTypename,
      optionFlag: formInfo.optionFlag,
      startDate: appiontStartDate.value,
      endDate: appiontEndDate.value,
      groupingDictDOList: itemsList.value
    })
    ElMessage.success('预约成功')
    await searchByUnitCode()
  } else {
    ElMessage.error('预约开始时间，预约结束时间不能为空')
  }
}
const setRowClassName = ({ row }) => {
  if (row.groupingCode === currentGroupRow.value.groupingCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const setgroupingDict = () => {
  if (currentGroupRow.value && currentGroupRow.value!.groupingCode) {
    let zIndex = itemsList.value.findIndex(
      (res) => res.groupingCode == currentGroupRow.value!.groupingCode
    )
    if (xuanzhongData.value && xuanzhongData.value.setCode) {
      itemsList.value[zIndex].setListSelected = peSetList.value.filter(
        (item) => item.setCode == xuanzhongData.value.setCode
      )
    } else {
      itemsList.value[zIndex].setListSelected = []
    }
    console.log(allDataSelected.value, 'allDataSelected.value')
    if (allDataSelected.value && allDataSelected.value.length > 0) {
      itemsList.value[zIndex].itemListSelected = allDataSelected.value
      // .filter(
      //   (item) => !item.isTaocan
      // )
    }
    console.log(itemsList.value[zIndex], 'itemsList.value[zIndex]')
  }
}
watch([xuanzhongData, allDataSelected], () => setgroupingDict(), { deep: true })

const choseRow = async (row) => {
  console.log(row)
  currentGroupRow.value = row
  peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
  let res = await getPeItemAssembledList({
    pageNo: 1,
    pageSize: 10000000,
    form: '',
    clinicFlag: 1
  })
  selectedCategory.value = '全部'
  allDataUnselect.value = res.records || []
  shaixuanAllDataList.value = res.records || []
  allDataSelected.value = []
  xuanzhongData.value = {}
  checkedPeSetListData.value = ''
  shaixuanpeSetList.value = peSetList.value
  setCode.value = ''
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
  taocanSearch.value = ''
  zuheSearch.value = ''
  formInfo.setCode = ''
  //套餐
  if (row.setListSelected && row.setListSelected.length > 0) {
    xuanzhongData.value = row.setListSelected[0]
    shaixuanpeSetList.value = peSetList.value.filter(
      (item) => item.setCode != row.setListSelected[0].setCode
    )
    setCode.value = row.setListSelected[0].setCode
    let arr = await getPeSetItemSelectedList({
      form: '',
      pageNo: 1,
      pageSize: 10000000,
      setCode: row.setListSelected[0].setCode
    })
    if (arr && arr.length > 0) {
      arr.forEach((item) => {
        allDataSelected.value.push({
          ...item,
          isTaocan: true
        })
      })
      fuzhiAllDataSelected.value = allDataSelected.value
    }
  }
  //项目
  if (row.itemListSelected && row.itemListSelected.length > 0) {
    // row.itemListSelected.forEach((item) => {
    //   allDataSelected.value.unshift({
    //     ...item,
    //     isTaocan: false
    //   })
    // })
    allDataSelected.value = mergeAndDeduplicateByitemAssemCode(
      allDataSelected.value,
      row.itemListSelected
    )
  }
  if (allDataSelected.value && allDataSelected.value.length > 0) {
    let num = 0
    allDataSelected.value.forEach((item) => {
      num += item.personPrice * 100
      item.groupingCode = row.groupingCode
    })
    formInfo.totalCharges = (num / 100).toFixed(2)
    if (allDataSelected.value.length > 0) {
      const allDataSelectedItemCodes = new Set(
        allDataSelected.value.map((item) => item.itemAssemCode)
      )
      shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
        return !allDataSelectedItemCodes.has(item.itemAssemCode)
      })
    }
  }
  console.log(allDataSelected.value, 'allDataSelected.value')
}
const mergeAndDeduplicateByitemAssemCode = (arr1, arr2) => {
  const primaryCodes = new Set(arr1.map((item) => item.itemAssemCode))
  const uniqueItems = arr2.filter((item) => !primaryCodes.has(item.itemAssemCode))
  console.log(uniqueItems, 'uniqueItems')
  if (uniqueItems && uniqueItems.length > 0) {
    uniqueItems.forEach((item) => {
      item.isTaocan = false
    })
  }
  arr1.unshift(...uniqueItems)
  return arr1
}
const selectUnitCodeVisiable = ref(false)
const keyWord = ref('')
const unitCodeListNew = ref<any>([])
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
  unitCodeListNew.value = await getPeUnitList({
    input: keyWord.value
  })
}
const selectUnitCodeClick = async (row) => {
  formInfo.unitCode = row.unitCode
  selectUnitCodeVisiable.value = false
  await searchByUnitCode()
}
// 获取分类
const getClass = async () => {
  await getPeItemAssemClass().then((res) => {
    categories.value = res.filter((item) => item && item.className)
    categories.value = [{ className: '全部', value: 'all' }, ...categories.value]
  })
}

import { pinyin } from 'pinyin-pro'
const generateInputCode = () => {
  const pinyinResult = pinyin(formInfo.unitName, {
    pattern: 'first', // 只获取首字母
    toneType: 'none', // 不包含声调
    type: 'array' // 返回数组格式
  })

  // 将拼音首字母数组连接成字符串并转为大写
  formInfo.inputCode = formInfo.value.inputCode = pinyinResult
    .join('')
    .toUpperCase()
    .substring(0, 8)
}
</script>

<style lang="scss" scoped>
.base-register {
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
:deep(.el-table) {
  font-size: 14px;
}
.base-title {
  padding: 0 6px;
  color: #3473d1;
  font-size: 16px;
  height: 29px;
  line-height: 29px;
  position: relative;
  font-weight: 700;
  border-bottom: 1px solid #c5dcff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  //   width: 100px;
  //   height: 2px;
  //   background-color: #3473d1;
  // }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
.base-title2 {
  height: 36px;
  line-height: 36px;
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

.cont-span {
  text-align: right;
  color: #3473d1;
  position: relative;
  top: 4px;
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
  // width: calc(100% - 20px);
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
.unSelectpackage {
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 10px;
  width: 100%;
  height: 250px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  gap: 0;
  > div {
    width: 49%;
    height: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    word-break: break-all;
    white-space: nowrap;
  }
}
.selectedpackage {
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 10px;
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  gap: 0;
  > div {
    width: 49%;
    height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.project-class {
  width: 100%;
  display: flex;
  // height: 32px;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom: 1px solid rgb(204, 204, 204);
  .el-radio-group {
    display: flex;
    gap: 8px;
    flex-wrap: nowrap;
  }
  .category-tag {
    margin: 0 !important;

    :deep(.el-radio-button__inner) {
      padding: 8px 12px;
      border: none;
    }

    &.is-active {
      border-color: #3473d1;
      :deep(.el-radio-button__inner) {
        background: #3473d1;
        color: white;
      }
    }
  }
}
:deep(.el-form-item) {
  margin-bottom: 12px !important;
}
.span1 {
  position: relative;
  top: 4px;
}
.unitVisit {
  position: relative;
  top: 4px;
  color: #3473d1;
  margin-left: 36px;
  background: #eef1f5;
  padding-left: 36px;
}
:deep(.table-checked-row-style) {
  background: #eaeffc !important;
  color: #3473d1 !important;
}
.selectBtn {
  .el-button {
    position: relative;
    top: 0px;
    margin-left: -4px;
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
