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
          <el-table-column prop="peDeptName" label="科室名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="con1">
      <div class="heard_title">
        <span>常见疾病</span>
      </div>
      <div class="con1_table">
        <el-table
          :data="deptCommonDiseList"
          style="width: 100%"
          height="calc(100vh - 158px)"
          border
          @row-click="clickDeptCommonRow"
          highlight-current-row
          :row-class-name="setDeptCommonRowClassName"
        >
          <el-table-column prop="diageCode" label="诊断编码"></el-table-column>
          <el-table-column prop="diagName" label="诊断名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="con2">
      <el-button type="primary" icon="Back" @click="goLeft"></el-button>
      <el-button type="primary" icon="Right" @click="goRight"></el-button>
    </div>
    <div class="con3">
      <div class="heard_title">
        <span>分组对应的疾病</span>
      </div>
      <div class="con3_table">
        <el-table
          :data="peDiagList"
          style="width: 100%"
          height="calc(100vh - 158px)"
          border
          @row-click="clickPeDiagRow"
          highlight-current-row
          :row-class-name="setPeDiagRowClassName"
        >
          <el-table-column prop="diagCode" label="诊断编码"></el-table-column>
          <el-table-column prop="diagName" label="诊断名称"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dept_right">
      <div class="heard_title">
        <span>可选分组</span>
      </div>
      <div class="right_table">
        <el-table
          :data="diagGroupList"
          style="width: 100%"
          height="calc(100vh - 158px)"
          border
          @row-click="clickDiaGroupRow"
          highlight-current-row
          :row-class-name="setDiaGroupRowClassName"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Api from '@/api/Dictionary/commonDise/index'
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
//科室常见疾病list
const deptCommonDiseList = ref([])
// 点击左侧表格行事件
const clickRow = (row) => {
  rowInfo.value = row
  // Api.getPeDeptVSDiagGroupList({ peDeptName: row.peDeptName }).then((res) => {
  //   xuanzhongChecked.value = res
  // })
  Api.getPeDeptNormalDiagList({ peDeptName: row.peDeptName }).then((res) => {
    deptCommonDiseList.value = res
    // 使用示例
    peDiagList.value = filterDuplicateByDiagCode(peDiagList.value, deptCommonDiseList.value)
  })
}
const deptCommonRowInfo = ref({})
const clickDeptCommonRow = (row) => {
  deptCommonRowInfo.value = row
}
const setDeptCommonRowClassName = ({ row }) => {
  if (row.diageCode == deptCommonRowInfo.value.diageCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const diaGroupRowInfo = ref({})
const peDiagList = ref([])
const clickDiaGroupRow = (row) => {
  diaGroupRowInfo.value = row
  Api.getPeDiagList({ diagCode: '', diagGroup: row.name }).then((res) => {
    peDiagList.value = res
    // 使用示例
    peDiagList.value = filterDuplicateByDiagCode(peDiagList.value, deptCommonDiseList.value)
  })
}
const setDiaGroupRowClassName = ({ row }) => {
  if (row.name == diaGroupRowInfo.value.name) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const peDiagRowInfo = ref({})
const clickPeDiagRow = (row) => {
  peDiagRowInfo.value = row
}
const setPeDiagRowClassName = ({ row }) => {
  if (row.diagCode == peDiagRowInfo.value.diagCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const getDeptList = () => {
  Api.getPeDeptList().then((res) => {
    tableData.value = res
    clickRow(tableData.value[0])
  })
}
const goLeft = () => {
  if (peDiagRowInfo.value.diagCode) {
    let params = {
      peDeptName: rowInfo.value.peDeptName,
      diageCode: peDiagRowInfo.value.diagCode,
      diagName: peDiagRowInfo.value.diagName
    }
    Api.addPeDeptNormalDiag(params).then(() => {
      clickRow(rowInfo.value)
      clickDiaGroupRow(diaGroupRowInfo.value)
      deptCommonRowInfo.value = {}
      peDiagRowInfo.value = {}
    })
  } else {
    ElMessage.error('请选择右侧表格中的一行数据')
  }
}
const goRight = () => {
  if (deptCommonRowInfo.value.diageCode) {
    let params = {
      peDeptName: deptCommonRowInfo.value.peDeptName,
      diageCode: deptCommonRowInfo.value.diageCode,
      diagName: deptCommonRowInfo.value.diagName
    }
    Api.delPeDeptNormalDiag(params).then(() => {
      clickRow(rowInfo.value)
      clickDiaGroupRow(diaGroupRowInfo.value)
      deptCommonRowInfo.value = {}
      peDiagRowInfo.value = {}
    })
  } else {
    ElMessage.error('请选择左侧表格中的一行数据')
  }
}
/**
 * 过滤掉peDiagList中与deptCommonDiseList重复的项（基于diagCode比对）
 * @param peDiagList 主数组
 * @param deptCommonDiseList 参考数组
 * @returns 过滤后的新数组
 */
function filterDuplicateByDiagCode(
  peDiagList: Array<{ diagCode?: string }>,
  deptCommonDiseList: Array<{ diagCode?: string }>
) {
  // 提取参考数组中的所有diagCode
  const existingCodes = new Set(deptCommonDiseList.map((item) => item.diageCode))

  // 过滤主数组
  return peDiagList.filter((item) => {
    return !item.diagCode || !existingCodes.has(item.diagCode)
  })
}

onMounted(async () => {
  await getDeptList()
  Api.getPeDiagGroupList().then((res) => {
    if (res.length > 0) {
      res.forEach((item) => {
        diagGroupList.value.push({ name: item })
      })
      clickDiaGroupRow(diagGroupList.value[0])
    }
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
    width: 20%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .left_table {
      margin-top: 10px;
    }
  }
  .con1 {
    width: 28%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .con1_table {
      margin-top: 10px;
    }
  }
  .con2 {
    width: 4%;
    height: calc(100vh - 98px);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-button {
      margin: 10px 0;
    }
  }
  .con3 {
    width: 28%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .con3_table {
      margin-top: 10px;
    }
  }
  .dept_right {
    width: 20%;
    height: calc(100vh - 98px);
    background-color: #fff;
    padding: 0 10px;
    .right_table {
      margin-top: 10px;
    }
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
