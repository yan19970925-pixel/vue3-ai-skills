<template>
  <div class="all-pe-container">
    <div class="process-flow-container" v-if="hasProcessData">
      <div class="process-flow">
        <div class="process-diagram">
          <!-- 主流程线 -->
          <div class="main-process-line">
            <!-- 单位登记 -->
            <div class="process-step" v-if="unitRegisterNode?.label === '单位登记'">
              <div class="process-node clickable" @click="goToRoute(unitRegisterNode)">
                <div class="node-content">
                  <div class="node-title">{{ unitRegisterNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="unitRegisterNode?.label === '单位登记'">↓</div>

            <!-- 批量预登记 & 单个预登记 -->
            <div
              class="process-step horizontal-steps"
              v-if="
                batchPreRegisterNode?.label === '批量预登记' &&
                singlePreRegisterNode?.label === '单个预登记'
              "
            >
              <!-- 批量预登记 -->
              <div class="process-step-inline">
                <div class="process-node clickable" @click="goToRoute(batchPreRegisterNode)">
                  <div class="node-content">
                    <div class="node-title">{{ batchPreRegisterNode.label }}</div>
                  </div>
                </div>
              </div>

              <!-- 单个预登记 -->
              <div class="process-step-inline">
                <div class="process-node clickable" @click="goToRoute(singlePreRegisterNode)">
                  <div class="node-content">
                    <div class="node-title">{{ singlePreRegisterNode.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="vertical-arrow"
              v-if="
                batchPreRegisterNode?.label === '批量预登记' &&
                singlePreRegisterNode?.label === '单个预登记'
              "
              >↓</div
            >

            <!-- 人员正式预约 -->
            <div class="process-step" v-if="formalAppointmentNode?.label === '人员正式预约'">
              <div class="process-node clickable" @click="goToRoute(formalAppointmentNode)">
                <div class="node-content">
                  <div class="node-title">{{ formalAppointmentNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="formalAppointmentNode?.label === '人员正式预约'"
              >↓</div
            >

            <!-- 体检人员报到 -->
            <div class="process-step" v-if="examReportNode?.label === '体检人员报到'">
              <div class="process-node clickable" @click="goToRoute(examReportNode)">
                <div class="node-content">
                  <div class="node-title">{{ examReportNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="examReportNode?.label === '体检人员报到'">↓</div>

            <!-- 打印条形码 -> 打印指导单 -->
            <div
              class="process-step with-right-branch"
              v-if="
                printBarcodeNode?.label === '打印条形码' &&
                printGuidanceNode?.label === '打印指导单'
              "
            >
              <!-- 左侧分支：打印条形码 -->
              <div class="left-branch">
                <div class="process-node clickable" @click="goToRoute(printBarcodeNode)">
                  <div class="node-content">
                    <div class="node-title">{{ printBarcodeNode.label }}</div>
                  </div>
                </div>
              </div>

              <!-- 主流程节点：打印指导单 -->
              <div class="main-node">
                <div class="process-node clickable" @click="goToRoute(printGuidanceNode)">
                  <div class="node-content">
                    <div class="node-title">{{ printGuidanceNode.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="vertical-arrow"
              v-if="
                printBarcodeNode?.label === '打印条形码' &&
                printGuidanceNode?.label === '打印指导单'
              "
              >↓</div
            >

            <!-- 总检医生分诊台 -->
            <div class="process-step" v-if="chiefDoctorNode?.label === '总检医生分诊台'">
              <div class="process-node clickable" @click="goToRoute(chiefDoctorNode)">
                <div class="node-content">
                  <div class="node-title">{{ chiefDoctorNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="chiefDoctorNode?.label === '总检医生分诊台'">↓</div>

            <!-- 团体数据导出 -->
            <div class="process-step" v-if="groupExportNode?.label === '团体数据导出'">
              <div class="process-node clickable" @click="goToRoute(groupExportNode)">
                <div class="node-content">
                  <div class="node-title">{{ groupExportNode.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-state" v-else>
      <p>暂无流程数据</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 响应式变量
const groupExamManageRoutesVal = ref<any[]>([])
const retryCount = ref(0)
const maxRetries = ref(1)
const isInitialized = ref(false)

// 各流程节点引用
const unitRegisterNode = ref<any>(null)
const batchPreRegisterNode = ref<any>(null)
const singlePreRegisterNode = ref<any>(null)
const formalAppointmentNode = ref<any>(null)
const examReportNode = ref<any>(null)
const printGuidanceNode = ref<any>(null)
const printBarcodeNode = ref<any>(null)
const chiefDoctorNode = ref<any>(null)
const groupExportNode = ref<any>(null)

// 获取所有路由
const allRoutes = computed(() => {
  return router.getRoutes()
})
const routes = allRoutes.value

// 获取 groupExamManage 路由及其子路由
const loadGroupExamManageRoutes = () => {
  try {
    // 查找路径为 /PhyExamManage/groupExamManage 的父级路由
    const parentRoute = routes.find((r) => r.path === '/PhyExamManage/groupExamManage')

    if (parentRoute && parentRoute.children && parentRoute.children.length > 0) {
      // 直接使用父级路由的子路由
      // 构造树形结构
      const buildTreeNode = (routeItem: any) => {
        return {
          label: routeItem.meta?.title || routeItem.name || routeItem.path,
          path: routeItem.path,
          name: routeItem.name,
          meta: routeItem.meta,
          children: routeItem.children ? routeItem.children.map(buildTreeNode) : []
        }
      }

      // 使用父级路由的 children 字段
      const rootNode = {
        label: parentRoute.meta?.title || '团检业务',
        path: parentRoute.path,
        name: parentRoute.name || 'groupExamManage',
        meta: parentRoute.meta || { title: '团检业务' },
        children: parentRoute.children.map(buildTreeNode)
      }

      groupExamManageRoutesVal.value = [rootNode]
      return parentRoute.children.length > 0
    }

    // 如果父级路由没有子路由，则查找所有以 /PhyExamManage/groupExamManage/ 开头的子路由
    const childRoutes = routes.filter(
      (r) =>
        r.path &&
        r.path.startsWith('/PhyExamManage/groupExamManage/') &&
        r.path !== '/PhyExamManage/groupExamManage/' &&
        r.path !== '/PhyExamManage/groupExamManage'
    )

    if (childRoutes.length > 0) {
      // 构造树形结构
      const buildTreeNode = (routeItem: any) => {
        return {
          label: routeItem.meta?.title || routeItem.name || routeItem.path,
          path: routeItem.path,
          name: routeItem.name,
          meta: routeItem.meta,
          children: routeItem.children ? routeItem.children.map(buildTreeNode) : []
        }
      }

      // 创建根节点并包含所有子路由
      const rootNode = {
        label: '团检业务',
        path: '/PhyExamManage/groupExamManage',
        name: 'groupExamManage',
        meta: { title: '团检业务' },
        children: childRoutes.map(buildTreeNode)
      }

      groupExamManageRoutesVal.value = [rootNode]
      return true
    }

    // 备用方案：如果没找到父级路由，直接查找所有 groupExamManage 相关的路由
    const groupExamManageRoutesList = routes.filter(
      (r) =>
        r.path &&
        r.path.includes('groupExamManage') &&
        !r.path.endsWith('groupExamManage') &&
        !r.path.endsWith('groupExamManage/')
    )

    if (groupExamManageRoutesList.length > 0) {
      // 构造树形结构
      const buildTreeNode = (routeItem: any) => {
        return {
          label: routeItem.meta?.title || routeItem.name || routeItem.path,
          path: routeItem.path,
          name: routeItem.name,
          meta: routeItem.meta,
          children: routeItem.children ? routeItem.children.map(buildTreeNode) : []
        }
      }

      // 创建虚拟根节点组织这些路由
      const rootNode = {
        label: '团检业务',
        path: '/PhyExamManage/groupExamManage',
        name: 'groupExamManage',
        meta: { title: '团检业务' },
        children: groupExamManageRoutesList.map(buildTreeNode)
      }

      groupExamManageRoutesVal.value = [rootNode]
      return true
    }

    // 如果还是没找到，使用原来的查找方式
    const groupExamManageRoute = routes.find(
      (r) =>
        r.name === 'groupExamManage' ||
        r.path === '/groupExamManage' ||
        (r.meta && r.meta.title && r.meta.title.includes('团检业务'))
    )

    if (groupExamManageRoute) {
      // 构造树形结构
      const buildTreeNode = (routeItem: any) => {
        return {
          label: routeItem.meta?.title || routeItem.name || routeItem.path,
          path: routeItem.path,
          name: routeItem.name,
          meta: routeItem.meta,
          children: routeItem.children ? routeItem.children.map(buildTreeNode) : []
        }
      }

      // 返回 groupExamManage 路由及其子路由
      groupExamManageRoutesVal.value = [buildTreeNode(groupExamManageRoute)]
      return true
    }

    // 如果没找到 groupExamManage 路由，返回空数组
    groupExamManageRoutesVal.value = []
    return false
  } catch (error) {
    groupExamManageRoutesVal.value = []
    return false
  }
}

// 获取子节点
const getChildNode = (index: number) => {
  if (!groupExamManageRoutesVal.value?.length) return null

  const root = groupExamManageRoutesVal.value[0]
  if (!root.children || root.children.length <= index) return null

  return root.children[index]
}

// 更新所有子节点
const updateChildNodes = () => {
  if (!groupExamManageRoutesVal.value?.length) return

  const root = groupExamManageRoutesVal.value[0]
  if (!root?.children?.length) return

  // 按顺序更新各节点
  unitRegisterNode.value = getChildNode(0) // 单位登记
  batchPreRegisterNode.value = getChildNode(1) // 批量预登记
  singlePreRegisterNode.value = getChildNode(2) // 单个预登记
  formalAppointmentNode.value = getChildNode(3) // 人员正式预约
  examReportNode.value = getChildNode(4) // 体检人员报到
  printGuidanceNode.value = getChildNode(5) // 打印指导单
  printBarcodeNode.value = getChildNode(6) // 打印条形码
  chiefDoctorNode.value = getChildNode(7) // 总检医生分诊台
  groupExportNode.value = getChildNode(8) // 团体数据导出
}

// 检查是否有流程数据
const hasProcessData = computed(() => {
  return !!(
    unitRegisterNode.value ||
    batchPreRegisterNode.value ||
    singlePreRegisterNode.value ||
    formalAppointmentNode.value ||
    examReportNode.value ||
    printGuidanceNode.value ||
    printBarcodeNode.value ||
    chiefDoctorNode.value ||
    groupExportNode.value
  )
})

// 跳转到指定路由
const goToRoute = (node: any) => {
  if (!node || (!node.name && !node.path)) {
    ElMessage.info('该节点无路由信息')
    return
  }

  try {
    if (node.name) {
      router.push({ name: node.name })
    } else if (node.path) {
      router.push(node.path)
    }
  } catch (error) {
    ElMessage.error('路由跳转失败：' + (error as Error).message)
  }
}

// 刷新流程数据
const refreshProcessData = () => {
  const hasChildren = loadGroupExamManageRoutes()
  updateChildNodes()

  // 如果没有子路由且未达到最大重试次数，则继续重试
  if (!hasChildren && retryCount.value < maxRetries.value) {
    retryCount.value++
    setTimeout(() => {
      refreshProcessData()
    }, 300)
  }

  return hasChildren
}

// 优化后的路由监听器，避免重复执行
watch(
  () => route.fullPath,
  () => {
    // 只有在初始化完成后才响应路由变化
    if (isInitialized.value) {
      setTimeout(() => {
        retryCount.value = 0
        refreshProcessData()
      }, 100)
    }
  }
)

// 监听子路由变化
watch(
  () => {
    if (groupExamManageRoutesVal.value?.length) {
      return groupExamManageRoutesVal.value[0].children
    }
    return undefined
  },
  (newChildren) => {
    if (newChildren && newChildren.length > 0) {
      updateChildNodes()
    }
  },
  { deep: true }
)

// 组件挂载时初始化数据
onMounted(() => {
  retryCount.value = 0
  refreshProcessData()
  // 标记为已初始化
  isInitialized.value = true
})
</script>

<style lang="scss" scoped src="@/views/Home/components/AllPE/index.scss"></style>
