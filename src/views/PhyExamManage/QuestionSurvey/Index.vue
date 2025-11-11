<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-box mb-6px" style="background-color: #fff">
        <div class="search1">
          <div class="div1">
            <span class="span1">体检号：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="ExaminePatListInfo.peId"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
            <span class="span1">姓名：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="ExaminePatListInfo.name"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
            <span class="span1">次数：</span>
            <el-input
              style="width: 70px"
              v-model="ExaminePatListInfo.peVisitId"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
          </div>
          <div class="div1">
            <span class="span1">单位编码：</span>
            <el-input
              style="width: 100px; margin-right: 12px"
              v-model="ExaminePatListInfo.unitCode"
              placeholder="请输入"
              class="select-item"
              clearable
              @keyup.enter="getPePatList"
            />
          </div>
          <div class="div1">
            <span class="span1">预约时间区间：</span>
            <el-date-picker
              type="date"
              style="display: flex; width: 160px"
              v-model="ExaminePatListInfo.startDate"
              value-format="YYYY-MM-DD"
              @change="getPePatList"
            />
            <span class="ml-6px mr-6px">至</span>
            <el-date-picker
              type="date"
              style="display: flex; width: 160px"
              v-model="ExaminePatListInfo.endDate"
              value-format="YYYY-MM-DD"
              @change="getPePatList"
            />
          </div>
          <div class="div1">
            <el-button @click="getPePatList">查询 </el-button>
          </div>
        </div>
      </div>
      <div class="export">
        <div class="list_table">
          <el-table
            :data="filteredTableData"
            style="width: 100%"
            height="calc(100vh - 195px)"
            border
            ref="multipleTableRef"
            highlight-current-row
          >
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <template #default="{ row }" v-if="item.prop == 'resultStatus'">
                <span v-if="row.resultStatus == '0'">已预约</span>
                <span v-if="row.resultStatus == '1'">已执行</span>
                <span v-if="row.resultStatus == '2'">待审核</span>
                <span v-if="row.resultStatus == '5'">已分科审核</span>
                <span v-if="row.resultStatus == '7'">已初步审核</span>
                <span v-if="row.resultStatus == '9'">已最终审核</span>
                <span v-if="row.resultStatus == 'A'">非正常结束</span>
                <span v-if="row.resultStatus == 'P'">体检挂起</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center" fixed="right">
              <template #default="scope">
                <el-button type="text" @click="addWenJun(scope.row)">问卷调查</el-button>
                <el-button type="text" @click="addPinggu(scope.row)">心理评估</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="survey">
          <div class="survey_con" v-if="showWenJun">
            <div class="survey_title">健康体检问卷调查</div>
            <div class="pat_msg">
              <span>姓名：{{ wenjunRowData.name }}</span>
              <span>性别：{{ wenjunRowData.sex }}</span>
              <span>年龄：{{ wenjunRowData.age }}</span>
              <span>婚姻状况：{{ wenjunRowData.maritalStatus }}</span>
            </div>
            <div class="survey_tcon">
              <div v-for="item in questionList" :key="item.questionNo">
                <div class="survey_name">{{ item.questionNo }}、{{ item.questionDetail }}</div>
                <div class="survey_answer">
                  <el-radio-group v-model="item.questionAnswer">
                    <el-radio size="large" label="1">是</el-radio>
                    <el-radio size="large" label="2">否</el-radio>
                    <el-radio size="large" label="3">一般</el-radio>
                    <el-radio size="large" label="4">其他</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div class="save">
              <el-button class="btn" @click="saveWenJun"> 保存 </el-button>
            </div>
          </div>
          <div class="survey_con" v-if="showPingGu">
            <div class="survey_title">心理健康评估</div>
            <div class="pat_msg">
              <span>姓名：{{ pingGuData.name }}</span>
              <span>性别：{{ pingGuData.sex }}</span>
              <span>年龄：{{ pingGuData.age }}</span>
              <span>婚姻状况：{{ pingGuData.maritalStatus }}</span>
            </div>
            <div class="survey_tcon">
              <div v-for="item in pingGuList" :key="item.questionNo">
                <div class="survey_name">{{ item.questionNo }}、{{ item.questionDetail }}</div>
                <div class="survey_answer">
                  <el-radio-group v-model="item.questionAnswer">
                    <el-radio size="large" label="1">是</el-radio>
                    <el-radio size="large" label="2">否</el-radio>
                    <el-radio size="large" label="3">一般</el-radio>
                    <el-radio size="large" label="4">其他</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="con_detail">
                解读：0-1个“是”或“一般”：心理健康良好，建议保持积极的生活态度；2-3个“是”或“一般”：可能存在轻度压力或情绪困扰，需关注自我调节；3个以上“是”：建议寻求专业的心理支持（如心理医生或医生）<br />本问卷仅做初步自评参考，不能替代专业诊断。若结果异常或持续不适，请及时就医
              </div>
            </div>
            <div class="save">
              <el-button class="btn" @click="savePingGu"> 保存 </el-button>
              <el-button
                style="
                  border: 1px solid #3473d1;
                  background: #fff;
                  color: #3473d1;
                  height: 32px;
                  padding: 5px 12px;
                "
                @click="openAi"
              >
                <img :src="ai" style="margin-right: 5px; width: 16px; height: 16px" />AI心理评估
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-model="AiVisible"
      width="600px"
      max-height="600px"
      :fullscreen="false"
      :close-on-click-modal="false"
      title="AI智能心理评估"
    >
      <div
        style="width: 100%; height: 500px; overflow-y: auto"
        v-loading="loading"
        element-loading-text="思考中..."
      >
        <span
          style="
            height: 500px;
            width: 100%;
            padding: 10px;
            overflow-y: auto;
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            line-height: 1.6;
            color: #3473d1;
            margin-bottom: 16px;
            white-space: pre-wrap;
          "
          >{{ displayedText }}</span
        >
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import {} from '@/api/PerPhyExamination/PerExport/index'
import * as Api from '@/api/PerPhyExamination/geTrage/index'
import { formatDate } from '@/utils/formatTime'
import ai from '@/assets/images/ai.svg'
import {
  getQuestionnaireList,
  updateQuestionnaire
} from '@/api/PerPhyExamination/QuestionSurvey/index'
import { useUserStore } from '@/store/modules/user'
import axios from 'axios'
const userStore = useUserStore()
const dbUser = userStore.getUser.username
const ExaminePatListInfo = ref({
  startDate: formatDate(new Date(), 'YYYY-MM-DD'),
  endDate: formatDate(new Date(), 'YYYY-MM-DD'),
  resultStatus: '9',
  queueStartDate: '',
  queueEndDate: '',
  peId: '',
  peVisitId: '',
  joinUnit: '',
  unitCode: '',
  unitVisitId: '',
  name: ''
})
const personList = ref([
  {
    label: '审核状态',
    prop: 'resultStatus',
    align: 'center',
    width: 110
  },
  {
    label: '体检号',
    prop: 'peId',
    align: 'center',
    width: 120
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center'
  },
  {
    label: '性别',
    prop: 'sex',
    align: 'center',
    width: 80
  },
  {
    label: '次数',
    prop: 'peVisitId',
    align: 'center',
    width: 80
  },
  // {
  //   label: '报到日期',
  //   prop: 'peQueueDate',
  //   align: 'left'
  // },
  {
    label: '体检日期',
    // prop: 'pePreDate',
    prop: 'peQueueDate',
    align: 'center',
    width: 120
  }
])
const wenjunRowData = ref({})
const questionList = ref([])
const newQuestionList = ref([
  {
    questionNo: '1',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您的父母或者兄弟姐妹是否患有明确诊断的疾病？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '2',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否患有明确诊断的疾病或异常？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '3',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过敏？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '4',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否长期服用药物？（连续服用6个月以上，平均每日服用一次以上）',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '5',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否因病进行过手术治疗',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '6',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您觉得身体是否健康？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '7',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否感觉到浑身乏力或周身明显不适？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '8',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过吞咽不适、哽咽感吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '9',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过咳痰带血或咳血吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '10',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过胸痛、胸闷气喘或呼吸困难吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '11',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过头晕、头昏或恶心吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '12',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过食欲不振、消化不良或腹胀吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '13',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否出现过尿频、尿急、尿痛及尿血吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '14',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您的身体是否出现过明显的疼痛吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  },
  {
    questionNo: '15',
    peId: wenjunRowData.value.peId,
    peVisitId: wenjunRowData.value.peVisitId,
    questionDetail: '您是否能够按时吃三餐吗？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '健康问卷',
    unitCode: wenjunRowData.value.unitCode,
    unitVisitId: wenjunRowData.value.unitVisitId
  }
])
const pingGuData = ref({})
const pingGuList = ref([])
const newPingGuList = ref([
  {
    questionNo: '1',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否会感到紧张、焦虑或心烦意燥？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '2',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否无法停止或控制担忧？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '3',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否对各种各样的事情过度担忧？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '4',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否难以放松？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '5',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否由于不安而坐立难安？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '6',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否变得容易烦恼或易怒？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '7',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否感到害怕，好像会发生什么可怕的事情？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '8',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否做事提不起劲或没有兴趣？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '9',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否感到心情低落、沮丧或绝望？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '10',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否入睡困难、睡不安稳或睡眠过多？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '11',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否感到疲倦或没有活力？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '12',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否食欲不振或吃太多？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '13',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否对自己感到失望，或者觉得自己让家人失望？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '14',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否难以集中注意力做事，例如阅读或看电视？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '15',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否行动或说话速度变得缓慢（或相反，烦躁不安、来回踱步）？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '16',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail: '您是否有想到自己最好去死或者以某种方式伤害自己的念头？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  },
  {
    questionNo: '17',
    peId: pingGuData.value.peId,
    peVisitId: pingGuData.value.peVisitId,
    questionDetail:
      '如果以上任何问题您选择了”是“或更高频率，请回答：这些困难对您的工作、家庭事务或人际交往是否有影响？',
    questionAnswer: '',
    doctor: dbUser,
    questionType: '心理问卷',
    unitCode: pingGuData.value.unitCode,
    unitVisitId: pingGuData.value.unitVisitId
  }
])
const filteredTableData = ref<any>([])
// 个人体检-主检医生审核-提取人员
const getPePatList = async () => {
  const params = { ...ExaminePatListInfo.value }
  await Api.getPePatList(params).then((res) => {
    filteredTableData.value = res
  })
}

const showWenJun = ref(false)
//健康问卷按钮
const addWenJun = async (row) => {
  wenjunRowData.value = row
  showWenJun.value = true
  showPingGu.value = false
  let params = {
    peId: row.peId,
    peVisitId: row.peVisitId,
    questionType: '健康问卷'
  }
  await getQuestionnaireList(params).then((res) => {
    if (res && res.length > 0) {
      questionList.value = res
    } else {
      questionList.value = JSON.parse(JSON.stringify(newQuestionList.value))
      questionList.value.forEach((item) => {
        item.peId = row.peId
        item.peVisitId = row.peVisitId
        item.unitCode = row.unitCode
        item.unitVisitId = row.unitVisitId
      })
    }
  })
  console.log(questionList.value, wenjunRowData.value)
}

const showPingGu = ref(false)
//心理评估按钮
const addPinggu = async (row) => {
  pingGuData.value = row
  showWenJun.value = false
  showPingGu.value = true
  let params = {
    peId: row.peId,
    peVisitId: row.peVisitId,
    questionType: '心理问卷'
  }
  await getQuestionnaireList(params).then((res) => {
    if (res && res.length > 0) {
      pingGuList.value = res
    } else {
      pingGuList.value = JSON.parse(JSON.stringify(newPingGuList.value))
      pingGuList.value.forEach((item) => {
        item.peId = row.peId
        item.peVisitId = row.peVisitId
        item.unitCode = row.unitCode
        item.unitVisitId = row.unitVisitId
      })
    }
  })
}
//保存
const saveWenJun = () => {
  if (questionList.value.length > 0) {
    updateQuestionnaire(questionList.value).then((res) => {
      ElMessage.success('保存成功')
    })
  }
}
//保存
const savePingGu = () => {
  if (pingGuList.value.length > 0) {
    updateQuestionnaire(pingGuList.value).then((res) => {
      ElMessage.success('保存成功')
    })
  }
}
const AiVisible = ref(false)
const openAi = async () => {
  if (pingGuList.value.length > 0) {
    if (pingGuList.value.some((item) => item.questionAnswer != '')) {
      AiVisible.value = true
      await sendMsg()
    } else {
      ElMessage.error('请先填写问卷内容')
    }
  } else {
    ElMessage.error('请先填写问卷内容')
  }
}
const loading = ref(false)
const aiSearch = ref('')
const showStop = ref(false)

const chatId = ref()
// 定义 API 地址
// 定义认证令牌
const apiUrl = 'http://10.10.10.20:8080/chat/api/open'
const authToken = 'application-18eaeeaace5fa66b41cb8b7d44b0ca76'
const sendMsg = async () => {
  let data = []
  if (pingGuList.value.length > 0) {
    pingGuList.value.forEach((item) => {
      if (item.questionAnswer != '') {
        data.push(
          `心理问题：${item.questionNo}` +
            item.questionDetail +
            '患者回答：' +
            (item.questionAnswer == '1'
              ? '是'
              : item.questionAnswer == '2'
              ? '否'
              : item.questionAnswer == '3'
              ? '一般'
              : item.questionAnswer == '4'
              ? '其他'
              : '')
        )
      }
    })
  }

  let answer = `${data.join(
    '；'
  )}。请根据以上问题内容和患者的回答对患者进行心理评估，并给出相应的建议。`
  console.log(answer)

  if (data && data.length > 0) {
    loading.value = true
    try {
      let result = await axios.get(apiUrl, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer application-18eaeeaace5fa66b41cb8b7d44b0ca76`
        }
      })
      if (result && result.data.code == 200) {
        chatId.value = result.data.data
      }
      await fetchAiStream(answer)
    } catch (err) {
      loading.value = false
    }
  }
}

// 定义请求数据
const requestData = {
  message: '',
  stream: true,
  re_chat: true,
  chat_record_id: chatId.value
}
let controller
let reader

// 封装请求配置
const requestOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  },
  body: JSON.stringify(requestData)
}

// 停止当前请求的函数
const stopRequest = () => {
  if (controller) {
    controller.abort()
    loading.value = false
    showStop.value = false
  }
}

const outputRef = ref<HTMLDivElement | null>(null)
const displayedText = ref('')
const pendingChars = ref<string[]>([])
const isStreaming = ref(false)
let animationFrameId: number | null = null

// 真实 API 集成（Fetch 流式）
async function fetchAiStream(value) {
  controller = new AbortController()
  const signal = controller.signal
  requestData.message = value
  requestData.chat_record_id = chatId.value
  // 更新请求体
  requestOptions.body = JSON.stringify(requestData)
  const response = await fetch(`http://10.10.10.20:8080/chat/api/chat_message/${chatId.value}`, {
    ...requestOptions,
    signal
  })
  if (!response.ok) throw new Error('API 请求失败')
  const reader = response.body?.getReader()
  if (!reader) throw new Error('无法读取响应流')
  displayedText.value = ''
  readStream(reader)
}
async function readStream(reader) {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  const { done, value } = await reader.read()

  if (done) {
    flushPendingChars()
    return
  }

  const textChunk = decoder.decode(value)
  // 按行分割接收到的数据
  const lines = textChunk.split('\n')
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        const dataStr = line.replace('data: ', '')
        const dataObject = JSON.parse(dataStr)
        const answer = dataObject.content
        if (answer) {
          loading.value = false
          showStop.value = true
          aiSearch.value = ''
          processContent(answer)
        }
      } catch (parseError) {
        console.error('解析数据时出错:', parseError)
        loading.value = false
        showStop.value = false
      }
    } else if (line.startsWith('event: ping')) {
      // 跳过 ping 事件
      continue
    }
  }
  readStream(reader)
}
const parseUnicode = (str: string) =>
  str.replace(/\\u([d\w]{4})/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))

