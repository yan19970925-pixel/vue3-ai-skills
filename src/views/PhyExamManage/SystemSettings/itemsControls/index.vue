<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="content">
        <!-- <div class="base-title">检验项目组合列表</div> -->

        <!-- <div class="base-cont mt-4px"> -->
        <!-- <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
        <!-- <el-button type="danger" @click="delPeAssemItemLab">删除</el-button> -->
        <!-- <el-button class="resetBtn" @click="handleSaveDocument">
            <el-icon><RefreshLeft /></el-icon>还原
          </el-button> -->
        <!-- </div> -->
        <el-table
          :data="tableList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
          @row-click="handleAssemItem"
        >
          <template v-for="column in columns" :key="column.prop">
            <!-- 单独处理对应试管列 -->
            <el-table-column
              v-if="column.prop === 'priceItemCode'"
              :label="column.label"
              :prop="column.prop"
              :width="column.width"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                {{ getTubeLabel(row.priceItemCode) }}
              </template>
            </el-table-column>

            <!-- 处理其他列 -->
            <el-table-column
              v-else
              :label="column.label"
              :prop="column.prop"
              :width="column.width"
              show-overflow-tooltip
            />
          </template>
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
    </div>
    <Dialog width="1000px" v-model="show" title="保存项目">
      <!-- 套餐详情 -->
      <div class="base-box" style="background-color: #fff; height: 112px">
        <div class="base-cont">
          <span class="cont-span">项目组合代码:</span>
          <el-input
            style="width: 15%"
            v-model="itemDetails.itemAssemCode"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">项目组合名称:</span>
          <el-input
            style="width: 15%"
            v-model="itemDetails.itemAssemName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">对应试管:</span>
          <el-select
            style="width: 15%"
            v-model="itemDetails.priceItemCode"
            placeholder="请选择"
            class="select-item"
          >
            <el-option
              v-for="option in tubeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>

        <div class="base-cont">
          <span class="cont-span">是否抽血:</span>
          <el-select
            style="width: 15%"
            v-model="itemDetails.peBlood"
            placeholder="请选择"
            class="select-item"
          >
            <el-option label="抽血" value="抽血" />
            <el-option label="不抽血" value="不抽血" />
          </el-select>
          <span class="cont-span">标本名称:</span>
          <el-select
            style="width: 15%"
            v-model="itemDetails.sample"
            placeholder="请选择"
            class="select-item"
          >
            <el-option
              v-for="option in sampleOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <div class="base-cont">
            <!-- <el-button type="danger" @click="delPeAssemItemLab">删除</el-button> -->
            <el-button type="primary" @click="savePeAssemItemLab">保存</el-button>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/systemSetting/itemsControls/index'
import { ElMessage } from 'element-plus'

// ===================== 响应式数据 =====================
// 表格数据
const tableList = ref([])

// 分页数据
const total = ref(0)
const pageSize = ref(30)
const currentPage = ref(1)

// 弹窗数据
const itemDetails = ref({})
const show = ref(false)
const columns = ref([
  {
    label: '项目组合代码',
    prop: 'itemAssemCode',
    width: '120'
  },
  {
    label: '项目组合名称',
    prop: 'itemAssemName'
  },
  {
    label: '对应试管',
    prop: 'priceItemCode'
  },
  {
    label: '是否抽血',
    prop: 'peBlood'
  },
  {
    label: '标本名称',
    prop: 'sample'
  }
])

const handleAssemItem = (row) => {
  itemDetails.value = row
  show.value = true
}
const savePeAssemItemLab = async () => {
  const response = await Api.savePeAssemItemLab({
    list: [itemDetails.value]
  })
  if (response) {
    ElMessage.success('保存成功')
    show.value = false // 关闭弹窗
    getPeAssemItemLab(currentPage.value) // 刷新表格数据
  }
}
const delPeAssemItemLab = async (row) => {
  const response = await Api.delPeAssemItemLab({
    list: [itemDetails.value]
  })
  if (response) {
    ElMessage.success('删除成功')
  }
}

// 获取表格数据
const getPeAssemItemLab = async (page = 1) => {
  try {
    const response = await Api.getPeAssemItemLab({
      pageNo: page,
      pageSize: pageSize.value,
      className: '检验类'
    })

    if (response && response.records?.length > 0) {
      tableList.value = response.records
      total.value = response.total || response.records.length
      currentPage.value = page
    } else {
      tableList.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('加载数据失败，请重试')
  }
}

// 分页改变时触发
const handlePageChange = (newPage) => {
  getPeAssemItemLab(newPage)
}

// 下拉选项
const tubeOptions = ref([]) // 对应试管
const sampleOptions = ref([]) // 标本名称

// 获取下拉选项数据
const fetchOptions = async () => {
  try {
    const [tubeRes, sampleRes] = await Promise.all([
      Api.getPeTestTubeDictList(), // 假设这个接口返回试管列表
      Api.getPeSpecimanDictList() // 假设这个接口返回标本名称列表
    ])

    // 处理试管选项
    if (tubeRes.length > 0) {
      tubeOptions.value = tubeRes.map((item) => ({
        label: item.testTubeName,
        value: item.testTubeCode
      }))
    }

    // 处理标本名称选项
    if (sampleRes.length > 0) {
      sampleOptions.value = sampleRes.map((item) => ({
        label: item.specimanName,
        value: item.specimanName
      }))
    }
  } catch (error) {
    console.error('加载下拉数据失败:', error)
    ElMessage.error('加载下拉数据失败')
  }
}
onMounted(() => {
  getPeAssemItemLab()
  fetchOptions() // 页面初始化时加载下拉数据
})
// 添加一个方法用于获取试管名称
const getTubeLabel = (tubeCode) => {
  if (!tubeCode) return ''
  const tube = tubeOptions.value.find((option) => option.value === tubeCode)
  return tube ? tube.label : tubeCode
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
</style>
