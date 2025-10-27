<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <!-- 左侧套餐列表 -->
        <el-col :span="6" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">套餐列表</div>

            <div class="base-cont" style="background-color: #fff">
              <span class="cont-span">套餐类型：</span>
              <el-select
                v-model="option"
                placeholder="请选择机构名称"
                style="width: 34%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>

            <!-- 套餐表格 -->
            <el-table
              :data="deptList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="handleItemsClick"
              @sort-change="handleSortChange"
            >
              <el-table-column
                label="序号"
                :sort-method="customSortBySortField"
                prop="sort"
                width="55"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <span style="text-align: center">{{ row.sort }}</span>
                </template>
              </el-table-column>
              <el-table-column label="套餐代码" prop="setCode" width="90" show-overflow-tooltip />
              <el-table-column label="套餐名称" prop="setName" show-overflow-tooltip />
              <!-- <el-table-column
                label="个检价格"
                prop="setPersonPrice"
                width="86"
                show-overflow-tooltip
              /> -->
              <el-table-column label="是否显示" prop="displayFlag" width="86" show-overflow-tooltip>
                <template #default="{ row }">
                  <span v-if="row.displayFlag == 0">显示</span>
                  <span v-else-if="row.displayFlag == 2">互联网显示</span>
                  <span v-else>不显示</span>
                </template>
              </el-table-column>
              <el-table-column
                label="套餐类型"
                prop="peTypeName"
                width="90"
                show-overflow-tooltip
              />
            </el-table>
            <div>
              <span>共{{ deptList.length }}条</span>
            </div>
          </div>
        </el-col>

        <!-- 右侧详情及项目选择 -->
        <el-col :span="18" style="height: 100%">
          <!-- 套餐详情 -->
          <div class="base-box" style="background-color: #fff; height: 196px">
            <div class="base-title mb-2px">套餐详情</div>

            <div class="base-cont">
              <span class="cont-span">套餐代码:</span>
              <el-input
                style="width: 10%"
                v-model="formInfo.setCode"
                placeholder="请输入"
                class="select-item"
                disabled
              />
              <span class="cont-span">套餐名称:</span>
              <el-input
                style="width: 10%"
                v-model="formInfo.setName"
                placeholder="请输入"
                class="select-item"
                @blur="generateInputCode"
              />
              <span class="cont-span">输入码:</span>
              <el-input
                style="width: 10%"
                v-model="formInfo.inputCode"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">性别:</span>
              <el-select
                v-model="formInfo.setSex"
                placeholder="请选择性别"
                style="width: 10%"
                class="select-item"
                clearable
              >
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
                <el-option label="不限" value="不限" />
              </el-select>
              <span class="cont-span">体检类型：</span>
              <el-select
                v-model="formInfo.peTypeName"
                placeholder="套餐类型"
                style="width: 10%"
                class="select-item"
                filterable
                default-first-option
              >
                <el-option
                  v-for="item in petypeNameList"
                  :key="item.keyCode"
                  :label="item.keyValue"
                  :value="item.keyValue"
                />
              </el-select>
            </div>

            <div class="base-cont">
              <span class="cont-span">价格(元):</span>
              <el-input
                style="width: 8%"
                v-model="formInfo.setDiscountPrice"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">单检价格(元):</span>
              <el-input
                style="width: 8%"
                v-model="formInfo.setPersonPrice"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">团检价格(元):</span>
              <el-input
                style="width: 8%"
                v-model="formInfo.setUnitPrice"
                placeholder="请输入"
                class="select-item"
                readonly
              />
              <span class="cont-span" style="display: inline-block; width: 50px">折扣率:</span>
              <el-input-number
                style="width: 10%"
                v-model="formInfo.discountRate"
                :min="0.01"
                :max="1.0"
                :step="0.01"
                controls-position="right"
                @change="rateChange"
                class="select-item"
              />
              <el-checkbox v-model="checked4" style="width: 60px; margin-right: 0px" label="免费" />
              <el-checkbox v-model="checked" style="width: 60px; margin-right: 0px" label="显示" />
              <el-checkbox
                v-model="checked1"
                style="width: 100px; margin-right: 0px"
                label="互联网显示"
              />

              <div style="width: 17%; display: flex; justify-content: flex-end">
                <el-button class="resetBtn" @click="addPeSet">
                  <el-icon><Plus /></el-icon>新增
                </el-button>
                <el-button type="danger" @click="delPeSet">删除</el-button>
                <el-button type="primary" @click="savePeSet">保存</el-button>
              </div>
            </div>
            <div class="base-cont">
              <span class="cont-span" style="display: inline-block; width: 70px">温馨提示:</span>
              <el-input
                v-model="formInfo.kindReminder"
                type="textarea"
                rows="3"
                maxlength="150"
                show-word-limit
                @input="kindChange"
              ></el-input>
            </div>
          </div>

          <!-- 项目选择 -->
          <div style="width: 100%; height: calc(100% - 200px); margin-top: 4px">
            <div class="base-box" style="background-color: #fff; height: 100%">
              <div class="base-title mb-2px">项目选择</div>

              <!-- 分类标签 -->
              <div class="base-cont">
                <div class="tag-container" style="border-bottom: #cccccc 1px solid">
                  <el-radio-group v-model="selectedCategory" @change="handleCategoryChange">
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
              </div>

              <!-- 项目容器 -->
              <div
                style="
                  width: 100%;
                  height: calc(100% - 72px);
                  padding: 4px 8px 0;
                  display: flex;
                  align-items: center;
                "
              >
                <!-- 可选项目 -->
                <div style="width: 48%; height: 100%; margin-right: 10px">
                  <div class="base-title1">
                    可选
                    <el-input
                      style="width: 15vw"
                      v-model="leftFilter"
                      @change="filteredLeftData"
                      placeholder="输入科室"
                    />
                  </div>
                  <div
                    style="
                      width: 100%;
                      height: calc(100% - 75px);
                      overflow: auto;
                      box-sizing: border-box;
                      border: 1px #cccccc solid;
                      border-radius: 4px;
                      display: flex;
                      flex-direction: column;
                      flex-wrap: wrap;
                      gap: 5px;
                      padding: 5px;
                    "
                    class="mt-4px"
                  >
                    <div
                      style="
                        display: grid;
                        grid-template-columns: repeat(2, 48%);
                        gap: 5px;
                        padding: 5px;
                        overflow-y: auto;
                        width: 100%;
                      "
                    >
                      <div
                        v-for="item in filteredLeftData"
                        :key="item.itemAssemCode"
                        style="
                          height: 30px;
                          display: flex;
                          align-items: center;
                          width: 100%;
                          overflow: hidden;
                        "
                      >
                        <el-checkbox v-model="unSelect" :label="item.itemAssemCode">
                          <el-tooltip
                            :content="item.itemAssemName"
                            placement="top"
                            :hide-after="0"
                            :show-after="100"
                          >
                            <span>{{ item.itemAssemName }}</span>
                          </el-tooltip>
                        </el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 按钮区 -->
                <!--
                <div>
                  <el-button
                    type="primary"
                    :icon="ArrowLeft"
                    @click="moveLeft"
                    style="margin: 8px 50px; display: block"
                  />
                  <el-button
                    type="primary"
                    :icon="ArrowRight"
                    @click="moveRight"
                    style="margin: 8px 50px; display: block"
                  />
                </div>
                -->

                <!-- 已选项目 -->
                <div style="width: 50%; height: 100%">
                  <div class="base-title1">
                    已选
                    <el-input style="width: 15vw" v-model="rightFilter" placeholder="输入科室" />
                  </div>
                  <div
                    style="
                      width: 100%;
                      height: calc(100% - 75px);
                      overflow: auto;
                      box-sizing: border-box;
                      border: 1px #cccccc solid;
                      border-radius: 4px;
                      display: flex;
                      flex-direction: column;
                      flex-wrap: wrap;
                      gap: 5px;
                      padding: 5px;
                    "
                    class="mt-4px"
                  >
                    <div
                      style="
                        display: grid;
                        grid-template-columns: repeat(2, 48%);
                        gap: 5px;
                        padding: 5px;
                        overflow-y: auto;
                        overflow-x: hidden;
                      "
                    >
                      <div
                        v-for="item in filteredRightData"
                        :key="item.itemAssemCode"
                        style="
                          height: 30px;
                          display: flex;
                          align-items: center;
                          width: 98%;
                          overflow: hidden;
                        "
                      >
                        <el-checkbox v-model="selected" :label="item.itemAssemCode">
                          <el-tooltip
                            :content="item.itemAssemName"
                            placement="top"
                            :hide-after="0"
                            :show-after="100"
                          >
                            <span>{{ item.itemAssemName }}</span>
                          </el-tooltip>
                        </el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup name="PEPackage">
