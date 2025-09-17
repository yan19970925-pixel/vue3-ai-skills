<template>
  <div class="box" ref="loadingBox">
    <div class="top-content">
      <el-button @click="getPdf2(false)">下载PDF</el-button>
      <el-button type="primary" @click="getPdf2(true)">打印</el-button>
    </div>
    <div ref="examSheet" id="pdfDom" class="pdfDom">
      <div class="print_content page" v-for="(perItem, perIndex) in props.data" :key="perIndex">
        <div class="print_heard">
          <div class="title">体检指引单</div>
          <div>
            <el-row>
              <el-col :span="6">姓名：{{ perItem[0][1].name }}</el-col>
              <el-col :span="6">体检号：{{ perItem[0][1].peId }}</el-col>
              <el-col :span="6">婚姻状况：{{ perItem[0][1].maritalStatus }}</el-col>
              <el-col :span="6"
                >体检日期：{{
                  perItem[0][1].peQueueDate
                    ? formatDate(perItem[0][1].peQueueDate, 'YYYY-MM-DD')
                    : ''
                }}</el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6">年龄：{{ perItem[0][1].age }}</el-col>
              <el-col :span="6">性别：{{ perItem[0][1].sex ? perItem[0][1].sex : '' }}</el-col>
              <el-col :span="6"
                >单位：{{ perItem[0][1].unitName ? perItem[0][1].unitName : '' }}</el-col
              >
              <el-col :span="6"
                >部门：{{ perItem[0][1].department ? perItem[0][1].department : '' }}</el-col
              >
            </el-row>
          </div>
          <div class="tishi">
            <div class="tishi_t">温馨<br />提示</div>
            <div class="tishi_con"
              >1、欢迎您前来体检，体检前请您先在前台报到。2、如需加项检查，请在报到时告知工作人员。3、高血压、冠心病随身携带药物，抽血后即可服药。4、体检完毕请将指引单交到前台，切勿带走。5、体检当日不能完成全部检查项目者，请务必告知前台工作人员，并将指引单交前台保存。</div
            >
          </div>
        </div>
        <div class="print_con" v-for="(item, index) in perItem" :key="index">
          <div class="table">
            <div class="table_t">
              <el-row>
                <el-col :span="8">体检项目</el-col>
                <el-col :span="4">医生/护士签字</el-col>
                <el-col :span="4">放弃检查签字/客户</el-col>
                <el-col :span="8" style="text-align: center">备注</el-col>
              </el-row>
              <div v-for="(iItem, iIndex) in item" :key="iIndex" class="neirong">
                <el-row v-if="iItem.type">
                  <el-col :span="24" class="weizhi">{{ iItem.type }}</el-col>
                </el-row>
                <el-row v-else>
                  <el-col :span="8">{{ iItem.assemName }}</el-col>
                  <el-col :span="4">签字：</el-col>
                  <el-col :span="4">签字：</el-col>
                  <el-col :span="8">{{ iItem.chartName }}</el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="b_msg">
            <div class="b_c"> 请您按指引单项目逐项检查，如您放弃检查，请签字确认。 </div>
            <div class="b_p">第{{ index + 1 }}页/共{{ perItem.length }}页</div>
          </div>
          <div class="bot">
            <div class="bot_l">体检报告<br />领取凭条</div>
            <div class="bot_r">
              <el-row>
                <el-col :span="6">体检号：{{ item[1].peId ? item[1].peId : '' }}</el-col>
                <el-col :span="6">姓名：{{ item[1].name ? item[1].name : '' }}</el-col>
                <el-col :span="6">性别：{{ item[1].sex ? item[1].sex : '' }}</el-col>
                <el-col :span="6">年龄：{{ item[1].age ? item[1].age : '' }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">工作单位：{{ item[1].unitName ? item[1].unitName : '' }}</el-col>
                <el-col :span="12"
                  >体检日期：{{
                    item[1].peQueueDate ? formatDate(item[1].peQueueDate, 'YYYY-MM-DD') : ''
                  }}</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12"
                  >联系电话：{{ item[1].phoneNumber ? item[1].phoneNumber : '' }}</el-col
                >
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'
import { formatDate } from '@/utils/formatTime'
const htmlTitle = ref('体检报告')
const loadingInstance = ref(null)
const loadingBox = ref(null)
const examSheet = ref(null)
const props = defineProps({
  data: Array
})
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
          // console.log('pdfDataUrl', pdfDataUrl)

          const pdfFile = base64PdfToFile(pdfDataUrl, 'report.pdf')
          // 验证结果
          console.log(pdfFile instanceof File) // true
          console.log(pdfFile.name) // "report.pdf"
          console.log(pdfFile.type) // "application/pdf"
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
/**
 * 将Base64 PDF字符串转换为File对象
 * @param {string} base64Pdf - 包含MIME类型的Base64 PDF字符串（如："data:application/pdf;base64,JVBERi0xLjQK..."）
 * @param {string} [fileName="document.pdf"] - 自定义文件名
 * @returns {File} PDF文件对象
 */
function base64PdfToFile(base64Pdf, fileName = 'document.pdf') {
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
// 页面挂载时（可选）
onMounted(() => {
  // 可以在这里添加页面挂载时的逻辑
  console.log('页面已挂载', props.data)
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  margin: 0px auto;
  height: calc(100vh - 54px);
  display: flex;
  overflow: hidden;
  /* padding: 40px 8px 0; */
  flex-direction: column;

  .top-content {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    text-align: right;
    padding-right: 10px;
  }

  .pdfDom {
    background-color: #666666;
    overflow: hidden;
    flex: 1;
    overflow: auto;
    margin-top: 6px;
  }
}
.print_content {
  height: 1250px;
  width: 900px;
  margin: 0 auto;
  background-color: #fff;
  page-break-after: always; /* 每块内容后强制分页 */
  break-inside: avoid; /* 防止内容块内部分页 */
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  .print_heard {
    padding: 0 20px;
    padding-top: 20px;
    .title {
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      height: 40px;
      font-weight: bold;
    }
    .tishi {
      width: 100%;
      font-size: 14px;
      display: flex;
      border-top: 2px solid #333333;
      border-bottom: 2px solid #333333;
      height: 64px;
      .tishi_t {
        width: 60px;
        line-height: 30px;
        color: #333333;
        font-weight: bold;
        border-right: #333333 1px solid;
        text-align: center;
      }
      .tishi_con {
        width: calc(100% - 61px);
        color: #666666;
        word-break: break-all;
        overflow: hidden;
        line-height: 20px;
      }
    }
  }
  .print_con {
    padding: 0 20px;
    .table {
      width: 100%;
      height: calc(1250px - 300px);
      overflow: hidden;
      .table_t {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #333333;
        font-size: 14px;
        .neirong {
          border-bottom: #333333 1px solid;
          .weizhi {
            font-weight: bold;
            font-size: 16px;
          }
          el-col {
            overflow: hidden;
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
      height: 30px;
      border-top: #333333 1px solid;
      border-bottom: #333333 1px solid;
      line-height: 30px;
      font-size: 14px;
      color: #333333;
      position: relative;
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
</style>
