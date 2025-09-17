<template>
  <section>
    <div class="date-text-container">
      <el-popover
        placement="bottom-start"
        title=""
        :width="280"
        trigger="click"
        :visible="isShow"
        class="date-picker-container"
      >
        <template #reference>
          <section class="date-text-row">
            <input
              type="text"
              const
              ref="txtDateRef"
              @keydown="onKeydown"
              @keyup="onKeyup"
              @input="onInput"
              @blur="
                (e) => {
                  handleClick(e)
                }
              "
              @click="onClick"
              v-model="txtDate"
              :readonly="props.readonly"
              :disabled="props.disabled"
              :maxlength="maxlength"
              :class="[
                'date-text',
                {
                  'date-text-error': isError,
                  'date-text-weight': maxlength == 19 ? true : false
                },
                props.textClass
              ]"
            />
            <slot>
              <el-icon
                class="el-input__icon date-text-calendar"
                v-if="props.showIcon"
                @click="onShowCalendar"
                ><calendar
              /></el-icon>
              <!-- <img
                v-if="props.showIcon"
                src="./calendar.svg"
                class="date-text-calendar"
                @click="onShowCalendar"
                :class="props.iconClass"
              /> -->
            </slot>
          </section>
        </template>
        <VDatePicker v-if="isShow" v-model="date" @dayclick="onDayClick" />
      </el-popover>
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
  clickBlank: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: 16
  }
})
const preValue = ref('')
const txtDate = ref<any>(props.value)
const txtDateRef = ref()
const isError = ref(false)
const isBackspace = ref(false)
const date = ref<any>(new Date())
const isShow = ref(false)

const emit = defineEmits(['callback'])

function isValidDate(time: string) {
  var regex = /^\d{4}-[0-1][0-2]-[0-3]\d$/
  return regex.test(time)
}

function isValidDateTime(datetime: string) {
  var regex =
    props.maxlength === 19
      ? /^\d{4}-\d{2}-\d{2} (?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
      : /^\d{4}-\d{2}-\d{2} (?:2[0-3]|[01][0-9]):[0-5][0-9]$/

  return regex.test(datetime)
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
    emit('callback', txtDate.value)
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
          txtDate.value = `${year}-${month}-${day} ${hour}:${minute}`
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
    isError.value = !(isValidDateTime(val) || isValidDate(val))
  }
  emit('callback', txtDate.value)
}
const handleClick = (e) => {
  if (props.maxlength === 19) {
    onBlur(e)
  } else {
    onBlur2(e)
  }
}
const onBlur = (e) => {
  const val = e.target.value
  if (val) {
    isError.value = !(isValidDateTime(val) || isValidDate(val))
    // 输入年月日
    if (isValidDate(val)) {
      txtDate.value = `${val} 00:00:00`
      // emit('callback', txtDate.value)
    }
    // 年月日 时:
    const regH = /^\d{4}-\d{2}-\d{2}\s\d{2}:$/
    if (regH.test(val)) {
      txtDate.value = `${val}00:00`
    }
    // 年月日 时
    const regH1 = /^\d{4}-\d{2}-\d{2}\s\d{2}$/
    if (regH1.test(val)) {
      txtDate.value = `${val}:00:00`
    }
    // 年月日 时 1位
    const regH2 = /^\d{4}-\d{2}-\d{2}\s\d{1}$/
    if (regH2.test(val)) {
      txtDate.value = `${val.substring(0, 11)}0${val.substring(11, 12)}:00:00`
    }
    // 年月日 时:分:
    const regM = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:$/
    if (regM.test(val)) {
      txtDate.value = `${val}00`
    }
    // 年月日 时:分
    const regM1 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/
    if (regM1.test(val)) {
      txtDate.value = `${val}:00`
    }
    // 年月日 时:分  1位
    const regM2 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{1}$/
    if (regM2.test(val)) {
      txtDate.value = `${val.substring(0, 14)}0${val.substring(14, 15)}:00`
    }
    // 年月日 时:分:秒  1位
    const regM3 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{1}$/
    if (regM3.test(val)) {
      txtDate.value = `${val.substring(0, 17)}0${val.substring(17, 18)}`
    }
    emit('callback', txtDate.value)
    isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
  } else {
    isError.value = false
  }
}
const onBlur2 = (e) => {
  const val = e.target.value
  if (val) {
    isError.value = !(isValidDateTime(val) || isValidDate(val))
    // 输入年月日
    if (isValidDate(val)) {
      txtDate.value = `${val} 00:00`
      // emit('callback', txtDate.value)
    }
    // 年月日 时:
    const regH = /^\d{4}-\d{2}-\d{2}\s\d{2}:$/
    if (regH.test(val)) {
      txtDate.value = `${val}00`
    }
    // 年月日 时
    const regH1 = /^\d{4}-\d{2}-\d{2}\s\d{2}$/
    if (regH1.test(val)) {
      txtDate.value = `${val}:00`
    }
    // 年月日 时 1位
    const regH2 = /^\d{4}-\d{2}-\d{2}\s\d{1}$/
    if (regH2.test(val)) {
      txtDate.value = `${val.substring(0, 11)}0${val.substring(11, 12)}:00`
    }
    // 年月日 时:分:
    const regM = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:$/
    if (regM.test(val)) {
      txtDate.value = `${val}00`
    }
    // 年月日 时:分
    const regM1 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/
    if (regM1.test(val)) {
      txtDate.value = `${val}`
    }
    // 年月日 时:分  1位
    const regM2 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{1}$/
    if (regM2.test(val)) {
      txtDate.value = `${val.substring(0, 14)}0${val.substring(14, 15)}`
    }
    emit('callback', txtDate.value)
    isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
  } else {
    isError.value = false
  }
}

