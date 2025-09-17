<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="4" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">体检科室列表</div>
            <el-table
              :data="deptList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="getpeDeptDisease"
            >
              <el-table-column label="科室名称" prop="peDeptName" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="20" style="height: 100%">
          <div style="width: 100%; height: calc(100%)">
            <div class="content">
              <div class="base-title">常见病史列表</div>
              <div class="base-cont">
                <el-button class="resetBtn" @click="handleAddDocument">
                  <el-icon><Plus /></el-icon>新增
                </el-button>
                <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button>
                <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
              </div>
              <el-table
                :data="tableList"
                border
                class="mt-6px"
                style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
                highlight-current-row
                stripe
                @row-click="handleDeptRowClick"
              >
                <el-table-column label="序号" prop="serialNo" width="120" show-overflow-tooltip />
                <el-table-column label="内容" prop="peDeptDisease" show-overflow-tooltip />
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialogVisible" title="操作" width="40%">
      <el-form :model="currentEditItem" label-width="100px">
        <el-form-item label="内容">
          <el-input v-model="currentEditItem.peDeptDisease" />
        </el-form-item>
        <el-form-item label="序号">
          <el-input-number v-model="currentEditItem.serialNo" :min="1" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="danger" @click="deleteSelectedItem">删除</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/Dictionary/commonMed/index'
import { on } from 'events'

// ===================== 响应式数据 =====================
const tableList = ref([])
const deptList = ref([])

// 获取科室信息
const getDeptList = async () => {
  try {
    const res = await Api.getDeptList()
    if (res) {
      deptList.value = res
    }
  } catch (error) {
    console.error('获取科室列表失败:', error)
  }
}
// 科室小结-查询
const getpeDeptDisease = async (row) => {
  currentDept.value = row
  try {
    const res = await Api.getPeDeptConclusion({
      peDeptName: row.peDeptName || ''
    })
    if (res) {
      tableList.value = res
    }
  } catch (error) {
    console.error('获取科室小结失败:', error)
  }
}
onMounted(() => {
  getDeptList()
})

// 科室小结-保存
const handleSaveDocument = async () => {
  if (!currentDept.value) {
    ElMessage.warning('请选择一个科室')
    return
  }

  const saveData = {
    peDeptName: currentDept.value.peDeptName,
    list: tableList.value.map((item) => ({
      ...item,
      peDeptName: currentDept.value.peDeptName // 确保每个子项也包含科室名
    }))
  }

  try {
    const res = await Api.savePeDeptConclusion(saveData)
    if (res) {
      ElMessage.success('保存成功')
      getpeDeptDisease(currentDept.value) // 可选：刷新列表
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存科室小结失败:', error)
    ElMessage.error('保存失败')
  }
}
const currentDept = ref(null)

const handleDeptRowClick = (row) => {
  if (!row) return

  currentEditItem.value = { ...row }
  editIndex = tableList.value.findIndex((item) => item === row)
  isEditMode.value = true
  dialogVisible.value = true
}

// 新增弹窗内容
// 控制弹窗显示
const dialogVisible = ref(false)

// 当前编辑的数据对象
const currentEditItem = ref({
  peDeptDisease: '',
  isDefault: 0,
  serialNo: 0
})

// 新增条目索引
let editIndex = -1

// 新增按钮事件
const handleAddDocument = () => {
  if (!currentDept.value) {
    ElMessage.warning('请先选择一个科室')
    return
  }

  // 创建新条目并加入 tableList
  const newItem = {
    peDeptName: currentDept.value.peDeptName,
    peDeptDisease: '',
    isDefault: 0,
    serialNo: tableList.value.length + 1
  }
  tableList.value.push(newItem)
  editIndex = tableList.value.length - 1

  // 设置当前编辑项
  currentEditItem.value = { ...newItem }
  // 显示弹窗
  dialogVisible.value = true
}
const isEditMode = ref(false) // 是否为编辑模式
// 保存弹窗内容
const saveEdit = () => {
  if (isEditMode.value) {
    // 编辑已有条目
    tableList.value[editIndex] = {
      ...tableList.value[editIndex],
      ...currentEditItem.value
    }
  } else {
    // 新增条目：此时才 push
    tableList.value[editIndex] = currentEditItem.value
  }

  handleSaveDocument()
  dialogVisible.value = false
}
// 删除
const deleteSelectedItem = () => {
  if (!isEditMode.value) {
    ElMessage.warning('请选择要删除的条目')
    return
  }

  tableList.value.splice(editIndex, 1)
  handleSaveDocument()
  dialogVisible.value = false
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
