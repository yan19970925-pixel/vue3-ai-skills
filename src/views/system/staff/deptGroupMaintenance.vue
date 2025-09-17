<template>
  <div class="doctorVisits">
    <div class="left">
      <div class="left_search">
        <span>组类名：</span>
        <el-select
          v-model="alternativeGroup"
          class="!w-180px"
          @change="getAccountingTeamList"
          filterable
        >
          <el-option
            v-for="item in alternativeGroupList"
            :key="item.groupClass"
            :label="item.groupClass"
            :value="item.groupClass"
          />
        </el-select>
        <span style="margin-left: 20px">组：</span>
        <el-select v-model="groupCode" class="!w-230px" @change="getTableList" filterable>
          <el-option
            v-for="item in accountingTeamList"
            :key="item.groupCode"
            :label="item.groupName + ' （ ' + item.groupCode + ' ） '"
            :value="item.groupCode"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 10px" @click="handleQuery"> 检索 </el-button>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 0 15px">
        <div style="width: 50%">
          <div
            style="
              font-size: 14px;
              margin-top: 8px;
              width: 53.5%;
              display: inline-block;
              margin-bottom: 6px;
            "
            >已有成员</div
          >
          <div style="font-size: 14px; margin-top: 8px; display: inline-block; margin-bottom: 6px">
            <span>候选成员</span>
            <span style="margin-left: 50px">科室过滤：</span>
            <el-input v-model="deptName" placeholder="" disabled class="!w-180px" />
          </div>
          <div class="con" style="margin-top: 0">
            <el-table
              ref="zufenpeiL"
              :data="existingMembersList"
              style="width: 100%"
              height="calc(100vh - 200px)"
              highlight-current-row
              @row-click="handleCurrentChange"
            >
              <!-- @selection-change="handleSelectionChangeL" -->
              <!-- <el-table-column type="selection" width="35" /> -->
              <el-table-column label="姓名" width="150" show-overflow-tooltip align="center">
                <template #default="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="empNo" label="编号" show-overflow-tooltip align="center" />
              <el-table-column
                prop="deptName"
                label="科室"
                width="200"
                show-overflow-tooltip
                align="center"
              />
            </el-table>
            <div>
              <el-button
                type="primary"
                :icon="ArrowLeft"
                @click="toLeft"
                style="margin: 8px 8px; display: block"
                :disabled="zufenpeiRight.length == 0"
              ></el-button>
              <el-button
                type="primary"
                :icon="ArrowRight"
                @click="toRight"
                style="margin: 8px 8px; display: block"
                :disabled="!currentRow"
              ></el-button>
            </div>
            <el-table
              ref="zufenpeiR"
              :data="candidateMembersList"
              style="width: 100%"
              height="calc(100vh - 200px)"
              @selection-change="handleSelectionChangeR"
            >
              <el-table-column type="selection" width="35" />
              <el-table-column label="姓名" show-overflow-tooltip align="center">
                <template #default="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                prop="empNo"
                label="编号"
                width="160"
                show-overflow-tooltip
                align="center"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import {
  queryExistStaffVsGroup,
  queryCandidateStaffVsGroup,
  queryDictByConfig,
  saveStaffVsGroup,
  deleteStaffVsGroup
} from '@/api/system/staff/index'
const alternativeGroupList = ref([])
const alternativeGroup = ref('')
const accountingTeamList = ref([])
const groupCode = ref('')
const existingMembersList = ref([])
const currentRow = ref({})
const deptName = ref('')
const deptCode = ref('')
const candidateMembersList = ref([])

