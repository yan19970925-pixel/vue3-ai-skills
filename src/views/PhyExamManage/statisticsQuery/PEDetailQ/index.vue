<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-8px" style="background-color: #fff">
        <div class="base-cont">
          <span class="cont-span">检查类型:</span>
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
          />
        </div>
        <div class="base-cont">
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
        </div>
        <div class="base-cont">
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
        </div>
      </div>
      <div
        class="mt-4px"
        style="padding: 10px; background-color: #fff; height: calc(100vh - 222px)"
      >
        <el-table
          ref="adviceTableRef"
          :data="paginatedData"
          border
          :row-class-name="setAdviceRowClass"
          style="width: 100%; height: calc(100% - 46px); min-height: 300px"
          highlight-current-row
          stripe
        >
          <el-table-column
            v-for="item in visibleColumns"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
          >
            <template v-slot="{ row }">
              <!-- 判断是否是统计行 -->
              <div v-if="row._isSummary" v-html="row.unitName" style="text-align: left"></div>
              <div v-else>{{ row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="pagination-container mt-12px mb-12px"
          style="display: flex; justify-content: space-between"
        >
          <!-- 合计 -->
          <div style="color: #3473d1; font-size: 16px; font-weight: 700">
            <span v-if="radio === 2"> 合计 {{ addList.length }} 人 </span>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="addList.length"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// ===================== 响应式数据 =====================
const certName = ref('')
const value = ref('')
const value1 = ref<Date | null>(new Date())
const options = ref([
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
])
const checked3 = ref(true)
const checked4 = ref(!checked3.value)
const radio = ref(1)
const currentPage = ref(1)
const pageSize = 22
// 所有列定义
const allColumns = [
  // { prop: 'gender', label: '性别', align: 'center' },
  { prop: 'personalCount', label: '体检号', align: 'center' },
  { prop: 'age', label: '次数', align: 'center' },
  { prop: 'personalCount', label: '身份证号', align: 'center' },
  { prop: 'name', label: '姓名', align: 'center' },
  { prop: 'physicalExamId', label: '部门', align: 'center' },
  { prop: 'personalCount', label: '工号', align: 'center' },
  { prop: 'physicalExamId', label: '电话', align: 'center' }
  // { prop: 'completionStatus', label: '完成标志', align: 'center', width: '120px' },
  // { prop: 'personalCount', label: '完成次数', align: 'center', width: '120px' },
  // { prop: 'unitName', label: '单位名称', align: 'center' },
  // { prop: 'reportDate', label: '报到日期', align: 'center', width: '100px' },
  // { prop: 'finishDate', label: '预约日期', align: 'center' },
  // { prop: 'reportDate', label: '完成日期', align: 'center', width: '100px' }
]
// 可见列定义
const allColumns1 = [
  { prop: 'personalCount', label: '体检号', align: 'center' },
  { prop: 'age', label: '次数', align: 'center' },
  { prop: 'personalCount', label: '姓名', align: 'center' },
  { prop: 'unitName', label: '主要病史', align: 'center' },
  { prop: 'unitName', label: '呼吸系统', align: 'center' },
  { prop: 'unitName', label: '四肢关节', align: 'center' },
  { prop: 'unitName', label: '头颈', align: 'center' },
  { prop: 'unitName', label: '心血管系统', align: 'center' },
  { prop: 'unitName', label: '浅表淋巴结', align: 'center' },
  { prop: 'unitName', label: '甲状腺', align: 'center' },
  { prop: 'unitName', label: '皮肤外表', align: 'center' },
  { prop: 'unitName', label: '肛诊', align: 'center' },
  { prop: 'unitName', label: '脊柱', align: 'center' },
  { prop: 'unitName', label: '体重', align: 'center' },
  { prop: 'unitName', label: '体重指数', align: 'center' },
  { prop: 'unitName', label: '收缩压', align: 'center' },
  { prop: 'unitName', label: '脉搏', align: 'center' },
  { prop: 'unitName', label: '腰围', align: 'center' },
  { prop: 'unitName', label: '舒张压', align: 'center' },
  { prop: 'unitName', label: '血压', align: 'center' },
  { prop: 'unitName', label: '身高', align: 'center' },
  { prop: 'unitName', label: '肝脏', align: 'center' },
  { prop: 'unitName', label: '肾脏', align: 'center' },
  { prop: 'unitName', label: '胆囊', align: 'center' },
  { prop: 'unitName', label: '胰腺', align: 'center' },
  { prop: 'unitName', label: '脾脏', align: 'center' },
  { prop: 'unitName', label: '膀胱', align: 'center' },
  { prop: 'unitName', label: '输尿管', align: 'center' },
  { prop: 'unitName', label: '裸眼视力（右）', align: 'center' },
  { prop: 'unitName', label: '裸眼视力（左）', align: 'center' },
  { prop: 'unitName', label: '听力', align: 'center' },
  { prop: 'unitName', label: '咽部', align: 'center' },
  { prop: 'unitName', label: '耳部', align: 'center' }
]

// 动态控制显示列
const visibleColumns = computed(() => {
  if (radio.value === 2) return allColumns1
  return allColumns
})

// mock 数据生成函数
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

function randomName(): string {
  const names = ['张三', '李四', '王五', '赵六']
  return names[Math.floor(Math.random() * names.length)]
}

function generateMockData(unitNames: string[], count: number) {
  const genders = ['男', '女']
  const statuses = ['检中', '检完', '未检']

  const dataList = []

  for (let i = 0; i < count; i++) {
    const unitName = unitNames[Math.floor(Math.random() * unitNames.length)]

    dataList.push({
      unitName,
      physicalExamId: `PE2024${String(i + 1000).slice(-4)}`,
      name: randomName(),
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: String(Math.floor(Math.random() * 50) + 20),
      personalCount: String(Math.floor(Math.random() * 10) + 1),
      completionStatus: statuses[Math.floor(Math.random() * 3)],
      finishDate: i % 3 === 0 ? '' : randomDate(new Date(2024, 0, 1), new Date()),
      reportDate: randomDate(new Date(2024, 0, 1), new Date())
    })
  }

  return dataList
}

// 数据源
const addList = ref([])

// 提取数据按钮点击事件
const handleSaveDocument = () => {
  const list1 = generateMockData(['神马单位'], Math.floor(Math.random() * 10) + 5)
  const list2 = generateMockData(['星星单位'], Math.floor(Math.random() * 10) + 5)
  const list3 = generateMockData(['月亮单位'], Math.floor(Math.random() * 15) + 5)

  addList.value = [...list1, ...list2, ...list3]
}

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return addList.value.slice(start, end)
})

// 设置行样式
const setAdviceRowClass = () => {
  return 'advice-row'
}

// 分页切换
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
const handleCheckboxChange = (type: string) => {
  if (type === 'unit') {
    checked3.value = false
  } else if (type === 'person') {
    checked4.value = false
  }
}
onMounted(() => {
  handleSaveDocument()
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
</style>
