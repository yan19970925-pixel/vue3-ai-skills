<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
// types
export interface Props {
  horizontal?: boolean
  ratio?: string
}

// varibles
const props = withDefaults(defineProps<Props>(), {
  horizontal: false
})
const emit = defineEmits(['submitSet'])

const one = ref<HTMLElement>()
const two = ref<HTMLElement>()
const [initGrow1, initGrow2] = parseRatio(props.ratio as string)

// states
const grow1 = ref(initGrow1)
const grow2 = ref(initGrow2)
const isOpen = ref(false)

// methods
function parseRatio(ratio: string): [number, number] {
  // ratio: strings like "1/2"
  const rn = ratio
    ?.split('/')
    ?.map(Number)
    ?.filter((val) => !isNaN(val))

  if (!rn || rn.length !== 2) {
    return [1, 1]
  }

  return rn as [number, number]
}

// 设置拖动
function setResize(row, item) {
  isOpen.value = row
  if (row) {
    grow1.value = 62
    grow2.value = 38
  } else {
    grow1.value = item
    grow2.value = 100 - item
  }
}

function startResize(mde: MouseEvent) {
  one.value?.classList.add('forbid-select')
  two.value?.classList.add('forbid-select')

  const initialPos = props.horizontal ? mde.clientY : mde?.clientX
  const sizeOne = props.horizontal ? one?.value?.offsetHeight : one?.value?.offsetWidth
  const sizeTwo = props.horizontal ? two?.value?.offsetHeight : two?.value?.offsetWidth

  function handleMouseMove(mme: MouseEvent) {
    two.value?.classList.remove('closeInsertBox') //拖动开始删除动画类名
    // forbid select

    let pos = props.horizontal ? mme.clientY : mme?.clientX
    let newSizeOne = sizeOne! + pos - initialPos

    const totalGrow = grow1.value + grow2.value
    grow1.value = totalGrow * (newSizeOne / (sizeOne! + sizeTwo!))
    grow2.value = totalGrow - grow1.value
  }

  function handleMouseUp(mue: MouseEvent) {
    two.value?.classList.add('closeInsertBox') //拖动结束添加动画类名
    if (grow2.value < 20) {
      ElMessageBox.confirm('当前面板展示高度不足，是否关闭', '提示', {
        showCancelButton: false,
        closeOnClickModal: false,
        showClose: false,
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          emit('submitSet')
        })
        .catch(() => {})
    }
    one.value?.classList.remove('forbid-select')
    two.value?.classList.remove('forbid-select')

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
defineExpose({ setResize })
</script>

<template>
  <div class="split2" :class="{ horizontal }">
    <div class="sub2" ref="one" :style="{ flexGrow: grow1 }">
      <slot name="one"></slot>
    </div>
    <div v-if="isOpen" class="resizer2" @mousedown="startResize"></div>
    <div class="closeInsertBox sub2" ref="two" :style="{ flexGrow: grow2 }">
      <slot name="two"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forbid-select {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.split2 {
  width: 100%;
  height: 100%;
  display: flex;

  .resizer2 {
    width: 3px;
    background-color: #ddd;
    cursor: w-resize;
    transition: 0.3s;

    &:hover {
      background-color: #999;
    }
  }
  .closeInsertBox {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-basis: 0%;
    align-items: stretch;
    align-content: stretch;
    overflow-y: auto;
    overflow-x: hidden;
    transition: 0.3s all ease;
    animation-duration: 3s;
  }

  .sub2 {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-basis: 0%;
    align-items: stretch;
    align-content: stretch;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #666;
    }

    scrollbar-width: thin;
  }

  &.horizontal {
    flex-direction: column;

    .resizer2 {
      height: 3px;
      width: 100%;
      cursor: n-resize;
    }
  }
}
</style>
