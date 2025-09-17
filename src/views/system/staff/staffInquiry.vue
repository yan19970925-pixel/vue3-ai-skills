<template>
  <div class="content-container">
    <div class="container-header">
      <span class="search-row-label mr-8px ml-8px">员工编号：</span>
      <el-input
        type="text"
        placeholder="请输入"
        class="!w-160px"
        v-model="empNo"
        clearable
        @input="searchInfo"
        maxlength="20"
      />
      <span class="search-row-label mr-8px ml-8px">工作：</span>
      <el-input
        type="text"
        placeholder="请输入"
        class="!w-160px"
        v-model="job"
        clearable
        @input="searchInfo"
        maxlength="20"
      />
      <span class="search-row-label mr-8px ml-8px">应用程序：</span>
      <el-select
        v-model="application"
        placeholder="请选择应用程序"
        @change="searchInfo"
        clearable
        class="!w-160px"
      >
        <el-option
          v-for="item in applicationsData"
          :key="item.application"
          :label="item.description"
          :value="item.application"
        />
      </el-select>
      <span class="search-row-label mr-8px ml-8px">姓名：</span>
      <el-input
        type="text"
        class="!w-160px"
        placeholder="请输入"
        v-model="name"
        clearable
        @input="searchInfo"
        maxlength="20"
      />
      <span class="search-row-label mr-8px ml-8px">账号：</span>
      <el-input
        type="text"
        class="!w-160px"
        placeholder="请输入"
        v-model="userName"
        clearable
        @input="searchInfo"
        maxlength="20"
      />
      <span class="search-row-label mr-8px ml-8px">所属部门：</span>
      <el-select
        v-model="deptCode"
        placeholder="请选择所属部门"
        @change="searchInfo"
        clearable
        filterable
        class="!w-160px"
      >
        <el-option
          v-for="item in deptsData"
          :key="item.deptCode"
          :label="item.deptName"
          :value="item.deptCode"
        />
      </el-select>
      <el-button class="ml-15px mr-8px creatBtn" @click="searchInfo"
        ><el-image class="buttonImage" :src="imgSearch" />查询</el-button
      >
      <el-button @click="resetInfo" class="ml-15px mr-8px creatBtn"
        ><Icon icon="ep:refresh" />清空</el-button
      >
    </div>
    <div class="wrapper-bottom p-12px">
      <el-table
        class="itemTable mt-8px"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="itemList"
        border
        style="width: 1280px; max-height: 100%; height: calc(100vh - 166px)"
        :span-method="spanMethod"
        ><el-table-column
          prop="empNo"
          label="人员编号"
          :resizable="false"
          align="center"
          width="120px"
          show-overflow-tooltip
          className="my-cell"
        />
        <el-table-column
          prop="name"
          label="姓名"
          :resizable="false"
          align="center"
          width="120px"
          show-overflow-tooltip
          className="my-cell"
        />
        <el-table-column
          prop="userName"
          label="账号"
          :resizable="false"
          align="center"
          width="120px"
          show-overflow-tooltip
          className="my-cell"
        />
        <el-table-column
          :resizable="false"
          v-for="(col, idx) in columnList"
          :index="idx"
          :key="col.prop"
          :label="col.label"
          :width="col.width"
          :prop="col.prop"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #default="scope">
            <span v-if="col.prop === 'application'" style="display: block; text-align: left">
              {{
                applicationsData.find((item) => item.application === scope.row.application)
                  ?.description
              }}
            </span>
            <span v-else-if="col.prop === 'deptCode'" style="display: block; text-align: left">
              {{ deptsData.find((item) => item.deptCode === scope.row.deptCode)?.deptName }}
            </span>
            <span v-else>
              {{ scope.row[col.prop] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="empNo"
          label="操作"
          align="center"
          fixed="right"
          width="120px"
          className="my-cell"
        >
          <template #default="scope">
            <el-button type="primary" class="delbutton" @click.stop="resetPassword(scope.row)">
              恢复口令
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts" name="staffInquiry">
import { ref, onMounted } from 'vue'
import imgSearch from '@/assets/nurse/search.svg'
import {
  queryStaffInfo,
  restorePassword,
  getDictByConfig
} from '@/api/system/publicDictionary/index'
const message = useMessage() // 消息弹窗
const empNo = ref('')
const job = ref('')
const application = ref('')
const name = ref('')
const userName = ref('')
const deptCode = ref('')
const itemList = ref<any>([])
const applicationsData = ref<any>([])
const deptsData = ref<any>([])
const columnList = [
  {
    prop: 'deptCode',
    label: '所属科室',
    resizable: false,
    align: 'center',
    width: '150px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'job',
    label: '工作',
    resizable: false,
    align: 'center',
    width: '120px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'title',
    label: '职称',
    resizable: false,
    align: 'center',
    width: '150px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'createDate',
    label: '创建日期',
    resizable: false,
    align: 'center',
    width: '180px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'application',
    label: '应用程序',
    resizable: false,
    align: 'center',
    width: '200px',
    'show-overflow-tooltip': true
  }
]
const searchInfo = async () => {
  itemList.value = await queryStaffInfo({
    deptCode: deptCode.value,
    application: application.value,
    name: name.value,
    empNo: empNo.value,
    job: job.value,
    userName: userName.value
  })
}

onMounted(async () => {
  applicationsData.value = await getDictByConfig({
    dictType: '应用程序字典',
    counts: 1000
  })
  deptsData.value = await getDictByConfig({
    dictType: '科室',
    counts: 1000
  })
  await searchInfo()
})
document.onkeydown = function (e) {
  if (e.key === 'Enter') {
    searchInfo()
  }
}
const resetInfo = () => {
  empNo.value = ''
  job.value = ''
  application.value = ''
  name.value = ''
  userName.value = ''
  deptCode.value = ''
  searchInfo()
}
const resetPassword = async (row) => {
  //恢复口令
  let content = '是否确认恢复用户【' + row.empNo + '】缺省密码？'
  await message.delConfirm(content)
  await restorePassword(row)
  message.notifySuccess('操作成功')
}
const spanMethod = ({ row, column, rowIndex }) => {
  //定义需要合并的列字段，有哪些列需要合并，就自定义添加字段即可
  const fields = ['empNo', 'name', 'userName']
  // 当前行的数据
  const cellValue = row[column.property]
  // 判断只合并定义字段的列数据
  if (cellValue && fields.includes(column.property)) {
    const prevRow = itemList.value[rowIndex - 1] //上一行数据
    let nextRow = itemList.value[rowIndex + 1] //下一行数据
    // 当上一行的数据等于当前行数据时，当前行单元格隐藏
    if (prevRow && prevRow[column.property] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      // 反之，则循环判断若下一行数据等于当前行数据，则当前行开始进行合并单元格
      let countRowspan = 1 //用于合并计数多少单元格
      while (nextRow && nextRow[column.property] === cellValue) {
        nextRow = itemList.value[++countRowspan + rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}
</script>
<style scoped>
.content-container {
  font-size: 14px;
  background-color: #fff;
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
}
.el-table {
  width: 100%;
}
.creatBtn {
  border: 1px solid #3473d1;
  color: #3473d1;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
}
.creatBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
}

.buttonImage {
  width: 15px;
  height: 15px;
  margin-right: 2px;
  position: relative;
  top: -1px;
}
.container-header {
  padding: 8px 10px;
  position: relative;
  display: flex;
  align-items: center;
}
.container-header::after {
  position: absolute;
  bottom: -5px;
  left: 0;
  content: '';
  width: 100%;
  height: 5px;
  background-color: #f5f7f9;
}
.delbutton {
  color: #3473d1 !important;
  border: none !important;
  background: #fff;
}
</style>
<style>
.el-table .my-cell {
  vertical-align: top;
}
</style>
