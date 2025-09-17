<template>
  <div class="base-setting" style="height: calc(100vh - 239px)">
    <div class="base-box mb-8px" style="background-color: #fff; height: 80px">
      <!-- <div class="base-title mb-2px">组合详情</div> -->

      <div class="base-cont">
        <span class="cont-span">单位名称:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">联系人:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">电话:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">编制数:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">体检类别:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
      </div>
      <div class="base-cont">
        <span class="cont-span">单位类别:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">单位地址:</span>
        <el-input style="width: 12vw" v-model="certName" placeholder="请输入" class="select-item" />
        <span class="cont-span">体检日期:</span>
        <el-date-picker
          v-model="startDate"
          style="width: 12vw; display: inline-flex"
          value-format="YYYY-MM-DD"
          type="date"
          ref="appiontStartDateRef"
          placeholder="请选择"
        />
        <span class="ml-6px mr-6px">至</span>
        <el-date-picker
          v-model="endDate"
          style="width: 12vw; display: inline-flex"
          value-format="YYYY-MM-DD"
          type="date"
          ref="appiontStartDateRef"
          placeholder="请选择"
        />
        <el-button type="primary" @click="handleSaveDocument">查看</el-button>
      </div>
    </div>
    <div style="width: 100%; height: calc(100% - 0px); background-color: pink">
      <div class="content">
        <el-table
          :data="tableList"
          border
          class="mt-6px"
          style="width: 100%; height: calc(100% - 104px); min-height: 300px; overflow: auto"
          highlight-current-row
          stripe
        >
          <!-- 选择 -->
          <el-table-column type="selection" width="40" />
          <el-table-column label="体检号" prop="item" width="120" show-overflow-tooltip />
          <el-table-column label="次数" prop="deptName" show-overflow-tooltip />
          <el-table-column label="姓名" prop="extDept" show-overflow-tooltip />
          <el-table-column label="年龄" prop="extDept" show-overflow-tooltip />
          <el-table-column label="体检日期" prop="extDept" show-overflow-tooltip />
          <el-table-column label="婚姻" prop="extDept" show-overflow-tooltip />
          <el-table-column label="职务" prop="extDept" show-overflow-tooltip />
          <el-table-column label="出生日期" prop="extDept" show-overflow-tooltip />
          <el-table-column label="结算标志" prop="extDept" show-overflow-tooltip />
          <el-table-column label="预约人员" prop="extDept" show-overflow-tooltip />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getSystemDateTime } from '@/api/allProcess/index'
import { formatDate } from '@/utils/formatTime'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const startDate = ref('')
const endDate = ref('')
onMounted(async () => {
  let res = await getSystemDateTime()
  startDate.value = formatDate(res, 'YYYY-MM-DD')
  endDate.value = formatDate(res, 'YYYY-MM-DD')
})
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
.base-title1 {
  padding: 0 0px;
  color: #3473d1;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  position: relative;
  font-weight: 700;
  // border-bottom: 1px solid #c5dcff;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 2px;
    // background-color: #3473d1;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
</style>
