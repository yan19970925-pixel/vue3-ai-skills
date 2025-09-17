<template>
  <div class="report">
    <div class="report_con page">
      <div class="title">
        <div class="title_div">
          <span>体 检 年 份 ：</span>
          <span>{{ jsonData.user.year }}</span>
        </div>
        <div class="title_div">
          <span>医 疗 账 号 ：</span>
          <span>{{ jsonData.user.medical_no }}</span>
        </div>
        <div class="title_div">
          <span>门 诊 号 ：</span>
          <span>{{ jsonData.user.outpatient_card_code }}</span>
        </div>
        <div class="position">
          <div>注意保密</div>
          <div>列入移交</div>
        </div>
      </div>
      <div class="center">
        <div>
          军&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;队&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;健&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;康&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告
        </div>
        <div>
          JUN&nbsp;DUI&nbsp;REN&nbsp;YUAN&nbsp;JIAN&nbsp;KANG&nbsp;TI&nbsp;JIAN&nbsp;BAO&nbsp;GAO
        </div>
      </div>
      <div class="info">
        <div class="info_flex">
          <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
          <div class="d_border">{{ jsonData.user.real_name }}</div>
        </div>
        <div class="info_flex">
          <div>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>
          <div class="d_border">{{ jsonData.user.com_name }}</div>
        </div>
        <div class="info_flex">
          <div>军&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;衔：</div>
          <div class="d_border">{{ jsonData.user.grade_of_duty }}</div>
        </div>
        <div class="info_flex">
          <div>体检日期：</div>
          <div class="d_border">{{ jsonData.user.begin_medical_date }}</div>
        </div>
        <div class="info_flex">
          <div>打印日期：</div>
          <div class="d_border">{{ jsonData.user.print_date }}</div>
        </div>
        <div class="bottom">{{ jsonData.user.branch_hospital_name }}</div>
      </div>
    </div>
    <div class="report_jiben hei_1200 page">
      <div class="biaoti">
        <div class="mr_20">{{ jsonData.userJ.branch_hospital_name }}</div>
        <div class="mr_10">体检编号：{{ jsonData.userJ.medical_no }}</div>
        <div class="mr_10">姓名：{{ jsonData.userJ.real_name }}</div>
        <div class="mr_10">性别：{{ jsonData.userJ.sexa }}</div>
        <div class="mr_10">年龄：{{ jsonData.userJ.age }}岁</div>
      </div>
      <div class="qingkuang">基本情况</div>
      <div class="table">
        <table>
          <tr>
            <td class="td_14 td_b bor_t">医疗账号</td>
            <td class="td_28 bor_t" colspan="2">
              {{ jsonData.userJ.archive_no }}
            </td>
            <td class="td_14 td_b bor_t">身份证号</td>
            <td class="td_42 bor_t" colspan="3">
              {{ jsonData.userJ.id_card }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b"> 姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 </td>
            <td class="td_28" colspan="2">{{ jsonData.userJ.real_name }}</td>
            <td class="td_14 td_b"> 性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别 </td>
            <td class="td_42" colspan="3">{{ jsonData.userJ.sexa }}</td>
          </tr>
          <tr>
            <td class="td_14 td_b"> 籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯 </td>
            <td class="td_28" colspan="2">
              {{ jsonData.userJ.birth_place }}
            </td>
            <td class="td_14 td_b"> 民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族 </td>
            <td class="td_42" colspan="3">{{ jsonData.userJ.nation }}</td>
          </tr>
          <tr>
            <td class="td_14 td_b">出生日期</td>
            <td class="td_14">{{ jsonData.userJ.birthday }}</td>
            <td class="td_14">入伍时间</td>
            <td class="td_28" colspan="2">
              {{ jsonData.userJ.start_date_of_work }}
            </td>
            <td class="td_14 td_b"> 血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型 </td>
            <td class="td_14">{{ jsonData.userJ.blood_type_id }}</td>
          </tr>
          <tr>
            <td class="td_14 td_b">出生地</td>
            <td class="td_14">{{ jsonData.userJ.home_town }}</td>
            <td class="td_28 td_b" colspan="2">隶属大单位</td>
            <td class="td_42" colspan="3">
              {{ jsonData.userJ.top_unit_id }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">婚姻状况</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.marital_status_id }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">人员类别</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.people_type }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">军衔</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.military_rank_id }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">所在地区</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.location_id }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">所属单位</td>
            <td class="td_84" colspan="6">{{ jsonData.userJ.com_no }}</td>
          </tr>
          <tr>
            <td class="td_14 td_b">承检单位</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.branch_hospital_name }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">体检方式</td>
            <td class="td_84" colspan="6">
              {{ jsonData.userJ.exam_method_id }}
            </td>
          </tr>
          <tr>
            <td class="td_14 td_b">联系电话</td>
            <td class="td_84" colspan="6">{{ jsonData.userJ.tel }}</td>
          </tr>
        </table>
      </div>
      <div class="pagination">第{{ 1 }}页/共{{ arrGroupAll.length + 3 }}页</div>
    </div>
    <div class="report_jiben hei_1200 page">
      <div class="biaoti">
        <div class="mr_20">{{ jsonData.userJ.branch_hospital_name }}</div>
        <div class="mr_10">体检编号：{{ jsonData.userJ.medical_no }}</div>
        <div class="mr_10">姓名：{{ jsonData.userJ.real_name }}</div>
        <div class="mr_10">性别：{{ jsonData.userJ.sexa }}</div>
        <div class="mr_10">年龄：{{ jsonData.userJ.age }}岁</div>
      </div>
      <div class="qingkuang">军队人员健康体检心理检测结果</div>
      <div class="table">
        <table style="margin-bottom: 10px">
          <tr>
            <td class="td_48 td_b bor_t" colspan="4">检查医生：张三</td>
            <td class="td_48 td_b bor_t" colspan="4">检查日期：2024-05-15</td>
          </tr>
          <tr>
            <td class="td_12 td_b">序号</td>
            <td class="td_12 td_b">检测项目</td>
            <td class="td_12 td_b">检测结果</td>
            <td class="td_12 td_b">参考值</td>
            <td class="td_24 td_b" colspan="2">检测项目</td>
            <td class="td_12 td_b">人格检测结果</td>
            <td class="td_12 td_b">参考值</td>
          </tr>
          <tr>
            <td class="td_12 td_b">1</td>
            <td class="td_12 td_b">焦虑状态 （Anx-s）</td>
            <td class="td_12 td_b">{{ Anxs }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_24 td_b" colspan="2">焦虑性人格（Anx）</td>
            <td class="td_12 td_b">{{ Anx }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">2</td>
            <td class="td_12 td_b">自杀意念（Sui-s）</td>
            <td class="td_12 td_b">{{ Suis }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_24 td_b" colspan="2">自杀倾向性人格（Sui）</td>
            <td class="td_12 td_b">{{ Sui }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">3</td>
            <td class="td_12 td_b">强迫状态（Obs-s）</td>
            <td class="td_12 td_b">{{ Obss }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_24 td_b" colspan="2">强迫症性人格（Obs）</td>
            <td class="td_12 td_b">{{ Obs }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">4</td>
            <td class="td_12 td_b">抑郁状态（Dep-s）</td>
            <td class="td_12 td_b">{{ Deps }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_12 td_b" colspan="2">抑郁性人格（Dep）</td>
            <td class="td_12 td_b">{{ Dep }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">5</td>
            <td class="td_12 td_b">精神病状态（Psy-s）</td>
            <td class="td_12 td_b">{{ Psys }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_12 td_b" rowspan="3">分裂性人格（Psy）</td>
            <td class="td_12 td_b">神经质（Net）</td>
            <td class="td_12 td_b">{{ Net }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">6</td>
            <td class="td_12 td_b">反社会性（Ant-s）</td>
            <td class="td_12 td_b">{{ Ants }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_12 td_b">敏感质（Set）</td>
            <td class="td_12 td_b">{{ Sets }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">7</td>
            <td class="td_12 td_b">躯体化（Som-s）</td>
            <td class="td_12 td_b">{{ Soms }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_12 td_b">分离质（Dit）</td>
            <td class="td_12 td_b">{{ Dit }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b">8</td>
            <td class="td_12 td_b">睡眠状况（Sle-s）</td>
            <td class="td_12 td_b">{{ Sles }}</td>
            <td class="td_12 td_b">＜0.8</td>
            <td class="td_12 td_b" rowspan="3">反社会性人格（ Ant）</td>
            <td class="td_12 td_b">偏离质（Dev）</td>
            <td class="td_12 td_b">{{ Dev }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b">悖逆质（Ant）</td>
            <td class="td_12 td_b">{{ Ant }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
          <tr>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b"></td>
            <td class="td_12 td_b">冲动质（Imp）</td>
            <td class="td_12 td_b">{{ Imp }}</td>
            <td class="td_12 td_b">＜75.0</td>
          </tr>
        </table>
      </div>
      <div>
        <div>结论：{{ Jjjg }}</div>
      </div>
      <div class="pagination">第{{ 2 }}页/共{{ arrGroupAll.length + 3 }}页</div>
    </div>
    <div class="report_jiben hei_1200 page">
      <div class="biaoti">
        <div class="mr_20">中国人民解放军63710部队医院</div>
        <div class="mr_10">体检编号：24001511</div>
        <div class="mr_10">姓名：赵旭</div>
        <div class="mr_10">性别：男</div>
        <div class="mr_10">年龄：30岁</div>
      </div>
      <div class="back_c">主检健康评估</div>
      <div class="back_t">阳性发现与防治意见</div>
      <div class="back_for">
        <div class="back_t1">{{ jsonData.userJ.summary_suggest }}</div>
        <!-- <div class="back_t1_c">建议控制饮食，加强运动，减轻体重。</div> -->
      </div>
      <div class="jianyi">疾病诊断及建议:</div>
      <div class="jianyi_c">{{ jsonData.userJ.config_value }}</div>
      <!-- <div class="ganxie"></div> -->
      <!-- <div class="ganxie_c">
          我们需要提示您注意的是：本次体检反映的是您当前的健康状况。因人体存在个体生物差异及您选择的检查项目并未涵盖全身所有脏器。因此医生所做的医学诊断和健康状况建议，是依据您的陈述和本次检查的结果综合分析评估而产生的。我们建议您对异常的结果进行相关的进一步检查或跟踪复查。
        </div> -->
      <div class="doc_con">
        <div class="con1">主检医生：{{ jsonData.userJ.summary_man }}</div>
        <div class="con1">主审医生：{{ jsonData.userJ.approve_man }}</div>
      </div>
      <div class="doc_con">
        <div class="con1">主检日期：{{ jsonData.userJ.summary_date }}</div>
        <div class="con1">主审日期：{{ jsonData.userJ.approve_date }}</div>
      </div>
      <div class="pagination">第{{ 3 }}页/共{{ arrGroupAll.length + 3 }}页</div>
    </div>
    <div class="report_jiben page" v-for="(itemValue, p) in arrGroupAll" :key="p">
      <div class="biaoti">
        <div class="mr_20">中国人民解放军63710部队医院</div>
        <div class="mr_10">体检编号：24001511</div>
        <div class="mr_10">姓名：赵旭</div>
        <div class="mr_10">性别：男</div>
        <div class="mr_10">年龄：30岁</div>
      </div>
      <div class="jieguo_t" v-if="p === 0">科室检验结果</div>
      <div>
        <div class="jieguo" v-for="(item, i) in itemValue" :key="i">
          <div class="xiaojie" v-if="item[0][0].isSummary && !item[0][0].item_name">小结</div>
          <div
            class="xiaojie_con"
            v-if="item[0][0]?.isSummaryText && item[0][0].initial_diagnose && !item[0][0].item_name"
            ><div v-for="(item, ind) in item[0][0].initial_diagnose" :key="ind"> {{ item }}</div>
          </div>
          <div class="jieguo_keshi" v-if="item[0][0].isDeptHead">{{ item[0][0].dept_name }}</div>
          <div v-for="(itemarr, ir) in item" :key="ir">
            <div class="jieguo_name" v-if="itemarr[0].isTermHead">
              <div class="name1">■{{ itemarr[0].group_name }}</div>
              <div class="name2">检查医生：{{ itemarr[0].check_man }}</div>
              <div class="name3">检查日期：{{ itemarr[0].check_date }}</div>
            </div>
            <div class="con_table">
              <table class="table">
                <tr v-if="itemarr[0].isTermHead" class="table-header">
                  <td class="td1">项目名称</td>
                  <td class="td2">检查结果</td>
                  <td class="td3">提示</td>
                  <td class="td4">参考范围</td>
                  <td class="td5">单位</td>
                </tr>
                <tr v-for="(iteminer, ine) in itemarr" :key="ine">
                  <td class="td1" v-if="iteminer.item_name">{{ iteminer.item_name }}</td>
                  <td class="td2" v-if="iteminer.item_name">{{ iteminer.medical_value }}</td>
                  <td class="td3" v-if="iteminer.item_name">{{ iteminer.tips_content }}</td>
                  <td class="td4" v-if="iteminer.item_name">{{ iteminer.reference_range }}</td>
                  <td class="td5" v-if="iteminer.item_name">{{ iteminer.item_unit_name }}</td>
                </tr>
              </table>
              <div class="xiaojie" v-if="itemarr[itemarr.length - 1].isSummary">小结</div>
              <div
                class="xiaojie_con"
                v-if="
                  itemarr[itemarr.length - 1]?.isSummaryText &&
                  itemarr[itemarr.length - 1].initial_diagnose
                "
                ><div
                  v-for="(item, ind) in itemarr[itemarr.length - 1].initial_diagnose"
                  :key="ind"
                >
                  {{ item }}</div
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">第{{ p + 4 }}页/共{{ arrGroupAll.length + 3 }}页</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { jsonData } from './examination'
import { splitStringByWidth } from '@/utils/splitString'
const Anxs = ref<any>()
const Anx = ref<any>()
const Suis = ref<any>()
const Sui = ref<any>()
const Obss = ref<any>()
const Obs = ref<any>()
const Deps = ref<any>()
const Dep = ref<any>()
const Psys = ref<any>()
const Net = ref<any>()
const Sets = ref<any>()
const Dit = ref<any>()
const Ants = ref<any>()
const Dev = ref<any>()
const Ant = ref<any>()
const Soms = ref<any>()
const Sles = ref<any>()
const Imp = ref<any>()
const Jjjg = ref<any>()
const newDeptResultA = ref<any>([])
const arrGroupAll = ref<any>([])

// const jsonData = ref<any>(jsonData)
onMounted(() => {
  let arr = []
  if (jsonData.DeptResultC && jsonData.DeptResultC.length > 0) {
    jsonData.DeptResultC.forEach((item) => {
      if (item.item_nameaa.includes('焦虑状态')) {
        Anxs.value = item.medical_value
      } else if (item.item_nameaa.includes('焦虑性人格')) {
        Anx.value = item.medical_value
      } else if (item.item_nameaa.includes('自杀意念')) {
        Suis.value = item.medical_value
      } else if (item.item_nameaa.includes('自杀倾向性人格')) {
        Sui.value = item.medical_value
      } else if (item.item_nameaa.includes('强迫状态')) {
        Obss.value = item.medical_value
      } else if (item.item_nameaa.includes('强迫症性人格')) {
        Obs.value = item.medical_value
      } else if (item.item_nameaa.includes('抑郁状态')) {
        Deps.value = item.medical_value
      } else if (item.item_nameaa.includes('抑郁性人格')) {
        Dep.value = item.medical_value
      } else if (item.item_nameaa.includes('精神病状态')) {
        Psys.value = item.medical_value
      } else if (item.item_nameaa.includes('神经质')) {
        Net.value = item.medical_value
      } else if (item.item_nameaa.includes('敏感质')) {
        Sets.value = item.medical_value
      } else if (item.item_nameaa.includes('分离质')) {
        Dit.value = item.medical_value
      } else if (item.item_nameaa.includes('反社会性')) {
        Ants.value = item.medical_value
      } else if (item.item_nameaa.includes('偏离质')) {
        Dev.value = item.medical_value
      } else if (item.item_nameaa.includes('冲动质')) {
        Imp.value = item.medical_value
      } else if (item.item_nameaa.includes('悖逆质')) {
        Ant.value = item.medical_value
      } else if (item.item_nameaa.includes('躯体化')) {
        Soms.value = item.medical_value
      } else if (item.item_nameaa.includes('睡眠状况')) {
        Sles.value = item.medical_value
      } else if (item.item_nameaa.includes('机检结果')) {
        Jjjg.value = item.medical_value
      }
    })
    // DeptResultC.value = arr
  }
  if (jsonData.DeptResultA && jsonData.DeptResultA.length > 0) {
    let result = splitArrayById(jsonData.DeptResultA, 'dept_name')
    let newResult: any = []
    result.forEach((item) => {
      newResult.push(splitArrayById(item, 'group_name'))
    })
    newResult.forEach((it, index) => {
      it.forEach((item, k) => {
        item[0].isTermHead = true // 项目表头
        item[item.length - 1].isSummary = true
        item.forEach((g) => {
          if (typeof g.initial_diagnose === 'string') {
            // 如果是字符串，进行分割处理
            g.initial_diagnose = g.initial_diagnose.split('\r\n').filter((item) => item !== '')
          } else if (!g.initial_diagnose) {
            // 如果是null或undefined，设置为空数组
            g.initial_diagnose = []
          }
        })
        if (k === 0 && item && item.length) {
          // 每个科室组第一个标记未科室头和项目表头
          item[0].isDeptHead = true
        }
      })
    })
    newDeptResultA.value = newResult
    arrGroupAll.value = []
    let pagingGroup: any = []
    let heigtLong = 1150
    let newHeight = 0 //当前页高度
    let excessSummary: any = [] //当页多出的小结内容赋值到下一页的头
    let termGroup: any = []
    newDeptResultA.value.forEach((it, index) => {
      let deptGroup: any = []
      it.forEach((item, m) => {
        item.forEach((k, h) => {
          if (index === 0 && m === 0 && h === 0) {
            newHeight += 33
          }
          // 科室表头添加科室行高
          if (k.isDeptHead) {
            if (newHeight + 33 > heigtLong) {
              if (termGroup && termGroup.length > 0) {
                deptGroup.push(termGroup)
                termGroup = []
              }
              if (deptGroup && deptGroup.length > 0) {
                pagingGroup.push(deptGroup)
                deptGroup = []
              }
              arrGroupAll.value.push(pagingGroup)
              pagingGroup = []
              newHeight = 0
              newHeight += 33
            } else {
              newHeight += 33
            }
          }
          // 项目表头加30
          if (k.isTermHead) {
            if (newHeight + 30 + 30 > heigtLong) {
              // 科室 留在本页，但是项目＋表头超出了，那么本页记录个方便显示科室（不是第一个科室加了没意义）
              if (k.isDeptHead) {
                termGroup.push({
                  isDeptHead: true,
                  dept_name: k.dept_name,
                  group_name: k.group_name,
                  check_man: k.check_man,
                  check_date: k.check_date
                }) //这里项目头和表格头长度够吗但是第一项没过去放在下一页了，那么本页记录个
                k.isDeptHead = false
              }
              if (termGroup && termGroup.length > 0) {
                deptGroup.push(termGroup)
                termGroup = []
              }
              if (deptGroup && deptGroup.length > 0) {
                pagingGroup.push(deptGroup)
                deptGroup = []
              }
              arrGroupAll.value.push(pagingGroup)
              pagingGroup = []
              newHeight = 0
              newHeight += 60
            } else {
              newHeight += 60
            }
          }
          let projectWidth = splitStringByWidth(k.item_name, 180)
          if (projectWidth && projectWidth.length > 1) {
            if (newHeight + 60 > heigtLong) {
              // 科室＋项目 留在本页，但是内容超出了，那么本页记录个方便显示科室＋项目（不是第一个项目加了没意义）
              if (k.isTermHead) {
                termGroup.push({
                  isDeptHead: true,
                  isTermHead: true,
                  dept_name: k.dept_name,
                  group_name: k.group_name,
                  check_man: k.check_man,
                  check_date: k.check_date
                }) //这里项目头和表格头长度够吗但是第一项没过去放在下一页了，那么本页记录个
                k.isTermHead = false
                k.isDeptHead = false
              }
              if (termGroup && termGroup.length > 0) {
                deptGroup.push(termGroup)
                termGroup = []
              }
              if (deptGroup && deptGroup.length > 0) {
                pagingGroup.push(deptGroup)
                deptGroup = []
              }
              arrGroupAll.value.push(pagingGroup)
              pagingGroup = []
              newHeight = 0
              termGroup.push(k)
              newHeight += 60
            } else {
              newHeight += 60 // 每行高度为30px
              termGroup.push(k)
            }
          } else {
            if (newHeight + 30 > heigtLong) {
              // 科室＋项目 留在本页，但是内容超出了，那么本页记录个方便显示科室＋项目（不是第一个项目加了没意义）
              if (k.isTermHead) {
                termGroup.push({
                  isDeptHead: true,
                  isTermHead: true,
                  dept_name: k.dept_name,
                  group_name: k.group_name,
                  check_man: k.check_man,
                  check_date: k.check_date
                }) //这里项目头和表格头长度够吗但是第一项没过去放在下一页了，那么本页记录个
                k.isTermHead = false
                k.isDeptHead = false
              }
              if (termGroup && termGroup.length > 0) {
                deptGroup.push(termGroup)
                termGroup = []
              }
              if (deptGroup && deptGroup.length > 0) {
                pagingGroup.push(deptGroup)
                deptGroup = []
              }
              arrGroupAll.value.push(pagingGroup)
              pagingGroup = []
              newHeight = 0
              termGroup.push(k)
              newHeight += 30
            } else {
              newHeight += 30 // 每行高度为32px
              termGroup.push(k)
            }
          }
          if (excessSummary.length > 0) {
            termGroup[termGroup.length - 1].isSummaryText = true
            termGroup[termGroup.length - 1].initial_diagnose = excessSummary //多余的小结内容赋值到下一页的头
            excessSummary = []
          }
          // 小结表头加30
          if (k.isSummary) {
            if (newHeight + 30 > heigtLong) {
              if (termGroup && termGroup.length > 0) {
                termGroup[termGroup.length - 1].isSummary = false //用于控制当前页是否显示小结 标题
                deptGroup.push(termGroup)
                termGroup = []
              }
              if (deptGroup && deptGroup.length > 0) {
                pagingGroup.push(deptGroup)
                deptGroup = []
              }
              arrGroupAll.value.push(pagingGroup)
              pagingGroup = []
              newHeight = 0
              newHeight += 30
            } else {
              newHeight += 30
              termGroup[termGroup.length - 1].isSummary = true //用于控制当前页是否显示小结 标题
            }
            if (k.initial_diagnose && k.initial_diagnose.length > 0) {
              for (let j = 0; j < k.initial_diagnose.length; j++) {
                if (newHeight + 30 > heigtLong) {
                  if (termGroup && termGroup.length > 0) {
                    if (j === 0) {
                      termGroup[termGroup.length - 1].isSummaryText = false
                    } else {
                      termGroup[termGroup.length - 1].isSummaryText = true
                      termGroup[termGroup.length - 1].initial_diagnose = k.initial_diagnose.slice(
                        0,
                        j + 1
                      ) //添加上空数组，防止当前页显示小结内容
                    }
                    excessSummary = k.initial_diagnose.slice(j, k.initial_diagnose.length + 1) //多余的小结内容赋值到下一页的头
                    deptGroup.push(termGroup)
                    termGroup = []
                  }
                  if (deptGroup && deptGroup.length > 0) {
                    pagingGroup.push(deptGroup)
                    deptGroup = []
                  }
                  arrGroupAll.value.push(pagingGroup)
                  pagingGroup = []
                  newHeight = 0
                  newHeight += 30 * excessSummary.length // 每行高度为30px //放到下一页的小结内容
                  break
                } else {
                  newHeight += 30
                  if (termGroup.length) {
                    termGroup[termGroup.length - 1].isSummaryText = true
                  } else {
                    excessSummary = k.initial_diagnose.slice(j, k.initial_diagnose.length + 1) //多余的小结内容赋值到下一页的头
                  }
                }
              }
            }
          }
        })
        if (termGroup && termGroup.length) {
          deptGroup.push(termGroup)
          termGroup = []
        }
      })
      if (deptGroup && deptGroup.length) {
        pagingGroup.push(deptGroup)
        deptGroup = []
      }
      if (index === newDeptResultA.value.length - 1) {
        if (pagingGroup && pagingGroup.length) {
          arrGroupAll.value.push(pagingGroup)
        }
      }
    })
    // console.warn(arrGroupAll.value, '9999')
    // console.warn(newDeptResultA.value)
  }
})
const splitArrayById = (arr, idKey) => {
  let result = arr.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item[0][idKey] === cur[idKey])
    if (index === -1) {
      acc.push([cur])
    } else {
      acc[index].push(cur)
    }
    return acc
  }, [])
  return result
}
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
    // border: 1px solid red;
    // border-bottom: 1px solid #000dd;
    // margin-bottom: 10px;
    .title {
      margin-bottom: 200px;
      position: relative;
      .title_div {
        margin-bottom: 10px;
      }
      .position {
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
        width: 250px;
        padding-left: 50px;
        border-bottom: 1px solid #000;
        box-sizing: border-box;
      }
      .bottom {
        text-align: center;
        margin-top: 50px;
        font-size: 24px;
        font-weight: bold;
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
    // border: 1px solid red;
    position: relative;
    .pagination {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      text-align: center;
    }
    .biaoti {
      width: 100%;
      display: flex;
      border-bottom: #000 2px solid;
      box-sizing: border-box;
      margin-bottom: 10px;
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
      height: 100px;
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
        border-top: #000 1px solid;
        border-bottom: #000 1px solid;
        box-sizing: border-box;
        font-weight: bold;
        background-color: #9fc3e8;
      }
      .jieguo_name {
        display: flex;
        font-size: 20px;
        height: 30px;
        border-bottom: #000 1px solid;
        box-sizing: border-box;
        background-color: #9fc3e8;
        font-weight: bold;
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
          // tr:first-child {
          //   td {
          //     font-weight: bold;
          //   }
          // }
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
    height: 1295px;
    width: 900px;
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    // border-bottom: 1px solid #000;
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