import { ref, computed, watch, onMounted } from 'vue'
import * as Api from '@/api/systemSetting/PEPackage/index'
import { ElMessage } from 'element-plus'
// ===================== 响应式数据 =====================
const deptList = ref([]) // 套餐列表数据
const option = ref('0,1,2') // 套餐类型选择
const typeOptions = ref([
  { value: '0,1,2', label: '所有套餐' },
  { value: '0,2', label: '当前可用' },
  { value: '2', label: '互联网显示' }
])

watch(
  () => option.value,
  (newVal) => {
    getItems()
  }
)

const allDataUnselect = ref([]) // 可选项目列表
const allDataSelected = ref([]) // 已选项目列表

const leftFilter = ref('') // 可选搜索框输入内容
const rightFilter = ref('') // 已选搜索框输入内容

// 过滤后的可选数据
const filteredLeftData = computed(() => {
  const filterValue = leftFilter.value.toLowerCase()
  return allDataUnselect.value.filter((item) =>
    item.itemAssemName?.toLowerCase().includes(filterValue)
  )
})

// 过滤后的已选数据
const filteredRightData = computed(() => {
  const filterValue = rightFilter.value.toLowerCase()
  return allDataSelected.value.filter((item) =>
    item.itemAssemName?.toLowerCase().includes(filterValue)
  )
})

