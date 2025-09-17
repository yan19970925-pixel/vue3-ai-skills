<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { ElementPlusSize } from '@/types/elementPlus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const { variables } = useDesign()

const appStore = useAppStore()

const props = defineProps({
  size: propTypes.oneOf<ElementPlusSize>(['default', 'small', 'large']).def('default')
})

provide('configGlobal', props)

// 初始化所有主题色
onMounted(() => {
  appStore.setCssVarTheme()
})
</script>

<template>
  <ElConfigProvider
    :namespace="variables.elNamespace"
    :locale="zhCn"
    :message="{ max: 1 }"
    :size="size"
  >
    <slot></slot>
  </ElConfigProvider>
</template>
