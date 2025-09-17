<template>
  <section class="record-form-block" :style="{ width: width }">
    <div class="record-form-label">{{ props.label }}</div>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  label: propTypes.string,
  width: propTypes.string
})
</script>

<style lang="scss" scoped>
.record-form-block {
  display: flex;
  //   justify-content: flex-end;
  width: 25%;
  align-items: center;
  .record-form-label {
    flex-shrink: 0;
    margin-right: 4px;
    width: 90px;
    text-align: right;
    flex-shrink: 0;
  }
}
</style>
