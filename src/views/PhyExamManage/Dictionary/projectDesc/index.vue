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
        <el-col :span="20" style="height: 100%">
          <div style="width: 100%; height: calc(100% - 404px)">
            <div class="content">
              <div class="base-title">项目组合</div>
              <el-table
                :data="peItemList"
                border
                class="mt-6px"
                style="width: 100%; height: calc(100% - 40px); overflow: auto"
                highlight-current-row
                stripe
                @row-click="getPeItemDescList"
              >
                <el-table-column
                  label="项目代码"
                  prop="peItemCode"
                  width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="项目名称"
                  width="120"
                  prop="peItemName"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="体检科室"
                  width="120"
                  prop="peDeptCode"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="所属组合"
                  width="120"
                  prop="itemAssemName"
                  show-overflow-tooltip
                />
                <el-table-column label="上限" prop="upperLimit" show-overflow-tooltip />
                <el-table-column label="下限" prop="lowerLimit" show-overflow-tooltip />
                <el-table-column
                  label="女性上限"
                  width="120"
                  prop="feupperLimit"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="女性下限"
                  width="120"
                  prop="felowerLimit"
                  show-overflow-tooltip
                />
                <el-table-column label="正常值" prop="normalValue" show-overflow-tooltip />
                <el-table-column label="单位" prop="unit" show-overflow-tooltip />
                <el-table-column label="建议" prop="suggest" show-overflow-tooltip />
                <el-table-column label="序号" prop="orderNo" show-overflow-tooltip />
                <el-table-column label="备注" prop="notes" show-overflow-tooltip />
                <el-table-column label="输入码 " prop="inputCode" show-overflow-tooltip />
                <el-table-column label="描述" prop="describes" show-overflow-tooltip />
                <el-table-column
                  label="结果表现方式"
                  width="120"
                  prop="peResultClass"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="结果类型"
                  width="120"
                  prop="resultCate"
                  show-overflow-tooltip
                />
                <el-table-column label="缺省值" prop="defaultValue" show-overflow-tooltip />
                <el-table-column label="对照码" prop="relateCode" show-overflow-tooltip />
                <el-table-column label="性别" prop="sex" show-overflow-tooltip />
              </el-table>

              <!-- 分页组件 -->
              <el-pagination
                v-if="peItemList.length > 0"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                class="mt-4"
              ></el-pagination>
            </div>
          </div>

          <div class="base-box mt-4px" style="background-color: #fff; height: 400px">
            <div class="base-title mb-2px">项目分类</div>

            <div class="base-cont">
              <el-button class="resetBtn" @click="handleAddClick">
                <el-icon><Plus /></el-icon>新增
              </el-button>
              <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button>
                <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
            </div>
            <el-table
              :data="peItemClassList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 80px); overflow: auto"
              highlight-current-row
              stripe
              @row-click="handleRowClick"
            >
              <el-table-column label="分类" prop="descClass" width="120" show-overflow-tooltip />
              <el-table-column label="内容" prop="descContent" show-overflow-tooltip />
              <el-table-column label="异常" prop="abnormalSign" show-overflow-tooltip />
              <el-table-column label="组合方式" prop="useClass" show-overflow-tooltip>
                <template #default="{ row }">
                  {{
                    row.useClass === '0'
                      ? '内容'
                      : row.useClass === '1'
                      ? '分类+内容'
                      : row.useClass === '2'
                      ? '内容+分类'
                      : ''
                  }}
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="flag" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.flag === '1' ? '启用' : row.flag === '0' ? '停用' : '' }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
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
              <el-form-item label="分类">
                <el-input v-model="rowdetail.descClass" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内容">
                <el-input v-model="rowdetail.descContent" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="异常">
                <el-select v-model="rowdetail.abnormalSign" style="width: 100%">
                  <el-option
                    v-for="option in optionsMap.examClass"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组合方式">
                <el-select v-model="rowdetail.useClass" style="width: 100%">
                  <el-option
                    v-for="option in optionsMap.examSubClass"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-select v-model="rowdetail.flag" style="width: 100%">
                  <el-option
                    v-for="option in optionsMap.examNoSeq"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="flex justify-end">
        <div class="base-cont mt-4px">
          <el-button class="resetBtn" @click="handleDel"> 删除 </el-button>
          <el-button type="primary" @click="savePeAssemItemLab()">保存</el-button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/Dictionary/projectDesc/index'

