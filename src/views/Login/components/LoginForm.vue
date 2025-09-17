<template>
  <div>
    <el-form
      :model="loginData.loginForm"
      :rules="LoginRules"
      label-position="top"
      class="login-form"
      label-width="120px"
      size="large"
      v-show="getShow"
      ref="formLogin"
      hide-required-asterisk
    >
      <el-col :span="24" style="padding-left: 10px; padding-right: 10px; padding-bottom: 30px">
        <el-form-item class="imgTitle">
          <img alt="" class="w-464px" :src="loginTitle" />
        </el-form-item>
      </el-col>
      <el-row
        style="margin-left: -10px; margin-right: -10px; justify-content: center"
        class="formWrap"
      >
        <div class="passwordContent" v-if="!showQrCode">
          <el-col
            :span="24"
            style="padding-bottom: 10px; padding-top: 40px; padding-left: 10px"
            v-if="!isUkeyVisiable"
          >
            <el-form-item class="imgHospital">
              <!-- <img alt="" class="w-330px h-77px" :src="logoHospital" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px" v-if="!isUkeyVisiable">
            <el-form-item prop="username">
              <template #label>
                <div class="inline-flex">
                  <img alt="" src="@/assets/login/account.svg" class="w-22px h-22px mr-4px" />
                  <span>账号</span>
                </div>
              </template>
              <el-input
                v-model="loginData.loginForm.username"
                ref="usernameRef"
                name="choseUsername"
                placeholder="请输入您的账号"
                class="!w-368px"
                :maxLength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px" v-if="!isUkeyVisiable">
            <el-form-item prop="password">
              <template #label>
                <div class="inline-flex">
                  <img alt="" src="@/assets/login/pwd.svg" class="w-22px h-22px mr-4px" />
                  <span>密码</span>
                </div>
              </template>
              <el-input
                class="!w-368px"
                ref="passwordRef"
                name="chosePassword"
                v-model="loginData.loginForm.password"
                type="password"
                placeholder="请输入您的密码"
                :maxLength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px" v-if="isUkeyVisiable">
            <el-form-item prop="password">
              <template #label>
                <div class="inline-flex">
                  <img alt="" src="@/assets/login/pwd.svg" class="w-22px h-22px mr-4px" />
                  <span>UKEY姓名</span>
                </div>
              </template>
              <el-input class="!w-368px" v-model="ukeyName" />
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px" v-if="isUkeyVisiable">
            <el-form-item prop="username">
              <template #label>
                <div class="inline-flex">
                  <img alt="" src="@/assets/login/account.svg" class="w-22px h-22px mr-4px" />
                  <span>UKEY身份ID</span>
                </div>
              </template>
              <el-input v-model="ukeyId" disabled class="!w-368px" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" style="padding-left: 10px; padding-right: 10px">
            <el-form-item prop="area">
              <template #label>
                <div class="inline-flex">
                  <img alt="" src="@/assets/login/area.svg" class="w-22px h-22px mr-4px" />
                  <span>院区</span>
                </div>
              </template>
              <el-select
                v-model="selectArea"
                class="w-368px"
                placeholder="请输入您的院区"
                :suffix-icon="CaretBottom"
              >
                <el-option
                  v-for="item in hospitalLists"
                  :key="item.hospitalId"
                  :label="item.hospital"
                  :value="item.hospitalId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-left: 10px; padding-right: 10px">
            <el-form-item prop="department">
              <template #label>
                <div class="inline-flex"
                  ><img
                    alt=""
                    src="@/assets/login/department.svg"
                    class="w-22px h-22px mr-4px"
                  /><span>科室</span></div
                >
              </template>
              <el-select
                v-model="loginData.loginForm.department"
                class="w-368px"
                placeholder="请输入您的科室"
                :suffix-icon="CaretBottom"
              >
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
        </div>
        <div
          class="qrcodeContent"
          style="height: 326px; max-height: 420px; padding-top: 20px"
          v-else
        >
          <div v-if="!qrCodeImg" class="loading">
            <div class="loading-txt">{{ loadText }}</div>
          </div>
          <div v-else>
            <img
              style="height: 300px; max-height: 300px"
              @click="throttleRefreshQrcode"
              :src="qrCodeImg"
            />
          </div>
          <p v-if="qrCodeImg" style="text-align: center">请使用“云医签”扫码登录</p>
        </div>
        <el-col
          :span="24"
          style="padding-left: 10px; padding-right: 10px; position: relative; top: 0px"
        >
          <el-form-item class="loginType">
            <el-row>
              <el-col :span="24">
                <div
                  class="w-368px"
                  style="display: flex"
                  :style="{
                    'justify-content': !showqrcode ? 'space-between' : 'flex-end'
                  }"
                >
                  <!-- <el-checkbox v-model="isCA"> CA登录 </el-checkbox> -->
                  <!-- <el-checkbox v-if="!showQrCode" v-model="loginData.loginForm.rememberMe">
                    记住我
                  </el-checkbox> -->
                  <!--<div style="color: #3473D1; cursor: pointer" @click="getUUid">UKEY登录 </div>-->
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          style="padding-left: 10px; padding-right: 10px; position: relative; top: -20px"
        >
          <el-form-item class="loginBtn">
            <!-- <XButton class="!w-180px submit-button" title="CA登录" @click="getUUid" /> -->
            <XButton
              :loading="loginLoading"
              class="!w-370px submit-button"
              title="账号登录"
              @click="handleLogin()"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <Dialog
      :model-value="UkeyVisible"
      width="500px"
      :fullscreen="false"
      :close-on-click-modal="false"
      class="nurse-dialog priceDialog"
      @close="UkeyVisible = false"
    >
      <template #title>
        <div class="dialog-title">UKEY登录</div>
      </template>
      <div class="content-container" style="position: relative; top: -10px">
        <section style="">
          <div class="mt-20px">
            <div class="flex">
              <span class="!w-100px" style="line-height: 30px">证书持有者</span>
              <el-input
                class="!w-250px"
                id="certCNid"
                name="certCNid"
                v-model="certName"
                type="text"
                :maxLength="20"
              />
            </div>
            <el-form-item label="单位名称" style="display: none">
              <el-input :disabled="true" id="certOid" name="certOid" value=""></el-input>
            </el-form-item>
            <el-form-item label="keyDN项" style="display: none">
              <el-input :disabled="true" id="certDNid" name="certDNid" value=""></el-input>
            </el-form-item>
            <el-form-item label="keyKey项" style="display: none">
              <el-input :disabled="true" id="certkeyid" name="certkeyid" value=""></el-input>
            </el-form-item>
            <el-form-item label="证书有效期起始" style="display: none">
              <el-input
                :disabled="true"
                id="certStartTime"
                name="certStartTime"
                value=""
              ></el-input>
            </el-form-item>
            <el-form-item label="证书有效期结束" style="display: none">
              <el-input :disabled="true" id="certEndTime" name="certEndTime" value=""></el-input>
            </el-form-item>
            <el-form-item label="key的扩展项" style="display: none">
              <el-input :disabled="true" id="certKZ" name="certKZ" value=""></el-input>
            </el-form-item>
            <el-form-item label="证书序列号" style="display: none">
              <el-input :disabled="true" id="certSN" name="certSN" value=""></el-input>
            </el-form-item>
            <el-form-item label="certBase64" style="display: none">
              <el-input :disabled="true" id="certbase64id" name="signcert" value=""></el-input>
            </el-form-item>
            <el-form-item label="原文" style="display: none">
              <el-input
                :disabled="true"
                name="sourcedata"
                id="sourcedata"
                type="text"
                class="step_input"
              ></el-input>
            </el-form-item>
            <el-form-item label="签名值" style="display: none">
              <el-input :disabled="true" name="signdata" id="signdata"></el-input>
            </el-form-item>
            <el-form-item label="印章base64数据" style="display: none">
              <el-input :disabled="true" name="sealImg" id="sealImg"></el-input>
            </el-form-item>
            <div class="mt-16px flex">
              <span class="!w-100px" style="line-height: 30px">证书密码</span>
              <el-input
                class="!w-250px"
                v-model="certPin"
                name="CertPin"
                id="CertPin"
                type="password"
                placeholder="请输入您的密码"
                :maxLength="20"
              />
            </div>
          </div>
          <div style="margin-top: 30px; text-align: center">
            <el-button type="primary" class="createTreat" @click.stop="handleCASign()"
              >登录</el-button
            >
            <el-button
              class="createTreat"
              style="border: 1px solid #3473d1; color: #3473d1; background: #fff"
              @click.stop="UkeyVisible = false"
              >取消</el-button
            >
          </div>
        </section>
      </div>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import * as authUtil from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'