// 处理content内容
function processContent(content: string) {
  const parsedText = parseUnicode(content)
  // 模拟分块（实际API可能已分块）
  for (const char of parsedText) {
    pendingChars.value.push(char)
  }
  startTypingEffect()
}

// 启动打字机效果
function startTypingEffect() {
  if (isStreaming.value || pendingChars.value.length === 0) return

  isStreaming.value = true
  typeNextChar()
}

// 逐字渲染
function typeNextChar() {
  if (pendingChars.value.length === 0) {
    isStreaming.value = false
    return
  }

  const char = pendingChars.value.shift()!
  displayedText.value += char

  // 滚动到底部
  if (outputRef.value) {
    outputRef.value.scrollTop = outputRef.value.scrollHeight
  }
  animationFrameId = window.requestAnimationFrame(typeNextChar)
}

// 清空待渲染字符
function flushPendingChars() {
  if (pendingChars.value.length > 0) {
    displayedText.value += pendingChars.value.join('')
    pendingChars.value = []
  }
}

// 在组件销毁时清理
onUnmounted(() => {
  if (controller) {
    controller.abort()
  }
  if (reader) {
    reader.releaseLock()
  }
})
onMounted(() => {
  getPePatList()
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
  .base-box {
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
        .deltrage {
          color: #ed2226;
          border-color: #ed2226;
          background-color: #fff;
        }
      }
    }
  }
  .export {
    display: flex;
    justify-content: space-between;
    .list_table {
      width: 49.8%;
      background: #fff;
      padding: 10px;
      height: 100%;
    }
    .survey {
      width: 49.8%;
      padding: 10px;
      background: #fff;
      .survey_con {
        .pat_msg {
          width: 100%;
          display: flex;
          height: 36px;
          align-items: center;
          font-size: 16px;
          span {
            margin-left: 40px;
            color: #3473d1;
          }
        }
        .survey_title {
          width: 100%;
          font-size: 30px;
          line-height: 50px;
          text-align: center;
          font-weight: bold;
        }
        .survey_tcon {
          width: 100%;
          padding-left: 40px;
          font-size: 16px;
          height: calc(100vh - 320px);
          overflow-y: auto;
          .survey_name {
            font-weight: bold;
            line-height: 30px;
          }
          .survey_answer {
            margin-left: 20px;
          }
          .con_detail {
            font-size: 12px;
            color: #ed2226;
          }
        }
        .save {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          .btn {
            background: #3473d1;
            color: #fff;
            border-color: #3473d1;
          }
        }
      }
    }
  }
}
</style>
