<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="4" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">指导分类</div>
            <el-table
              :data="leftTableList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              ref="singleTableRef"
              stripe
              @current-change="handleCurrentChange"
            >
              <el-table-column label="分类名称" prop="name" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="20" style="height: 100%">
          <div style="width: 100%; height: calc(100% - 344px)">
            <div class="content">
              <div class="base-title">指导内容</div>
              <div class="base-cont">
                <el-button class="resetBtn" @click="add">
                  <el-icon><Plus /></el-icon>新增
                </el-button>
                <el-button type="danger" @click="del">删除</el-button>
              </div>
              <el-table
                :data="rightTableList"
                border
                class="mt-6px"
                style="width: 100%; height: calc(100% - 80px); overflow: auto"
                highlight-current-row
                stripe
                @current-change="handleRightChange"
                @row-click="handleRightRowClick"
              >
                <el-table-column label="指导内容" prop="guideContent" />
              </el-table>
            </div>
          </div>

          <div class="base-box mt-4px" style="background-color: #fff; height: 340px">
            <div class="base-title mb-2px">内容详情</div>

            <div class="base-cont">
              <span class="cont-span">指导类别:</span>
              <el-input style="width: 16%" disabled v-model="form.guideClass" class="select-item" />
            </div>
            <div class="base-cont" style="align-items: start">
              <span class="cont-span">项目属性:</span>
              <el-input
                type="textarea"
                style="width: 86%"
                v-model="form.guideContent"
                placeholder="请输入"
                class="select-item"
                rows="8"
                maxlength="200"
                show-word-limit
              />
            </div>

            <div class="base-btn">
              <div class="btn-box" @click="save">保存</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import {
  getPeChiefGuideClass,
  getPeChiefGuideList,
  savePeChiefGuide
} from '@/api/Dictionary/suggestion/index'

// ===================== 响应式数据 =====================
const leftTableList = ref([])
const getLeftData = () => {
  leftTableList.value = []
  getPeChiefGuideClass().then((res) => {
    if (res && res.length > 0) {
      res.forEach((item) => {
        leftTableList.value.push({ name: item })
      })
    }
  })
}

const currentRow = ref()
const handleCurrentChange = (val) => {
  currentRow.value = val
  getRightData(val)
  form.value = {
    guideClass: '',
    guideContent: ''
  }
}

const singleTableRef = ref()
const setCurrent = async (row) => {
  singleTableRef.value.setCurrentRow(row)
  await getRightData(row)
}

const rightTableList = ref([])
const getRightData = (row) => {
  getPeChiefGuideList({ guideClass: row.name }).then((res) => {
    rightTableList.value = res
  })
}

const rightCheckRow = ref()
const form = ref({
  guideClass: '',
  guideContent: ''
})

const handleRightChange = (val) => {
  rightCheckRow.value = val
}

// 删除功能
const del = () => {
  if (!rightCheckRow.value || !currentRow.value || !rightCheckRow.value.guideContent) {
    ElMessage({
      message: '请选择删除的内容！',
      type: 'warning'
    })
    return
  }

  let params = {
    guideClass: currentRow.value.name,
    list: rightTableList.value.filter(
      (item) => item.guideContent != rightCheckRow.value.guideContent
    )
  }

  savePeChiefGuide(params).then((res) => {
    if (res) {
      ElMessage.success('删除成功')
      form.value.guideContent = ''
      getRightData(currentRow.value)
    }
  })
}

// 新增功能
const add = () => {
  // 清空表单，准备新增
  form.value = {
    guideClass: currentRow.value ? currentRow.value.name : '',
    guideContent: ''
  }
  rightCheckRow.value = null // 清除选中行，表示新增模式
}

// 保存功能（新增或修改）
const save = () => {
  if (!form.value.guideClass || !form.value.guideContent) {
    ElMessage({
      message: '指导类别、项目属性不能为空！',
      type: 'warning'
    })
    return
  }

  let params = {
    guideClass: currentRow.value.name,
    list: []
  }

  if (rightCheckRow.value) {
    // 编辑模式：更新选中的行
    params.list = rightTableList.value.map((item) => {
      if (item.guideContent === rightCheckRow.value.guideContent) {
        // 更新选中的行
        return {
          guideClass: form.value.guideClass,
          guideContent: form.value.guideContent
        }
      }
      return item
    })
  } else {
    // 新增模式：添加新行
    params.list = [...rightTableList.value]
    params.list.push({
      guideClass: form.value.guideClass,
      guideContent: form.value.guideContent
    })
  }

  savePeChiefGuide(params).then((res) => {
    if (res) {
      ElMessage.success(rightCheckRow.value ? '修改成功' : '保存成功')
      form.value = {
        guideClass: '',
        guideContent: ''
      }
      rightCheckRow.value = null // 重置选中行
      getRightData(currentRow.value) // 重新获取数据
    }
  })
}

onMounted(async () => {
  await getLeftData()
  if (leftTableList.value.length > 0) {
    setCurrent(leftTableList.value[0])
  }
})

// 点击行进行编辑
const handleRightRowClick = (row) => {
  form.value = { ...row } // 复制行数据到表单
  rightCheckRow.value = row // 设置选中行，表示编辑模式
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
