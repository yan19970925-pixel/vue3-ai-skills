<template>
  <div class="flex">
    <section v-for="item in flowData" :key="item.flow" class="flex items-start">
      <Line v-if="item.flow > 0" :alive="item.flow <= props.flow" />
      <Card :icon="item.icon" :text="item.text" :alive="item.flow <= props.flow" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import Card from './Card.vue'
import Line from './Line.vue'
import icon0 from '@/assets/flowline/icon0.svg'
import icon1 from '@/assets/flowline/icon1.svg'
import icon2 from '@/assets/flowline/icon2.svg'
import icon3 from '@/assets/flowline/icon3.svg'
import icon4 from '@/assets/flowline/icon4.svg'

const props = defineProps({
  flow: propTypes.number
})

const flowData = [
  { flow: 0, icon: icon0, text: '填写申请单' },
  { flow: 1, icon: icon1, text: '标本已采集' },
  { flow: 2, icon: icon2, text: '标本已接收' },
  { flow: 3, icon: icon3, text: '已计费' },
  { flow: 4, icon: icon4, text: '已出报告' }
]
</script>

<style lang="scss" scoped></style>
