<template>
  <div class="public-dict">
    <div class="public-dict-left">
      <div class="tree-contain">
        <el-tree
          :data="treeData"
          highlight-current
          :props="defaultProps"
          ref="treeRef"
          style="height: 100%; overflow-y: auto; color: #333"
          @node-click="treeClick"
      /></div>
    </div>
    <div class="public-dict-right">
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="dictDatas"
        border
        style="width: 1020px; height: calc(100% - 100px)"
        ><el-table-column
          :resizable="false"
          v-for="(col, idx) in columnList"
          :index="idx"
          :key="col.prop"
          :label="col.label"
          :width="col.width"
          :prop="col.prop"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span v-if="col.prop === 'title'" style="display: block; text-align: left">
              {{ scope.row.title }}
            </span>
            <span v-else>
              {{ scope.row[col.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer flexBox mt-15px">
        <el-button type="primary" class="createTreat" @click.stop="exportDiag()">导出</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="dictCheck">
import {
  queryDeptGroup,
  queryStaffGroup,
  exportStaffGroup
} from '@/api/system/publicDictionary/index'
import download from '@/utils/download'
const treeData = ref<any>([])
const dictDatas = ref<any>([])
const currentGroupCode = ref('')
const currentGroupClass = ref('')
const currentGroupName = ref('')
const currentLayerCode = ref('')
const defaultProps = {
  children: 'chirdList',
  label: 'groupName'
}
const columnList = [
  {
    prop: 'itemNo',
    label: '序号',
    resizable: false,
    align: 'center',
    width: '150px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'empNo',
    label: '工作人员编号',
    resizable: false,
    align: 'center',
    width: '180px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'name',
    label: '工作人员',
    resizable: false,
    align: 'center',
    width: '180px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'title',
    label: '职称',
    resizable: false,
    align: 'center',
    width: '180px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'job',
    label: '工作',
    resizable: false,
    align: 'center',
    width: '180px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'userName',
    label: '账号',
    resizable: false,
    align: 'center',
    width: '150px',
    'show-overflow-tooltip': true
  }
]
onMounted(() => {
  onInitPage()
})
const getTreeData = async () => {
  treeData.value = await queryDeptGroup({})
}
const onInitPage = () => {
  getTreeData()
}
const treeClick = async (data) => {
  if (data.chirdList && data.chirdList.length > 0) return
  currentGroupCode.value = data.groupCode
  currentGroupClass.value = data.groupClass
  currentGroupName.value = data.groupName
  currentLayerCode.value = data.currentLayerCode
  dictDatas.value = []
  dictDatas.value = await queryStaffGroup({
    groupClass: data.groupClass,
    groupName: data.groupName,
    groupCode: data.groupCode,
    layerCode: data.layerCode
  })
  dictDatas.value.forEach((item, index) => {
    item.itemNo = index + 1
  })
}
const exportDiag = async () => {
  if (currentGroupName.value && currentGroupClass.value) {
    const data = await exportStaffGroup({
      groupClass: currentGroupClass.value,
      groupName: currentGroupName.value,
      groupCode: currentGroupCode.value,
      layerCode: currentLayerCode.value
    })
    download.excel(data, currentGroupName.value + '.xlsx')
  }
}
</script>
<style scoped lang="scss">
.public-dict {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  display: flex;
  .public-dict-left {
    width: 490px;
    height: 100%;
    background: #fff;
    padding: 12px;
    .tree-contain {
      height: 100%;
    }
  }
  .public-dict-right {
    width: calc(100% - 504px);
    height: 100%;
    background: #fff;
    margin-left: 6px;
    padding: 12px;
  }
}
.createTreat {
  color: #3473d1;
  border: 1px solid #3473d1;
  background: #fff;
}
</style>
