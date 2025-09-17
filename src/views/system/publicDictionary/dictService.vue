<template>
  <div class="public-dict">
    <div class="public-dict-left">
      <div class="tree-contain">
        <el-tree
          :data="treeData"
          highlight-current
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="defaultKeyArr"
          ref="treeRef"
          style="height: 100%; overflow-y: auto; color: #333"
          @node-click="treeClick"
        >
          <template #default="{ data }">
            <div
              >{{ data.name
              }}<span v-if="data.tableName" style="font-size: 13px !important; color: #666"
                >({{ data.tableName }})</span
              ></div
            >
          </template></el-tree
        ></div
      >
    </div>
    <div class="public-dict-right">
      <div style="height: calc(100% - 240px)">
        <el-table
          class="itemTable"
          :header-cell-style="{
            background: '#f7f8fcff',
            color: '#000',
            fontWeight: 'normal'
          }"
          :data="dictDatas"
          @row-click="rowclick"
          highlight-current-row
          :row-class-name="tableRowClassName"
          @sort-change="handleSortChange"
          border
          style="width: 100%; height: 100%"
        >
          <el-table-column
            v-for="(item, index) in tableColumns"
            :key="index"
            :prop="item.dataCol"
            :label="item.dataTitle"
            width="150px"
            sortable="custom"
          >
            <template #default="scope">
              <el-input
                size="small"
                v-model="scope.row[item.dataCol]"
                @change="changeDataCol(scope.row, scope.$index)"
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140" v-if="dictDatas.length > 0">
            <template #default="scope">
              <el-button type="text" @click="insertRow(scope.$index)">插入</el-button>
              <el-button type="text" @click="copyRow(scope.row, scope.$index)">复制</el-button>
              <el-button
                type="text"
                style="color: rgb(243, 61, 33)"
                @click="deleteRow(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table></div
      >
      <div class="mesc"
        ><el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 21, 30, 40]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      /></div>
      <div class="mt-12px" v-show="currentTreeId && currentTreeTableName">
        <span>字典对应视图名称：</span>
        <el-select
          style="width: calc(100% - 130px)"
          v-model="dictViewsCurrentSelect"
          multiple
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in dictViewsSelectDatas"
            :key="item.dictType"
            :label="item.dictType"
            :value="item.dictType"
          >
          </el-option>
        </el-select>
      </div>
      <div class="footer flex mt-15px" v-show="currentTreeId && currentTreeTableName">
        <!-- <el-button type="primary" class="createTreat" @click.stop="">一键生成</el-button> -->
        <el-button type="primary" class="createTreat" @click.stop="searchInfo()">查询</el-button>
        <el-button type="primary" class="createTreat" @click.stop="addRow()">添加</el-button>
        <el-button type="primary" class="createTreat" @click.stop="saveData()">保存</el-button>
        <el-upload
          class="avatar-uploader ml-12px mr-12px flex"
          action="#"
          :show-file-list="false"
          :http-request="httpRequest"
          :before-upload="beforeFileUpload"
        >
          <el-button type="primary" class="createTreat">导入</el-button>
        </el-upload>
        <el-button type="primary" class="createTreat" @click.stop="exportDiag()"
          >导出Excel</el-button
        >
        <!-- <el-button type="primary" class="createTreat" @click.stop="">输入法</el-button> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import {
  insertFimsDictonary,
  getFimsDictionaryList,
  getFimsDictionaryInfo,
  deleteDictionary,
  exportDictionary,
  uploadFileApi,
  importDictionary,
  getDictViewsSelect,
  getDictViews
} from '@/api/system/publicDictionary/index'
import download from '@/utils/download'
import type { UploadProps } from 'element-plus'
const treeData = ref<any>([])
const message = useMessage() // 消息弹窗
const tableColumns = ref<any>([])
const dictDatas = ref<any>([])
const curRow = ref<any>({})
const currentRowIndex = ref('')
const currentTreeId = ref('')
const currentTreeTableName = ref('')
const currentTreeName = ref('')
const defaultKeyArr = ref<any>([])
const dictInitDatas = ref<any>([])
const editList = ref<any>([])
const dictViewsSelectDatas = ref<any>([])
const dictViewsCurrentSelect = ref<any>([])
const {
  proxy: { $forceUpdate }
}: any = getCurrentInstance()
const defaultProps = {
  children: 'fimsMaintenanceDicVos',
  label: 'name'
}
onMounted(async () => {
  onInitPage()
  dictViewsSelectDatas.value = await getDictViewsSelect({})
})
const pagination = reactive({
  currentPage: 1,
  pageSize: 40,
  total: 0
})
const getTreeData = async () => {
  defaultKeyArr.value = []
  currentTreeId.value = ''
  currentTreeTableName.value = ''
  currentTreeName.value = ''
  dictInitDatas.value = []
  dictDatas.value = []
  treeData.value = await getFimsDictionaryList({})
  if (currentTreeId.value) {
    defaultKeyArr.value.push(currentTreeId.value)
  }
}
const handleSizeChange = (val: number) => {
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
const getTreeDetailData = async (row) => {
  tableColumns.value = []
  dictDatas.value = []
  dictInitDatas.value = []
  editList.value = []
  dictViewsCurrentSelect.value = []
  let res = await getFimsDictionaryInfo({
    id: row.id,
    tableName: row.tableName,
    pageNum: pagination.currentPage,
    pageSize: pagination.pageSize
  })
  dictInitDatas.value = res.list
  if (res.list.length > 0 && res.list[0].fimsDataSheetVos.length > 0) {
    res.list[0].fimsDataSheetVos.forEach((item) => {
      tableColumns.value.push({
        dataCol: item.columnName,
        dataTitle: item.chineseName
      })
    })
  } else {
    pagination.total = 0
  }
  res.list.forEach((item) => {
    item.isInsert = '0'
    item.fimsDataSheetVos.forEach((item2) => {
      item[item2.columnName] = item2.columnValue
    })
  })
  dictDatas.value = res.list
  pagination.total = res.total
  getItemNo(dictDatas.value)
  dictViewsCurrentSelect.value = []
  getDictViews({
    id: row.id,
    tableName: row.tableName
  }).then(async (res) => {
    if (res && res.length > 0) {
      res.forEach((item) => {
        dictViewsCurrentSelect.value.push(item.dictType)
      })
    }
  })
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
const rowclick = async (row: any) => {
  curRow.value = row
  currentRowIndex.value = String(row.row_index)
}
const searchInfo = async () => {
  if (currentTreeId.value && currentTreeName.value) {
    getTreeDetailData({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      name: currentTreeName.value
    })
  }
}
const addRow = async () => {
  if (currentTreeTableName.value && currentTreeId.value) {
    let obj = {}
    tableColumns.value.forEach((item) => {
      obj[item.dataCol] = ''
    })
    obj.isInsert = '1'
    obj.tmpId = Date.now().toString()
    dictDatas.value.push(obj)
    getItemNo(dictDatas.value)
    changeRow(obj)
  }
}
const insertRow = async (index: number) => {
  let obj = {}
  tableColumns.value.forEach((item) => {
    obj[item.dataCol] = ''
  })
  obj.isInsert = '1'
  obj.tmpId = Date.now().toString()
  dictDatas.value.splice(index, 0, obj)
  getItemNo(dictDatas.value)
  changeRow(obj)
  $forceUpdate()
}
const deleteRow = async (row, index: number) => {
  if (row.isInsert == '1') {
    dictDatas.value.splice(index, 1)
    getItemNo(dictDatas.value)
  } else if (row.isInsert == '0') {
    let obj = row
    obj.fimsDataSheetVos.forEach((item2) => {
      item2.columnValue = obj[item2.columnName]
    })
    let arrNew = ref<any>([])
    arrNew.value = []
    arrNew.value.push(obj)
    await deleteDictionary({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      fimsDictionaryInfoVos: arrNew.value
    })
    // message.notifySuccess('删除成功')
    dictDatas.value.splice(index, 1)
    getItemNo(dictDatas.value)
  }
  const ezIndex = editList.value.findIndex(
    (v) => v.itemNo === row!.itemNo || (v.tmpId && v.tmpId === row!.tmpId)
  )
  editList.value.splice(ezIndex, 1)
}
const saveData = async () => {
  editList.value = editList.value.filter(
    (item) => item.fimsDataSheetVos && item.fimsDataSheetVos.length > 0
  )
  if (
    (currentTreeTableName.value && editList.value.length > 0) ||
    dictViewsCurrentSelect.value.length > 0 ||
    dictViewsCurrentSelect.value.length == 0
  ) {
    editList.value.forEach((item) => {
      item.fimsDataSheetVos.forEach((item2) => {
        item2.columnValue = ''
        item2.columnValue = item[item2.columnName]
      })
    })
    const inputSettingDOS = ref<any>([])
    inputSettingDOS.value = []
    if (dictViewsCurrentSelect.value.length) {
      dictViewsCurrentSelect.value.forEach((item) => {
        inputSettingDOS.value.push({
          dictType: item,
          dataCol: null,
          dataTable: null,
          dataTitle: null,
          flagIsname: null,
          flagShow: null,
          inputCode: null,
          resultSort: null,
          showSort: null,
          showWidth: null,
          sortFlag: null
        })
      })
    }
    await insertFimsDictonary({
      tableName: currentTreeTableName.value,
      id: currentTreeId.value,
      inputSettingDOS: inputSettingDOS.value,
      fimsDictionaryInfoVos: editList.value
    })
    editList.value = []
    dictViewsCurrentSelect.value = []
    message.notifySuccess('保存成功')
    getTreeDetailData({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      name: currentTreeName.value
    })
  }
}
const copyRow = async (row, index: number) => {
  let newItem = JSON.parse(JSON.stringify(row))
  newItem.isInsert = '1'
  newItem.tmpId = Date.now().toString()
  dictDatas.value.splice(index + 1, 0, newItem)
  getItemNo(dictDatas.value)
  changeRow(newItem)
  $forceUpdate()
}
const exportDiag = async () => {
  if (
    (currentTreeTableName.value && editList.value.length > 0) ||
    dictViewsCurrentSelect.value.length > 0
  ) {
    dictDatas.value = dictDatas.value.filter(
      (item) => item.fimsDataSheetVos && item.fimsDataSheetVos.length > 0
    )
    dictDatas.value.forEach((item) => {
      item.fimsDataSheetVos.forEach((item2) => {
        item2.columnValue = ''
        item2.columnValue = item[item2.columnName]
      })
    })
    const inputSettingDOS = ref<any>([])
    inputSettingDOS.value = []
    dictViewsCurrentSelect.value.forEach((item) => {
      inputSettingDOS.value.push({
        dictType: item,
        dataCol: null,
        dataTable: null,
        dataTitle: null,
        flagIsname: null,
        flagShow: null,
        inputCode: null,
        resultSort: null,
        showSort: null,
        showWidth: null,
        sortFlag: null
      })
    })
    await insertFimsDictonary({
      tableName: currentTreeTableName.value,
      id: currentTreeId.value,
      inputSettingDOS: inputSettingDOS.value,
      fimsDictionaryInfoVos: dictDatas.value
    })
    editList.value = []
    dictViewsCurrentSelect.value = []
    let arr = await getFimsDictionaryInfo({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    dictInitDatas.value = arr.list
    pagination.total = arr.total
  }
  if (currentTreeTableName.value && dictDatas.value.length > 0) {
    const data = await exportDictionary({
      tableName: currentTreeTableName.value,
      id: currentTreeId.value,
      fimsDictionaryInfoVos: dictInitDatas.value
    })
    download.excel(data, currentTreeName.value + '.xlsx')
  }
}
// 添加表格行下标
const tableRowClassName: any = ({ row, rowIndex }) => {
  row.row_index = rowIndex
}
const changeRow = (row) => {
  if (
    row &&
    !editList.value.find(
      (item) => item.itemNo === row!.itemNo || (item.tmpId && item.tmpId === row!.tmpId)
    )
  ) {
    editList.value.push(row)
  }
}
const getItemNo = async (arr) => {
  arr.forEach((item, index) => {
    item.itemNo = index + 1
    item.row_index = index
  })
  return arr
}
const changeDataCol = (row, index: number) => {
  let obj = JSON.parse(JSON.stringify(row))
  if (!obj.fimsDataSheetVos || obj.fimsDataSheetVos.length == 0) {
    obj.fimsDataSheetVos = []
    let zIndex = JSON.parse(
      JSON.stringify(
        dictDatas.value.findIndex(
          (item) => item.fimsDataSheetVos && item.fimsDataSheetVos.length > 0
        )
      )
    )
    if (zIndex > -1) {
      obj.fimsDataSheetVos = dictDatas.value[zIndex].fimsDataSheetVos
    }
  }
  obj.fimsDataSheetVos.forEach((item2) => {
    item2.columnValue = ''
    item2.columnValue = obj[item2.columnName]
  })
  dictDatas.value[index].fimsDataSheetVos = obj.fimsDataSheetVos
  changeRow(row)
}
const fileUrl = ref('')
const beforeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!rawFile.name.includes('xlsx') && !rawFile.name.includes('xls')) {
    ElMessage.error('文件格式不对')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('文件大小不能超过2M')
    return false
  }
  return true
}
const httpRequest = async (file) => {
  await uploadFileApi({ file: file.file }).then((res) => {
    if (res.code == 0) {
      fileUrl.value = res.data
      importFileApi()
    }
  })
}
const importFileApi = async () => {
  if (fileUrl.value) {
    await importDictionary({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      fileUrl: fileUrl.value
    })
    message.notifySuccess('导入成功')
    getTreeDetailData({
      id: currentTreeId.value,
      tableName: currentTreeTableName.value,
      name: currentTreeName.value
    })
  }
}
const handleSortChange = ({ column, prop, order }) => {
  dictDatas.value.sort((a, b) => {
    if (order === 'ascending') {
      return a[prop].localeCompare(b[prop])
    } else {
      return b[prop].localeCompare(a[prop])
    }
  })
}
</script>
<style scoped lang="scss">
.public-dict {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  display: flex;
  font-size: 14px;
  color: #333;
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
.mesc {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin-top: 10px;
  background: #f5f7f9;
  display: flex;
  span:nth-child(1) {
    width: 500px;
  }
  span:nth-child(2) {
    color: #3473d1;
    width: 100px;
    background: #fff;
    text-align: center;
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