// ===================== 电影分类筛选 =====================
const categories = ref([]) // 分类标签
const selectedCategory = ref('全部') // 当前选中分类

watch(selectedCategory, (newValue) => {
  if (newValue === '全部') {
    getItemUnselectList(setCode.value)
  } else {
    getItemUnselectList(setCode.value, newValue)
  }
})

const setCode = ref() // 当前选中的套餐编码
const formInfo = ref({
  setCode: '',
  setName: '',
  setUnitPrice: 0,
  discountRate: 1,
  setPersonPrice: 0,
  setDiscountPrice: 0,
  inputCode: '',
  setSex: '',
  setClass: '',
  sort: '',
  displayFlag: '',
  peTypeName: '',
  freeFlag: '',
  kindReminder: ''
}) // 表单绑定信息

// 获取套餐列表
const getItems = async () => {
  const res = await Api.getPeSetList({
    displayFlag: option.value || '0,1,2',
    displayFlagGroup: []
  })
  deptList.value = res
  // 在数据加载完成后自动排序
  deptList.value.sort((a, b) => customSortBySortField(a, b))
  if (res.length > 0) {
    handleItemsClick(res[0])
    setCode.value = res[0].setCode
  }
}

watch(setCode, () => {
  getAllItems()
})

// 获取项目组合数据
const getAllItems = () => {
  allDataUnselect.value = []
  allDataSelected.value = []
  getItemUnselectList(setCode.value)
  getItemSelectedList(setCode.value)
}

// 获取可选项目
const getItemUnselectList = async (setCode, form = '') => {
  const res = await Api.getPeSetItemUnselectList({
    pageNo: 1,
    pageSize: 10000000,
    setCode: setCode || '',
    form: form || '',
    clinicFlag: 1
  })
  allDataUnselect.value = res.records || []
}

// 获取已选项目
const getItemSelectedList = async (setCode) => {
  const res = await Api.getPeSetItemSelectedList({
    pageNo: 1,
    pageSize: 10,
    setCode: setCode || '',
    form: ''
  })
  allDataSelected.value = res || []
  let totalPrice = 0 // 直接使用普通变量即可，无需 ref
  allDataSelected.value.forEach((item) => {
    if (item.discountPrice) {
      totalPrice += Number(item.discountPrice)
    }
  })
  formInfo.value.setDiscountPrice = parseFloat(totalPrice.toFixed(2))
}

// 点击套餐行时触发
const handleItemsClick = (row) => {
  formInfo.value = row
  checked.value = formInfo.value.displayFlag == 1 ? false : true // 显示复选框状态
  checked1.value = formInfo.value.displayFlag == 2 ? true : false
  checked4.value = row.freeFlag == 1 ? true : false
  setCode.value = row.setCode
}

const checked = ref(false) // 显示复选框状态
const checked1 = ref(false) // 显示复选框状态
const checked4 = ref(false) // 1 免费
watch([checked4], () => {
  formInfo.value.freeFlag = checked4.value ? 1 : 0 // 1 免费
})
watch(
  () => checked.value,
  (newVal) => {
    if (checked1.value && !newVal) {
      checked1.value = false
      formInfo.value.displayFlag = '1'
    } else if (!checked1.value && newVal) {
      formInfo.value.displayFlag = '0'
    }
  }
)
watch(
  () => checked1.value,
  (newVal) => {
    formInfo.value.displayFlag = '1'
    if (!checked.value && newVal) {
      checked.value = true
      formInfo.value.displayFlag = '2'
    } else if (checked.value && !newVal) {
      formInfo.value.displayFlag = '0'
    } else if (newVal) {
      formInfo.value.displayFlag = '2'
    }
  }
)
const unSelect = ref<number[]>([]) // 未选中项的 key 列表
const selected = ref<number[]>([]) // 已选中项的 key 列表

