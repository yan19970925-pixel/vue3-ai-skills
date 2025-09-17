<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1" style="padding-bottom: 6px">
        <div class="div1" style="width: 320px">
          <span class="span1">体检时间区间：</span>
          <el-date-picker
            v-model="time"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="!w-210px"
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1 !w-70px" style="text-align: right">两癌编号：</span>
          <el-input
            style="width: 180px"
            v-model="searchParams.screeningCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1"><b style="color: #ed2226"> * </b>姓名：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.name"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1 !w-70px" style="text-align: right">身份证：</span>
          <el-input
            style="width: 180px"
            v-model="searchParams.idNo"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
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
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 64px"
            v-model="searchParams.peVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <!-- <div class="div1">
          <span>体检类型：</span>
          <el-select
            v-model="searchParams.peTypeName"
            placeholder="体检类型"
            style="width: calc(100% - 100px)"
            class="select-item"
            filterable
            default-first-option
            @change="changePeType(searchParams.peTypeName)"
          >
            <el-option
              v-for="item in petypeNameList"
              :key="item.keyCode"
              :label="item.keyValue"
              :value="item.keyValue"
            />
          </el-select>
        </div> -->

        <!-- <div class="div1">
          <span class="span1">电话：</span>
          <el-input
            style="width: 130px"
            v-model="searchParams.number"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div> -->
        <div class="div1">
          <el-button @click="search">查询</el-button>
        </div>
      </div>
      <div class="search1" style="padding-top: 6px">
        <div class="div1">
          <span class="span1">申请单类型：</span>
          <el-checkbox @change="printType1" v-model="TCTFlag" label="TCT申请单" size="large" />
        </div>
        <div class="div1">
          <el-checkbox @change="printType6" v-model="HPVFlag" label="HPV申请单" size="large" />
        </div>
        <div class="div1">
          <el-button type="primary" @click="handlePrint">打印申请单</el-button>
          <!-- <el-button @click="handlePreview">打印预览</el-button> -->
        </div>
      </div>
    </div>
    <div class="report_table">
      <div class="table_item">
        <div class="list_table">
          <el-table
            :data="tableData"
            border
            class="mt-6px"
            style="width: 100%; height: calc(100vh - 264px); overflow: auto"
            highlight-current-row
            stripe
            @row-click="handleItemClick"
          >
            <el-table-column
              align="center"
              label="体检号"
              prop="peId"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="体检次数"
              prop="peVisitId"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="两癌编码"
              prop="screeningCode"
              show-overflow-tooltip
            />
            <el-table-column align="center" label="姓名" prop="name" show-overflow-tooltip />
            <el-table-column align="center" label="性别" prop="sex" show-overflow-tooltip />
            <el-table-column
              align="center"
              label="手机号码"
              prop="phoneNumber"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="体检时间"
              prop="pePreDate"
              width="120px"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="绝经日期"
              prop="peResultMcyj"
              width="120px"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="是否绝经"
              prop="peResultSfjj"
              width="120px"
              show-overflow-tooltip
            />

            <!-- 可以删除的操作列 -->
            <!-- 固定右侧 -->
            <!-- <el-table-column label="操作" width="100" fixed="right">
              <template #default="scope">
                <el-button
                  style="color: red"
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
          <!-- 分页 -->
          <!-- <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            style="margin-top: 15px; text-align: center"
          /> -->
          <!-- <el-checkbox-group v-model="multipleSelectionArr" @change="handleSelectionChange">
            <el-checkbox
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.uniqueId || `${item.peId}_${item.peVisitId}`"
            >
              <span style="padding-right: 12px">{{ item.peId }}-{{ item.peVisitId }}</span>
              <span>{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group> -->
        </div>
      </div>
    </div>
    <!-- <div id="printMe" :style="tableData.length > 0 ? 'display:block;' : 'display:none;'"> -->
    <img ref="tijianSrc" style="display: none" />
    <img ref="HisSrc" style="display: none" />
    <!-- 修改打印内容区域 -->
    <div>
      <!-- 打印内容区域 -->
      <div id="examApplicationPrint" ref="printContainer">
        <div
          v-for="(item, index) in printData"
          :key="index"
          class="a4-page"
          :style="{ breakAfter: index < printData.length - 1 ? 'page' : 'auto' }"
        >
          <div class="print-content">
            <div class="header">
              <h1>{{ printTitle }}</h1>
            </div>

            <!-- 第一行：卡号和条形码 -->
            <el-row style="height: 42px; line-height: 42px; margin-bottom: 12px">
              <el-col :span="1"></el-col>
              <el-col :span="16" class="card-info">
                <span class="label">卡号：</span>
                <span class="value">{{ item.screeningCode || '' }}</span>
              </el-col>
              <el-col :span="7">
                <img
                  style="height: 42px"
                  :src="item.barcodeImage"
                  alt="条形码"
                  class="barcode"
                  v-if="item.barcodeImage"
                />
              </el-col>
            </el-row>

            <!-- 第二行：送查单位和细胞学号 -->
            <el-row style="margin-bottom: 12px">
              <el-col :span="1"></el-col>
              <el-col :span="16" class="hospital-info">
                <span class="label">送查单位：</span>
                <span class="value">{{ item.hospital || '北京市延庆区妇幼保健院' }}</span>
              </el-col>
              <el-col :span="7" class="cytology-number">
                <span class="label">细胞学号：</span>
                <span class="value">{{ item.screeningCode || '' }}</span>
              </el-col>
            </el-row>

            <!-- 基本信息 -->
            <el-row style="margin-bottom: 12px; padding-left: 14px">
              <el-col :span="1"></el-col>
              <el-col :span="8">
                <span class="label">姓名：</span>
                <span class="value">{{ item.name }}</span>
              </el-col>
              <el-col :span="8">
                <span class="label">年龄：</span>
                <span class="value">{{ item.age }}</span>
              </el-col>
              <el-col :span="7">
                <span class="label">联系电话：</span>
                <span class="value">{{ item.phoneNumber || '' }}</span>
              </el-col>
            </el-row>

            <!-- 末次月经和绝经信息 -->
            <el-row style="margin-bottom: 12px; padding-left: 14px">
              <el-col :span="1"></el-col>
              <el-col :span="16">
                <span class="label">末次月经：</span>
                <span class="value">{{ item.peResultMcyj }}</span>
              </el-col>
              <el-col :span="7">
                <span class="label">是否绝经：</span>
                <span class="value">{{ item.peResultSfjj }}</span>
              </el-col>
            </el-row>

            <!-- 其他情况 -->
            <el-row style="margin-bottom: 12px; padding-left: 14px">
              <el-col :span="1"></el-col>
              <el-col :span="23">
                <span class="label">其他情况：</span>
                <span class="value">{{ item.otherConditions || '' }}</span>
              </el-col>
            </el-row>

            <!-- 既往细胞学检查 -->
            <el-row style="margin-bottom: 12px; padding-left: 14px">
              <el-col :span="1"></el-col>
              <el-col :span="23">
                <span class="label">既往细胞学检查日期及结果：</span>
                <span class="value">{{ item.previousExamResult || '' }}</span>
              </el-col>
            </el-row>

            <!-- 临床诊断 -->
            <el-row style="margin-bottom: 12px; padding-left: 14px">
              <el-col :span="1"></el-col>
              <el-col :span="23" class="info-item">
                <span class="label">临床诊断：</span>
                <span class="value">{{ item.clinicalDiagnosis || '' }}</span>
              </el-col>
            </el-row>

            <!-- 医生和检查日期 -->
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="16">
                <span class="label">送检医生：</span>
                <span class="value">{{ item.doctor || '' }}</span>
              </el-col>
              <el-col :span="7">
                <span class="label">检查日期：</span>
                <span class="value">{{
                  formatDate(item.examDate || new Date(), 'YYYY/MM/DD')
                }}</span>
              </el-col>
            </el-row>
          </div>
          <!-- 页面下半部分留空 -->
          <div class="empty-space"></div>
        </div>
      </div>
    </div>
    <img ref="tijianSrc" style="display: none" />
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import JsBarcode from 'jsbarcode'
import { selectPeVisitList } from '@/api/PerPhyExamination/printApplicationForm/index'
import { formatDate } from '@/utils/formatTime'
import { queryDictByConfig } from '@/api/PerPhyExamination/perExamination/index'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUser)
const tijianSrc = ref<HTMLImageElement | null>(null)
const HisSrc = ref<HTMLImageElement | null>(null)
const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])
const searchParams = ref({
  peId: '',
  name: '',
  sex: '',
  peVisitId: '',
  pePreDate: '',
  screeningCode: '',
  age: '',
  phoneNumber: '',
  idNo: '',
  peTypeName: '两癌筛查',
  pePreDateStart: time.value[0] || '',
  pePreDateEnd: time.value[1] || ''
})
const printParams = ref({
  peVisitReqVoList: [],
  labTag: false,
  personTag: false,
  labSheetTag: false,
  examSheetTag: false
})

