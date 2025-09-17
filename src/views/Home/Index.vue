<template>
  <div class="home-container">
    <div
      class="flex items-center justify-between bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)]"
      style="width: 100vw"
    >
      <Logo class="hover-trigger" v-if="logo" :selectAreaName="selectAreaName" />
      <Menu class="flex-1 px-10px h-[var(--top-tool-height)]"></Menu>
      <ToolHeader />
    </div>
    <div class="p-8px h-full bg-[#eee] overflow-auto flex">
      <div class="left">
        <div class="left-top">
          <img :src="leftBg" class="w-360px left-bg" />
          <div class="left-contain">
            <p class="time">{{ nowDate }}</p>
            <div class="flex mt-30px"
              ><img :src="avatar" class="avatarImg" />
              <div class="ml-12px"
                ><p class="name mt-10px">姓名: {{ userName }}</p
                ><p class="name" v-if="hisDoctorNo">医保编码: {{ hisDoctorNo }}</p>
                <div
                  class="mb-6px selectAreaClass"
                  :style="!hisDoctorNo ? 'margin-top:10px' : 'margin-top:0px'"
                  ><span><i>*</i>当前院区：</span
                  ><el-select
                    v-model="selectArea"
                    class="w-160px"
                    placeholder="请输入您的院区"
                    @change="changeHospitalId()"
                  >
                    <el-option
                      v-for="item in hospitalLists"
                      :key="item.hospitalId"
                      :label="item.hospital"
                      :value="item.hospitalId"
                    /> </el-select></div></div
            ></div>
          </div>
        </div>
        <!-- <div class="business">
          <p class="message-title pt-10px">当日业务 </p>
          <div class="content">
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
          </div>
        </div> -->
        <div class="message">
          <!-- <img :src="gonggaoBg" class="w-360px gongao-bg" /> -->
          <p class="message-title pt-10px"> 体检流程 </p>
          <div class="buttons"
            ><span :class="{ toggleActivate: processType == '1' }" @click="toggleType('1')"
              >全部</span
            ><span :class="{ toggleActivate: processType == '2' }" @click="toggleType('2')"
              >团队</span
            ><span :class="{ toggleActivate: processType == '3' }" @click="toggleType('3')"
              >个人</span
            ></div
          >
          <div
            class="pl-10px pr-10px"
            style="height: calc(100% - 41px); overflow-y: auto; position: relative; z-index: 2"
          >
            <AllPE v-if="processType === '1'" />
            <UnitPE v-if="processType === '2'" />
            <IndividualPE v-if="processType === '3'" />
          </div>
          <!-- <div
            v-if="noticeData.length > 0"
            class="pl-10px pr-10px"
            style="height: calc(100% - 41px); overflow-y: auto; position: relative; z-index: 2"
          >
            <div
              class="messafe-info"
              v-for="(item, index) in noticeData"
              :key="index"
              @click="showMessageDetail(item)"
            >
              <p class="ellipsis messafe-info-title" :title="item.title">{{ item.title }}</p>
              <span class="messafe-info-text" v-html="item.content"></span>
              <span class="messafe-info-date">{{
                formatDate(item.createTime, 'YYYY-MM-DD HH:mm:ss')
              }}</span>
            </div></div
          > -->
          <!-- <div class="p-12px message-empty">
            <div style="width: 100%">
              <img :src="emptyBg" alt="" class="w-200px" srcset="" />
              <p>暂无数据</p></div
            >
          </div> -->
        </div>
      </div>
      <div class="right">
        <Right ref="rightRef" />
      </div>
    </div>
    <Footer />
    <Dialog v-model="dialogVisible" width="400px" :fullscreen="false">
      <template #title>
        <div class="dialog-title">选择诊室</div>
      </template>
      <div class="mb-8px">
        <div class="ml-10px"
          ><span style="color: #f56c6c; margin-right: 4px">*</span>请选择诊室</div
        >
        <el-select
          v-model="dept"
          class="m-2 w-full"
          placeholder="请选择诊室"
          size="large"
          filterable
          @change="onChangeDept"
        >
          <el-option
            v-for="item in outpDoctorRoomCodeList"
            :key="item.groupCode"
            :label="item.deptName"
            :value="item.groupCode"
          />
        </el-select>
        <div class="ml-10px">请选择号别</div>
        <el-select
          v-model="label"
          class="m-2 w-full"
          placeholder="请选择号别"
          size="large"
          filterable
          @change="onChangeLabel"
        >
          <el-option
            v-for="item in labelOptions"
            :key="item.clinicLabel"
            :label="item.clinicLabel"
            :value="item.clinicLabel"
          />
        </el-select>
      </div>
      <div class="flex justify-end">
        <section class="cancel-button" @click="dialogVisible = false">取消</section>
        <section class="save-button" @click="onSetDept">确认</section>
      </div>
    </Dialog>
    <Dialog v-model="inpNursedialogVisible" width="400px" :fullscreen="false">
      <template #title>
        <div class="dialog-title">护理单元</div>
      </template>
      <div class="mb-8px">
        <div class="ml-10px"><span style="color: #f56c6c; margin-right: 4px">*</span>护理单元</div>
        <el-select
          v-model="wardCode"
          class="m-2 w-full"
          placeholder="请选择护理单元"
          size="large"
          filterable
          @change="onChangeInpNurseWord"
        >
          <el-option
            v-for="item in wardCodeList"
            :key="item.deptCode"
            :label="item.deptName"
            :value="item.deptCode"
          />
        </el-select>
      </div>
      <div class="flex justify-end">
        <section class="cancel-button" @click="inpNursedialogVisible = false">取消</section>
        <section class="save-button" @click="onSetInpNurseDept">确认</section>
      </div>
    </Dialog>
    <div v-show="showMaskPre" class="mask1" @click="hideMaskPre"></div>
    <Dialog
      v-model="messageVisible"
      width="660px"
      :fullscreen="false"
      :close-on-click-modal="true"
      class="jianyanVisible"
      ><template #title>
        <div class="dialog-title">公告详情</div>
      </template>
      <div>
        <div style="color: #000">
          <p style="color: #333"
            ><span
              >类型：{{
                noteDetailData.type == '9'
                  ? '站内通知'
                  : noteDetailData.type == '10'
                  ? '系统维护'
                  : ''
              }}</span
            >
            <span class="ml-320px"
              >创建时间：{{ formatDate(noteDetailData.createTime, 'YYYY-MM-DD HH:mm:ss') }}</span
            ></p
          >
          <p class="mt-12px" style="font-size: 16px; font-weight: 600">{{
            noteDetailData.title
          }}</p>
          <p
            class="mt-12px flex messageDetailText"
            style="min-height: 300px; max-height: 450px; overflow-y: auto"
            ><span v-html="noteDetailData.content"></span></p></div
      ></div>
    </Dialog>
  </div>
