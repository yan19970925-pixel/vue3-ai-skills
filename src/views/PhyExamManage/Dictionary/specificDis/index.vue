<template>
  <div class="main">
    <div class="base-box">
      <!-- <div class="base-title">病种列表</div> -->
      <div class="form">
        <!-- 第一行 -->
        <div
          class="info mt-12px"
          style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap"
        >
          <div class="form-item">
            <span class="label-fixed-width">特定病种代码:</span>
            <el-input v-model="searchInfo.positiveCode" placeholder="请输入" style="width: 180px" />
            <span class="label-fixed-width">特定病种名称:</span>
            <el-input v-model="searchInfo.positiveName" placeholder="请输入" style="width: 180px" />
          </div>

          <el-button class="resetBtn" @click="handleAddClick">
            <el-icon><Plus /></el-icon> 新增
          </el-button>
          <el-button type="primary" @click="getPePositiveList">查询</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4px table-container" style="padding: 10px; background-color: #fff; height: 100%">
      <el-table
        ref="adviceTableRef"
        :data="PositiveList"
        border
        style="width: 100%; height: calc(100vh - 240px)"
        highlight-current-row
        stripe
        @row-click="handleRowClick"
      >
        <el-table-column
          v-for="item in addColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <Dialog v-model="dialogVisible" width="600px" :fullscreen="false">
      <template #title>
        <div v-if="optionFlag === '1'" class="dialog-title">新增</div>
        <div v-else class="dialog-title">编辑</div>
      </template>
      <div class="mb-8px">
        <el-form :model="rowdetail" label-width="120px" size="small">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="特定病种代码">
                <el-input v-model="rowdetail.positiveCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="特定病种名称">
                <el-input v-model="rowdetail.positiveName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="序号">
                <el-input v-model="rowdetail.serialNo" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="base-cont mt-4px" style="text-align: center">
          <el-button class="resetBtn" @click="handleDelet"> 删除 </el-button>
          <el-button type="primary" @click="savePeAssemItemLab(optionFlag)">保存</el-button>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="base-cont mt-4px">
          <!-- <el-button class="resetBtn" @click="dialogVisible = false"> 关闭 </el-button> -->
          <!-- <el-button type="primary" @click="savePeAssemItemLab('1')">保存</el-button> -->
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/Dictionary/specificDis/index'

// ===================== 响应式数据 =====================
const PositiveList = ref([]) // 特定病种列表
const addColumns = [
  { prop: 'positiveCode', label: '特定病种代码', align: 'center' },
  { prop: 'positiveName', label: '特定病种名称', align: 'center' },
  { prop: 'serialNo', label: '序号', align: 'center' }
]
const searchInfo = ref({
  positiveCode: '',
  positiveName: ''
})
const rowdetail = ref({}) // 行详情
const dialogVisible = ref(false) // 弹窗是否可见
// 特定病种-特定病种查询
const getPePositiveList = async () => {
  try {
    const response = await Api.getPePositiveList(searchInfo.value)
    PositiveList.value = response
  } catch (error) {
    console.error('请求特定病种列表时发生错误:', error)
  }
}
// 保存特定病种
const savePeAssemItemLab = async (optionFlag: string) => {
  // optionFlag: '1' 新增
  // optionFlag: '2' 编辑
  rowdetail.value.optionFlag = optionFlag
  try {
    if (optionFlag === '1') {
      // 新增或编辑
      await Api.savePePositive({
        list: [rowdetail.value]
      }).then((res) => {
        if (res) ElMessage.success('新增成功')
      })
      dialogVisible.value = false
      getPePositiveList() // 刷新列表
    } else if (optionFlag === '2') {
      // 编辑
      await Api.savePePositive({
        list: [rowdetail.value]
      }).then((res) => {
        if (res) ElMessage.success('保存成功')
      })
      dialogVisible.value = false
      getPePositiveList() // 刷新列表
    }
  } catch (error) {
    console.error('保存特定病种时发生错误:', error)
  }
}
const optionFlag = ref() // 操作标志，1为新增，2为编辑
// 点击行
const handleRowClick = (row: any) => {
  optionFlag.value = '2' // 设置为编辑状态
  rowdetail.value = row
  dialogVisible.value = true
}
//点击新增
const handleAddClick = () => {
  dialogVisible.value = true
  optionFlag.value = '1' // 设置为新增状态
  rowdetail.value = {
    positiveCode: '',
    positiveName: '',
    serialNo: ''
  }
}
// 点击删除
const handleDelet = async () => {
  try {
    const response = await Api.delPePositive(rowdetail.value)
    if (response) {
      ElMessage.success('删除成功')
      dialogVisible.value = false // 关闭弹窗
      getPePositiveList() // 刷新列表
    }
  } catch (error) {
    console.error('删除特定病种时发生错误:', error)
  }
}
onMounted(() => {
  getPePositiveList()
})
</script>

<style scoped lang="scss">
.main {
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

.btn {
  margin-left: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
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

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
}
.label-fixed-width {
  width: 90px;
  text-align: right;
  margin-right: 4px;
  font-weight: 400;
}
.advice-row {
  cursor: pointer;
}
.advice-list-table {
  .el-table__header-wrapper {
    th {
      background-color: #f5f7fa !important;
    }
  }
}

.form {
  background-color: #fff;
  padding: 8px 8px 20px 8px;
  // border-radius: 4px;
  // border: 1px solid #e4e7ed;
}

.table {
  // margin: 10px auto;
  // background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  width: 100%;
  overflow: auto;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.table-container {
  width: 100%;
  white-space: nowrap; // 防止表格内容换行
  height: calc(100vh - 330px); // 减去其他元素的高度
  overflow: auto;
}
.base-box {
  background-color: #fff;
  margin-bottom: 10px;
  .base-title {
    padding: 0 20px;
    color: #3473d1;
    font-size: 16px;
    height: 46px;
    line-height: 46px;
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
      height: 2px;
      background-color: #3473d1;
    }

    &.dif {
      &::before {
        width: 170px;
      }
    }
  }
}

:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow-y: auto !important;
}

:deep(.el-form-item__label) {
  font-size: 14px !important;
}
</style>
