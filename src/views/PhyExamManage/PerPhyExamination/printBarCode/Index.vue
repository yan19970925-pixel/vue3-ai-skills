<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1">
        <div class="div1">
          <span class="span1">单位代码：</span>
          <el-input
            style="width: 70px; margin-right: 12px"
            v-model="searchParams.unitCode"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 60px"
            v-model="searchParams.unitVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">体检号：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="searchParams.peId"
            placeholder="请输入"
            class="select-item"
            clearable
            ref="peIdRef"
            @change="getListAndPrint"
            @keyup.enter="getTableList"
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 70px"
            v-model="searchParams.peVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">预约时间：</span>
          <el-date-picker
            type="date"
            style="width: 130px"
            v-model="searchParams.preBeginDate"
            value-format="YYYY-MM-DD"
          />
          <span class="ml-6px mr-6px">至</span>
          <el-date-picker
            type="date"
            style="width: 130px"
            v-model="searchParams.preEndDate"
            value-format="YYYY-MM-DD"
          />
        </div>
        <div class="div1">
          <el-button @click="getTableList">查询</el-button>
        </div>
        <div class="div1">
          <el-radio-group v-model="printType">
            <!-- <el-radio label="1" size="large">检验申请单</el-radio> -->
            <el-radio label="2" size="large">检验标签</el-radio>
            <el-checkbox v-model="autoPrint" label="自动打印" @change="printTypeChange">
            </el-checkbox>
          </el-radio-group>
        </div>
        <div class="div1">
          <el-button class="read" @click="print"> <img :src="dayin" />打印 </el-button>
        </div>
        <div class="div1">
          <el-select v-model="printFlag" style="width: 120px">
            <el-option
              v-for="item in options"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="report_table">
      <div class="table_item">
        <div class="list_table">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 10px"
            height="calc(100vh - 190px)"
            border
            @selection-change="handleSelectionChange"
            ref="multipleTableRef"
          >
            <el-table-column type="selection" width="55" align="center" label="补打否">
            </el-table-column>
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <!-- <template #default="scope" v-if="item.prop == 'applyNoPrint'">
                <el-radio
                  :model-value="scope.row.isPrint === '1'"
                  @change="onChangeShow(scope.row, $event)"
                  label="是"
                />
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <img id="barcode" ref="textNoImg" style="display: none" />
    <div id="printMe" style="height: 0">
      <div
        v-for="(item, index) in printLists"
        :key="item.testNo"
        class="print_con"
        :style="index < printLists.length ? 'page-break-after: always' : ''"
      >
        <div style="display: flex; justify-content: space-around; position: relative">
          <div style="width: 35mm; height: calc(20mm - 35px)">
            <img style="width: 100%; height: calc(100% - 15px)" :src="item.testNoImg" alt="" />
            <div
              style="
                height: 15px;
                line-height: 15px;
                width: 100%;
                text-align: center;
                font-size: 12px;
                zoom: 0.9;
              "
              >{{ item.applyNo }}</div
            >
            <div style="position: absolute; right: 0; top: 10px; font-size: 12px; zoom: 0.9">{{
              item.cuvette
            }}</div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center">
            <span style="font-size: 12px; line-height: 12px">
              {{ item.priorityIndicator == 0 ? '普通' : item.priorityIndicator == 1 ? '急诊' : '' }}
            </span>
            <span style="font-size: 12px">
              {{ item.tubeColor ? '(' + item.tubeColor + ')' : '' }}
            </span>
          </div>
        </div>
        <div
          style="
            width: 100%;
            height: 28px;
            line-height: 14px;
            font-size: 12px;
            overflow: hidden;
            /* zoom: 0.6; */
          "
        >
          {{ item.name }} {{ item.sex }} {{ item.age
          }}{{ item.age && Number(item.age) < 1 ? '月' : '岁' }}
          {{ item.bedLabel ? item.bedLabel + '床' : '' }}
          {{ item.pePreDate?.substring(0, 10) || '' }}
          {{ item.peDeptName }} &nbsp; 次数：{{ item.peVisitId }}
        </div>
        <div
          style="
            width: 100%;
            height: 28px;
            line-height: 14px;
            font-size: 12px;
            /* zoom: 0.6; */
            overflow: hidden;
          "
        >
          ID: {{ item.peId }} {{ item.sample }} {{ item.itemAssemName }}
        </div>
      </div>
    </div>
    <!-- end -->
  </div>