</template>
<script setup lang="ts" name="Home">
import { nextTick } from 'vue'
import type { WorkplaceTotal, Notice, AppGrantsProps } from './types'
import { Logo } from '@/layout/components/Logo'
import { useAppStore } from '@/store/modules/app'
import router from '@/router'
import * as LoginApi from '@/api/login'
import * as API from '@/api/outpatient/index'
// import * as InpNurseAPI from '@/api/INPNurse/index's
import { useUserStore } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
const permissionStore = usePermissionStoreWithOut()
import ToolHeader from '@/layout/components/ToolHeader.vue'
import Group from './Group.vue'
import Right from './right.vue'
import * as echarts from 'echarts'
import usePatientListStore, {
  LabelOptionsProp,
  OutpDoctorRoomProps
} from '@/store/modules/Outpatient/patientList'
import { PageGroup } from './types'
import { Menu } from '@/layout/components/Menu'
import { Footer } from '@/layout/components/Footer/index'
import type { RouteRecordRaw } from 'vue-router'
import { generateRoute, flatMultiLevelRoutes } from '@/utils/routerHelper'
import { useTitle } from '@/hooks/web/useTitle'
import { formatDate } from '@/utils/formatTime'
import operMore from '@/assets/home/more.png'
import leftBg from '@/assets/login/left-bg.png'
import gonggaoBg from '@/assets/login/gonggao-bg.png'
import emptyBg from '@/assets/login/empty.png'
import nurseAvatar from '@/assets/login/nurse.png'
import doctorAvatar from '@/assets/login/doctor.png'
import { getNoticePage, queryNoticeDetail } from '@/api/system/notify/messagecenter'
import { useTagsViewStore } from '@/store/modules/tagsView'