const TCTFlag = ref(true)
const HPVFlag = ref(false)
// 修改 checkbox 的 change 事件处理函数
const printType1 = () => {
  if (TCTFlag.value) {
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
    HPVFlag.value = false
    printTitle.value = TCTTitle // 设置TCT标题
  } else {
    printTitle.value = '' // 如果未选中任何选项，清空标题
  }
}

const printType6 = () => {
  if (HPVFlag.value) {
    TCTFlag.value = false
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
    printTitle.value = HPVTitle // 设置HPV标题
  } else {
    printTitle.value = '' // 如果未选中任何选项，清空标题
  }
}

const tableData = ref([])
const search = () => {
  if (time.value && time.value.length > 0) {
    searchParams.value.pePreDateStart = time.value[0]
    searchParams.value.pePreDateEnd = time.value[1]
  } else {
    searchParams.value.pePreDateStart = ''
    searchParams.value.pePreDateEnd = ''
  }
  selectPeVisitList(searchParams.value).then((res) => {
    if (res && res.length > 0) {
      // tableData.value = splitArrayByLength(res, 23)
      // 为每个数据项添加 uniqueId 属性
      tableData.value = res.map((item) => {
        return {
          ...item,
          uniqueId: `${item.peId}-${item.peVisitId}`
        }
      })
    } else {
      tableData.value = []
    }
    console.log('%c Line:392 🍡 tableData.value', 'color:#465975', tableData.value)
  })
}

