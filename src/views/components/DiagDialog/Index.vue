<template>
  <Dialog
    :model-value="props.visible"
    v-bind="props"
    width="600px"
    max-height="600px"
    :fullscreen="false"
    :close-on-click-modal="false"
  >
    <template #title>
      <div class="dialog-title">诊断列表</div>
    </template>
    <div>
      <section class="flex mb-16px">
        <span class="!text-red-500">关键字：</span>
        <el-input
          placeholder="请输入关键字"
          size="small"
          class="!w-180px"
          :model-value="diagDictKey"
          @input="onChangeDiagList"
        />
        <span class="ml-8px !text-red-500">{{ diagTypeDesc }}</span>
      </section>
      <section class="max-h-400px overflow-scroll">
        <el-table
          ref="diagDialogTableRef"
          :data="diagXList"
          border
          style="width: 100%"
          row-class-name="cursor-pointer"
          @row-dblclick="dblclickDict"
          max-height="380"
        >
          <el-table-column :resizable="false" type="index" width="50" />

          <el-table-column
            :resizable="false"
            v-for="item in diagXTableColumns"
            :key="item.dataCol"
            :prop="item.dataCol"
            :label="item.dataTitle"
          />
        </el-table>
      </section>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { DiagDictProps, DiagColumnProps } from '@/api/outpatient/unitDict/types'
import { getDictByConfig } from '@/api/outpatient/unitDict/index'
// import usePatientListStore from '@/store/modules/Outpatient/patientList'
import emitter from '@/utils/mitt'
// import { EventTypes } from '@/views/Outpatient/EMR/types'

const patientListStore = usePatientListStore()
const props = defineProps({
  visible: propTypes.bool.def(false),
  diagType: propTypes.number.def(1)
})

const diagTypeDesc = computed(() => (props.diagType === 1 ? '西医诊断' : '中医诊断'))

const diagDictKey = ref('')
const diagXList = ref<DiagDictProps[]>([])
const diagXTableColumns = ref<DiagColumnProps[]>([])

const onChangeDiagList = (val) => {
  diagDictKey.value = val

  getDictByConfig({
    dictType: props.diagType === 1 ? '西医诊断' : '中医诊断',
    keyWord: val
  }).then((res) => {
    diagXList.value = [...res]
  })
}

const dblclickDict = (row) => {
  emitter.emit(EventTypes.setDiagFromDialog, {
    diagnosisName: row.diagnosisName,
    diagnosisCode: row.diagnosisCode
  })
  diagDictKey.value = ''
}

const onInitPage = () => {
  diagDictKey.value = ''
  diagXList.value = []
  // 获取列
  diagXTableColumns.value =
    props.diagType === 1 ? patientListStore.getDiagColumns : patientListStore.getCDiagColumns
}

watch(() => props.diagType, onInitPage)

onMounted(onInitPage)
</script>

<style scoped lang="scss"></style>