watch(
  () => unSelect.value,
  (newValue) => {
    if (newValue.length > 0) {
      handleUnSelectClick(newValue[0], 'unSelect')
    }
  }
)

watch(
  () => selected.value,
  (newValue) => {
    if (newValue.length > 0) {
      ElMessageBox.confirm('是否删除所选中数据？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          handleUnSelectClick(newValue[0], 'selected')
        })
        .catch(() => {
          selected.value = []
        })
    }
  }
)

// 处理添加/移除项目
const handleUnSelectClick = async (val, type) => {
  if (type === 'unSelect') {
    await Api.addPeSetVsItem({
      setCode: setCode.value,
      itemAssemCode: val
    }).then((res) => {
      if (res) {
        unSelect.value = []
      }
    })
  } else if (type === 'selected') {
    await Api.removePeSetVsItem({
      setCode: setCode.value,
      itemAssemCode: val
    }).then((res) => {
      if (res) {
        selected.value = []
      }
    })
  }
  getAllItems()
}

// 获取分类
const getClass = async () => {
  await Api.getPeItemAssemClass().then((res) => {
    categories.value = res.filter((item) => item && item.className)
    categories.value = [{ className: '全部', value: 'all' }, ...categories.value]
  })
}

// 删除套餐
const delPeSet = async () => {
  await Api.delPeSet({
    setCode: setCode.value
  }).then((res) => {
    if (res) {
      ElMessage.success('删除成功')
      getItems()
    }
  })
}
const kindChange = (val) => {
  formInfo.value.kindReminder = val?.replace(/\r?\n/g, '\r\n') || ''
}
// 保存套餐
const savePeSet = async () => {
  // filteredRightData
  await Api.savePeSet(formInfo.value).then((res) => {
    if (res && formInfo.value.setCode) {
      ElMessage.success('保存成功')
    } else if (res && !formInfo.value.setCode) {
      ElMessage.success('新增成功')
    }
    getItems()
  })
}
// 根据折扣率重新计算团检价格
const rateChange = (val) => {
  if (val && formInfo.value.setDiscountPrice) {
    formInfo.value.setUnitPrice =
      Number(formInfo.value.setDiscountPrice) * Number(formInfo.value.discountRate)
  } else {
    formInfo.value.setUnitPrice = 0
  }
}
// 添加套餐
const addPeSet = async () => {
  formInfo.value = {
    setCode: '',
    setName: '',
    setUnitPrice: 0,
    discountRate: 1,
    setPersonPrice: 0,
    setDiscountPrice: 0,
    inputCode: '',
    setSex: '',
    setClass: '',
    sort: '',
    displayFlag: '1'
  }
  Api.getMaxSetCode().then((res) => {
    formInfo.value.setCode = res
  })
  checked.value = false
}
//体检类型列表
const petypeNameList = ref<any>([])

onMounted(async () => {
  getItems()
  getClass()
  petypeNameList.value = await Api.queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
})
import { pinyin } from 'pinyin-pro'
const generateInputCode = () => {
  // if (formInfo.value.setName && !formInfo.value.inputCode) {
  // 使用套餐名称的拼音首字母作为输入码
  // 这里只是一个简单示例，实际应用中可能需要引入拼音库来处理中文转拼音
  // formInfo.value.inputCode
  const pinyinResult = pinyin(formInfo.value.setName, {
    pattern: 'first', // 只获取首字母
    toneType: 'none', // 不包含声调
    type: 'array' // 返回数组格式
  })

  // 将拼音首字母数组连接成字符串并转为大写
  formInfo.value.inputCode = formInfo.value.inputCode = pinyinResult
    .join('')
    .toUpperCase()
    .substring(0, 8)
}

const customSortBySortField = (a, b) => {
  // 确保 sort 字段是数字，若不是可转换
  const sortA = Number(a.sort) || 0
  const sortB = Number(b.sort) || 0

  return sortA - sortB
}
const handleSortChange = ({ column, prop, order }) => {
  if (prop === 'sort') {
    deptList.value.sort((a, b) => customSortBySortField(a, b))
  }
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
    width: 86px;
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
.base-title1 {
  padding: 0 20px;
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
/* 添加标签样式 */
.tag-container {
  flex: 1;
  overflow-x: auto;
  // padding: 4px 0;

  .el-radio-group {
    display: flex;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .category-tag {
    margin: 0 !important;
    // border-radius: 4px;
    // border: 1px solid #dcdfe6;

    :deep(.el-radio-button__inner) {
      padding: 8px 12px;
      border: none;
      // border-radius: 4px;
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