onMounted(() => {
  search()
  // 设置默认选中项和标题
  if (TCTFlag.value) {
    printTitle.value = TCTTitle
  } else if (HPVFlag.value) {
    printTitle.value = HPVTitle
  }
})

import { onMounted, ref } from 'vue'

import { nextTick } from 'vue'
const printTitle = ref('')
const TCTTitle = '北京市两癌筛查宫颈细胞学检查申请单'
const HPVTitle = '北京市两癌筛查人乳头瘤病毒（HPV）检查申请单'
// 打印相关数据
const printContainer = ref<HTMLElement | null>(null)
const printData = ref<any[]>([
  {
    name: '张三',
    sex: '男',
    age: 30,
    peId: 'TJ1000001',
    peVisitId: 1,
    applyDept: '内科',
    applyDoctor: '李医生',
    applyTime: new Date(),
    examItems: [
      {
        itemName: '胸部CT',
        bodyPart: '胸部',
        requirements: '平扫',
        applyDoctor: '李医生',
        applyTime: new Date()
      },
      {
        itemName: '腹部B超',
        bodyPart: '腹部',
        requirements: '空腹',
        applyDoctor: '李医生',
        applyTime: new Date()
      }
    ]
  }
])

// 添加选中行数据的响应式变量
const selectedRow = ref<any>(null)

// 处理表格行点击事件
const handleItemClick = (row: any) => {
  selectedRow.value = row
  // 设置打印数据为选中行的数据
  printData.value = [
    {
      ...row,
      cardNumber: row.peId,
      hospital: '北京市延庆区妇幼保健院',
      lastMenstrualPeriod: row.peResultMcyj || '',
      isMenopausal: row.peResultJjrq ? true : false,
      otherConditions: '',
      previousExamResult: '',
      clinicalDiagnosis: '',
      doctor: userInfo.value.nickname || '',
      examDate: row.pePreDate || new Date(),
      phoneNumber: row.phoneNumber || ''
    }
  ]
}

/* // 修改 handlePrint 函数
const handlePrint = () => {
  if (!selectedRow.value) {
    ElMessage.warning('请先选择一行数据')
    return
  }

  // 为每个打印项生成条形码
  printData.value.forEach((item) => {
    if (item.cardNumber) {
      JsBarcode(tijianSrc.value, item.cardNumber, {
        fontSize: 18,
        width: 2,
        height: 30,
        margin: 4
      })
      item.barcodeImage = tijianSrc.value?.src || ''
    }
  })

  nextTick(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @page {
        size: A5 landscape;
        margin: 10mm;
      }
      html, body {
        overflow: visible !important;
        height: 100% !important;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#examApplicationPrint',
      preview: false,
      paperSize: 'A5',
      orientation: 'landscape',
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
}

// 修改 handlePreview 函数
const handlePreview = () => {
  if (!selectedRow.value) {
    ElMessage.warning('请先选择一行数据')
    return
  }

  // 为每个打印项生成条形码
  printData.value.forEach((item) => {
    if (item.cardNumber) {
      JsBarcode(tijianSrc.value, item.cardNumber, {
        fontSize: 18,
        width: 2,
        height: 30,
        margin: 4
      })
      item.barcodeImage = tijianSrc.value?.src || ''
    }
  })

  nextTick(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @page {
        size: A5 landscape;
        margin: 10mm;
      }
      html, body {
        overflow: visible !important;
        height: 100% !important;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#examApplicationPrint',
      preview: true,
      previewTitle: printTitle.value || '两癌筛查申请单预览',
      previewPrintBtnLabel: '打印',
      paperSize: 'A5',
      orientation: 'landscape',
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
} */

