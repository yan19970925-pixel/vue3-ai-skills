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
        <div class="div1">
          <span><b style="color: #ed2226">*</b>体检类型：</span>
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
        </div>
        <div class="div1">
          <el-button @click="search">查询</el-button>
          <!-- <el-button type="primary" @click="handlePrint">打印</el-button> -->
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
            <!-- <el-table-column
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
            /> -->
            <!-- 可以删除的操作列 -->
            <!-- 固定右侧 -->
            <el-table-column label="打印" width="100" fixed="right" text-alint="center">
              <template #default="scope">
                <!-- <el-button
                  style="color: red"
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                > -->
                <el-button
                  style="color: blue; font-size: 16px"
                  type="text"
                  size="small"
                  @click="handlePrint(scope.row)"
                  >打印</el-button
                >
                <!-- <el-button
                  style="color: blue; font-size: 16px"
                  type="text"
                  size="small"
                  @click="handlePrint(scope.row)"
                  >打印</el-button
                > -->
              </template>
            </el-table-column>
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
      123
      <!-- 打印内容区域 -->
      <div class="report">
        <div
          id="reportPaper"
          class="report_jiben page"
          v-for="(itemValue, p) in arrGroupAll"
          :key="p"
        >
          <div class="biaoti">
            <div class="print_heard">
              <el-row style="border-bottom: #000 2px solid">
                <el-col :span="16">
                  <div class="hos_t">
                    <div>北京市延庆区妇幼保健院</div>
                    <div class="eng_t"><span>Beijing Yanqing Maternal&Child Health</span></div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="hos_t">
                    <div>体检报告单</div>
                    <div class="eng_t"><span>Medical Report</span></div>
                  </div>
                </el-col>
              </el-row>
              <div class="title">化验报告单</div>
              <div class="per_msg" style="font-size: 24px; font-weight: 600">
                <el-row>
                  <el-col :span="8">姓名：{{ jsonData.peVisitListRespVo.name }}</el-col>
                  <el-col :span="8"
                    >性别：{{
                      jsonData.peVisitListRespVo.sex ? jsonData.peVisitListRespVo.sex : ''
                    }}</el-col
                  >
                  <el-col :span="8">年龄：{{ jsonData.peVisitListRespVo.age }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="16"
                    >体检性质：{{
                      jsonData.peVisitListRespVo.chargeType
                        ? jsonData.peVisitListRespVo.chargeType
                        : ''
                    }}</el-col
                  >
                  <el-col style="white-space: nowrap; overflow: hidden" :span="8"
                    >体检类型：{{
                      jsonData.peVisitListRespVo.peTypeName
                        ? jsonData.peVisitListRespVo.peTypeName
                        : ''
                    }}</el-col
                  >
                </el-row>
                <el-row>
                  <el-col :span="10"
                    >工作单位：{{ jsonData.peVisitListRespVo.unitInContract }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
          <div>
            <div class="jieguo" v-for="(item, i) in itemValue" :key="i">
              <div style="border-bottom: #000 2px solid" v-for="(itemarr, ir) in item" :key="ir">
                <div v-if="itemarr[0]">
                  <div class="jieguo_name" v-if="itemarr[0].isTermHead && itemarr[0].itemAssemName">
                    <!-- <div class="name1">■{{ itemarr[0].itemAssemName }}</div> -->
                    <div class="name1">{{ itemarr[0].itemAssemName }}</div>
                    <div class="name3">检查日期：{{ itemarr[0].peResultDate }}</div>
                    <div class="name2">检查医生：{{ itemarr[0].doctor }}</div>
                    <div class="name2">审核医生：{{ itemarr[0].doctor }}</div>
                  </div>
                </div>
                <div class="con_table">
                  <table class="table">
                    <tr v-if="itemarr[0].isTermHead" class="table-header">
                      <td :class="!itemarr[0].isJy ? 'td11' : 'td1'">项目名称</td>
                      <td :class="!itemarr[0].isJy ? 'td22' : 'td2'">检查结果</td>
                      <td class="td3" :style="itemarr[0].isJy ? '' : 'display:none'">提示</td>
                      <td class="td4" :style="itemarr[0].isJy ? '' : 'display:none'">参考范围</td>
                      <td class="td5" :style="itemarr[0].isJy ? '' : 'display:none'">单位</td>
                    </tr>
                    <tr v-for="(iteminer, ine) in itemarr" :key="ine">
                      <td :class="!itemarr[0].isJy ? 'td11' : 'td1'" v-if="iteminer.peItemName">{{
                        iteminer.peItemName
                      }}</td>
                      <td
                        :class="!itemarr[0].isJy ? 'td22' : 'td2'"
                        v-if="iteminer.peItemName"
                        :style="
                          (iteminer.peResult &&
                            iteminer.peResult.length > 36 &&
                            !itemarr[0].isJy) ||
                          (iteminer.peResult && iteminer.peResult.length > 10 && itemarr[0].isJy)
                            ? 'font-size:12px;line-height:15px; font-weight: bold;              display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;'
                            : ''
                        "
                        >{{ iteminer.peResult }}</td
                      >
                      <td
                        class="td3"
                        v-if="iteminer.peItemName"
                        :style="[
                          itemarr[0].isJy ? {} : { display: 'none' },
                          iteminer.abnormalIndicator == 'H'
                            ? { color: 'red', fontWeight: 'bold' }
                            : iteminer.abnormalIndicator == 'L'
                            ? { color: 'green', fontWeight: 'bold' }
                            : {}
                        ]"
                        >{{
                          iteminer.abnormalIndicator == 'H'
                            ? '⬆ 偏高'
                            : iteminer.abnormalIndicator == 'L'
                            ? '⬇ 偏低'
                            : ''
                        }}</td
                      >
                      <td
                        class="td4"
                        v-if="iteminer.peItemName"
                        :style="itemarr[0].isJy ? '' : 'display:none'"
                        >{{ iteminer.printContext }}</td
                      >
                      <td
                        class="td5"
                        v-if="iteminer.peItemName"
                        :style="itemarr[0].isJy ? '' : 'display:none'"
                        >{{ iteminer.units }}</td
                      >
                    </tr>
                  </table>
                  <div
                    class="xiaojie"
                    v-if="
                      itemarr[itemarr.length - 1].isSummary && item[0][0].peDeptName !== '检验科'
                    "
                    >小结</div
                  >
                  <div
                    class="xiaojie_con"
                    v-if="
                      itemarr[itemarr.length - 1]?.isSummaryText &&
                      itemarr[itemarr.length - 1].content &&
                      item[0][0].peDeptName !== '检验科'
                    "
                    ><div v-for="(item, ind) in itemarr[itemarr.length - 1].content" :key="ind">
                      {{ item }}</div
                    >
                  </div>
                  <!-- <div class="xiaojie_con">{{ itemarr }}</div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="pagination"
            >地点:北京市延庆区妇幼保健院新城街99号 102100 电话：010-51057828 传真：010-69101275</div
          >
          <!-- <div class="pagination">第{{ p + 2 }}页/共{{ arrGroupAll.length + 1 }}页</div> -->
        </div>
      </div>
    </div>
    <img ref="tijianSrc" style="display: none" />
    <!-- <div ref="printMe" id="pdfDom" class="pdfDom" v-if="showJson">
      <perExaminationReport :jsonData="jsonData" />
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import { ElTable, ElLoading, ElMessage } from 'element-plus'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'
import JsBarcode from 'jsbarcode'
import { selectPremaritalList } from '@/api/systemSetting/Premarital/index'
import { formatDate } from '@/utils/formatTime'
import { useUserStore } from '@/store/modules/user'
import { queryDictByConfig } from '@/api/PerPhyExamination/perExamination/index'
import { labTestReport } from '@/api/PerPhyExamination/print/LaboratoryReport/index'

const petypeNameList = ref<any>([])
const PrintData = ref([])

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
  peTypeName: '',
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

const tableData = ref([])
const search = () => {
  searchParams.value.name = '胡广云'
  time.value[0] = '2025-09-06'
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
  })
}
//根据体检类型筛选套餐分类
const changePeType = (val) => {
  search()
}
onMounted(async () => {
  petypeNameList.value = await queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
  search()
})

