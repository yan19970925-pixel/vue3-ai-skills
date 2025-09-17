<template>
  <div class="all-pe-container">
    <div class="process-flow-container" v-if="hasProcessData">
      <div class="process-flow">
        <div class="process-diagram">
          <!-- 主流程线 -->
          <div class="main-process-line">
            <!-- 单位登记 -->
            <div class="process-step">
              <div
                class="process-node"
                :class="{ clickable: unitRegisterNode?.name || unitRegisterNode?.path }"
                @click="goToRoute(unitRegisterNode)"
              >
                <div class="node-content">
                  <div class="node-title">{{ unitRegisterNode?.label || '单位登记' }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <!-- 单位批量登记 -->
            <div class="process-step">
              <div
                class="process-node"
                :class="{ clickable: unitBatchRegisterNode?.name || unitBatchRegisterNode?.path }"
                @click="goToRoute(unitBatchRegisterNode)"
              >
                <div class="node-content">
                  <div class="node-title">{{ unitBatchRegisterNode?.label || '单位批量登记' }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <!-- 体检预约 -->
            <div class="process-step">
              <div
                class="process-node"
                :class="{ clickable: examAppointmentNode?.name || examAppointmentNode?.path }"
                @click="goToRoute(examAppointmentNode)"
              >
                <div class="node-content">
                  <div class="node-title">{{ examAppointmentNode?.label || '体检预约' }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <!-- 体检登记 -> 体检人员报到 -->
            <div class="process-step with-left-branch">
              <!-- 左侧分支：体检登记 -->
              <div class="left-branch">
                <div
                  class="process-node"
                  :class="{ clickable: examRegisterNode?.name || examRegisterNode?.path }"
                  @click="goToRoute(examRegisterNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ examRegisterNode?.label || '体检登记' }}</div>
                  </div>
                </div>
              </div>

              <!-- 主流程节点：体检人员报到 -->
              <div class="main-node">
                <div
                  class="process-node"
                  :class="{ clickable: examReportNode?.name || examReportNode?.path }"
                  @click="goToRoute(examReportNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ examReportNode?.label || '体检人员报到' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <!-- 打印条形码 -> 打印指引单 -->
            <div class="process-step with-right-branch">
              <!-- 左侧分支：打印条形码 -->
              <div class="left-branch">
                <div
                  class="process-node"
                  :class="{ clickable: printBarcodeNode?.name || printBarcodeNode?.path }"
                  @click="goToRoute(printBarcodeNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ printBarcodeNode?.label || '打印条形码' }}</div>
                  </div>
                </div>
              </div>

              <!-- 主流程节点：打印指引单 -->
              <div class="main-node">
                <div
                  class="process-node"
                  :class="{ clickable: printGuidanceNode?.name || printGuidanceNode?.path }"
                  @click="goToRoute(printGuidanceNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ printGuidanceNode?.label || '打印指引单' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <!-- 体检医生分诊台 -->
            <div class="process-step">
              <div
                class="process-node"
                :class="{ clickable: PEDoctorNode?.name || PEDoctorNode?.path }"
                @click="goToRoute(PEDoctorNode)"
              >
                <div class="node-content">
                  <div class="node-title">{{ PEDoctorNode?.label || '体检医生诊台' }}</div>
                </div>
              </div>
            </div>
            <div class="vertical-arrow">↓</div>

            <!-- 总检医生分诊台 -->
            <div class="process-step">
              <div
                class="process-node"
                :class="{ clickable: chiefDoctorNode?.name || chiefDoctorNode?.path }"
                @click="goToRoute(chiefDoctorNode)"
              >
                <div class="node-content">
                  <div class="node-title">{{ chiefDoctorNode?.label || '总检医生分诊台' }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow">↓</div>

            <div class="process-step horizontal-steps">
              <!-- 个人数据导出 -->
              <div class="process-step-inline">
                <div
                  class="process-node"
                  :class="{ clickable: personalExportNode?.name || personalExportNode?.path }"
                  @click="goToRoute(personalExportNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ personalExportNode?.label || '个人数据导出' }}</div>
                  </div>
                </div>
              </div>

              <!-- 团体数据导出 -->
              <div class="process-step-inline">
                <div
                  class="process-node"
                  :class="{ clickable: groupExportNode?.name || groupExportNode?.path }"
                  @click="goToRoute(groupExportNode)"
                >
                  <div class="node-content">
                    <div class="node-title">{{ groupExportNode?.label || '团体数据导出' }}</div>
                  </div>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 响应式变量
const entireProcessRoutesVal = ref<any[]>([])
const retryCount = ref(0)
const maxRetries = ref(1) // 最大重试次数
const isInitialized = ref(false) // 添加初始化状态标记

// 各流程节点引用
const unitRegisterNode = ref<any>(null)
const unitBatchRegisterNode = ref<any>(null)
const examAppointmentNode = ref<any>(null)
const examRegisterNode = ref<any>(null)
const examReportNode = ref<any>(null)
const printGuidanceNode = ref<any>(null)
const printBarcodeNode = ref<any>(null)
const PEDoctorNode = ref<any>(null)
const chiefDoctorNode = ref<any>(null)
const personalExportNode = ref<any>(null)
const groupExportNode = ref<any>(null)

// 获取所有路由
const allRoutes = computed(() => {
  return router.getRoutes()
})
const routes = allRoutes.value

// 获取 entireProcess 路由及其子路由
const loadEntireProcessRoutes = () => {
  try {
    // 查找路径为 /PhyExamManage/entireProcess/ 且名称也为 /PhyExamManage/entireProcess/ 的路由
    const entireProcessRoute = routes.find(
      (r) =>
        r.path === '/PhyExamManage/entireProcess/' && r.name === '/PhyExamManage/entireProcess/'
    )

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

    if (entireProcessRoute && entireProcessRoute.children?.length > 0) {
      // 使用实际的 entireProcess 路由结构
      const processedRoute = buildTreeNode(entireProcessRoute)
      entireProcessRoutesVal.value = [processedRoute]

      return true
    } else {
      // 如果没找到 entireProcess 路由，尝试之前的备选方案
      const fallbackRoutes = routes.filter(
        (r) => r.path && r.path.includes('entireProcess') && !r.path.endsWith('entireProcess/')
      )

      if (fallbackRoutes.length > 0) {
        // 创建一个虚拟的根节点来组织这些路由
        const rootNode = {
          label: '全流程体检',
          path: '/entireProcess',
          name: 'entireProcess',
          meta: { title: '全流程体检' },
          children: fallbackRoutes.map(buildTreeNode)
        }

        entireProcessRoutesVal.value = [rootNode]
        return true
      } else {
        // 如果还是没有找到，返回空数组
        entireProcessRoutesVal.value = []
        return false
      }
    }
  } catch (error) {
    console.error('加载 entireProcess 路由时出错:', error)
    entireProcessRoutesVal.value = []
    return false
  }
}

// 获取指定索引的子节点
const getChildNode = (index: number) => {
  if (!entireProcessRoutesVal.value?.length) return null

  const root = entireProcessRoutesVal.value[0]
  if (!root.children || root.children.length <= index) return null

  return root.children[index]
}

// 更新所有子节点
const updateChildNodes = () => {
  if (!entireProcessRoutesVal.value?.length) return

  const root = entireProcessRoutesVal.value[0]
  if (!root?.children?.length) return

  // 按顺序更新各节点
  unitRegisterNode.value = getChildNode(0) // 单位登记
  unitBatchRegisterNode.value = getChildNode(1) // 单位批量登记
  examAppointmentNode.value = getChildNode(2) // 体检预约
  examRegisterNode.value = getChildNode(3) // 体检登记
  examReportNode.value = getChildNode(4) // 体检人员报到
  printGuidanceNode.value = getChildNode(5) // 打印指引单
  printBarcodeNode.value = getChildNode(6) // 打印条形码
  PEDoctorNode.value = getChildNode(7) // 体检医生诊台
  chiefDoctorNode.value = getChildNode(8) // 总检医生分诊台
  personalExportNode.value = getChildNode(9) // 个人数据导出
  groupExportNode.value = getChildNode(10) // 团体数据导出
}

// 检查是否有流程数据
const hasProcessData = computed(() => {
  return !!(
    unitRegisterNode.value ||
    unitBatchRegisterNode.value ||
    examAppointmentNode.value ||
    examRegisterNode.value ||
    examReportNode.value ||
    printGuidanceNode.value ||
    printBarcodeNode.value ||
    PEDoctorNode.value ||
    chiefDoctorNode.value ||
    personalExportNode.value ||
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
  const hasChildren = loadEntireProcessRoutes()
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
    if (entireProcessRoutesVal.value?.length) {
      return entireProcessRoutesVal.value[0].children
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

// 组件挂载时初始化数据，只执行一次
onMounted(() => {
  retryCount.value = 0
  refreshProcessData()
  // 标记为已初始化
  isInitialized.value = true
  loadEntireProcessRoutes()
})
</script>

<style lang="scss" scoped src="./index.scss"></style>