// ===================== 响应式数据 =====================
const optionFlag = ref('1') // 操作标志，1为新增，2为编辑
const deleteIndex = ref() // 删除的索引
const tableList = ref([])
const peItemList = ref([])
const peItemClassList = ref([])
const dialogVisible = ref(false)
const rowdetail = ref({
  itemAssemCode: '',
  itemAssemName: '',
  examClass: '',
  examSubClass: '',
  examNoSeq: '',
  examNoRule: '',
  flag: '',
  optionFlag: optionFlag.value
})
const peItemCode = ref('') // 体检项目代码
// ===================== 生命周期钩子 =====================
onMounted(() => {
  getPeDeptList()
})
// ===================== 方法 =====================
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

// 响应式数据定义（这部分在你的代码中已存在）
const pageNo = ref(1)
const total = ref(0)
const pageSize = ref(100)
const currentPage = ref(1) // 当前页码
const rowInfo = ref() // 存储当前选中的科室信息

// 切换分页处理函数
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage
  pageNo.value = newPage
  if (rowInfo.value) {
    getPeItemList(rowInfo.value)
  }
}

const getPeItemList = async (row: any) => {
  if (!row || !row.peDeptCode) {
    console.warn('传入的数据不是有效的科室行数据:', row)
    return
  }

  rowInfo.value = row
  try {
    const res = await Api.getPeItemList({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      peDeptCode: row.peDeptCode || '',
      itemAssemCode: '',
      peItemName: '',
      inputCode: ''
    })
    if (res.records && res.records.length > 0) {
      peItemList.value = res.records
      if (peItemClassList.value.length === 0) {
        getPeItemDescList(res.records[0])
      }
      total.value = res.total
      pageNo.value = 1
    } else {
      peItemList.value = []
      peItemClassList.value = []
    }
  } catch (error) {
    console.error('获取体检项目列表失败:', error)
  }
}
const getPeItemDescList = async (row) => {
  peItemCode.value = row.peItemCode
  try {
    const res = await Api.getPeItemDescList({
      peItemCode: row.peItemCode || ''
    })
    if (res && res.length > 0) {
      // 这里假设返回的数据格式与 tableList 的结构一致
      peItemClassList.value = res
    } else {
      peItemClassList.value = []
    }
  } catch (error) {
    console.error('获取体检项目描述列表失败:', error)
  }
}
//点击新增
const handleAddClick = () => {
  dialogVisible.value = true
  optionFlag.value = '1' // 设置为新增状态
  rowdetail.value = {
    itemAssemCode: '',
    itemAssemName: '',
    examClass: '',
    examSubClass: '',
    examNoSeq: '',
    examNoRule: '',
    flag: '',
    optionFlag: optionFlag.value
  }
}
// 点击编辑
const handleRowClick = (row, index) => {
  deleteIndex.value = index
  optionFlag.value = '2' // 设置为编辑状态
  rowdetail.value = row
  dialogVisible.value = true
}
// 下拉选项映射表
const optionsMap = {
  examClass: [
    { label: '异常', value: '异常' },
    { label: '正常', value: '正常' }
  ],
  examSubClass: [
    { label: '内容', value: '0' },
    { label: '分类+内容', value: '1' },
    { label: '内容+分类', value: '2' }
  ],
  examNoSeq: [
    { label: '启用', value: '1' },
    { label: '停用', value: '0' }
  ]
}

// 保存体检项目组合
const savePeAssemItemLab = async () => {
  const dataInfo = ref({
    peItemCode: peItemCode.value,
    list: peItemClassList.value
  })
  if (optionFlag.value === '1') {
    dataInfo.value.list.push(rowdetail.value)
  }
  try {
    const res = await Api.savePeItemDesc(dataInfo.value)
    if (res && optionFlag.value === '1') {
      // 新增
      ElMessage.success('添加成功')
    } else if (res && optionFlag.value === '2') {
      // 编辑
      ElMessage.success('保存成功')
    } else if (res && optionFlag.value === '3') {
      // 删除
      ElMessage.success('删除成功')
    }
    dialogVisible.value = false
    getPeItemDescList({ peItemCode: peItemCode.value }) // 刷新列表
  } catch (error) {
    console.error('保存体检项目组合失败:', error)
  }
}
// 删除体检项目组合
const handleDel = () => {
  const index = peItemClassList.value.indexOf(rowdetail.value)
  if (index !== -1) {
    peItemClassList.value.splice(index, 1)
    optionFlag.value = '3'
    savePeAssemItemLab()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('找不到该条目')
  }
  optionFlag.value = '3' // 设置为删除状态
  savePeAssemItemLab()
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
