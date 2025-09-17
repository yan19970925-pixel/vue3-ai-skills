<template>
  <div class="method">
    <div class="method-left">
      <div class="mb-10px"
        ><el-input
          v-model="searchTable"
          @input="getTableList()"
          placeholder="请输入关键字检索"
          maxlength="20"
          type="text"
          clearable
      /></div>
      <el-table
        :data="tableData"
        @row-click="personalClick"
        highlight-current-row
        :row-class-name="setRowClassName"
        style="width: 100%; height: calc(100vh - 154px)"
        ref="tableRef"
        border
      >
        <el-table-column prop="dictType" label="字典类型">
          <template #default="scope">
            <el-input
              v-model="scope.row.dictType"
              @change="changeTableDict(scope.row)"
              v-if="scope.row.isInput"
            />
          </template>
        </el-table-column>
        <el-table-column prop="dataTable" label="表/视图" show-overflow-tooltip>
          <template #default="scope">
            <el-input
              v-model="scope.row.dataTable"
              @change="changeTableDict(scope.row)"
              @input="inputChange"
              v-if="scope.row.isInput"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="method-right">
      <el-table
        :data="tableDataDetail"
        stripe
        highlight-current-row
        style="width: 100%; height: calc(100vh - 160px)"
        border
      >
        <el-table-column prop="dataCol" label="字段" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-select
              v-model="scope.row.dataCol"
              @change="changeDictTypeId(scope.row)"
              size="small"
              placeholder=""
              clearable
            >
              <el-option
                v-for="(i, j) in optionDictData"
                :label="i.comments"
                :value="i.columnName"
                :key="j"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="inputCode" label="输入码类型" align="center">
          <template #default="scope">
            <el-select
              v-model="scope.row.inputCode"
              @change="changeRow(scope.row)"
              placeholder=""
              size="small"
              clearable
            >
              <el-option
                v-for="(i, j) in optionData"
                :label="i.inputName"
                :value="i.inputCode"
                :key="j"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="dataTitle" label="标题" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.dataTitle"
              @change="changeRow(scope.row)"
              maxlength="10"
              size="small"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="flagShow" label="是否显示" align="center" width="140">
          <template #default="scope">
            <el-radio-group v-model="scope.row.flagShow" @change="changeRow(scope.row)">
              <el-radio label="Y" size="small">是</el-radio>
              <el-radio label="N" size="small">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="showSort" width="110px" label="显示顺序" align="center">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.showSort"
              :min="1"
              size="small"
              @change="changeRow(scope.row)"
              controls-position="right"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="flagIsname" label="是否名称字段" align="center" width="140">
          <template #default="scope">
            <el-radio-group v-model="scope.row.flagIsname" @change="changeRow(scope.row)">
              <el-radio label="Y" size="small">是</el-radio>
              <el-radio label="N" size="small">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="resultSort" label="结果顺序位" align="center" width="110">
          <template #default="scope">
            <el-select
              v-model="scope.row.resultSort"
              @change="changeRow(scope.row)"
              placeholder=""
              size="small"
              clearable
            >
              <el-option label="0" value="0" />
              <el-option label="1" value="1" />
              <el-option label="2" value="2" />
              <el-option label="3" value="3" />
              <el-option label="4" value="4" />
              <el-option label="5" value="5" />
              <el-option label="6" value="6" />
              <el-option label="7" value="7" />
              <el-option label="8" value="8" />
              <el-option label="9" value="9" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="showWidth" label="显示宽度" align="center" width="110">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.showWidth"
              :min="1"
              :max="9999"
              size="small"
              @change="changeRow(scope.row)"
              :controls="false"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="dictType" label="字典类型" align="center" />
        <el-table-column prop="dataTable" label="表/视图" align="center" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="70">
          <template #default="scope">
            <el-button
              type="text"
              style="color: rgb(243, 61, 33)"
              @click="deleFieid(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="footer flex mt-15px">
        <el-upload
          class="avatar-uploader ml-12px mr-12px flex"
          action="#"
          :show-file-list="false"
          :http-request="httpRequest"
          :before-upload="beforeFileUpload"
        >
          <el-button type="primary" class="createTreat">导入</el-button>
        </el-upload>
        <el-button type="primary" class="createTreat" @click.stop="outBound">导出</el-button>
        <el-button type="primary" class="createTreat" @click.stop="addDict">添加字典</el-button>
        <el-button type="primary" class="createTreat" @click.stop="addFieid">添加字段</el-button>
        <!-- <el-button type="primary" class="createTreat" @click.stop="deleFieid">删除字段</el-button> -->
        <el-button type="primary" class="createTreat" @click.stop="" @click="confirm"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="method">
import { ref } from 'vue'
import { ElTable, ElMessageBox } from 'element-plus'
import download from '@/utils/download'
import type { UploadProps } from 'element-plus'
import {
  getInputType,
  getInputSettingGroupByName,
  getInputSettingByDataTable,
  operationData,
  deleteInputSetting,
  getDbaColCommentsByDataTable,
  exportInputSettingByDataTable,
  importSeting
} from '@/api/system/platformManger/index'
import { uploadFileApi } from '@/api/system/publicDictionary/index'
const message = useMessage() // 消息弹窗
const tableData = ref<any>([])
const currentTableType = ref('')
const currentDictType = ref('')
const currentDataTable = ref('')
const searchTable = ref('')
const tableDataDetail = ref<any>([])
const optionData = ref<any>([])
const dictDtailObj = ref<any>({}) //选中的字典
const isAddDict = ref(false) //判断是否点击了添加字典

