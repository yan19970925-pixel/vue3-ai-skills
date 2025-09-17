<template>
  <FormNew ref="formRef" :rules="rules" :schema="schema" :labelWidth="80">
    <template #sex="form">
      <el-radio-group v-model="form['sex']">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </template>
  </FormNew>
  <XButton title="保存" @click="submit()" />
  <XButton type="danger" title="重置" @click="init()" />
</template>
<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import { FormSchema } from '@/types/form'
import type { FormExpose } from '@/components/Form'
import { useUserStoreWithOut } from '@/store/modules/user'

import {
  getUserProfileApi,
  updateUserProfileApi,
  UserProfileUpdateReqVO
} from '@/api/system/user/profile'

// 表单校验
const rules = reactive<FormRules>({
  nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ]
})
const schema = reactive<FormSchema[]>([
  {
    field: 'nickname',
    label: '用户昵称',
    component: 'Input'
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input'
  },
  {
    field: 'email',
    label: '用户邮箱',
    component: 'Input'
  },
  {
    field: 'sex',
    label: '性别',
    component: 'InputNumber',
    value: 0
  }
])
const formRef = ref<FormExpose>() // 表单 Ref
const submit = () => {
  const elForm = unref(formRef)?.getElFormRef()
  if (!elForm) return
  elForm.validate(async (valid) => {
    if (valid) {
      const data = unref(formRef)?.formModel as UserProfileUpdateReqVO
      await updateUserProfileApi(data)
      //更新头部用户昵称信息
      const userStore = useUserStoreWithOut()
      await userStore.setUserInfoCache()
      const userNickname = document.getElementById('userNickname') || null
      if (userNickname) {
        userNickname.innerText = data.nickname || ''
      }
      ElMessage.success('修改成功')
      await init()
    }
  })
}
const init = async () => {
  const res = await getUserProfileApi()
  unref(formRef)?.setValues(res)
}
onMounted(async () => {
  await init()
})
</script>
