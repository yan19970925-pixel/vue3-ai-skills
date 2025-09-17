<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="6" class="pr-4px" style="height: 100%">
          <div class="content" style="height: 50%">
            <div class="base-title">分类列表</div>
            <el-table
              :data="deptList"
              border
              class="mt-8px"
              style="width: 100%; height: calc(100% - 52px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="handleDeptClick"
            >
              <el-table-column label="分类" prop="peDeptClass" width="120" show-overflow-tooltip />
              <el-table-column label="科室名称" prop="peDeptName" show-overflow-tooltip />
              <el-table-column label="外部科室" prop="label2" show-overflow-tooltip />
            </el-table>
          </div>

          <div class="content" style="height: 49%; margin-top: 4px">
            <div class="base-box" style="height: 100%">
              <div class="base-title">项目组合列表</div>
              <el-table
                :data="itemsList"
                border
                class="mt-8px"
                style="width: 100%; height: calc(100% - 52px); min-height: 300px; overflow: auto"
                highlight-current-row
                stripe
                @row-click="handleItemsClick"
              >
                <el-table-column label="项目组合" prop="itemAssemName" show-overflow-tooltip />
                <el-table-column label="组合代码" prop="itemAssemCode" show-overflow-tooltip />
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="18" style="height: 100%">
          <div class="content" style="height: 50%">
            <div class="base-title">项目列表</div>
            <div class="base-cont mt-8px">
              <!-- <span class="cont-span">过滤条件：</span>
              <el-select
                v-model="option"
                placeholder="请选择机构名称"
                style="width: 14%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, index) in filteredOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
              <span class="cont-span">过滤：</span>
              <el-input
                style="width: 14%"
                v-model="filterInfo"
                placeholder="请输入"
                class="select-item"
              />

              <el-button type="primary" @click="filter">过滤</el-button>
              <el-button class="resetBtn" @click="handleAddNewItem">新增</el-button>
              <!-- <el-button type="danger" @click="handleDeleteItem">删除</el-button> -->
              <!-- <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
            </div>
            <el-table
              :data="itemList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 130px); overflow: auto"
              highlight-current-row
              stripe
              @row-click="handleItemClick"
            >
              <el-table-column
                label="项目代码"
                prop="peItemCode"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="项目名称"
                prop="peItemName"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="体检科室"
                prop="peDeptName"
                width="120px"
                show-overflow-tooltip
              />
              <el-table-column
                label="所属组合"
                prop="itemAssemName"
                width="120px"
                show-overflow-tooltip
              />
              <el-table-column label="上限" prop="upperLimit" show-overflow-tooltip />
              <el-table-column
                label="女性上限"
                prop="feupperLimit"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column label="正常值" prop="normalValue" show-overflow-tooltip />
              <el-table-column label="下限" prop="lowerLimit" show-overflow-tooltip />
              <el-table-column label="建议" prop="suggest" show-overflow-tooltip />
              <el-table-column label="序号" prop="orderNo" show-overflow-tooltip />
              <el-table-column label="备注" prop="notes" show-overflow-tooltip />
              <el-table-column label="单位" prop="unit" show-overflow-tooltip />
              <el-table-column label="输入码" prop="inputCode" width="120" show-overflow-tooltip />
              <el-table-column label="描述" prop="describes" show-overflow-tooltip />
              <el-table-column
                label="结果表现方式"
                prop="peResultClass"
                width="140"
                show-overflow-tooltip
              />
              <el-table-column
                label="结果类型"
                prop="resultCate"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column label="缺省值" prop="defaultValue" show-overflow-tooltip />
              <el-table-column label="对照码" prop="mappingCode" show-overflow-tooltip />
              <el-table-column
                label="女性下限"
                prop="felowerLimit"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column label="性别" prop="sex" show-overflow-tooltip />
              <!-- 可以删除的操作列 -->
              <!-- 固定右侧 -->
              <el-table-column label="操作" width="100" fixed="right">
                <template #default="scope">
                  <el-button
                    style="color: red"
                    type="text"
                    size="small"
                    @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handlePageChange"
              style="margin-top: 15px; text-align: center"
            />
          </div>

          <!-- 项目详情 -->
          <div class="content" style="height: calc(49%); margin-top: 4px; padding-bottom: 2px">
            <div class="base-title">项目详情</div>

            <div class="base-cont mt-8px">
              <span class="cont-span">代码:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.peItemCode"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">项目名称:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.peItemName"
                placeholder="请输入"
                class="select-item"
                @blur="generateInputCode"
              />
              <span class="cont-span">科室:</span>

              <el-select
                style="width: 13%"
                v-model="selectedItem.peDeptCode"
                placeholder="请选择科室"
                class="select-item"
                filterable
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.peDeptCode"
                  :label="item.peDeptName"
                  :value="item.peDeptCode"
                />
              </el-select>
              <span class="cont-span">结果类型:</span>
              <el-select
                style="width: 13%"
                v-model="selectedItem.resultCate"
                placeholder="请选择结果类型"
                class="select-item"
                filterable
                clearable
              >
                <el-option label="数字" value="数字" />
                <el-option label="非数字" value="非数字" />
              </el-select>
            </div>
            <div class="base-cont">
              <span class="cont-span">结果表现方式:</span>
              <el-select
                style="width: 13%"
                v-model="selectedItem.peResultClass"
                placeholder="请选择结果表现方式"
                class="select-item"
                filterable
                clearable
              >
                <el-option label="字符" value="字符" />
                <el-option label="检验" value="检验" />
                <el-option label="报告" value="报告" />
              </el-select>
              <span class="cont-span">单位:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.unit"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">上限:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.upperLimit"
                type="number"
                step="0.01"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">下限:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.lowerLimit"
                type="number"
                step="0.01"
                placeholder="请输入"
                class="select-item"
              />
            </div>

            <div class="base-cont">
              <span class="cont-span">缺省值:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.defaultValue"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">正常值:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.normalValue"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">女性上限:</span>
              <el-input
                style="width: 13%"
                v-model.number="selectedItem.feupperLimit"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">女性下限:</span>
              <el-input
                style="width: 13%"
                v-model.number="selectedItem.felowerLimit"
                placeholder="请输入"
                class="select-item"
              />
              <el-checkbox
                :model-value="selectedItem.displayFlag === '0'"
                @change="(val) => (selectedItem.displayFlag = val ? '0' : '1')"
                label="显示"
                size="large"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">对应性别:</span>
              <el-select
                style="width: 13%"
                v-model="selectedItem.sex"
                placeholder="请选择对应性别"
                class="select-item"
                filterable
                clearable
              >
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
                <el-option label="未知" value="未知" />
                <el-option label="未定" value="未定" />
              </el-select>
              <span class="cont-span">序号:</span>
              <el-input
                style="width: 13%"
                v-model.number="selectedItem.orderNo"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">输入码:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.inputCode"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">对照码:</span>
              <el-input
                style="width: 13%"
                v-model="selectedItem.relateCode"
                placeholder="请输入"
                class="select-item"
                readonly
              >
                <template #append>
                  <el-button :icon="Search" @click="openLisDictDialog" />
                </template>
              </el-input>
            </div>
            <div class="base-cont">
              <span class="cont-span">描述：</span>
              <el-input
                style="width: 60%"
                v-model="selectedItem.describes"
                placeholder="请输入"
                class="select-item"
                type="textarea"
                :rows="2"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">建议：</span>
              <el-input
                style="width: 60%"
                v-model="selectedItem.suggest"
                placeholder="请输入"
                class="select-item"
                type="textarea"
                :rows="2"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">备注：</span>
              <el-input
                style="width: 60%"
                v-model="selectedItem.notes"
                placeholder="请输入"
                class="select-item"
                type="textarea"
                :rows="2"
              />
              <div class="base-btn">
                <div class="btn-box" @click="handleSaveDocument">保存</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <DictDialog
      :visible="DictDialogVisible"
      :title="DictType"
      :query-params="QueryParams"
      width="800px"
      @callback="DictCallback"
      @on-close="DictDialogVisible = false"
    />
  </div>
