<template>
  <div class="app-container">
    <content-wrap>
      <!-- 搜索工作栏 -->
      <el-row :gutter="20">
        <!--部门数据-->
        <el-col :span="3" :xs="24">
          <UserDeptTree @node-click="handleDeptNodeClick" />
        </el-col>
        <!--用户数据-->
        <el-col :span="21" :xs="24">
          <el-form :model="queryParams" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item>
              <el-button type="primary" plain @click="handleAdd"
                ><Icon icon="ep:plus" />新增</el-button
              >
              <el-button type="warning" @click="handleExport" :loading="exportLoading"
                ><Icon icon="ep:download" />导出</el-button
              >
            </el-form-item>
          </el-form>

          <el-table
            v-loading="loading"
            :data="deptList"
            border
            highlight-current-row
            stripe
            style="width: 100%; height: calc(100vh - 180px)"
          >
            <el-table-column label="序号" align="center" prop="serialNo" width="70" />
            <el-table-column
              label="科室代码"
              prop="deptCode"
              :show-overflow-tooltip="true"
              width="120"
            />
            <el-table-column
              label="科室名称"
              prop="deptName"
              :show-overflow-tooltip="true"
              width="auto"
            />
            <el-table-column
              label="科室简称"
              prop="deptAlias"
              :show-overflow-tooltip="true"
              width="150"
            />
            <el-table-column
              label="临床科室属性"
              align="center"
              prop="clinicAttr"
              :show-overflow-tooltip="true"
              width="120"
              ><template #default="scope">
                <span>{{
                  clinicAttrList.find((item) => item.clinicAttrCode == scope.row.clinicAttr)
                    ?.clinicAttrName
                }}</span>
              </template></el-table-column
            >
            <el-table-column label="门诊住院属性" align="center" prop="outpOrInp" width="120"
              ><template #default="scope">
                <span>{{
                  outpOrInpList.find((user) => user.oiAttrCode == scope.row.outpOrInp)?.oiAttrName
                }}</span>
              </template></el-table-column
            >
            <el-table-column label="内外科标志" align="center" prop="internalOrSergery" width="120"
              ><template #default="scope">
                <span>{{
                  internalOrSergeryList.find((int) => int.isAttrCode == scope.row.internalOrSergery)
                    ?.isAttrName
                }}</span>
              </template></el-table-column
            >
            <el-table-column label="摆药属性" align="center" prop="dispensingCumulate" width="120">
              <template #default="scope">
                <span>{{
                  scope.row.dispensingCumulate == 1
                    ? '是'
                    : scope.row.dispensingCumulate == 0
                    ? '否'
                    : ''
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="虚拟药柜"
              align="center"
              prop="virtualCabinet"
              width="120"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <span>{{
                  scope.row.virtualCabinet == 1 ? '是' : scope.row.virtualCabinet == 0 ? '否' : ''
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="拼音码"
              prop="inputCode"
              width="120"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="部门详细说明"
              prop="deptDesc"
              width="180"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="操作"
              align="center"
              width="160"
              class-name="small-padding fixed-width"
            >
              <template #default="scope">
                <div class="flex justify-center items-center">
                  <el-button type="primary" link @click.stop="handleUpdate(scope.row)"
                    ><Icon icon="ep:edit" class="mr-1px" />修改</el-button
                  >
                  <el-button type="danger" link @click.stop="handleDelete(scope.row)"
                    ><Icon icon="ep:delete" class="mr-1px" />删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </content-wrap>
    <!-- 添加或修改科室对话框 -->
    <deptComp
      ref="deptCompRef"
      :clinicAttrList="clinicAttrList"
      :outpOrInpList="outpOrInpList"
      :internalOrSergeryList="internalOrSergeryList"
      :deptCode="queryParams.deptCode"
      @success="getList"
    />
  </div>
</template>

<script setup lang="ts">
import download from '@/utils/download'
import {
  queryDictByConfig,
  delDeptInfo,
  exportDeptInfo,
  deptTreeListLevelNext
} from '@/api/system/deptManage'
import deptComp from './components/deptComp.vue'
import UserDeptTree from './components/UserDeptTree.vue'
const message = useMessage() // 消息弹窗
const queryParams = reactive({
  deptCode: ''
})
// ========== 初始化 ==========
const showSearch = ref(true)
const clinicAttrList = ref<any>([])
const outpOrInpList = ref<any>([])
const internalOrSergeryList = ref<any>([])
// 用户列表
const deptList = ref<any>([])
const loading = ref(false)
onMounted(async () => {
  clinicAttrList.value = await queryDictByConfig({
    dictType: '科室临床属性字典'
  })
  outpOrInpList.value = await queryDictByConfig({
    dictType: '科室门诊住院属性字典'
  })
  internalOrSergeryList.value = await queryDictByConfig({
    dictType: '科室内外科属性字典'
  })
  await getList()
})
const handleDeptNodeClick = async (row: { [key: string]: any }) => {
  queryParams.deptCode = String(row.id)
  getList()
}

/* 查询列表 */
const getList = () => {
  if (queryParams.deptCode) {
    loading.value = true
    deptTreeListLevelNext({ ...queryParams }).then((response) => {
      deptList.value = response
      loading.value = false
    })
  }
}

// 添加或编辑
const deptCompRef = ref()
// 添加用户
const handleAdd = () => {
  deptCompRef.value?.openForm()
}

// 用户导出
const exportLoading = ref(false)
const handleExport = () => {
  message
    .confirm('是否确认导出所有科室数据项?')
    .then(async () => {
      // 处理查询参数
      let params = { deptCode: '*' }
      exportLoading.value = true
      const response = await exportDeptInfo(params)
      download.excel(response, '科室数据.xlsx')
    })
    .catch(() => {})
    .finally(() => {
      exportLoading.value = false
    })
}

// 具体数据单行操作
/** 修改按钮操作 */
const handleUpdate = (row: any) => {
  deptCompRef.value?.openForm(row)
}

// 删除用户
const handleDelete = (row: any) => {
  if (row.chidrenCounts && row.chidrenCounts > 0) {
    message.warning('该科室下存在子科室不能删除，请先删除子科室')
    return false
  }
  message
    .confirm('是否确认删除科室名称为"' + row.deptName + '"的数据项?')
    .then(async () => {
      await delDeptInfo([row])
      message.success('删除成功')
      getList()
    })
    .catch((e) => {
      console.error(e)
    })
}
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
}
</style>
