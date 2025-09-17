<template>
  <div class="deptDisGroup">
    <div class="dept_left">
      <div class="heard_title">
        <span>体检科室</span>
      </div>
      <div class="left_table">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100vh - 158px)"
          border
          @row-click="clickRow"
          highlight-current-row
          :row-class-name="setRowClassName"
        >
          <el-table-column prop="peDeptCode" label="科室编号" width="160"></el-table-column>
          <el-table-column prop="peDeptName" label="科室名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dept_right">
      <div class="heard_title">
        <span>体检科室</span>
      </div>
      <div class="right_box">
        <div class="div" v-for="(item, index) in diagGroupList" :key="index">
          <el-checkbox-group v-model="xuanzhongChecked" @change="xuanzhongHandleItem(item)">
            <el-checkbox :label="item">
              <span>{{ item }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div style="width: 100%; text-align: center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/systemSetting/deptDisGroup/index'
const setRowClassName = ({ row }) => {
  if (row.peDeptCode == rowInfo.value.peDeptCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const tableData = ref([])
const rowInfo = ref({})
const xuanzhongChecked = ref([])
const diagGroupList = ref([])
const clickRow = (row) => {
  rowInfo.value = row
  Api.getPeDeptVSDiagGroupList({ peDeptName: row.peDeptName }).then((res) => {
    xuanzhongChecked.value = res
  })
}
const xuanzhongHandleItem = (item) => {
  console.log('11111', item)
  console.log('2222', xuanzhongChecked.value)
}
const getDeptList = () => {
  Api.getPeDeptList().then((res) => {
    tableData.value = res
    clickRow(tableData.value[0])
  })
}
// 保存
const save = () => {
  Api.savePeDeptVSDiagGroup({
    peDeptName: rowInfo.value.peDeptName,
    list: xuanzhongChecked.value
  }).then((res) => {
    ElMessage({
      type: 'success',
      message: '保存成功!'
    })
  })
}
onMounted(async () => {
  await getDeptList()
  Api.getPeDiagGroupList().then((res) => {
    diagGroupList.value = res
    diagGroupList.value.push('其他')
  })
})
</script>

<style lang="scss" scoped>
.deptDisGroup {
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
  .dept_left {
    width: 39.8%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .left_table {
      margin-top: 10px;
    }
  }
  .dept_right {
    width: 59.8%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .right_box {
      height: calc(100vh - 500px);
      margin-top: 10px;
      display: flex;
      /* flex-direction: column; */
      flex-wrap: wrap;
      gap: 9px;
      column-gap: 19px;
      align-content: flex-start;
      div {
        width: 100px;
        height: 40px;
        line-height: 40px;
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
</style>