import * as LoginApi from '@/api/login'
import { calogin } from '@/api/login/caLogin'
import { LoginStateEnum, useLoginState, useFormValid } from './useLogin'
import loginTitle from '@/assets/login/logo-forhis.png'
import logoHospital from '@/assets/login/logo-hos.png'
import { AearOptions } from '../type'
import { SelectCert, checkCertPin, getSealPicBase64 } from './hncaScript.js'
import qs from 'qs'
import axios from 'axios'
// import { CaretBottom } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const message = useMessage() // 消息弹窗
const formLogin = ref()
const { validForm } = useFormValid(formLogin)
const { getLoginState } = useLoginState()
const { currentRoute, push } = useRouter()
const permissionStore = usePermissionStore()
const redirect = ref<string>('')
const loginLoading = ref(false)
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
const hospitalLists = ref<any>([])
const selectArea = ref('')
const LoginRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const loginData = reactive({
  isShowPassword: false,
  loginForm: {
    username: '',
    password: '',
    area: '',
    department: '',
    rememberMe: false
  }
})
const areaOptions: AearOptions[] = []

// 记住我
const getCookie = () => {
  const loginForm = authUtil.getLoginForm()
  if (loginForm) {
    loginData.loginForm = {
      ...loginData.loginForm,
      username: loginForm.username ? loginForm.username : loginData.loginForm.username,
      password: loginForm.password ? loginForm.password : loginData.loginForm.password,
      rememberMe: loginForm.rememberMe ? true : false
    }
  }
}