const deptList = ref([{ value: '1', label: '测试' }])
const tableData = ref([
  { id: 1, date: '2016-05-03', name: 'Tom1' },
  { id: 2, date: '2016-05-02', name: 'Tom2' },
  { id: 3, date: '2016-05-03', name: 'Tom3' },
  { id: 4, date: '2016-05-02', name: 'Tom4' },
  { id: 5, date: '2016-05-03', name: 'Tom5' },
  { id: 6, date: '2016-05-02', name: 'Tom6' },
  { id: 7, date: '2016-05-03', name: 'Tom7' },
  { id: 8, date: '2016-05-02', name: 'Tom8' }
])
const tableData1 = ref([])
const zufenpeiL = ref()
const zufenpeiR = ref()
const zufenpeiLeft = ref([])
const zufenpeiRight = ref([])
//查询按钮
const handleQuery = () => {
  getTableList()
}
const handleSelectionChangeL = (val) => {
  zufenpeiLeft.value = val
}
const handleSelectionChangeR = (val) => {
  zufenpeiRight.value = val
}
const toRight = async () => {
  if (currentRow.value) {
    let params = [
      {
        groupClass: currentRow.value.groupClass,
        groupCode: currentRow.value.groupCode,
        empNo: currentRow.value.empNo
      }
    ]
    await deleteStaffVsGroup(params)
    // await saveStaffVsGroup(params)
    await getCandidateMembers(currentRow.value)
    await getTableList('change')
  }
}
const toLeft = async () => {
  if (zufenpeiRight.value.length > 0) {
    let params = []
    zufenpeiRight.value.forEach((item) => {
      params.push({
        groupClass: alternativeGroup.value,
        groupCode: groupCode.value,
        empNo: item.empNo,
        deptCode: deptCode.value
      })
    })
    await saveStaffVsGroup(params)
    await getCandidateMembers(params[0])
    await getTableList('change')
  }
}
const getAccountingTeamList = async (str) => {
  let params = {
    keyWord: '',
    dictType: '核算组',
    cons: ''
  }

  if (alternativeGroup.value) {
    params.cons = `group_class:${alternativeGroup.value}`
  } else {
    params.cons = ''
  }
  accountingTeamList.value = await queryDictByConfig(params)
  currentRow.value = {}
  if (str != 'change') {
    candidateMembersList.value = []
    deptCode.value = ''
    deptName.value = ''
  }
  if (accountingTeamList.value.length > 0) {
    groupCode.value = accountingTeamList.value[0].groupCode
    await getTableList()
  }
}
const getTableList = async (str) => {
  let params = {
    groupClass: alternativeGroup.value,
    groupCode: groupCode.value
  }
  existingMembersList.value = await queryExistStaffVsGroup(params)
  currentRow.value = {}
  if (str != 'change') {
    candidateMembersList.value = []
    deptCode.value = ''
    deptName.value = ''
  }
}
const handleCurrentChange = (row) => {
  currentRow.value = row
  deptName.value = row.deptName
  deptCode.value = row.deptCode
  getCandidateMembers(row)
}
const getCandidateMembers = (row) => {
  let params = {
    groupClass: row.groupClass,
    groupCode: row.groupCode,
    deptCode: row.deptCode
  }
  queryCandidateStaffVsGroup(params).then((res) => {
    candidateMembersList.value = res
  })
}
onMounted(async () => {
  alternativeGroupList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '工作组类字典',
    cons: ''
  })
  alternativeGroup.value = alternativeGroupList.value[0].groupClass
  await getAccountingTeamList()
  groupCode.value = accountingTeamList.value[0].groupCode
  await getTableList()
})
</script>
<style scoped>
.doctorVisits {
  height: calc(100vh - 54px);
  padding-top: 44px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 100%;
    .left_search {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 8px;
      span {
        margin-left: 7px;
        font-size: 14px;
        font-family: '思源黑体 CN', 微软雅黑, Arial;
      }
    }
  }
  .title {
    width: 106px;
    text-align: center;
    background-color: #234fd8;
    color: #fff;
    padding: 0 20px;
    margin-left: 10px;
  }
  .con {
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
      width: 100px;
      text-align: right;
      font-size: 14px;
      display: inline-block;
    }
    .el-input {
      width: 120px;
    }
  }
}
</style>
