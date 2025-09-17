<template>
  <div class="report">
    <div class="report_jiben page" v-for="(itemValue, p) in arrGroupAll" :key="p">
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
                  jsonData.peVisitListRespVo.chargeType ? jsonData.peVisitListRespVo.chargeType : ''
                }}</el-col
              >
              <el-col style="white-space: nowrap; overflow: hidden" :span="8"
                >体检类型：{{
                  jsonData.peVisitListRespVo.peTypeName ? jsonData.peVisitListRespVo.peTypeName : ''
                }}</el-col
              >
            </el-row>
            <el-row>
              <el-col :span="10">工作单位：{{ jsonData.peVisitListRespVo.unitInContract }}</el-col>
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
                      (iteminer.peResult && iteminer.peResult.length > 36 && !itemarr[0].isJy) ||
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
                v-if="itemarr[itemarr.length - 1].isSummary && item[0][0].peDeptName !== '检验科'"
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import JsBarcode from 'jsbarcode'
import { splitStringByWidth } from '@/utils/splitString'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  jsonData: {
    type: propTypes.any,
    default: () => ({})
  }
})

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
  const peId = props.jsonData?.peVisitListRespVo?.peId
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
  console.log('%c Line:510 🍧 props.jsonData', 'color:#7f2b82', props.jsonData)
  if (!props.jsonData) return

  const {
    // deptResultRespVoList = [],
    // deptResultRespVoList1 = [],
    // getDeptResultByPeIdGcPrint = [],
    // getGcPrintPicZz = [],
    getJyPrint = []
  } = props.jsonData

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
    it.forEach((item, m) => {
      item.forEach((k, h) => {
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
  console.log('%c Line:456 🍢 arrGroupAll', 'color:#fca650', arrGroupAll.value)
}

onMounted(() => {
  processData()
  generateBarcode()
})

watch(
  () => props.jsonData,
  () => {
    processData()
    generateBarcode()
  }
)
</script>

<style lang="scss" scoped>
.page {
  page-break-after: always;
}
.report {
  width: 1200px;
  margin: 0 auto;
  font-size: 18px;
  padding: 10px;
  height: 100%;
  overflow: auto;
  background-color: #f1f1f1;
  .report_con {
    background-color: #fff;
    padding: 30px;
    height: 1295px;
    width: 900px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border: 2px solid red;
    // border-bottom: 2px solid #000dd;
    // margin-bottom: 10px; */
    .title {
      margin-bottom: 200px;
      position: relative;
      .title_div {
        margin-bottom: 10px;
      }
      .position {
        text-align: center;
        position: absolute;
        top: 15px;
        right: 70px;
      }
    }
    .center {
      width: 100%;
      text-align: center;
      margin-bottom: 300px;
      div {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 26px;
      }
    }
    .info {
      font-weight: bold;
      margin: 0 auto;

      .info_flex {
        display: flex;
        margin-bottom: 15px;
        justify-content: center;
      }
      .d_border {
        width: 280px;
        padding-left: 50px;
        border-bottom: 2px solid #000;
        box-sizing: border-box;
      }
      .bottom {
        text-align: center;
        margin-top: 50px;
        /* font-size: 24px; */
        /* font-weight: bold; */
      }
    }
  }
  .report_jiben {
    background-color: #fff;
    padding: 30px;
    height: 1295px;
    width: 900px;
    margin: 0 auto;
    margin-top: 10px;
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
