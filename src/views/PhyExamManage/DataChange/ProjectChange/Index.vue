<template>
  <div class="base-register">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="10" class="pr-6px" style="height: 100%">
          <div class="content" style="height: 240px">
            <div class="base-title mb-16px">过滤条件</div>
            <el-form ref="formRef" label-width="90px" style="width: 96%">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="单位代码:">
                    <el-input
                      v-model="formInfo.unitCode"
                      @keyup.enter="searchByUnitCode"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
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
                <el-col :span="8">
                  <el-form-item label="体检号:">
                    <el-input v-model="formInfo.peId" placeholder="请输入" type="text" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名:">
                    <el-input v-model="formInfo.name" placeholder="请输入" type="text" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="">
                    <!-- <el-button type="primise">查询</el-button> -->
                    <el-button type="primary" @click="search()">查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input v-model="formInfo.age" placeholder="请输入" type="text" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上限:">
                    <el-input
                      v-model="formInfo.shangxian"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下限:">
                    <el-input
                      v-model="formInfo.xiaxian"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="婚姻:">
                    <el-input
                      v-model="formInfo.maritalStatus"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别:">
                    <el-input v-model="formInfo.sex" placeholder="请输入" type="text" clearable />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="职务:">
                    <el-input
                      v-model="formInfo.unitInContract"
                      placeholder="请输入"
                      type="text"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="单位名称:">
                    <el-input
                      ref="unitNameRef"
                      :disabled="!formInfo.unitVisitId"
                      v-model="formInfo.unitName"
                      placeholder="请输入"
                      type="text"
                      clearable
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
              </el-row> -->
            </el-form>
          </div>

          <div class="content" style="height: calc(100% - 376px + 130px); margin-top: 6px">
            <div class="base-box" style="height: 100%">
              <div class="base-title base-title2"
                >体检列表
                <!-- <el-button
                  class="resetBtn"
                  :disabled="!formInfo.unitVisitId"
                  style="height: 28px; line-height: 28px; margin-top: 3px"
                  @click="handleAddNewItem"
                  >新建分组</el-button
                > -->
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
                  label="体检号"
                  width="140"
                  align="center"
                  prop="peId"
                  show-overflow-tooltip
                />
                <el-table-column label="次数" width="80" prop="peVisitId" show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                  label="姓名"
                  width="140"
                  align="center"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="年龄"
                  width="80"
                  align="center"
                  prop="age"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="性别"
                  prop="sex"
                  width="84"
                  align="center"
                  show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                  label="婚姻"
                  width="80"
                  align="center"
                  prop="maritalStatus"
                  show-overflow-tooltip
                />

                <el-table-column
                  label="职务"
                  width="80"
                  align="center"
                  prop="groupingCode"
                  show-overflow-tooltip
                />

                <el-table-column
                  label="预约日期"
                  width="180"
                  align="center"
                  prop="groupingCode"
                  show-overflow-tooltip
                />

                <el-table-column
                  label="出生日期"
                  width="180"
                  align="center"
                  prop="dateOfBirth"
                  show-overflow-tooltip
                />
                <!-- <el-table-column fixed="right" label="操作" align="center" width="60">
                  <template #default="scope">
                    <el-button
                      type="text"
                      style="color: rgb(243, 61, 33)"
                      @click.stop="handleDeleteItem(scope.row, scope.$index)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="14" style="height: 100%">
          <div class="content" style="height: 370px">
            <div class="base-title">套餐修改</div>
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
                  ><div class="div" v-for="item in shaixuanpeSetList" :key="item.setCode">
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

          <!-- 项目修改 -->
          <div class="content" style="height: calc(100% - 376px); margin-top: 6px">
            <div class="base-title">项目修改</div>
            <div class="project-class">
              <el-radio-group v-model="selectedCategory">
                <el-radio-button
                  v-for="item in categories"
                  :key="item.className"
                  :label="item.className"
                  class="category-tag"
                >
                  {{ item.className }}
                </el-radio-button>
              </el-radio-group>
            </div>
            <el-row style="width: 100%; height: calc(100% - 80px - 30px)">
              <el-col :span="14" class="pl-10px pr-10px" style="height: 100%; display: block">
                <div class="flex mt-10px align-items">
                  <span class="cont-span">未选：</span>

                  <el-input
                    :disabled="!formInfo.unitVisitId"
                    style="width: calc(100% - 42px)"
                    v-model="zuheSearch"
                    placeholder="请输入"
                    class="select-item"
                    @change="zuheFiter"
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
              <el-col :span="10" class="pl-10px pr-10px" style="height: 100%; display: block">
                <!-- <div class="flex mt-10px">
                  <span class="cont-span">已选：</span>

                  <el-input
                    :disabled="!formInfo.unitVisitId"
                    style="width: calc(100% - 42px)"
                    v-model="formInfo.setCode"
                    @change="yixuanzuheFiter()"
                    placeholder="请输入"
                    class="select-item"
                  />
                </div> -->
                <div class="flex mt-10px">
                  <span class="cont-span" style="color: red">团检加项请选择加项标记：</span>
                  <el-radio-group v-model="AddItemFlag">
                    <el-radio label="正常">正常</el-radio>
                    <el-radio label="加项">加项</el-radio>
                  </el-radio-group>
                </div>
                <div class="selectedpackage mt-6px"
                  ><div class="div" v-for="item in allDataSelected" :key="item.itemAssemCode">
                    <el-checkbox-group
                      v-model="xuanzhongChecked"
                      @change="xuanzhongHandleItem(item, xuanzhongChecked)"
                    >
                      <el-checkbox :label="item.itemAssemCode">
                        <span :style="item.addItem == '加项' ? 'color:#3473d1' : 'color:#333'">{{
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
              <!-- <el-button class="resetBtn" @click="appiontDate">预约体检</el-button> -->
              <!-- <el-button type="primary" @click="saveDengJi()">保存</el-button> -->
              <el-button type="primary" @click="saveUpdate">保存</el-button>
              <!-- <el-button type="danger" @click="handleDeleteAppoint">删除预约</el-button> -->
            </div>
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
import * as updateApi from '@/api/PerPhyExamination/DataChange/ProjectChange/index.ts'
import { formatDate } from '@/utils/formatTime'
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
  peId: '',
  name: '',
  maritalStatus: '',
  sex: '',
  age: '',
  peVisitId: '',
  dateOfBirth: '',
  unitCode: ''
})
/**
 * 处理套餐选择点击事件
 *
 * 功能：
 * 1. 设置选中的套餐数据
 * 2. 从未选套餐列表中移除已选套餐
 * 3. 加载套餐内项目列表
 *
 * @param row - 被点击的套餐数据
 * @param val - 选中的套餐编码
 */
