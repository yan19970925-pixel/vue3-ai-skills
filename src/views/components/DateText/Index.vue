<template>
  <section style="position: relative">
    <div class="date-text-container">
      <section class="date-text-row">
        <input
          type="text"
          const
          ref="txtDateRef"
          @keydown="onKeydown"
          @keyup="onKeyup"
          @input="onInput"
          @blur="onBlur"
          @click="onClick"
          v-model="txtDate"
          :readonly="props.readonly"
          :disabled="props.disabled"
          maxlength="19"
          :class="['date-text', { 'date-text-error': isError }, props.textClass]"
        />
        <slot>
          <el-popover
            placement="bottom"
            :width="250"
            ref="dateTextPopover"
            popper-class="!pl-0 !pr-0 !pb-0px !pt-0px"
            trigger="click"
            :fallback-placements="['top', 'bottom']"
          >
            <section :class="['date-picker-container', { showDate: isShow }]">
              <VDatePicker v-model="date" @dayclick="onDayClick" /> </section
            ><template #reference>
              <img
                v-if="props.showIcon"
                src="./calendar.svg"
                class="date-text-calendar"
                :class="props.iconClass" /></template
          ></el-popover>
        </slot>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  textClass: String,
  iconClass: String,
  value: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  customParameters: {
    type: Object,
    required: false
  }
})
const preValue = ref('')
const txtDate = ref<any>(props.value)
const txtDateRef = ref()
const isError = ref(false)
const isBackspace = ref(false)
const date = ref(new Date())
const isShow = ref(false)
const dateTextPopover = ref({ hide: () => {} })
const emit = defineEmits(['callback'])

function isValidDate(time: string) {
  var regex = /^\d{4}-[0-1][0-2]-[0-3]\d$/
  return regex.test(time)
}

