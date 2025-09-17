<template>
  <Dialog :title="modelTitle" v-model="modelVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="模板内容" prop="content">
        <el-input type="textarea" v-model="formData.content" readonly />
      </el-form-item>
      <el-form-item label="接收人" prop="userId">
        <el-select v-model="formData.userId" placeholder="请选择接收人">
          <el-option
            v-for="item in userOption"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="param in formData.params"
        :key="param"
        :label="'参数 {' + param + '}'"
        :prop="'templateParams.' + param"
      >
        <el-input
          v-model="formData.templateParams[param]"
          :placeholder="'请输入 ' + param + ' 参数'"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="modelVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getSimpleUserList, UserVO } from '@/api/system/user'
import * as NotifyTemplateApi from '@/api/system/notify/template'
const userOption = ref<UserVO[]>([])
const message = useMessage() // 消息弹窗

const modelVisible = ref(false) // 弹窗的是否展示
const modelTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  content: '',
  params: {},
  userId: 0,
  templateCode: '',
  templateParams: {}
})
const formRules = reactive({
  userId: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
  templateCode: [{ required: true, message: '模版编号不能为空', trigger: 'blur' }],
  templateParams: {}
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (data: any) => {
  resetForm()
  modelTitle.value = '测试'
  formData.value.content = data.content
  formData.value.params = data.params
  formData.value.templateCode = data.code
  formData.value.templateParams = data.params.reduce(function (obj: any, item: any) {
    obj[item] = undefined
    return obj
  }, {})
  formRules.templateParams = data.params.reduce(function (obj: any, item: any) {
    obj[item] = { required: true, message: '参数 ' + item + ' 不能为空', trigger: 'change' }
    return obj
  }, {})
  formLoading.value = true
  modelVisible.value = true
  try {
    userOption.value = await getSimpleUserList()
  } finally {
    formLoading.value = false
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const submitForm = async () => {
  // 校验表单
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data: NotifyTemplateApi.NotifySendReqVO = {
      userId: formData.value.userId,
      templateCode: formData.value.templateCode,
      templateParams: formData.value.templateParams as unknown as Map<string, Object>
    }
    const res = await NotifyTemplateApi.sendNotify(data)
    if (res) {
      message.success('提交发送成功！发送结果，见发送日志编号：' + res)
    }
    modelVisible.value = false
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    content: '',
    params: {},
    userId: 0,
    templateCode: '',
    templateParams: {}
  }
  formRef.value?.resetFields()
}
</script>