</template>

<script lang="ts" setup name="phyExamItem">
import { ref, onMounted } from 'vue'
import * as Api from '@/api/systemSetting/phyExamItem/index'
import { Search } from '@element-plus/icons-vue'
import DictDialog from '@/views/components/DictDialog/Index.vue'

// ===================== 响应式数据 =====================

const total = ref(0)
const pageSize = ref(22)
const currentPage = ref(1)
const deptList = ref([])
const itemsList = ref([])
const itemList = ref([])
const selectedItem = ref({
  peItemCode: '',
  peItemName: '',
  peDeptCode: '',
  peResultClass: '',
  normalValue: '',
  unit: '',
  upperLimit: 0,
  lowerLimit: 0,
  sex: '',
  describes: '',
  suggest: '',
  defaultValue: '',
  orderNo: 0,
  notes: '',
  inputCode: '',
  relateCode: '',
  relateName: '',
  resultCate: '',
  feupperLimit: 0,
  felowerLimit: 0,
  displayFlag: '0', // 0 显示； 1 不显示
  createDatetime: ''
})

const option = ref('选项一')
const certName = ref('')
const checked1 = ref(false)

// 获取项目组合数据
const getPeitemAssemLists = async (peDeptCode) => {
  itemList.value = []
  resSelectItem()
  const res = await Api.getPeItemAssemList({
    itemAssemCode: '',
    peDeptCode: peDeptCode
  })
  itemsList.value = res
  if (res.length > 0) {
    // handleItemsClick(res[0])
    getPeitemLists('', 1, peDeptCode)
  }
}

