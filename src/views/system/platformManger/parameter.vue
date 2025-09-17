<template>
  <div class="app-container">
    <!-- <el-card> -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="配置维护" name="first"> <maintenance /> </el-tab-pane>
      <el-tab-pane label="配置项定义" name="second"><definition /></el-tab-pane>
    </el-tabs>
    <!-- </el-card> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import maintenance from './components/maintenance.vue'
import definition from './components/definition.vue'
const activeName = ref('first')
</script>
<style scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 40px 20px 0px;
  overflow: hidden;
  background: #fff;
}
</style>
