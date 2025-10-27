<template>
  <div class="home-right">
    <div class="r-left">
      <div class="r-top-info">
        <p class="message-title">体检总统计</p>
        <div class="bingli">
          <div class="bingli-count">
            <div class="bingli-count-item">
              <div class="img_div_img">
                <img :src="personInspect" alt="" />
              </div>
              <div class="img_div_p">
                <p class="div_p">个检总数(人)</p>
                <div class="div_div">
                  <p>{{ medicalData.personalExamCount || '1255' }}</p>
                </div>
              </div>
            </div>
            <div class="bingli-count-item">
              <div class="img_div_img">
                <img :src="teamInspect" alt="" />
              </div>
              <div class="img_div_p">
                <p class="div_p">团检总数(人)</p>
                <div class="div_div">
                  <p>{{ medicalData.unitExamCount || '1255' }}</p>
                </div>
              </div>
            </div>
            <div class="bingli-count-item">
              <div class="img_div_img">
                <img :src="assessment" alt="" />
              </div>
              <div class="img_div_p">
                <p class="div_p">评估报告总数(人)</p>
                <div class="div_div">
                  <p>{{ medicalData.auditReportCount || '1255' }}</p>
                </div>
              </div>
            </div>
            <div class="bingli-count-item">
              <div class="img_div_img">
                <img :src="reInspection" alt="" />
              </div>
              <div class="img_div_p">
                <p class="div_p">复检总数(人)</p>
                <div class="div_div">
                  <p>{{ medicalData.recheckCount || '1255' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="r-left-content">
        <div class="r-left-inp-left">
          <p class="message-title pt-10px">当日业务 </p>
          <!-- <div class="content">
            <div class="left-content" ref="businessRef"></div>
            <div class="right-text">
              <div class="ul">
                <span class="left-li left-li1"></span>
                <span class="li">检中</span>
                <span class="right-li">30%--76人</span>
              </div>
              <div class="ul">
                <span class="left-li left-li2"></span>
                <span class="li">登记</span>
                <span class="right-li">30%--76人</span>
              </div>
              <div class="ul">
                <span class="left-li left-li3"></span>
                <span class="li">签到</span>
                <span class="right-li">20%--50人</span>
              </div>
              <div class="ul">
                <span class="left-li left-li4"></span>
                <span class="li">交表</span>
                <span class="right-li">20%--20人</span>
              </div>
            </div>
          </div> -->
          <!-- <div
            ref="overallStatusRef"
            style="width: 100%; height: calc(100% - 20px); position: relative"
          ></div> -->
          <div
            ref="businessRef"
            style="width: 100%; height: calc(100% - 20px); position: relative"
          ></div>
        </div>
        <div class="r-left-inp">
          <p class="message-title">近一个月体检人数</p>
          <div
            ref="checkupRef"
            style="width: 100%; height: calc(100% - 20px); position: relative"
          ></div>
          <!-- <div class="p-12px message-empty" v-else>
            <div style="width: 100%">
              <img :src="emptyBg" alt="" class="w-200px" srcset="" />
              <p>暂无数据</p></div
            >
          </div> -->
        </div>
      </div>
      <div class="r-left-content">
        <div class="r-left-inp-left">
          <!-- <div class="buttons"
            ><span
              :class="{ toggleActivate: zhuyuanType == '2' }"
              @click="toggleQueryInpPatCountTrendApi('2')"
              >报到状态</span
            ><span
              :class="{ toggleActivate: zhuyuanType == '3' }"
              @click="toggleQueryInpPatCountTrendApi('3')"
              >总检状态</span
            >
          </div> -->
          <p class="message-title">近一个月体检总状态</p>
          <div
            ref="overallStatusRef"
            style="width: 100%; height: calc(100% - 20px); position: relative"
          ></div>
        </div>
        <div class="r-left-inp">
          <p class="message-title">近一个月体检总人数分布</p>
          <div
            ref="checkupAllRef"
            style="width: 100%; height: calc(100% - 22px); position: relative"
          ></div>
          <!-- <div class="p-12px message-empty" v-else>
            <div style="width: 100%">
              <img :src="emptyBg" alt="" class="w-200px" srcset="" />
              <p>暂无数据</p></div
            >
          </div> -->
        </div>
      </div>
    </div>
    <div class="r-right">
      <div class="r-top-date">
        <p class="message-title">未来7天体检统计</p>
        <div class="examli">
          <div class="li-top">
            <div class="li-row" v-for="item in medicalData.futureWeekCount" :key="item.FUTURE_DATE">
              <div>{{ item.FUTURE_DATE || '' }}</div>
              <div>{{ item.COUNT }}人</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="li-left">
            <div>体检类型</div>
            <div class="tijian" ref="examTypeRef"></div>
            <div class="ul">
              <span class="left-li left-li1"></span>
              <span class="right-li"
                >个人体检 丨 {{ medicalData.futureWeekPersonalExamCount }}（{{
                  medicalData.futureWeekPersonalExamCountPercent
                }}%）</span
              >
            </div>
            <div class="ul">
              <span class="left-li left-li2"></span>
              <span class="right-li"
                >团队体检 丨{{ medicalData.futureWeekUnitExamCount }}（{{
                  medicalData.futureWeekUnitExamCountPercent
                }}%）</span
              >
            </div>
          </div>
          <div class="li-right">
            <div>男女比例</div>
            <div class="sexType" ref="sexRatioRef"></div>
            <div class="ul">
              <span class="left-li left-li3"></span>
              <span class="right-li"
                >男性 丨{{ medicalData.futureWeekMaleExamCount }}（{{
                  medicalData.futureWeekMaleExamCountPercent
                }}%）</span
              >
            </div>
            <div class="ul">
              <span class="left-li left-li4"></span>
              <span class="right-li"
                >女性 丨{{ medicalData.futureWeekFemaleExamCount }}（{{
                  medicalData.futureWeekFemaleExamCountPercent
                }}%）</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="r-right-l">
        <p class="message-title">危急值提醒</p>
        <div class="crisis">
          <div class="crisis-item-top">
            <div class="crisis-item-top-l">姓名</div>
            <div class="crisis-item-top-l">单位</div>
            <div class="crisis-item-top-l">危急值</div>
          </div>
          <div style="flex: 1; overflow: auto" v-if="crisisData.length > 0">
            <div
              :class="{ 'crisis-item-row': index % 2 != 0, 'crisis-item': true }"
              v-for="(item, index) in crisisData"
              :key="index"
            >
              <div class="crisis-item-content">
                {{ item.name }}
              </div>
              <div class="crisis-item-content">
                {{ item.unit }}
              </div>
              <div class="crisis-item-content">
                {{ item.content }}
              </div>
            </div>
          </div>
          <div
            v-else
            style="height: 260px; display: flex; align-items: center; justify-content: center"
          >
            暂无数据
          </div>
        </div>
        <!-- <div class="p-12px message-empty" v-else>
          <div style="width: 100%">
            <img :src="emptyBg" alt="" class="w-200px" srcset="" />
            <p>暂无数据</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref } from 'vue'
import personInspect from '@/assets/imgs/person-inspect.png'
import teamInspect from '@/assets/imgs/team-inspect.png'
import assessment from '@/assets/imgs/assessment.png'
import reInspection from '@/assets/imgs/re-inspection.png'
import * as echarts from 'echarts'
import { useUserStore } from '@/store/modules/user'
import { formatDate } from '@/utils/formatTime'
import { homePageCountInfo } from '@/api/PerPhyExamination/perExamination/index'
import { it } from 'node:test'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUser)
const currenHospitalId = computed(() => userStore.getHospitalId)
const zhuyuanType = ref('2')
const crisisData = ref<any>([])
const medicalData = ref<any>({})
onMounted(async () => {
  // await queryInpPatCountTrendApi()
  // await queryToDoListApi()
  medicalData.value = await homePageCountInfo()
  nextTick(() => {
    showCheckupChart() //近一个月体检人数
    showAllCheckupChart() //近一个月体检总人数分布
    showOverallStatusChart() // 近一个月体检总状态
    showExamTypeChart() // 体检类型统计
    showSexRatioChart() // 性别比例
    showBusiness() // 当日业务
  })
})
const checkupRef = ref<HTMLDivElement | null>(null)
const showCheckupChart = () => {
  let xdata = []
  let ydata = []
  let pastMonthCountMap = medicalData.value.pastMonthCountMap
  if (pastMonthCountMap && pastMonthCountMap.length > 0) {
    pastMonthCountMap.forEach((item) => {
      xdata.unshift(item.VISIT_DAY)
      ydata.unshift(item.DATA_COUNT)
    })
  }
  if (checkupRef.value) {
    const chartInstance = echarts.init(checkupRef.value)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option: echarts.EChartsOption = {
      grid: {
        left: '2%',
        right: '2%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          data: ydata,
          type: 'line',
          smooth: true, // 设置为 true 以启用平滑曲线
          lineStyle: {
            color: '#165DFF', // 线条颜色
            width: 2 // 线条宽度
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(22, 93, 255,0.3)' }, // 起始颜色（半透明绿色）
                { offset: 1, color: 'rgba(22, 93, 255,0.3)' } // 结束颜色（完全透明）
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    chartInstance.setOption(option)
  }
}
const checkupAllRef = ref<HTMLDivElement | null>(null)
const showAllCheckupChart = () => {
  let xdata = [],
    ydata1 = [],
    ydata2 = [],
    pastMonthPersonalCountMap = medicalData.value.pastMonthPersonalCountMap,
    pastMonthUnitCountMap = medicalData.value.pastMonthUnitCountMap
  if (pastMonthPersonalCountMap && pastMonthPersonalCountMap.length > 0) {
    pastMonthPersonalCountMap.forEach((item) => {
      xdata.unshift(item.VISIT_DAY)
      ydata1.unshift(item.DATA_COUNT)
    })
  }

  if (pastMonthUnitCountMap && pastMonthUnitCountMap.length > 0) {
    pastMonthUnitCountMap.forEach((item) => {
      ydata2.unshift(item.DATA_COUNT)
    })
  }
  if (checkupAllRef.value) {
    const chartInstance2 = echarts.init(checkupAllRef.value)
    window.addEventListener('resize', () => {
      chartInstance2.resize()
    })
    const rawData = [ydata1, ydata2]
    const totalData: number[] = []
    for (let i = 0; i < rawData[0].length; ++i) {
      let sum = 0
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i]
      }
      totalData.push(sum)
    }

    const grid = {
      left: '10%', // 减少左边距
      right: '10%', // 减少右边距
      top: 50,
      bottom: 50
    }

    const series: echarts.BarSeriesOption[] = ['个检', '团检'].map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        // barWidth: '60%',
        label: {
          show: true,
          formatter: (params: any) => params.value // 直接显示原始数量
        },
        data: rawData[sid], // 直接使用原始数据
        itemStyle: {
          color: sid === 0 ? '#F7BA1E' : '#3670F5' // 为不同系列设置不同颜色
        }
      }
    })

    const option: echarts.EChartsOption = {
      legend: {
        selectedMode: false,
        show: false
      },
      grid,

      yAxis: {
        type: 'value',
        // min: 0, // 设置 Y 轴的最小值
        // max: 500, // 设置 Y 轴的最大值
        // interval: 200, // 设置 Y 轴的刻度间隔
        axisLabel: {
          formatter: '{value}' // 可选：格式化刻度标签
        }
      },

      xAxis: {
        type: 'category',
        data: xdata
      },
      series
    }
    chartInstance2.setOption(option)
  }
}
const overallStatusRef = ref<HTMLDivElement | null>(null)
const showOverallStatusChart = () => {
  if (overallStatusRef.value) {
    const chartInstance = echarts.init(overallStatusRef.value)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
        // show: false // 隐藏图例
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false // 隐藏引导线
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          data: [
            {
              value: medicalData.value.pastMonthPersonalAuditCount,
              name: '团检',
              itemStyle: {
                color: '#165DFF' // 为“团检”设置颜色，例如番茄红
              }
            },
            {
              value: medicalData.value.pastMonthUnitAuditCount,
              name: '个检',
              itemStyle: {
                color: '#F7BA1E' // 为“个检”设置颜色，例如钢蓝色
              }
            }
          ]
        }
      ]
    }
    chartInstance.setOption(option)
  }
}

