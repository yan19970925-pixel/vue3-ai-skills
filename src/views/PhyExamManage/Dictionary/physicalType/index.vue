<template>
  <div class="physicalType">
    <div class="left_content">
      <div class="heard_title">
        <span>体检类型列表</span>
      </div>
      <div class="div_table">
        <el-table
          :data="leftTableData"
          border
          style="width: 100%"
          height="calc(100vh - 160px)"
          highlight-current-row
          @row-click="handleLeftRowClick"
          :row-class-name="setRowClassName"
          :header-cell-style="{ backgroundColor: '#f5f7f9', color: '#333' }"
        >
          <el-table-column prop="dictName" label="名称" width="100"></el-table-column>
          <el-table-column prop="keyCode" label="编码" width="80"></el-table-column>
          <el-table-column prop="keyValue" label="内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="keyDesc" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remarks" label="操作标志" width="100" align="center">
            <template #default="scope">
              <span>{{ scope.row.flag == 0 ? '正常' : '已删除' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60px" align="center">
            <template #default="scope">
              <el-button
                type="text"
                style="text-align: center; color: #ed2226"
                size="small"
                @click.stop="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right_content">
      <div class="heard_title">
        <span>体检类型明细</span>
      </div>
      <div class="con_form">
        <el-form ref="ruleFormRef" :rules="formRules" :model="form" label-width="80px">
          <el-form-item label="名称:">
            <el-input v-model="form.dictName" readonly placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="编码:">
            <el-input v-model="form.keyCode" readonly placeholder="请输入编码"></el-input>
          </el-form-item>
          <el-form-item label="内容:" prop="keyValue">
            <el-input v-model="form.keyValue" placeholder="请输入内容" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="form.keyDesc" placeholder="请输入备注" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save(ruleFormRef)">保存</el-button>
            <el-button @click="add()">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  getPeCommDictList,
  savePeCommDict,
  delPeCommDict
} from '@/api/Dictionary/physicalType/index'
const searchParams = ref({
  dictName: '体检类型',
  keyCode: '',
  keyValue: '',
  keyDesc: '',
  flag: ''
})
const form = ref({
  dictName: '',
  keyCode: '',
  keyValue: '',
  keyDesc: '',
  flag: 0
})
const formRules = reactive({
  keyValue: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
})
// 左侧列表数据
const leftTableData = ref([])
const rightCheckRow = ref({})
// 左侧表格数据查询
const search = (index) => {
  getPeCommDictList(searchParams.value).then((res) => {
    leftTableData.value = res || []
    if (res.length > 0) {
      leftTableData.value.sort((a, b) => a.keyCode - b.keyCode)
      if (index || index == 0) {
        handleLeftRowClick(res[index])
      }
    }
  })
}
const setRowClassName = ({ row }) => {
  if (row.keyCode == rightCheckRow.value.keyCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}

// 删除功能
const del = (row) => {
  delPeCommDict(row).then((res) => {
    ElMessage.success('删除成功')
    search(0)
  })
}
const setIndex = ref(0)

// 新增功能
const add = () => {
  setIndex.value = leftTableData.value.length + 1
  form.value.keyDesc = ''
  form.value.keyCode = leftTableData.value.length + 1
  form.value.keyValue = ''
  form.value.dictName = '体检类型'
  form.value.flag = 0
}

// 保存功能（新增或修改）
const ruleFormRef = ref(null)
const save = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      savePeCommDict(form.value).then(async (res) => {
        ElMessage.success('保存成功')
        await search()
        setTimeout(() => {
          add()
        }, 300)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  form.value.keyDesc = ''
}
onMounted(async () => {
  search(0)
})

// 点击行进行编辑
const handleLeftRowClick = (row) => {
  setIndex.value = row.keyCode
  form.value = { ...row } // 复制行数据到表单
  rightCheckRow.value = row // 设置选中行，表示编辑模式
}
</script>

<style lang="scss" scoped>
.physicalType {
  background-color: #f5f7f9;
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
  .left_content {
    width: 49.5%;
    .type_search {
      display: flex;
      align-items: center;
      height: 56px;
      background-color: #fff;
      .search_div {
        margin-left: 10px;
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
        }
      }
    }
    .div_table {
      background-color: #fff;
      height: calc(100vh - 140px);
      padding: 0 10px;
      padding-top: 10px;
    }
  }
  .right_content {
    width: 49.5%;
    height: calc(100vh - 100px);
    background-color: #fff;
    .con_form {
      padding-top: 10px;
      padding-right: 10px;
    }
  }
  .heard_title {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
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
</style>
