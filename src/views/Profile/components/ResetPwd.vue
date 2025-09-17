<template>
  <el-form ref="formRef" :model="password" :rules="rules" label-width="80px">
    <el-form-item label="旧密码">
      <InputPassword v-model="password.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码">
      <InputPassword v-model="password.newPassword" strength />
    </el-form-item>
    <el-form-item label="确认密码">
      <InputPassword v-model="password.confirmPassword" strength />
    </el-form-item>
    <el-form-item>
      <XButton type="primary" @click="submit(formRef)" title="保存" />
      <XButton type="danger" title="重置" @click="reset(formRef)" />
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'

import { InputPassword } from '@/components/InputPassword'
import { updateUserPwdApi } from '@/api/system/user/profile'

const message = useMessage()
const formRef = ref<FormInstance>()
const password = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单校验
const equalToPassword = (value, callback) => {
  if (password.newPassword !== value) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
})
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await updateUserPwdApi(password.oldPassword, password.newPassword)
      message.success('修改成功')
    }
  })
}
const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