//查询全部字典
const getTableList = () => {
  isAddDict.value = false
  getInputSettingGroupByName({ searchTable: searchTable.value }).then((res) => {
    if (res) {
      tableData.value = res
      if (tableData.value && tableData.value.length > 0) {
        tableData.value.forEach((item) => {
          item.isInput = false
        })
        currentTableType.value = getCardId(
          tableData.value[0].dictType,
          tableData.value[0].dataTable
        )
        currentDictType.value = tableData.value[0].dictType
        currentDataTable.value = tableData.value[0].dataTable
        Object.assign(dictDtailObj.value, tableData.value[0])
        getInputSettingByDataTable(tableData.value[0]).then((res) => {
          tableDataDetail.value = res
          if (tableDataDetail.value && tableDataDetail.value.length > 0) {
            tableDataDetail.value.forEach((item) => {
              item.isInsert = '0'
            })
            getItemNo(tableDataDetail.value)
          }
        })
      }
    }
  })
}

//点击某一行 查询字典表信息根据字典表名
const personalClick = (row, column, event) => {
  isAddDict.value = false
  addFieidData.value = []
  currentTableType.value = getCardId(row.dictType, row.dataTable)
  currentDictType.value = row.dictType
  currentDataTable.value = row.dataTable
  if (event.target?.tagName.toLowerCase() === 'input') {
    dictDtailObj.value = {}
    isAddDict.value = true
    // 如果是 input，则阻止事件进一步传播
    event.stopPropagation()
    return
  }
  Object.assign(dictDtailObj.value, row)
  getInputSettingByDataTable(row).then((res) => {
    tableDataDetail.value = res
    if (tableDataDetail.value && tableDataDetail.value.length > 0) {
      tableDataDetail.value.forEach((item) => {
        item.isInsert = '0'
      })
    }
  })
  inputChange(dictDtailObj.value.dataTable)
}

//
const optionDictData = ref<any>([])
const inputChange = (e) => {
  let obj = {
    tableName: e.replaceAll(' ', '')
  }
  getDbaColCommentsByDataTable(obj).then((res) => {
    optionDictData.value = res
  })
}
const changeTableDict = (row) => {
  dictDtailObj.value.dictType = row.dictType
  dictDtailObj.value.dataTable = row.dataTable
  currentTableType.value = getCardId(row.dictType, row.dataTable)
  currentDictType.value = row.dictType
  currentDataTable.value = row.dataTable
}
//增加字典
const addDict = () => {
  if (tableData.value[tableData.value.length - 1].isInput) {
    message.notifyWarning('已添加字典，请输入')
    return
  }
  isAddDict.value = true
  tableDataDetail.value = []
  let obj = {
    dataTable: '',
    dictType: '',
    isInput: true
  }
  tableData.value.push(obj)
  nextTick(() => {
    scrollToBottom()
  })
}

const addFieidData = ref<any>([]) //新添加的字段
//增加字段
const addFieid = () => {
  let fieObj = {
    dictType: dictDtailObj.value.dictType || tableData.value[tableData.value.length - 1].dictType,
    dataTable:
      dictDtailObj.value.dataTable || tableData.value[tableData.value.length - 1].dataTable,
    dataCol: '',
    inputCode: '01',
    dataTitle: '',
    flagShow: 'Y',
    showSort: tableDataDetail.value.length + 1,
    flagIsname: 'N',
    resultSort: '',
    showWidth: null,
    sortFlag: 0,
    isInput: true,
    id: tableDataDetail.value.length + 1,
    isInsert: '1', //新增
    tmpId: Date.now().toString()
  }
  tableDataDetail.value.push(fieObj)
  getItemNo(tableDataDetail.value)
  changeRow(fieObj)
}

