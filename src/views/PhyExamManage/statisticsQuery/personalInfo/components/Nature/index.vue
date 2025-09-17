<template>
  <div class="base-setting" style="height: calc(100vh - 239px)">
    <div
      class="base-box mb-8px"
      style="background-color: #fff; padding-bottom: 8px; border-bottom: #edf1fc 2px solid"
    >
      <div class="base-cont">
        <span class="cont-span">姓名:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">性别:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">身份证号:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">出生日期:</span>
        <el-date-picker
          style="width: 12vw"
          v-model="value"
          type="date"
          placeholder="请选择"
          :default-value="new Date(2010, 9, 1)"
        />
        <span class="cont-span">费别:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="base-cont">
        <span class="cont-span">身份:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">民族:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">出生地:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <!-- <div style="width: 20%">
            <el-checkbox v-model="checked1" style="" label="子单位" />
          </div> -->
      </div>
    </div>
    <div
      class="base-box mb-8px"
      style="background-color: #fff; padding-bottom: 8px; border-bottom: #edf1fc 2px solid"
    >
      <div class="base-cont">
        <span class="cont-span">体检次数:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">婚姻状况:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">级别:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">电话号码:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">部门:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="base-cont">
        <span class="cont-span">完成标志:</span>
        <el-select v-model="value" placeholder="请选择" style="width: 12vw">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="cont-span">预约体检日:</span>
        <el-date-picker
          style="width: 12vw"
          v-model="value1"
          type="date"
          placeholder="请选择"
          :default-value="new Date()"
        />
        <span class="cont-span">预约操作员:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />

        <span class="cont-span">报到日期:</span>
        <el-date-picker
          style="width: 12vw"
          v-model="value1"
          type="date"
          placeholder="请选择"
          :default-value="new Date()"
        />

        <span class="cont-span">报到操作员:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
      </div>

      <div class="base-cont">
        <span class="cont-span">体检单位:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">地址:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
    </div>
    <div class="base-box mb-8px" style="background-color: #fff">
      <div class="base-cont">
        <span class="cont-span">疾病史:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">不适症:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
      <div class="base-cont">
        <span class="cont-span">脑力强度:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">体力强度:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
      <div class="base-cont">
        <span class="cont-span">饮食情况:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">睡眠情况:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
      <div class="base-cont">
        <span class="cont-span">家族病史:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">曾做手术:</span>
        <el-input
          style="width: 30.8vw"
          v-model="certName"
          placeholder="请输入"
          class="select-item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// ===================== 响应式数据 =====================
const options = ref([
  { value: 'option1', label: '男' },
  { value: 'option2', label: '女' }
])
const value = ref('option1')

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

const certName = ref('')
// -------------------

interface Option {
  key: number
  label: string
  initial: string
}

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
  padding: 14px;

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
</style>
