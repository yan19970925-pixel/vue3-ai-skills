<template>
  <div class="diagnosticRecom">
    <div class="dept_left">
      <div class="heard_title">
        <span>科室建议设置</span>
      </div>
      <div class="left_table">
        <el-table
          :data="deptList"
          style="width: 100%"
          height="calc(100vh - 160px)"
          border
          @row-click="clickRow"
          highlight-current-row
          :row-class-name="setRowClassName"
        >
          <el-table-column prop="peDeptName" label="科室名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dept_right">
      <div class="heard_title">
        <span>建议列表</span>
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
          <el-table-column prop="serialNo" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="peDeptSuggest" label="内容"></el-table-column>
          <el-table-column label="缺省" width="100" align="center">
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
          <el-form-item label="科室名称" prop="peDeptName">
            <el-input v-model="form.peDeptName" readonly></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="peDeptSuggest">
            <el-input v-model="form.peDeptSuggest"></el-input>
          </el-form-item>
          <el-form-item label="序号" prop="serialNo">
            <el-input
              type="number"
              :min="0"
              :step="1"
              v-model="form.serialNo"
              @input="handleInput"
            ></el-input>
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
import * as Api from '@/api/Dictionary/diagnosticRecom/index'
const setRowClassName = ({ row }) => {
  if (row.peDeptCode == rowInfo.value.peDeptCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const tableData = ref([])
const rowInfo = ref({})
const deptList = ref([])
const deptCode = ref('')
// 科室列表数据
const getDeptList = async () => {
  await Api.getPeDeptList().then((res) => {
    deptList.value = res
  })
}

const deptProjectList = ref([])
// 点击左侧表格行事件
const clickRow = (row) => {
  rowInfo.value = row
  form.peDeptName = row.peDeptName
  Api.getPeDeptSuggestList({ peDeptName: row.peDeptName }).then((res) => {
    deptProjectList.value = res
  })
}
const form = reactive({
  peDeptName: '',
  peDeptSuggest: '',
  isDefault: '',
  serialNo: ''
})
const isDefault = ref(false)
const formRule = reactive({
  peDeptName: [
    {
      required: true,
      message: '请输入科室名称',
      trigger: 'blur'
    }
  ],
  peDeptSuggest: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur'
    }
  ]
})
const handleInput = (value) => {
  // 使用正则表达式匹配非负整数
  const regex = /^[0-9]*$/
  if (!regex.test(value)) {
    form.serialNo = value.replace(/[^0-9]/g, '') // 移除非数字字符
  }
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
      let params = {
        peDeptName: rowInfo.value.peDeptName,
        list: deptProjectList.value
      }
      params.list.push({
        peDeptName: form.peDeptName,
        peDeptSuggest: form.peDeptSuggest,
        isDefault: form.isDefault,
        serialNo: form.serialNo
      })
      Api.savePeDeptSuggest(params).then((res) => {
        ElMessage({
          message: '保存成功',
          type: 'success'
        })
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
  form.peDeptName = rowInfo.value.peDeptName
}
const del = (row) => {
  deptProjectList.value.splice(
    deptProjectList.value.findIndex((item) => item.peDeptSuggest == row.peDeptSuggest),
    1
  )
  let params = {
    peDeptName: rowInfo.value.peDeptName,
    list: deptProjectList.value
  }

  Api.savePeDeptSuggest(params).then((res) => {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    clickRow(rowInfo.value)
  })
}
onMounted(async () => {
  await getDeptList()
  if (deptList.value.length > 0) {
    clickRow(deptList.value[0])
  }
})
</script>

<style lang="scss" scoped>
.diagnosticRecom {
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