const onClick = (e) => {
  if (props.readonly) {
    return
  }
  e.stopPropagation() // 阻止事件冒泡，避免同时触发 document 的 click 事件
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
  txtDate.value =
    props.maxlength === 19
      ? `${calendar.id} ${dayjs(new Date()).format('HH:mm:ss')}`
      : `${calendar.id} ${dayjs(new Date()).format('HH:mm')}`
  emit('callback', txtDate.value)
  isShow.value = false
  nextTick(() => {
    txtDateRef.value.focus()
    // 获取空格间隔位置
    const blankPosition: number = txtDate.value?.indexOf(' ')
    txtDateRef.value.setSelectionRange(blankPosition + 1, 19)
  })
}
const onShowCalendar = (e) => {
  e.stopPropagation() // 阻止事件冒泡，避免同时触发 document 的 click 事件
  if (!props.disabled && !props.readonly) {
    isShow.value = !isShow.value
  }
}
watch(
  () => props.value,
  () => {
    txtDate.value = props.value
    if (txtDate.value) {
      isError.value = !(isValidDateTime(txtDate.value) || isValidDate(txtDate.value))
    } else {
      isError.value = false
    }
  }
)
watch(
  () => props.clickBlank,
  () => {
    if (isShow.value) {
      isShow.value = false
    }
  },
  {
    deep: true
  }
)
watch(
  () => isShow.value,
  () => {
    if (isShow.value) {
      date.value = props.value ? props.value : new Date()
    }
  },
  {
    deep: true
  }
)
</script>

<style scoped>
.date-text-container {
  /* position: fixed; */
}
.date-text-row {
  display: flex;
  font-size: 13px;
  .date-text-calendar {
    margin-top: 2px;
    width: 28px;
    height: 28px;
    margin-left: -28px;
    z-index: 2;
    font-size: 16px;
    cursor: pointer;
  }
}
.date-picker-container {
  margin-top: 8px;
  height: 600px;
  z-index: 999999;
}
.date-text {
  border-radius: 5px;
  z-index: 1;
  width: 145px;
  border: 1px solid rgb(220, 223, 230);
  padding: 4px 8px;
  &:focus {
    outline: none;
  }
}
.date-text-weight {
  width: 165px !important;
}
.date-text-error {
  border: 1px solid red;
  &:focus {
    outline: 1px solid red;
  }
}
</style>