const handlePageChange = (newPage) => {
  getPeitemLists(itemAssemCode.value, newPage)
}
// 获取项目数据
const getPeitemLists = async (itemAssemCode = '', page = 1, peDeptCode = '') => {
  itemList.value = []
  resSelectItem()
  const res = await Api.getPeItemList({
    pageNo: page,
    pageSize: pageSize.value,
    peDeptCode: peDeptCode || '',
    itemAssemCode: itemAssemCode,
    peItemName: '',
    inputCode: ''
  })
  itemList.value = res.records || []
  if (res.records && res.records.length > 0) {
    handleItemClick(res.records[0])
    total.value = res.total
    currentPage.value = page
  }
}
const itemAssemCode = ref('')
// 点击项目组合行事件
const handleItemsClick = (row) => {
  itemAssemCode.value = row.itemAssemCode
  getPeitemLists(itemAssemCode.value)
}

// 点击项目列表行事件
const handleItemClick = (row) => {
  selectedItem.value = { ...row }
}
const classListDetaiil = ref()
// 点击分类列表行事件
const handleDeptClick = (row) => {
  classListDetaiil.value = row
  getPeitemAssemLists(row.peDeptCode)
}

// 获取分类数据
const getDept = async () => {
  const res = await Api.getPeDeptList('application/x-www-form-urlencoded')
  deptList.value = res
  if (res.length > 0) {
    handleDeptClick(res[0])
  }
}
// 声明表单参数对象
const peItemParams = reactive({
  peItemCode: '',
  peItemName: '',
  peDeptCode: '',
  peResultClass: '',
  normalValue: '',
  unit: '',
  upperLimit: 0,
  lowerLimit: 0,
  sex: '',
  describes: '',
  suggest: '',
  defaultValue: '',
  orderNo: 0,
  notes: '',
  inputCode: '',
  relateCode: '',
  relateName: '',
  resultCate: '',
  feupperLimit: 0,
  felowerLimit: 0,
  displayFlag: '0',
  createDatetime: ''
})
// 保存项目数据
const savePeItem = async () => {
  try {
    const res = await Api.savePeItemDict(peItemParams)
    // 可选：刷新列表或更新当前项
    if (res === true) {
      ElMessage.success('保存成功')
    }
  } catch (error) {
    console.error('保存失败:', error)
  }
}
onMounted(() => {
  getDept()
})
// 点击保存
const handleSaveDocument = () => {
  ;(peItemParams.peItemCode = selectedItem.value.peItemCode || ''),
    (peItemParams.peItemName = selectedItem.value.peItemName || ''),
    (peItemParams.peDeptCode = selectedItem.value.peDeptCode || ''),
    (peItemParams.peResultClass = selectedItem.value.peResultClass || ''),
    (peItemParams.normalValue = selectedItem.value.normalValue || ''),
    (peItemParams.unit = selectedItem.value.unit || ''),
    (peItemParams.upperLimit = Number(selectedItem.value.upperLimit) || 0),
    (peItemParams.lowerLimit = Number(selectedItem.value.lowerLimit) || 0),
    (peItemParams.sex = selectedItem.value.sex || ''),
    (peItemParams.describes = selectedItem.value.describes || ''),
    (peItemParams.suggest = selectedItem.value.suggest || ''),
    (peItemParams.defaultValue = selectedItem.value.defaultValue || ''),
    (peItemParams.orderNo = Number(selectedItem.value.orderNo) || 0),
    (peItemParams.notes = selectedItem.value.notes || ''),
    (peItemParams.inputCode = selectedItem.value.inputCode || ''),
    (peItemParams.relateCode = selectedItem.value.relateCode || ''),
    (peItemParams.relateName = ''), // 页面上无输入，保留空
    (peItemParams.resultCate = selectedItem.value.resultCate || ''),
    (peItemParams.feupperLimit = Number(selectedItem.value.feupperLimit) || 0),
    (peItemParams.felowerLimit = Number(selectedItem.value.felowerLimit) || 0),
    (peItemParams.displayFlag = selectedItem.value.displayFlag || '0'),
    (peItemParams.createDatetime = '') // 页面上无输入，保留空
  savePeItem()
}

