<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1" style="padding-bottom: 6px">
        <div class="div1">
          <span class="span1">预约时间区间：</span>
          <!-- format="YYYY-MM-DD" -->
          <el-date-picker
            v-model="time"
            value-format="YYYY-MM-DD"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="!w-230px"
            clearable
            :default-time="[
              formatDate(new Date(), 'YYYY-MM-DD'),
              formatDate(new Date(), 'YYYY-MM-DD')
            ]"
          />
        </div>
        <!-- <div class="div1">
          <el-button @click="selectPeVisitList">提取</el-button>
        </div> -->
        <div class="div1">
          <span class="span1">单位代码：</span>
          <el-input
            style="width: 80px"
            v-model="visitListInfo.unitCode"
            placeholder="请输入"
            class="select-item"
            clearable
          />
          <span class="selectBtn">
            <el-button :icon="Search" @click="onFocusUnitCode()" />
          </span>
          <!-- <el-input
            style="width: 130px"
            v-model="code"
            placeholder="请输入"
            class="select-item"
            clearable
          /> -->
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 80px"
            v-model="visitListInfo.unitVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">部门：</span>
          <el-input
            style="width: 130px"
            v-model="code"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>

        <div class="div1">
          <span class="span1" style="text-align: right">体检号：</span>
          <el-input
            style="width: 130px"
            v-model="visitListInfo.peId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">姓名：</span>
          <el-input
            style="width: 130px"
            v-model="visitListInfo.name"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span><b style="color: #ed2226">*</b>体检类型：</span>
          <el-select
            v-model="visitListInfo.peTypeName"
            placeholder="体检类型"
            style="width: calc(100% - 100px)"
            class="select-item"
            filterable
            default-first-option
            @change="changePeType(visitListInfo.peTypeName)"
          >
            <el-option
              v-for="item in petypeNameList"
              :key="item.keyCode"
              :label="item.keyValue"
              :value="item.keyValue"
            />
          </el-select>
        </div>
      </div>
      <div class="search1" style="padding-top: 6px">
        <div class="div1">
          <el-button @click="selectPeVisitList">查询</el-button>
        </div>
        <div class="div1">
          <el-button @click="selectPeVisitList('all')">查询所有未报到</el-button>
        </div>
        <div class="div1">
          <!-- <el-button class="read" @click="print"> <img :src="dayin" />打印 </el-button> -->
          <!-- <el-button class="read" @click="readIdCard"> <img :src="readCard" />读卡 </el-button> -->
          <el-button class="read" @click="peCheckIn"> <img :src="report" />报到 </el-button>
          <el-button class="read" @click="canclePeCheckIn">
            <img :src="noReport" />取消报到
          </el-button>
          <el-button class="delReport" @click="deleteAppoint">删除预约</el-button>
        </div>
      </div>
    </div>
    <div class="report_table">
      <div class="table_item">
        <div class="heard_title">
          <span>人员列表</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; padding: 0 8px; margin-top: 10px"
          height="calc(100vh - 270px)"
          border
          @row-click="clickRow"
          highlight-current-row
        >
          <!-- :row-class-name="setRowClassName" -->
          <el-table-column
            v-for="item in personList"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <div v-if="item.prop === 'unitPe'" style="text-align: center">
                {{ row.unitPe === 1 ? '是' : '否' }}
              </div>
              <div v-else-if="item.prop === 'peLevel'" style="text-align: center">
                <span :style="row[item.prop] == 'VIP' ? 'color:#DAA520' : ''">{{
                  row[item.prop]
                }}</span>
              </div>
              <div v-else-if="item.prop === 'finishedSign'" style="text-align: center">
                <span :style="row.peLevel == 'VIP' ? 'color:#DAA520' : ''">{{
                  row[item.prop] == '0' ? '未结算' : row[item.prop] == '1' ? '已结算' : '部分结算'
                }}</span>
              </div>
              <div v-else :style="row.peLevel == 'VIP' ? 'color:#DAA520' : ''">{{
                row[item.prop]
              }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table_item">
        <div class="heard_title">
          <span>个人体检信息</span>
        </div>
        <el-table
          :data="peDetailList"
          style="width: 100%; padding: 0 8px; margin-top: 10px"
          height="calc(100vh - 270px)"
          border
        >
          <el-table-column
            v-for="item in personMsgList"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <div v-if="item.prop === 'peDeptClass'" style="text-align: left">
                {{ row.peDeptClass ? row.peDeptClass : '未完成' }}
              </div>
              <div v-else>
                {{ row[item.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <Dialog
      append-to-body
      v-model="selectUnitCodeVisiable"
      title="单位选择"
      width="800"
      @close="selectUnitCodeVisiable = false"
      class="package-advice-container"
    >
      <div
        ><el-input
          ref="queryInput"
          class="queryInput !w-300px"
          v-model="keyWord"
          @input="handleQueryItem"
          autofocus="true"
          placeholder="请输入拼音码"
      /></div>
      <el-table
        :data="unitCodeList"
        border
        style="width: 100%; margin-top: 10px; height: 500px"
        highlight-current-row
        @row-dblclick="selectUnitCodeClick"
        ><el-table-column
          :resizable="false"
          align="center"
          label="单位代码"
          show-overflow-tooltip
          prop="unitCode"
          width="100" /><el-table-column
          :resizable="false"
          align="left"
          label="单位名称"
          show-overflow-tooltip
          prop="unitName" /><el-table-column
          :resizable="false"
          align="center"
          label="联系人"
          width="100"
          show-overflow-tooltip
          prop="connecter" /><el-table-column
          :resizable="false"
          align="center"
          label="联系电话"
          width="120"
          show-overflow-tooltip
          prop="phone" /><el-table-column
          :resizable="false"
          align="left"
          label="地址"
          width="140"
          show-overflow-tooltip
          prop="address" /><el-table-column
          :resizable="false"
          align="center"
          label="拼音码"
          width="100"
          show-overflow-tooltip
          prop="inputCode"
      /></el-table>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import readCard from '@/assets/images/readCard.svg'
import report from '@/assets/images/report.svg'
import dayin from '@/assets/images/dayin.svg'
import noReport from '@/assets/images/noReport.svg'
import * as Api from '@/api/PerPhyExamination/perExaReport/index'
import { formatDate } from '@/utils/formatTime'
import { Search } from '@element-plus/icons-vue'
import { getPeUnitList, queryDictByConfig } from '@/api/PerPhyExamination/perExamination/index'
const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])
const tableData = ref([])
const rowInfo = ref({})
const peDetailList = ref([])
// const time = ref<string[] | null>(null)

watch(time, (newValue) => {
  if (newValue == null || []) {
    visitListInfo.value.preBeginDate = ''
    visitListInfo.value.preEndDate = ''
  }
  // visitListInfo.value.preBeginDate = newValue[0]
  // visitListInfo.value.preEndDate = newValue[1]
})
const code = ref('')
const checkList = ref(['Value1', 'Value2'])
const personList = ref([
  // {
  //   label: '序号',
  //   prop: 'index',
  //   align: 'center',
  //   width: 60,
  // },
  {
    label: '体检号',
    prop: 'peId',
    align: 'left',
    width: 120
  },
  {
    label: '次数',
    prop: 'peVisitId',
    align: 'center',
    width: 60
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    width: 120,
    align: 'left'
  },
  {
    label: '性别',
    prop: 'sex',
    align: 'left',
    width: 60,
    align: 'center'
  },
  {
    label: '年龄',
    prop: 'age',
    align: 'left',
    width: 60,
    align: 'center'
  },
  {
    label: '身份证号',
    prop: 'idNo',
    align: 'left',
    width: 170
  },
  {
    label: '缴费情况',
    prop: 'finishedSign',
    align: 'left',
    width: 100
  },
  {
    label: '报到日期',
    prop: 'pePreDate',
    align: 'left',
    width: 120
  },
  /*   {
    label: '工号',
    prop: 'setCode',
    align: 'left',
    width: 80
  }, */
  {
    label: '部门',
    prop: 'department',
    align: 'left',
    width: 120
  },
  {
    label: '单位名称',
    prop: 'unitName',
    align: 'left',
    width: 160
  },

  {
    label: '联系电话',
    prop: 'phoneNumber',
    align: 'left',
    width: 120
  },

  {
    label: '单位体检',
    prop: 'unitPe',
    align: 'center',
    width: 100,
    showOverflowTooltip: true,
    formatter: (row) => {
      return row.unitName == '[个人体检]' ? '否' : '是'
    }
  },
  {
    label: '优先级',
    prop: 'peLevel',
    align: 'left',
    width: 70
  },
  {
    label: '预约操作员',
    prop: 'pePreoperator',
    align: 'left',
    width: 100
  },
  {
    label: '地址',
    prop: 'address',
    align: 'left',
    width: ''
  },
  {
    label: '体检类型',
    prop: 'peTypeName',
    align: 'left',
    width: 100
  },
  {
    label: '婚检编号',
    prop: 'premaritalCode',
    align: 'left',
    width: 100
  },
  {
    label: '两癌编码',
    prop: 'screeningCode',
    align: 'left',
    width: 100
  },
  {
    label: '单位部门',
    prop: 'department',
    align: 'left',
    width: 100
  },
  {
    label: '工作单位',
    prop: 'unitInContract',
    align: 'left',
    width: 100
  }
])
const personMsgList = ref([
  {
    label: '体检号',
    prop: 'peId',
    align: 'left',
    width: 120
  },
  // {
  //   label: '次数',
  //   prop: 'times',
  //   align: 'left',
  //   width: 120
  // },
  {
    label: '检查科室',
    prop: 'peDeptName',
    align: 'left',
    width: 120
  },
  {
    label: '预约项目',
    prop: 'itemAssemName',
    align: 'left',
    width: 120
  },
  {
    label: '费别',
    prop: 'zfSign',
    align: 'center',
    width: 80
  },
  {
    label: '申请号',
    prop: 'applyNo',
    align: 'left',
    width: 120
  },
  {
    label: '应收费用',
    prop: 'costs',
    align: 'center',
    width: 100
  },
  {
    label: '完成标志',
    prop: 'finishedSign',
    align: 'center',
    width: 100
  },
  {
    label: '实收费用',
    prop: 'charges',
    align: 'center',
    width: 100
  },
  {
    label: '项目属性',
    prop: 'addItem',
    align: 'center',
    width: 100
  },
  {
    label: '类别',
    prop: 'peDeptClass',
    align: 'center',
    width: 100
  }
])

const print = () => {}
const readIdCard = () => {}
const reportTo = () => {}
const noReportTo = () => {}
const delReport = () => {}
const visitListInfo = ref({
  preBeginDate: time.value[0] || '',
  preEndDate: time.value[1] || '',
  unitCode: '',
  unitVisitId: '',
  peId: '',
  peVisitId: 0,
  idNo: '',
  number: '',
  name: ''
})
const setRowClassName = ({ row }) => {
  if (row.peId == rowInfo.value.peId) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}

// 获取体检主记录列表
const selectPeVisitList = async (flag = '') => {
  visitListInfo.value.preBeginDate = time.value[0] || ''
  visitListInfo.value.preEndDate = time.value[1] || ''
  if (flag == 'all') {
    visitListInfo.value = {
      preBeginDate: '',
      preEndDate: '',
      unitCode: '',
      unitVisitId: '',
      peId: '',
      peVisitId: 0,
      idNo: '',
      number: '',
      name: ''
    }
  }
  try {
    tableData.value = []
    const res = await Api.selectPeVisitList(visitListInfo.value)
    // 处理返回数据
    if (res.length > 0) {
      tableData.value = res
      clickRow(res[0])
    }
  } catch (error) {
    console.error('获取体检主记录列表失败:', error)
  }
}
// 体检人员报到
const peCheckIn = async () => {
  try {
    if (!rowInfo.value.peId) {
      ElMessage.warning('请选择要报到的体检人员')
      return
    }
    if (!rowInfo.value.joinUnit) {
      rowInfo.value.joinUnit = '0'
    }
    const res = await Api.peCheckIn([rowInfo.value])
    // 处理返回数据

    if (res) {
      ElMessage.success('报到成功')
      selectPeVisitList()
    }
  } catch (error) {
    console.error('体检人员报到失败:', error)
  }
}
// 取消报到
const canclePeCheckIn = async () => {
  try {
    const hasFinishedItem = peDetailList.value.some((item) => item.finishedSign === '完成')

    if (hasFinishedItem) {
      ElMessage.success('该受检人员已有完成项目，不可取消报到')
      return
    }

    const res = await Api.canclePeCheckIn([rowInfo.value])
    if (res) {
      ElMessage.success('取消成功')
      selectPeVisitList()
    }
  } catch (error) {
    console.error('取消报到失败:', error)
    ElMessage.error('取消报到失败')
  }
}

// 点击行
const clickRow = (row) => {
  selectPeVisitDetailList(row)
  rowInfo.value = row
}

// 获取体检详细列表
const selectPeVisitDetailList = async (selectDetailInfo) => {
  peDetailList.value = []
  const res = await Api.selectPeVisitDetailList(selectDetailInfo)
  peDetailList.value = res
}

// 删除预约
const deleteAppoint = async () => {
  if (!rowInfo.value.peId) {
    ElMessage.warning('请选择要删除的体检人员')
    return
  }

  ElMessageBox.confirm('确定要删除该预约吗？此操作不可恢复。', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      try {
        const res = await Api.deleteAppoint([rowInfo.value])
        if (res) {
          ElMessage.success('删除成功')
          selectPeVisitList()
        }
      } catch (error) {
        console.error('删除预约失败:', error)
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}
onMounted(async () => {
  selectPeVisitList()
  petypeNameList.value = await queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
})
const unitInfo = ref<any>({})

const selectUnitCodeVisiable = ref(false)
// 点击单位row数据进行赋值操作
const selectUnitCodeClick = async (row) => {
  visitListInfo.value.unitCode = row.unitCode
  visitListInfo.value.unitName = row.unitName
  visitListInfo.value.unitVisitId = row.unitVisitId
  unitInfo.value = row
  selectUnitCodeVisiable.value = false
  // await getList()
}
const unitCodeList = ref<any>([])
const keyWord = ref('')
// 点击按钮查询单位代码和名称并打开弹框
const onFocusUnitCode = async () => {
  keyWord.value = ''
  handleQueryItem()
  selectUnitCodeVisiable.value = true
  nextTick(() => {
    queryInput.value.focus()
  })
}
//根据单位代码过滤单位列表
const handleQueryItem = async () => {
  unitCodeList.value = await getPeUnitList({
    // unitCodeList.value = await getUnitInfo({
    input: keyWord.value
    // unitCode: keyWord.value
  })
}
const petypeNameList = ref<any>([])

//根据体检类型筛选套餐分类
const changePeType = (val) => {
  selectPeVisitList()
}
</script>
<style lang="scss" scoped>
.per_report {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .report_search {
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
          padding: 0% 12px;
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
        .delReport {
          color: #ed2226;
          border-color: #ed2226;
          background-color: #fff;
        }
      }
    }
  }
  .report_table {
    display: flex;
    justify-content: space-between;
    .table_item {
      width: 49.8%;
      background-color: #fff;
      margin-top: 8px;
    }
    .heard_title {
      height: 40px;
      line-height: 40px;
      /* padding-left: 20px; */
      /* margin-bottom: 11px; */
      border-bottom: 1px solid #c5dcff;
      span {
        display: inline-block;
        width: auto;
        height: 40px;
        padding: 0 20px;
        text-align: center;
        /* border-bottom: 2px solid #3473d1; */
        color: #3473d1;
        font-weight: bold;
      }
    }
  }
}
.selectBtn {
  margin-left: 0;
  .el-button {
    position: relative;
    top: 0px;
    margin-left: -1px;
    background: #f5f7fa !important;
    color: #999 !important;
    border-radius: 0px 4px 4px 0px !important;
  }
}
</style>
