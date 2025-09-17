<template>
  <div class="head-container">
    <el-input v-model="deptName" placeholder="请输入部门名称" clearable class="mb-20px">
      <template #prefix>
        <Icon icon="ep:search" />
      </template>
    </el-input>
  </div>
  <div class="head-container-tree">
    <el-tree
      :data="deptList"
      :props="defaultProps"
      node-key="id"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      ref="treeRef"
      highlight-current
      :default-expanded-keys="defaultKeyArr"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ElTree } from 'element-plus'
import { deptTreeList } from '@/api/system/deptManage'
import { defaultProps, handleTree } from '@/utils/tree'

const deptName = ref('')
const deptList = ref<Tree[]>([]) // 树形结构
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultKeyArr = ref<any>([])

/** 获得部门树 */
const getTree = async () => {
  const res = await deptTreeList({})
  res &&
    res.length > 0 &&
    res.map((item) => {
      item.id = item.deptCode
      item.name = item.deptName
      item.parentId = item.parentDeptCode
    })
  deptList.value = []
  deptList.value.push(...handleTree(res))
  if (deptList.value.length > 0) {
    defaultKeyArr.value.push(deptList.value[0].id)
  }
}

/** 基于名字过滤 */
const filterNode = (name: string, data: Tree) => {
  if (!name) return true
  return data.name.includes(name)
}

/** 处理部门被点击 */
const handleNodeClick = async (row: { [key: string]: any }) => {
  emits('node-click', row)
}

const emits = defineEmits(['node-click'])

onMounted(async () => {
  await getTree()
  handleNodeClick(deptList.value[0])
})
watch(deptName, (val) => {
  treeRef.value!.filter(val)
})
</script>
<style lang="scss" scoped>
.head-container-tree {
  height: calc(-200px + 100vh);
  overflow: auto;
}
</style>
