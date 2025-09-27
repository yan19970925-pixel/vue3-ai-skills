<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div style="width: 100%; height: calc(100% - 238px)">
        <div class="content">
          <div class="base-title">项目组合</div>
          <div class="base-cont">
            <!-- <span class="label-fixed-width">特定病种代码:</span> -->
            <el-input v-model="suggestName" clearable placeholder="请输入" style="width: 180px" />
            <el-button class="resetBtn" @click="handleAddClick">
              <el-icon><Plus /></el-icon> 新增
            </el-button>
            <el-button type="danger" @click="handleDleClick">删除</el-button>
            <el-button type="primary" @click="getPeSuggestItem(1)">查询</el-button>
            <!-- <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
          </div>
          <el-table
            :data="tableList"
            border
            class="mt-6px"
            style="width: 100%; height: calc(100% - 120px); overflow: auto"
            highlight-current-row
            stripe
            @row-click="handleRowClick"
          >
            <el-table-column
              label="建议代码"
              prop="suggestCode"
              width="220"
              show-overflow-tooltip
            />
            <el-table-column
              label="建议名称"
              prop="suggestName"
              width="220"
              show-overflow-tooltip
            />
            <el-table-column label="建议" prop="suggestText" />
            <el-table-column
              label="匹配模式"
              :formatter="(row) => (row.deptCode === '1' ? '模糊匹配' : '全部匹配')"
              width="170"
              show-overflow-tooltip
            />
          </el-table>
          <!-- 分页组件 -->
          <el-pagination
            v-if="tableList.length > 0"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            class="mt-4"
            style="margin-top: 8px"
          ></el-pagination>
        </div>
      </div>

      <div class="base-box mt-4px" style="background-color: #fff; height: 230px">
        <div class="base-title mb-2px">建议和生活指导详情</div>

        <div class="base-cont mt-4px">
          <span class="cont-span">建议代码:</span>
          <el-input
            style="width: 16%"
            v-model="rowDetail.suggestCode"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">建议名称:</span>
          <el-input
            style="width: 16%"
            v-model="rowDetail.suggestName"
            placeholder="请输入"
            class="select-item"
          />
          <span class="cont-span">匹配模式:</span>
          <el-select v-model="rowDetail.deptCode" placeholder="请选择">
            <el-option label="模糊匹配" value="1" />
            <el-option label="全部匹配" value="0" />
          </el-select>
        </div>
        <div class="base-cont mt-4px">
          <span class="cont-span">建议内容:</span>
          <el-input
            type="textarea"
            style="width: 86%"
            v-model="rowDetail.suggestText"
            placeholder="请输入"
            class="select-item"
            rows="3"
          />
        </div>

        <div class="base-btn">
          <div class="btn-box" @click="handleSave">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import * as Api from '@/api/Dictionary/suggestedGuidance/index'

// 定义是否选中模糊匹配的计算属性
const isFuzzyMatched = computed({
  get: () => rowDetail.value.deptCode == '1',
  set: (value) => {
    // 假设 1 表示开启模糊匹配，0 表示关闭
    rowDetail.value.deptCode = value ? '1' : '0'
  }
})

// ===================== 响应式数据 =====================
const tableList = ref([])
const suggestName = ref('')
const total = ref(0)
const pageNo = ref(1)
const pageSize = ref(20)
const currentPage = ref(1) // 当前页码
const optionFlag = ref('2') // 1表示新增，2表示编辑
const rowDetail = ref({
  suggestCode: '',
  deptCode: '',
  suggestName: '',
  suggestText: '',
  inputCode: '',
  keyCode: ''
})
// 总检建议和生活指导-查询
const getPeSuggestItem = async (pageNo = 1) => {
  const res = await Api.getPeSuggestItem({
    pageNo: pageNo,
    pageSize: pageSize.value,
    suggestName: suggestName.value || ''
  })
  if (res.records) {
    tableList.value = res.records
    total.value = res.total
  }
}
// 切换分页
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  getPeSuggestItem(newPage)
}
// 获取详情
const handleRowClick = (row) => {
  rowDetail.value = row
}
// 新增
const handleAddClick = () => {
  optionFlag.value = '1' // 设置为新增状态
  rowDetail.value = {
    suggestCode: '',
    deptCode: '',
    suggestName: '',
    suggestText: '',
    inputCode: '',
    keyCode: ''
  }
}
// 保存
const handleSave = async () => {
  optionFlag.value = '2' // 设置为编辑状态
  // TODO: 调用保存接口
  savePeSuggestItem()
}
const savePeSuggestItem = async () => {
  const res = await Api.savePeSuggestItem(rowDetail.value)
  if (res) {
    if (optionFlag.value === '1') {
      // 新增成功
      ElMessage.success('新增成功')
    } else {
      // 编辑成功
      ElMessage.success('保存成功')
    }
    optionFlag.value = '2' // 重置为编辑状态
    getPeSuggestItem(currentPage.value)
    rowDetail.value = {
      suggestCode: '',
      deptCode: '',
      suggestName: '',
      suggestText: '',
      inputCode: '',
      keyCode: ''
    }
  }
}
// 删除
const handleDleClick = async () => {
  try {
    await Api.delPeSuggestItem({ suggestCode: rowDetail.value.suggestCode }).then((res) => {
      if (res) {
        ElMessage.success('删除成功')
        getPeSuggestItem(currentPage.value)
        rowDetail.value = {
          suggestCode: '',
          deptCode: '',
          suggestName: '',
          suggestText: '',
          inputCode: '',
          keyCode: ''
        }
        suggestName.value = ''
      }
    })
  } catch (error) {}
}

const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

watch(suggestName, (newVal) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  // 防抖
  debounceTimer.value = setTimeout(() => {
    getPeSuggestItem(1)
  }, 500)
})
onMounted(() => {
  getPeSuggestItem(1)
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