// 删除项目数据（根据 peItemCode）
const delPeItem = async (peItemCode: string) => {
  try {
    const res = await Api.delPeItemDict({ peItemCode })
    // 删除成功后刷新列表
    if (res === true) {
      getDept()
    }
  } catch (error) {
    console.error('删除出错:', error)
  }
}
// 点击删除
const handleDelete = (row) => {
  if (confirm(`确定要删除项目【${row.peItemName}】吗？`)) {
    delPeItem(row.peItemCode)
  }
}
const resSelectItem = () => {
  selectedItem.value = {
    peItemCode: '',
    peItemName: '',
    peDeptCode: '',
    peResultClass: '',
    normalValue: '',
    unit: '',
    upperLimit: null,
    lowerLimit: null,
    sex: '',
    describes: '',
    suggest: '',
    defaultValue: '',
    orderNo: 0,
    notes: '',
    inputCode: '',
    relateCode: '',
    resultCate: '',
    feupperLimit: null,
    felowerLimit: null,
    displayFlag: '0',
    createDatetime: ''
  }
}
// 点击新增
const handleAddNewItem = async () => {
  const peItemCode = await Api.getMaxPeItemDictNo({ peDeptCode: classListDetaiil.value.peDeptCode })

  selectedItem.value = {
    peItemCode: peItemCode || '',
    peItemName: '',
    peDeptCode: '',
    peResultClass: '',
    normalValue: '',
    unit: '',
    upperLimit: null,
    lowerLimit: null,
    sex: '',
    describes: '',
    suggest: '',
    defaultValue: '',
    orderNo: 0,
    notes: '',
    inputCode: '',
    relateCode: '',
    resultCate: '',
    feupperLimit: null,
    felowerLimit: null,
    displayFlag: '0',
    createDatetime: ''
  }
  selectedItem.value.peDeptName = classListDetaiil.value.peDeptName
  selectedItem.value.peDeptCode = classListDetaiil.value.peDeptCode
  const pinyinResult = pinyin(selectedItem.value.peDeptName, {
    pattern: 'first', // 只获取首字母
    toneType: 'none', // 不包含声调
    type: 'array' // 返回数组格式
  })
  selectedItem.value.peItemCode = formInfo.value.inputCode =
    pinyinResult.join('').toUpperCase().substring(0, 8) + peItemCode
}
const filterInfo = ref('')
// 点击过滤
const filter = () => {
  itemAssemCode.value = ''
  getPeitemLists(filterInfo.value)
}

// 在响应式数据部分添加以下内容
const DictDialogVisible = ref(false)
const DictType = ref('')
const QueryParams = ref({
  dictType: '体检LIS对照',
  cons: '',
  keyWord: '',
  counts: '1000000'
})

// 在方法部分添加以下内容
const openLisDictDialog = () => {
  QueryParams.value = {
    dictType: '体检LIS对照表',
    cons: '',
    keyWord: '',
    counts: '500'
  }
  DictType.value = '体检LIS对照表'
  DictDialogVisible.value = true
}

const DictCallback = (row) => {
  selectedItem.value.relateCode = row.itemCode || row.code || ''
  DictDialogVisible.value = false
}

import { pinyin } from 'pinyin-pro'
const generateInputCode = () => {
  const pinyinResult = pinyin(selectedItem.value.peItemName, {
    pattern: 'first', // 只获取首字母
    toneType: 'none', // 不包含声调
    type: 'array' // 返回数组格式
  })

  // 将拼音首字母数组连接成字符串并转为大写
  selectedItem.value.inputCode = selectedItem.value.inputCode = pinyinResult
    .join('')
    .toUpperCase()
    .substring(0, 8)
}
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
</style>
