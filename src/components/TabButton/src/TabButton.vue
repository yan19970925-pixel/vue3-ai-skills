<template>
  <div class="flex">
    <section
      v-for="item in props.data"
      :key="item.id"
      class="cursor-pointer tabbutton-item"
      :class="[
        { 'checked-item': checkedId === item.id },
        { [props.checkedClass]: checkedId === item.id }
      ]"
      @click="$emit('changeTab', item.id)"
      >{{ item.text }}
    </section>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { TabButtonProps } from '../Index'

//

const props = defineProps({
  checkedId: propTypes.string.def('0'),
  data: {
    type: Array as PropType<TabButtonProps[]>,
    default: () => []
  },
  checkedClass: propTypes.string
})
</script>

<style scoped lang="scss">
.tabbutton-item {
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid transparent;
}
.tabbutton-item + .tabbutton-item {
  margin-left: 24px;
}

.checked-item {
  color: #3263fe;
  border-bottom: 2px solid #3263fe;
}
</style>
