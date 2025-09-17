<template>
  <div class="flex">
    <el-card class="w-1/3 user" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <ProfileUser />
    </el-card>
    <el-card class="w-2/3 user ml-3" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
        </div>
      </template>
      <div>
        <el-tabs v-model="activeName" tab-position="top" style="height: 400px" class="profile-tabs">
          <el-tab-pane label="基本资料" name="basicInfo">
            <BasicInfo />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="resetPwd">
            <ResetPwd />
          </el-tab-pane>
          <!-- <el-tab-pane label="社交信息" name="userSocial">
            <UserSocial />
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="Profile">
import { BasicInfo, ProfileUser, ResetPwd } from './components/'

const activeName = ref('basicInfo')
</script>
<style scoped>
.user {
  max-height: 960px;
  padding: 15px 20px 20px 20px;
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-card .el-card__header, .el-card .el-card__body) {
  padding: 15px !important;
}
.profile-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-weight: 600;
}
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
