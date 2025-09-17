<template>
  <div class="app-container">
    <content-wrap>
      <!-- 搜索工作栏 -->
      <el-row :gutter="20">
        <!--用户数据-->
        <el-col :span="12" :xs="24">
          <el-form
            :model="queryParams"
            ref="queryFormRef"
            :inline="true"
            v-show="showSearch"
            label-width="68px"
          >
            <el-form-item label="组类">
              <el-select v-model="queryParams.serialNo" placeholder="请选择" @change="changeHandle">
                <el-option
                  v-for="item in groupClassOptions"
                  :key="item.serialNo"
                  :label="item.groupClass"
                  :value="item.serialNo"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="handleAdd"
                ><Icon icon="ep:plus" />新增</el-button
              >
            </el-form-item>
          </el-form>

          <el-table
            v-loading="loading"
            :data="groupList"
            border
            style="width: 80%; height: calc(-180px + 100vh); overflow: auto"
            highlight-current-row
            stripe
          >
            <el-table-column label="组名" prop="groupName" :show-overflow-tooltip="true" />
            <el-table-column label="组代码" prop="groupCode" :show-overflow-tooltip="true" />
            <el-table-column
              label="操作"
              align="center"
              width="160"
              class-name="small-padding fixed-width"
            >
              <template #default="scope">
                <div class="flex justify-center items-center">
                  <el-button type="danger" link @click="handleDelete(scope.row)"
                    ><Icon icon="ep:delete" class="mr-1px" />删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </content-wrap>
    <GroupClassForm
      ref="groupClassFormRef"
      :groupClass="queryParams.groupClass"
      @success="getList"
    />
  </div>
</template>

<script setup lang="ts" name="User">
import {
  queryStaffGroupClassInfo,
  queryDeptGroupInfo,
  delDeptGroupInfo
} from '@/api/system/deptManage'
import GroupClassForm from './components/GroupClassForm.vue'
const message = useMessage() // 消息弹窗

const queryParams = reactive({
  serialNo: 0,
  groupClass: ''
})
const showSearch = ref(true)

// 用户列表
const groupList = ref<any>([])
const loading = ref(false)
/* 查询列表 */
const getList = () => {
  loading.value = true
  queryDeptGroupInfo(queryParams).then((response) => {
    groupList.value = response
    loading.value = false
  })
}
/** 下拉列表切换 */
const changeHandle = () => {
  queryParams.groupClass = groupClassOptions.value.find(
    (option) => option.serialNo == queryParams.serialNo
  )?.groupClass
  getList()
}

/** 重置按钮操作 */
const queryFormRef = ref()

// 添加或编辑
const groupClassFormRef = ref()
// 添加用户
const handleAdd = () => {
  groupClassFormRef.value?.openForm()
}

// 删除用户
const handleDelete = (row: any) => {
  message
    .confirm('是否确认删除组名称为"' + row.groupName + '"的数据项?')
    .then(async () => {
      await delDeptGroupInfo([row])
      message.success('删除成功')
      getList()
    })
    .catch((e) => {
      console.error(e)
    })
}

// 查询组类列表
const getGroupClass = async () => {
  groupClassOptions.value = await queryStaffGroupClassInfo({})
  queryParams.serialNo = groupClassOptions.value[0].serialNo
  changeHandle()
}
// ========== 初始化 ==========
const groupClassOptions = ref<any>([])
onMounted(async () => {
  getGroupClass()
})
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  background: #fff;
}
</style>