function isValidDateTime(datetime: string) {
  if (props.format === 'YYYY-MM-DD') {
    var regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(datetime)
  } else {
    var regex = /^\d{4}-\d{2}-\d{2} (?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
    return regex.test(datetime)
  }
}

const onKeydown = (e) => {
  // 记录按的是否删除键
  isBackspace.value = e.key === 'Backspace'
  // 记录输入前的值
  preValue.value = e.target.value
}

const onKeyup = (e) => {
  // 记录按的是否删除键
  isBackspace.value = e.key === 'Backspace'
  if (isBackspace.value) {
    txtDate.value = e.target.value
    if (props.format == 'YYYY-MM-DD HH:mm:ss') {
      emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
    } else {
      txtDate.value = txtDate.value.slice(0, 10)
      emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
    }
  }
}

const onInput = (e) => {
  const val = e.target!.value
  if (val.length === 0) {
    txtDate.value = ''
    isError.value = false
    return
  }
  const { selectionStart } = e.target
  if (!isBackspace.value) {
    const reg = /^[1-9][0-9]{0,3}[0-9-\s:]*$/
    if (reg.test(val)) {
      if (selectionStart === val.length) {
        const allNumber = val.replace(/[-\s:]/g, '')
        let year = ''
        let month = ''
        let day = ''
        let hour = ''
        let minute = ''
        if (allNumber.length === 4) {
          year = allNumber.substring(0, 4)
          txtDate.value = `${year}-`
        }
        if (allNumber.length === 6) {
          year = allNumber.substring(0, 4)
          month = allNumber.substring(4, 6)
          txtDate.value = `${year}-${month}-`
        }
        if (allNumber.length === 8) {
          year = allNumber.substring(0, 4)
          month = allNumber.substring(4, 6)
          day = allNumber.substring(6, 8)
          txtDate.value = `${year}-${month}-${day}`
        }
        if (allNumber.length === 9) {
          year = allNumber.substring(0, 4)
          month = allNumber.substring(4, 6)
          day = allNumber.substring(6, 8)
          hour = allNumber.substring(8, 9)
          txtDate.value = `${year}-${month}-${day} ${hour}`
        }
        if (allNumber.length === 10) {
          year = allNumber.substring(0, 4)
          month = allNumber.substring(4, 6)
          day = allNumber.substring(6, 8)
          hour = allNumber.substring(8, 10)
          txtDate.value = `${year}-${month}-${day} ${hour}:`
        }
        if (allNumber.length === 12) {
          year = allNumber.substring(0, 4)
          month = allNumber.substring(4, 6)
          day = allNumber.substring(6, 8)
          hour = allNumber.substring(8, 10)
          minute = allNumber.substring(10, 12)
          txtDate.value = `${year}-${month}-${day} ${hour}:${minute}:`
        }
        if (allNumber.length === 13 || allNumber.length === 14) {
          // 判断是否有冒号
          if (
            allNumber.length === 13 &&
            txtDate.value?.substring(txtDate.value.length - 1) !== ':'
          ) {
            year = allNumber.substring(0, 4)
            month = allNumber.substring(4, 6)
            day = allNumber.substring(6, 8)
            hour = allNumber.substring(8, 10)
            minute = allNumber.substring(10, 12)
            let sec = allNumber.substring(12)
            txtDate.value = `${year}-${month}-${day} ${hour}:${minute}:${sec}`
          } else {
            txtDate.value = val
          }
        }
      } else {
        txtDate.value = val
      }
    } else {
      txtDate.value = preValue.value
      if (preValue.value.length === 0) {
        isError.value = false
      }
    }
  }
  if (txtDate.value) {
    if (props.format == 'YYYY-MM-DD HH:mm:ss') {
      isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
    } else {
      txtDate.value = txtDate.value.slice(0, 10)
      isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
    }
  }
  if (props.format == 'YYYY-MM-DD HH:mm:ss') {
    emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
  } else {
    txtDate.value = txtDate.value.slice(0, 10)
    emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
  }
}

const onBlur = (e) => {
  const val = e.target.value
  if (val) {
    isError.value = !(isValidDateTime(val) || isValidDate(val))
    if (isValidDate(val)) {
      txtDate.value = `${val} 00:00:00`
      // emit('callback', txtDate.value)
    }
    const regH = /^\d{4}-\d{2}-\d{2}\s\d{2}:$/
    if (regH.test(val)) {
      txtDate.value = `${val}00:00`
    }
    const regH1 = /^\d{4}-\d{2}-\d{2}\s\d{2}$/
    if (regH1.test(val)) {
      txtDate.value = `${val}:00:00`
    }
    const regM = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:$/
    if (regM.test(val)) {
      txtDate.value = `${val}00`
    }
    const regM1 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/
    if (regM1.test(val)) {
      txtDate.value = `${val}:00`
    }
    if (props.format == 'YYYY-MM-DD HH:mm:ss') {
      emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
      isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
    } else {
      txtDate.value = txtDate.value.slice(0, 10)
      emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
      isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
    }
  } else {
    isError.value = false
  }
}

const onClick = (e) => {
  isShow.value = false
  // 获取选中位置
  const selectStart = txtDateRef.value.selectionStart
  // 获取空格间隔位置
  const blankPosition: number = txtDate.value?.indexOf(' ')
  if (selectStart === 0 || selectStart === e.target.value.length) {
    txtDateRef.value.select()
  } else if (selectStart > 0 && selectStart <= blankPosition) {
    txtDateRef.value.setSelectionRange(0, blankPosition)
    isShow.value = true
  } else if (selectStart > blankPosition && selectStart < e.target.value.length) {
    txtDateRef.value.setSelectionRange(blankPosition + 1, e.target.value.length)
  }
}

const onDayClick = (calendar) => {
  date.value = calendar.id
  txtDate.value = `${calendar.id} ${dayjs(new Date()).format('HH:mm:ss')}`
  if (props.format == 'YYYY-MM-DD HH:mm:ss') {
    emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
  } else {
    txtDate.value = txtDate.value.slice(0, 10)
    emit('callback', txtDate.value, props.customParameters ? props.customParameters : null)
  }
  isShow.value = false
  nextTick(() => {
    txtDateRef.value.focus()
    // 获取空格间隔位置
    const blankPosition: number = txtDate.value?.indexOf(' ')
    txtDateRef.value.setSelectionRange(blankPosition + 1, 19)
  })
  dateTextPopover.value.hide()
}

const onShowCalendar = () => {
  if (!props.disabled && !props.readonly) {
    isShow.value = !isShow.value
  }
}

watch(
  () => props.value,
  () => {
    txtDate.value = props.value
  }
)
</script>

<style scoped>
.date-text-container {
  position: relative;
}
.date-text-row {
  display: flex;
  .date-text-calendar {
    margin-top: 2px;
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}
.date-picker-container {
  /* margin-top: 8px; */
  z-index: 99999;
  /* position: absolute; */
  /* display: none; */
}
.showDate {
  display: block;
}
.date-text {
  border-radius: 5px;
  border: 1px solid rgb(220, 223, 230);
  padding: 4px 8px;
  &:focus {
    outline: none;
  }
}
.date-text-error {
  border: 1px solid red;
  &:focus {
    outline: 1px solid red;
  }
}
</style>
<style>
:deep(.vc-bordered) {
  border-radius: 0px !important;
  border: none !important;
}
</style>
