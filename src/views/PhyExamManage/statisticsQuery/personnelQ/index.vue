<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-8px" style="background-color: #fff">
        <!-- <div class="base-title mb-2px">组合详情</div> -->

        <div class="base-cont">
          <span class="cont-span">单位代码:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">次数:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">体检号:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">姓名:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">性别:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
        </div>
        <div class="base-cont">
          <span class="cont-span">职务:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">年龄上限:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">年龄下限:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">主索引:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">报到日期:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
        </div>
        <div class="base-cont">
          <span class="cont-span">体检状态:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">体检分组:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">部门:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">婚姻:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">工种:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
        </div>
        <div class="base-cont">
          <span class="cont-span">体检类别:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">健康状态:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">报到状态:</span>
          <el-input
            style="width: 16%"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
          <div style="width: 20%">
            <el-checkbox v-model="checked1" style="" label="子单位" />
          </div>

          <div class="base-cont" style="width: 28%">
            <el-button type="primary" @click="handleSaveDocument">查询</el-button>
            <el-button class="resetBtn" @click="handleSaveDocument">
              <img
                src="@\assets\imgs\Export2x.png"
                alt="打印"
                style="width: 16px; height: 16px; margin-right: 4px"
              />
              导出
            </el-button>
          </div>
        </div>
        <!-- <div class="base-cont">
              <el-button class="resetBtn" style="width: 8%" @click="handleSaveDocument">
                <el-icon><Plus /></el-icon>新增
              </el-button>
              <el-button type="primary" style="width: 8%" @click="handleSaveDocument"
                >保存</el-button
              >
              <el-button class="resetBtn" style="width: 8%" @click="handleSaveDocument"
                >对外申请对照表</el-button
              >
              <el-button class="resetBtn" style="width: 8%" @click="handleSaveDocument"
                >划价对照表</el-button
              >
            </div> -->
      </div>
      <div style="width: 100%; height: calc(100% - 176px)">
        <div class="content">
          <!-- <div class="base-title">项目组合</div> -->
          <el-table
            :data="tableList"
            border
            class="mt-6px"
            style="width: 100%; height: calc(100% - 8px); min-height: 300px; overflow: auto"
            highlight-current-row
            stripe
          >
            <el-table-column label="体检号" prop="item" width="120" show-overflow-tooltip />
            <el-table-column label="联系人" prop="deptName" show-overflow-tooltip />
            <el-table-column label="性别" prop="extDept" show-overflow-tooltip />
            <el-table-column label="年龄" prop="extDept" show-overflow-tooltip />
            <el-table-column label="体检分组" prop="extDept" show-overflow-tooltip />
            <el-table-column label="报到时间" prop="extDept" show-overflow-tooltip />
            <el-table-column label="单位代码" prop="extDept" show-overflow-tooltip />
            <el-table-column label="单位名称" prop="extDept" show-overflow-tooltip />
            <el-table-column label="身份证号" prop="extDept" show-overflow-tooltip />
            <el-table-column label="联系电话" prop="extDept" show-overflow-tooltip />
            <el-table-column label="出生日期" prop="extDept" show-overflow-tooltip />
            <el-table-column label="体检次数" prop="extDept" show-overflow-tooltip />
            <el-table-column label="体检类别" prop="extDept" show-overflow-tooltip />
            <el-table-column label="部门" prop="extDept" show-overflow-tooltip />
            <el-table-column label="部门" prop="extDept" show-overflow-tooltip />
            <el-table-column label="E-mail" prop="extDept" show-overflow-tooltip />
            <el-table-column label="已选套餐" prop="extDept" show-overflow-tooltip />
            <el-table-column label="通讯地址" prop="extDept" show-overflow-tooltip />
            <el-table-column label="工号" prop="extDept" show-overflow-tooltip />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

