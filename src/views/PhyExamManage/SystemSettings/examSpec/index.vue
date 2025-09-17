<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="content">
        <div class="base-cont mt-4px">
          <!-- <el-button class="resetBtn" @click="savePeTestTubeDict(1)"> -->
          <el-button class="resetBtn" @click="addPeTestTubeDict()">
            <el-icon><Plus /></el-icon>新增
          </el-button>
          <el-button type="danger" @click="handleSaveDocument">删除</el-button>
          <el-button type="primary" @click="savePeTestTubeDict">保存</el-button>
        </div>
        <el-table
          ref="adviceTableRef"
          :data="tableList"
          border
          style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
          size="small"
          @row-click="handleDeptItem"
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
            <template #default="{ row }">
              <el-input v-model="row[item.prop]" size="small" />
            </template>
          </el-table-column>
          <!-- peRole 列 ，1、2、4、7、9分别对应 peDocPermList中的数据-->

          <!-- 添加一个操作列 功能：删除 -->
          <el-table-column label="操作" width="100" align="center">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                style="color: red"
                @click="delPeTestTubeDict(scope.row)"
              >
                删除
              </el-button>
              <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/systemSetting/examSpec/index'
import { ElMessage } from 'element-plus'

// ===================== 响应式数据 =====================
const tableList = ref([])
const rowInfo = ref({
  specimanCode: '',
  specimanName: '',
  inputCode: '',
  deptCode: '',
  serialNo: '',
  optionFlag: 2
})
const addColumns = [
  { prop: 'serialNo', label: '序号', align: 'center', width: '80px' },
  { prop: 'specimanCode', label: '标本代码', align: 'center', width: '180px' },
  { prop: 'specimanName', label: '标本名称', align: 'center', width: '280px' },
  { prop: 'inputCode', label: '输入码', align: 'center', width: '180px' },
  { prop: 'deptCode', label: '科室', align: 'center', width: '380px' }
]
const specimanCode = ref('')
const getPeTestTubeDictList = async () => {
  await Api.getPeTestTubeDictList({
    specimanCode: ''
  }).then((res) => {
    if (res.length > 0) {
      // 将res按照testTubeCode字段从小到大排序
      res.sort((a, b) => {
        return a.serialNo - b.serialNo
      })
      tableList.value = res
      // specimanCode.value = String(Number(res[res.length - 1].specimanCode) + 1)
      // specimanCode.value = specimanCode.value.padStart(3, '0')
      handleDeptItem(res[0])
    }
  })
}

const handleDeptItem = (row) => {
  rowInfo.value = row
}

const savePeTestTubeDict = async () => {
  await Api.savePeTestTubeDict({
    list: [
      {
        specimanCode: rowInfo.value.specimanCode,
        specimanName: rowInfo.value.specimanName,
        inputCode: rowInfo.value.inputCode,
        deptCode: rowInfo.value.deptCode,
        serialNo: rowInfo.value.serialNo,
        optionFlag: rowInfo.value.optionFlag == 1 ? 1 : 2
      }
    ]
  }).then((res) => {
    if (res) {
      getPeTestTubeDictList()
      if (rowInfo.value.optionFlag == 1) {
        // 在 savePeChartDict 的 then 分支中添加
        /* setTimeout(() => {
          // 获取所有行
          const rows = document.querySelectorAll('.el-table__row')
          if (rows.length > 0) {
            // 获取最后一行
            const lastRow = rows[rows.length - 1]

            // 查找该行第一列的 input
            const firstInput = lastRow.querySelector('.el-table__cell:nth-child(1) input')

            if (firstInput) {
              firstInput.focus()
              console.log('✅ 已聚焦到最后一行第一列 input')
            } else {
              console.warn('❌ 未找到最后一行第一列的 input')
            }
          }
        }, 100) */
        ElMessage.success('添加成功')
      } else {
        ElMessage.success('保存成功')
      }
    }
  })
}

const delPeTestTubeDict = async (row) => {
  await Api.delPeTestTubeDict({
    specimanCode: row.specimanCode || '050'
  }).then((res) => {
    if (res) {
      getPeTestTubeDictList()
      ElMessage.success('删除成功')
    }
  })
}
const addPeTestTubeDict = () => {
  tableList.value.push({
    serialNo: '',
    specimanCode: '',
    specimanName: '',
    inputCode: '',
    deptCode: '',
    optionFlag: 1
  })
  setTimeout(() => {
    // 获取所有行
    const rows = document.querySelectorAll('.el-table__row')
    if (rows.length > 0) {
      // 获取最后一行
      const lastRow = rows[rows.length - 1]

      // 查找该行第一列的 input
      const firstInput = lastRow.querySelector('.el-table__cell:nth-child(1) input')

      if (firstInput) {
        firstInput.focus()
        console.log('✅ 已聚焦到最后一行第一列 input')
      } else {
        console.warn('❌ 未找到最后一行第一列的 input')
      }
    }
  }, 100)
}
onMounted(() => {
  getPeTestTubeDictList()
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
</style>