// 导入三个组件
import AllPE from './components/AllPE/index.vue'
import UnitPE from './components/unitPE/index.vue'
import IndividualPE from './components/individualPE/index.vue'

const processType = ref('1') // 默认选中"全部"

const toggleType = (tabName) => {
  processType.value = tabName
  // 如果需要执行其他逻辑，可以在这里添加
}
const tagsViewStore = useTagsViewStore()
const nowDate = ref('')
const message = useMessage() // 消息弹窗
const loading = ref(true)
const noticeData = ref<any>([])
const appStore = useAppStore()
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
const { wsCache } = useCache()
const patientListStore = usePatientListStore()
// logo
const logo = computed(() => appStore.logo)
const avatar = ref('')
const userName = ref('')
const hisDoctorNo = ref('')
nextTick(() => {
  appStore.setTitle(import.meta.env.VITE_APP_TITLE)
})
const messageVisible = ref(false)
const noteDetailData = ref({
  title: '',
  type: '',
  content: '',
  status: '',
  id: '',
  createTime: ''
})
// 获取统计数
let totalSate = reactive<WorkplaceTotal>({
  project: 0,
  access: 0,
  todo: 0
})

const getCount = async () => {
  const data = {
    project: 40,
    access: 2340,
    todo: 10
  }
  totalSate = Object.assign(totalSate, data)
}

// 获取通知公告
let notice = reactive<Notice[]>([])
const getNotice = async () => {
  const data = [
    {
      title: '系统升级版本',
      type: '通知',
      keys: ['通知', '升级'],
      date: new Date()
    },
    {
      title: '系统凌晨维护',
      type: '公告',
      keys: ['公告', '维护'],
      date: new Date()
    },
    {
      title: '系统升级版本',
      type: '通知',
      keys: ['通知', '升级'],
      date: new Date()
    },
    {
      title: '系统凌晨维护',
      type: '公告',
      keys: ['公告', '维护'],
      date: new Date()
    }
  ]
  notice = Object.assign(notice, data)
}

const getAllApi = async () => {
  await Promise.all([getCount(), getNotice()])
  loading.value = false
}

const userStore = useUserStore()

const dialogVisible = ref(false)
const inpNursedialogVisible = ref(false)
const labelOptions = ref<LabelOptionsProp[]>([])
const outpDoctorRoomCodeList: Ref<OutpDoctorRoomProps[]> = ref([])
const dept = ref('')
const label = ref('')
const wardCode = ref('')
const wardCodeList = ref<any>([])
let toLink = ''
const appGrants = ref<AppGrantsProps[]>([])
const hospitalLists = ref<any>([])
const selectArea = ref('')
const selectAreaName = ref('')
const currenHospitalId = computed(() => userStore.getHospitalId)
const currenHospitalName = computed(() => userStore.getHospitalName)
const selectedClinicLabel = ref<any>([])
const rightRef = ref()

