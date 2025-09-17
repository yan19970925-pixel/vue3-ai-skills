<template>
  <div class="app-container">
    <div class="pl-15px pr-15px">
      <!-- 搜索工作栏 -->
      <div class="mt-12px mb-12px">
        <span>检索病区：</span>
        <el-input
          v-model="queryParams.keyWord"
          placeholder="请输入病区名称"
          clearable
          style="width: 240px; margin-left: 12px; margin-right: 15px"
          @input="handleQuery"
        />
        <el-button type="primary" plain @click="handleQuery"
          ><Icon icon="ep:search" />查询</el-button
        >
        <el-button @click="handleCreat" style="color: #3473d1; border: 1px solid #3473d1"
          >一键生成</el-button
        >
        <el-button type="primary" plain @click="handleAdd"><Icon icon="ep:plus" />新增</el-button>
        <el-button @click="resetQuery" style="color: #3473d1; border: 1px solid #3473d1"
          ><Icon icon="ep:refresh" />刷新</el-button
        >
      </div>
      <el-table
        v-loading="loading"
        :data="deptWardList"
        border
        highlight-current-row
        stripe
        style="width: 60%; height: calc(-160px + 100vh); overflow: auto"
      >
        <el-table-column
          label="病区代码"
          prop="deptCode"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          label="病区名称"
          prop="deptName"
          :show-overflow-tooltip="true"
          width="aoto"
        />
        <el-table-column
          label="护理单元代码"
          prop="wardCode"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          label="护理单元名称"
          prop="wardName"
          :show-overflow-tooltip="true"
          width="aoto"
        />
        <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <div class="flex justify-center items-center">
              <el-button type="primary" link @click="handleUpdate(scope.row)"
                ><Icon icon="ep:edit" class="mr-1px" />修改</el-button
              >
              <el-button type="danger" link @click="handleDelete(scope.row)"
                ><Icon icon="ep:delete" class="mr-1px" />删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加或修改用户对话框 -->
    <DeptWardForm ref="deptWardFormRef" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { queryDeptVsWardInfo, genDeptVsWard, delDeptVsWardInfo } from '@/api/system/deptManage'
import DeptWardForm from './components/DeptWardForm.vue'
const message = useMessage() // 消息弹窗

const queryParams = reactive({
  keyWord: ''
})

// 用户列表
const deptWardList = ref<any[]>([])
const loading = ref(false)
/* 查询列表 */
const getList = () => {
  loading.value = true
  queryDeptVsWardInfo(queryParams).then((response) => {
    deptWardList.value = response
    loading.value = false
  })
}
/** 搜索按钮操作 */
const handleQuery = () => {
  getList()
}

const resetQuery = () => {
  queryParams.keyWord = ''
  handleQuery()
}

// 一键生成
const handleCreat = async () => {
  await genDeptVsWard({})
  getList()
}

// 添加或编辑
const deptWardFormRef = ref()
// 添加用户
const handleAdd = () => {
  deptWardFormRef.value?.openForm()
}

// 具体数据单行操作
/** 修改按钮操作 */
const handleUpdate = (row: any) => {
  deptWardFormRef.value?.openForm(row)
}

// 删除用户
const handleDelete = (row: any) => {
  message
    .confirm('是否确认删除病区名称为"' + row.deptName + '"的数据项?')
    .then(async () => {
      await delDeptVsWardInfo(row)
      message.success('删除成功')
      getList()
    })
    .catch((e) => {
      console.error(e)
    })
}

// ========== 初始化 ==========
onMounted(async () => {
  getList()
})
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  font-size: 14px;
  background-color: #fff;
}
</style>