const showJson = ref(false)
const jsonData = ref({})
// 修改 handlePrint 函数中的样式设置
const handlePrint = (row) => {
  PrintData.value = []
  labTestReport({
    peId: row.peId || '',
    peVisitId: row.peVisitId || ''
  }).then((res) => {
    if (res) {
      // 获取数据
      jsonData.value = res
      showJson.value = true
      getPdf2(true)
      // nextTick(() => {
      //   print()
      // })
    }
  })
}

const printMe = ref(null)

const getPdf2 = async (isPrint) => {
  startLoading()
  // 添加短暂的延迟，确保加载动画有机会显示
  await new Promise((resolve) => setTimeout(resolve, 100))
  const element = printMe.value
  const pages = element.querySelectorAll('.page')
  const pdf = new JsPDF('p', 'pt', 'a4')
  let position = 0
  const promises = []

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const promise = html2Canvas(page, {
      allowTaint: true,
      taintTest: false,
      useCORS: true,
      dpi: window.devicePixelRatio * 4,
      scale: 4
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const imgWidth = 585.28
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      if (i > 0) {
        pdf.addPage()
        position = 0
      }
      pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight)
      if (i === pages.length - 1) {
        if (isPrint) {
          const pdfDataUrl = pdf.output('datauristring')
          const base64String = pdfDataUrl.split(',')[1] // 提取纯 Base64 字符串
          printPdf(base64String)
        } else {
          pdf.save(htmlTitle.value + '.pdf')
        }
      }
    })
    promises.push(promise)
  }

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error('Error generating images:', error)
  } finally {
    stopLoading()
  }
}
// 打印 PDF
const printPdf = (pdfData) => {
  printJS({
    printable: pdfData,
    base64: true,
    type: 'pdf',
    style: '@page { size: auto; margin: 0mm; }'
  })
}

