<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="用户编号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-180px"
        />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select
          v-model="queryParams.userType"
          placeholder="请选择用户类型"
          clearable
          class="!w-150px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.USER_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="应用名" prop="applicationName" label-width="54px">
        <el-input
          v-model="queryParams.applicationName"
          placeholder="请输入应用名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-200px"
        />
      </el-form-item>
      <el-form-item label="异常时间" prop="exceptionTime">
        <el-date-picker
          v-model="queryParams.exceptionTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-360px"
        />
      </el-form-item>
      <el-form-item label="处理状态" prop="processStatus">
        <el-select
          v-model="queryParams.processStatus"
          placeholder="请选择处理状态"
          clearable
          class="!w-150px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['infra:api-error-log:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button type="success" plain @click="qushituQuery"> 趋势图</el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap style="position: relative; top: -10px">
    <el-table v-loading="loading" :data="list" border style="height: calc(100vh - 200px)">
      <el-table-column label="日志编号" align="center" prop="id" width="120" />
      <el-table-column label="用户编号" align="center" prop="userId" width="120" />
      <el-table-column label="用户类型" align="center" prop="userType" width="120">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.USER_TYPE" :value="scope.row.userType" />
        </template>
      </el-table-column>
      <el-table-column label="应用名" align="center" prop="applicationName" width="180" />
      <el-table-column label="请求方法" align="center" prop="requestMethod" width="90" />
      <el-table-column label="请求地址" prop="requestUrl" />
      <el-table-column
        label="异常发生时间"
        align="center"
        prop="exceptionTime"
        width="180"
        :formatter="dateFormatter"
      />
      <el-table-column label="异常名" prop="exceptionName" />
      <el-table-column label="处理状态" align="center" prop="processStatus" width="100">
        <template #default="scope">
          <dict-tag
            :type="DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS"
            :value="scope.row.processStatus"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openDetail(scope.row)"
            v-hasPermi="['infra:api-error-log:query']"
          >
            详细
          </el-button>
          <el-button
            link
            type="primary"
            v-if="scope.row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT"
            @click="handleProcess(scope.row.id, InfraApiErrorLogProcessStatusEnum.DONE)"
            v-hasPermi="['infra:api-error-log:update-status']"
          >
            已处理
          </el-button>
          <el-button
            link
            type="primary"
            v-if="scope.row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT"
            @click="handleProcess(scope.row.id, InfraApiErrorLogProcessStatusEnum.IGNORE)"
            v-hasPermi="['infra:api-error-log:update-status']"
          >
            已忽略
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：详情 -->
  <ApiErrorLogDetail ref="detailRef" />
  <Dialog
    :fullscreen="false"
    v-model="showAudit"
    title="错误日志趋势图"
    width="1200"
    class="auditDialog"
  >
    <div ref="rizhishuRef" style="width: 1160px; height: 500px"></div>
  </Dialog>
</template>

<script setup lang="ts" name="ApiErrorLog">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as ApiErrorLogApi from '@/api/infra/apiErrorLog'
import ApiErrorLogDetail from './ApiErrorLogDetail.vue'
import { InfraApiErrorLogProcessStatusEnum } from '@/utils/constants'
import { formatDate } from '@/utils/formatTime'
import * as echarts from 'echarts'
const message = useMessage() // 消息弹窗

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 30,
  userId: null,
  userType: null,
  applicationName: null,
  requestUrl: null,
  processStatus: null,
  exceptionTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询参数列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ApiErrorLogApi.getApiErrorLogPage(queryParams)
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
  handleQuery()
}

/** 详情操作 */
const detailRef = ref()
const openDetail = (data: ApiErrorLogApi.ApiErrorLogVO) => {
  detailRef.value.open(data)
}

/** 处理已处理 / 已忽略的操作 **/
const handleProcess = async (id: number, processStatus: number) => {
  try {
    // 操作的二次确认
    const type = processStatus === InfraApiErrorLogProcessStatusEnum.DONE ? '已处理' : '已忽略'
    await message.confirm('确认标记为' + type + '?')
    // 执行操作
    await ApiErrorLogApi.updateApiErrorLogPage(id, processStatus)
    await message.success(type)
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ApiErrorLogApi.exportApiErrorLog(queryParams)
    download.excel(data, '异常日志.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  let endDate = formatDate(
    new Date(formatDate(new Date(), 'YYYY-MM-DD') + ' 23:59:59'),
    'YYYY-MM-DD HH:mm:ss'
  )
  let startDate = formatDate(
    new Date(formatDate(new Date(), 'YYYY-MM-DD') + ' 00:00:00'),
    'YYYY-MM-DD HH:mm:ss'
  )
  queryParams.exceptionTime = [startDate, endDate]
  getList()
})
const showAudit = ref(false)
const rizhishuRef = ref()
const qushituQuery = async () => {
  let res = await ApiErrorLogApi.queryApiErrorLogTrend(queryParams)
  if (res && res.length > 0) {
    showAudit.value = true
    let dateArr = []
    let rizhiArr = []
    res.forEach((item) => {
      dateArr.push(item.exceptionDate)
      rizhiArr.push(item.exceptionCount)
    })
    nextTick(() => {
      drawrizhishuChart(dateArr, rizhiArr)
    })
  }
}
const drawrizhishuChart = (dateArr, rizhiArr) => {
  if (rizhishuRef.value) {
    const chartInstance = echarts.init(rizhishuRef.value)
    const option: echarts.EChartsOption = {
      title: {
        text: '错误日志数'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['错误日志数']
      // },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateArr,
        axisLabel: { interval: 0, rotate: 60 },
        axisTick: {
          show: true, // 显示刻度线
          lineStyle: {
            type: 'dashed',
            color: '#EDEDED'
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          name: '错误日志数',
          type: 'line',
          data: rizhiArr,
          lineStyle: {
            color: '#273CF2'
          }
        }
      ]
    }

    chartInstance.setOption(option)
  }
}
</script>
<style scoped>
:deep(.el-form--inline .el-form-item) {
  margin-right: 16px !important;
}
</style>
