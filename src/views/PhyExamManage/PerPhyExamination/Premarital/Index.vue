<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1" style="padding-bottom: 6px">
        <div class="div1">
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

        <div class="div1">
          <span class="span1">姓名：</span>
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
          <span class="span1 !w-70px" style="text-align: right">编号：</span>
          <el-input
            style="width: 180px"
            v-model="searchParams.premaritalCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
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
          <el-button type="primary" @click="handlePrint">打印</el-button>
        </div>
      </div>
      <!-- <div class="search1" style="padding-top: 6px">
        <div class="div1">
          <span class="span1">申请单类型：</span>
          <el-checkbox @change="printType1" v-model="TCTFlag" label="TCT申请单" size="large" />
        </div>
        <div class="div1">
          <el-checkbox @change="printType6" v-model="HPVFlag" label="HPV申请单" size="large" />
        </div>
        <div class="div1">
          <el-button type="primary" @click="handlePrint">打印申请单</el-button>
          <el-button @click="handlePreview">打印预览</el-button>
        </div>
      </div> -->
    </div>
    <div class="report_table">
      <div class="table_item">
        <div class="list_table">
          <el-table
            :data="tableData"
            border
            class="mt-6px"
            style="width: 100%; height: calc(100vh - 184px); overflow: auto; margin: 0 !important"
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
              width="90"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="编号"
              prop="premaritalCode"
              width="100"
              show-overflow-tooltip
            />

            <el-table-column
              align="center"
              label="姓名"
              width="100"
              prop="name"
              show-overflow-tooltip
            />

            <el-table-column
              align="center"
              width="60"
              label="性别"
              prop="sex"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              width="80"
              label="民族"
              prop="nation"
              show-overflow-tooltip
            />
            <el-table-column align="center" label="身份证号" prop="idNo" show-overflow-tooltip />
            <el-table-column
              align="center"
              label="出生日期"
              prop="dateOfBirth"
              width="120px"
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
              label="单位（职业）"
              prop="unitInContract"
              width=""
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="直系、三代内旁系血脉关系"
              prop="resultXygx"
              width="200"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="婚前医学检查结果"
              prop="pecontent"
              width=""
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="医学意见"
              prop="resultYxyj"
              width=""
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
    <div>
      <!-- 打印内容区域 -->

      <div id="health" ref="examSheet">
        <div class="health_page page">
          <div class="health_header">
            <div class="header_main" style="height: 36px">
              <!-- 北京市婚前医学检查证明(存根) -->
            </div>
          </div>

          <div class="basic_info_table">
            <table class="info_table">
              <tr class="table_row">
                <td
                  style="border: 0px; border: 0px; font-weight: bold"
                  class="table_cell cell_1_1"
                ></td>
                <td style="border: 0px" class="table_cell cell_1_2"></td>
                <td style="border: 0px" class="table_cell cell_1_3"></td>
                <td style="border: 0px; text-align: right" class="table_cell cell_1_4">
                  <!-- 编号： -->
                </td>
                <td style="border: 0px; text-align: left" class="table_cell cell_1_5">
                  {{ healthTabelData.premaritalCode || '' }}
                </td>
              </tr>
              <tr class="table_row">
                <td class="table_cell cell_1_1">
                  <!-- 姓名 -->
                </td>
                <td class="table_cell cell_1_2">{{ healthTabelData.name }}</td>
                <td class="table_cell cell_1_3">
                  <!-- 出生日期 -->
                </td>
                <!-- <td class="table_cell cell_1_4">{{ healthTabelData.birthDate }}</td> -->
                <td style="text-align: right" class="table_cell cell_1_4">
                  <div style="display: flex; justify-content: space-around; width: 100%">
                    <div style="flex: 1">
                      <span style="padding: 0 2px"></span>
                    </div>
                    <div style="text-align: left; flex: 1">
                      <span style="padding: 0 2px">{{
                        healthTabelData.dateOfBirth?.split('-')[0] || ''
                      }}</span>
                    </div>
                    <div style="text-align: center; flex: 1">
                      <span style="padding: 0 2px">{{
                        healthTabelData.dateOfBirth?.split('-')[1] || ''
                      }}</span>
                    </div>
                    <div style="text-align: left; flex: 1; padding-left: 10px">
                      <span style="padding: 0 2px">{{
                        healthTabelData.dateOfBirth?.split('-')[2] || ''
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="table_cell cell_1_5" rowspan="4">照片粘贴处</td>
              </tr>
              <tr class="table_row">
                <td class="table_cell cell_2_1">
                  <!-- 性别 -->
                </td>
                <td class="table_cell cell_2_2">{{ healthTabelData.sex }}</td>
                <td class="table_cell cell_2_3">
                  <!-- 民族 -->
                </td>
                <td class="table_cell cell_2_4">{{ healthTabelData.nation }}</td>
              </tr>
              <tr class="table_row">
                <td class="table_cell cell_3_1">
                  <!-- 身份证号 -->
                </td>
                <td class="table_cell cell_3_2" colspan="3">
                  <div
                    style="
                      display: flex;
                      width: 100%;
                      height: 100%;
                      align-items: center;
                      padding-left: 9.5px;
                      box-sizing: border-box;
                    "
                  >
                    <div style="display: flex; gap: 7px">
                      <div
                        v-for="(digit, index) in healthTabelData.idNo.split('')"
                        :key="index"
                        style="
                          width: 17px;
                          height: 20px;
                          /* border: 1px solid #000; */
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 16px;
                        "
                      >
                        {{ digit }}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="table_row">
                <td class="table_cell cell_4_1">
                  <!-- 单位(职业) -->
                </td>
                <td class="table_cell cell_4_2" colspan="3">{{
                  healthTabelData.unitInContract
                }}</td>
              </tr>
              <tr class="table_row" style="height: 12mm">
                <td class="table_cell cell_5_1">
                  <!-- 住址 -->
                </td>
                <td class="table_cell cell_5_2" colspan="4">
                  <div style="display: flex; width: 100%; height: 100%">
                    <div
                      style="width: 25mm; text-align: left; padding: 2px; box-sizing: border-box"
                    >
                      {{ healthTabelData.addressProvince }}
                    </div>
                    <div
                      style="width: 20mm; text-align: left; padding: 2px; box-sizing: border-box"
                    >
                      {{ healthTabelData.addressCity }}
                    </div>
                    <div
                      style="width: 46mm; text-align: left; padding: 2px; box-sizing: border-box"
                    >
                      {{ healthTabelData.addressDistrict }}
                    </div>
                    <div
                      style="width: 46mm; text-align: left; padding: 2px; box-sizing: border-box"
                    >
                      {{ healthTabelData.addressStreet }}
                    </div>
                  </div>
                </td> </tr
              ><tr class="table_row">
                <td class="table_cell cell_6_1">
                  <!-- 对方姓名 -->
                </td>
                <td class="table_cell cell_6_2" colspan="4">{{ healthTabelData.partnerName }}</td>
              </tr>
              <!-- 直系、三代内旁系血亲关系 -->
              <tr class="table_row">
                <td
                  class="table_cell"
                  colspan="5"
                  style="height: 21mm; text-align: left; vertical-align: unset; padding-left: 5mm"
                >
                  <div style="display: flex; height: 100%">
                    <div style="width: 50%">
                      <!-- 直系、三代内旁系血亲关系 -->
                    </div>
                    <div style="width: 50%; display: flex">
                      <div style="width: 50%; display: flex">
                        <div class="flag">
                          <span v-if="healthTabelData.resultXygx == '无'">√</span>
                        </div>
                        <div>
                          <!-- 无 -->
                        </div>
                      </div>
                      <div style="width: 50%; display: flex">
                        <div class="flag">
                          <span v-if="healthTabelData.resultXygx == '有'">√</span>
                        </div>
                        <div>
                          <!-- 有 -->
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 婚前医学检查结果： -->
              <tr class="table_row">
                <td
                  class="table_cell"
                  colspan="5"
                  style="
                    height: 92.5mm;
                    text-align: center;
                    vertical-align: center;
                    padding-left: 5mm;
                  "
                >
                  {{ healthTabelData.pecontent || '未发现医学上不宜结婚的异常情况和疾病' }}
                </td>
              </tr>
              <tr class="table_row">
                <td
                  class="table_cell"
                  colspan="5"
                  style="height: 55.5mm; text-align: left; vertical-align: unset; padding-left: 5mm"
                >
                  <div
                    style="
                      box-sizing: border-box;
                      width: 100%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <!-- 第一行：标题 -->
                    <div style="flex: 1; display: flex; align-items: left; justify-content: center">
                      <!-- 医学意见： -->
                    </div>

                    <!-- 剩下五行：五个选项垂直排列 -->
                    <div style="flex: 5; display: flex; flex-direction: column; height: 100%">
                      <!-- 选项1 -->
                      <div style="flex: 1; display: flex; align-items: center">
                        <div class="flag">
                          <span v-if="healthTabelData.resultYxyj === '未发现医学上不宜结婚的情形'"
                            >√</span
                          >
                        </div>
                        <div style="flex: 1"> </div>
                      </div>

                      <!-- 选项2 -->
                      <div style="flex: 1; display: flex; align-items: center">
                        <div class="flag">
                          <span v-if="healthTabelData.resultYxyj === '建议暂缓结婚'">√</span>
                        </div>
                        <div style="flex: 1">
                          <!-- 2.建议暂缓结婚 -->
                        </div>
                      </div>

                      <!-- 选项3 -->
                      <div style="flex: 1; display: flex; align-items: center">
                        <div class="flag">
                          <span v-if="healthTabelData.resultYxyj === '建议不宜生育'">√</span>
                        </div>
                        <div style="flex: 1">
                          <!-- 3.建议不宜生育 -->
                        </div>
                      </div>

                      <!-- 选项4 -->
                      <div style="flex: 1; display: flex; align-items: center">
                        <div class="flag">
                          <span v-if="healthTabelData.resultYxyj === '建议不宜结婚'">√</span>
                        </div>
                        <div style="flex: 1">
                          <!-- 4.建议不宜结婚 -->
                        </div>
                      </div>

                      <!-- 选项5 -->
                      <div style="flex: 1; display: flex; align-items: center">
                        <div class="flag">
                          <span
                            v-if="healthTabelData.resultYxyj === '建议采取医学措施，尊重受检者意愿'"
                            >√</span
                          >
                        </div>
                        <div style="flex: 1">
                          <!-- 5.其他 -->
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="table_row" style="height: 17mm">
                <td class="table_cell cell_10_1">
                  <!-- 主检医生签字 -->
                </td>
                <td class="table_cell cell_10_2">{{ userInfo.nickname }}</td>
                <td class="table_cell cell_10_3" style="width: 44mm">
                  <!-- 检查单位专用章 -->
                </td>
                <td class="table_cell cell_10_4" colspan="2"></td>
              </tr>
              <tr style="border: 0px; height: 16mm"> </tr>
              <tr class="table_row">
                <td style="border: 0px" class="table_cell" colspan="3"></td>
                <td style="border: 0px" class="table_cell" colspan="2">
                  <div style="display: flex; width: 100%; height: 100%; gap: 1mm">
                    <div style="flex: 3"></div>
                    <div style="flex: 5; display: flex; gap: 1mm; height: 100%">
                      <div
                        style="
                          flex: 1;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          padding: 2px 0;
                        "
                      >
                        <div style="width: 80%; height: 16px; margin-bottom: 2px">{{
                          healthTabelData.chiefAuditDate?.split(' ')[0]?.split('-')[0] || ''
                        }}</div>
                      </div>
                      <div
                        style="
                          flex: 1;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          padding: 2px 0;
                        "
                      >
                        <div style="width: 80%; height: 16px; margin-bottom: 2px">{{
                          healthTabelData.chiefAuditDate?.split(' ')[0]?.split('-')[1] || ''
                        }}</div>
                      </div>
                      <div
                        style="
                          flex: 1;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          padding: 2px 0;
                        "
                      >
                        <div style="width: 80%; height: 16px; margin-bottom: 2px">{{
                          healthTabelData.chiefAuditDate?.split(' ')[0]?.split('-')[2] || ''
                        }}</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <img ref="tijianSrc" style="display: none" />
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import JsBarcode from 'jsbarcode'
import { selectPremaritalList } from '@/api/systemSetting/Premarital/index'
import { formatDate } from '@/utils/formatTime'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUser)
const tijianSrc = ref<HTMLImageElement | null>(null)
const HisSrc = ref<HTMLImageElement | null>(null)
const searchParams = ref({
  peId: '',
  name: '',
  sex: '',
  peVisitId: '',
  pePreDateStart: '',
  pePreDateEnd: '',
  premaritalCode: '',
  age: '',
  phoneNumber: '',
  peTypeName: '婚检',
  idNo: ''
})
const printParams = ref({
  peVisitReqVoList: [],
  labTag: false,
  personTag: false,
  labSheetTag: false,
  examSheetTag: false
})
const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])

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
  searchParams.value.pePreDateStart = time.value[0]
  searchParams.value.pePreDateEnd = time.value[1]
  selectPremaritalList(searchParams.value).then((res) => {
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
  healthTabelData.value = { ...row }
  console.log('%c Line:674 🎂 healthTabelData.value', 'color:#ffdd4d', healthTabelData.value)
  // 设置打印数据为选中行的数据
  printData.value = [
    {
      ...row,
      cardNumber: row.peId,
      hospital: '联勤保障部队北戴河疗养中心',
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

// 修改 // 修改 handlePrint 函数中的样式设置
const handlePrint = () => {
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
        margin: 15mm 15mm 0mm; /* 保持上下边距 */
        marks: none;
      }
      html, body {
        overflow: visible !important;
        height: 100% !important;
        margin: 0;
        padding: 0;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#health',
      preview: false,
      paperSize: 'A4',
      orientation: 'portrait',
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
}

// 更新模拟数据以包含新增字段
const healthTabelData = ref({
  addressCity: '',
  addressDistrict: '',
  addressProvince: '',
  addressStreet: '',
  chiefAuditDate: '',
  dateOfBirth: '1993-08-15',
  idNo: '412722199308158417',
  name: '陈广庆',
  nation: '汉族',
  objectAge: '',
  objectIdNo: '',
  objectIdType: '',
  objectName: '测试',
  pecontent: '艾滋病毒抗体检测：阳性\n尿白细胞：2+(125.)',
  premaritalCode: '',
  resultXygx: '无',
  resultYxyj: '未发现医学上不宜结婚的情形',
  sex: '男',
  uniqueId: 'undefined-undefined',
  unitInContract: ''
})
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
      height: calc(100vh - 160px);
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
  width: 210mm; // A4宽度
  min-height: 297mm; // A4高度
  padding: 8mm 13mm 0mm; // 左右边距26mm以达到158mm内容宽
  // box-sizing: border-box;
  font-family: 'SimSun', 'STSong', serif;

  .health_page {
    width: 100%;
    min-height: 237mm;
    background-color: #fff;

    .health_header {
      text-align: center;
      margin-bottom: 20px;

      .header_main {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .header_sub {
        font-size: 18px;
        margin-bottom: 15px;
      }

      .hospital_name {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .basic_info_table {
      margin-bottom: 20px;

      .info_table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;

        .table_row {
          height: 11.2mm;

          .table_cell {
            // border: 1px solid #000;
            padding: 2px 4px;
            vertical-align: middle;
            font-size: 18px;
            text-align: center;

            &.cell_1_1,
            &.cell_2_1,
            &.cell_3_1,
            &.cell_4_1,
            &.cell_5_1,
            &.cell_6_1 {
              width: 26mm;
              font-weight: bold;
            }

            &.cell_1_2,
            &.cell_2_2 {
              width: 27.5mm;
            }

            &.cell_1_3,
            &.cell_2_3 {
              width: 26mm;
              font-weight: bold;
            }

            &.cell_1_4,
            &.cell_2_4 {
              width: 51mm;
            }

            &.cell_1_5 {
              width: 30mm;
              vertical-align: middle;
            }

            &.cell_3_2 {
              width: 104.5mm; /* 27.5 + 26 + 51 */
            }

            &.cell_4_2 {
              width: 104.5mm; /* 27.5 + 26 + 51 */
            }

            &.cell_5_2 {
              width: 130.5mm; /* 27.5 + 26 + 51 + 30 - 3*1(border) */
            }

            &.cell_6_2 {
              width: 130.5mm; /* 27.5 + 26 + 51 + 30 - 3*1(border) */
            }
            &.cell_10_1,
            &.cell_10_3 {
              width: 44mm;
              font-weight: bold;
            }

            &.cell_10_2 {
              width: 27.5mm;
            }

            &.cell_10_4 {
              width: 77mm; /* 26mm + 51mm */
            }
          }
        }
      }
    }

    // 其他样式保持不变...
    .examination_table_section {
      margin-bottom: 20px;

      .examination_table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        .table_header {
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          padding: 10px 0;
        }

        .sub_header {
          text-align: center;
          font-weight: bold;
          border: 1px solid #000;
          padding: 8px 5px;
        }

        .table_cell {
          border: 1px solid #000;
          padding: 8px 5px;
          vertical-align: top;
        }
      }
    }

    .diagnosis_section {
      margin-bottom: 20px;

      .section_title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 10px;
        text-align: center;
      }

      .diagnosis_content {
        min-height: 80px;
        border: 1px solid #000;
        padding: 15px;
        font-size: 14px;
        line-height: 1.5;
      }
    }

    .signature_section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .signature_item {
        flex: 1;
        font-size: 14px;

        .signature_line {
          border-bottom: 1px solid #000;
          height: 30px;
          margin-top: 5px;
        }
      }
    }

    .note_section {
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
    }
  }
}
.flag {
  width: 20px;
  text-align: center;
  padding-right: 5px;
  transform: translateX(50px);
  font-size: 30px;
  font-weight: 1000;
}
</style>
<style>
@media print {
  @page {
    size: A4 portrait; /* A4纵向 */
    margin: 15mm;
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
