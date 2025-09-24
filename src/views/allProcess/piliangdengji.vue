<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="base-cont">
          <span>单位代码:</span>
          <el-input
            v-model="searchUnitCode"
            @keyup.enter="searchByUnitCode"
            placeholder="请输入"
            class="select-item !w-60px ml-6px"
          /><span class="selectBtn"> <el-button :icon="Search" @click="onFocusUnitCode()" /></span>
          <span class="ml-16px">单位名称:</span>
          <el-input
            v-model="unitName"
            readonly
            placeholder="对应单位"
            class="select-item !w-120px ml-6px mr-12px"
          />
          <p class="!w-328px" style="color: red"
            ><span
              >对单位的人员来源用三种：1：对该单位以前的人员<br />进行调整，2：对人员进行excel导入3：已经存在数<br />据库里面的人员进行单位修改（在基本信息里修改）</span
            ></p
          >
          <!-- <el-button type="primary" @click="handleSaveDocument"> 查询 </el-button> -->
          <el-button
            class="resetBtn"
            :disabled="
              newTableList.length == 0 ||
              (newTableList.length > 0 && newTableList[0].optionFlag == 1)
            "
            @click="handlechange()"
          >
            资格调整
          </el-button>
          <el-button class="resetBtn" @click="handleEmport()">
            <img
              src="@\assets\imgs\Export2x.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出 </el-button
          ><el-button class="resetBtn" @click="handleImport">
            <img
              src="@\assets\imgs\import.png"
              alt="导入"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导入
          </el-button>
          <el-button
            :disabled="
              newTableList.length == 0 ||
              (newTableList.length > 0 && newTableList[0].optionFlag == 2)
            "
            class="resetBtn"
            @click="handleDelete()"
          >
            删除记录
          </el-button>
          <el-button class="resetBtn" @click="handleCheckName()"> 检测姓名为空行 </el-button>
          <el-button class="resetBtn" @click="downloadExcel()"> 下载模板 </el-button>
          <el-button
            type="primary"
            :disabled="
              newTableList.length == 0 ||
              (newTableList.length > 0 && newTableList[0].optionFlag == 2)
            "
            @click="handleSave()"
          >
            保存
          </el-button>
          <p class="w-160px ml-16px" style="color: red"
            >做单位人员批量登记<br />时，请不要其它操作人<br />员做登记预约操作！</p
          >
        </div>
      </div>
      <div style="padding: 10px; background-color: #fff; height: calc(100% - 72px)">
        <!-- 表格 -->
        <el-table
          ref="adviceTableRef"
          :data="newTableList"
          border
          :row-class-name="setAdviceRowClass"
          style="width: 100%; height: 100%; min-height: 300px"
          highlight-current-row
          @row-click="selectRow"
          stripe
        >
          <el-table-column
            show-overflow-tooltip
            type="index"
            label="保留资格否"
            width="94"
            align="center"
            fixed="left"
          >
            <template #default="scope">
              <el-checkbox
                v-model="scope.row.isChecked"
                @change="selectRow(scope.row)"
                label="不保留"
              /> </template
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="peId"
            label="体检号"
            align="center"
            width="120"
            fixed="left"
          />
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="姓名"
            align="center"
            fixed="left"
            width="100"
          />
          <el-table-column
            show-overflow-tooltip
            prop="sex"
            label="性别"
            align="center"
            width="50"
          />
          <el-table-column
            show-overflow-tooltip
            prop="age"
            label="年龄"
            align="center"
            width="70"
          />
          <el-table-column
            show-overflow-tooltip
            prop="department"
            label="所属部门"
            align="center"
            width="80"
          />
          <el-table-column
            show-overflow-tooltip
            prop="chargeType"
            label="费别"
            align="center"
            width="80"
          />
          <el-table-column
            show-overflow-tooltip
            prop="nation"
            label="民族"
            align="center"
            width="60"
          />
          <el-table-column
            show-overflow-tooltip
            prop="dateOfBirth"
            label="出生日期"
            align="center"
            width="110"
          />
          <el-table-column
            show-overflow-tooltip
            prop="birthPlace"
            label="出生地"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="idNo"
            label="身份证号"
            align="center"
            width="160"
          />
          <el-table-column
            show-overflow-tooltip
            prop="maritalStatus"
            label="婚姻"
            align="center"
            width="60"
          />
          <el-table-column
            show-overflow-tooltip
            prop="peLevel"
            label="优先级"
            align="center"
            width="64"
          />
          <el-table-column
            show-overflow-tooltip
            prop="postcode"
            label="邮编"
            align="center"
            width="80"
          />
          <el-table-column
            show-overflow-tooltip
            prop="address"
            label="通信地址"
            align="center"
            width="150"
          />
          <el-table-column
            show-overflow-tooltip
            prop="country"
            label="国籍"
            align="center"
            width="70"
          />
          <el-table-column
            show-overflow-tooltip
            prop="email"
            label="邮箱"
            align="center"
            width="130"
          />
          <el-table-column
            show-overflow-tooltip
            prop="phoneNumber"
            label="电话号码"
            align="center"
            width="110"
          />
          <el-table-column
            show-overflow-tooltip
            prop="workNo"
            label="工号"
            align="center"
            width="70"
          />
          <el-table-column
            show-overflow-tooltip
            prop="identity"
            label="身份"
            align="center"
            width="70"
          />
          <el-table-column
            show-overflow-tooltip
            prop="namePhonetic"
            label="拼音"
            align="center"
            width="70"
          />
          <el-table-column
            show-overflow-tooltip
            prop="unitCode"
            label="单位代码"
            align="center"
            width="80"
          />
          <el-table-column
            show-overflow-tooltip
            prop="peId"
            label="主索引"
            align="center"
            width="70"
          />
        </el-table>
      </div>
      <!-- 对话框 增加 -->
      <Dialog
        append-to-body
        v-model="addDialog"
        title="导入文件"
        width="500"
        :before-close="addClose"
      >
        <div>
          <el-upload
            ref="uploadRef"
            accept=".xls,.xlsx"
            :limit="1"
            :headers="upload.headers"
            :action="upload.url"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :on-exceed="handleExceed"
            :data="uploadData"
            name="excelFile"
            :on-error="excelUploadError"
            :auto-upload="false"
            drag
          >
            <Icon icon="ep:upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip text-center">
                <span>仅允许导入xls,xlsx格式文件。</span>
              </div>
            </template>
          </el-upload>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确定</el-button>
            <el-button @click="resetForm()">关闭</el-button>
          </div>
        </template>
      </Dialog>
      <Dialog
        append-to-body
        v-model="selectUnitCodeVisiable"
        title="单位选择"
        width="800"
        @close="selectUnitCodeVisiable = false"
        class="package-advice-container"
      >
        <div
          ><el-input
            ref="queryInput"
            class="queryInput !w-300px"
            v-model="keyWord"
            @input="handleQueryItem"
            autofocus="true"
            placeholder="请输入拼音码"
        /></div>
        <el-table
          :data="unitCodeList"
          border
          style="width: 100%; margin-top: 10px; height: 500px"
          highlight-current-row
          @row-dblclick="selectUnitCodeClick"
          ><el-table-column
            :resizable="false"
            align="center"
            label="单位代码"
            show-overflow-tooltip
            prop="unitCode"
            width="100" /><el-table-column
            :resizable="false"
            align="left"
            label="单位名称"
            show-overflow-tooltip
            prop="unitName" /><el-table-column
            :resizable="false"
            align="center"
            label="联系人"
            width="100"
            show-overflow-tooltip
            prop="connecter" /><el-table-column
            :resizable="false"
            align="center"
            label="联系电话"
            width="120"
            show-overflow-tooltip
            prop="phone" /><el-table-column
            :resizable="false"
            align="left"
            label="地址"
            width="140"
            show-overflow-tooltip
            prop="address" /><el-table-column
            :resizable="false"
            align="center"
            label="拼音码"
            width="100"
            show-overflow-tooltip
            prop="inputCode"
        /></el-table>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElTable, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getAccessToken } from '@/utils/auth'