const loadingInstance = ref(null)
const loadingBox = ref(null)
// 开始加载动画
const startLoading = () => {
  loadingInstance.value = ElLoading.service({
    target: loadingBox.value,
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.8)'
  })
}

// 停止加载动画
const stopLoading = () => {
  if (loadingInstance.value) {
    loadingInstance.value.close()
    loadingInstance.value = null
  }
  // 清除Dom元素下次打印重新动态加载
  showJson.value = false
}

import { ref, onMounted, watch } from 'vue'
import { splitStringByWidth } from '@/utils/splitString'

const newDeptResultA = ref<any>([])
const arrGroupAll = ref<any>([])

const splitArrayById = (() => {
  const cache = new Map()
  return (arr, idKey) => {
    const key = JSON.stringify(arr.map((item) => item[idKey]))
    if (cache.has(key)) return cache.get(key)

    const result = arr.reduce((acc, cur) => {
      const index = acc.findIndex((item) => item[0][idKey] === cur[idKey])
      index === -1 ? acc.push([cur]) : acc[index].push(cur)
      return acc
    }, [])

    cache.set(key, result)
    return result
  }
})()

const generateBarcode = () => {
  const canvas = document.getElementById('barcodeCanvas') as HTMLCanvasElement
  const peId = jsonData.value?.peVisitListRespVo?.peId
  if (canvas && peId) {
    JsBarcode(canvas, peId, {
      format: 'CODE128',
      displayValue: true,
      fontSize: 14,
      height: 60
    })
  }
}

