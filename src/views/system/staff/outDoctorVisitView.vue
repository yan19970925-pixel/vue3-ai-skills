<template>
  <div class="public-dict">
    <div class="public-dict-contain">
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="dictDatas"
        border
        style="width: 1390px; height: 100%"
        :span-method="spanMethod"
      >
        <el-table-column
          :resizable="false"
          label="科室"
          prop="clinicDeptName"
          width="200"
          className="my-cell"
        />
        <el-table-column :resizable="false" label="医生" prop="doctor" width="140" align="center" />
        <el-table-column
          :resizable="false"
          label="(1)星期一"
          prop="week1"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(2)星期二"
          prop="week2"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(3)星期三"
          prop="week3"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(4)星期四"
          prop="week4"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(5)星期五"
          prop="week5"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(6)星期六"
          prop="week6"
          width="150"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="(7)星期日"
          prop="week7"
          width="150"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { queryDoctorScheduleOverview } from '@/api/system/publicDictionary/index'
const dictDatas = ref<any>([])
onMounted(async () => {
  dictDatas.value = await queryDoctorScheduleOverview({})
})
const spanMethod = ({ row, column, rowIndex }) => {
  //定义需要合并的列字段，有哪些列需要合并，就自定义添加字段即可
  const fields = ['clinicDeptName']
  // 当前行的数据
  const cellValue = row[column.property]
  // 判断只合并定义字段的列数据
  if (cellValue && fields.includes(column.property)) {
    const prevRow = dictDatas.value[rowIndex - 1] //上一行数据
    let nextRow = dictDatas.value[rowIndex + 1] //下一行数据
    // 当上一行的数据等于当前行数据时，当前行单元格隐藏
    if (prevRow && prevRow[column.property] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      // 反之，则循环判断若下一行数据等于当前行数据，则当前行开始进行合并单元格
      let countRowspan = 1 //用于合并计数多少单元格
      while (nextRow && nextRow[column.property] === cellValue) {
        nextRow = dictDatas.value[++countRowspan + rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.public-dict {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  display: flex;
  .public-dict-contain {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 12px;
  }
}
</style>
<style>
.el-table .my-cell {
  vertical-align: top;
}
</style>
