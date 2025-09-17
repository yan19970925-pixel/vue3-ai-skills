<template>
  <div class="public-dict">
    <div class="public-dict-left">
      <div class="tree-contain">
        <el-tree
          :data="treeData"
          highlight-current
          :props="defaultProps"
          ref="treeRef"
          style="height: 100%; overflow-y: auto; color: #333"
          @node-click="treeClick"
      /></div>
    </div>
    <div class="public-dict-right">
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="dictDatas"
        border
        style="width: 100%; height: calc(100% - 100px)"
      >
        <el-table-column
          v-for="item in tableColumns"
          :key="item.dataCol"
          :prop="item.dataCol"
          :label="item.dataTitle"
          width="150px"
        />
      </el-table>
      <div class="footer flex mt-15px">
        <el-button type="primary" class="createTreat mr-400px" @click.stop="exportDiag()"
          >导出</el-button
        >
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 21, 30, 40]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  getFimsDictionaryCheckList,
  getFimsDictionaryCheckInfo,
  exportDictionary
} from '@/api/system/publicDictionary/index'
import download from '@/utils/download'
const treeData = ref<any>([])
const tableColumns = ref<any>([])
const dictDatas = ref<any>([])
const dictInitDatas = ref<any>([])
const currentTreeId = ref('')
const currentTreeTableName = ref('')
const currentTreeName = ref('')
const defaultProps = {
  children: 'fimsMaintenanceDicVos',
  label: 'name'
}
const pagination = reactive({
  currentPage: 1,
  pageSize: 40,
  total: 0
})
onMounted(() => {
  onInitPage()
})
const getTreeData = async () => {
  treeData.value = await getFimsDictionaryCheckList({})
}
const getTreeDetailData = async (row) => {
  tableColumns.value = []
  dictDatas.value = []
  dictInitDatas.value = []
  let res = await getFimsDictionaryCheckInfo({
    id: row.id,
    tableName: row.tableName,
    pageNum: pagination.currentPage,
    pageSize: pagination.pageSize
  })
  dictInitDatas.value = res.list
  pagination.total = res.total
  if (res.list.length > 0 && res.list[0].fimsDataSheetVos.length > 0) {
    res.list[0].fimsDataSheetVos.forEach((item) => {
      tableColumns.value.push({
        dataCol: item.columnName,
        dataTitle: item.chineseName ? item.chineseName : item.columnName
      })
    })
  } else {
    pagination.total = 0
    tableColumns.value = []
  }
  res.list.forEach((item) => {
    item.fimsDataSheetVos.forEach((item2) => {
      item[item2.columnName] = item2.columnValue
    })
  })
  console.log(tableColumns.value, '33333')
  dictDatas.value = res.list
}
const onInitPage = () => {
  getTreeData()
}
const treeClick = async (data) => {
  if (!data.tableName) return
  currentTreeId.value = data.id
  currentTreeTableName.value = data.tableName
  currentTreeName.value = data.name
  getTreeDetailData(data)
}
const handleSizeChange = (val: number) => {
  pagination.currentPage = 1
  pagination.pageSize = val
  getTreeDetailData({
    id: currentTreeId.value,
    tableName: currentTreeTableName.value,
    name: currentTreeName.value
  })
}

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  getTreeDetailData({
    id: currentTreeId.value,
    tableName: currentTreeTableName.value,
    name: currentTreeName.value
  })
}
const exportDiag = async () => {
  if (dictInitDatas.value.length > 0) {
    const data = await exportDictionary({
      tableName: currentTreeTableName.value,
      id: currentTreeId.value,
      fimsDictionaryInfoVos: dictInitDatas.value
    })
    download.excel(data, currentTreeName.value + '.xlsx')
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
  .public-dict-left {
    width: 490px;
    height: 100%;
    background: #fff;
    padding: 12px;
    .tree-contain {
      height: 100%;
    }
  }
  .public-dict-right {
    width: calc(100% - 504px);
    height: 100%;
    background: #fff;
    margin-left: 6px;
    padding: 12px;
  }
}
.createTreat {
  color: #3473d1;
  border: 1px solid #3473d1;
  background: #fff;
}
</style>
<style>
.itemTable.el-table th .cell {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 150px; /* 你可以根据需要设置最大宽度 */
  line-height: 20px; /* 行高，根据你的表格行高调整 */
  padding: 0 10px; /* 单元格内边距，根据需要调整 */
  box-sizing: border-box; /* 确保宽度包含内边距 */
  display: block; /* 使得宽度可被考虑 */
  text-align: center; /* 文本居中 */
}
</style>