const processData = () => {
  console.log('%c Line:510 🍧 jsonData.value', 'color:#7f2b82', jsonData.value)
  if (!jsonData.value) return

  const {
    // deptResultRespVoList = [],
    // deptResultRespVoList1 = [],
    // getDeptResultByPeIdGcPrint = [],
    // getGcPrintPicZz = [],
    getJyPrint = []
  } = jsonData.value

  if (getJyPrint?.length > 0) {
    getJyPrint.forEach((item) => (item.isJy = true))
  }

  const combinedData = [
    // ...deptResultRespVoList,
    // ...deptResultRespVoList1,
    // ...getDeptResultByPeIdGcPrint,
    // ...getGcPrintPicZz,
    ...getJyPrint
  ]
  console.log('%c Line:726 🥪 combinedData', 'color:#b03734', combinedData.value)

  const groupedByItemAssemName = splitArrayById(combinedData, 'itemAssemName')
  const result = groupedByItemAssemName.map((group) => splitArrayById(group, 'itemAssemName'))
  console.log('%c Line:534 🍷 result', 'color:#93c0a4', result.value)

  result.forEach((it, index) => {
    it.forEach((item, k) => {
      if (item.length > 0) {
        item[0].isTermHead = true

        if (item[0].isTermHead == true) {
          console.log('%c Line:735 🥑 item[0]', 'color:#6ec1c2', item[0])
        }
        item[item.length - 1].isSummary = true

        item.forEach((g) => {
          g.itemAssemName = item[0].itemAssemName
          if (typeof g.content === 'string') {
            g.content = JSON.parse(`[${JSON.stringify(g.content)}]`)
          } else if (!g.content) {
            g.content = []
          }
        })

        if (k === 0 && item.length) {
          item[0].isDeptHead = true
        }
      }
    })
  })

  newDeptResultA.value = result
  buildPaginationGroups(result)
}

