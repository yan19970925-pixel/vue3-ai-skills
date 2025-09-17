<template>
  <div class="base-setting" style="height: calc(100vh - 239px)">
    <!-- <div class="base-box mb-8px" style="background-color: #fff; height: 40px">
      <div class="base-title mb-2px">组合详情</div>

      <div class="base-cont">
        <el-radio-group v-model="radio">
          <el-radio :label="1">按体检个人查询体检项目</el-radio>
          <el-radio :label="2">按体检单位体检项目查询</el-radio>
        </el-radio-group>
      </div>
    </div> -->
    <div style="width: 100%; height: 100%; background-color: pink; display: flex">
      <!-- <div class="content" style="flex: 4; padding-right: 6px">
        <el-table
          :data="tableList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100% - 64px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
        >
          <el-table-column label="姓名" prop="extDept" show-overflow-tooltip />
          <el-table-column label="体检号" prop="item" width="120" show-overflow-tooltip />
          <el-table-column label="次数" prop="deptName" show-overflow-tooltip />
        </el-table>
      </div> -->
      <div class="content" style="flex: 14">
        <el-table
          :data="tableList"
          border
          style="width: 100%; height: calc(100% - 4px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
        >
          <!-- 选择 -->
          <!-- <el-table-column type="selection" width="40" /> -->
          <el-table-column label="体检项目" prop="item" width="120" show-overflow-tooltip />
          <el-table-column label="自费标志" prop="deptName" show-overflow-tooltip />
          <el-table-column label="体检科室" prop="extDept" show-overflow-tooltip />
          <el-table-column label="指引单分类" prop="extDept" show-overflow-tooltip />
          <el-table-column label="完成标志" prop="extDept" show-overflow-tooltip />
          <el-table-column label="体检医生" prop="extDept" show-overflow-tooltip />
          <el-table-column label="体检日期" prop="extDept" show-overflow-tooltip />
          <!-- <el-table-column label="次数" prop="extDept" show-overflow-tooltip /> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// ===================== 响应式数据 =====================
const radio = ref(1)
const tableList = ref([
  { item: '分类1', deptName: '科室1', extDept: '外部科室1' },
  { item: '分类2', deptName: '科室2', extDept: '外部科室2' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' },
  { item: '分类3', deptName: '科室3', extDept: '外部科室3' }
])
</script>

<style lang="scss" scoped>
.base-setting {
  // background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // padding: 40px 8px 0;
  box-sizing: border-box;
}
:deep(.el-table) {
  font-size: 14px;
}
.base-title {
  padding: 0 20px;
  color: #3473d1;
  font-size: 16px;
  height: 29px;
  line-height: 29px;
  position: relative;
  font-weight: 700;
  border-bottom: 1px solid #c5dcff;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    // height: 2px;
    // background-color: #3473d1;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
.base-cont {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  gap: 15px;
  padding: 4px;

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
:deep(.el-transfer) {
  .el-transfer-panel {
    width: 40%;
    box-sizing: border-box;
  }

  .el-transfer__buttons {
    // display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
}
// --------------------------
.custom-transfer {
  display: flex;
  height: 400px;
  border: 1px solid #e4e7ed;
  padding: 10px;
  background-color: #f5f7fa;
}

.transfer-panel {
  flex: 1;
  background-color: white;
  margin: 0 5px;
  padding: 10px;
  border-radius: 4px;
  overflow-y: auto;
}

.transfer-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.list {
  max-height: 300px;
  overflow-y: auto;
}

.item {
  padding: 5px 10px;
}

.content {
  background-color: #fff;
  height: 100%;
  width: 100%;
  // padding: 0 8px 8px;
  overflow: auto;
}
:deep(.el-tabs--top .el-tabs__header) {
  margin-bottom: 0 !important;
}

.base-btn {
  display: flex;
  width: calc(100% - 20px);
  justify-content: center;
  align-items: center;
  height: 65px;
  background-color: #fff;
  .btn-box {
    width: 122px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #3473d1;
    color: #fff;
    cursor: pointer;
  }
}
</style>
