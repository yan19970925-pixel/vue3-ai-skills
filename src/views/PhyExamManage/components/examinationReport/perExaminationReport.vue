<template>
  <div class="report">
    <div class="report_con page">
      <div class="title"> </div>
      <div class="center">
        <div> {{ jsonData.peVisitListRespVo.hospitalname }} </div>
        <div> 体 检 报 告 </div>
      </div>
      <div class="info">
        <div class="info_flex">
          <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.name }}</div>
        </div>
        <div class="info_flex">
          <div>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
          <div class="d_border" style="width: 94px; padding-left: 30px">{{
            jsonData.peVisitListRespVo.sex
          }}</div>
          <div style="margin-left: 10px">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div>
          <div class="d_border" style="width: 94px; padding-left: 30px">{{
            jsonData.peVisitListRespVo.age
          }}</div>
        </div>
        <div class="info_flex">
          <div>参检单位：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.unitname }}</div>
        </div>
        <div class="info_flex">
          <div>联系电话：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.phoneNumber }}</div>
        </div>
        <div class="info_flex">
          <div>体检编码：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.peId }}</div>
        </div>
        <!-- <div class="info_flex">
          
        </div> -->
        <div class="info_flex">
          <div>体检日期：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.pePreDate }}</div>
        </div>
        <div class="info_flex">
          <div>单位部门：</div>
          <div class="d_border">{{ jsonData.peVisitListRespVo.print_date }}</div>
        </div>
        <!-- <div class="bottom">{{ jsonData.peVisitListRespVo.hospitalname }}</div> -->
        <div class="dreess">
          <div>客服热线：0335-5363064（5363053）</div>
          <div>中心网址：www.pla281.com</div>
          <div>秦皇岛市北戴河区驼峰路4号</div>
          <div class="position">
            <img :src="imgSrc" />
          </div>
        </div>
      </div>
      <div
        style="
          width: 100%;
          margin-top: 0px;
          font-size: 14px;
          text-align: center;
          border-top: 1px solid #000;
        "
      >
        <div> 本报告仅供体临床参考，不作为诊断依据，谢谢您的光临！ </div>
      </div>
    </div>
    <div class="report_jiben page">
      <div class="biaoti">
        <!-- <div class="mr_20">中国人民解放军63710部队医院</div> -->
        <div>体检Id：{{ jsonData.peVisitListRespVo.peId }}</div>
        <div>姓名：{{ jsonData.peVisitListRespVo.name }}</div>
        <div>性别：{{ jsonData.peVisitListRespVo.sex }}</div>
        <div>年龄：{{ jsonData.peVisitListRespVo.age }}岁</div>
        <div>第{{ jsonData.peVisitListRespVo.peVisitId }}次体检</div>
      </div>
      <div class="logo_ti">
        <!-- <img :src="avatar" alt="" /> -->
        <div>{{ jsonData.peVisitListRespVo.hospitalname }}</div>
      </div>
      <div class="logo_miaoshu">
        <div>尊敬的客人：</div>
        <div
          >&nbsp;&nbsp;&nbsp;您好！感谢您光临北戴河康复疗养中心体检中心！健康体检的目的在于及时了解您自身的健康状况，现将您的体检结果报告如下，请您详阅。如果您对体检结果有异议，请于一周内到本中心查询或致电客服部（0335-5363064），我们将有专家为您答疑解惑。为了您的健康，我们建议您每年进行一次系统体检。欢迎您再次光临北戴河康复疗养中心体检中心！</div
        >
      </div>
      <div class="back_c">主检报告</div>
      <div class="back_t">体检汇总</div>
      <div class="back_for">
        <div
          class="back_t1"
          v-for="(item1, index1) in jsonData.deptResultItemsRespVoList"
          :key="item1.peDeptCode"
          ><span
            v-html="
              `${index1 + 1}、${item1.peDeptName ? item1.peDeptName + '：' : ''}${
                item1.content && (item1.content.includes('\r\n') || item1.content.includes('\n'))
                  ? item1.content.replace(/\r?\n/g, '<br />')
                  : item1.content
              }`
            "
          ></span
        ></div>
        <!-- <div class="back_t1_c">建议控制饮食，加强运动，减轻体重。</div> -->
      </div>
      <div class="doc_con">
        <div class="con1"> 初审医生：{{ jsonData.peVisitListRespVo.chiefDoctor }}</div>
        <div class="con1">初审日期：{{ jsonData.peVisitListRespVo.chiefAuditDate }}</div>
      </div>

      <div class="pagination"
        >第{{ 1 }}页/共{{ newDeptResultA.length + 2 + guideResultDOList.length }}页</div
      >
    </div>
    <div class="report_jiben page">
      <div class="biaoti">
        <!-- <div class="mr_20">中国人民解放军63710部队医院</div> -->
        <div>体检Id：{{ jsonData.peVisitListRespVo.peId }}</div>
        <div>姓名：{{ jsonData.peVisitListRespVo.name }}</div>
        <div>性别：{{ jsonData.peVisitListRespVo.sex }}</div>
        <div>年龄：{{ jsonData.peVisitListRespVo.age }}岁</div>
        <div>第{{ jsonData.peVisitListRespVo.peVisitId }}次体检</div>
      </div>
      <div class="logo_ti">
        <!-- <img :src="avatar" alt="" /> -->
        <div>{{ jsonData.peVisitListRespVo.hospitalname }}</div>
      </div>
      <div class="back_c">主检报告</div>
      <div class="back_t">终检结论</div>
      <div class="back_for" style="height: 792px; overflow: hidden">
        <div
          class="back_t1"
          v-html="
            jsonData.suggest &&
            (jsonData.suggest.includes('\r\n') || jsonData.suggest.includes('\n'))
              ? jsonData.suggest.replace(/\r?\n/g, '<br />')
              : jsonData.suggest
          "
        ></div>
        <!-- <div class="back_t1_c">建议控制饮食，加强运动，减轻体重。</div> -->
      </div>
      <div class="doc_con">
        <div class="con1"> 终审医生：{{ jsonData.peVisitListRespVo.auditDoctor }}</div>
        <div class="con1">终审日期：{{ jsonData.peVisitListRespVo.lastAuditDate }}</div>
      </div>
      <!-- <div class="ganxie"></div> -->
      <!-- <div class="ganxie_c">
          我们需要提示您注意的是：本次体检反映的是您当前的健康状况。因人体存在个体生物差异及您选择的检查项目并未涵盖全身所有脏器。因此医生所做的医学诊断和健康状况建议，是依据您的陈述和本次检查的结果综合分析评估而产生的。我们建议您对异常的结果进行相关的进一步检查或跟踪复查。
        </div> -->
      <div class="pagination"
        >第{{ 2 }}页/共{{ newDeptResultA.length + 2 + guideResultDOList.length }}页</div
      >
    </div>
    <div
      class="report_jiben page"
      v-for="(guideResultDO, guideIndex) in guideResultDOList"
      :key="guideIndex"
    >
      <div class="biaoti">
        <!-- <div class="mr_20">中国人民解放军63710部队医院</div> -->
        <div>体检Id：{{ jsonData.peVisitListRespVo.peId }}</div>
        <div>姓名：{{ jsonData.peVisitListRespVo.name }}</div>
        <div>性别：{{ jsonData.peVisitListRespVo.sex }}</div>
        <div>年龄：{{ jsonData.peVisitListRespVo.age }}岁</div>
        <div>第{{ jsonData.peVisitListRespVo.peVisitId }}次体检</div>
      </div>
      <div class="logo_ti">
        <!-- <img :src="avatar" alt="" /> -->
        <div>{{ jsonData.peVisitListRespVo.hospitalname }}</div>
      </div>
      <div class="back_c">主检报告</div>
      <div class="jianyi" v-if="guideIndex == 0">健康建议</div>
      <div style="max-height: 215mm; overflow: hidden">
        <div class="jianyi_c" v-for="(item2, index2) in guideResultDO" :key="index2">
          <!-- index2 + 1 + (guideIndex != 0 ? guideResultDOList[guideIndex - 1].length : 0)  -->
          <div class="jianyi_c1"
            >{{ item2.index ? item2.index + '、' : '' }}{{ item2.guideTitle }}</div
          >
          <div
            :style="item2.guideTitle ? 'padding-left:25px' : ''"
            v-html="
              item2.guideContent &&
              (item2.guideContent.includes('\r\n') || item2.guideContent.includes('\n'))
                ? item2.guideContent.replace(/\r?\n/g, '<br />')
                : item2.guideContent
            "
          >
          </div>
        </div>
      </div>
      <!-- <div class="ganxie"></div> -->
      <!-- <div class="ganxie_c">
          我们需要提示您注意的是：本次体检反映的是您当前的健康状况。因人体存在个体生物差异及您选择的检查项目并未涵盖全身所有脏器。因此医生所做的医学诊断和健康状况建议，是依据您的陈述和本次检查的结果综合分析评估而产生的。我们建议您对异常的结果进行相关的进一步检查或跟踪复查。
        </div> -->
      <div class="pagination"
        >第{{ 3 + guideIndex }}页/共{{
          newDeptResultA.length + 2 + guideResultDOList.length
        }}页</div
      >
    </div>
    <div class="report_jiben page" v-for="(itemValue, p) in newDeptResultA" :key="p">
      <div class="biaoti">
        <div>体检Id：{{ jsonData.peVisitListRespVo.peId }}</div>
        <div>姓名：{{ jsonData.peVisitListRespVo.name }}</div>
        <div>性别：{{ jsonData.peVisitListRespVo.sex }}</div>
        <div>年龄：{{ jsonData.peVisitListRespVo.age }}岁</div>
        <div>第{{ jsonData.peVisitListRespVo.peVisitId }}次体检</div>
      </div>
      <!-- <div class="jieguo_t" v-if="p === 0">科室检验结果</div> -->
      <div>
        <div class="jieguo" v-for="(item, i) in itemValue" :key="i">
          <!-- <div class="xiaojie" v-if="item[0][0].isSummary && !item[0][0].peItemName">小结</div>
          <div
            class="xiaojie_con"
            v-if="item[0][0]?.isSummaryText && item[0][0].content && !item[0][0].peItemName"
            ><div v-for="(item, ind) in item[0][0].content" :key="ind"> {{ item }}</div>
          </div> -->
          <div class="jieguo_keshi" v-if="item.objectName">{{ item.objectName }}</div>
          <!-- <div v-for="(itemarr, ir) in item" :key="ir"> -->
          <div v-if="item">
            <div class="jieguo_name" v-if="item.objectAssemName && item.checkDoctor">
              <div class="name1">■{{ item.objectAssemName }}</div>
              <div class="name2">检查医生：{{ item.checkDoctor }}</div>
              <div class="name3"
                >检查日期：{{ item.checkDate ? item.checkDate.slice(0, 10) : '' }}</div
              >
            </div>
          </div>
          <div class="con_table">
            <table class="table">
              <tr v-if="item.isTableHeard" class="table-header">
                <td :class="!item.isJy ? 'td11' : 'td1'">项目名称</td>
                <td :class="!item.isJy ? 'td22' : 'td2'">检查结果</td>
                <td class="td3" :style="item.isJy ? '' : 'display:none'">提示</td>
                <td class="td4" :style="item.isJy ? '' : 'display:none'">参考范围</td>
                <td class="td5" :style="item.isJy ? '' : 'display:none'">单位</td>
              </tr>
              <tr v-if="item.itemAssemName || item.peId">
                <!-- v-if="item.peItemName"
                :style="
                  item.peItemName && item.peItemName.length > 9
                    ? 'font-size:12px;line-height:15px; overflow: hidden;'
                    : ''
                " -->
                <td :class="!item.isJy ? 'td11' : 'td1'"
                  ><span
                    style="font-weight: 500; font-family: SimHei,\'Microsoft YaHei\',sans-serif"
                    >{{ item.peItemName }}</span
                  ></td
                >
                <!-- v-if="item.peItemName"
                :style="
                  (item.peResult && item.peResult.length > 36 && !item.isJy) ||
                  (item.peResult && item.peResult.length > 10 && item.isJy)
                    ? 'font-size:12px;line-height:15px; display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;'
                    : ''
                " -->
                <td :class="!item.isJy ? 'td22' : 'td2'">
                  {{ item.peResult }}
                  <span v-if="!item.isJy && item.unit">{{ item.unit }}</span>
                </td>
                <!-- v-if="item.peItemName" -->
                <td
                  class="td3"
                  :style="[
                    item.isJy ? {} : { display: 'none' },
                    item.abnormalIndicator == 'H'
                      ? { color: 'red', fontWeight: 'bold' }
                      : item.abnormalIndicator == 'L'
                      ? { color: 'green', fontWeight: 'bold' }
                      : {}
                  ]"
                  >{{
                    item.abnormalIndicator == 'H'
                      ? '⬆ 偏高'
                      : item.abnormalIndicator == 'L'
                      ? '⬇ 偏低'
                      : ''
                  }}</td
                >
                <!-- v-if="item.peItemName" -->
                <td class="td4" :style="item.isJy ? '' : 'display:none'">{{
                  item.printContext
                }}</td>
                <!-- v-if="item.peItemName" -->
                <td class="td5" :style="item.isJy ? '' : 'display:none'">{{ item.units }}</td>
              </tr>
            </table>
            <!-- <div class="xiaojie" v-if="item.xiaojie">小结</div>
            <div class="xiaojie_con" v-if="item.resultXiaoJie"
              ><div> {{ item.resultXiaoJie }}</div>
            </div> -->
            <!-- <div class="xiaojie_con">{{ item }}</div> -->
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="pagination"
        >第{{ p + 3 + guideResultDOList.length }}页/共{{
          newDeptResultA.length + 2 + guideResultDOList.length
        }}页</div
      >
    </div>
  </div>
  <img ref="imgRef" style="display: none" />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import JsBarcode from 'jsbarcode'
