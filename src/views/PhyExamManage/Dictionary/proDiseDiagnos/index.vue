<template>
  <div class="proDiseDiagnos">
    <div class="dept_left">
      <div class="heard_title">
        <span>项目列表</span>
      </div>
      <div class="left_table">
        <div style="margin-bottom: 10px">
          <span>科室名称：</span>
          <el-select v-model="deptCode" filterable placeholder="请选择科室" @change="changeDept">
            <el-option
              v-for="item in deptList"
              :key="item.peDeptCode"
              :label="item.peDeptName"
              :value="item.peDeptCode"
            ></el-option>
          </el-select>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100vh - 200px)"
          border
          @row-click="clickRow"
          highlight-current-row
          :row-class-name="setRowClassName"
        >
          <el-table-column prop="peItemName" label="项目名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dept_right">
      <div class="heard_title">
        <span>诊断列表</span>
      </div>
      <div class="con_table">
        <el-table
          :data="deptProjectList"
          style="width: 100%"
          height="calc(100vh - 420px)"
          border
          @row-click="clickDeptCommonRow"
          highlight-current-row
          :row-class-name="setDeptCommonRowClassName"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="diagName" label="诊断名称" width="300"></el-table-column>
          <el-table-column prop="diagCode" label="异常描述"></el-table-column>
          <el-table-column prop="diagCode" label="小结" width="230"></el-table-column>
          <el-table-column prop="diagCode" label="缺省" width="100" align="center">
            <template #default="scope">
              <span v-if="scope.row.isDefault == '1'">✓</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column prop="diagCode" label="操作" width="100" align="center">
            <template #default="scope">
              <el-button style="padding: 0 8px" text type="danger" @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="con_form">
        <el-form
          :model="form"
          :rules="formRule"
          ref="ruleFormRef"
          label-width="100px"
          class="demo_ruleForm"
        >
          <el-form-item label="诊断名称" prop="diagName">
            <el-popover placement="right" :width="600" trigger="click">
              <template #reference>
                <el-input v-model="form.diagName" readonly></el-input>
              </template>
              <div class="po_con">
                <div class="po_search">
                  <span>疾病代码：</span>
                  <el-input v-model="disease.diseaseCode" style="width: 150px"></el-input>
                  <span style="margin-left: 8px">疾病名称:</span>
                  <el-input v-model="disease.diseaseName" style="width: 150px"></el-input>
                  <el-button type="primary" @click="searchDisease(1)" style="margin-left: 8px"
                    >搜索</el-button
                  >
                </div>
                <div class="po_table">
                  <el-table
                    :data="diseaseList"
                    style="width: 100%"
                    height="308px"
                    border
                    highlight-current-row
                    @row-dblclick="selectDisease"
                  >
                    <el-table-column
                      prop="diseaseCode"
                      width="120px"
                      label="疾病代码"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page="disease.pageNo"
                    :page-size="10"
                    :background="false"
                    layout="total, prev, pager, next"
                    :total="diseaseListTotal"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="异常描述" prop="itemDesc">
            <el-popover placement="right" :width="528" trigger="click">
              <template #reference>
                <el-input v-model="form.itemDesc" readonly></el-input>
              </template>
              <div class="po_con">
                <div class="po_table">
                  <el-table
                    :data="abnormalList"
                    style="width: 100%"
                    height="308px"
                    border
                    highlight-current-row
                    @row-dblclick="selectAbnormal"
                  >
                    <el-table-column
                      prop="peItemCode"
                      width="120px"
                      label="属性编码"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="itemDesc" label="描述内容"></el-table-column>
                    <el-table-column prop="keyName" label="属性内容"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="小结" prop="peConclusion">
            <el-input v-model="form.peConclusion"></el-input>
          </el-form-item>
          <el-form-item label="缺省" prop="isDefault">
            <el-checkbox v-model="isDefault" size="large" @change="changeDefault" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            <el-button @click="resetForm(ruleFormRef)">清屏</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/Dictionary/proDiseDiagnos/index'
