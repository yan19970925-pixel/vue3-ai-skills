<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="base-cont">
          <span class="mr-6px ml-6px">单位代码:</span>
          <el-input
            v-model="searchParams.unitCode"
            placeholder="请输入"
            class="select-item !w-80px"
            clearable
          />
          <span class="ml-16px mr-6px">次数:</span>
          <el-input
            v-model="searchParams.unitVisitId"
            placeholder="请输入"
            class="select-item !w-70px"
            clearable
          />
          <el-button type="primary" @click="searchByUnitCode"> 查询 </el-button>
          <span class="ml-16px mr-6px">审核时间:</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="searchParams.startDate"
            value-format="YYYY-MM-DD"
          />
          <span class="ml-6px mr-6px">至</span
          ><el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="searchParams.endDate"
            value-format="YYYY-MM-DD"
          />
          <el-button type="primary" @click="searchByDate"> 审核时间过滤 </el-button>
          <span class="ml-16px mr-6px">体检号:</span>
          <el-input
            v-model="searchParams.peId"
            placeholder="请输入"
            clearable
            class="select-item !w-180px"
          />
          <span class="ml-16px mr-6px">次数:</span>
          <el-input
            v-model="searchParams.peVisitId"
            placeholder="请输入"
            class="select-item !w-70px"
            clearable
          />
          <el-button type="primary" @click="searchByPeId"> 查询 </el-button>
        </div>
        <div class="base-cont">
          <span class="mr-6px ml-33px">姓名:</span>
          <el-input
            v-model="searchParams.name"
            placeholder="请输入"
            clearable
            class="select-item !w-180px"
          />
          <el-checkbox v-model="isShowDetail" label="详情" />
          <el-checkbox label="打印封面" />
          <el-checkbox label="打印内容" />
          <el-button class="resetBtn ml-16px" @click="getFinalReport(false, true, false)">
            <img
              src="@\assets\imgs\print2x.png"
              alt="打印"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            打印
          </el-button>
          <el-button class="resetBtn" @click="getFinalReport(true, true, false)">
            <img
              src="@\assets\imgs\preview.png"
              alt="预览"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            预览
          </el-button>
          <el-button class="resetBtn" @click="getFinalReport(false, false, false)">
            <img
              src="@\assets\imgs\exportPdf.png"
              alt="导出"
              style="width: 16px; height: 16px; margin-right: 4px"
            />
            导出pdf
          </el-button>
          <!-- <el-button class="resetBtn" @click="getFinalReport(false, false, true)">
            <el-icon><Upload /></el-icon>
            上传体检报告pdf
          </el-button> -->
          <el-button class="resetBtn deleteBtn" @click="clearChecked"> 移除选中</el-button>
        </div>
      </div>
      <div class="export">
        <div class="export-l"
          ><div class="flex mt-10px align-items">
            <span class="cont-span">未打印报告人员列表：</span>
            <el-input
              style="width: calc(100% - 140px)"
              v-model="unPrintName"
              placeholder="请输入"
              class="select-item"
              clearable
              @change="selectUnPrintList"
            />
          </div>
          <div class="unSelectpackage mt-12px" v-if="!isShowDetail">
            <el-radio-group v-model="unPrintChecked">
              <el-radio
                v-for="item in unPrintList"
                :key="item.peId"
                :label="item.peId"
                size="large"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </div>
          <el-table
            ref="adviceTableRef"
            :data="unPrintList"
            border
            v-else
            style="width: 100%; height: calc(100% - 52px); margin-top: 12px"
            highlight-current-row
            stripe
          >
            <el-table-column
              show-overflow-tooltip
              type="index"
              label="体检人"
              width="120"
            ></el-table-column>
            <el-table-column show-overflow-tooltip prop="diagnosis" label="体检次数" width="120" />
            <el-table-column show-overflow-tooltip prop="diagnosis" label="年龄" width="120" />
            <el-table-column show-overflow-tooltip prop="total" label="性别" width="120" />
            <el-table-column show-overflow-tooltip prop="maleCount" label="婚姻" width="120" />
            <el-table-column show-overflow-tooltip prop="femaleCount" label="级别" width="auto" />
          </el-table>
        </div>
        <div class="export-r"
          ><div class="flex mt-10px align-items">
            <span class="cont-span">已打印报告人员列表：</span>
            <el-input
              style="width: calc(100% - 140px)"
              v-model="printName"
              placeholder="请输入"
              class="select-item"
              clearable
              @change="selectPrintList"
            />
          </div>
          <div class="selectedpackage mt-12px">
            <el-radio-group v-model="printChecked">
              <el-radio v-for="item in printList" :key="item.peId" :label="item.peId" size="large">
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      :model-value="yulanDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="330mm"
      class="yulan_dialog"
      @close="() => (yulanDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">体检报告</div>
      </template>
      <div
        ref="printMe"
        id="pdfDom"
        class="pdfDom"
        style="height: 600px; overflow-y: auto"
        v-if="showJson"
      >
        <perExaminationReport :jsonData="jsonData" />
      </div>
    </Dialog>
    <div ref="printMe" id="pdfDom" class="pdfDom" v-if="showJson">
      <perExaminationReport :jsonData="jsonData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import {
  peReportPrint,
  getPeReportPersonalListByUnit,
  getPeReportPersonalListByDate,
  getPeReportPersonalListByPeId,
  finalReport,
  minioPdfUpload,
  examReportInfo
} from '@/api/PerPhyExamination/PerExport/index'
import perExaminationReport from '@/views/PhyExamManage/components/examinationReport/perExaminationReport.vue'
import { ElTable, ElLoading, ElMessage } from 'element-plus'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'
import { formatDate } from '@/utils/formatTime'
const searchParams = reactive({
  unitCode: '',
  unitVisitId: '',
  startDate: formatDate(new Date(), 'YYYY-MM-DD'),
  endDate: formatDate(new Date(), 'YYYY-MM-DD'),
  peId: '',
  peVisitId: '',
  name: '',
  resultStatus: ''
})
const unPrintList = ref<any>([])
const printList = ref<any>([])
const allUnPrintList = ref<any>([])
const allPrintList = ref<any>([])
const unPrintName = ref('')
const printName = ref('')
const unPrintChecked = ref('')
const printChecked = ref('')
const isShowDetail = ref(false)
// 提取数据按钮点击事件
const searchByUnitCode = async () => {
  let params = {
    unitCode: searchParams.unitCode,
    unitVisitId: searchParams.unitVisitId,
    startDate: '',
    endDate: '',
    peId: '',
    peVisitId: '',
    name: searchParams.name,
    resultStatus: ''
  }
  getPeReportPersonalListByUnit(params)
    .then((res) => {
      if (res) {
        unPrintList.value = res.unPrintList
        printList.value = res.printList
        allUnPrintList.value = res.unPrintList
        allPrintList.value = res.printList
      }
    })
    .catch((err) => {})
}
const searchByDate = async () => {
  let params = {
    unitCode: '',
    unitVisitId: '',
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    peId: '',
    peVisitId: '',
    name: searchParams.name,
    resultStatus: ''
  }
  getPeReportPersonalListByDate(params)
    .then((res) => {
      if (res) {
        unPrintList.value = res.unPrintList
        printList.value = res.printList
        allUnPrintList.value = res.unPrintList
        allPrintList.value = res.printList
      }
    })
    .catch((err) => {})
}
const searchByPeId = async () => {
  let params = {
    unitCode: '',
    unitVisitId: '',
    startDate: '',
    endDate: '',
    peId: searchParams.peId,
    peVisitId: searchParams.peVisitId,
    name: searchParams.name,
    resultStatus: ''
  }
  getPeReportPersonalListByPeId(params)
    .then((res) => {
      if (res) {
        unPrintList.value = res.unPrintList
        printList.value = res.printList
        allUnPrintList.value = res.unPrintList
        allPrintList.value = res.printList
      }
    })
    .catch((err) => {})
}
const jsonData = ref<any>({})
const yulanDialogVisible = ref(false)
const showJson = ref(false)
const printMe = ref(null)
const getFinalReport = async (bool, printBool, upload) => {
  let itemDetail = {}
  if (unPrintChecked.value) {
    itemDetail = unPrintList.value.find((item) => item.peId === unPrintChecked.value)
  } else if (printChecked.value) {
    itemDetail = printList.value.find((item) => item.peId === printChecked.value)
  }
  console.log('itemDetail', itemDetail)

  if (!itemDetail || !itemDetail.peId || !itemDetail.peVisitId) {
    ElMessage.error('请选择要打印的体检人')
    return
  } else {
    await finalReport({
      peId: itemDetail.peId || '',
      peVisitId: itemDetail.peVisitId || ''
    })
      .then((res) => {
        if (!bool && printBool) {
          peReportPrint({ peId: itemDetail.peId, peVisitId: itemDetail.peVisitId })
        }

        if (res) {
          // 获取数据
          jsonData.value = res
          showJson.value = true
          console.log('jsonData', jsonData)
          jsonData.value.peVisitListRespVo.peVisitId = itemDetail.peVisitId
          if (bool) {
            yulanDialogVisible.value = bool
          } else {
            getPdf2(printBool, itemDetail, upload)
          }
          // jsonData.value.user = itemDetail.value
          // getPePatList()
        }
      })
      .catch((error) => {
        console.error('数据加载失败', error)
      })
  }
}