const examTypeRef = ref<HTMLDivElement | null>(null)
const showExamTypeChart = () => {
  if (examTypeRef.value) {
    const chartInstance = echarts.init(examTypeRef.value)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        show: false // 隐藏图例
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false // 隐藏引导线
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          data: [
            {
              value: medicalData.value.futureWeekUnitExamCount,
              name: '团检',
              itemStyle: {
                color: '#4D94FF'
              }
            },
            {
              value: medicalData.value.futureWeekPersonalExamCount,
              name: '个检',
              itemStyle: {
                color: '#00C27C'
              }
            }
          ]
        }
      ]
    }
    chartInstance.setOption(option)
  }
}
const sexRatioRef = ref<HTMLDivElement | null>(null)
const showSexRatioChart = () => {
  if (sexRatioRef.value) {
    const chartInstance = echarts.init(sexRatioRef.value)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        show: false // 隐藏图例
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false // 隐藏引导线
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          data: [
            {
              value: medicalData.value.futureWeekMaleExamCount,
              name: '男性',
              itemStyle: {
                color: '#3473D1'
              }
            },
            {
              value: medicalData.value.futureWeekFemaleExamCount,
              name: '女性',
              itemStyle: {
                color: '#EC6B44'
              }
            }
          ]
        }
      ]
    }
    chartInstance.setOption(option)
  }
}
const queryToDoListApi = async () => {
  // crisisData.value = await queryToDoList({
  //   queryFlag: 1,
  //   hospitalId: currenHospitalId.value
  // })
}
const toggleQueryInpPatCountTrendApi = async (type: string) => {
  zhuyuanType.value = type
}
// const toggleQueryInpPatDiagnosisCountApi = async (type: string) => {
//   zhenduanType.value = type
//   queryInpPatDiagnosisCountApi()
// }

