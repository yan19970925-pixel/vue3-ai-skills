<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="4" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">体检科室列表</div>
            <el-table
              :data="tableList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="getPeItemList"
            >
              <el-table-column label="科室名称" prop="peDeptName" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="4" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">体检项目</div>
            <el-table
              :data="peItemList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="getPeItemReportWriteList"
            >
              <el-table-column label="项目名称" prop="peItemName" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="16" style="height: 100%">
          <div style="width: 100%; height: calc(100% - 404px)">
            <div class="content">
              <div class="base-title">项目组合</div>
              <div class="base-cont">
                <el-button class="resetBtn" @click="addPeTestTubeDict">
                  <el-icon><Plus /></el-icon>新增
                </el-button>
                <!-- 
                  <el-button type="danger" @click="handleSaveDocument">删除</el-button>
                  -->
              </div>
              <el-table
                :data="PeItemReportWriteList"
                border
                class="mt-6px"
                style="width: 100%; overflow: auto"
                highlight-current-row
                stripe
                height="210"
                @row-click="getItemDetail"
              >
                <el-table-column
                  label="项目属性"
                  prop="keyName"
                  width="120"
                  show-overflow-tooltip
                />
                <el-table-column label="描述" prop="itemDesc" show-overflow-tooltip />
                <el-table-column label="输入码" prop="inputCode" show-overflow-tooltip />
                <el-table-column label="异常标志" prop="diseaseSign" show-overflow-tooltip />
                <el-table-column label="序号" prop="orderNo" show-overflow-tooltip />
              </el-table>
            </div>
          </div>

          <div class="base-box mt-4px" style="background-color: #fff; height: calc(100% - 370px)">
            <div class="base-title mb-2px">组合详情</div>

            <div class="base-cont">
              <span class="cont-span">组合代码:</span>
              <el-input
                style="width: 16%"
                v-model="PeItemDetail.peItemCode"
                disabled="true"
                class="select-item"
              />
              <span class="cont-span">异常标志:</span>
              <el-select
                v-model="PeItemDetail.diseaseSign"
                placeholder="请选择"
                style="width: 16%"
                class="select-item"
                filterable
                default-first-option
              >
                <el-option
                  v-for="item in peDocPermList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="cont-span">序号:</span>
              <el-input
                style="width: 16%"
                v-model="PeItemDetail.orderNo"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">输入码:</span>
              <el-input
                style="width: 16%"
                v-model="PeItemDetail.inputCode"
                placeholder="请输入"
                class="select-item"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">项目属性:</span>
              <el-input
                type="textarea"
                style="width: 86%"
                v-model="PeItemDetail.keyName"
                placeholder="请输入"
                class="select-item"
                rows="3"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">阳性体征解释:</span>
              <el-input
                type="textarea"
                style="width: 86%"
                v-model="PeItemDetail.explanation"
                placeholder="请输入"
                class="select-item"
                rows="3"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">描述:</span>
              <el-input
                type="textarea"
                style="width: 86%"
                v-model="PeItemDetail.itemDesc"
                placeholder="请输入"
                class="select-item"
                rows="3"
              />
            </div>

            <div class="base-btn">
              <div class="btn-box" @click="handleSaveDocument">保存</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/Dictionary/projectProp/index'