const handleItemsClick = async (row, val) => {
  if (!currentGroupRow.value) {
    ElMessage.error('请先选择分组')
    return false
  }

  console.log(row, val)
  // 从未选套餐列表中移除已选套餐
  // const originalUnselected =
  //   [...currentGroupRow.value.noSelectedSets, ...currentGroupRow.value.selectedSets] || []
  const originalUnselected = peSetList.value || []
  shaixuanpeSetList.value = originalUnselected.filter((item) => item.setCode !== row.setCode)

  row.groupingCode = currentGroupRow.value!.groupingCode
  xuanzhongData.value = row
  setCode.value = row.setCode
  checkedPeSetListData.value = row.setCode

  // 加载套餐内项目列表
  await getItemUnselectList(
    row.setCode,
    selectedCategory.value === '全部' ? '' : selectedCategory.value
  )
  await getTaoCanList(row.setCode)
  allDataSelected.value.forEach((element) => {
    element.addItem = AddItemFlag
  })
  // 清空项目选择状态
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
  // 清空选中数据和套餐列表选中项
  xuanzhongData.value = {}
  checkedPeSetListData.value = ''

  // 修复：确保取消选择时将原套餐重新加入未选列表
  if (YiXuanSet.value && YiXuanSet.value.length > 0) {
    // 将原始未选套餐列表与已选套餐合并
    const originalUnselected = currentGroupRow.value.noSelectedSets || []
    shaixuanpeSetList.value = [...originalUnselected, ...YiXuanSet.value]
  } else {
    // 如果没有已选套餐，则使用完整套餐列表
    shaixuanpeSetList.value = peSetList.value
  }

  // 过滤出所有已选的套餐项目并移除它们
  const filterAllDataSelected = allDataSelected.value.filter((res) => res.isTaocan)
  allDataSelected.value = allDataSelected.value.filter((res) => !res.isTaocan)

  // 创建已选套餐项目的编码集合，用于后续筛选
  const allDataSelectedItemCodes = new Set(filterAllDataSelected.map((item) => item.itemAssemCode))

  // 根据已选套餐编码过滤未选列表，更新筛选后的全部数据列表
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })

  // 重置套餐列表选中项
  checkedPeSetListData.value = ''

  // 重新计算总费用
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
    setCode: setCode || '',
    form: form || '',
    clinicFlag: 1
  })
  allDataUnselect.value = res.records || []
  // shaixuanAllDataList.value = res.records || []
  // allDataSelected.value
  if (allDataSelected.value && allDataSelected.value.length > 0) {
    const selectedCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
    shaixuanAllDataList.value = (res.records || []).filter(
      (item) => !selectedCodes.has(item.itemAssemCode)
    )
  } else {
    shaixuanAllDataList.value = res.records || []
  }
}
//组合未选筛选
const zuheSearch = ref('')
const zuheFiter = () => {
  if (zuheSearch.value) {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) =>
      item.itemAssemName.includes(zuheSearch.value)
    )
  } else {
    shaixuanAllDataList.value = allDataUnselect.value
  }
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })
}
const shaixuanHandleItem = (item, checked) => {
  item.isTaocan = false
  item.changed = '新增'
  if (choseRowData.value.chargeType == '个检') {
    item.addItem = '加项'
  } else {
    item.addItem = AddItemFlag.value
  }
  YiXuanItemLists.value.push(item)
  // YiXuanItemLists.value.forEach((yixuanItem) => {
  //   if (yixuanItem.itemAssemCode === item.itemAssemCode) {
  //   yixuanItem.changed = '保留'
  //   item.addItem = AddItemFlag.value
  // } else {
  //   if (AddItemFlag.value == '正常') {
  //     item.addItem = AddItemFlag.value
  //     item.changed = '新增'
  //   }
  // }
  // })
  console.log(YiXuanItemLists.value, item)
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
  xuanzhongData.value = {}
  shaixuanpeSetList.value = peSetList.value
  checkedPeSetListData.value = ''
  fuzhiAllDataSelected.value = allDataSelected.value
}
const xuanzhongHandleItem = (item, checked) => {
  // console.log(item, checked)
  if (YiXuanItemLists.value) {
    YiXuanItemLists.value.forEach((yixuanItem) => {
      if (yixuanItem.itemAssemCode == item.itemAssemCode) {
        yixuanItem.changed = '删除'
      }
    })
  }
  allDataSelected.value = allDataSelected.value.filter((item1) => {
    return item1.itemAssemCode !== item.itemAssemCode
  })
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
  // if (item.isTaocan) {
  xuanzhongData.value = {}
  // }
  shaixuanpeSetList.value = peSetList.value
  checkedPeSetListData.value = ''
  let num = 0
  allDataSelected.value.forEach((item) => {
    num += item.personPrice * 100
    item.isTaocan = false
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
  // if (formInfo.appointPeExam) {
  if (newValue === '全部') {
    getItemUnselectList(setCode.value)
  } else {
    getItemUnselectList(setCode.value, newValue)
  }
  // }
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
  // formInfo.unitCode = await getMaxUnitCode({})
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

const saveUpdate = async () => {
  // 创建一个Set来存储YiXuanItemLists中已有的itemAssemCode，提高查找效率
  const existingItemCodes = new Set(YiXuanItemLists.value.map((item: any) => item.itemAssemCode))

  // 遍历allDataSelected中的项目，只添加YiXuanItemLists中不包含的项目
  allDataSelected.value.forEach((item: any) => {
    if (!existingItemCodes.has(item.itemAssemCode)) {
      YiXuanItemLists.value.push(item)
      // 将新添加的itemAssemCode加入Set，避免后续重复添加
      existingItemCodes.add(item.itemAssemCode)
    }
  })
  await updateApi
    .updatePePatInfo({
      peId: formInfo.peId,
      name: formInfo.name,
      peVisitId: formInfo.peVisitId,
      isUnit: isUnit.value,
      setCode: xuanzhongData.value.setCode || '',
      itemList: YiXuanItemLists.value
    })
    .then((res) => {
      if (res) {
        ElMessage.success('保存成功')
      }
    })
}
//单位代码查询
const searchByUnitCode = async () => {
  //
  let res = await getUnitInfo({
    unitCode: formInfo.unitCode
  })
  if (res) {
    itemsList.value = res
    if (itemsList.value.length > 0) {
      itemsList.value.forEach((item) => {
        item.operateType = 'del'
      })
      choseRow(itemsList.value[0])
    } else {
      itemsList.value = []
      currentGroupRow.value = {}
      peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
      let res = await getPeItemAssembledList({
        pageNo: 1,
        pageSize: 10000000,
        form: '',
        clinicFlag: 1
      })
      allDataUnselect.value = res.records || []
      shaixuanAllDataList.value = res.records || []
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
    // formInfo.unitVisitId = res.unitVisitId || 1
    // if (res.unitVisitId) {
    //   formInfo.unitName = res.unitName || ''
    //   formInfo.unitAlias = res.unitAlias || ''
    //   formInfo.connecter = res.connecter || ''
    //   formInfo.phone = res.phone || ''
    //   formInfo.address = res.address || ''
    //   formInfo.unitNumber = res.unitNumber || ''
    //   formInfo.poststTypename = res.poststTypename || ''
    //   formInfo.peType = res.peType || ''
    //   formInfo.inputCode = res.inputCode || ''
    //   formInfo.parentUnitCode = res.parentUnitCode || ''
    //   formInfo.status = res.status || ''
    //   formInfo.appointsDate = res.appointsDate || ''
    // }
    // formInfo.optionFlag = res.optionFlag
    // if (res.groupingDictDOList && res.groupingDictDOList.length > 0) {
    //   itemsList.value = res.groupingDictDOList
    //   itemsList.value.forEach((item) => {
    //     item.operateType = 'del'
    //   })
    //   choseRow(itemsList.value[0])
    // } else {
    //   itemsList.value = []
    //   currentGroupRow.value = {}
    //   peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
    //   let res = await getPeItemAssembledList({
    //     pageNo: 1,
    //     pageSize: 10000000,
    //     form: '',
    //     clinicFlag: 1
    //   })
    //   allDataUnselect.value = res.records || []
    //   shaixuanAllDataList.value = res.records || []
    //   checkedPeSetListData.value = ''
    //   allDataSelected.value = []
    //   xuanzhongData.value = {}
    //   shaixuanpeSetList.value = peSetList.value
    //   setCode.value = ''
    //   shaixuanChecked.value = []
    //   xuanzhongChecked.value = []
    //   taocanSearch.value = ''
    //   zuheSearch.value = ''
    //   formInfo.setCode = ''
    // }
    // unitNameRef.value.focus()
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
  if (
    row.peId === currentGroupRow.value.peId &&
    row.peVisitId === currentGroupRow.value.peVisitId
  ) {
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
      itemsList.value[zIndex].itemListSelected = allDataSelected.value.filter(
        (item) => !item.isTaocan
      )
    }
    console.log(itemsList.value[zIndex], 'itemsList.value[zIndex]')
  }
}
watch([xuanzhongData, allDataSelected], () => setgroupingDict(), { deep: true })
const YiXuanSet = ref()
const YiXuanItemLists = ref()
const isUnit = ref<boolean>(false)
/**
 * 处理表格行点击事件，初始化选中行的数据
 *
 * 功能：
 * 1. 初始化选中行的基本信息
 * 2. 加载套餐和项目数据
 * 3. 处理已选套餐和项目的展示逻辑
 *
 * 套餐显示逻辑：
 * - 未选套餐列表：显示所有可选套餐（初始状态）
 * - 选择套餐后：未选列表排除已选套餐，已选区域显示选中套餐
 * - 取消套餐选择：未选列表恢复完整列表，已选区域清空
 *
 * @param row - 被点击的表格行数据对象
 */
//点击选中的人
const choseRowData = ref({})
const choseRow = async (row) => {
  choseRowData.value = row
  formInfo.peId = row.peId
  formInfo.peVisitId = row.peVisitId
  await updateApi
    .getPePatInfo({ peId: formInfo.peId || '', peVisitId: formInfo.peVisitId || '' })
    .then(async (resData) => {
      // 保存已选数据
      YiXuanSet.value = resData.selectedSets
      YiXuanItemLists.value = resData.selectedItems
      YiXuanItemLists.value.forEach((item) => {
        if (!item.changed) {
          item.changed = '保留'
        }
      })
      currentGroupRow.value = resData
      if (!resData.unitCode || resData.unitCode == '****') {
        isUnit.value = true
      } else {
        isUnit.value = false
      }
      const list = [...resData.noSelectedSets, ...resData.selectedSets]
      // 初始化数据
      if (list.length > 0) {
        peSetList.value = [...resData.noSelectedSets, ...resData.selectedSets] || []
      } else {
        peSetList.value = (await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })) || []
      }

      let res = await getPeItemAssembledList({
        pageNo: 1,
        pageSize: 10000000,
        form: '',
        clinicFlag: 1
      })

      // 重置所有相关数据
      allDataUnselect.value = res.records || []
      shaixuanAllDataList.value = res.records || []
      allDataSelected.value = []
      xuanzhongData.value = {}
      checkedPeSetListData.value = ''
      shaixuanpeSetList.value = [...peSetList.value] // 显示完整套餐列表
      setCode.value = ''
      shaixuanChecked.value = []
      xuanzhongChecked.value = []
      taocanSearch.value = ''
      zuheSearch.value = ''
      formInfo.setCode = ''

      // 处理已选套餐（如果有）
      if (resData.selectedSets && resData.selectedSets.length > 0) {
        // 设置第一个已选套餐为当前选中
        xuanzhongData.value = resData.selectedSets[0]
        checkedPeSetListData.value = resData.selectedSets[0].setCode
        setCode.value = resData.selectedSets[0].setCode

        // 从未选套餐列表中移除已选套餐
        shaixuanpeSetList.value = shaixuanpeSetList.value.filter(
          (item) => item.setCode !== resData.selectedSets[0].setCode
        )

        // 获取选中套餐包含的项目列表
        let arr = await getPeSetItemSelectedList({
          form: '',
          pageNo: 1,
          pageSize: 10000000,
          setCode: resData.selectedSets[0].setCode
        })

        // 将套餐内项目添加到已选项目列表
        // if (arr && arr.length > 0) {
        //   arr.forEach((item) => {
        //     allDataSelected.value.push({
        //       ...item,
        //       isTaocan: true
        //     })
        //   })
        //   allDataSelected.value = []
        //   console.log('%c Line:1264 🍞 arr', 'color:#93c0a4', arr)
        //   allDataSelected.value = arr
        //   console.log('%c Line:1265 🌰 allDataSelected.value', 'color:#465975', allDataSelected.value)
        //   fuzhiAllDataSelected.value = [...allDataSelected.value]
        // }
      }

      // 处理已选项目（非套餐内项目）
      if (resData.selectedItems && resData.selectedItems.length > 0) {
        resData.selectedItems.forEach((item) => {
          allDataSelected.value.unshift({
            ...item,
            isTaocan: false
          })
        })
      }

      // 计算总费用并更新项目筛选列表
      if (allDataSelected.value && allDataSelected.value.length > 0) {
        let num = 0
        allDataSelected.value.forEach((item) => {
          num += item.personPrice * 100
          item.groupingCode = resData.groupingCode
        })
        formInfo.totalCharges = (num / 100).toFixed(2)

        // 根据已选项目更新未选项目列表
        if (allDataSelected.value.length > 0) {
          const allDataSelectedItemCodes = new Set(
            allDataSelected.value.map((item) => item.itemAssemCode)
          )
          shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
            return !allDataSelectedItemCodes.has(item.itemAssemCode)
          })
        }
      }
    })
}