const setRowClassName = ({ row }) => {
  if (row.peItemCode == rowInfo.value.peItemCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const tableData = ref([])
const rowInfo = ref({})
const deptList = ref([])
const deptCode = ref('')
// 科室下拉框数据
const getDeptList = async () => {
  await Api.getPeDeptList().then((res) => {
    deptList.value = res
  })
}
const changeDept = (val) => {
  resetForm(ruleFormRef.value)
  Api.getPeDeptItemList({ peDeptCode: val }).then((res) => {
    tableData.value = res
    if (res.length > 0) {
      clickRow(res[0])
    }
  })
}
// 点击左侧表格行事件
const deptProjectList = ref([])
const clickRow = (row) => {
  rowInfo.value = row
  resetForm(ruleFormRef.value)
  Api.getPeAutoDiagnoseList({ peDeptCode: deptCode.value, peItemCode: row.peItemCode }).then(
    (res) => {
      deptProjectList.value = res
    }
  )
  getPeitemList(row.peItemCode)
}
const form = reactive({
  diagName: '',
  keyName: '',
  diagCode: '',
  itemDesc: '',
  peItemCode: '',
  orderNo: '',
  peDeptCode: '',
  peConclusion: '',
  isDefault: 0
})
const isDefault = ref(false)
const formRule = reactive({
  diagName: [
    {
      required: true,
      message: '请输入诊断名称',
      trigger: 'blur'
    }
  ],
  itemDesc: [
    {
      required: true,
      message: '请输入异常描述',
      trigger: 'blur'
    }
  ]
})
const disease = reactive({
  pageNo: 1,
  pageSize: 10,
  diseaseCode: '',
  diseaseName: ''
})
const diseaseList = ref([])
const diseaseListTotal = ref(0)
const searchDisease = async (val: Number) => {
  disease.pageNo = val ? val : '1'
  await Api.getPeDisease(disease).then((res) => {
    diseaseList.value = res.records
    diseaseListTotal.value = res.total
  })
}
const handleCurrentChange = (val: number) => {
  searchDisease(val)
}
const selectDisease = (row) => {
  form.diagName = row.diseaseName
  form.diagCode = row.diseaseCode
}
const abnormalList = ref([])
// 查询项目属性列表
const getPeitemList = async (peItemCode) => {
  await Api.getPeItemReportWriteList({ peItemCode: peItemCode }).then((res) => {
    console.log('1111111111', res)
    abnormalList.value = res
  })
}
const selectAbnormal = (row) => {
  form.itemDesc = row.itemDesc
  form.orderNo = row.orderNo
  form.keyName = row.keyName
}
const changeDefault = (val) => {
  if (val) {
    form.isDefault = 1
  } else {
    form.isDefault = 0
  }
}
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      form.peDeptCode = deptCode.value
      form.peItemCode = rowInfo.value.peItemCode
      Api.savePeAutoDiagnose(form).then((res) => {
        ElMessage.success('保存成功')
        resetForm(ruleFormRef.value)
        isDefault.value = false
        clickRow(rowInfo.value)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const del = (row) => {
  Api.delPeAutoDiagnose({ diagNameOld: row.diagNameOld, keyNameOld: row.keyNameOld }).then(
    (res) => {
      ElMessage.success('删除成功')
      clickRow(rowInfo.value)
    }
  )
}
onMounted(async () => {
  await getDeptList()
  await searchDisease(1)
  if (deptList.value.length > 0) {
    deptCode.value = deptList.value[0].peDeptCode
    await changeDept(deptCode.value)
  }
})
</script>

<style lang="scss" scoped>
.proDiseDiagnos {
  /* background-color: #f5f7f9; */
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .dept_left {
    width: 20%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .left_table {
      margin-top: 10px;
    }
  }
  .dept_right {
    width: 79.8%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .con_table {
      margin: 10px 0;
    }
    .con_form {
      width: 40%;
      .demo_ruleForm {
      }
    }
  }

  .heard_title {
    height: 40px;
    line-height: 40px;
    /* padding-left: 20px; */
    /* margin-bottom: 11px; */
    border-bottom: 1px solid #c5dcff;
    span {
      display: inline-block;
      width: auto;
      height: 40px;
      padding: 0 20px;
      text-align: center;
      /* border-bottom: 2px solid #3473d1; */
      color: #3473d1;
      font-weight: bold;
    }
  }
}
.po_con {
  width: 500px;
  .po_search {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 74px;
    }
  }
  .po_table {
    margin-top: 10px;
  }
}
</style>