const businessRef = ref<HTMLDivElement | null>(null)
const showBusiness = () => {
  // const chartInstance = echarts.init(businessRef.value)
  /* const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '85%',
        label: {
          show: false // 隐藏标签
        },
        labelLine: {
          show: false // 隐藏引导线
        },
        data: [
          { value: 1048, name: '检中' },
          { value: 735, name: '登记' },
          { value: 580, name: '签到' },
          { value: 484, name: '交表' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  chartInstance.setOption(option) */

  if (businessRef.value) {
    const chartInstance = echarts.init(businessRef.value)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
        // show: false // 隐藏图例
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false // 隐藏引导线
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          data: [
            {
              value: medicalData.value.toDayUnitExam,
              name: '团检',
              itemStyle: {
                color: '#165DFF' // 为“团检”设置颜色，例如番茄红
              }
            },
            {
              value: medicalData.value.toDayPersonalExam,
              name: '个检',
              itemStyle: {
                color: '#F7BA1E' // 为“个检”设置颜色，例如钢蓝色
              }
            }
          ]
        }
      ]
    }
    chartInstance.setOption(option)
  }
}
defineExpose({
  queryToDoListApi
})
</script>

<style scoped lang="scss">
.home-right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .r-left {
    height: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-right: 8px;

    .r-top-info {
      width: 100%;
      height: 200px;
      margin-right: 8px;
      background: #fff;
      border-radius: 4px;
      padding-top: 10px;
      position: relative;

      .bingli {
        font-size: 14px;
        color: #333;
        padding: 0 12px;
        margin-top: 20px;

        .bingli-count {
          display: flex;
          width: 100%;
          justify-content: space-between;

          .bingli-count-item {
            width: calc(25% - 8px);
            position: relative;
            background: #eef5fd;
            padding: 0 15px;
            // border: 1px solid #71ce66;
            border-radius: 4px;
            height: 112px;
            position: relative;
            display: flex;
            align-items: center;

            .img_div_img {
              width: 68px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;

              img {
                width: 56px;
                height: 56px;
              }
            }

            .img_div_p {
              width: calc(100% - 70px);
              height: 56px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .div_p {
                text-align: justify;
                font-size: 16px;
                color: #666666;
                line-height: 20px;
                margin: 0;
              }

              .div_div {
                display: flex;
                align-items: center;

                p {
                  font-size: 20px;
                  line-height: 22px;
                  color: #333333;
                  font-weight: bold;
                  margin: 0;
                }
              }
            }
          }
        }
      }
    }

    .r-left-content {
      display: flex;
      flex-direction: row;
      flex: 1.1;
      overflow: hidden;
    }

    .r-left-bottom {
      flex: 1;
      margin-top: 8px;
      overflow: hidden;
    }

    .r-left-inp {
      flex: 1;
      overflow: hidden;
      height: 100%;
      padding-top: 10px;
      background: #fff;
      border-radius: 4px;
      margin-top: 8px;
      position: relative;
    }

    .r-left-inp-left {
      width: 400px;
      height: 100%;
      padding-top: 10px;
      background: #fff;
      border-radius: 4px;
      margin-top: 8px;
      margin-right: 8px;
      position: relative;

      .content {
        display: flex;
        flex-direction: row;
        height: 100%;
        height: calc(100% - 33px);
        .left-content {
          width: 200px;
          height: 100%;
        }
        .right-text {
          flex: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .ul {
            height: 32px;
            line-height: 32px;
            .left-li {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
            }

            .left-li1 {
              background: #165dff;
            }
            .left-li2 {
              background: #14c9c9;
            }
            .left-li3 {
              background: #f7ba1e;
            }
            .left-li4 {
              background: #722ed1;
            }
            .li {
              color: #666666;
              font-size: 13px;
              margin-left: 5px;
            }
            .right-li {
              margin-left: 10px;
              color: #333333;
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  .r-right {
    width: 428px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .r-top-date {
      width: 428px;
      height: 420px;
      background: #fff;
      border-radius: 4px;
      padding-top: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      .examli {
        width: 100%;
        margin-top: 6px;
        .li-top {
          display: flex;
          justify-content: center;
          .li-row {
            width: 60px;
            height: 60px;
            border: 1px solid #4c94ff;
            text-align: center;
            background: #f8fcff;
            color: #3473d1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            div:nth-child(2) {
              font-weight: 600;
            }
          }
          .li-row:nth-child(1) {
            border-radius: 4px 0 0 4px;
            background: #3473d1 !important;
            color: #fff !important;
          }
          .li-row:nth-last-child(1) {
            border-radius: 0 4px 4px 0;
          }
        }
      }
      .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        .ul {
          height: 32px;
          line-height: 32px;
          .left-li {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }

          .left-li1 {
            background: #4d94ff;
          }
          .left-li2 {
            background: #00c27c;
          }
          .left-li3 {
            background: #3473d1;
          }
          .left-li4 {
            background: #ec6b44;
          }
          .right-li {
            margin-left: 10px;
            color: #333333;
            font-size: 14px;
            // font-weight: 600;
          }
        }
        .li-left {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 20px 10px 30px 10px;
          .tijian {
            flex: 1;
          }
        }
        .li-right {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 20px 10px 30px 10px;
          .sexType {
            flex: 1;
          }
        }
      }
    }

    .r-right-l {
      width: 428px;
      flex: 1;
      overflow: hidden;
      margin-right: 8px;
      margin-top: 8px;
      background: #fff;
      border-radius: 4px;
      position: relative;

      .crisis {
        padding: 0px 12px;
        height: calc(100% - 32px);
        margin-top: 10px;
        overflow: hidden;
        display: flex;
        position: relative;
        flex-direction: column;
        .crisis-item-top {
          display: flex;
          .crisis-item-top-l {
            background: #3473d1;
            color: #fff;
            height: 34px;
            line-height: 34px;
            text-align: left;
            padding-left: 10px;
            margin-right: 1px;
          }
          .crisis-item-top-l:nth-child(1) {
            width: 100px;
          }
          .crisis-item-top-l:nth-child(2) {
            width: 200px;
          }
          .crisis-item-top-l:nth-child(3) {
            width: 200px;
          }
        }
        .crisis-item-row {
          background: #e4effc;
        }
        .crisis-item {
          border-right: 1px solid #eaeaea;
          font-size: 12px;
          color: #333;
          display: flex;
          flex-direction: row;
          .crisis-item-content {
            font-size: 14px;
            color: #333333;
            line-height: 34px;
            text-align: left;
            padding-left: 10px;
            margin-right: 1px;
          }
          .crisis-item-content:nth-child(1) {
            width: 100px;
          }
          .crisis-item-content:nth-child(2) {
            width: 200px;
          }
          .crisis-item-content:nth-child(3) {
            color: #ff0b0b !important;
            width: 200px;
          }
        }
      }
    }
  }
}

.message-title {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  text-align: left;
  position: relative;
  padding-left: 10px;

  span {
    font-size: 12px;
    color: #666;
    margin-left: 4px;
    font-weight: normal;
  }
}

.message-title::after {
  content: '';
  width: 3px;
  height: 16px;
  background: #3473d1;
  position: absolute;
  left: 0;
  top: 0px;
}

.message-empty {
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  align-items: center;

  img {
    margin: 0px auto 0px;
  }

  p {
    color: #999999;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    text-align: center;
  }
}

.buttons {
  position: absolute;
  right: 8px;
  top: 14px;
  font-size: 14px;
  z-index: 2;

  span {
    padding: 4px 8px;
    border: 1px solid #eaeaea;
    color: #666;
    cursor: pointer;
    margin-left: -1px;
  }

  span:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
  }

  span:nth-last-child(1) {
    border-radius: 0px 4px 4px 0px;
  }

  span.toggleActivate {
    background: #3473d1;
    border: 1px solid #3473d1;
    color: #fff;
  }
}

:deep(.el-calendar__body) {
  padding: 2px 12px 10px !important;
}

:deep(.el-calendar-table .el-calendar-day) {
  height: 44px !important;
}

.messafe-info-text p span {
  font-size: 12px !important;
  color: #666666 !important;
}

.messafe-info-text span span {
  font-size: 12px !important;
  color: #666666 !important;
}
</style>
