<template>
  <!-- 添加或修改参数配置对话框 -->
  <Dialog title="添加组" :modelValue="showDialog" width="600px" append-to-body @close="closeDialog">
    <el-form ref="formRef" :model="formData" label-width="60px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="组名">
            <el-popover
              placement="bottom"
              v-model="onShowOperNameDialog"
              width="600"
              heihgt="420"
              ref="textinfo2"
              trigger="click"
            >
              <div class="popover-content">
                <div ref="editEditItem" id="editItem">
                  <div class="editItemQuery">
                    <span class="queryDes">输入码</span
                    ><el-input
                      v-model="deptKeyWord"
                      class="queryInput"
                      autofocus="true"
                      size="small"
                      placeholder="请输入拼音码"
                      :maxlength="20"
                    />
                    <span class="queryDes1"
                      ><el-select size="small" v-model="pymWord" style="width: 130px">
                        <el-option value="01" label="01-拼音头" selected /></el-select
                    ></span>
                    <span class="queryDes">科室字典</span>
                  </div>
                  <el-table
                    class="itemTable"
                    :header-cell-style="{
                      background: '#f7f8fcff',
                      color: '#000',
                      fontWeight: 'normal'
                    }"
                    v-show="deptListsData.length > 0"
                    :data="deptListsData"
                    border
                    style="width: 570px; height: 360px; overflow-y: auto"
                    @row-click="(row) => selectDeptName(row)"
                  >
                    <el-table-column
                      label="科室编码"
                      prop="deptCode"
                      :show-overflow-tooltip="true"
                      width="120"
                    />
                    <el-table-column
                      label="科室名称"
                      prop="deptName"
                      :show-overflow-tooltip="true"
                    />
                    <el-table-column label="拼音码" prop="inputCode" width="120" />
                  </el-table>
                </div>
              </div>
              <template #reference>
                <el-select
                  v-model="formData.groupName"
                  style="width: 100%; height: 30px"
                  @focus="groupNameFocus()"
                  ref="selectBeforeDaiso"
                  placeholder=" "
                >
                  <el-option
                    v-for="item in deptListsData"
                    :key="item.deptCode"
                    :label="item.deptName"
                    :value="item.deptName"
                    v-show="false"
                    style="display: none"
                  />
                </el-select>
                ></template
              >
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组代码">
            <el-input v-model="formData.groupCode" @blur="changeGroupCode" placeholder="" />
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
import { queryDictByConfig, saveDeptGroupInfo } from '@/api/system/deptManage'
import { ElForm } from 'element-plus'
import { propTypes } from '@/utils/propTypes'

type Form = InstanceType<typeof ElForm>

const emits = defineEmits(['success'])

const message = useMessage() // 消息弹窗

const showDialog = ref(false)

// 表单初始化参数
const initParams = {
  groupClass: '',
  groupCode: '',
  groupName: '',
  inputCode: '',
  deptName: '',
  deptCode: '',
  groupManager: ''
}

const formRef = ref<Form | null>()
const formData = ref<Recordable>({ ...initParams })
const onShowOperNameDialog = ref(false)
const deptListsData = ref<any>([])
const deptKeyWord = ref('')
const pymWord = ref('01')
const textinfo2 = ref({ hide: () => {} })
const props = defineProps({
  groupClass: propTypes.string
})
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
  try {
    await saveDeptGroupInfo([data])
    message.success('新增成功')
    operateOk()
  } catch (err) {
    console.error(err)
  }
}
/* 取消 */
const cancel = () => {
  closeDialog()
}
const changeGroupCode = async () => {
  deptListsData.value = await queryDictByConfig({
    dictType: '科室',
    keyWord: formData.value.groupCode
  })
  formData.value.groupName = deptListsData.value[0].deptName
}
/* 打开弹框 */
const openForm = () => {
  resetForm()
  formData.value = { ...initParams }
  formData.value.groupClass = props.groupClass
  showDialog.value = true
}
const groupNameFocus = async () => {
  deptKeyWord.value = ''
  await getDeptLists()
}
const getDeptLists = async () => {
  deptListsData.value = await queryDictByConfig({
    dictType: '科室',
    keyWord: deptKeyWord.value
  })
}
const selectDeptName = async (row: any) => {
  textinfo2.value.hide()
  formData.value.groupCode = row.deptCode
  formData.value.groupName = row.deptName
  formData.value.inputCode = row.inputCode
}
// ========== 初始化 ==========
onMounted(async () => {})

watch(
  () => deptKeyWord.value,
  () => {
    getDeptLists()
  }
)
defineExpose({
  resetForm,
  openForm
})
</script>
<style lang="scss" scoped>
.editItemQuery {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 570px;
  height: 45px;
  line-height: 45px;

  .queryDes {
    color: #f33d21;
    margin-left: 10px;
  }

  .queryDes1 {
    margin-right: 8px;
  }

  .queryInput {
    width: 200px;
    margin: 0px 8px;
  }
}
</style>
