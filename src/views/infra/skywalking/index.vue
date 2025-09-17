<template>
  <ContentWrap>
    <IFrame :src="src" />
  </ContentWrap>
</template>
<script setup lang="ts" name="Skywalking">
import { getConfigKey } from '@/api/infra/config/index'
const src = ref('')
onMounted(async () => {
  src.value = await getConfigKey('infra.skywalkingAddr')
})
</script>