// 清空动态路由的函数
const resetRoutes = async () => {
  wsCache.set(CACHE_KEY.ROLE_ROUTERS, [])
  await permissionStore.generateRoutes()
}
const onClickCard = async (item) => {
  if (!hasGrant(item.value)) {
    message.warning('当前模块暂无访问权限')
    return false
  } else {
    appStore.setAppModule(item.value)
    appStore.setTitle(item.text)
    tagsViewStore.delAllViews()
    appStore.setTagsView(item.showTag || false)
    sessionStorage.setItem('nowEnter', item.value)
    if (item.value == 'ADMINMGR') {
      item.type = 'SYSTEMMGR'
    }
    LoginApi.checkRegistCode({ productCode: item.type }).then(() => {
      onClickCardJump(item)
    })
  }
}
const onClickCardJump = async (item) => {
  let res = await API.getAsysNameRoutesApi(item.type)
  if (res.length > 0 && res[0].children) {
    let arrNew = []
    res.forEach((row) => {
      if (row && row.children && row.children.length > 0) {
        row.children.forEach((item2) => {
          if (item2.path.indexOf('http') > -1) {
          } else {
            if (item2.children) {
              item2.path = row.path + '/' + item2.path + '/'
            } else {
              item2.path = row.path + '/' + item2.path
            }
            // }
          }
          arrNew.push(item2)
        })
      }
    })
    wsCache.set(CACHE_KEY.ROLE_ROUTERS, arrNew)

    const routerMap: AppRouteRecordRaw[] = generateRoute(arrNew as AppCustomRouteRecordRaw[])
    routerMap.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw)
    })
    await permissionStore.generateRoutes()
  } else {
    wsCache.set(CACHE_KEY.ROLE_ROUTERS, res)
    await permissionStore.generateRoutes()
  }
}
const onChangeDept = (val) => {
  userStore.setClinicDept(val)
  const selectedDept = outpDoctorRoomCodeList.value.filter((item) => item.groupCode === val)
  if (
    selectedDept &&
    Array.isArray(selectedDept) &&
    selectedDept.length > 0 &&
    selectedDept[0].clinicLabelList.length > 0
  ) {
    labelOptions.value = selectedDept[0].clinicLabelList
    label.value = labelOptions.value[0].clinicLabel
    selectedClinicLabel.value = labelOptions.value[0]
    userStore.setClinicLabel(labelOptions.value[0].clinicLabel)
    userStore.setClinicType(labelOptions.value[0].clinicType)
    userStore.setClinicDuration(labelOptions.value[0].clinicDuration)
  } else {
    labelOptions.value = []
    label.value = ''
    selectedClinicLabel.value = {}
    userStore.setClinicLabel('')
    userStore.setClinicType('')
    userStore.setClinicDuration('')
  }
}

const onChangeLabel = (val) => {
  userStore.setClinicLabel(val)
  selectedClinicLabel.value = val
  const item = labelOptions.value.filter((i) => i.clinicLabel === val)
  if (item.length > 0) {
    userStore.setClinicType(item[0].clinicType)
    userStore.setClinicDuration(item[0].clinicDuration)
  }
}
const onChangeInpNurseWord = (val) => {
  userStore.setWardCode(val)
  let wordName = wardCodeList.value.find((user) => user.deptCode == val)?.deptName
  userStore.setWardName(wordName)
}
const onSetDept = () => {
  if (dept.value == '') {
    message.warning('当前诊室没有排班')
    return
  }
  outpDoctorRoomCodeList.value.map((item) => {
    if (item.groupCode === dept.value) {
      patientListStore.setCurrentDocRoom({
        groupCode: dept.value,
        deptName: String(item.deptName),
        counselNo: item.counselNo,
        clinicLabelList: [selectedClinicLabel.value]
      })
    }
  })
  dialogVisible.value = false
  userStore.setHospitalId(selectArea.value)
  userStore.setHospitalName(selectAreaName.value)
  // 获取医院信息
  API.getHospital().then((res) => {
    if (res && Array.isArray(res) && res.length > 0) {
      patientListStore.setHospitalName(res[0].hospital)
      patientListStore.setInsurHosno(res[0].organizationCodeZg)
      patientListStore.setChargingQrUrl(res[0].chargingQrUrl)
    }
  })
  router.push(toLink)
}
const onSetInpNurseDept = () => {
  //选择护理单元
  if (wardCode.value == '') {
    message.warning('请选择护理单元')
    return
  }
  userStore.setWardCode(wardCode.value)
  let wordName = wardCodeList.value.find((user) => user.deptCode == wardCode.value)?.deptName
  userStore.setWardName(wordName)
  inpNursedialogVisible.value = false
  userStore.setHospitalId(selectArea.value)
  userStore.setHospitalName(selectAreaName.value)
  router.push(toLink)
}