</template>
<script setup lang="ts">
import readCard from '@/assets/images/readCard.svg'
import report from '@/assets/images/report.svg'
import dayin from '@/assets/images/dayin.svg'
import noReport from '@/assets/images/noReport.svg'
import { VuePrintNext } from 'vue-print-next'
import {
  selectBarCode,
  printLabSheet,
  printBarCode
} from '@/api/PerPhyExamination/printBarCode/index'
import JsBarcode from 'jsbarcode'
import { formatDate } from '@/utils/formatTime'
const printFlag = ref('1')
const options = [
  {
    value: '0',
    label: '全部'
  },
  {
    value: '1',
    label: '未打'
  },
  {
    value: '2',
    label: '已打'
  }
]
const searchParams = reactive({
  preBeginDate: formatDate(new Date(), 'YYYY-MM-DD'),
  preEndDate: formatDate(new Date(), 'YYYY-MM-DD'),
  unitCode: '', //单位代码
  unitVisitId: '', //单位次数
  peId: '', //体检号
  peVisitId: '', //个人次数
  applyNoPrint: '0' // 已打1，未打0
})
watch(printFlag, (newVal, oldFlag) => {
  if (newVal == '1') {
    searchParams.applyNoPrint = '0'
  } else if (newVal == '2') {
    searchParams.applyNoPrint = '1'
  } else {
    searchParams.applyNoPrint = ''
  }
  getTableList()
})

const printParams = reactive({
  flag: 0,
  applyNo: '',
  peVisitReqVoList: []
})
const printType = ref('2')
const personList = ref([
  // {
  //   label: '补打否',
  //   prop: 'applyNoPrint',
  //   align: 'left',
  //   width: 80
  // },
  {
    label: '申请号',
    prop: 'applyNo',
    align: 'left',
    width: 140
  },
  {
    label: '项目名称',
    prop: 'itemAssemName',
    align: 'left'
    // width: 220
  },
  {
    label: '单位名称',
    prop: 'unitCode',
    align: 'left',
    width: 220
  },
  {
    label: '体检号',
    prop: 'peId',
    align: 'left',
    width: 120
  },
  {
    label: '单位次数',
    prop: 'unitVisitId',
    align: 'left',
    width: 120
  },
  {
    label: '体检次数',
    prop: 'peVisitId',
    align: 'left',
    width: 120
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'left',
    width: 120
  },
  {
    label: '试管名称',
    prop: 'testTubeName',
    align: 'left',
    width: 120
  },
  {
    label: '试管规格',
    prop: 'testTubeSpec',
    align: 'left',
    width: 120
  },
  {
    label: '试管颜色',
    prop: 'testTubeColor',
    align: 'left',
    width: 120
  }
])

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const tableData = ref([])

