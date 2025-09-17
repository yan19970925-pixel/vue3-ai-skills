<template>
  <div class="flow-line-row">
    <section class="line" :class="{ 'line-alive': props.alive }"></section>
    <img alt="" :src="props.alive ? iconArrowAlive : iconArrow" class="arrow" />
    <section class="line" :class="{ 'line-alive': props.alive }"></section>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import iconArrowAlive from '@/assets/flowline/arrow-live.svg'
import iconArrow from '@/assets/flowline/arrow.svg'

const props = defineProps({
  alive: propTypes.bool
})
</script>

<style lang="scss" scoped>
.flow-line-row {
  display: flex;
  align-items: center;
  .arrow {
    width: 21px;
    height: 21px;
  }
  .line {
    width: 60px;
    height: 2px;
    opacity: 1;
    background: #3263fe33;
  }
  .line-alive {
    background: #3263feff;
  }
}
</style>