import { splitStringByWidth } from '@/utils/splitString'
import { propTypes } from '@/utils/propTypes'
import { object } from 'vue-types'
import { split } from 'lodash-es'

const props = defineProps({
  jsonData: {
    type: propTypes.any,
    default: () => ({})
  }
})

const newDeptResultA = ref<any>([])
const arrGroupAll = ref<any>([])

// const splitArrayById = (() => {
//   const cache = new Map()
//   return (arr, idKey) => {
//     const key = JSON.stringify(arr.map((item) => item[idKey]))
//     if (cache.has(key)) return cache.get(key)

//     const result = arr.reduce((acc, cur) => {
//       const index = acc.findIndex((item) => item[0][idKey] === cur[idKey])
//       index === -1 ? acc.push([cur]) : acc[index].push(cur)
//       return acc
//     }, [])

//     cache.set(key, result)
//     return result
//   }
// })()
const splitArrayById = (() => {
  const cache = new Map()
  // 定义排序优先级
  const sortOrder = [
    '一般检查',
    '医学检验科',
    '特诊科',
    '心电图',
    '骨密度',
    '医学影像科',
    '内科检查',
    '外科检查'
  ]

  return (arr, idKey) => {
    const key = JSON.stringify(arr.map((item) => item[idKey]))
    if (cache.has(key)) return cache.get(key)

    const result = arr.reduce((acc, cur) => {
      const index = acc.findIndex((item) => item[0][idKey] === cur[idKey])
      index === -1 ? acc.push([cur]) : acc[index].push(cur)
      return acc
    }, [])

    // 按照指定顺序排序，基于 peDeptName 字段
    result.sort((a, b) => {
      const aName = a[0].peDeptName || ''
      const bName = b[0].peDeptName || ''

      const aIndex = sortOrder.indexOf(aName)
      const bIndex = sortOrder.indexOf(bName)

      // 如果两个项都在排序列表中，按指定顺序排序
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // 如果只有a在排序列表中，a排在前面
      if (aIndex !== -1) return -1

      // 如果只有b在排序列表中，b排在前面
      if (bIndex !== -1) return 1

      // 如果两个都不在排序列表中，保持原有相对顺序
      return 0
    })

    cache.set(key, result)
    return result
  }
})()

