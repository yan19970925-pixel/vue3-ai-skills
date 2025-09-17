<template>
  <div class="table_wrap">
    <div
      :key="'comKey' + comKey"
      :class="['container', `container${props.containerIndex}`]"
      :style="{
        marginTop: marginTop + 'px'
      }"
    >
      <svg width="100%" height="100%"></svg>
    </div>
    <div>
      <p
        ref="topTitle"
        style="font-size: 20px; text-align: center; height: 26.5px; line-height: 26.5px"
        >{{ currenHospitalName }}</p
      >
      <!-- <p style="font-size: 20px;text-align: center; font-weight: bold">{{ info.title || info.originName }}</p> -->
      <p style="font-size: 20px; text-align: center; height: 26.5px; line-height: 26.5px">体温单</p>
      <p
        ref="topTitle1"
        style="position: relative; text-align: left; height: 17px; line-height: 17px"
      >
        <span class="tbale-label">姓名：</span
        ><span style="display: inline-block; width: 100px; text-align: left">{{ info.name }}</span>
        <span class="tbale-label">性别：</span>
        <span style="display: inline-block; width: 25px; text-align: left">{{ info.sex }}</span>
        <span class="tbale-label">年龄：</span>
        <span style="display: inline-block; width: 70px; text-align: left">{{
          info.currAge || ''
        }}</span>
        <span class="tbale-label">住院号：</span>
        <span style="display: inline-block; width: 90px; text-align: left">{{ info.bah }}</span>
        <span class="tbale-label">科别：</span>
        <span
          style="
            display: inline-block;
            max-width: 340px;
            min-width: 110px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-sizing: border-box;
            text-align: left;
            margin-bottom: -3px;
            margin-right: 10px;
          "
          >{{ info.officeName || '-' }}</span
        >
      </p>
      <p style="position: relative; text-align: left; height: 17px; line-height: 17px">
        <span class="tbale-label">诊断：</span>
        <span
          style="
            display: inline-block;
            max-width: 450px;
            min-width: 90px;
            text-align: left;
            margin-right: 10px;
          "
          >{{ info.inDiagName || '-' }}</span
        >
        <span class="tbale-label">床号：</span>
        <span
          style="
            display: inline-block;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-sizing: border-box;
            margin-bottom: -4px;
            text-align: left;
          "
          >{{ info.cwh }}</span
        >
        <!-- <span class="tbale-label">护理等级：</span>
          <span style="display: inline-block; width: 200px; text-align: left">{{
            info.nursingClassName || '-'
          }}</span> -->
      </p>
    </div>
    <table class="temperatureChart" style="font-weight: 500">
      <thead></thead>
      <tbody>
        <tr ref="topTr">
          <td
            ref="topTd"
            :colspan="index === 0 ? 8 : 6"
            :class="[index && 'redLineTd', !index && 'table-just']"
            v-for="(item, index) in inHospitalTime"
            :key="index + '|indays'"
          >
            {{ index === 0 ? '日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期' : item }}
          </td>
        </tr>
        <tr ref="topTr1">
          <td
            :colspan="index === 0 ? 8 : 6"
            :class="[index && 'redLineTd', !index && 'table-just']"
            v-for="(item, index) in inHospitalDays"
            :key="index + '|inHospitalDays'"
          >
            {{
              index === 0
                ? '住院天数'
                : new Date(inHospitalTimeList[index]).getTime() > new Date().getTime() ||
                  (info.outdate &&
                    Number(info.outdate) < new Date(inHospitalTimeList[index]).getTime() + 1000)
                ? ''
                : item
            }}
          </td>
        </tr>
        <tr>
          <td
            :colspan="index === 0 ? 8 : 6"
            :style="{
              color: index === 0 ? '' : 'red'
            }"
            :class="[index && 'redLineTd', !index && 'table-just']"
            v-for="(item, index) in surgeryDaysList"
            :key="index + '|surgeryDays'"
          >
            {{ index === 0 ? '手术日期' : item.y || '' }}
          </td>
        </tr>
        <tr>
          <td class="table-just" rowspan="2" colspan="8">
            时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间
          </td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
          <td colspan="3">上午</td>
          <td colspan="3" class="redLineTd">下午</td>
        </tr>
        <tr>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText redLineTd">23</td>
          <td class="focusText">3</td>
          <td>7</td>
          <td>11</td>
          <td>15</td>
          <td class="focusText">19</td>
          <td class="focusText">23</td>
        </tr>

        <!-- <record></record> -->
        <tr class="recorde temperature_mark">
          <!-- <td colspan="2" rowspan="50">
            <div class="num_wrapper">
              <p style="margin-top: 0; font-size: 12px; height: 32px; line-height: 16px"
                >呼吸<br />●</p
              >
              <p style="margin-top: 30px" v-html="'&nbsp;'"></p>
              <p v-html="'&nbsp;'"></p>
              <p v-html="'&nbsp;'"></p>
              <p v-html="'&nbsp;'"></p>
              <p>50</p>
              <p>40</p>
              <p>30</p>
              <p>20</p>
              <p>10</p>
            </div>
          </td> -->
          <td colspan="4" rowspan="50">
            <div style="color: red" class="num_wrapper">
              <p style="margin-top: 0; font-size: 12px; height: 32px; line-height: 16px"
                >脉搏<br />●</p
              >
              <p style="margin-top: 30px">200</p>
              <p>180</p>
              <p>160</p>
              <p>140</p>
              <p>120</p>
              <p>100</p>
              <p>80</p>
              <p>60</p>
            </div>
          </td>
          <td colspan="4" rowspan="50">
            <div style="color: blue" class="num_wrapper">
              <p style="margin-top: 0; font-size: 12px; height: 32px; line-height: 16px"
                >体温<br />x</p
              >
              <p style="margin-top: 30px">41</p>
              <p>40</p>
              <p>39</p>
              <p>38</p>
              <p>37</p>
              <p>36</p>
              <p>35</p>
              <p>34</p>
              <!-- <div class="tengtong">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    width: 48%;
                    height: 100%;
                    border-right: 1px solid #ccc;
                    padding-top: 3px;
                  "
                >
                  疼<br />痛<br />强<br />度
                </div>
                <div style="width: 52%; font-size: 12px; margin-top: -2px">
                  <div class="tengtongzhi">10</div>
                  <div class="tengtongzhi">9</div>
                  <div class="tengtongzhi">8</div>
                  <div class="tengtongzhi">7</div>
                  <div class="tengtongzhi">6</div>
                  <div class="tengtongzhi">5</div>
                  <div class="tengtongzhi">4</div>
                  <div class="tengtongzhi">3</div>
                  <div class="tengtongzhi">2</div>
                  <div class="tengtongzhi">1</div>
                </div>
              </div> -->
            </div>
          </td>
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td0'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          >
            <div class="recorde-text" v-html="getSymbolTextArr(y)"></div>
          </td>
        </tr>
        <tr class="recorde" v-for="(tr, index) in [0, 0, 0]" :key="index + 'tr1'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td1'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>

        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td2'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td21'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>

        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr2'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td3'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>
        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td4'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td41'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>

        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr3'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td5'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>

        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td6'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td61'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>

        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr4'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td7'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>

        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td8'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td81'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>

        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr5'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td9'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>

        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td10'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td101'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>
        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr6'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td11'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>
        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td11'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td111'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>

        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr7'">
          <td
            v-for="(item, y) in tdList"
            :key="y"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>
        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td12'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td121'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>
        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr8'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td13'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>
        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td14'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td141'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>
        <!-- <tr
          class="recorde"
          v-for="(tr, index) in [0, 0, 0, 0, 0]"
          :key="index + 'tr9'"
        >
        <td
            v-for="(item, y) in tdList"
            :key="y + 'td15'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr> -->
        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr8'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td15'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          ></td>
        </tr>
        <!--添加疼痛评分-->
        <tr class="recorde">
          <template v-for="(item, index) of tdList">
            <td
              :key="index + 'td16'"
              v-if="index % 6 === 5 && index != tdList.length"
              class="redLineTd"
              style="border-bottom: 1px solid #7e7eff"
            ></td>
            <td :key="index + 'td16'" v-else style="border-bottom: 1px solid #7e7eff"></td>
          </template>
        </tr>
        <tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0, 0]" :key="index + 'tr9'">
          <td
            v-for="(item, y) in tdList"
            :key="y + 'td17'"
            :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"
          >
            <div v-if="index == 4" class="recorde-text2">{{ getSymbolDataset(y) }}</div>
          </td>
        </tr>
        <tr>
          <td
            :style="
              index === 0
                ? ''
                : index % 2 === 0 && index != 0
                ? 'height: 35px;font-weight: 100;padding-bottom: 20px'
                : 'height: 35px;font-weight: 100;padding-top: 20px'
            "
            :colspan="index === 0 ? 8 : 1"
            v-for="(item, index) in new Array(43)"
            :class="index % 6 == 0 && index != 0 ? 'redLineTd' : ''"
            :key="index + '|1008'"
          >
            {{
              index === 0
                ? '呼吸(次/分)'
                : breathDataR.find((obj) => obj.x == index - 1)
                ? breathDataR.find((obj) => obj.x == index - 1).y
                : ''
            }}
          </td>
        </tr>
        <tr v-for="it in props.options" :key="it.name">
          <td
            :colspan="index === 0 ? 8 : 6"
            v-for="index in [0, 1, 2, 3, 4, 5, 6, 7]"
            :class="[index && 'redLineTd']"
            :style="{
              color: it.name.includes('过敏') && index != 0 ? '#ff6e71' : ''
            }"
            :key="index + '|' + it.key"
          >
            {{
              index === 0
                ? it.name
                : typesViewData[it.key] && defecation.includes(typesViewData[it.key][index - 1])
                ? '※'
                : typesViewData[it.key] && defecation2.includes(typesViewData[it.key][index - 1])
                ? '☆'
                : typesViewData[it.key] && typesViewData[it.key][index - 1]
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="legend">
      <span>标注：</span>
      <div class="legend-text">
        <div class="legend-item" style="color: blue">体温: x</div>
        <!-- <div class="legend-item" style="color: blue">呼吸: ○</div> -->
        <div class="legend-item" style="color: red">脉搏：●</div>
        <!-- <div class="legend-item"
          >疼痛:
          <span style="display: inline-block; transform: rotate(180deg); font-size: 12px"
            >▲</span
          ></div
        > -->
        <!-- <div class="legend-item"
          >疼痛: <span style="display: inline-block; font-size: 12px"> ▲</span></div
        > -->
        <div class="legend-item" style="color: red">心率：○</div>
        <div class="legend-item" style="color: red">降温后：○</div>
      </div>
      <div style="font-size: 13px; font-weight: bold">
        {{ `第${SectionToChinese(+info.weekNo + 1)}周` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import dayjs from 'dayjs'
import { getKeyMap, SectionToChinese } from './utils'
// import { scaleLinear, select, line } from 'd3'
// import { axisBottom } from 'd3'
// import { axisLeft } from 'd3'
import { propTypes } from '@/utils/propTypes'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const currenHospitalName = computed(() => userStore.getHospitalName)
import { sortList } from '@/utils/dateSort'
const marginTop = ref<number>(0)
const keyMap = getKeyMap()
const info = ref({
  age: 0,
  ageunit: '',
  bah: '',
  beginDate: '',
  birth: '',
  currAge: '',
  cwh: '',
  hospCode: '',
  hospDate: 0,
  hospDays: '',
  inDate: 0,
  inDiagName: null,
  nursingClassName: '',
  name: '',
  officeName: '',
  operaDays: '',
  outdate: '',
  sex: '',
  weekNo: '',
  originName: '测试医院',
  title: ''
})
// const xyList = ref<any>([])
const rowsInfo = ref<any>([])
const typesInfo = ref<any>([])
const typesViewData = ref<any>([])
const breathData = ref<any>([])
const breathDataR = ref<any>([])
const surgeryDaysList = ref<any>([]) //手术天数
const tdList = ref<any>(new Array(42).fill(0))
const comKey = ref<number>(1)
const symbolTextArr = ref<any>([])
const topTd = ref(null)
const topTr = ref(null)
const topTr1 = ref(null)
const topTitle = ref(null)
const topTitle1 = ref(null)
const dataset_no = ref<any>([]) //体温不升
const defecation = ref<any>(['大便失禁', '灌肠', '小便失禁', '造痿']) //需要标注
const defecation2 = ref<any>(['人造肛门']) //需要标注
const props = defineProps({
  value: propTypes.object.def([]),
  options: propTypes.object.def([]),
  containerIndex: propTypes.number.def(0)
})
const inHospitalTimeList = ref<any>([]) //定义的存日期的数组

const inHospitalTime = computed(() => {
  const initday = dayjs(info.value.beginDate)
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  inHospitalTimeList.value = [
    null, // 文案天
    initday.format('YYYY-MM-DD'),
    initday.add(1, 'day').format('YYYY-MM-DD'),
    initday.add(2, 'day').format('YYYY-MM-DD'),
    initday.add(3, 'day').format('YYYY-MM-DD'),
    initday.add(4, 'day').format('YYYY-MM-DD'),
    initday.add(5, 'day').format('YYYY-MM-DD'),
    initday.add(6, 'day').format('YYYY-MM-DD')
  ]
  return [
    null, // 文案天
    initday.format('YYYY-MM-DD'),
    getDataTime(initday.add(1, 'day'), initday.format('YYYY')),
    getDataTime(initday.add(2, 'day'), initday.format('YYYY')),
    getDataTime(initday.add(3, 'day'), initday.format('YYYY')),
    getDataTime(initday.add(4, 'day'), initday.format('YYYY')),
    getDataTime(initday.add(5, 'day'), initday.format('YYYY')),
    getDataTime(initday.add(6, 'day'), initday.format('YYYY'))
  ]
})

const inHospitalDays = computed(() => {
  const initday = Number(info.value.hospDays) || 0
  return [
    null, // 文案天
    initday + 1,
    initday + 2,
    initday + 3,
    initday + 4,
    initday + 5,
    initday + 6,
    initday + 7
  ]
})
const surgeryDays = computed(() => {
  //  const initday = info.value.operaDays
  const initday = info.value.infoData
  if (!initday) {
    return new Array(8).fill(null)
  } else {
    return [
      null, // 文案天
      initday,
      initday + 1,
      initday + 2,
      initday + 3,
      initday + 4,
      initday + 5,
      initday + 6
    ]
  }
})
// 处理跨年跨越的日期显示
const getDataTime = (row, firstData) => {
  if (row.format('DD') == '01' && row.format('YYYY') == firstData) {
    return row.format('MM-DD')
  } else if (row.format('DD') == '01' && row.format('YYYY') != firstData) {
    return row.format('YYYY-MM-DD')
  } else {
    return row.format('DD')
  }
}

const initFunc = () => {
  initData()
  init()
  if (topTr.value && topTr1.value && topTitle.value && topTitle1.value) {
    const marginTitleTop1 =
      Math.round(
        (Math.round((topTitle.value as any).getBoundingClientRect().height * 100) / 100 - 26.5) *
          2 *
          100
      ) / 100
    const marginTitleTop2 =
      Math.round(
        (Math.round((topTitle1.value as any).getBoundingClientRect().height * 100) / 100 - 17) *
          2 *
          100
      ) / 100

    const marginTop1 =
      Math.round(
        (Math.round((topTr.value as any).getBoundingClientRect().height * 100) / 100 - 19) * 100
      ) / 100
    const marginTop2 =
      Math.round(
        (Math.round((topTr1.value as any).getBoundingClientRect().height * 100) / 100 - 18) *
          4 *
          100
      ) / 100
    marginTop.value =
      Math.round((marginTitleTop1 + marginTitleTop2 + marginTop1 + marginTop2) * 100) / 100
  }
  // 浏览器缩放时候计算实际的高度与设置的高度差
}

// 初始化所
onMounted(() => {})
const getSymbolTextArr = (index) => {
  const current = symbolTextArr.value.find((i) => i.x === index)
  // console.log(current, '当前点击的')
  if (current) {
    return current.y
  } else {
    return ''
  }
}
// 体温不升显示
const getSymbolDataset = (index) => {
  const current = dataset_no.value.find((i) => i.x === index)
  // console.log(current, '当前点击的')
  if (current) {
    return current.y
  } else {
    return ''
  }
}
// const refresh = () => {
//   comKey.value++
//   // this.$forceUpdate()
//   initData()
//   init()
// }

const initData = () => {
  info.value = props.value.grParamBOS[0] || {}
  rowsInfo.value = props.value.rows || []
  typesInfo.value = props.value.types || []
}
const init = () => {
  const width = 730
  const height = 734
  // SVG画布边缘与图表内容的距离
  const padding = { top: 50, right: 0, bottom: 50, left: 50 }

  // 创建一个分组用来组合要画的图表元素
  const main = d3
    .select(`.container${props.containerIndex} svg`)
    .append('g')
    .classed('main', true)
    .attr('width', width)
    .attr('height', height)

  // 模拟数据 体温
  const dataset = getTypeData('003', rowsInfo.value) //体温
  const datasetAnus = getTypeData('015', rowsInfo.value) //物理降温【黑空圆】
  const datasetDrug = getTypeData('032', rowsInfo.value)
  const datasetAnusAndDrug = setMergeDatasetDurg(datasetAnus, datasetDrug) //合并物理降温和药物降温
  const datasetHeartrate = getTypeData('014', rowsInfo.value) //心率
  const datasetHb = setMergeDataset(dataset, datasetAnusAndDrug) //合并的体温和降温（物理和药物）
  // console.log(datasetHeartrate, '心率【红空圆】')
  const datasetPulse = getTypeData('002', rowsInfo.value)
  // console.log(datasetPulse, '脉搏【红实圆】')
  const datasetPulseHb = setMergeDataset(datasetHeartrate, datasetPulse) //合并的心率和脉搏
  const symbolTextArr2 = getTypeData('012', rowsInfo.value, false)
  // symbolTextArr.value = symbolTextArr2
  // 护理事件
  const symbolTextArr3 = getTypeData('013', rowsInfo.value, false)
  const mergeTag = setMergeTag(symbolTextArr2, symbolTextArr3)
  symbolTextArr.value = mergeTag

  // 获取体温不升
  const dataset_n = getType('003', rowsInfo.value)
  dataset_no.value = dataset_n

  // console.log(symbolTextArr2, '【特殊标记】')
  // 呼吸【黑实圆】
  // const datasetPain = getTypeData('001', rowsInfo.value)
  // breathData.value = datasetPain
  const datasetPainR = getTypeBreathData('001', rowsInfo.value)
  breathDataR.value = datasetPainR

  // const tentongtPain = getTypeData('031', rowsInfo.value)
  // 疼痛值
  const surgeryDays = getTypeData2('031', typesInfo.value)
  surgeryDaysList.value = [{}, ...surgeryDays]

  // 创建x轴的比例尺(线性比例尺)
  const xScale = d3
    .scaleLinear()
    .domain([0, 42])
    .range([8, width + 8])

  // 创建y轴的比例尺(线性比例尺)
  // 体温
  const yScale = d3.scaleLinear().domain([32, 42]).range([height, 0])
  // 脉搏
  const yScale1 = d3.scaleLinear().domain([20, 220]).range([height, 0])
  // 呼吸
  const yScale2 = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - padding.top + 22, -80])
  // 疼痛值
  // const yScale3 = d3
  //   .scaleLinear()
  //   .domain([0, 50])
  //   .range([height - padding.top + 22, -80])
  // 创建x轴
  const xAxis = d3.axisBottom(xScale)

  // 创建y轴
  const yAxis = d3.axisLeft(yScale)
  const yAxis1 = d3.axisLeft(yScale1)
  const yAxis2 = d3.axisLeft(yScale2)
  // const yAxis3 = d3.axisLeft(yScale3)
  // 添加SVG元素并与x轴进行“绑定”
  main
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height - padding.top - padding.bottom})`)
    .call(xAxis)

  // 添加SVG元素并与y轴进行“绑定”
  main.append('g').attr('class', 'axis').call(yAxis)
  main.append('g').attr('class', 'axis').call(yAxis1)
  main.append('g').attr('class', 'axis').call(yAxis2)
  // main.append('g').attr('class', 'axis').call(yAxis3)
  // 添加折线
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
  const line1 = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale1(d.y))
  const line2 = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale2(d.y))
    .curve(d3.curveLinear)
  // const line3 = d3
  //   .line()
  //   .x((d) => xScale(d.x))
  //   .y((d) => yScale3(d.y))
  //   .curve(d3.curveLinear)

  // 添加path元素，并通过line()计算出值来赋值
  main.append('path').attr('class', 'line tiwenline').attr('d', line(dataset))
  // main.append('path').attr('class', 'line').attr('d', line(datasetAnus)) //物理降温连线
  // main.append('path').attr('class', 'line huxiline').attr('d', line2(datasetPain))
  // .attr('fill', 'none')
  // .attr('stroke-width', 0.3)
  main.append('path').attr('class', 'line lineColor').attr('d', line1(datasetHeartrate))
  main.append('path').attr('class', 'line lineColor maiboline').attr('d', line1(datasetPulse))
  // main.append('path').attr('class', 'line lineColor').attr('d', line3(tentongtPain))
  // 绘制物理降温后折线图（垂直连线）
  main
    .selectAll('.vertical-line')
    .data(datasetHb)
    .enter()
    .append('line')
    .attr('class', 'vertical-line') // 可以为连线添加样式类或ID等以便于后续操作
    .attr('x1', (d) => xScale(d.x)) // 起点x坐标
    .attr('y1', (d) => yScale(d.y)) // 起点y坐标
    .attr('x2', (d) => xScale(d.x1)) // 终点x坐标（与起点相同）
    .attr('y2', (d) => yScale(d.y1)) // 终点y坐标（稍微低于起点）
    .attr('stroke', 'red') // 设置线条颜色等其他属性；根据需要调整\
    .style('stroke-width', 1) // 设置线条宽度
    .style('stroke-dasharray', '5,5') // 设置虚线模式
    .style('fill', 'none') // 设置填充颜色为无
  // 绘制脉搏和心率折线图（垂直连线）
  main
    .selectAll('.vertical-line2')
    .data(datasetPulseHb)
    .enter()
    .append('line')
    .attr('class', 'vertical-line2') // 可以为连线添加样式类或ID等以便于后续操作
    .attr('x1', (d) => xScale(d.x)) // 起点x坐标
    .attr('y1', (d) => yScale1(d.y)) // 起点y坐标
    .attr('x2', (d) => xScale(d.x1)) // 终点x坐标（与起点相同）
    .attr('y2', (d) => yScale1(d.y1)) // 终点y坐标（稍微低于起点）
    .attr('stroke', 'red') // 设置线条颜色等其他属性；根据需要调整\
    .style('stroke-width', 1) // 设置线条宽度
    // .style('stroke-dasharray', '5,5') // 设置虚线模式
    .style('fill', 'none') // 设置填充颜色为无
  /* 黑空圆--start */
  main
    .selectAll('.circle1')
    .data(datasetAnusAndDrug)
    .enter()
    .append('circle')
    .attr('class', 'circle1')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 4)
    .attr('stroke', 'red')
    .attr('stroke-width', 1)
    .attr('fill', '#FFFFFF')
  /* 黑空圆--end */

  /* 红空圆--start */
  main
    .selectAll('.circle2')
    .data(datasetHeartrate)
    .enter()
    .append('circle')
    .attr('class', 'circle2')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale1(d.y))
    .attr('r', 4)
    .attr('stroke', '#EE0000')
    .attr('stroke-width', 1)
    .attr('fill', '#FFFFFF')
  /* 红空圆--end */

  /* 红实圆--start */
  main
    .selectAll('.circle3')
    .data(datasetPulse)
    .enter()
    .append('circle')
    .attr('class', 'circle3')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale1(d.y))
    .attr('r', 4)
    .attr('stroke', '#EE0000')
    .attr('stroke-width', 2)
    .attr('fill', '#EE0000')
    .on('mouseenter', (event, d) => {
      const xPosition = parseFloat(event.target.getAttribute('cx')) + 698
      const yPosition = parseFloat(event.target.getAttribute('cy')) + 24
      d3.select(`.container${props.containerIndex} svg`)
        .append('text')
        .attr('class', 'tooltip')
        .attr('x', xPosition)
        .attr('y', yPosition)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text(d.value)
    })
    .on('mouseleave', () => {
      d3.select('.tooltip').remove()
    })
  /* 红实圆--end */
  /* 黑实圆--start */
  // main
  //   .selectAll('.circle4')
  //   .data(datasetPain)
  //   .enter()
  //   .append('circle')
  //   .attr('class', 'circle4')
  //   .attr('cx', (d) => xScale(d.x))
  //   .attr('cy', (d) => yScale2(d.y))
  //   .attr('r', 4)
  //   .attr('stroke', '#000000')
  //   .attr('fill', '#000000')
  /* 黑实圆--end */

  /* 蓝空圆--start */
  // main
  //   .selectAll('.circle4')
  //   .data(datasetPain)
  //   .enter()
  //   .append('circle')
  //   .attr('class', 'circle4')
  //   .attr('cx', (d) => xScale(d.x))
  //   .attr('cy', (d) => yScale2(d.y))
  //   .attr('r', 4)
  //   .attr('stroke', 'blue')
  //   .attr('stroke-width', 1)
  //   .attr('fill', '#FFFFFF')
  /* 蓝空圆--end */
  /* 三角形--start */
  // main
  //   .selectAll('.triangle')
  //   .data(tentongtPain)
  //   .enter()
  //   .append('path')
  //   .attr('class', 'triangle')
  //   .attr('cx', (d) => xScale(d.x))
  //   .attr('cy', (d) => yScale3(d.y))
  //   .attr('r', 4)
  //   .attr('transform', 'translate(50, 50)')
  //   // .attr('transform', 'rotate(45)') // 旋转元素以使其朝向右侧，形成三角形
  //   .attr('stroke', '#39b362')
  //   .attr('stroke-width', 1)
  //   .attr('fill', '#FFFFFF')
  // main
  //   .selectAll('.triangle1')
  //   .data(tentongtPain)
  //   .enter()
  //   .append('path')
  //   .attr('class', 'triangle1')
  //   .attr(
  //     'd',
  //     (d) =>
  //       `M${xScale(d.x) + 0.3},${yScale3(d.y + 0.3)} L${xScale(d.x - 0.3)},${yScale3(
  //         d.y - 0.3
  //       )} L${xScale(d.x + 0.3)},${yScale3(d.y - 0.3)} Z`
  //   )
  //   // .attr('transform', 'translate(50, 50)')
  //   // .attr('transform', 'rotate(90)') // 旋转元素以使其朝向右侧，形成三角形
  //   .attr('fill', '#000000')
  //   .attr('stroke', '#000000')
  // .attr('stroke-width', 1)

  /* 三角形--end */

  // main
  //   .selectAll('.triangle')
  //   .data(datasetPainTT)
  //   .enter()
  //   .append('path')
  //   .attr('class', 'triangle')
  //   .attr('d', triangle)
  //   .attr('transform', function (d) {
  //     return 'translate(' + xScale(d.x) + ',' + yScale2TT(d.y) + ')'
  //   })
  //   .attr('stroke', 'green')
  //   .attr('fill', 'green')

  drawX(main, dataset, xScale, yScale)
  initTypes()
  hoverEvent(main)
}
const drawX = (main, dataset, xScale, yScale) => {
  /* 【叉形】--start */
  main
    .selectAll('.cross1')
    .data(dataset)
    .enter()
    .append('line')
    .attr('class', 'cross1')
    .attr('x1', (d) => xScale(d.x) - 4)
    .attr('y1', (d) => yScale(d.y) - 4)
    .attr('x2', (d) => xScale(d.x) + 4)
    .attr('y2', (d) => yScale(d.y) + 4)
    .attr('stroke', 'blue')

  main
    .selectAll('.cross2')
    .data(dataset)
    .enter()
    .append('line')
    .attr('class', 'cross2')
    .attr('x1', (d) => xScale(d.x) + 4)
    .attr('y1', (d) => yScale(d.y) - 4)
    .attr('x2', (d) => xScale(d.x) - 4)
    .attr('y2', (d) => yScale(d.y) + 4)
    .attr('stroke', 'blue')
  /* 体温【叉形】--end */
}
const hoverEvent = (main) => {
  document.querySelector('.lineColor').style.stroke = 'red'
  const recordeNode = document.createElement('div')
  recordeNode.setAttribute('class', 'recorde-text')
  document.querySelector('.recorde td').append(recordeNode)
  const allTrtd = document.querySelectorAll('.temperatureChart tr td')
  ;[...allTrtd].map((ele) => {
    ele.setAttribute('title', ele.innerText)
  })
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
const initTypes = () => {
  const keyMap = {}
  typesInfo.value.map((item) => {
    const key = item.typeCode
    if (keyMap[key]) {
      keyMap[key].push(item.typeValue)
    } else {
      keyMap[key] = [item.typeValue]
    }
  })
  typesViewData.value = keyMap
}
// 获取不升(null)
const getType = (type, allData = []) => {
  return allData
    .map((rowBOSItem: any, index) => {
      const rowBOS = rowBOSItem.rowBOS
      const cur =
        rowBOS.find((item) => {
          return item.typeCode === type
        }) || {}
      return {
        x: index,
        y: cur.typeValue || ''
      }
    })
    .filter((item) => {
      return item.y == '不升'
    })
}
// 合并护理事件
const setMergeTag = (ymbolTextArr: any[] = [], symbolContent: any[] = []) => {
  let arr = ymbolTextArr.map((item1, index) => {
    const item2 = symbolContent[index]
    let combinedY = item1.y
      .map((obj1, i) => {
        const time = item2.y[i] ? item2.y[i].y : ''
        return `${obj1.y}${time ? ' ' + time : ''}`
      })
      .join('<br/><br/>') // 使用空格连接所有的组合
    return {
      x: item1.x,
      y: combinedY.trim() // 去除可能的首尾空格
    }
  })
  return arr
}

// 合并物理降温和药物降温
const setMergeDatasetDurg = (wlTextArr: any[] = [], ywTextArr: any[] = []) => {
  let wlTextLsit = wlTextArr.map((item) => {
    return item.x
  })
  let newYwList = ywTextArr.filter((item) => !wlTextLsit.includes(item.x))
  return sortList(wlTextArr.concat(newYwList), 'x', 1)
}

// 合并体温和降温
const setMergeDataset = (ymbolTextArr: any[] = [], symbolContent: any[] = []) => {
  const arr: any = []
  ymbolTextArr.forEach((item: any) => {
    let obj = {
      ...item,
      x1: item.x,
      y1: 0
    }
    symbolContent.forEach((res: any) => {
      if (item.x == res.x) {
        obj.x1 = res.x
        obj.y1 = res.y
        arr.push(obj)
      }
    })
  })
  return arr
}

const getTypeData = (type, allData = [], isNumber = true) => {
  return allData
    .map((rowBOSItem, index) => {
      const rowBOS = rowBOSItem.rowBOS
      if (type === '013' || type === '012') {
        // 护理事件单独处理，同一时间段的拼接显示
        const nursing =
          rowBOS.filter((item) => {
            return item.typeCode === type
          }) || []
        return {
          x: index,
          y: nursing.map((item) => {
            return {
              y: item.typeValue
            }
          })
        }
      } else {
        const cur =
          rowBOS.find((item) => {
            return item.typeCode === type
          }) || {}
        const codeList = ['031', '003', '015', '014', '002', '001', '032']
        const codeName = ['疼痛', '体温', '物理降温', '心率', '脉搏', '呼吸', '药物降温']
        return {
          x: index,
          y: (isNumber ? +cur.typeValue : cur.typeValue) || '',
          value: `${
            (codeName[codeList.indexOf(cur.typeCode)] || '') + '：' + cur.typeValue || ''
          }<br/>日期：${cur.date || ''} `
        }
      }
    })
    .filter((item) => {
      return item.y !== '' && item.y.length !== 0
    })
}
// 获取呼吸带R的数据
const getTypeBreathData = (type, allData = []) => {
  return allData
    .map((rowBOSItem: any, index) => {
      const rowBOS = rowBOSItem.rowBOS
      const cur =
        rowBOS.find((item) => {
          return item.typeCode === type
        }) || {}
      return {
        x: index,
        y: cur.typeValue || ''
      }
    })
    .filter((item) => {
      return item.y !== ''
    })
}
// 手术天数获取
const getTypeData2 = (type, allData = [], isNumber = true) => {
  return allData
    .map((item: any, index) => {
      return {
        x: index,
        y: isNumber && item.typeCode === type ? item.typeValue : ''
      }
    })
    .filter((item) => {
      return item.y !== ''
    })
}
// const getBottomData = (name: string) => {
//   let objNew = props.options
//     ? props.options.find((item) => item.name.replace(/\s*/g, '') === name)
//     : {}
//   if (objNew) {
//     if (objNew.name.replace(/\s*/g, '') == name) {
//       return objNew.key
//     } else {
//       return ''
//     }
//   } else {
//     return ''
//   }
// }
watch(
  () => props.value,
  () => {
    comKey.value++
    setTimeout(() => {
      initFunc()
    })
  },
  { immediate: true }
)
// SectionToChinese,
</script>

<style lang="scss" scoped>
.table_wrap {
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
  border: 2px #2f4f4f solid;
}
td {
  border: 1px solid #ccc;
  width: 12px;
  height: 11px;
}

.redLineTd {
  border-right: 1px solid #ff6e71;
}

.recorde-text {
  width: 13px;
  height: 0;
  color: #ff0000;
  font-size: 11px;
  position: relative;
  top: -4px;
  margin: 0 auto;
}
.recorde-text2 {
  color: #ff0000;
  font-size: 10px;
  position: relative;
  bottom: 20px;
  height: 8.5px;
  padding: 0;
}
.table_wrap {
  position: relative;
  margin: 0 auto;
  width: 835px;
  left: 0;
  right: 0;
}

.container {
  // 高度最好动态计算，不然很容易错位
  width: 730px;
  height: 734px;
  position: absolute;
  top: 178px;
  left: 105px;
}

.temperature_mark td p {
  position: relative;
  top: 0;
  margin-top: 57.7px;
}
.num_wrapper {
  width: 48px;
  height: 730px;
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

.tengtong {
  display: flex;
  align-items: center;
  height: 150px;
  border: 1px solid transparent;
}
.tengtongzhi {
  height: 14.5px;
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
.table_wrap {
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  .tick,
  .domain {
    display: none;
  }
  .tbale-label {
    font-weight: 700;
  }
  .table-just {
    // text-align: justify;
    // text-align-last: justify;
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
  .line.tiwenline {
    stroke: blue;
    fill: none;
  }
  .line.maiboline {
    stroke: red;
    fill: none;
  }
  .line.huxiline {
    stroke: #000;
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
    .legend-text {
      display: flex;
    }
    .legend-item {
      margin-right: 20px;
      font-size: 13px;
    }
  }
}
</style>
