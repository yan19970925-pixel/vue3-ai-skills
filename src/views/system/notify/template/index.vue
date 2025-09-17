<template>
  <!-- 搜索工作栏 -->
  <ContentWrap style="padding-top: 34px">
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="模版编码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入用户编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="模板名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入模板名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable class="!w-240px">
          <el-option
            v-for="dict in getBoolDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['system:notify-template:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>
  <!-- 列表 -->
  <content-wrap>
    <el-table v-loading="loading" :data="list" style="position: relative; top: -20px">
      <el-table-column label="模版编码" align="center" prop="code" />
      <el-table-column label="模板名称" align="center" prop="name" />
      <el-table-column label="发件人名称" align="center" prop="nickname" />
      <el-table-column label="类型" align="center" prop="type">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column
        label="模版内容"
        align="center"
        prop="content"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
        :formatter="dateFormatter"
      />
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="handleSendNotify(scope.row)"
            v-hasPermi="['system:notify-template:send-notify']"
          >
            测试
          </el-button>
          <el-button
            link
            type="primary"
            v-hasPermi="['system:notify-template:update']"
            @click="openForm('update', scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="primary"
            v-hasPermi="['system:notify-template:query']"
            @click="handleDetail(scope.row)"
          >
            详情
          </el-button>
          <el-button
            link
            type="danger"
            v-hasPermi="['system:notify-template:delete']"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </content-wrap>
  <!-- 表单弹窗：添加/修改 -->
  <TemplateForm ref="formRef" @success="getList" />

  <!-- 表单弹窗：详情 -->
  <TemplateDetail ref="detailRef" />
  <!-- 表单弹窗：详情 -->
  <SendTestForm ref="testRef" />
</template>
<script setup lang="ts" name="NotifyTemplate">
import { DICT_TYPE, getBoolDictOptions } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import * as NotifyTemplateApi from '@/api/system/notify/template'
import TemplateForm from './TemplateForm.vue'
import TemplateDetail from './TemplateDetail.vue'
import SendTestForm from './SendTestForm.vue'
const message = useMessage() // 消息弹窗
const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  code: '',
  name: '',
  status: '',
  pageNo: 1,
  pageSize: 10,
  createTime: []
})

const queryFormRef = ref() // 搜索的表单
const tableRef = ref() // 表格的 Ref

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 测试 */
const testRef = ref()
const handleSendNotify = (row: any) => {
  console.log('=row=', row)
  testRef.value.open(row)
  // sendForm.value.content = row.content
  // sendForm.value.params = row.params
  // sendForm.value.templateCode = row.code
  // sendForm.value.templateParams = row.params.reduce(function (obj, item) {
  //   obj[item] = undefined
  //   return obj
  // }, {})
  // sendRules.value.templateParams = row.params.reduce(function (obj, item) {
  //   obj[item] = { required: true, message: '参数 ' + item + ' 不能为空', trigger: 'change' }
  //   return obj
  // }, {})
  // sendVisible.value = true
}

/** 详情操作 */
const detailRef = ref()
const handleDetail = async (data: NotifyTemplateApi.NotifyTemplateVO) => {
  detailRef.value.open(data)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await NotifyTemplateApi.deleteNotifyTemplate(id)
    message.success('删除成功')
    // 刷新列表
    await getList()
  } catch {}
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await NotifyTemplateApi.getNotifyTemplatePage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  tableRef.value.clearSelection()
  handleQuery()
}

// ========== 初始化 ==========
onMounted(() => {
  getList()
})
</script>