const buildPaginationGroups = (data) => {
  console.log('%c Line:562 🍢 data', 'color:#3f7cff', data)
  arrGroupAll.value = []
  let pagingGroup: any = []
  let deptGroup: any = []
  let termGroup: any = []
  let newHeight = 0
  let excessSummary: any = []

  const heightLimits = {
    deptHead: 33,
    termHead: 60,
    normal: 30,
    summary: 30
  }

  data.forEach((it, index) => {
    console.log('%c Line:577 🍎 it', 'color:#ffdd4d', it)
    it.forEach((item, m) => {
      console.log('%c Line:578 🥚 item', 'color:#3f7cff', item)
      item.forEach((k, h) => {
        console.log('%c Line:579 🍬 k', 'color:#7f2b82', k)
        if (index === 0 && m === 0 && h === 0) newHeight += heightLimits.deptHead

        if (k.isDeptHead) {
          if (newHeight + heightLimits.deptHead > 1150) {
            flushGroups()
            newHeight = heightLimits.deptHead
          } else {
            newHeight += heightLimits.deptHead
          }
        }

        if (k.isTermHead) {
          const itemHeight = heightLimits.termHead
          if (newHeight + itemHeight > 1150) {
            if (k.isDeptHead) {
              termGroup.push({ ...k, isDeptHead: true, isTermHead: true })
              k.isDeptHead = false
            }
            flushGroups()
            newHeight = itemHeight
          } else {
            newHeight += itemHeight
          }
        }

        const projectWidth = splitStringByWidth(k.peItemName, 180)
        const itemHeight = projectWidth?.length > 1 ? heightLimits.termHead : heightLimits.normal

        if (newHeight + itemHeight > 1150) {
          if (k.isTermHead) {
            termGroup.push({ ...k, isDeptHead: true, isTermHead: true })
            k.isTermHead = false
            k.isDeptHead = false
          }
          flushGroups()
          termGroup.push(k)
          newHeight = itemHeight
        } else {
          termGroup.push(k)
          newHeight += itemHeight
        }

        handleSummary(k, heightLimits.summary)
      })

      if (termGroup.length) {
        deptGroup.push(termGroup)
        termGroup = []
      }
    })

    if (deptGroup.length) {
      pagingGroup.push(deptGroup)
      deptGroup = []
    }

    if (index === data.length - 1) {
      if (pagingGroup.length) {
        arrGroupAll.value.push(pagingGroup)
      }
    }
  })

  function flushGroups() {
    if (termGroup.length) {
      deptGroup.push(termGroup)
      termGroup = []
    }
    if (deptGroup.length) {
      pagingGroup.push(deptGroup)
      deptGroup = []
    }
    if (pagingGroup.length) {
      arrGroupAll.value.push(pagingGroup)
      pagingGroup = []
    }
  }

  function handleSummary(k, height) {
    if (excessSummary.length > 0) {
      termGroup[termGroup.length - 1].isSummaryText = true
      termGroup[termGroup.length - 1].content = excessSummary
      excessSummary = []
    }

    if (k.isSummary && k.content?.length > 0) {
      for (let j = 0; j < k.content.length; j++) {
        if (newHeight + height > 1150) {
          if (termGroup.length) {
            if (j === 0) {
              termGroup[termGroup.length - 1].isSummaryText = false
            } else {
              termGroup[termGroup.length - 1].isSummaryText = true
              termGroup[termGroup.length - 1].content = k.content.slice(0, j + 1)
            }
            excessSummary = k.content.slice(j)
            deptGroup.push(termGroup)
            termGroup = []
          }
          flushGroups()
          newHeight = height * excessSummary.length
          break
        } else {
          newHeight += height
          if (termGroup.length) {
            termGroup[termGroup.length - 1].isSummaryText = true
          } else {
            excessSummary = k.content.slice(j)
          }
        }
      }
    }
  }
  console.log('%c Line:456 🍢 arrGroupAll', 'color:#fca650', arrGroupAll)
}
const print = () => {
  // 确保 DOM 更新
  const style = document.createElement('style')
  style.innerHTML = `
        @page {
          size: A4 portrait;
          margin:0mm;
          marks: none;
        }
        html, body {
          overflow: visible !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #reportPaper {
          display: block !important;
          visibility: visible !important;
        }
      `
  document.head.appendChild(style)

  new VuePrintNext({
    el: '#reportPaper',
    preview: false, // 调试时启用预览
    paperSize: 'A4',
    orientation: 'portrait',
    previewOpenCallback: () => {
      document.head.removeChild(style)
    }
  })
}

