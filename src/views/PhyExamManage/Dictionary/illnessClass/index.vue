<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="4" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">疾病分组列表</div>
            <el-table
              :data="tableList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="getPeDiagList"
            >
              <el-table-column label="疾病分类" prop="DiagGroup" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="8" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">疾病诊断列表</div>
            <div class="base-cont">
              <el-button class="resetBtn" @click="handleAddClick">
                <el-icon><Plus /></el-icon>新增
              </el-button>
              <el-button type="danger" @click="delPeDiagnosis">删除</el-button>
            </div>
            <el-table
              :data="PeDiagList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 100px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="getDiagDetail"
            >
              <el-table-column label="疾病代码" prop="diagCode" show-overflow-tooltip />
              <el-table-column label="疾病名称" prop="diagName" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <div style="width: 100%; height: calc(100%)">
            <div class="content">
              <div class="base-title">疾病诊断详情</div>
              <div class="base-cont">
                <span class="cont-span">诊断代码:</span>
                <el-input
                  style="width: 16%"
                  v-model="DiagDetail.diagCode"
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">诊断名称:</span>
                <el-input
                  style="width: 16%"
                  v-model="DiagDetail.diagName"
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">诊断分组:</span>
                <!-- <el-input
                  style="width: 16%"
                  v-model="DiagDetail.diagGroup"
                  placeholder="请输入"
                  class="select-item"
                /> -->
                <el-select
                  v-model="DiagDetail.diagGroup"
                  placeholder="请选择分组"
                  style="width: 16%"
                  class="select-item"
                >
                  <el-option
                    v-for="item in tableList"
                    :key="item.DiagGroup"
                    :label="item.DiagGroup"
                    :value="item.DiagGroup"
                  ></el-option>
                </el-select>
              </div>

              <div class="base-cont">
                <span class="cont-span">输入码:</span>
                <el-input
                  style="width: 16%"
                  v-model="DiagDetail.inputCode"
                  placeholder="请输入"
                  class="select-item"
                />
                <span class="cont-span">代码类别:</span>
                <el-input
                  style="width: 16%"
                  v-model="DiagDetail.codeClass"
                  placeholder="请输入"
                  class="select-item"
                />
              </div>
              <div class="base-cont">
                <span class="cont-span">方位:</span>
                <el-input
                  type="textarea"
                  style="width: 86%"
                  v-model="DiagDetail.diagWhere"
                  placeholder="请输入"
                  class="select-item"
                  rows="4"
                />
              </div>
              <div class="base-cont">
                <span class="cont-span">程度:</span>
                <el-input
                  type="textarea"
                  style="width: 86%"
                  v-model="DiagDetail.diagDegree"
                  placeholder="请输入"
                  class="select-item"
                  rows="4"
                />
              </div>
              <div class="base-cont">
                <span class="cont-span">分类:</span>
                <el-input
                  type="textarea"
                  style="width: 86%"
                  v-model="DiagDetail.diagClass"
                  placeholder="请输入"
                  class="select-item"
                  rows="3"
                />
              </div>

              <div class="base-cont">
                <span class="cont-span">简短建议:</span>
                <el-input
                  type="textarea"
                  style="width: 86%"
                  v-model="DiagDetail.shortAdv"
                  placeholder="请输入"
                  class="select-item"
                  rows="4"
                />
              </div>

              <div class="base-cont">
                <span class="cont-span">临床表现:</span>
                <el-input
                  type="textarea"
                  style="width: 86%"
                  v-model="DiagDetail.behavior"
                  placeholder="请输入"
                  class="select-item"
                  rows="4"
                />
              </div>

              <div class="base-btn">
                <div class="btn-box" @click="savePeDiagnosis">保存</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <Dialog v-model="deptDialogVisible" width="600px">
      <template #title>
        <div class="dialog-title">选择科室</div>
      </template>

      <!-- 查询条件 -->
      <div class="search-box" style="margin-bottom: 10px">
        <el-input
          v-model="diseaseName"
          placeholder="请输入疾病名称"
          style="width: 38%; margin-right: 2%"
        />
        <!-- <el-input
          v-model="diseaseCode"
          placeholder="请输入疾病代码"
          style="width: 38%; margin-right: 2%"
        /> -->
        <el-button type="primary" @click="handleAddClick" style="">查询</el-button>
      </div>

      <!-- 表格展示 -->
      <div style="max-height: 300px; overflow-y: auto">
        <el-table :data="peDeptList" @row-click="handleDeptSelect">
          <el-table-column prop="diseaseCode" label="疾病代码" align="center"></el-table-column>
          <el-table-column prop="diseaseName" label="疾病名称" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <el-pagination
        v-if="peDeptList.length > 0"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        class="mt-4"
      ></el-pagination>

      <div class="flex justify-end mt-4">
        <el-button @click="deptDialogVisible = false">关闭</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/Dictionary/illnessClass/index'

