<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('footer')
</script>

<template>
  <div
    :class="prefixCls"
    class="fixed w-screen bottom-0 text-center text-[var(--el-text-color-placeholder)] bg-[var(--app-contnet-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)] dark:bg-[var(--el-bg-color)]"
    style="margin-top: -8px"
  >
    <p style="font-size: 14px">Copyright ©2023-河南方和信息科技有限公司</p>
  </div>
</template>
