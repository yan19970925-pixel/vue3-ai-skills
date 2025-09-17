<template>
  <div @click="$emit('onClick')" class="border-button">
    <img v-if="!!props.icon" alt="" :src="props.icon" class="btn-icon" />
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  text: propTypes.string.def('确定'),
  icon: propTypes.string.def('')
})
</script>

<style scoped lang="scss">
.border-button {
  display: flex;
  min-width: 50px;
  height: 22px;
  padding: 2px 5px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #3263fe;
  background: #fff;
  color: #3263fe;
  font-family: 'Arial';
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
  margin-left: 4px;
  .btn-icon {
    width: 12px;
    height: 12px;
  }
}
</style>
