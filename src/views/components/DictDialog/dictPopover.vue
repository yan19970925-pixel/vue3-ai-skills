<template>
  <el-popover
    ref="popover"
    :visible="props.visible"
    placement="bottom-start"
    :virtual-ref="props.dictDialogRef"
    :width="props.width"
    trigger="click"
    virtual-triggering
  >
    <div v-click-outside="onClickOutside">
      <section class="flex justify-between">
        <div class="flex mb-16px">
          <span class="!text-red-500">关键字：</span>
          <el-input
            placeholder="请输入关键字"
            size="small"
            class="!w-160px"
            id="intSearch"
            :model-value="searchWord"
            :suffix-icon="Search"
            @input="onChangeDiagList"
          />
          <span class="ml-8px !text-red-500">{{ queryParams.dictType }}</span>
        </div>
        <div class="flex">
          <BorderButton text="刷新" @on-click="onRefresh" />
          <BorderButton text="显示" @on-click="onShow" />
          <BorderButton text="排序" @on-click="onSort" />
        </div>
      </section>
      <section class="max-h-400px overflow-auto">
        <el-table
          ref="dictDialogTableRef"
          :data="tableData"
          border
          row-class-name="cursor-pointer"
          @row-dblclick="dblclickDict"
          :height="props.tableHeight"
          highlight-current-row
          @current-change="handleCurrentChange"
          @select="handleSelection"
        >
          <el-table-column v-if="isMultiple" type="selection" align="center" width="40px" />
          <el-table-column :resizable="false" type="index" width="50" />
          <el-table-column
            v-for="item in tableColumns"
            :key="item.dataCol"
            :prop="item.dataCol"
            :label="item.dataTitle"
            :width="`${Number(item.showWidth) / 4}px`"
          />
        </el-table>
      </section>
      <section class="flex justify-end mt-[8px]">
        <BorderButton text="取消" @on-click="onCancelMainDialog" />
        <BorderButton text="确定" @on-click="onSubmitMainDialog" />
        <BorderButton v-if="props.isEmpty" text="清空" @on-click="onEmptyMainDialog" />
      </section>
    </div>
  </el-popover>
  <Dialog
    :model-value="visibleEditDialog"
    :fullscreen="false"
    :close-on-click-modal="false"
    width="300px"
    class="dict-dialog"
    @close="() => (visibleEditDialog = false)"
  >
    <template #title>
      <div class="dict-dialog-title">{{ editDialogTitle }}</div>
    </template>
    <div>
      <el-table :data="columnsData" border style="width: 100%">
        <el-table-column prop="dataTitle" label="名称" />
        <el-table-column prop="flagShow" :label="dialogType === '1' ? '显示' : '排序'" width="80">
          <template #default="scope">
            <el-checkbox
              v-if="dialogType === '1'"
              :model-value="scope.row.flagShow === 'Y'"
              @change="onChangeShow(scope.row, $event)"
              label=""
              size="small"
            />
            <el-input v-else :model-value="scope.row.showSort" align="right" size="small" />
          </template>
        </el-table-column>
      </el-table>
      <section class="flex justify-end mt-[8px]">
        <BorderButton text="取消" @on-click="() => (visibleEditDialog = false)" />
        <BorderButton text="确定" @on-click="onSubmitSet" />
      </section>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { Search } from '@element-plus/icons-vue'
import { getDictByConfig, refreshRedisDict } from '@/api/outpatient/unitDict/index'
import { getDictSetting } from '@/api/outpatient/index'
import { IQueryPatams } from './Index'
import { DictSettingProps } from '@/api/outpatient/unitDict/types'
import BorderButton from '@/views/components/BorderButton/Index.vue'
import { ElTable } from 'element-plus'

const props = defineProps({
  visible: propTypes.bool.def(false),
  title: propTypes.string,
  isEmpty: propTypes.bool.def(false),
  isMultiple: propTypes.bool.def(false),
  selectedCode: propTypes.string,
  width: propTypes.string.def('600px'),
  maxHeight: propTypes.string.def('600px'),
  tableHeight: propTypes.string.def('380px'),
  isInput: propTypes.bool.def(false),
  inputValue: propTypes.string,
  dictDialogRef: propTypes.object,
  queryParams: {
    type: Object as PropType<IQueryPatams>,
    default: () => ({ dictType: '' })
  }
})
// 1:显示，2：排序
const dialogType = ref('1')

const emit = defineEmits(['callback', 'onClose', 'onEmpty', 'callbackList'])

const searchWord = ref('')
const tableData = ref<unknown[]>([])
const oldTableData = ref<unknown[]>([])
const allColumns = ref<DictSettingProps[]>([])
const tableColumns = ref<DictSettingProps[]>([])
const visibleEditDialog = ref(false)
const editDialogTitle = ref('列显示设置')
const columnsData = ref<DictSettingProps[]>([])
const currentRow = ref()
const dictDialogTableRef = ref<InstanceType<typeof ElTable>>()
// const selectionList = ref<any>([])
const selectedCodeList = ref<any>('')