const userInfo = computed(() => userStore.getUser)
const hasGrant = (val: string) => {
  return appGrants.value.findIndex((item) => item.application === val) != -1
}
const filterGrantList = ref<any>([])
const filterAllGrantList = ref<any>([])
const showMaskPre = ref(false)
const isShowAllGrant = ref(false)
const grantList = ref<any>([])
const moreGrantList = ref<any>([])
// const grantList = computed((): PageGroup[] => {
//   return data
//     .map((group): PageGroup => {
//       const { subItems, ...res } = group
//       return { ...res, subItems: subItems.filter((item) => hasGrant(item.value)) }
//     })
//     .filter((item) => item.subItems.length > 0)
// })

onMounted(async () => {
  let docModel: any = sessionStorage.getItem('docModel')
  let isNurse = false
  if (docModel) {
    let str = JSON.stringify(JSON.parse(docModel))
    if (str.indexOf('INPNURSE') > -1) {
      isNurse = true
    }
  }
  avatar.value = userInfo.value.avatar
    ? userInfo.value.avatar
    : isNurse
    ? nurseAvatar
    : doctorAvatar
  userName.value = userInfo.value.nickname ? userInfo.value.nickname : 'Admin'
  hisDoctorNo.value = userInfo.value.hisDoctorNo
  // showBusiness()
  useTitle(userInfo.value.nickname)
  getAllApi()
  // 获取模块权限
  API.getAppGrants().then((res: AppGrantsProps[]) => {
    appGrants.value = res
    sessionStorage.setItem('docModel', JSON.stringify(res))
    grantList.value = []
    if (appGrants.value && appGrants.value.length > 0) {
      appGrants.value.forEach((item: any) => {
        item.value = item.application
        item.type = item.application
        if (item.remark) {
          let res = JSON.parse(item.remark)
          item.text = res && res.text ? res.text : ''
          item.link = res && res.link ? res.link : ''
          item.showTag = res && res.showTag ? res.showTag : false
          item.icon =
            res && res.icon ? new URL(`../../assets/home/${res.icon}`, import.meta.url).href : ''
          grantList.value.push(item)
        }
      })
    }
    filterAllGrantList.value = []
    filterAllGrantList.value = grantList.value
    filterGrantList.value =
      filterAllGrantList.value && filterAllGrantList.value.length > 8
        ? filterAllGrantList.value.slice(0, 8)
        : filterAllGrantList.value
    moreGrantList.value =
      filterAllGrantList.value && filterAllGrantList.value.length > 8
        ? filterAllGrantList.value.slice(8, filterAllGrantList.value.length)
        : filterAllGrantList.value
    let isTest = filterAllGrantList.value.filter((item) => item.application === 'PHYEXAMMANAGE')

    if (isTest && isTest.length) {
      onClickCard(isTest[0])
    } else {
      resetRoutes()
      message.warning('当前工作人员无体检系统权限，请联系管理员开通权限！')
    }
  })
  patientListStore.setDiagColumns()
  patientListStore.setCDiagColumns()

  hospitalLists.value = await LoginApi.getHospitalConfigInfos({})
  if (hospitalLists.value && hospitalLists.value.length > 0) {
    selectArea.value = currenHospitalId.value
      ? currenHospitalId.value
      : userInfo.value.hospitalId
      ? userInfo.value.hospitalId + ''
      : hospitalLists.value[0].hospitalId
    changeHospitalId()
    selectAreaName.value = currenHospitalName.value
      ? currenHospitalName.value
      : hospitalLists.value[0].hospital
    userStore.setHospitalId(selectArea.value)
    userStore.setHospitalName(selectAreaName.value)
    // rightRef.value.queryInpPatOverviewApi()
    // rightRef.value.queryInpPatCountTrendApi()
    // rightRef.value.queryInpPatDiagnosisCountApi()
    // rightRef.value.queryToDoListApi()
  }
  LoginApi.queryParameterValue({
    appName: '*',
    deptCode: '*',
    empNo: userInfo.value.username,
    parameterName: 'ENABLE_CA_SIGN'
  }).then((res) => {
    if (res == '0') {
      userStore.setIsCheckCA(false)
    } else if (res == '1') {
      userStore.setIsCheckCA(true)
    }
  })
  await getNoticePage({
    pageNo: 1,
    pageSize: 30
  }).then((res) => {
    noticeData.value = []
    if (res.list && res.list.length > 0) {
      res.list.forEach((item) => {
        if (item.status == 0) {
          noticeData.value.push(item)
        }
      })
    }
  })
})
const businessRef = ref<HTMLDivElement | null>(null)
const showBusiness = () => {
  const chartInstance = echarts.init(businessRef.value)
  const option: echarts.EChartsOption = {
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
  chartInstance.setOption(option)
}
/* const processType = ref('1')
const toggleType = (type: string) => {
  processType.value = type
} */

const showMessageDetail = async (item: any) => {
  noteDetailData.value = await queryNoticeDetail({
    id: item.id
  })
  messageVisible.value = true
}
const changeHospitalId = async () => {
  LoginApi.switchHospital({
    hospitalId: selectArea.value
  })
  selectAreaName.value = hospitalLists.value.find(
    (user) => user.hospitalId == selectArea.value
  )?.hospital
  userStore.setHospitalId(selectArea.value)
  userStore.setHospitalName(selectAreaName.value)
  //   rightRef.value.queryInpPatOverviewApi()
  //   rightRef.value.queryInpPatCountTrendApi()
  //   rightRef.value.queryInpPatDiagnosisCountApi()
  //   rightRef.value.queryToDoListApi()
}
// const getSystemDateTimeApi = async () => {
//   let res = await getSystemDateTime()
//   let str = formatDate(res, 'YYYY-MM-DD HH:mm:ss')
//   nowDate.value = str
// }
const onClickMore = () => {
  isShowAllGrant.value = true
  showMaskPre.value = true
}
const hideMaskPre = () => {
  isShowAllGrant.value = false
  showMaskPre.value = false
}
</script>

<style scoped lang="scss">
.home-container {
  height: calc(100vh - 52px);
}
.dialog-title {
  color: #000;
  font-size: 14px;
  font-family: 'Microsoft Yahei UI';
  font-weight: bold;
}

.cancel-button {
  width: 100px;
  height: 36px;
  border-radius: 5px;
  opacity: 1;
  border: 1px solid #3473d1;
  background: #fff;
  color: #3473d1;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}
.save-button {
  width: 100px;
  height: 36px;
  border-radius: 5px;
  opacity: 1;
  border: 1px solid #3473d1;
  background: #3473d1;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  margin-left: 32px;
}
.selectAreaClass {
  font-size: 16px;
  color: #000;
  position: relative;
  left: -5px;
  span {
    i {
      color: red;
      font-style: normal;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 22px;
      position: relative;
      top: 6px;
      margin-right: 4px;
    }
  }
}
.left {
  width: 360px;
  height: calc(100% - 32px);
  .left-top {
    width: 360px;
    height: 200px;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    position: relative;

    .left-bg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
    .left-contain {
      height: 100%;
      padding-bottom: 10px;
      //   border-bottom: 1px solid #eaeaea;
    }
    .time {
      color: #333333;
      text-align: justify;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .avatarImg {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: block;
      box-shadow: 0 0 4px 0 #99999940;
    }
    .selectAreaClass {
      width: 248px;
      margin: 0 auto;
      span {
        font-size: 15px;
      }
    }
    .name {
      color: #333333;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }
}
.home-card {
  border: 1px solid transparent;
  cursor: pointer;
  float: left;
  width: 33%;
  text-align: center;
  margin-bottom: 12px;
  .home-card-title {
    color: #2f2f2fff;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Microsoft Yahei UI';
    text-align: center;
  }
  &:hover {
    .home-card-title {
      font-weight: 550;
    }
  }
}
.img-hover {
  box-shadow: 0 0 4px 0 #99999940;
  margin: 0 auto 10px;
  display: block;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 25px 0 #1549ef17;
  }
}
.allHomeCard {
  width: 600px;
  padding: 12px;
  background-color: #ffffff;
  position: fixed;
  top: 50%;
  left: 380px;
  z-index: 1000;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 #99999940;
  transform: translateY(-50%);
}
.mask1 {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: transparent;
}
.business {
  margin-top: 8px;
  width: 360px;
  height: 270px;
  background: #fff;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .message-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    text-align: left;
    position: relative;
    padding-left: 10px;
  }
  .message-title::after {
    content: '';
    width: 3px;
    height: 16px;
    background: #3473d1;
    position: absolute;
    left: 0;
    top: 10px;
  }
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
.message {
  margin-top: 8px;
  width: 360px;
  height: calc(100% - 200px);
  background: #fff;
  border-radius: 4px;
  position: relative;
  .buttons {
    position: absolute;
    right: 8px;
    top: 14px;
    font-size: 14px;
    z-index: 666;
    span {
      padding: 6px 12px;
      //   border: 1px solid #eaeaea;
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
  .gongao-bg {
    position: absolute;
    right: 0;
    top: 0;
  }
  .message-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    text-align: left;
    position: relative;
    padding-left: 10px;
  }
  .message-title::after {
    content: '';
    width: 3px;
    height: 16px;
    background: #3473d1;
    position: absolute;
    left: 0;
    top: 10px;
  }
  .message-empty {
    width: 100%;
    height: calc(100% - 32px);
    display: flex;
    align-items: center;
    background-color: #ffc;
    img {
      margin: 0 auto 8px;
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
  .messafe-info {
    width: 100%;
    border: 1px solid #ebeef5;
    padding: 8px;
    margin-top: 10px;
    border-radius: 4px;
    cursor: pointer;
    .messafe-info-title {
      width: 100%;
      color: #000;
      text-align: justify;
      font-size: 14px !important;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    // .messafe-info-title:hover {
    //   color: #3473d1;
    //   text-decoration: underline;
    // }
    .messafe-info-text {
      width: 100%;
      display: block;
      color: #666666 !important;
      text-align: justify;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      p {
        span {
          font-size: 12px !important;
          color: #666666 !important;
        }
      }
    }
    .messafe-info-date {
      width: 100%;
      display: block;
      color: #999;
      text-align: justify;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-top: 4px;
    }
  }
  .messafe-info:hover {
    border: 1px solid #3473d1;
  }
}
.right {
  flex: 1;
  overflow: hidden;
  // width: calc(100% - 368px);
  height: calc(100% - 32px);
  margin-left: 8px;
}
:deep(.messafe-info .messafe-info-text span) {
  font-size: 12px !important;
  color: #666666 !important;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif !important;
}
:deep(.messafe-info .messafe-info-text p) {
  font-size: 12px !important;
  color: #666666 !important;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif !important;
}
:deep(.messageDetailText span) {
  font-size: 14px !important;
  color: #333 !important;
  line-height: 1.6;
  text-align: justify;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif !important;
}
:deep(.messageDetailText p) {
  font-size: 14px !important;
  color: #333 !important;
  line-height: 1.6;
  text-align: justify;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif !important;
}
</style>
<style lang="scss">
.jianyanVisible .el-dialog__body {
  padding: 15px !important;
}
</style>
