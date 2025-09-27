<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div style="width: 100%; height: calc(100% - 308px)">
        <div class="content">
          <div class="base-title">常用科普知识列表</div>
          <div class="base-cont">
            <!-- <span class="label-fixed-width">特定病种代码:</span> -->
            <el-input v-model="knowledgeName" placeholder="请输入" style="width: 180px" />

            <el-button class="resetBtn" @click="handleAddDocument">
              <el-icon><Plus /></el-icon> 新增
            </el-button>
            <el-button type="danger" @click="handleDeleteDocument">删除</el-button>
            <el-button type="primary" @click="getPeKnowledge(1)">查询</el-button>
            <!-- <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
          </div>
          <el-table
            :data="tableList"
            border
            class="mt-6px"
            style="width: 100%; height: calc(100% - 130px); overflow: auto"
            highlight-current-row
            stripe
            @row-click="handleRowClick"
            :default-sort="{ prop: 'knowledgeCode', order: 'ascending' }"
          >
            <el-table-column
              label="科普代码"
              prop="knowledgeCode"
              width="120"
              show-overflow-tooltip
              sortable
              :sort-method="(a, b) => a.knowledgeCode.localeCompare(b.knowledgeCode)"
            />
            <el-table-column
              label="疾病名称"
              prop="knowledgeName"
              width="220"
              show-overflow-tooltip
            />
            <el-table-column label="科普知识" prop="knowledgeText" :show-overflow-tooltip="true">
              <template #default="{ row }">
                <span style="white-space: pre-line; word-break: break-all">
                  {{ row.knowledgeText }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="默认状态" width="120">
              <template #default="{ row }">
                {{ row.knowledgeDefault === 1 ? '默认' : '不默认' }}
              </template>
            </el-table-column>
            <el-table-column label="输入码" prop="inputCode" width="120" show-overflow-tooltip />
          </el-table>

          <!-- 分页组件 -->
          <el-pagination
            v-if="tableList.length > 0"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            class="mt-3"
          ></el-pagination>
        </div>
      </div>

      <div class="base-box mt-4px" style="background-color: #fff; height: 304px">
        <div class="base-title mb-2px">常用科普知识详情</div>

        <div class="base-cont mt-4px">
          <span class="cont-span">科普代码:</span>
          <el-input
            style="width: 16%"
            v-model="rowDetails.knowledgeCode"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">疾病名称:</span>
          <el-input
            style="width: 16%"
            v-model="rowDetails.knowledgeName"
            placeholder="请输入"
            class="select-item"
          /><span class="cont-span">输入码:</span>
          <el-input
            style="width: 16%"
            v-model="rowDetails.inputCode"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">显示模式:</span>
          <el-select
            v-model="rowDetails.knowledgeDefault"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option label="默认" value="1" />
            <el-option label="不默认" value="0" />
          </el-select>
        </div>
        <div class="base-cont mt-4px">
          <span class="cont-span">建议内容:</span>
          <el-input
            type="textarea"
            style="width: 86%"
            v-model="rowDetails.knowledgeText"
            placeholder="请输入"
            class="select-item"
            rows="6"
          />
        </div>

        <div class="base-btn">
          <div class="btn-box" @click="handleSaveDocument">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/Dictionary/scienceKonwledge/index'

// ===================== 响应式数据 =====================
const tableList = ref([])

const total = ref(0)
const pageNo = ref(1)
const pageSize = ref(20)
const currentPage = ref(1) // 当前页码
const optionFlag = ref('2') // 1表示新增，2表示编辑
const knowledgeName = ref('') // 科普知识名称
// // 科普知识-查询
const getPeKnowledge = async (pageNo = 1) => {
  const res = await Api.getPeKnowledge({
    pageNo: pageNo,
    pageSize: pageSize.value,
    knowledgeName: knowledgeName.value || ''
  })
  if (res) {
    tableList.value = res.records
  }
}
// 切换分页
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  getPeKnowledge()
}
onMounted(() => {
  getPeKnowledge()
})

const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

watch(knowledgeName, (newVal) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  // 防抖
  debounceTimer.value = setTimeout(() => {
    getPeKnowledge(1)
  }, 500)
})
const rowDetails = ref({
  knowledgeCode: '',
  knowledgeName: '',
  knowledgeText: '',
  knowledgeDefault: '0',
  inputCode: ''
})
// 行点击事件
const handleRowClick = (row) => {
  optionFlag.value = '2' // 设置为编辑状态

  rowDetails.value = row
}
// 保存科普知识
const handleSaveDocument = async () => {
  savePeKnowledge()
}
// 新增
const handleAddDocument = () => {
  optionFlag.value = '1' // 设置为新增状态
  rowDetails.value = {
    knowledgeCode: '',
    knowledgeName: '',
    knowledgeText: '',
    knowledgeDefault: '0',
    inputCode: ''
  }
}
// savePeKnowledge
const savePeKnowledge = async () => {
  const res = await Api.savePeKnowledge(rowDetails.value)
  if (res) {
    if (optionFlag.value == '1') {
      ElMessage.success('新增成功')
    } else {
      ElMessage.success('保存成功')
    }
    optionFlag.value = '2' // 重置为编辑状态
    rowDetails.value = {
      knowledgeCode: '',
      knowledgeName: '',
      knowledgeText: '',
      knowledgeDefault: '0',
      inputCode: ''
    }
    getPeKnowledge(currentPage.value) // 刷新列表
  } else {
    ElMessage.error('保存失败，请重试')
  }
}

// 删除科普知识
const handleDeleteDocument = async () => {
  if (!rowDetails.value.knowledgeCode) {
    ElMessage.warning('请选择要删除的科普知识')
    return
  }
  try {
    const res = await Api.delPeKnowledge({ knowledgeCode: rowDetails.value.knowledgeCode })
    if (res) {
      ElMessage.success('删除成功')
      getPeKnowledge(currentPage.value) // 刷新列表
      rowDetails.value = {
        knowledgeCode: '',
        knowledgeName: '',
        knowledgeText: '',
        knowledgeDefault: '0',
        inputCode: ''
      }
    } else {
      ElMessage.error('删除失败，请重试')
    }
  } catch (error) {
    console.error('删除科普知识失败:', error)
    ElMessage.error('删除失败，请重试')
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
  // overflow: auto;
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
