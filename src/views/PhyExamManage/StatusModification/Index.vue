<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="search1">
          <div class="div1">
            <span class="span1">体检号：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="ExaminePatListInfo.peId"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
            <span class="span1">姓名：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="ExaminePatListInfo.name"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
            <span class="span1">次数：</span>
            <el-input
              style="width: 70px"
              v-model="ExaminePatListInfo.peVisitId"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
          </div>
          <div class="div1">
            <span class="span1">单位编码：</span>
            <el-input
              style="width: 100px; margin-right: 12px"
              v-model="ExaminePatListInfo.unitCode"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
          </div>
          <div class="div1">
            <span class="span1">预约时间区间：</span>
            <el-date-picker
              type="date"
              style="display: flex; width: 160px"
              v-model="ExaminePatListInfo.startDate"
              value-format="YYYY-MM-DD"
              @change="getPePatList"
            />
            <span class="ml-6px mr-6px">至</span>
            <el-date-picker
              type="date"
              style="display: flex; width: 160px"
              v-model="ExaminePatListInfo.endDate"
              value-format="YYYY-MM-DD"
              @change="getPePatList"
            />
          </div>
          <div class="div1">
            <span>状态：</span>
            <el-select
              v-model="ExaminePatListInfo.resultStatus"
              placeholder="请选择"
              style="width: 120px"
              filterable
              clearable
              default-first-option
              @change="getPePatList"
            >
              <el-option label="已预约" value="0" />
              <el-option label="已执行" value="1" />
              <el-option label="待审核" value="2" />
              <!-- <el-option label="已分科审核" value="5" /> -->
              <el-option label="已初步审核" value="7" />
              <el-option label="已最终审核" value="9" />
              <el-option label="非正常结束" value="A" />
              <el-option label="体检挂起" value="P" />
            </el-select>
          </div>
          <div class="div1">
            <el-button @click="getPePatList">查询 </el-button>
          </div>
        </div>
      </div>
      <div class="export">
        <div class="list_table">
          <el-table
            :data="filteredTableData"
            style="width: 100%"
            height="calc(100vh - 195px)"
            border
            ref="multipleTableRef"
            highlight-current-row
            @row-click="showDetail"
            :row-class-name="setAssemRowClassName"
          >
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <template #default="{ row }" v-if="item.prop == 'resultStatus'">
                <span v-if="row.resultStatus == '0'">已预约</span>
                <span v-if="row.resultStatus == '1'">已执行</span>
                <span v-if="row.resultStatus == '2'">待审核</span>
                <span v-if="row.resultStatus == '5'">已分科审核</span>
                <span v-if="row.resultStatus == '7'">已初步审核</span>
                <span v-if="row.resultStatus == '9'">已最终审核</span>
                <span v-if="row.resultStatus == 'A'">非正常结束</span>
                <span v-if="row.resultStatus == 'P'">体检挂起</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="survey">
          <el-table :data="detailTableData" style="width: 100%" border height="calc(100vh - 195px)">
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column prop="peId" label="体检号" width="120" align="center" />
            <el-table-column prop="peVisitId" label="体检次数" width="100" align="center" />
            <el-table-column
              prop="itemAssemName"
              label="项目组合"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="finishStatus" label="完成情况" width="100" align="center">
              <template #default="scope">
                <span :style="{ color: scope.row.finishedSign === '完成' ? 'green' : 'orange' }">
                  {{ scope.row.finishedSign }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="doctor" label="检查医生" width="100" align="center" />
            <el-table-column prop="peDeptName" label="检查科室" width="120" align="center" />
            <el-table-column prop="applyNo" label="申请单号" width="" align="center" />
            <el-table-column label="修改完成状态" width="120" align="center">
              <template #default="scope">
                <el-button type="primary" size="small" @click="changeFinishStatus(scope.row)">
                  修改
                </el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="取消分科审核" width="120" align="center">
              <template #default="scope">
                <el-button type="danger" size="small" @click="cancelDeptAudit(scope.row)">
                  取消
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import {} from '@/api/PerPhyExamination/PerExport/index'
import * as Api from '@/api/PerPhyExamination/geTrage/index'
import { formatDate } from '@/utils/formatTime'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const dbUser = userStore.getUser.username
const ExaminePatListInfo = ref({
  startDate: formatDate(new Date(), 'YYYY-MM-DD'),
  endDate: formatDate(new Date(), 'YYYY-MM-DD'),
  resultStatus: '2',
  queueStartDate: '',
  queueEndDate: '',
  peId: '',
  peVisitId: '',
  joinUnit: '',
  unitCode: '',
  unitVisitId: '',
  name: ''
})
const personList = ref([
  {
    label: '审核状态',
    prop: 'resultStatus',
    align: 'center',
    width: 110
  },
  {
    label: '体检号',
    prop: 'peId',
    align: 'center',
    width: 120
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center'
  },
  {
    label: '性别',
    prop: 'sex',
    align: 'center',
    width: 80
  },
  {
    label: '次数',
    prop: 'peVisitId',
    align: 'center',
    width: 80
  },
  // {
  //   label: '报到日期',
  //   prop: 'peQueueDate',
  //   align: 'left'
  // },
  {
    label: '体检日期',
    // prop: 'pePreDate',
    prop: 'peQueueDate',
    align: 'center',
    width: 120
  }
])
const filteredTableData = ref<any>([])
// 个人体检-主检医生审核-提取人员
const getPePatList = async () => {
  const params = { ...ExaminePatListInfo.value }
  await Api.getPePatList(params).then((res) => {
    filteredTableData.value = res
    showDetail(res[0])
  })
  // detailTableData.value = []
}
const detailTableData = ref([])
const itemDetail = ref({})
// 显示详情弹窗
const showDetail = async (row) => {
  itemDetail.value = row
  await Api.getSelectedDept({ dbUser: dbUser })
    .then((res) => {
      let peDeptCode = []
      if (res && res.length > 0) {
        res.forEach((item) => {
          peDeptCode.push(item.peDeptCode)
        })
      } else {
        peDeptCode = []
      }
      const getDetailTableDataParams = reactive({
        peId: row.peId || '',
        peVisitId: row.peVisitId || 0,
        pePreDate: row.pePreDate || row.peQueueDate || '',
        peDeptCodeArray: peDeptCode
      })
      Api.updateFinishedSignList(getDetailTableDataParams).then((res) => {
        detailTableData.value = res
      })
    })
    .catch((err) => {})
}
// 修改完成状态方法（暂时为空）
const changeFinishStatus = async (row) => {
  console.log('修改完成状态:', row)
  await Api.updateFinishedSign(row).then((res) => {
    if (res) {
      ElMessage.success('修改成功')
      showDetail(itemDetail.value)
    }
  })
}

// 取消分科审核方法（暂时为空）
const cancelDeptAudit = async (row) => {
  console.log('取消分科审核:', row)
  await Api.cancleCbAuditDept(row).then((res) => {
    if (res) {
      ElMessage.success('取消成功')
    }
  })
}
const setAssemRowClassName = ({ row }) => {
  if (row.peId === itemDetail.value.peId && row.peVisitId === itemDetail.value.peVisitId) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
onMounted(() => {
  getPePatList()
})
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #edf1fc;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 8px;
  box-sizing: border-box;
  .base-box {
    .search1 {
      padding: 16px 24px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      .div1 {
        margin-right: 12px;
        display: flex;
        align-items: center;
        .span1 {
          color: #333333;
          font-size: 14px;
          display: inline-block;
        }
        .el-button {
          background-color: #3473d1;
          color: #fff;
          padding: 0% 24px;
          border-color: #3473d1;
        }
        .read {
          color: #3473d1;
          border-color: #3473d1;
          background-color: #fff;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
        .deltrage {
          color: #ed2226;
          border-color: #ed2226;
          background-color: #fff;
        }
      }
    }
  }
  .export {
    display: flex;
    justify-content: space-between;
    .list_table {
      width: 29.8%;
      background: #fff;
      padding: 10px;
      height: 100%;
    }
    .survey {
      width: 69.8%;
      padding: 10px;
      background: #fff;
      .survey_con {
        .pat_msg {
          width: 100%;
          display: flex;
          height: 36px;
          align-items: center;
          font-size: 16px;
          span {
            margin-left: 40px;
            color: #3473d1;
          }
        }
        .survey_title {
          width: 100%;
          font-size: 30px;
          line-height: 50px;
          text-align: center;
          font-weight: bold;
        }
        .survey_tcon {
          width: 100%;
          padding-left: 40px;
          font-size: 16px;
          height: calc(100vh - 320px);
          overflow-y: auto;
          .survey_name {
            font-weight: bold;
            line-height: 30px;
          }
          .survey_answer {
            margin-left: 20px;
          }
        }
        .save {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          .btn {
            background: #3473d1;
            color: #fff;
            border-color: #3473d1;
          }
        }
      }
    }
  }
}
</style>