const handlePrint = () => {
  if (!selectedRow.value) {
    ElMessage.warning('请先选择一行数据')
    return
  }

  // 为每个打印项生成条形码
  printData.value.forEach((item) => {
    if (item.cardNumber) {
      JsBarcode(tijianSrc.value, item.cardNumber, {
        fontSize: 18,
        width: 2,
        height: 30,
        margin: 4
      })
      item.barcodeImage = tijianSrc.value?.src || ''
    }
  })

  nextTick(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @page {
        size: A4 portrait;
        margin: 10mm;
      }
      html, body {
        overflow: visible !important;
        height: 100% !important;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#examApplicationPrint',
      preview: false,
      paperSize: 'A4',
      orientation: 'portrait', // A4纵向
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
}

// 修改 handlePreview 函数
const handlePreview = () => {
  if (!selectedRow.value) {
    ElMessage.warning('请先选择一行数据')
    return
  }

  // 为每个打印项生成条形码
  printData.value.forEach((item) => {
    if (item.cardNumber) {
      JsBarcode(tijianSrc.value, item.cardNumber, {
        fontSize: 18,
        width: 2,
        height: 30,
        margin: 4
      })
      item.barcodeImage = tijianSrc.value?.src || ''
    }
  })

  nextTick(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @page {
        size: A4 portrait;
        margin: 10mm;
      }
      html, body {
        overflow: visible !important;
        height: 100% !important;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#examApplicationPrint',
      preview: true,
      previewTitle: printTitle.value || '两癌筛查申请单预览',
      previewPrintBtnLabel: '打印',
      paperSize: 'A4',
      orientation: 'portrait', // A4纵向
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
}

//体检类型
const petypeNameList = ref<any>([])
onMounted(async () => {
  petypeNameList.value = await queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
})

//根据体检类型筛选套餐分类
const changePeType = (val) => {
  if (val) {
    searchParams.value.peTypeName = val
    // search()
  } else {
    searchParams.value.peTypeName = ''
  }
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
      height: calc(100vh - 234px);
      background-color: #fff;
      margin-top: 8px;
      overflow-x: auto;
      display: flex;
      align-items: center;
      .list_table {
        // margin: 0 8px;
        width: 100%;
        padding: 12px;
        :deep(.el-checkbox-group) {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          height: calc(100vh - 257px);
          gap: 9px;
          column-gap: 19px;
          align-content: flex-start;
        }
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
.print_content {
  page-break-after: always; /* 每块内容后强制分页 */
  break-inside: avoid; /* 防止内容块内部分页 */
  width: 210mm;
  height: 290mm;

  .print_heard {
    .hos_t {
      display: flex;
      justify-content: center;
      height: 40px;
      align-items: center;
      font-size: 26px;
      font-weight: bold;
      position: relative;
      img {
        position: absolute;
        left: 0px;
        top: 0;
      }
    }
    .title {
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      height: 40px;
      font-weight: bold;
    }
    .per_msg {
      position: relative;
      font-family: 'SimSun', 'STSong', serif;
      .el-row {
        .el-col {
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }
      }
      img {
        width: 80px;
        height: 110px;
        position: absolute;
        right: 20px;
        top: -54px;
      }
    }
    .tishi {
      border-top: #333333 1px solid;

      .tishi_in {
        width: 100%;
        font-size: 14px;
        display: flex;
        /* border-top: 2px solid #333333; */
        border-bottom: 1px solid #333333;
        /* height: 64px; */
      }
      .tishi_in:last-child {
        border-top: none;

        border-bottom: none;
      }
      .tishi_t {
        width: 120px;
        /* line-height: 30px; */
        color: #333333;
        font-weight: bold;
        /* border-right: #333333 1px solid; */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tishi_con {
        width: calc(100% - 121px);
        color: #666666;
        word-break: break-all;
        overflow: hidden;
        /* line-height: 20px; */
        .el-row {
          line-height: 20px;
          height: 20px;
          .el-col:first-child {
            padding-left: 8px;
          }
        }
      }
    }
  }
  .print_con {
    .table {
      width: 100%;
      height: calc(290mm - 300px);
      overflow: hidden !important;
      .table_t {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #333333;
        border-bottom: 1px solid #333333;
        font-size: 14px;
        .neirong {
          /* border-bottom: #333333 1px solid; */
          .el-row {
            line-height: 36px;
            height: 36px;
          }
          .el-col {
            line-height: 36px;
            height: 36px;
            white-space: normal;
            overflow: hidden;
          }
          .weizhi {
            font-weight: bold;
            font-size: 16px;
          }
          .el-col {
            overflow: hidden;
            height: 36px;
            display: block;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .col_LH {
            font-size: 12px;
            line-height: 18px;
          }
        }
        .neirong:last-child {
          border-bottom: none;
        }
      }
    }
    .b_msg {
      width: 100%;
      text-align: center;
      height: 60px;
      /* border-top: #333333 1px solid; */
      /* border-bottom: #333333 1px solid; */

      font-size: 14px;
      color: #333333;
      position: relative;
      .tishi_in {
        width: 100%;
        font-size: 14px;
        display: flex;
        /* border-top: 1px solid #333333; */
        border-bottom: 1px solid #333333;
        height: 30px;
      }
      .tishi_t {
        width: 120px;
        height: 30px;
        line-height: 30px;
        color: #333333;
        font-weight: bold;
        /* border-right: #333333 1px solid; */
        text-align: center;
      }
      .b_c {
        height: 30px;
        line-height: 30px;
      }
      .b_p {
        position: absolute;
        top: 0px;
        right: 6px;
      }
    }
    .bot {
      display: flex;
      border-bottom: #333333 1px solid;
      width: 100%;
      .bot_l {
        width: 120px;
        height: 96px;
        text-align: center;
        font-weight: bold;
        padding-top: 15px;
        font-size: 16px;
        border-right: #333333 1px solid;
      }
      .bot_r {
        width: 100%;
        height: 96px;
        .el-row {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
}
:deep(.pdfVisible) {
  margin: 0;
  .el-dialog {
    margin: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
#health {
  width: 210mm;
  height: 290mm;
  .health_page {
    width: 100%;
    height: 100%;
    padding: 10px 0px;
    background-color: #fff;
    .health_h {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      height: 40px;
      align-items: center;
      .h_div1 {
      }
      .h_div2 {
        font-weight: bold;
      }
    }
    .health_t {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
    }
    .health_per {
      border-right: #333333 1px solid;
      div {
        height: 40px;
        width: 100%;
      }
      .per_yb {
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-size: 18px;
        border-top: 1px solid #333333;
        border-left: #333333 1px solid;
        /* border-right: #333333 1px solid; */
      }
      .per_na {
        width: 100%;
        display: flex;
        align-items: center;
        /* padding-left: 8px; */
        font-size: 14px;
        border-top: #333333 1px solid;
        position: relative;
        div {
          padding-left: 8px;
          border-left: #333333 1px solid;
          line-height: 40px;
          border-bottom: #333333 1px solid;
        }
        .div1 {
          width: 15%;
        }
        .div2 {
          width: 25%;
        }
        .div3 {
          width: 15%;
        }
        .div4 {
          width: calc(25% + 1px);
          padding-right: 1px;
          border-right: #333333 1px solid;
        }
        img {
          width: 80px;
          height: 110px;
          text-align: center;
          position: absolute;
          right: 38px;
          top: 5px;
        }
      }
      .per_sfz {
        width: 100%;
        display: flex;
        align-items: center;
        /* padding-left: 8px; */
        font-size: 14px;
        .div1 {
          width: 15%;
          border-left: #333333 1px solid;
          line-height: 40px;
          border-bottom: #333333 1px solid;
          padding-left: 8px;
        }
        .div2 {
          width: calc(65% + 1px);
          line-height: 40px;
          border-bottom: #333333 1px solid;
          padding-left: 8px;
          padding-right: 1px;
          border-left: #333333 1px solid;
          border-right: #333333 1px solid;
        }
      }
      .per_jk {
        width: calc(80% + 1px);
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-size: 18px;
        border-left: #333333 1px solid;
        border-right: #333333 1px solid;
      }
    }
    .div_table {
      width: 100%;
      border-top: #333333 1px solid;
      height: calc(290mm - 360px);
      .data_table {
        width: 100%;
        .tr1 {
          height: 36px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            width: 35%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
          }
          .td2 {
            width: 45%;
          }
          .td3 {
            width: 8%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
          }
          .td4 {
            width: 12%;
            border-right: #333333 1px solid;
          }
        }
        .tr2 {
          height: 36px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td2 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td3 {
            width: 30%;
            border-right: #333333 1px solid;
          }
        }
        .tr3 {
          height: 50px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            text-align: left;
            width: 35%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
            overflow: hidden;
            text-align: center;
          }
          .td2 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td3 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td4 {
            width: 30%;
            border-right: #333333 1px solid;
          }
          .td5 {
            width: 8%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
            text-align: center;
            img {
              width: 60px;
              height: 23px;
            }
          }
          .td6 {
            width: 12%;
            border-right: #333333 1px solid;
          }
        }
      }
    }
    .health_bz {
      width: 100%;
      line-height: 22px;
      font-size: 14px;
    }
    .health_qz {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 80px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
<style>
@media print {
  @page {
    height: 100%;
    width: 100%;
    padding: 10px 20px;
    margin: 15px;
  }
  html,
  body {
    height: 100% !important;
    width: 100% !important;
    overflow: visible !important;
  }
  .print_content {
    page-break-after: auto;
    /* padding: 0 20px; */
  }
  /* 样式名称要唯一避免功能样式冲突 */
  .print_heard {
    /* position: fixed;
    top: 0;
    width: 100%;
    height: 152px;
    background: white;
    z-index: 0; */
  }
  /* 样式名称要唯一避免功能样式冲突 */
  .print_con {
    /* page-break-after: always; */
    /* margin-top: 152px; */
  }
  /* 避免最后一页多出空白 */
  .print_con:last-child {
    page-break-after: auto;
  }
  /* 其他打印样式调整 */
  /* .no-print {
    display: none !important;
  } */
}
</style>

<style scoped>
/* 现有样式保持不变 */
/* ... */

/* 新增或修改的样式 */
.a5-page {
  width: 210mm;
  height: 148mm;
  padding: 10mm;
  box-sizing: border-box;
  page-break-after: always;
  font-family: 'SimSun', 'STSong', serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 12px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
}

.first-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  /* border-bottom: 1px solid #000; */
  padding-bottom: 8px;
}

.card-info .label {
  font-weight: bold;
}

.barcode-container {
  flex-shrink: 0;
}

.barcode {
  height: 30px;
}

.second-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 8px;
  /* border-bottom: 1px solid #000; */
}

.hospital-info,
.cyto-number {
  display: flex;
  align-items: center;
}

.info-item {
  display: flex;
  margin-bottom: 5px;
  width: 100%;
}

.label {
  /* font-weight: bold; */
  white-space: nowrap;
  margin-right: 5px;
  font-size: 18px;
}

.value {
  flex: 1;
  /* border-bottom: 1px solid #999; */
  min-height: 18px;
  font-size: 18px;
}

.doctor-info {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.page-number {
  text-align: center;
  font-size: 11px;
  margin-top: 10px;
}
</style>

<style scoped>
/* 修改页面样式为A4纵向 */
.a4-page {
  width: 210mm;
  height: 297mm;
  display: flex;
  flex-direction: column;
  page-break-after: always;
  font-family: 'SimSun', 'STSong', serif;
  font-size: 12px;
}

.print-content {
  flex: 1;
  padding: 10mm;
  box-sizing: border-box;
}

.empty-space {
  flex: 1; /* 占据剩余空间，实现下半部分留空效果 */
}

.header {
  text-align: center;
  margin-bottom: 12px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
}

.card-info .label {
  font-weight: bold;
}

.barcode {
  height: 30px;
}

.hospital-info,
.cyto-number {
  display: flex;
  align-items: center;
}

.info-item {
  display: flex;
  margin-bottom: 5px;
  width: 100%;
}

.label {
  white-space: nowrap;
  margin-right: 5px;
  font-size: 18px;
}

.value {
  flex: 1;
  min-height: 18px;
  font-size: 18px;
}

.page-number {
  text-align: center;
  font-size: 11px;
  margin-top: 10px;
}
</style>