import {
  getPeUnitDict,
  updatePePersonalUnit,
  savePeUnitPersonal,
  getPeUnitPersonalList,
  getPeUnitList,
  exportPePersonal
} from '@/api/allProcess/index'
import download from '@/utils/download'
const searchUnitCode = ref('')
const unitName = ref('')
const newTableList = ref<any>([])
const unitInfo = ref<any>({})
// 设置行样式
const setAdviceRowClass = () => {
  return 'advice-row'
}
const searchByUnitCode = async () => {
  if (searchUnitCode.value) {
    let res = await getPeUnitDict({
      unitCode: searchUnitCode.value
    })
    if (res && res.unitName) {
      unitName.value = res.unitName
      unitInfo.value = res
    } else {
      unitName.value = ''
      unitInfo.value = {}
      ElMessage.warning('未查询到预约信息')
    }
    await getList()
  }
}
const selectRow = async (row) => {
  row.isChecked = !row.isChecked
}
const handlechange = async () => {
  //资格调整
  if (newTableList.value && newTableList.value.length > 0) {
    let peIdArray: any = []
    newTableList.value.forEach((item) => {
      if (item.isChecked) {
        peIdArray.push(item.peId)
      }
    })
    if (peIdArray && peIdArray.length > 0) {
      await updatePePersonalUnit({
        peIdArray: peIdArray
      })
      ElMessage.success('调整成功')
      getList()
    } else {
      ElMessage.error('请选择需要调整的数据')
    }
  }
}
const handleEmport = async () => {
  //导出
  const data = await exportPePersonal({
    pePersonalList: newTableList.value
  })
  download.excel(data, '人员信息.xlsx')
}
const handleDelete = async () => {
  const params = newTableList.value.filter((item) => item.isChecked)
  if (params && params.length > 0) {
    //删除选中的导入记录
    console.log(params)
    params.forEach((item1) => {
      newTableList.value.forEach((item2, index) => {
        if (item1.peId == item2.peId) {
          newTableList.value.splice(index, 1)
        }
      })
    })
  } else {
    ElMessage.error('请选择需要删除的数据')
  }
}
const handleCheckName = async () => {
  //检测是否有姓名为空行
  newTableList.value.forEach((item, index) => {
    if (!item.name) {
      newTableList.value.splice(index, 1)
    }
  })
}
const docPath = process.env.NODE_ENV === 'development' ? '../../../public/muban.xls' : '/muban.xls'
const downloadExcel = async () => {
  //下载模板
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = docPath
  a.download = '团检人员导入模板' + '.xls'
  a.style.display = 'none'
  a.click()
  document.body.removeChild(a)
}
const handleSave = async () => {
  //保存
  await savePeUnitPersonal({
    pePersonalList: newTableList.value
  })
  ElMessage.success('保存成功')
  getList()
}
const uploadData = {
  unitCode: searchUnitCode.value
}
//导入
const handleImport = async () => {
  if (searchUnitCode.value) {
    newTableList.value = []
    addDialog.value = true
    uploadData.unitCode = searchUnitCode.value
  } else {
    ElMessage.error('请输入单位代码')
  }
}
const addDialog = ref(false)
const uploadRef = ref()
const upload = reactive({
  // // 是否显示弹出层（模板导入）
  // open: false,
  // 弹出层标题（模板导入）
  title: '导入',
  // 是否禁用上传
  isUploading: false,
  // 设置上传的请求头部
  headers: {
    Authorization: 'Bearer ' + getAccessToken()
  },
  // 上传的地址
  url: import.meta.env.VITE_BASE_URL + '/health-api/health/pePersonalBatchVisit/importPePersonal'
})
const submitForm = () => {
  // addDialog.value = false
  uploadRef.value?.submit()
}
const resetForm = () => {
  addDialog.value = false
}
const addClose = () => {
  addDialog.value = false
  uploadRef.value?.clearFiles()
}
const closeDialog = () => {
  addDialog.value = false
  uploadRef.value?.clearFiles()
}
const handleFileSuccess = (response: any) => {
  console.log(response)

  if (response.code !== 0) {
    ElMessage.error(response.msg)
    setTimeout(() => {
      uploadRef.value?.clearFiles()
      upload.isUploading = false
    }, 1000)
    return
  }
  upload.isUploading = false
  uploadRef.value?.clearFiles()
  // 拼接提示语
  const data = response.data
  if (data && data.length > 0) {
    data.forEach((item) => {
      if (item.name) {
        item.isChecked = false
        newTableList.value.push(item)
      }
    })
  }
  // ElMessage.warning(data)
  closeDialog()
  ElMessage.success('导入成功')
}
// 文件数超出提示
const handleExceed = (): void => {
  ElMessage.error('最多只能上传一个文件！')
}
// 上传错误提示
const excelUploadError = (): void => {
  ElMessage.error('导入数据失败，请您重新上传！')
}
onMounted(() => {})
const getList = async () => {
  if (searchUnitCode.value) {
    newTableList.value = await getPeUnitPersonalList({
      unitCode: searchUnitCode.value
    })
    if (newTableList.value && newTableList.value.length > 0) {
      newTableList.value.forEach((item) => {
        item.optionFlag = 2
        item.isChecked = true
      })
    }
  }
}
const selectUnitCodeVisiable = ref(false)
const keyWord = ref('')
const unitCodeList = ref<any>([])
const queryInput = ref()
const onFocusUnitCode = async () => {
  keyWord.value = ''
  handleQueryItem()
  selectUnitCodeVisiable.value = true
  nextTick(() => {
    queryInput.value.focus()
  })
}
const handleQueryItem = async () => {
  unitCodeList.value = await getPeUnitList({
    input: keyWord.value
  })
}
const selectUnitCodeClick = async (row) => {
  searchUnitCode.value = row.unitCode
  selectUnitCodeVisiable.value = false
  await searchByUnitCode()
}
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #edf1fc;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 8px;
  box-sizing: border-box;
}
.base-cont {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  padding: 6px;

  &.auto {
    display: block;
  }

  .cont-span {
    display: inline-block;
    width: 100px;
    text-align: right;
    flex-shrink: 0;
  }
  .select-item {
    width: 240px;
  }

  .base-div {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;

    &.spec {
      justify-content: left;
      gap: 0;

      .select-area {
        width: 1290px;
      }
    }
  }
}

.resetBtn {
  border: 1px solid #3473d1 !important;
  color: #3473d1 !important;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
.resetBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
:deep(.startDateTime .el-input__wrapper) {
  height: 26px !important;
}
:deep(.startDateTime .date-text-row) {
  height: 26px !important;
}
:deep(.startDateTime .date-text) {
  // height: 26px !important;
  padding: 0 !important;
  width: 100% !important;
  font-size: 14px !important;
}
:deep(.startDateTime .date-text-row .date-text-calendar) {
  width: 22px;
  height: 22px;
}
.selectBtn {
  .el-button {
    position: relative;
    top: 0px;
    margin-left: -4px;
    background: #f5f7fa !important;
    color: #999 !important;
  }
}
</style>

<style>
.el-table--default .cell {
  padding: 0 6px !important;
}
.package-advice-container .el-dialog__body {
  padding: 15px !important;
}
</style>