const imgSrc = ref<any>('')
const imgRef = ref<any>(null)
const generateBarcode = () => {
  // const canvas = document.getElementById('barcodeCanvas') as HTMLCanvasElement
  const peId = props.jsonData?.peVisitListRespVo?.peId
  if (peId) {
    JsBarcode(imgRef.value, peId, {
      fontSize: 14,
      width: 1,
      height: 30
    })
    imgSrc.value = imgRef.value?.src || ''
  }
}
const guideResultDOList = ref<any>([])
const processData = () => {
  if (!props.jsonData) return

  const {
    deptResultRespVoList = [],
    deptResultRespVoList1 = [],
    getDeptResultByPeIdGcPrint = [],
    getGcPrintPicZz = [],
    getJyPrint = []
  } = props.jsonData

  if (getJyPrint?.length > 0) {
    getJyPrint.forEach((item) => (item.isJy = true))
  }

  const combinedData = [
    ...deptResultRespVoList,
    ...deptResultRespVoList1,
    ...getDeptResultByPeIdGcPrint,
    ...getGcPrintPicZz,
    ...getJyPrint
  ]

  const groupedByItemAssemName = splitArrayById(combinedData, 'itemAssemName')
  const result = groupedByItemAssemName.map((group) => splitArrayById(group, 'itemAssemName'))

  result.forEach((it, index) => {
    it.forEach((item, k) => {
      if (item.length > 0) {
        item[0].isTermHead = true
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
  if (result.length > 0) {
    result.forEach((item) => {
      item.forEach((items) => {
        items.unshift(
          { objectName: items[0].peDeptName, height: 30 },
          {
            objectAssemName: items[0].itemAssemName,
            checkDoctor: items[0].doctor,
            checkDate: items[0].peResultDate,
            height: 30
          },
          {
            isTableHeard: true,
            isJy: items[0].isJy,
            height: 30
          }
        )
        items.forEach((its) => {
          if (!its.height) {
            // if (its.peResult && 36 < its.peResult.length < 72 && !item.isJy) {
            //   its.height = 60
            // } else if (its.peResult && its.peResult.length > 72 && !item.isJy) {
            //   its.height = 90
            // } else {
            its.height = 30
            // }
          }
        })
        // items.push({ xiaojie: '小结', height: 30 })
        // if (items[items.length - 2].content && items[items.length - 2].content.length > 0) {
        //   items[items.length - 2].content.forEach((element) => {
        //     items.push({ resultXiaoJie: element, height: 30 })
        //   })
        // }
      })
    })
  }
  console.log(splitArrayByHeight(result.flat(Infinity), 1020), 'ssss')
  newDeptResultA.value = splitArrayByHeight(result.flat(Infinity), 1020)
  // buildPaginationGroups(result)
  guideResultDOList.value = getGuideResultDO()
}
const getGuideResultDO = () => {
  if (!props.jsonData.guideResultDO || !Array.isArray(props.jsonData.guideResultDO)) {
    return []
  }

  // 为每一项添加自增的index属性
  let lastIndex = 0
  props.jsonData.guideResultDO.forEach((item) => {
    if (item.guideTitle) {
      lastIndex += 1
      item.index = lastIndex
    }
  })

  const MAX_LENGTH = 34 // 每页最大长度，可以根据实际需求调整
  const result = []
  let currentChunk = []
  let currentLength = 0

  for (const item of props.jsonData.guideResultDO) {
    // 计算当前项的长度(1或2)
    const itemLength = (item.guideTitle ? 1 : 0) + (item.guideContent ? 1 : 0)

    if (currentLength + itemLength > MAX_LENGTH) {
      // 当前块已满，添加到结果中
      result.push(currentChunk)
      currentChunk = [item]
      currentLength = itemLength
    } else {
      // 添加到当前块
      currentChunk.push(item)
      currentLength += itemLength
    }
  }

  // 添加最后一个块
  if (currentChunk.length > 0) {
    result.push(currentChunk)
  }

  return result
}
const splitArrayByHeight = (arr, maxHeight) => {
  const result = []
  let currentGroup = []
  let currentHeight = 0
  for (const item of arr) {
    if (currentHeight + item.height < maxHeight) {
      //如果当前页面可以加入当前数组，则加入
      currentGroup.push(item)
      currentHeight += item.height
    } else {
      //如果不能加入当前数组，则保存当前数组，并开启新的一组
      result.push(currentGroup)
      currentGroup = [item]
      currentHeight = item.height
    }
  }
  //添加最后一个数组
  if (currentGroup.length > 0) {
    result.push(currentGroup)
  }
  return result
}
const buildPaginationGroups = (data) => {
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
  width: 210mm;
  font-size: 18px;
  // padding: 10px;
  // height: 297mm;
  overflow: auto;
  background-color: #f1f1f1;
  .report_con {
    background-color: #fff;
    padding: 30px;
    height: 294mm;
    width: 100%;
    margin: 0 auto;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border: 1px solid red;
    // border-bottom: 1px solid #000dd;
    // margin-bottom: 10px; */
    .title {
      margin-bottom: 140px;
      .title_div {
        margin-bottom: 10px;
      }
    }
    .center {
      width: 100%;
      text-align: center;
      margin-bottom: 90px;
      div {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 40px;
      }
    }
    .info {
      font-weight: bold;
      margin: 0 auto;

      .info_flex {
        display: flex;
        margin-bottom: 15px;
        justify-content: center;
        font-size: 16px;
      }
      .dreess {
        font-size: 14px;
        font-family: 'SimSun', '宋体';
        margin-top: 360px;
        position: relative;
        .position {
          text-align: center;
          position: absolute;
          top: -4px;
          right: 20px;
        }
      }
      .d_border {
        width: 280px;
        padding-left: 50px;
        border-bottom: 1px solid #000;
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
    height: 294mm;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    font-family: 'SimSun', '宋体';
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border: 1px solid red; */
    position: relative;
    .pagination {
      margin: 0 30px;
      position: absolute;
      bottom: 15px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 14px;
      border-top: #000 1px solid;
    }
    .biaoti {
      width: 100%;
      display: flex;
      border-bottom: #000 2px solid;
      box-sizing: border-box;
      // margin-bottom: 10px;
      div {
        width: 20%;
        overflow: hidden;
        font-size: 14px;
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
            border-bottom: #000 1px solid;
            border-right: #000 1px solid;
            box-sizing: border-box;
            text-align: center;
            height: 30px;
            line-height: 30px;
            padding: 0;
          }
          td:first-child {
            border-left: #000 1px solid;
            box-sizing: border-box;
          }
        }
        tr:first-child {
          border-top: #000 1px solid;
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
    .logo_miaoshu {
      font-size: 14px;
      line-height: 22px;
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
        font-size: 16px;
        line-height: 24px;
        font-family: 'SimSun', '宋体';
      }
      .back_t1_c {
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        word-wrap: break-word; /* 允许在单词内换行 */
        font-family: 'SimSun', '宋体';
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
      font-size: 16px;
      line-height: 24px;
      word-wrap: break-word; /* 允许在单词内换行 */
      font-family: 'SimSun', '宋体';
    }
    .jianyi_c1 {
      font-weight: bold;
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
        font-size: 22px;
        text-align: center;
        height: 33px;
        line-height: 31px;
        border-top: #000 1px solid;
        border-bottom: #000 1px solid;
        box-sizing: border-box;
        font-weight: bold;
        background-color: #9fc3e8;
      }
      .jieguo_name {
        display: flex;
        font-size: 18px;
        height: 30px;
        border-bottom: #000 1px solid;
        box-sizing: border-box;
        background-color: #9fc3e8;
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
          font-size: 16px;
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
              width: 40%;
            }
            .td2 {
              width: 15%;
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
        border-bottom: #000 1px solid;
        border-top: #000 1px solid;
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
    height: 297mm;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    /* // border-bottom: 1px solid #000; */
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
  border-top: #000 1px solid;
  box-sizing: border-box;
}
</style>
