<template>
  <!-- 添加或修改参数配置对话框 -->
  <Dialog :title="title" :modelValue="showDialog" width="680px" append-to-body @close="closeDialog">
    <el-form ref="formRef" :model="formData" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="科室代码" prop="deptCode">
            <el-input v-model="formData.deptCode" disabled placeholder="请输入科室代码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科室名称" prop="deptName" required>
            <el-input
              v-model="formData.deptName"
              maxlength="20"
              placeholder="请输入科室名称"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="科室简称" prop="deptAlias">
            <el-input
              v-model="formData.deptAlias"
              maxlength="20"
              placeholder="请输入科室简称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="临床科室属性">
            <el-select v-model="formData.clinicAttr" placeholder="请选择" clearable>
              <el-option
                v-for="item in props.clinicAttrList"
                :key="item.clinicAttrCode"
                :label="item.clinicAttrName"
                :value="item.clinicAttrCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="门诊住院属性">
            <el-select v-model="formData.outpOrInp" placeholder="请选择" clearable>
              <el-option
                v-for="item in props.outpOrInpList"
                :key="item.oiAttrCode"
                :label="item.oiAttrName"
                :value="item.oiAttrCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内外科标志">
            <el-select v-model="formData.internalOrSergery" placeholder="请选择" clearable>
              <el-option
                v-for="item in props.internalOrSergeryList"
                :key="item.isAttrCode"
                :label="item.isAttrName"
                :value="item.isAttrCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="摆药属性">
            <el-select v-model="formData.dispensingCumulate" placeholder="请选择" clearable>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="虚拟药柜">
            <el-select v-model="formData.virtualCabinet" placeholder="请选择" clearable>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="拼音码">
            <el-input
              v-model="formData.inputCode"
              maxlength="10"
              placeholder="请输入内容"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="部门详细说明">
            <el-input
              v-model="formData.deptDesc"
              maxlength="50"
              type="textarea"
              clearable
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { saveDeptInfo, getDeptMaxSerialNo, getDeptMaxCode } from '@/api/system/deptManage'
import { ElForm } from 'element-plus'
import { propTypes } from '@/utils/propTypes'

type Form = InstanceType<typeof ElForm>
const emits = defineEmits(['success'])
const message = useMessage() // 消息弹窗
const showDialog = ref(false)
// 弹出层标题
const title = ref('')

// 表单初始化参数
let initParams = {
  serialNo: '',
  deptCode: '',
  deptName: '',
  deptAlias: '',
  clinicAttr: '',
  clinicAttrName: '',
  internalOrSergery: '',
  internalOrSergeryName: '',
  dispensingCumulate: '',
  dispensingCumulateName: '',
  virtualCabinet: '',
  virtualCabinetName: '',
  inputCode: '',
  deptDesc: ''
}
const props = defineProps({
  clinicAttrList: propTypes.object,
  outpOrInpList: propTypes.object,
  internalOrSergeryList: propTypes.object,
  deptCode: propTypes.string
})
const formRef = ref<Form | null>()
const formData = ref<any>([])

const resetForm = () => {
  let form = formRef?.value
  if (!form) return
  formData.value = { ...initParams }
  form && (form as Form).resetFields()
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
  let data = formData.value
  if (!formData.value.deptName) {
    message.warning('科室名称不能为空')
    return false
  }
  try {
    if (data?.deptCode) {
      await saveDeptInfo([data])
      message.success('修改成功')
      operateOk()
    } else {
      await saveDeptInfo([data])
      message.success('新增成功')
      operateOk()
    }
  } catch (err) {
    console.error(err)
  }
}
/* 取消 */
const cancel = () => {
  closeDialog()
}

/* 打开弹框 */
const openForm = async (row: any) => {
  title.value = ''
  resetForm()
  if (row && row.deptCode) {
    title.value = '修改科室'
    formData.value = {
      serialNo: row.serialNo,
      deptCode: row.deptCode,
      deptName: row.deptName,
      deptAlias: row.deptAlias,
      clinicAttr: row.clinicAttr,
      clinicAttrName: row.clinicAttrName,
      internalOrSergery: row.internalOrSergery,
      internalOrSergeryName: row.internalOrSergeryName,
      dispensingCumulate: row.dispensingCumulate,
      dispensingCumulateName: row.dispensingCumulateName,
      virtualCabinet: row.virtualCabinet,
      virtualCabinetName: row.virtualCabinetName,
      inputCode: row.inputCode,
      deptDesc: row.deptDesc,
      outpOrInp: Number(row.outpOrInp),
      outpOrInpName: row.outpOrInpName
    }
  } else {
    title.value = '添加科室'
    formData.value = { ...initParams }
  }
  if (!formData.value.deptCode)
    formData.value.deptCode = await getDeptMaxCode({ deptCode: props.deptCode })
  if (!formData.value.serialNo) formData.value.serialNo = await getDeptMaxSerialNo({})
  showDialog.value = true
}

// ========== 初始化 ==========
onMounted(async () => {})

defineExpose({
  resetForm,
  openForm
})
</script>