const getTableList = async () => {
  try {
    const res = await selectBarCode(searchParams) // 假设这是原始接口
    const processedRes = mergeDuplicateApplyNo(res)
    tableData.value = processedRes // 赋值给表格数据
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}
// 假设 res 是原始数据数组
const mergeDuplicateApplyNo = (res) => {
  return res.reduce((acc, current) => {
    // 查找是否已存在相同 applyNo 的项
    const existingItem = acc.find((item) => item.applyNo === current.applyNo)
    if (existingItem) {
      // 如果存在，拼接 itemAssemName
      existingItem.itemAssemName += `，${current.itemAssemName}`
    } else {
      // 如果不存在，添加新项（注意深拷贝避免引用问题）
      acc.push({ ...current })
    }
    return acc
  }, [])
}
const printMe = ref(null)
const textNoImg = ref()
const printLists = ref([])
const print = () => {
  if (multipleSelection.value && multipleSelection.value.length > 0) {
    // let printData = []
    printParams.peVisitReqVoList = multipleSelection.value
    if (printType.value === '1') {
      printParams.flag = 2
      printLabSheet(printParams).then((res) => {
        console.log(res, '检验申请单条码打印数据')
      })
    } else if (printType.value === '2') {
      printParams.flag = 2
      printBarCode(printParams).then((res) => {
        console.log(res, '检验标签条码打印数据')
        printLists.value = res
        printLists.value.forEach((item) => {
          JsBarcode(textNoImg.value, item.applyNo, {
            displayValue: false,
            fontSize: 18,
            width: 2,
            height: 30,
            margin: 4
          })
          item.testNoImg = textNoImg.value?.src || ''
        })
        nextTick(() => {
          new VuePrintNext({
            el: '#printMe',
            paperSize: 'custom', // 设置为自定义尺寸
            customSize: {
              width: '50', // 宽度
              height: '30', // 高度
              unit: 'mm' // 单位：mm、cm、in、px
            },
            defaultScale: 0.7 // 设置默认缩放比例
          })
        })
      })
    }
  } else if (searchParams.peId && tableData.value && tableData.value.length > 0) {
    let params = {
      flag: 2,
      peVisitReqVoList: [
        {
          peId: searchParams.peId,
          peVisitId: tableData.value[0].peVisitId,
          peDeptClass: '',
          applyNo: '',
          applyNoList: []
        }
      ]
    }
    printBarCode(params).then((res) => {
      console.log(res, '检验标签条码打印数据')
      printLists.value = res
      printLists.value.forEach((item) => {
        JsBarcode(textNoImg.value, item.applyNo, {
          displayValue: false,
          fontSize: 18,
          width: 2,
          height: 30,
          margin: 4
        })
        item.testNoImg = textNoImg.value?.src || ''
      })
      nextTick(() => {
        new VuePrintNext({
          el: '#printMe',
          paperSize: 'custom', // 设置为自定义尺寸
          customSize: {
            width: '50', // 宽度
            height: '20', // 高度
            unit: 'mm' // 单位：mm、cm、in、px
          },
          defaultScale: 0.7 // 设置默认缩放比例
        })
      })
    })
  } else {
    ElMessage.error('请选择打印内容')
  }
}
// const onChangeShow = (row: User, val: boolean) => {
//   row.isPrint = val ? '1' : '0'
// }
const peIdRef = ref(null)
const autoPrint = ref(true)
const printTypeChange = (val) => {
  if (val) {
    peIdRef.value?.focus()
  }
}
const getListAndPrint = async () => {
  if (searchParams.peId) {
    if (autoPrint.value) {
      await getTableList()
      if (tableData.value && tableData.value.length > 0) {
        await print()
      }
      searchParams.peId = ''
      await getTableList()
      setTimeout(() => {
        peIdRef.value?.focus()
      }, 500)
    } else {
      await getTableList()
    }
  }
}
onMounted(() => {
  if (autoPrint.value) {
    peIdRef.value?.focus()
  }
  getTableList()
})
</script>
<style lang="scss" scoped>
.per_report {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  // height: calc(100vh - 54px);
  // overflow: hidden;
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
      width: 100%;
      background-color: #fff;
      margin-top: 8px;
      overflow-x: auto;
      display: flex;
      align-items: center;
      .list_table {
        margin: 0 8px;
        width: 100%;
        height: calc(100vh - 172px);
      }
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
#printMe {
  width: 100%;
  .print_con {
    width: 50mm;
    height: 29.5mm;
    padding: 5px 10px;
    box-sizing: border-box;
    margin: 0;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
<style>
@media print {
  @page {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  html,
  body {
    height: 100% !important;
    width: 100% !important;
    padding: 0;
    margin: 0;
    overflow: visible !important;
  }
  .print_con {
    page-break-after: always; /* 每块内容后强制分页 */
    break-inside: avoid; /* 防止内容块内部分页 */
  }
}
.el-table .my-cell {
  vertical-align: top;
}
</style>
