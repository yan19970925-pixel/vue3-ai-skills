import { store } from '../index'
import { defineStore } from 'pinia'
import { getAccessToken, removeToken } from '@/utils/auth'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import { getInfoApi, loginOutApi, queryMessageCount } from '@/api/login'

const { wsCache } = useCache()

// const { wsCache as wsSessionCache } = useCache('sessionStorage')

// 就诊科室
const CLINICDEPT = 'CLINICDEPT'
// 号别
const CLINICLABEL = 'CLINICLABEL'
// 号类
const CLINICTYPE = 'CLINICTYPE'
// 就诊时间
const CLINICDURATION = 'CLINICDURATION'
//护理单元
const WARDCODE = 'WARDCODE'
//护理单元名称
const WARDNAME = 'WARDNAME'
//院区Id,名称
const HOSPITALID = 'HOSPITALID'
const HOSPITALNAME = 'HOSPITALNAME'
//ca签名图片
const SIGNBASE64IMG = 'SIGNBASE64IMG'
//是否校验CA
const ISCHECKCA = 'ISCHECKCA'
//未读消息数
const MESSAGECONT = 'MESSAGECONT'
interface UserVO {
  id: number
  avatar: string
  nickname: string
  username: string
  hisStaffId: string
  hisDoctorNo: string
  hisDeptCode: string
  poisonAuthority: number // 毒性药品
  surgicalGrade: number // 手术等级
  anesthesiaLimit: number // 麻醉药品
  expertFlag: number // 专家标识
  hisIdNo: string
  hospitalId: string //默认院区id
}
interface UserInfoVO {
  permissions: string[]
  roles: string[]
  isSetUser: boolean
  user: UserVO
  clinicDept: string // 就诊科室
  clinicLabel: string // 号别
  wardCode: string // 护理单元
  wardName: string // 护理单元名称
  clinicType: string // 号类
  clinicDuration: string // 就诊时间
  messageCount: number
  hospitalId: string
  hospital: string
  signBase64Img: string
  isCheckCA: boolean
}

