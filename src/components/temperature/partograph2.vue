<template>
  <div class="table_wrap2">
    <div>
      <p
        ref="topTitle"
        style="
          font-size: 20px;
          height: 26.5px;
          line-height: 26.5px;
          margin-bottom: 20px;
          text-align: center;
          width: 100%;
        "
        >{{ currenHospitalName + '产程图' }}</p
      >
      <div
        ref="topTitle1"
        style="position: relative; text-align: left; height: 52px; line-height: 26px"
      >
        <div>
          <span class="tbale-label">产妇姓名：</span
          ><span class="table-value" style="width: 120px">{{ info.patientName }}</span>
          <span class="tbale-label">年龄：</span>
          <span class="table-value" style="width: 70px">{{ info.age || '' }}</span>
          <span class="tbale-label">住院号：</span>
          <span class="table-value" style="width: 90px; text-align: left">{{
            info.admissionNo
          }}</span>
          <span class="tbale-label">科室：</span>
          <span class="table-value" style="min-width: 70px">{{ info.inpatientArea }}</span>
          <span class="tbale-label">床号：</span>
          <span class="table-value" style="width: 70px">{{ info.bedNo }}</span>
        </div>
        <div>
          <span class="tbale-label">孕：</span>
          <span class="table-value" style="width: 65px">{{ info.pregnancy }}</span>
          <span class="tbale-label">产：</span>
          <span class="table-value" style="width: 70px">{{ info.yield }}</span>
          <span class="tbale-label">诊断：</span>
          <span class="table-value" style="min-width: 70px">{{ info.diagnose }}</span>
          <span class="tbale-label">临产时间：</span>
          <span class="table-value" style="width: 150px">{{ info.laborTime }}</span>
        </div>
      </div>
    </div>
    <div class="describe">宫口扩张不同情况</div>
    <div class="top-content">
      <div :key="'comKey' + comKey" :class="['container', `container${props.containerIndex}`]">
        <svg width="100%" height="100%"></svg>
      </div>
      <div class="leftTitle left-row"
        ><div style="width: 40px; line-height: 25px"
          >宫<br />颈<br />
          扩<br />
          张</div
        >
        <div class="scaleClass">
          <div v-for="(item, index) in new Array(9).fill(0)" :key="index">{{ 10 - index }}</div>
        </div>
      </div>
      <table class="temperatureChart1" style="font-weight: 500">
        <tbody>
          <tr class="recorde" v-for="(tr, index) in new Array(8).fill(0)" :key="index + 'tr1'">
            <td
              style="width: 36px; height: 36px"
              v-for="(item, y) in tdList"
              :key="y + 'td1'"
              :class="[y % 6 === 5 && y != tdList.length && 'redLineTd', y == 13 && 'redLineTd2']"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="xaxisClass">
      <div v-for="(item, index) in new Array(10).fill(0)" :key="index">{{ index * 2 + 2 }}</div>
    </div>
    <div style="text-align: center; margin-top: 15px"> 临产后期限(h)</div>
    <div class="bottom-content">
      <div class="leftTitle left-row"
        ><div class="bottom-height">日期</div>
        <div class="bottom-height">时间</div>
        <div class="bottom-height">宫缩</div>
        <div style="height: 40px; line-height: 20px">胎心 <br />(次/分)</div>
        <div style="height: 200px; line-height: 200px">处理</div>
        <div style="height: 100px; line-height: 100px">签名</div>
        <div style="height: 70px; line-height: 70px">备注</div>
      </div>
      <table class="temperatureChart" style="font-weight: 500">
        <thead></thead>
        <tbody>
          <tr ref="topTr">
            <td ref="topTd" v-for="(item, index) in new Array(20).fill(0)" :key="index + '|date'">
              <div v-html="getFormattedDateTime(index + 1)" style="font-size: 12px"></div>
            </td>
          </tr>
          <tr ref="topTr">
            <td ref="topTd" v-for="(item, index) in new Array(20).fill(0)" :key="index + '|Time'">
              {{
                info.nurseEventList[index]
                  ? info.nurseEventList[index].dateTime.substring(11, 16)
                  : ''
              }}
            </td>
          </tr>
          <tr ref="topTr1">
            <td
              ref="topTd"
              style="height: 45px"
              v-for="(item, index) in new Array(20).fill(0)"
              :key="index + '|contractSustain'"
            >
              <div class="blood-pressure-cell">
                <div
                  class="blood-pressure-value systolic"
                  style="position: absolute; top: 0; left: 0"
                >
                  {{
                    info.nurseEventList[index]
                      ? info.nurseEventList[index].contractSustain
                        ? info.nurseEventList[index].contractSustain.replace(/”|"/g, '') + '”'
                        : ''
                      : ''
                  }}
                </div>
                <div class="diagonal"></div>
                <div class="blood-pressure-value diastolic">
                  {{
                    info.nurseEventList[index]
                      ? info.nurseEventList[index].contractFrequency &&
                        info.nurseEventList[index].contractFrequency != '/'
                        ? info.nurseEventList[index].contractFrequency.replace(/”|"|'/g, '') + "'"
                        : ''
                      : ''
                  }}
                </div>
              </div>
            </td>
          </tr>
          <tr ref="topTr1">
            <td
              ref="topTd"
              v-for="(item, index) in new Array(20).fill(0)"
              style="height: 40px; box-sizing: border-box"
              :class="['tdHeight']"
              :key="index + '|fetalHeart'"
            >
              <span v-if="info.nurseEventList[index] && !info.nurseEventList[index].isChildbirth">
                {{
                  info.nurseEventList[index] && info.nurseEventList[index].fetalHeart
                    ? info.nurseEventList[index].fetalHeart
                    : ''
                }}
              </span>
            </td>
          </tr>
          <tr>
            <td
              ref="topTd"
              style="height: 200px !important; line-height: 60px"
              v-for="(item, index) in new Array(20).fill(0)"
              :key="index + '|treatingOthers'"
            >
              <div class="text-container">{{
                info.nurseEventList[index] ? info.nurseEventList[index].treatingOthers : ''
              }}</div>
            </td>
          </tr>
          <tr>
            <td
              ref="topTd"
              style="height: 100px !important"
              v-for="(item, index) in new Array(20).fill(0)"
              :key="index + '|nurseUkeySign'"
            >
              <div v-if="info.nurseEventList[index]" class="text-container">
                <img
                  v-if="info.nurseEventList[index].nurseUkeySign"
                  :src="info.nurseEventList[index].nurseUkeySign"
                  style="
                    width: 60px;
                    height: 28px;
                    overflow: hidden;
                    max-width: 90px;
                    margin: 0 auto;
                    transform: rotate(90deg);
                    position: absolute;
                    left: -15px;
                    top: 15px;
                  "
                />
                <span v-else> {{ info.nurseEventList[index].nurseName }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td ref="remarks" colspan="20" style="height: 55px; line-height: 18px">
              <div class="remarks" v-if="info.remarks">
                {{ info.remarks }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="legend">
      <div
        style="
          text-align: right;
          margin-top: 8px;
          width: 100%;
          padding-right: 70px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        "
        >护士长/质控护士：
        <img
          v-if="info.headNurseUkeySign"
          :src="info.headNurseUkeySign"
          style="width: 40px; height: 17px; overflow: hidden; vertical-align: middle"
        />
        <span v-else style="font-family: '华文隶书', sans-serif; padding-top: 2px">{{
          info.headNurse || ''
        }}</span>
      </div>
      <div
        style="font-size: 14px; width: 100%; text-align: center; height: 30px; line-height: 30px"
      >
        {{ `第 ${props.pageNo} 页` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import dayjs from 'dayjs'
import { getKeyMap, SectionToChinese } from './utils'
import { propTypes } from '@/utils/propTypes'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const currenHospitalName = computed(() => userStore.getHospitalName)
import { sortList } from '@/utils/dateSort'
const keyMap = getKeyMap()
const info = ref<any>({
  patientName: '',
  age: '',
  admissionNo: '',
  bedNo: '',
  ageunit: '',
  pregnancy: '',
  yield: '',
  beginDate: '',
  birth: '',
  hospCode: '',
  hospDate: 0,
  hospDays: '',
  inDate: 0,
  nursingClassName: '',
  operaDays: '',
  outdate: '',
  weekNo: '',
  originName: '测试医院',
  title: '',
  nurseEventList: []
})
const isChildbirth = ref<any>(false) // 是否已经分娩
const tdList = ref<any>(new Array(20).fill(0))
const tdList2 = ref<any>(new Array(20).fill(0))

const comKey = ref<number>(1)
const symbolTextArr = ref<any>([])
const topTd = ref(null)
const topTr = ref(null)
const topTr1 = ref(null)
const topTitle = ref(null)
const topTitle1 = ref(null)
const props = defineProps({
  pageNo: propTypes.number.def(1),
  options: propTypes.object.def([]),
  containerIndex: propTypes.number.def(0),
  printData: propTypes.object.def({})
})
const initFunc = () => {
  initData()
  init()
}

// 初始化所
onMounted(() => {
  // initData()
  // init()
})
const getSymbolTextArr = (index) => {
  const current = symbolTextArr.value.find((i) => i.x === index)
  // console.log(current, '当前点击的')
  if (current) {
    return current.y
  } else {
    return ''
  }
}
let lastDisplayedDate: any = ''
const getFormattedDateTime = (index) => {
  if (!info.value.nurseEventList[index - 1]) {
    return ''
  }
  const dateTime = info.value.nurseEventList[index - 1]
    ? info.value.nurseEventList[index - 1].dateTime
    : ''
  // 提取年月日部分
  const yearMonthDay = dateTime.substring(0, 10)
  // 如果年月日与上一个显示的日期相同，则不返回任何内容
  if (yearMonthDay === lastDisplayedDate) {
    return ''
  }
  // 更新上一个显示的日期
  lastDisplayedDate = yearMonthDay
  return dateTime
    ? `<div>${dateTime.substring(0, 4)}</div>
            <div>${Number(dateTime.substring(5, 7))}.${Number(dateTime.substring(8, 10))}</div>`
    : ''
}
const initData = () => {
  info.value = JSON.parse(JSON.stringify(props.printData)) || {}
  isChildbirth.value = info.value.nurseEventList.length
    ? info.value.nurseEventList[info.value.nurseEventList.length - 1].isChildbirth
    : false
  console.log(info.value, 'info.value')
}
const init = () => {
  const width = 720
  const height = 288
  // SVG画布边缘与图表内容的距离
  // const padding = { top: 0, right: 0, bottom: 0, left: 0 }

  // 创建一个分组用来组合要画的图表元素
  const main = d3
    .select(`.container${props.containerIndex} svg`)
    .append('g')
    .classed('main', true)
    // .attr('transform', `translate(${80},${80})`)
    .attr('width', width)
    .attr('height', height)

  // 模拟数据 固定虚线
  const datasetX = [
    [0, 0, 0, 0],
    [7, 6.4, 6.4, 4.4],
    [7, 6.4, 6.4, 4.4],
    [11, 11, 10, 7.5],
    [11, 11, 10, 7.5],
    [14, 12.4, 11.6, 9.5],
    [14, 12.4, 11.6, 9.5],
    [16, 13.8, 13, 10.9],
    [16, 13.8, 13, 10.9],
    [16.9, 15, 14.3, 12.8],
    [16.9, 15, 14.3, 12.8],
    [17.6, 15.9, 16.3, 12.8],
    [17.6, 15.9, 16.3, 12.8],
    [18.7, 17.4, 16.3, 12.8],
    [18.7, 17.4, 16.3, 12.8],
    [19.9, 17.4, 16.3, 12.8],
    [19.9, 17.4, 16.3, 12.8]
  ]
  const datasetY = [
    [2.1, 3.1, 4.1, 5.1],
    [2.1, 3.1, 4.1, 5.1],
    [3.1, 4.1, 5.1, 6],
    [3.1, 4.1, 5.1, 6],
    [4, 5, 6, 7],
    [4, 5, 6, 7],
    [5, 6, 7, 8],
    [5, 6, 7, 8],
    [6, 7, 8.1, 9],
    [6, 7, 8.1, 9],
    [7, 7.9, 9, 10],
    [7, 7.9, 9, 10],
    [8.1, 9, 10, 10],
    [8.1, 9, 10, 10],
    [9, 10, 10, 10],
    [9, 10, 10, 10],
    [10, 10, 10, 10]
  ]
  const greenLine = datasetX.map((item, index) => {
    return {
      value: '',
      x: item[0],
      y: datasetY[index][0]
    }
  })
  const yellowLine = datasetX.map((item, index) => {
    return {
      value: '',
      x: item[1],
      y: datasetY[index][1]
    }
  })
  const blueLine = datasetX.map((item, index) => {
    return {
      value: '',
      x: item[2],
      y: datasetY[index][2]
    }
  })
  const redLine = datasetX.map((item, index) => {
    return {
      value: '',
      x: item[3],
      y: datasetY[index][3]
    }
  })
  let coordinateData: any = [] //需要显示坐标的数据（间隔1个数据画一个坐标点）
  // 添加的空白列
  let addNurseEvent = info.value.nurseEventList.filter((item) => item.isAdd)
  if (info.value.nurseEventList.length) {
    let markIndex = info.value.nurseEventList.findIndex((obj) => Number(obj.neckUterus) === 10)
    info.value.nurseEventList.forEach((item: any, index) => {
      if (isChildbirth.value) {
        if (
          ((index - addNurseEvent.length) % 2 === 0 && !item.isChildbirth) ||
          (markIndex != -1 && markIndex - 1 < index && !item.isChildbirth)
        ) {
          item.newIndex = index + 1
          coordinateData.push(item)
        } else if (index == info.value.nurseEventList.length - 2) {
          item.newIndex = index + 1
          coordinateData.push(item)
        }
      } else {
        if (
          (index - addNurseEvent.length) % 2 === 0 ||
          (markIndex != -1 && markIndex - 1 < index)
        ) {
          item.newIndex = index + 1
          coordinateData.push(item)
        }
      }
    })
  }
  const datasetNeckUterus = getTypeData('neckUterus', coordinateData) //宫颈扩张
  const xScale = d3
    .scaleLinear()
    .domain([0, 20])
    .range([-16.5, width - 16.5])
  // 创建y轴的比例尺(线性比例尺)
  // 固定的虚线（宫颈扩张）
  const yScale = d3.scaleLinear().domain([2, 10]).range([height, 0])
  // .range([height + 16.5, 16.5]) //加16.5 偏移到表格中间
  // 创建x轴
  const xAxis = d3.axisBottom(xScale)

  // 创建y轴
  const yAxis = d3.axisLeft(yScale) //固定线或者宫颈扩张
  // 添加SVG元素并与x轴进行“绑定”
  main
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`) // 将X轴移动到画布的底部
    // .attr('transform', `translate(0,${height - padding.top - padding.bottom})`)
    .call(xAxis)

  // 添加SVG元素并与y轴进行“绑定”
  main.append('g').attr('class', 'axis').call(yAxis)
  // 添加折线
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
  // console.log('datasetNeckUterus', datasetNeckUterus)
  // 添加path元素，并通过line()计算出值来赋值
  main.append('path').attr('class', 'line greenline').attr('d', line(greenLine))
  main.append('path').attr('class', 'line yellowline').attr('d', line(yellowLine))
  main.append('path').attr('class', 'line blueline').attr('d', line(blueLine))
  main.append('path').attr('class', 'line redline').attr('d', line(redLine))
  // 宫颈扩张的连线
  main.append('path').attr('class', 'line neckUterus').attr('d', line(datasetNeckUterus))
  /* 红空圆--start */ //宫颈扩张
  main
    .selectAll('.circle1')
    .data(datasetNeckUterus)
    .enter()
    .append('circle')
    .attr('class', 'circle1')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 4)
    .attr('stroke', '#FF0000')
    .attr('stroke-width', 1)
    .attr('fill', '#FFFFFF')
  /* 红空圆--end */
  main
    .selectAll('.circle1')
    .data(datasetNeckUterus)
    .each(function (d, i, nodes) {
      // console.log('Data point:', d)
      // console.log('Index:', i)
      // console.log('Dataset length:', datasetNeckUterus.length)
      // // 如果是最后一个数据点(同时存在分娩事件)
      if (i === datasetNeckUterus.length - 1 && isChildbirth.value) {
        // 绘制向右的横线
        const lineHorizontal = main
          .append('line')
          .attr('x1', xScale(d.x) + 4)
          .attr('y1', yScale(d.y))
          .attr('x2', xScale(d.x) + 30) // 向右延伸30个像素
          .attr('y2', yScale(d.y))
          .attr('stroke', '#ff0000')
        // 绘制直角向下的线段
        const lineVertical = main
          .append('line')
          .attr('x1', xScale(d.x) + 30) // 从横线的结束点开始
          .attr('y1', yScale(d.y))
          .attr('x2', xScale(d.x) + 30) // 保持在同一水平位置
          .attr('y2', yScale(d.y) + 30) // 向下延伸10个像素
          .attr('stroke', '#ff0000')
        // 绘制向下的箭头
        const arrow = main
          .append('polygon')
          .attr(
            'points',
            `${xScale(d.x) + 25},${yScale(d.y) + 30} ${xScale(d.x) + 35},${yScale(d.y) + 30} ${
              xScale(d.x) + 30
            },${yScale(d.y) + 40}` // 箭头的三个顶点，向下移动15个像素
          )
          .attr('fill', '#ff0000')
      }
    })

  hoverEvent(main)
}
const hoverEvent = (main) => {
  // console.log(document.querySelector('.lineColor'), 999999)
  // document.querySelector('.lineColor').style.stroke = 'red'
  const recordeNode = document.createElement('div')
  recordeNode.setAttribute('class', 'recorde-text')
  document.querySelector('.recorde td').append(recordeNode)
  // const allTrtd = document.querySelectorAll('.temperatureChart tr td')
  // ;[...allTrtd].map((ele) => {
  //   // ele.setAttribute('title', ele.innerText)
  // })
  /* 鼠标悬停提示框 */
  var tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0.0)
  main
    .on('mouseover', function (event, d) {
      tooltip
        // .html('呼吸：19次/分<br/>录入信息：2017-11-02<br/>姓名：张三')
        .html(`${event.target.__data__ ? event.target.__data__.value : ''}`)
        .style('text-align', 'left')
        .style('left', event.pageX + 'px')
        .style('top', event.pageY + 20 + 'px')
        .style('opacity', 1.0)
    })
    .on('mousemove', function (event, d) {
      tooltip.style('left', event.pageX + 'px').style('top', event.pageY + 20 + 'px')
    })
    .on('mouseout', function (event, d) {
      tooltip.style('opacity', 0.0)
    })
}

const getTypeData = (type, allData = [], isNumber = true) => {
  return allData
    .map((item: any) => {
      const codeList = ['neckUterus']
      const codeName = ['宫颈扩张']
      return {
        x: item.newIndex,
        y: item[type] == '0' ? '0' : (isNumber ? +item[type] : item[type]) || '',
        value: `${
          codeName[codeList.indexOf(type)] + '：' + item[type] == '0' ? '0' : item[type] || ''
        }<br/>日期：${item.dateTime || ''} `
      }
    })
    .filter((item) => {
      return item.y !== ''
    })
}
watch(
  () => props.printData,
  () => {
    comKey.value++
    setTimeout(() => {
      initFunc()
      console.log('执行initFunc')
    })
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.blood-pressure-cell {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 9px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.blood-pressure-value {
  position: absolute;
  width: 50%; /* 占据单元格的一半宽度 */
  text-align: center;
  // color: #4d4dff;
}
.describe {
  height: 35px;
  line-height: 35px;
  text-align: right;
  padding-right: 40px;
}
.top-content {
  display: flex;
  position: relative;

  .left-row {
    width: 60px;
    display: flex;
    align-items: center;
  }
  .scaleClass {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    div {
      margin-top: 2px;
    }
  }
  .temperatureChart1 {
    height: 288px;
    width: 720px;
    box-sizing: content-box;
    td {
      width: 36px !important;
      height: 36px !important;
    }
  }
}
.xaxisClass {
  box-sizing: border-box;
  margin-left: 60px;
  width: 720px;
  display: flex;
  justify-content: space-between;
  div {
    width: 80px;
    text-align: right;
    margin-right: -2px;
  }
}
.bottom-content {
  margin-top: 35px;
  display: flex;
  position: relative;
  .left-row {
    width: 60px;
    display: flex;
    flex-direction: column;
    text-align: right;
    padding-right: 5px;
  }
  .bottom-height {
    height: 40px;
    line-height: 40px;
  }
  .temperatureChart {
    height: 288px;
    width: 720px;
    box-sizing: content-box;
    td {
      width: 36px !important;
      height: 36px !important;
    }
    .text-container {
      width: auto;
      height: 100%;
      /* border: 1px solid #000; */
      padding: 5px;
      text-align: center;
      font-family: Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-family: '华文隶书', sans-serif;
      position: relative;
    }
  }
}

.systolic {
  width: 38px;
}
.diastolic {
  position: absolute;
  right: 0;
  bottom: -2px;
  width: 40px;
  font-size: 9px !important;
  padding-left: 12px;
}

.diagonal {
  position: absolute;
  width: 50px;
  top: 16px;
  bottom: 0px;
  left: 50%;
  height: 1px;
  background: #ccc;
  transform: translateX(-50%) rotate(-45deg);
}

.remarks {
  padding: 0 8px;
  text-align: left;
  height: 88px;
  text-indent: 2em;
}
.table_wrap2 {
  line-height: normal;
  //font-family: '宋体';
}
table {
  font-weight: normal;
  border-collapse: collapse;
  font-size: 12px;
  text-align: center;
  width: 100%;
  table-layout: fixed;
  border: 1px #2f4f4f solid;
}
td {
  border: 1px solid #ccc;
  width: 36px;
  height: 36px;
}

// 8-9之间的线红色
.redLineTd2 {
  // border-right: 1px solid #ff6e71;
}
.redLineTdTop {
  border-top: 1px solid #ff6e71 !important;
}
.redLineTdBot {
  border-bottom: 1px solid #ff6e71 !important;
}

.recorde-text {
  width: 13px;
  height: 0;
  color: #ff0000;
  font-size: 10px;
  position: relative;
  top: -4px;
}
.recorde-text2 {
  color: #ff0000;
  font-size: 10px;
  position: relative;
  bottom: 20px;
  height: 8.5px;
  padding: 0;
}
.table_wrap2 {
  position: relative;
  margin: 0 auto;
  width: 801px;
  box-sizing: border-box;
  left: 0;
  right: 0;
}
.container {
  // 高度最好动态计算，不然很容易错位
  /* margin-top: 32px; */
  width: 720px;
  height: 288px;
  position: absolute;
  top: 0;
  // background: red;
  // opacity: 0.2;
  left: 60px;
}

.temperature_mark td p {
  position: relative;
  top: 0;
  margin-top: 57.5px;
}
.num_wrapper {
  width: 35px;
  height: 146px;
  position: relative;
  p {
    height: 16px;
  }
}
.pain_wrapper {
  position: absolute;
  width: 100%;
  height: 70px;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
}
.zeroline {
  fill: none;
  stroke: red;
  stroke-width: 0.5px;
  stroke-dasharray: 5 5;
}

.zerolinetext {
  fill: red;
}

.overlay {
  fill: none;
  stroke: none;
  pointer-events: all;
}
</style>
<style lang="scss">
.tooltip {
  position: absolute;
  text-align: center;
  padding: 10px;
  font: 12px sans-serif;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #000;
  border-radius: 5px;
  pointer-events: none;
  z-index: 99999; /* 这里设置的是一个比较大的 z-index 值 */
}
.table_wrap2 {
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  .tick,
  .domain {
    display: none;
  }
  .tbale-label {
    font-weight: 500;
    font-size: 14px;
  }
  .table-value {
    font-size: 14px;
    display: inline-block;
    text-align: left;
    line-height: 26px;
  }
  .focusLine {
    fill: none;
    stroke: red;
    stroke-width: 0.5px;
  }
  .focusText {
    color: red;
  }
  .breath_td_odd {
    vertical-align: top;
    font-size: 10px;
  }
  .breath_td_even {
    vertical-align: bottom;
    font-size: 10px;
  }
  .line {
    fill: none;
    stroke-width: 1.5px;
  }
  .line.greenline {
    // fill: #26b62e38;
    stroke: #26b62ea3;
  }
  .line.yellowline {
    // fill: #f6ff00;
    stroke: #ffc43be3;
  }
  .line.blueline {
    // fill: #415bce;
    stroke: #415bcea3;
  }
  .line.redline {
    // fill: #ea4848;
    stroke: #ff000059;
    // stroke-dasharray: 3 3;
    // opacity: 0.4;
  }
  .line.neckUterus {
    fill: none;
    stroke: #ff0000;
  }
  .line.fetalHead {
    stroke: #315efb;
    fill: none;
  }
  .line.huxiline {
    stroke: blue;
    fill: none;
  }
  .axis path,
  .axis line,
  .line {
    stroke: #000;
    fill: none;
  }
  .legend {
    display: flex;
    flex-direction: column;
  }
}
</style>