// ===================== 响应式数据 =====================
const tableList = ref([])
const PeDiagList = ref([])
const DiagDetail = ref({
  diagCode: '',
  diagName: '',
  codeClass: '',
  diagGroup: '',
  diagWhere: '',
  diagDegree: '',
  diagClass: '',
  shortAdv: '',
  lifeGuide: '',
  behavior: '',
  inputCode: ''
})
// 疾病分类-诊断分组列表查询

const getPeDiagGroupList = async () => {
  try {
    const res = await Api.getPeDiagGroupList()
    tableList.value = res.map((name) => ({ DiagGroup: name }))
    if (tableList.value.length > 0) {
      // 默认选中第一项
      getPeDiagList(tableList.value[0])
    } else {
      PeDiagList.value = []
    }
  } catch (error) {
    console.error('获取疾病分组列表失败:', error)
  }
}
/* 疾病分类-诊断列表查询 */
const getPeDiagList = async (row) => {
  try {
    const res = await Api.getPeDiagList({
      diagCode: '',
      diagGroup: row.DiagGroup
    })
    PeDiagList.value = res || []
    if (PeDiagList.value.length > 0) {
      // 默认选中第一项
      getDiagDetail(PeDiagList.value[0])
    }
  } catch (error) {
    console.error('获取疾病诊断列表失败:', error)
  }
}
const getDiagDetail = (row) => {
  DiagDetail.value = row
}

// 疾病分类-诊断保存
const savePeDiagnosis = async () => {
  try {
    const res = await Api.savePeDiagnosis(DiagDetail.value)
    if (res) {
      if (optionFlag.value === '1') {
        ElMessage.success('新增成功')
      } else {
        ElMessage.success('保存成功')
      }
      optionFlag.value = '2' // 重置为新增状态
      getPeDiagList({ DiagGroup: DiagDetail.value.diagGroup })
    }
  } catch (error) {
    console.error('保存疾病诊断失败:', error)
  }
}
/* 疾病分类-诊断删除 */
const delPeDiagnosis = async () => {
  try {
    const res = await Api.delPeDiagnosis({
      diagCode: DiagDetail.value.diagCode,
      diagGroup: DiagDetail.value.diagGroup
    })
    if (res) {
      ElMessage.success('删除成功')
      getPeDiagList({ DiagGroup: DiagDetail.value.diagGroup })
    }
  } catch (error) {
    console.error('删除疾病诊断失败:', error)
  }
}
/* 疾病分类-新增诊断查询疾病 */
onMounted(() => {
  getPeDiagGroupList()
})

// ===================== 新增弹窗逻辑 =====================
const deptDialogVisible = ref(false) // 控制弹窗显示
const diseaseCode = ref('') // 疾病代码搜索
const diseaseName = ref('') // 疾病名称搜索
const peDeptList = ref([]) // 存储表格数据
const currentPage = ref(1) // 当前页码
const pageSize = ref(10) // 每页数量
const total = ref(0) // 用于保存总记录数，供分页组件使用
const optionFlag = ref('2') // 用于标识是新增还是编辑 '1' 为新增，'2' 为编辑
const getPeDiseaseByDiag = async (pageNo = 1) => {
  try {
    const res = await Api.getPeDiseaseByDiag({
      pageNo,
      pageSize: pageSize.value,
      diseaseCode: diseaseCode.value || '',
      diseaseName: diseaseName.value || ''
    })
    if (res && res.records) {
      peDeptList.value = res.records
      total.value = res.total // 更新总条数
    } else {
      peDeptList.value = []
      total.value = 0
      ElMessage.warning('未找到相关疾病信息')
    }
  } catch (error) {
    console.error('查询疾病失败:', error)
    ElMessage.error('查询失败，请检查网络或稍后再试')
  }
}
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  getPeDiseaseByDiag(newPage)
}
const handleAddClick = () => {
  optionFlag.value = '1' // 设置为新增状态
  currentPage.value = 1 // 重置到第一页
  PeDiagList.value.push({
    diagCode: '',
    diagName: '',
    codeClass: '',
    diagGroup: '',
    diagWhere: '',
    diagDegree: '',
    diagClass: '',
    shortAdv: '',
    lifeGuide: '',
    behavior: '',
    inputCode: ''
  })
  DiagDetail.value = PeDiagList.value[PeDiagList.value.length - 1] // 选中新增的行
  getPeDiseaseByDiag(currentPage.value)
  deptDialogVisible.value = true
}

const handleDeptSelect = (row) => {
  // 赋值诊断代码和名称
  DiagDetail.value.diagCode = row.diseaseCode
  DiagDetail.value.diagName = row.diseaseName

  // 清空其他字段
  DiagDetail.value.codeClass = ''
  DiagDetail.value.diagGroup = ''
  DiagDetail.value.diagWhere = ''
  DiagDetail.value.diagDegree = ''
  DiagDetail.value.diagClass = ''
  DiagDetail.value.shortAdv = ''
  DiagDetail.value.lifeGuide = ''
  DiagDetail.value.behavior = ''
  DiagDetail.value.inputCode = ''

  // 可选：关闭弹窗
  deptDialogVisible.value = false
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