// ===================== 响应式数据 =====================
const filteredOptions = ref([
  { value: 'option1', label: '全部类型' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
])
const showItem = ref([
  { value: 'option1', label: '显示项目' },
  { value: 'option2', label: '不显示项目' }
])
const option1 = ref('option1')
const option2 = ref('option1')
const tableList = ref([
  { item: '分类1', deptName: '科室1', extDept: '外部科室1' },
  { item: '分类2', deptName: '科室2', extDept: '外部科室2' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' }
])

const itemsList = ref([
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '00n',
    itemName: '项目N',
    examDept: '科室N',
    groupName: '组合N',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议N',
    orderNo: 1,
    remark: '备注N',
    unit: '单位N',
    inputCode: '输入码N',
    description: '描述N',
    resultDisplay: '表现方式N',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '女'
  },
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '00n',
    itemName: '项目N',
    examDept: '科室N',
    groupName: '组合N',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议N',
    orderNo: 1,
    remark: '备注N',
    unit: '单位N',
    inputCode: '输入码N',
    description: '描述N',
    resultDisplay: '表现方式N',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '女'
  },
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '00n',
    itemName: '项目N',
    examDept: '科室N',
    groupName: '组合N',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议N',
    orderNo: 1,
    remark: '备注N',
    unit: '单位N',
    inputCode: '输入码N',
    description: '描述N',
    resultDisplay: '表现方式N',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '女'
  },
  ,
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '00n',
    itemName: '项目N',
    examDept: '科室N',
    groupName: '组合N',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议N',
    orderNo: 1,
    remark: '备注N',
    unit: '单位N',
    inputCode: '输入码N',
    description: '描述N',
    resultDisplay: '表现方式N',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '女'
  },
  {
    itemCode: '001',
    itemName: '项目1',
    examDept: '科室1',
    groupName: '组合1',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议1',
    orderNo: 1,
    remark: '备注1',
    unit: '单位1',
    inputCode: '输入码1',
    description: '描述1',
    resultDisplay: '表现方式1',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '男'
  },
  {
    itemCode: '00n',
    itemName: '项目N',
    examDept: '科室N',
    groupName: '组合N',
    maxValue: 100,
    femaleMax: 90,
    normalValue: 50,
    minValue: 10,
    suggestion: '建议N',
    orderNo: 1,
    remark: '备注N',
    unit: '单位N',
    inputCode: '输入码N',
    description: '描述N',
    resultDisplay: '表现方式N',
    resultType: '类型1',
    defaultValue: '默认值1',
    mappingCode: '对照码1',
    femaleMin: 60,
    gender: '女'
  }
])
const options = ref([
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
  // 添加更多选项
])
const option = ref('选项一')
const certName = ref('')
// -------------------

interface Option {
  key: number
  label: string
  initial: string
}

const value = ref<number[]>([]) // 已选中的 key 列表

// 模拟生成 100 个科室数据
interface Option {
  key: number
  label: string
  initial: string
}

const hospitalDepartments = [
  '内科',
  '外科',
  '儿科',
  '妇科',
  '眼科',
  '耳鼻喉科',
  '口腔科',
  '皮肤科',
  '神经内科',
  '心血管科',
  '消化内科',
  '内分泌科',
  '呼吸内科',
  '肾内科'
]

function getRandomDepartment() {
  const randomIndex = Math.floor(Math.random() * hospitalDepartments.length)
  return hospitalDepartments[randomIndex]
}

const allData = ref<Option[]>(
  Array.from({ length: 100 }, (_, i) => ({
    key: i + 1,
    label: `${getRandomDepartment()} ${String(i + 1).padStart(2, '0')} 科`,
    initial: getRandomDepartment().slice(0, 2).toUpperCase()
  }))
)

const pageSize = 20
const leftPage = ref(1)
const rightPage = ref(1)

const leftFilter = ref('')
const rightFilter = ref('')

// 过滤后的左侧数据
const filteredLeftData = computed(() => {
  return allData.value.filter(
    (item) =>
      !value.value.includes(item.key) &&
      (item.initial.toLowerCase().includes(leftFilter.value.toLowerCase()) ||
        item.label.toLowerCase().includes(leftFilter.value.toLowerCase()))
  )
})

// 分页显示的左侧数据
const displayedLeftData = computed(() => {
  return filteredLeftData.value.slice(0, leftPage.value * pageSize)
})

// 过滤后的右侧数据
const filteredRightData = computed(() => {
  // return allData.value.filter((item) => value.value.includes(item.key))
  return allData.value.filter(
    (item) =>
      value.value.includes(item.key) &&
      (item.initial.toLowerCase().includes(rightFilter.value.toLowerCase()) ||
        item.label.toLowerCase().includes(rightFilter.value.toLowerCase()))
  )
})

// 分页显示的右侧数据
const displayedRightData = computed(() => {
  return filteredRightData.value.slice(0, rightPage.value * pageSize)
})

// 监听左侧滚动
const leftListRef = ref<HTMLElement | null>(null)
const handleLeftScroll = () => {
  const list = leftListRef.value
  if (list && list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
    leftPage.value++
  }
}

// 监听右侧滚动
const rightListRef = ref<HTMLElement | null>(null)
const handleRightScroll = () => {
  const list = rightListRef.value
  if (list && list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
    rightPage.value++
  }
}

// 移动到右侧
const moveRight = () => {
  const selected = filteredLeftData.value.slice(0, 1) // 示例只移动一个
  if (selected.length > 0) {
    value.value.push(selected[0].key)
  }
}

// 移动到左侧
const moveLeft = () => {
  if (value.value.length > 0) {
    value.value.pop()
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
    // background-color: #3473d1;
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
</style>
