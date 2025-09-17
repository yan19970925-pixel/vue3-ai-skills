<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import { useDesign } from '@/hooks/web/useDesign'
import nurseAvatar from '@/assets/login/nurse.png'
import doctorAvatar from '@/assets/login/doctor.png'
import { useUserStore } from '@/store/modules/user'
import { useTagsViewStore } from '@/store/modules/tagsView'
import iconDownArrow from '@/assets/INP/down-arrow.svg'

const { wsCache } = useCache()

const { push, replace } = useRouter()

const userStore = useUserStore()

let wardName = userStore.getWardName || ''

const tagsViewStore = useTagsViewStore()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('user-info')

const user = wsCache.get(CACHE_KEY.USER)
let docModel: any = sessionStorage.getItem('docModel')
const isNurse = ref(false)
if (docModel) {
  let str = JSON.stringify(JSON.parse(docModel))
  if (str.indexOf('INPNURSE') > -1) {
    isNurse.value = true
  }
}
const avatar = user.user.avatar ? user.user.avatar : isNurse.value ? nurseAvatar : doctorAvatar

const userName = user.user.nickname ? user.user.nickname : 'Admin'

const hisDoctorNo = user.user.hisDoctorNo
const isReverse = ref(false)

const loginOut = () => {
  ElMessageBox.confirm('是否退出本系统？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      console.log('logout api')
      await userStore.loginOut()
      console.log('logout api')
      tagsViewStore.delAllViews()
      userStore.setWardName('')
      replace('/login?redirect=/index')
    })
    .catch(() => {})
}
const toProfile = async () => {
  push('/user/profile')
}

const visibleChange = (val: boolean) => {
  isReverse.value = val
}
</script>

<template>
  <ElDropdown :class="prefixCls" trigger="click" @visible-change="visibleChange">
    <div class="flex items-center">
      <img
        :src="avatar"
        alt=""
        class="w-[calc(var(--logo-height)-25px)] rounded-[50%]"
        id="userAvatar"
      />
      <section class="flex flex-col justify-between">
        <div
          class="<lg:hidden text-14px pl-[5px] text-[var(--top-header-text-color)]"
          id="userNickname"
        >
          {{ userName }} {{ hisDoctorNo ? `[${hisDoctorNo}]` : '' }}
        </div>
        <div class="<lg:hidden text-14px pl-[5px] text-[var(--top-header-text-color)] mt-4px">{{
          wardName
        }}</div>
      </section>
      <img
        alt=""
        :src="iconDownArrow"
        class="w-16px h-16px ml-15px icon-down-arrow"
        :class="{ 'is-reverse': isReverse }"
      />
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="toProfile">
          <Icon icon="ep:tools" />
          <div>个人中心</div>
        </ElDropdownItem>
        <ElDropdownItem divided @click="loginOut">
          <Icon icon="ep:switch-button" />
          <div>退出系统</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
<style scoped>
.icon-down-arrow {
  transition: all 0.3s;
}
.is-reverse {
  transform: rotate(-180deg);
}
</style>