export const useUserStore = defineStore('admin-user', {
  state: (): UserInfoVO => ({
    permissions: [],
    roles: [],
    isSetUser: false,
    user: {
      id: 0,
      avatar: '',
      nickname: '', //医生名字
      username: '', //系统登录账号
      hisStaffId: '', //医生id
      hisDoctorNo: '', //医生医保码，贯标码
      hisDeptCode: '', //医生所在科室编码
      poisonAuthority: -1, // 毒性药品
      surgicalGrade: -1, // 手术等级
      anesthesiaLimit: -1, // 麻醉药品
      expertFlag: -1, // 专家标识
      hospitalId: '' //默认院区id
    },
    clinicDept: '',
    clinicLabel: '', // 号别
    clinicType: '', // 号类
    clinicDuration: '', // 就诊时间
    wardCode: '',
    wardName: '',
    messageCount: 3,
    hospitalId: '',
    hospital: '',
    signBase64Img: '',
    isCheckCA: false
  }),
  getters: {
    getPermissions(): string[] {
      return this.permissions
    },
    getRoles(): string[] {
      return this.roles
    },
    getIsSetUser(): boolean {
      return this.isSetUser
    },
    getUser(): UserVO {
      return this.user
    },
    getClinicDept(): string {
      return this.clinicDept || wsCache.get(CLINICDEPT)
    },
    getClinicLabel(): string {
      return this.clinicLabel || wsCache.get(CLINICLABEL)
    },
    getClinicType(): string {
      return this.clinicType || wsCache.get(CLINICTYPE)
    },
    getClinicDuration(): string {
      return this.clinicDuration || wsCache.get(CLINICDURATION)
    },
    getWardCode(): string {
      return this.wardCode || wsCache.get(WARDCODE)
    },
    getWardName(): string {
      return this.wardName || wsCache.get(WARDNAME)
    },
    getMessageCount(): number {
      return this.messageCount
    },
    getHospitalId(): string {
      return this.hospitalId || wsCache.get(HOSPITALID)
    },
    getHospitalName(): string {
      return this.hospital || wsCache.get(HOSPITALNAME)
    },
    getSignBase64Img(): string {
      return this.signBase64Img || wsCache.get(SIGNBASE64IMG)
    },
    getIsCheckCA(): string {
      return this.isCheckCA || wsCache.get(ISCHECKCA)
    }
  },
  actions: {
    async setUserInfoAction() {
      if (!getAccessToken()) {
        this.resetState()
        return null
      }
      let userInfo = wsCache.get(CACHE_KEY.USER)
      if (!userInfo) {
        userInfo = await getInfoApi()
      }
      this.permissions = userInfo.permissions
      this.roles = userInfo.roles
      this.user = userInfo.user
      this.isSetUser = true
      wsCache.set(CACHE_KEY.USER, userInfo)
      this.messageCount = await queryMessageCount({
        reciveUser: userInfo.user.username,
        readStatus: '0'
      })
      wsCache.set(MESSAGECONT, this.messageCount)
    },
    async loginOut() {
      await loginOutApi()
      removeToken()
      wsCache.clear()
      this.resetState()
    },
    resetState() {
      this.permissions = []
      this.roles = []
      this.isSetUser = false
      this.user = {
        id: 0,
        avatar: '',
        nickname: '',
        username: '',
        hisStaffId: '',
        hisDoctorNo: '',
        hisDeptCode: '',
        poisonAuthority: -1, // 毒性药品
        surgicalGrade: -1, // 手术等级
        anesthesiaLimit: -1, // 麻醉药品
        expertFlag: -1, // 专家标识
        hospitalId: '' //默认院区id
      }
    },
    async setUserInfoCache() {
      if (!getAccessToken()) {
        this.resetState()
        return null
      }
      const userInfo = await getInfoApi()
      this.permissions = userInfo.permissions
      this.roles = userInfo.roles
      this.user = userInfo.user
      this.isSetUser = true
      //更新头部用户头部信息
      const userAvatarElement = document.getElementById('userAvatar') || null
      if (userAvatarElement) {
        userAvatarElement.setAttribute('src', this.user.avatar)
      }
      wsCache.set(CACHE_KEY.USER, userInfo)
      this.messageCount = await queryMessageCount({
        reciveUser: userInfo.user.username,
        readStatus: '0'
      })
      wsCache.set(MESSAGECONT, this.messageCount)
    },
    setUserInfo(val: UserInfoVO) {
      wsCache.set(CACHE_KEY.USER, val)
      this.user = val.user
    },
    setClinicDept(val: string) {
      wsCache.set(CLINICDEPT, val)
      this.clinicDept = val
    },
    setClinicLabel(val: string) {
      wsCache.set(CLINICLABEL, val)
      this.clinicLabel = val
    },
    setClinicType(val: string) {
      wsCache.set(CLINICTYPE, val)
      this.clinicType = val
    },
    setClinicDuration(val: string) {
      wsCache.set(CLINICDURATION, val)
      this.clinicDuration = val
    },
    setWardCode(val: string) {
      wsCache.set(WARDCODE, val)
      this.wardCode = val
    },
    setWardName(val: string) {
      wsCache.set(WARDNAME, val)
      this.wardName = val
    },
    setMessageCount(val: number) {
      wsCache.set(MESSAGECONT, val)
      this.messageCount = val
    },
    setHospitalId(val: string) {
      wsCache.set(HOSPITALID, val)
      this.hospitalId = val
    },
    setHospitalName(val: string) {
      wsCache.set(HOSPITALNAME, val)
      this.hospital = val
    },
    setSignBase64Img(val: string) {
      wsCache.set(SIGNBASE64IMG, val)
      this.signBase64Img = val
    },
    setIsCheckCA(val: boolean) {
      wsCache.set(ISCHECKCA, val)
      this.isCheckCA = val
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
