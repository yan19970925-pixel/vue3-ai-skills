<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-8px" style="background-color: #fff">
        <div class="base-cont">
          <span class="cont-span">体检单位:</span>
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
          <span class="cont-span">统计范围:</span>
          <el-select v-model="value" placeholder="请选择" style="width: 12vw">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-radio-group v-model="radio">
            <el-radio :label="1">特定病种统计</el-radio>
          </el-radio-group>
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
      <div style="padding: 10px; background-color: #fff; height: calc(100vh - 142px)">
        <!-- 表格 -->
        <el-table
          ref="adviceTableRef"
          :data="paginatedData"
          border
          :row-class-name="setAdviceRowClass"
          style="width: 100%; height: calc(100% - 46px); min-height: 300px"
          highlight-current-row
          stripe
        >
          <!-- 序号列 -->
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
            fixed="left"
          ></el-table-column>

          <!-- 就诊情况 -->
          <el-table-column
            prop="diagnosis"
            label="就诊情况"
            align="center"
            width="180"
          ></el-table-column>

          <!-- 人数 -->
          <el-table-column label="人数" align="center">
            <el-table-column
              prop="total"
              label="总人数"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="maleCount"
              label="男人数"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="femaleCount"
              label="女人数"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>

          <!-- 百分比 -->
          <el-table-column label="百分比%" align="center">
            <el-table-column
              prop="totalRate"
              label="总百分比"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="maleRate"
              label="男百分比"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="femaleRate"
              label="女百分比"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
        </el-table>

        <!-- 合计信息 -->
        <div
          class="pagination-container mt-12px mb-12px"
          style="display: flex; justify-content: space-between"
        >
          <div style="color: #3473d1; font-size: 16px; font-weight: 700">
            <span
              >总人数：{{ totalSummary.total }} 人 | 男人数：{{ totalSummary.male }} 人 | 女人数：{{
                totalSummary.female
              }}
              人</span
            >
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
import { ref, computed, onMounted } from 'vue'

// ===================== 响应式数据 =====================
const certName = ref('')
const value = ref('')
const options = ref([
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
])
const radio = ref(1)
const currentPage = ref(1)
const pageSize = 25

// 数据源
const addList = ref<any[]>([])
// 合计数据
const totalSummary = ref({
  total: 0,
  male: 0,
  female: 0
})

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

// 模拟数据生成函数
function generateMockData() {
  const diagnosisTypes = ['高血压', '糖尿病', '冠心病', '脂肪肝', '哮喘']
  const dataList = []

  let totalMale = 0
  let totalFemale = 0

  for (let i = 0; i < 35; i++) {
    const diagnosis = diagnosisTypes[Math.floor(Math.random() * diagnosisTypes.length)]
    const male = Math.floor(Math.random() * 10) + 5
    const female = Math.floor(Math.random() * 10) + 5
    const total = male + female

    dataList.push({
      diagnosis,
      total,
      maleCount: male,
      femaleCount: female,
      totalRate: ((total / 100) * 100).toFixed(2) + '%',
      maleRate: ((male / total) * 100).toFixed(2) + '%',
      femaleRate: ((female / total) * 100).toFixed(2) + '%'
    })

    totalMale += male
    totalFemale += female
  }

  // 更新合计
  totalSummary.value = {
    total: totalMale + totalFemale,
    male: totalMale,
    female: totalFemale
  }

  return dataList
}

// 提取数据按钮点击事件
const handleSaveDocument = async () => {
  // 模拟调用接口获取数据
  const res = await fetchDiagnosisData()
  addList.value = res
}

// 预留接口函数
async function fetchDiagnosisData(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockData())
    }, 500)
  })
}

// 分页切换
const handleCurrentChange = (val: number) => {
  currentPage.value = val
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