const usernameRef = ref()
const passwordRef = ref()
document.onkeydown = function (e) {
  let isChose: any = document.activeElement
  if (isChose && isChose.name == 'choseUsername') {
    if (
      isChose &&
      isChose.name == 'choseUsername' &&
      isChose.tagName === 'INPUT' &&
      e.key === 'Enter'
    ) {
      nextTick(() => {
        passwordRef.value.focus()
      })
    }
  } else if (isChose && isChose.name == 'chosePassword') {
    if (
      isChose &&
      isChose.name == 'chosePassword' &&
      isChose.tagName === 'INPUT' &&
      e.key === 'Enter'
    ) {
      handleLogin()
    }
  } else if (e.key === 'Enter') {
    if (UkeyVisible.value) {
      handleCASign()
    } else {
      handleLogin()
    }
  }
}
// 登录
const handleLogin = async (arg: any = {}) => {
  loginLoading.value = true
  try {
    if (UkeyVisible.value) {
      return
    }
    const data = await validForm()
    if (!data) {
      return
    }
    if (!isCA.value) {
      const res = await LoginApi.loginApi(loginData.loginForm)
      if (!res) {
        return
      }

      if (loginData.loginForm.rememberMe) {
        authUtil.setLoginForm(loginData.loginForm)
      } else {
        authUtil.removeLoginForm()
      }
      authUtil.setToken(res)
    } else {
      // isUkey登录
      // const res = await LoginApi.loginWithCA({ name: ukeyName.value, idNo: ukeyId.value })
      // if (!res) {
      //   return
      // }
      // authUtil.removeLoginForm()
      // authUtil.setToken(res)
      if (!arg) {
        return
      }
      authUtil.removeLoginForm()
      authUtil.setToken(arg)
    }
    if (!redirect.value) {
      redirect.value = '/'
    }
    push({ path: redirect.value || permissionStore.addRouters[0].path })
      .then(() => {
        loginLoading.value = false
      })
      .catch(() => {
        authUtil.removeLoginForm()
        authUtil.removeToken()
        loginLoading.value = false
      })
  } catch {
    loginLoading.value = false
  }
}

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