// 定义响应式变量
const htmlTitle = ref('体检报告')
const loadingInstance = ref(null)
const loadingBox = ref(null)
const examSheet = ref(null)

// 打印 PDF
const printPdf = (pdfData) => {
  printJS({
    printable: pdfData,
    base64: true,
    type: 'pdf',
    style: '@page { size: auto; margin: 0mm; }'
  })
}

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

// 生成 PDF 并下载或打印
const getPdf2 = async (isPrint, itemDetail, upload) => {
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
        } else if (upload) {
          const pdfDataUrl = pdf.output('datauristring')
          const base64String = pdfDataUrl.split(',')[1] // 提取纯 Base64 字符串
          /*           const pdfFile = base64PdfToFile(pdfDataUrl, `${itemDetail.name}${htmlTitle.value}.pdf`)

          // 验证结果
          console.log(pdfFile instanceof File) // true
          console.log(pdfFile.name) // "report.pdf"
          console.log(pdfFile.type) // "application/pdf" */
          examReportInfo({
            peId: itemDetail.peId,
            peVisitId: itemDetail.peVisitId
          }).then((res) => {
            let uploadParams = {
              // multipartFile: pdfFile,
              // reportId: itemDetail.peId + new Date().getTime() + ''
              multipartFile: base64String,
              peId: itemDetail.peId,
              peVisitId: itemDetail.peVisitId,
              name: itemDetail.name
            }
            console.log('uploadParams', uploadParams)
            minioPdfUpload(uploadParams)
              .then((res) => {
                if (res) {
                  ElMessage.success('上传成功')
                }
              })
              .catch((error) => {
                console.error('上传失败', error)
              })
          })
        } else {
          pdf.save(itemDetail.name + htmlTitle.value + '.pdf')
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
/**
 * 将Base64 PDF字符串转换为File对象
 * @param {string} base64Pdf - 包含MIME类型的Base64 PDF字符串（如："data:application/pdf;base64,JVBERi0xLjQK..."）
 * @param {string} [fileName="document.pdf"] - 自定义文件名
 * @returns {File} PDF文件对象
 */
const base64PdfToFile = (base64Pdf, fileName = 'document.pdf') => {
  // 参数校验
  if (typeof base64Pdf !== 'string' || !base64Pdf.includes(';base64,')) {
    throw new Error('Invalid Base64 PDF format')
  }

  // 提取MIME类型和纯Base64数据
  const [metadata, base64Data] = base64Pdf.split(',')
  const mimeType = metadata.match(/:(.*?);/)[1]

  // 验证PDF类型
  if (mimeType !== 'application/pdf') {
    console.warn(`Expected PDF type but got ${mimeType}`)
  }

  // 解码并转换
  const binaryData = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(binaryData.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }

  // 创建File对象
  return new File([uint8Array], fileName, {
    type: 'application/pdf',
    lastModified: Date.now()
  })
}

const clearChecked = () => {
  unPrintChecked.value = ''
  printChecked.value = ''
}
const selectPrintList = (val) => {
  if (val) {
    printList.value = printList.value.filter((item) => item.name.includes(val))
  } else {
    printList.value = allPrintList.value
  }
}
const selectUnPrintList = (val) => {
  if (val) {
    unPrintList.value = unPrintList.value.filter((item) => item.name.includes(val))
  } else {
    unPrintList.value = allUnPrintList.value
  }
}

onMounted(() => {
  searchByDate()
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
}
.base-cont {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  gap: 6px;
  padding: 6px;

  &.auto {
    display: block;
  }

  .select-item {
    width: 240px;
  }

  .base-div {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;

    &.spec {
      justify-content: left;
      gap: 0;

      .select-area {
        width: 1290px;
      }
    }
  }
}

.resetBtn {
  border: 1px solid #3473d1 !important;
  color: #3473d1 !important;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}
.resetBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}

.cont-span {
  color: #3473d1;
  position: relative;
  top: 5px;
}
.deleteBtn {
  border: 1px solid #ed2226 !important;
  color: #ed2226 !important;
}
.deleteBtn:hover {
  border: 1px solid #ed2226 !important;
  color: #ed2226 !important;
}
.export {
  padding: 16px;
  background-color: #fff;
  height: calc(100% - 94px);
  display: flex;
  justify-content: space-between;
  .export-l {
    width: 40%;
    height: 100%;
    .unSelectpackage {
      border-radius: 4px;
      border: 1px solid #cccccc;
      padding: 10px;
      width: 100%;
      height: calc(100% - 52px);
    }
  }
  .export-r {
    width: 59%;
    height: 100%;
    .selectedpackage {
      border-radius: 4px;
      border: 1px solid #cccccc;
      padding: 10px;
      width: 100%;
      height: calc(100% - 52px);
    }
  }
}
</style>
