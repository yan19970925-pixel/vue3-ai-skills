<template>
  <!-- 添加或修改参数配置对话框 -->
  <Dialog :title="title" :modelValue="showDialog" width="880px" append-to-body @close="closeDialog">
    <div class="flex" style="justify-content: space-between">
      <el-table
        :data="deptList"
        border
        style="width: 48%; height: calc(-400px + 100vh); overflow: auto"
        highlight-current-row
        @row-click="deptClickHandle"
        stripe
        :row-class-name="setRowClassName1"
      >
        <el-table-column
          label="科室代码"
          prop="deptCode"
          width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="科室名称" prop="deptName" :show-overflow-tooltip="true" />
        <el-table-column label="拼音码" prop="inputCode" :show-overflow-tooltip="true" />
      </el-table>
      <el-table
        :data="wardList"
        border
        style="width: 48%; height: calc(-400px + 100vh); overflow: auto"
        highlight-current-row
        stripe
        @row-click="wardClickHandle"
        :row-class-name="setRowClassName2"
      >
        <el-table-column
          label="护理单元代码"
          prop="deptCode"
          width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="护理单元名称" prop="deptName" :show-overflow-tooltip="true" />
        <el-table-column label="拼音码" prop="inputCode" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <template #footer>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import {
  chooseWardList,
  chooseDeptList,
  addDeptVsWardInfo,
  modifyDeptVsWardInfo
} from '@/api/system/deptManage'

const emits = defineEmits(['success'])

const message = useMessage() // 消息弹窗

const showDialog = ref(false)
// 弹出层标题
const title = ref('')

// 表单初始化参数
let initParams = {
  deptCode: '',
  wardCode: '',
  isAdd: false
}

const closeDialog = () => {
  showDialog.value = false
}
// 操作成功
const operateOk = () => {
  emits('success', true)
  closeDialog()
}
const submitForm = async () => {
  if (
    deptSelectedOption.value &&
    deptSelectedOption.value.deptCode &&
    wardSelectedOption.value &&
    wardSelectedOption.value.deptCode
  ) {
    try {
      if (!initParams?.isAdd) {
        let params = {
          oldDeptCode: initParams.deptCode,
          newDeptCode: deptSelectedOption.value.deptCode,
          oldWardCode: initParams.wardCode,
          newWardCode: wardSelectedOption.value.deptCode
        }
        await modifyDeptVsWardInfo(params)
        message.success('修改成功')
        operateOk()
      } else {
        let params = {
          deptCode: deptSelectedOption.value.deptCode,
          wardCode: wardSelectedOption.value.deptCode
        }
        await addDeptVsWardInfo(params)
        message.success('新增成功')
        operateOk()
      }
    } catch (err) {
      console.error(err)
    }
  } else {
    message.warning('请选择科室和护理单元')
    return false
  }
}
/* 取消 */
const cancel = () => {
  closeDialog()
}

/* 打开弹框 */
const openForm = (row: any) => {
  if (row && row.deptCode) {
    title.value = '修改'
    initParams = {
      deptCode: row.deptCode,
      wardCode: row.wardCode,
      isAdd: false
    }
    deptSelectedOption.value.deptCode = row.deptCode
    deptSelectedOption.value.deptName = row.deptName
    wardSelectedOption.value.deptCode = row.wardCode
    wardSelectedOption.value.deptName = row.wardName
  } else {
    title.value = '新增'
    initParams = {
      deptCode: '',
      wardCode: '',
      isAdd: true
    }
    deptSelectedOption.value = []
    wardSelectedOption.value = []
  }
  showDialog.value = true
}

const deptSelectedOption = ref<any>([])
const wardSelectedOption = ref<any>([])
//选中科室
const deptClickHandle = (row: any) => {
  deptSelectedOption.value = row
}

//选中护理单元
const wardClickHandle = (row: any) => {
  wardSelectedOption.value = row
}
const getCardId = (deptCode, deptName) => {
  return `${deptName}${deptCode}`
}
// ========== 初始化 ==========
const wardList = ref<any>([])
const deptList = ref<any>([])
onMounted(async () => {
  wardList.value = await chooseWardList({})
  deptList.value = await chooseDeptList({})
})
const setRowClassName1 = ({ row }) => {
  if (
    getCardId(row.deptCode, row.deptName) ===
    getCardId(deptSelectedOption.value.deptCode, deptSelectedOption.value.deptName)
  ) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const setRowClassName2 = ({ row }) => {
  if (
    getCardId(row.deptCode, row.deptName) ===
    getCardId(wardSelectedOption.value.deptCode, wardSelectedOption.value.deptName)
  ) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
defineExpose({
  openForm
})
</script>
<style scoped lang="scss">
.table-checked-row-style {
  background: #eaeffc !important;
  color: #3473d1 !important;
}
</style>