onMounted(async () => {
  setTimeout(() => {
    usernameRef.value.focus()
  }, 500)
  // window.addEventListener('keydown', keyDown)
  getCookie()
})

// onUnmounted(() => {
//   window.removeEventListener('keydown', keyDown, false)
// })

// const keyDown = (e: KeyboardEvent) => {
//   //如果是回车则执行登录方法
//   if (e.code === 'Enter' || e.code === 'NumpadEnter') {
//     handleLogin()
//   }
// }
const isUkey = ref(false)
const isUkeyVisiable = ref(false)
const ukeyValue = ref<string>('')
const ukeyInfo = ref<string>('')
const ukeyName = ref<string>('')
const ukeyId = ref<string>('')
//zm
const UkeyVisible = ref(false)
const certName = ref('')
const certPin = ref('')
// watch(
//   () => isUkey.value,
//   (info) => {
//     if (info) {
//       loginData.loginForm.rememberMe = false
//       getUUid()
//     } else {
//       isUkeyVisiable.value = false
//     }
//   }
// )
//CA扫码登录
const isCA = ref(false)
const showQrCode = ref(false)
const qrCodeImg = ref<string>('') //二维码图片
const loadText = ref<string>('二维码图片加载中...')
const throttleTimestamp = ref<any>('')
let intervalTimer
watch(
  () => isCA.value,
  (info) => {
    if (info) {
      showQrCode.value = true
      getQrcodeImg()
    } else {
      showQrCode.value = false
      clearInterval(intervalTimer)
    }
  }
)
// let prov = 'SKF_SHECA&EsecuKey_KGM_API_sheca.dll' //文鼎创 // 算法提供者：根据项目选择的UKEY类型确定该参数
// let strOrgData = 'abcdefgh12345678' //作为签名原文，本示例中以随机数为例，实际使用时应为需保护的业务数据，如登录会话随机数、病历原文内容等
const getUUid = () => {
  UkeyVisible.value = true
  certName.value = ''
  certPin.value = ''
  selectCert()
  // var alg = ALGID_AUTO // 自动判断
  // var hashAlg = ALGID_AUTO // 自动判断

  // //1、设置UKEY调用环境
  // var nRet = SecCtrl.KS_SetProv(prov, alg, '')
  // if (nRet != 0) {
  //   message.notifyError('设置算法提供者失败或未安装证书助手')
  //   return false
  // }

  // //2、校验UKEY密码
  // let strpassword = ukeyValue.value
  // if (strpassword == '') {
  //   // message.notifyError('请输入UKEY密码')
  //   // return false
  // }

  // nRet = SecCtrl.KS_VerifyPin(strpassword)
  // if (nRet != 0) {
  //   // message.notifyError('输入UKEY密码错误')
  //   // return false
  // }
  // // 预设密码，免弹密码框
  // SecCtrl.KS_SetParam('defaultpin', strpassword) // 如果没有这行代码，在调用KS_SignData方法时控件将会弹出密码输入框

  // //3、获取UKEY证书内容
  // var signCert = SecCtrl.KS_GetCert(2)
  // if (SecCtrl.KS_GetLastErrorCode() != 0) {
  //   // message.notifyError('请插入含证书的UKEY')
  //   // return false
  // }
  // //4、UKEY数字签名
  // var signD = SecCtrl.KS_SignData(strOrgData, hashAlg)

  // //将以上签名原文（strOrgData）、数字证书（signCert）、签名值（signD）传到后台给到签名验证接口进行验证
  // /*
  //   如需从UKEY中获取用户身份信息，可通过以下函数获取：证书使用者（即用户姓名）、证书序列号和用户身份证号
  //   如果不需要，以下函数可不需要调用
  // */
  // //获取证书使用者（即用户姓名）（在证书管理工具的查看证书信息界面可以查看）
  // let commname = SecCtrl.KS_GetCertInfo(signCert, 17)
  // // alert('证书使用者（即用户姓名）：' + commname)
  // ukeyName.value = commname
  // //获取用户身份证号（在证书管理工具的查看证书信息界面可以查看）
  // //返回值中‘SF0’字符以后内容为用户身份证号
  // let strOID = SecCtrl.KS_GetCertInfoByOid(signCert, '1.2.156.112570.148') //根据证书模板确定OID参数值
  // if (SecCtrl.KS_GetLastErrorCode() != 0) {
  //   // alert(
  //   //   'KS_GetCertInfoByOid error：' +
  //   //     SecCtrl.KS_GetLastErrorCode() +
  //   //     '\n' +
  //   //     SecCtrl.KS_GetLastErrorMsg()
  //   // )
  //   return
  // }
  // // OID.value = strOID

  // //截取唯一标识号'SF0'之后内容，即身份证号
  // let idno = strOID.substring(strOID.indexOf('SF0') + 3)
  // ukeyId.value = idno
  // // alert('截取[' + strOID + ']中SF0之后内容即为身份证号：' + idno)
  // ukeyInfo.value = ukeyName.value + '/' + ukeyId.value

  // if (ukeyName.value != '' && ukeyId.value != '') {
  //   isUkeyVisiable.value = true
  // }
}
const selectCert = () => {
  SelectCert(
    'certbase64id',
    'certCNid',
    'certOid',
    'certDNid',
    'certkeyid',
    'certStartTime',
    'certEndTime',
    'certKZ',
    'certSN',
    CAInfoCallback
  )
}
const CAInfoCallback = (res) => {
  if (res == 0) {
    message.success('获取key信息成功')
    getSealPicBase64('certSN', 'sealImg', baseCallBack)
  } else {
    message.warning('请插入Ukey或者Ukey读取失败')
    return false
  }
}
// 获取base64回调
const signBase64 = ref<string>('')
const signBase64Img = ref<string>('')
const baseCallBack = (res) => {
  signBase64.value = document.getElementById('sealImg')!.value
  if (signBase64.value) {
    signBase64Img.value = `data:image/jpg;base64,${signBase64.value}`
  }
}
const handleCASign = () => {
  checkCertPin('CertPin', 'certDNid', caLogin)
}
const caLogin = async () => {
  const data = qs.stringify({
    // appcode: '1101',
    certtype: 'CertSC',
    certCNid: document.getElementById('certCNid')!.value,
    certOid: document.getElementById('certOid')!.value,
    certDNid: document.getElementById('certDNid')!.value,
    certkeyid: document.getElementById('certkeyid')!.value,
    certStartTime: document.getElementById('certStartTime')!.value,
    certEndTime: document.getElementById('certEndTime')!.value,
    certKZ: document.getElementById('certKZ')!.value,
    certSN: document.getElementById('certSN')!.value,
    signcert: document.getElementById('certbase64id')!.value,
    sealImg: document.getElementById('sealImg')!.value,
    CertPin: certPin.value,
    sourcedata: document.getElementById('sourcedata')!.value,
    signdata: document.getElementById('signdata')!.value
  })
  calogin(data).then(function (res) {
    if (res.data === '0') {
      LoginApi.loginWithUKey({
        empNo: document.getElementById('certKZ')!.value
      })
        .then((res) => {
          authUtil.setToken(res)
          if (signBase64Img.value) {
            LoginApi.saveSignWithUKey({
              empNo: document.getElementById('certKZ')!.value,
              ukeySignValue: signBase64Img.value
            })
              .then((res) => {
                userStore.setSignBase64Img(signBase64Img.value)
              })
              .catch(() => {})
          }
          if (!redirect.value) {
            redirect.value = '/'
          }
          push({ path: redirect.value || permissionStore.addRouters[0].path })
            .then(() => {
              loginLoading.value = false
            })
            .catch(() => {
              authUtil.removeLoginForm()
              authUtil.removeToken()
              loginLoading.value = false
            })
        })
        .catch(() => {})
    } else {
      message.warning('ukey密码有误')
      return
    }
  })
}
const getQrcodeImg = async () => {
  clearInterval(intervalTimer)
  LoginApi.getQrcode()
    .then((res) => {
      let result = JSON.parse(res)
      qrCodeImg.value = 'data:image/jpg;base64,' + result.data.qrcode
      intervalTimer = setInterval(() => {
        watchScanQrCode()
      }, 3000)
    })
    .catch((err) => {
      loadText.value = '二维码加载失败'
    })
}
const throttleRefreshQrcode = () => {
  let currentTimestamp = new Date().getTime()
  if (!throttleTimestamp.value || currentTimestamp - throttleTimestamp.value > 2 * 1000) {
    getQrcodeImg()
    throttleTimestamp.value = currentTimestamp
  }
}
const watchScanQrCode = async () => {
  LoginApi.getQrcodeLogin().then((res) => {
    if (res) {
      clearInterval(intervalTimer)
      handleLogin(res)
    }
  })
}
// 通过URL跳转登录的逻辑
// 外部逻辑