// const allDataUnselect = ref([]) // 可选项目列表
watch(selectedCategory, (newValue) => {
  console.log(newValue)
  /* if (formInfo.appointPeExam) {
    if (newValue === '全部') {
      getItemUnselectList(setCode.value)
    } else {
      getItemUnselectList(setCode.value, newValue)
    }
  }
  zuheSearch.value = '' */
})
import * as Api from '@/api/systemSetting/PEPackage/index'

// 获取分类
const getClass = async () => {
  await Api.getPeItemAssemClass().then((res) => {
    categories.value = res.filter((item) => item && item.className)
    categories.value = [{ className: '全部', value: 'all' }, ...categories.value]
  })
}
const AddItemFlag = ref<string>('正常')
//个人体检-获取登记信息供修改
const search = async () => {
  if (formInfo.peId) {
    await updateApi
      .getPePatInfo({ peId: formInfo.peId || '', peVisitId: formInfo.peVisitId || '' })
      .then((res) => {
        formInfo.name = res.name
        formInfo.maritalStatus = res.maritalStatus
        formInfo.peId = res.peId
        formInfo.sex = res.sex
        formInfo.age = res.age
        formInfo.peVisitId = res.peVisitId
        formInfo.dateOfBirth = res.dateOfBirth
        // shaixuanpeSetList.value = res.noSelectedSets || []
        // checkedPeSetListData.value = res.selectedSets || []
        // allDataUnselect.value = res.itemList || []
        addUniqueItemsToList(res, itemsList)
      })
  } else {
    ElMessage.error('请输入体检号进行查询')
  }
}
// 写一个方法，将列表数据push进itemsList.value，通过peId去重
const addUniqueItemsToList = (item, list) => {
  if (item.peId) {
    const exists = list.value.some((i) => item.peId === i.peId)

    if (!exists) {
      list.value.push(item)
    }
  }
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
  height: 280px;
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
  span {
    font-size: 14px;
    padding: 6px 15px;
  }
  span.active {
    color: #3473d1;
    font-weight: bold;
    border-bottom: 2px solid #3473d1;
  }
}
:deep(.el-form-item) {
  margin-bottom: 12px !important;
}
:deep(.el-form-item__label) {
  width: 80px !important;
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
</style>
<style>
.el-table--default .cell {
  padding: 0 6px !important;
}

.tag-container {
  flex: 1;
  overflow-x: auto;
  margin: 0 20px;
  margin-bottom: 10px;
  /* 自定义滚动条样式（WebKit引擎浏览器） */
  &::-webkit-scrollbar {
    width: 8px; /* 滚动条的宽度 */
  }

  &::-webkit-scrollbar-thumb {
    /* background-color: #888; 滚动条滑块的颜色 */
    /* border-radius: 6px; 滑块圆角 */
  }

  &::-webkit-scrollbar-track {
    /* background-color: #f1f1f1; 滚动条轨道的颜色 */
  }
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
</style>