const onChangeDiagList = (val) => {
  searchWord.value = val

  getDictByConfig({
    keyWord: val,
    counts: 100,
    ...props.queryParams
  }).then((res) => {
    if (res) {
      tableData.value = [...res]
      if (val === '') {
        oldTableData.value = [...res]
      }
      if (res.length > 0) {
        currentRow.value = res[0]
        dictDialogTableRef.value?.setCurrentRow(res[0])
      }
    }
  })
}
// 点击关闭弹出框
const onClickOutside = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement | SVGElement
  if (
    clickedElement.tagName.toLowerCase() === 'svg' ||
    clickedElement.tagName.toLowerCase() === 'input'
  ) {
    return
  }
  if (props.visible) {
    emit('onClose')
  }
}

const dblclickDict = (row) => {
  searchWord.value = ''
  emit('callback', row)
  emit('onClose')
}

const handleCurrentChange = (val) => {
  currentRow.value = val
}
const handleSelection = (val, row) => {
  const selectedCode = selectedCodeList.value ? selectedCodeList.value.split(',') : []
  if (selectedCode.length && selectedCode.indexOf(row.itemCode) != -1) {
    selectedCode.splice(selectedCode.indexOf(row.itemCode), 1)
  } else {
    selectedCode.push(row.itemCode)
  }
  selectedCodeList.value = selectedCode.join(',')
}

const onCancelMainDialog = () => {
  emit('onClose')
}
const onSubmitMainDialog = () => {
  if (props.isMultiple) {
    const selectedCode = selectedCodeList.value ? selectedCodeList.value.split(',') : []
    const newSelectedCode: any = []
    const itemNameList = oldTableData.value.filter((item: any) => {
      if (selectedCode.includes(item.itemCode)) {
        newSelectedCode.push(item.itemCode)
        return item
      }
    })
    const selection = ref<any>({
      itemCode: newSelectedCode.join(','),
      itemName: itemNameList.map((item: any) => item.itemName).join(',')
    })
    emit('callbackList', selection.value)
  } else {
    emit('callback', currentRow.value)
  }
  emit('onClose')
}

const onEmptyMainDialog = () => {
  emit('onEmpty', currentRow.value)
  emit('onClose')
}

const onRefresh = () => {
  refreshRedisDict({ dictType: props.queryParams.dictType }).then(() => {
    onChangeDiagList(searchWord.value)
    ElMessage.success('刷新成功')
  })
}

const onChangeShow = (row, val) => {
  row.flagShow = val ? 'Y' : 'N'
}

const onShow = () => {
  dialogType.value = '1'
  editDialogTitle.value = '列显示设置'
  columnsData.value = allColumns.value
  visibleEditDialog.value = true
}

const onSort = () => {
  dialogType.value = '2'
  editDialogTitle.value = '列排序设置'
  columnsData.value = tableColumns.value
  visibleEditDialog.value = true
}

const onSubmitSet = () => {}

const onInitPage = () => {
  tableData.value = []
  getDictSetting({ dictType: props.queryParams.dictType }).then((res) => {
    // 获取列
    allColumns.value = [...res]
    tableColumns.value = allColumns.value.filter((item) => item.flagShow.toUpperCase() === 'Y')
    onChangeDiagList(searchWord.value)
  })
}

watch(
  () => props.queryParams,
  () => onInitPage,
  { deep: true }
)
watch(
  () => props.inputValue,
  () => {
    if (props.isInput) {
      searchWord.value = props.inputValue
      onInitPage()
    }
  },
  { deep: true }
)
watch(
  () => props.visible,
  () => {
    if (props.visible) {
      if (props.isMultiple) {
        selectedCodeList.value = props.selectedCode
      }
      if (!props.isInput) {
        searchWord.value = ''
      }
      onInitPage()
      if (props.isInput) return
      setTimeout(() => {
        const iptSearch = document.getElementById('intSearch')
        iptSearch && iptSearch.focus()
      }, 10)
    }
  }
)
watch(
  () => tableData.value,
  () => {
    if (props.isMultiple) {
      const selectedCode = selectedCodeList.value ? selectedCodeList.value.split(',') : []
      tableData.value.forEach((item: any) => {
        if (selectedCode.length && selectedCode.indexOf(item.itemCode) != -1) {
          nextTick(() => {
            dictDialogTableRef.value?.toggleRowSelection(item, true)
          })
        } else {
          nextTick(() => {
            dictDialogTableRef.value?.toggleRowSelection(item, false)
          })
        }
      })
    }
  }
)

onMounted(() => {
  props.queryParams.dictType && onInitPage()
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      emit('callback', currentRow.value)
      emit('onClose')
    }
  })
})
</script>

<style lang="scss">
.dict-dialog {
  box-sizing: border-box;
  .el-dialog__body {
    padding: 12px !important;
  }
  .el-dialog__header {
    background-color: #3263fe !important;
  }
}
.el-table__body {
  padding-bottom: 20px !important;
}
.dict-dialog-title {
  color: white;
  font-family: 'Arial';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
</style>
