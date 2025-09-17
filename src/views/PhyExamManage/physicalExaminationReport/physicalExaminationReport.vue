<template>
  <div class="box" ref="loadingBox">
    <div class="top-content">
      <el-button @click="getPdf2(false)">下载PDF</el-button>
      <el-button type="primary" @click="getPdf2(true)">打印</el-button>
    </div>
    <div ref="examSheet" id="pdfDom" class="pdfDom">
      <ExaminationReport></ExaminationReport>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import ExaminationReport from '@/views/PhyExamManage/components/examinationReport/examinationReport.vue'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'

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
}

// 生成 PDF 并下载或打印
const getPdf2 = async (isPrint) => {
  startLoading()
  // 添加短暂的延迟，确保加载动画有机会显示
  await new Promise((resolve) => setTimeout(resolve, 100))
  const element = examSheet.value
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

// 页面挂载时（可选）
onMounted(() => {
  // 可以在这里添加页面挂载时的逻辑
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  margin: 0px auto;
  height: calc(100vh - 54px);
  display: flex;
  overflow: hidden;
  padding: 40px 8px 0;
  flex-direction: column;

  .top-content {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    text-align: right;
    padding-right: 10px;
  }

  .pdfDom {
    background-color: #fff;
    overflow: hidden;
    flex: 1;
    overflow: auto;
    margin-top: 6px;
  }
}
</style>