watch(
  () => jsonData.value,
  () => {
    processData()
    generateBarcode()
  }
)
</script>
<style lang="scss" scoped>
.per_report {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
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
  // padding: 18mm 16mm 0mm;
  padding: 0mm 16mm 0mm;

  page-break-after: always; /* 每块内容后强制分页 */
  break-inside: avoid; /* 防止内容块内部分页 */
  width: 210mm;
  height: 290mm;

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
  // padding: 18mm 16mm 0mm; // 左右边距16mm
  box-sizing: border-box;
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

<style lang="scss" scoped>
.page {
  page-break-after: always;
}

#report {
  width: 210mm; // A4宽度
  min-height: 297mm; // A4高度
  // padding: 18mm 16mm 0mm; // 左右边距16mm
  box-sizing: border-box;
  font-family: 'SimSun', 'STSong', serif;
}
.report {
  // width: 1200px;
  // margin: 0 auto;
  font-size: 18px;
  // padding: 10px;
  // height: 100%;
  overflow: auto;
  background-color: #f1f1f1;
  .report_jiben {
    background-color: #fff;
    width: 210mm; // A4宽度
    min-height: 297mm; // A4高度
    padding: 10mm 16mm 0mm; // 左右边距16mm
    box-sizing: border-box;
    font-family: 'SimSun', 'STSong', serif;
    // width: 900px;
    // margin: 0 auto;
    // margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border: 2px solid red; */
    position: relative;
    .pagination {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 14px;
    }
    .biaoti {
      width: 100%;

      // width: 210mm;
      display: flex;
      border-bottom: #000 2px solid;
      box-sizing: border-box;
      margin-bottom: 10px;
      // div {
      //   width: 20%;
      //   overflow: hidden;
      //   font-size: 14px;
      // }
      // .print_heard {
      //   // padding: 0mm 16mm 0mm;
      //   width: 210mm;
      //   // height: 290mm;
      //   .hos_t {
      //     margin-top: 18mm;
      //     // display: flex;
      //     text-align: center;
      //     justify-content: center;
      //     // height: 56px;
      //     align-items: center;
      //     font-size: 26px;
      //     font-weight: bold;
      //     letter-spacing: 0.3em;
      //     img {
      //       position: absolute;
      //       left: 0px;
      //       top: 0;
      //     }
      //     .eng_t {
      //       font-size: 16px;
      //       letter-spacing: 0.05em;
      //     }
      //   }
      //   .title {
      //     width: 100%;
      //     font-size: 20px;
      //     text-align: center;
      //     line-height: 40px;
      //     height: 40px;
      //     font-weight: bold;
      //   }
      //   .per_msg {
      //     position: relative;
      //     font-family: 'SimSun', 'STSong', serif;
      //     .el-row {
      //       .el-col {
      //         overflow: hidden;
      //         white-space: nowrap;
      //         font-size: 14px;
      //       }
      //     }
      //     img {
      //       width: 80px;
      //       height: 110px;
      //       position: absolute;
      //       right: 20px;
      //       top: -54px;
      //     }
      //   }
      //   .tishi {
      //     border-top: #333333 2px solid;

      //     .tishi_in {
      //       width: 100%;
      //       font-size: 14px;
      //       display: flex;
      //       /* border-top: 2px solid #333333; */
      //       border-bottom: 2px solid #333333;
      //       /* height: 64px; */
      //     }
      //     .tishi_in:last-child {
      //       border-top: none;

      //       border-bottom: none;
      //     }
      //     .tishi_t {
      //       width: 120px;
      //       /* line-height: 30px; */
      //       color: #333333;
      //       font-weight: bold;
      //       /* border-right: #333333 2px solid; */
      //       text-align: center;
      //       display: flex;
      //       align-items: center;
      //       justify-content: center;
      //     }
      //     .tishi_con {
      //       width: calc(100% - 121px);
      //       color: #666666;
      //       word-break: break-all;
      //       overflow: hidden;
      //       /* line-height: 20px; */
      //       .el-row {
      //         line-height: 20px;
      //         height: 20px;
      //         .el-col:first-child {
      //           padding-left: 8px;
      //         }
      //       }
      //     }
      //   }
      // }
    }
    .qingkuang {
      width: 100%;
      text-align: center;
      font-size: 22px;
      line-height: 50px;
    }
    .table {
      width: 100%;
      table {
        width: 100%;
        margin-bottom: 80px;
        tr {
          td {
            border-bottom: #000 2px solid;
            border-right: #000 2px solid;
            box-sizing: border-box;
            text-align: center;
            height: 30px;
            line-height: 30px;
            padding: 0;
          }
          td:first-child {
            border-left: #000 2px solid;
            box-sizing: border-box;
          }
        }
        tr:first-child {
          border-top: #000 2px solid;
          box-sizing: border-box;
        }
      }
    }
    .logo_ti {
      position: relative;
      width: 100%;
      height: 70px;
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 0;
      }
    }
    .back_c {
      width: 100%;
      font-size: 22px;
      text-align: center;
      font-weight: bold;
      line-height: 40px;
      background-color: #9fc3e8;
    }
    .back_t {
      width: 100%;
      font-size: 20px;
      margin: 10px 0;
      font-weight: bold;
    }
    .back_for {
      margin-bottom: 20px;
      .back_t1 {
        width: 100%;
        font-size: 18px;
        line-height: 28px;
      }
      .back_t1_c {
        width: 100%;
        font-size: 18px;
        line-height: 28px;
        word-wrap: break-word; /* 允许在单词内换行 */
      }
    }
    .jianyi {
      width: 100%;
      font-size: 22px;
      font-weight: bold;
    }
    .jianyi_c {
      width: 100%;
      height: auto;
      font-size: 18px;
      line-height: 28px;
      word-wrap: break-word; /* 允许在单词内换行 */
    }
    .ganxie {
      width: 100%;
      font-size: 18px;
      line-height: 28px;
    }
    .ganxie_c {
      width: 100%;
      font-size: 18px;
      line-height: 28px;
      word-wrap: break-word; /* 允许在单词内换行 */
      margin-bottom: 40px;
    }
    .doc_con {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .con1 {
        width: 30%;
        font-weight: bold;
      }
    }
    .jieguo_t {
      width: 100%;
      font-size: 24px;
      text-align: center;
      height: 33px;
      line-height: 33px;
    }
    .jieguo {
      .jieguo_keshi {
        width: 100%;
        font-size: 24px;
        text-align: center;
        height: 33px;
        line-height: 33px;
        border-top: #000 2px solid;
        border-bottom: #000 2px solid;
        box-sizing: border-box;
        font-weight: bold;
        background-color: #9fc3e8;
      }
      .jieguo_name {
        display: flex;
        font-size: 20px;
        height: 30px;
        border-bottom: #000 2px solid;
        box-sizing: border-box;
        // background-color: #9fc3e8;
        font-weight: bold;
        div {
          overflow: hidden;
        }
        .name1 {
          width: 45%;
        }
        .name2 {
          width: 25%;
        }
        .name3 {
          width: 30%;
        }
      }
      .con_table {
        .table {
          /* // tr:first-child {
          //   td {
          //     font-weight: bold;
          //   }
          // } */
          .table-header {
            td {
              font-weight: bold;
            }
          }
          tr {
            td {
              height: 30px;
              line-height: 30px;
              text-align: left;
              padding: 0;
            }
            .td1 {
              width: 30%;
            }
            .td2 {
              width: 25%;
            }
            .td3 {
              width: 15%;
            }
            .td4 {
              width: 15%;
            }
            .td5 {
              width: 15%;
            }
            .td11 {
              width: 25%;
            }
            .td22 {
              width: 100%;
            }
          }
        }
      }
      .xiaojie {
        width: 100%;
        font-size: 20px;
        border-bottom: #000 2px solid;
        border-top: #000 2px solid;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
      }
      .xiaojie_con {
        div {
          height: 30px;
          line-height: 30px;
          text-align: left;
        }
      }
    }
  }
  .hei_1200 {
    height: 1295px;
    width: 900px;
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border-bottom: 2px solid #000; */
  }
}
.mr_20 {
  margin-right: 20px;
}
.mr_10 {
  margin-right: 10px;
}
.td_14 {
  width: 14%;
}
.td_28 {
  width: 28%;
}
.td_42 {
  width: 42%;
}
.td_84 {
  width: 84%;
}
.td_b {
  font-weight: bold;
}
.td_12 {
  width: 12%;
}
.td_24 {
  width: 24%;
}
.bor_t {
  border-top: #000 2px solid;
  box-sizing: border-box;
}
.print_heard {
  // padding: 0mm 16mm 0mm;
  width: 210mm;
  // height: 290mm;
  .hos_t {
    margin-top: 18mm;
    // display: flex;
    text-align: center;
    justify-content: center;
    // height: 56px;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 0.3em;
    img {
      position: absolute;
      left: 0px;
      top: 0;
    }
    .eng_t {
      font-size: 16px;
      letter-spacing: 0.05em;
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
    border-top: #333333 2px solid;

    .tishi_in {
      width: 100%;
      font-size: 14px;
      display: flex;
      /* border-top: 2px solid #333333; */
      border-bottom: 2px solid #333333;
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
      /* border-right: #333333 2px solid; */
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
</style>