// ===================== 响应式数据 =====================
const tableList = ref([])
const peItemList = ref([])
const PeItemReportWriteList = ref([])
const peDocPermList = ref([
  { label: '正常', value: '正常' },
  { label: '异常', value: '异常' }
])
const PeItemDetail = ref({
  peItemCode: '',
  peItemName: '',
  inputCode: '',
  keyName: '',
  explanation: '',
  itemDesc: ''
})
const peItemCode = ref('') // 用于存储选中的体检项目代码
const addFlag = ref('0') // 用于标记新增状态
// 获取科室列表
const getPeDeptList = async () => {
  try {
    const res = await Api.getPeDeptList()
    if (res.length > 0) {
      // 这里假设返回的数据格式与 tableList 的结构一致
      tableList.value = res
      getPeItemList(res[0])
    }
  } catch (error) {
    console.error('获取科室列表失败:', error)
  }
}
// 获取体检项目列表
const getPeItemList = async (row) => {
  try {
    const res = await Api.getPeItemList({
      pageNo: 1,
      pageSize: 200,
      peDeptCode: row.peDeptCode || '',
      itemAssemCode: '',
      peItemName: '',
      inputCode: ''
    })
    if (res.records && res.records.length > 0) {
      // 这里假设返回的数据格式与 tableList 的结构一致
      peItemList.value = res.records
      getPeItemReportWriteList(res.records[0])
    } else {
      peItemList.value = []
      PeItemReportWriteList.value = []
      PeItemDetail.value = {
        peItemCode: '',
        peItemName: '',
        inputCode: '',
        keyName: '',
        explanation: '',
        itemDesc: ''
      }
    }
  } catch (error) {
    console.error('获取体检项目列表失败:', error)
  }
}

// 项目属性-属性查询
const getPeItemReportWriteList = async (row) => {
  peItemCode.value = row.peItemCode // 存储选中的体检项目代码

  try {
    const res = await Api.getPeItemReportWriteList({
      peItemCode: row.peItemCode || ''
    })
    if (res && res.length > 0) {
      // 这里假设返回的数据格式与 tableList 的结构一致
      PeItemReportWriteList.value = [...res]
      PeItemDetail.value = res[0]
    } else {
      PeItemReportWriteList.value = []
      PeItemDetail.value = {
        peItemCode: '',
        peItemName: '',
        inputCode: '',
        keyName: '',
        explanation: '',
        itemDesc: ''
      }
    }
  } catch (error) {
    console.error('获取体检组合项目查询失败:', error)
  }
}
const getItemDetail = (row) => {
  PeItemDetail.value = row
  addFlag.value = '0' // 重置新增标志
}

// 点击新增
const addPeTestTubeDict = () => {
  if (addFlag.value === '1') {
    ElMessage.warning('请先保存当前编辑的项目属性')
    return
  }
  PeItemReportWriteList.value.push({
    peItemCode: '',
    keyName: '',
    itemDesc: '',
    diseaseSign: '',
    explanation: '',
    guide: '',
    orderNo: 0,
    inputCode: ''
  })
  setTimeout(() => {
    // 获取所有行
    const rows = document.querySelectorAll('.el-table__row')
    if (rows.length > 0) {
      // 获取最后一行
      const lastRow = rows[rows.length - 1]
      lastRow.click() // 触发行点击事件
      addFlag.value = '1'
      // 获取组合详情中的第一个input
      // const firstInput = lastRow.querySelector('.el-table__cell:nth-child(1) input')
      // 在新增行后触发聚焦逻辑中：
      const firstInput = document.querySelector('.select-item input') as HTMLInputElement
      if (firstInput) {
        firstInput.focus()
        console.log('✅ 已聚焦到第一行第一列 input')
      } else {
        console.warn('❌ 未找到第一行第一列的 input')
      }
    }
  }, 100)
}

// 保存项目属性
const handleSaveDocument = () => {
  // 保存前判断一下 项目属性是否为空
  if (PeItemDetail.value.keyName.trim() === '') {
    ElMessage.warning('项目属性不能为空')
    return
  }

  const saveInfo = ref({
    peItemCode: peItemCode.value || '', // 体检项目代码
    list: PeItemReportWriteList.value // 项目属性列表
  })
  if (addFlag.value === '1') {
    // 新增逻辑
    Api.savePeItemReportWrite(saveInfo.value).then((res) => {
      if (res) {
        // getPeDeptList()
        ElMessage.success('添加成功')
      }
    })
  } else {
    // 编辑逻辑
    Api.savePeItemReportWrite(saveInfo.value).then((res) => {
      if (res) {
        // getPeDeptList()
        ElMessage.success('保存成功')
      }
    })
  }
}

onMounted(() => {
  getPeDeptList()
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
