<template>
  <div
    :class="prefixCls"
    class="h-[100%] relative <xl:bg-v-dark <sm:px-10px <xl:px-10px <md:px-10px login-box"
  >
    <!-- <img
      src="@/assets/login/logo-name.png"
      alt=""
      class="fixed top-30px left-30px w-176px h-41px z-100"
    /> -->
    <div class="relative h-full flex">
      <!-- <section :class="`${prefixCls}__left flex-1 max-w-655px relative <xl:hidden`">
        <el-carousel class="w-full h-screen" arrow="never">
          <el-carousel-item class="!h-screen" v-for="item in images" :key="item.id">
            <img alt="" class="w-full h-screen login-bg" :src="item.bg" />
            <div
              class="absolute left-0 top-0 w-full flex-col !h-screen flex items-center justify-center z-100"
            >
              <section class="w-468px text-white login-title">
                <div v-for="t in item.title" :key="t">{{ t }}</div>
              </section>
              <section class="w-468px pr-40px login-desc mt-2px">{{ item.desc }}</section>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section> -->
      <section class="p-30px <sm:p-10px dark:bg-v-dark relative rightWrap">
        <!-- 右边的登录界面 -->
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div
            class="h-full flex items-center w-[100%] @2xl:max-w-500px @xl:max-w-500px @md:max-w-500px @lg:max-w-500px"
          >
            <!-- 账号登录 -->
            <LoginForm class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)" />
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { LoginForm } from './components'

const images = [
  {
    id: '1',
    bg: new URL(`../../assets/login/bg0.png`, import.meta.url).href,
    title: ['智慧医院', '体检管理解决方案'],
    desc: '智慧医院体检管理解决方案，流程智控、资源优配、报告速达、质控闭环，全面提升体检效率与健康管理水平！'
  }
]

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('login')
</script>

<style lang="scss" scoped>
.login-box {
  background: url('@/assets/login/logo-box.png') center center no-repeat;
  background-size: 100% 100%;
}

.redborder {
  border: 1px solid red;
}

.login-bg {
  object-fit: cover;
}
.login-title {
  color: #ffffffff;
  font-size: 56px;
  font-weight: 700;
  font-family: 'OPPOSans';
  text-align: left;
  position: relative;
  top: -6px;
}
.login-desc {
  color: #ffffffff;
  font-size: 20px;
  font-weight: 400;
  font-family: 'OPPOSans';
  text-align: left;
}
$prefix-cls: #{$namespace}-login;

.#{$prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      // background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
.rightWrap {
  display: flex;
  justify-content: right;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 350px;
  // background-image: url('@/assets/login/bg1.png');
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
</style>