/* import { useUserStore } from '@/store/modules/user'
import { useTagsViewStore } from '@/store/modules/tagsView'
const tagsViewStore = useTagsViewStore()
const userStore = useUserStore()

const handleExtract = () => {
  ElMessageBox.confirm('是否退出本系统？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      console.log('logout api')
      await userStore.loginOut()
      tagsViewStore.delAllViews()
      userStore.setWardName('')

      // Base64 编码参数
      const username = btoa('1111') // Base64 编码用户名
      const password = btoa('1111') // Base64 编码密码

      // 新标签打开登录页并携带 Base64 参数
      const loginUrl = `http://192.168.1.85/#/login?username=${username}&password=${password}`
      window.open(loginUrl, '_blank')
    })
    .catch(() => {})
} */
// 内部逻辑
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  const encodedUser = route.query.username as string
  const encodedPass = route.query.password as string

  if (encodedUser && encodedPass) {
    const username = atob(encodedUser)
    const password = atob(encodedPass)

    // 填充表单并自动登录
    loginData.loginForm.username = username
    loginData.loginForm.password = password
    handleLogin()
  }
})
</script>

<style lang="scss" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
:deep(.el-input__wrapper) {
  background-color: #f5f6fb;
  box-shadow: 0 0 0 0 !important;
}
.login-code {
  width: 100%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    width: 100%;
    max-width: 100px;
    height: auto;
    vertical-align: middle;
  }
}
.submit-button {
  background-color: #3473d1;
  color: #fff;
  padding: 4px 0;
}
.ukeyText {
  margin-left: 15px;
  color: #3473d1;
}
.ca-input {
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  background: #fff;
}
:deep(.ca-input .el-input__wrapper) {
  background: #fff !important;
}
:deep(.imgTitle .el-form-item__content),
:deep(.loginType .el-form-item__content),
:deep(.loginBtn .el-form-item__content) {
  justify-content: center !important;
}
.formWrap {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 21px 0 #2352e71f;
}
</style>