//确定
const confirm = async () => {
  if (isAddDict.value && tableDataDetail.value.length == 0) {
    message.notifyWarning('请添加字段')
    return
  }
  const paramsArr = ref<any>([])
  paramsArr.value = JSON.parse(JSON.stringify(addFieidData.value))
  paramsArr.value = paramsArr.value.filter((res) => res.dataCol !== '')
  if (paramsArr.value.length > 0) {
    paramsArr.value.forEach((item, index) => {
      item.row_index = index
      item.currentDictTypeId = getCardId(item.dictType, item.dataCol)
      item.inputSettingDOS = []
      item.inputSettingDOS.push({
        dictType: item.dictType,
        dataTable: item.dataTable,
        dataCol: item.dataCol,
        inputCode: item.inputCode,
        dataTitle: item.dataTitle,
        flagShow: item.flagShow,
        showSort: item.showSort,
        flagIsname: item.flagIsname,
        resultSort: item.resultSort,
        showWidth: item.showWidth,
        sortFlag: item.sortFlag
      })
    })
    const duplicates = objectsWithDuplicateIds(paramsArr.value)
    console.log(duplicates)
    if (JSON.stringify(duplicates) === '{}') {
    } else {
      message.warning('字段不能有重复')
      return false
    }
  }
  console.log(paramsArr.value)
  //添加字段
  await operationData(paramsArr.value)
  message.notifySuccess('保存成功')
  addFieidData.value = []
  if (isAddDict.value) {
    getInputSettingGroupByName({ searchTable: searchTable.value }).then((res) => {
      if (res) {
        tableData.value = res
        if (tableData.value && tableData.value.length > 0) {
          tableData.value.forEach((item) => {
            item.isInput = false
          })
          currentTableType.value = getCardId(
            paramsArr.value[0].dictType,
            paramsArr.value[0].dataTable
          )
          personalClick(
            {
              dictType: paramsArr.value[0].dictType,
              dataTable: paramsArr.value[0].dataTable
            },
            '',
            ''
          )
        }
      }
    })
  } else {
    personalClick(dictDtailObj.value, '', '')
  }
}

//删除字段
const deleFieid = async (row, index) => {
  if (row.isInsert == '1') {
    tableDataDetail.value.splice(index, 1)
    getItemNo(tableDataDetail.value)
  } else if (row.isInsert == '0') {
    ElMessageBox.confirm('是否删除当前字段', '提示', {
      showClose: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        deleteInputSetting(row).then((res) => {
          if (res) {
            message.notifySuccess('删除成功')
            tableDataDetail.value.splice(index, 1)
            getItemNo(tableDataDetail.value)
          }
        })
      })
      .catch(() => {})
  }
  const ezIndex = addFieidData.value.findIndex(
    (v) => v.itemNo === row!.itemNo || (v.tmpId && v.tmpId === row!.tmpId)
  )
  addFieidData.value.splice(ezIndex, 1)
}
const setRowClassName = ({ row }) => {
  if (getCardId(row.dictType, row.dataTable) === currentTableType.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const getCardId = (dictType, dataTable) => {
  return `${dictType}${dataTable}`
}
//导出
const outBound = () => {
  if (dictDtailObj.value && dictDtailObj.value.dataTable) {
    message
      .confirm('是否确认导出所有输入法数据项?')
      .then(async () => {
        // 处理查询参数
        let params = {
          dictType: dictDtailObj.value.dictType,
          dataTable: dictDtailObj.value.dataTable
        }
        const response = await exportInputSettingByDataTable(params)
        download.excel(response, currentDictType.value + '输入法字段.xlsx')
      })
      .catch(() => {})
      .finally(() => {})
  }
}
//滑动到table底部
const tableRef = ref<InstanceType<typeof ElTable> | null>(null)
const scrollToBottom = () => {
  tableRef.value?.setScrollTop(9999)
}
/** 初始化 **/
onMounted(async () => {
  getTableList()
  //查询所有输入码类型
  getInputType().then((res) => {
    //console.log(res)
    optionData.value = res
  })
})
const changeRow = (row) => {
  if (
    row &&
    !addFieidData.value.find(
      (item) => item.itemNo === row!.itemNo || (item.tmpId && item.tmpId === row!.tmpId)
    )
  ) {
    addFieidData.value.push(row)
  }
}
const getItemNo = async (arr) => {
  arr.forEach((item, index) => {
    item.itemNo = index + 1
    item.row_index = index
    item.currentDictTypeId = getCardId(item.dictType, item.dataCol)
  })
  return arr
}
const changeDictTypeId = async (row) => {
  row.currentDictTypeId = getCardId(row.dictType, row.dataCol)
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
    await importSeting({
      dictType: currentDictType.value,
      tableName: currentDataTable.value,
      url: fileUrl.value
    })
    message.notifySuccess('导入成功')
    getInputSettingByDataTable(dictDtailObj.value).then((res) => {
      tableDataDetail.value = res
      if (tableDataDetail.value && tableDataDetail.value.length > 0) {
        tableDataDetail.value.forEach((item) => {
          item.isInsert = '0'
        })
        getItemNo(tableDataDetail.value)
      }
    })
  }
}
const objectsWithDuplicateIds = (array) => {
  const idMap = array.reduce((map, obj) => {
    const id = obj.currentDictTypeId
    map[id] = map[id] || []
    map[id].push(obj)
    return map
  }, {})

  return Object.entries(idMap)
    .filter(([key, value]) => value.length > 1)
    .reduce((result, [key, value]) => {
      result[key] = value
      return result
    }, {})
}
</script>
<style lang="scss" scoped>
.method {
  display: flex;
  padding: 44px 20px 0;
  height: calc(100vh - 54px);
  // background: #fff;
  overflow: hidden;
  .method-left {
    width: 20%;
    margin-right: 10px;
  }
  .method-right {
    flex: 1;
  }
}
::v-deep .el-scrollbar__view {
  height: 100% !important;
}
:deep(.method-right .el-radio) {
  margin-right: 15px !important;
}
:deep(.method-right .el-input-number) {
  width: 80px !important;
}
</style>
