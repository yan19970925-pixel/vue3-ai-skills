<template>
  <div class="all-pe-container">
    <div class="process-flow-container" v-if="hasProcessData">
      <div class="process-flow">
        <div class="process-diagram">
          <!-- 主流程线 -->
          <div class="main-process-line">
            <!-- 个人体检登记 -->
            <div class="process-step" v-if="personalRegisterNode?.label === '个人体检登记'">
              <div class="process-node clickable" @click="goToRoute(personalRegisterNode)">
                <div class="node-content">
                  <div class="node-title">{{ personalRegisterNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="personalRegisterNode?.label === '个人体检登记'"
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

            <!-- 打印条形码 -> 打印指引单 -->
            <div
              class="process-step with-right-branch"
              v-if="
                printBarcodeNode?.label === '打印条形码' &&
                printGuidanceNode?.label === '打印指引单'
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

              <!-- 主流程节点：打印指引单 -->
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
                printGuidanceNode?.label === '打印指引单'
              "
              >↓</div
            >

            <!-- 医生分诊台 -->
            <div class="process-step" v-if="doctorTriageNode?.label === '医生分诊台'">
              <div class="process-node clickable" @click="goToRoute(doctorTriageNode)">
                <div class="node-content">
                  <div class="node-title">{{ doctorTriageNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="doctorTriageNode?.label === '医生分诊台'">↓</div>

            <!-- 总检分诊台 -->
            <div class="process-step" v-if="chiefTriageNode?.label === '总检分诊台'">
              <div class="process-node clickable" @click="goToRoute(chiefTriageNode)">
                <div class="node-content">
                  <div class="node-title">{{ chiefTriageNode.label }}</div>
                </div>
              </div>
            </div>

            <div class="vertical-arrow" v-if="chiefTriageNode?.label === '总检分诊台'">↓</div>

            <!-- 个人数据导出 -->
            <div class="process-step" v-if="personalExportNode?.label === '个人数据导出'">
              <div class="process-node clickable" @click="goToRoute(personalExportNode)">
                <div class="node-content">
                  <div class="node-title">{{ personalExportNode.label }}</div>
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
const ppExaminationRoutesVal = ref<any[]>([])
const retryCount = ref(0)
const maxRetries = ref(1)
const isInitialized = ref(false)

// 各流程节点引用
const personalRegisterNode = ref<any>(null)
const examReportNode = ref<any>(null)
const printGuidanceNode = ref<any>(null)
const printBarcodeNode = ref<any>(null)
const doctorTriageNode = ref<any>(null)
const chiefTriageNode = ref<any>(null)
const personalExportNode = ref<any>(null)

// 获取所有路由
const allRoutes = computed(() => {
  return router.getRoutes()
})
const routes = allRoutes.value

// 获取 PpExamination 路由及其子路由// 获取 PpExamination 路由及其子路由
const loadPpExaminationRoutes = () => {
  try {
    // 查找路径为 /PhyExamManage/PpExamination 的父级路由
    const parentRoute = routes.find((r) => r.path === '/PhyExamManage/PpExamination')

    if (parentRoute && parentRoute.children && parentRoute.children.length > 0) {
      // 直接使用父级路由的子路由，而不是重新查找
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
        label: parentRoute.meta?.title || '个检业务',
        path: parentRoute.path,
        name: parentRoute.name || 'PpExamination',
        meta: parentRoute.meta || { title: '个检业务' },
        children: parentRoute.children.map(buildTreeNode)
      }

      ppExaminationRoutesVal.value = [rootNode]
      return parentRoute.children.length > 0
    }

    // 如果父级路由没有子路由，则查找所有以 /PhyExamManage/PpExamination/ 开头的子路由
    // 注意：需要排除路径以 /PhyExamManage/PpExamination/ 结尾但不是子路由的路由
    const childRoutes = routes.filter(
      (r) =>
        r.path &&
        r.path.startsWith('/PhyExamManage/PpExamination/') &&
        r.path !== '/PhyExamManage/PpExamination/' && // 排除父级路由自身
        r.path !== '/PhyExamManage/PpExamination' // 排除可能的变体
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
        label: '个检业务',
        path: '/PhyExamManage/PpExamination',
        name: 'PpExamination',
        meta: { title: '个检业务' },
        children: childRoutes.map(buildTreeNode)
      }

      ppExaminationRoutesVal.value = [rootNode]
      return true
    }

    // 备用方案：如果没找到父级路由，直接查找所有 PpExamination 相关的路由
    const ppExaminationRoutesList = routes.filter(
      (r) =>
        r.path &&
        r.path.includes('PpExamination') &&
        !r.path.endsWith('PpExamination') &&
        !r.path.endsWith('PpExamination/') // 排除父级路由自身
    )

    if (ppExaminationRoutesList.length > 0) {
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
        label: '个检业务',
        path: '/PhyExamManage/PpExamination',
        name: 'PpExamination',
        meta: { title: '个检业务' },
        children: ppExaminationRoutesList.map(buildTreeNode)
      }

      ppExaminationRoutesVal.value = [rootNode]
      return true
    }

    // 如果还是没找到，使用原来的查找方式
    const ppExaminationRoute = routes.find(
      (r) =>
        r.name === 'PpExamination' ||
        r.path === '/PpExamination' ||
        (r.meta && r.meta.title && r.meta.title.includes('个检业务'))
    )

    if (ppExaminationRoute) {
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

      // 返回 PpExamination 路由及其子路由
      ppExaminationRoutesVal.value = [buildTreeNode(ppExaminationRoute)]
      return true
    }

    // 如果没找到 PpExamination 路由，返回空数组
    ppExaminationRoutesVal.value = []
    return false
  } catch (error) {
    console.error('加载 PpExamination 路由时出错:', error)
    ppExaminationRoutesVal.value = []
    return false
  }
}
// 获取子节点
const getChildNode = (index: number) => {
  if (!ppExaminationRoutesVal.value?.length) return null

  const root = ppExaminationRoutesVal.value[0]
  if (!root.children || root.children.length <= index) return null

  return root.children[index]
}

// 更新所有子节点
const updateChildNodes = () => {
  if (!ppExaminationRoutesVal.value?.length) return

  const root = ppExaminationRoutesVal.value[0]
  if (!root?.children?.length) return

  // 按顺序更新各节点
  personalRegisterNode.value = getChildNode(0) // 个人体检登记
  examReportNode.value = getChildNode(1) // 体检人员报到
  printGuidanceNode.value = getChildNode(2) // 打印指引单
  printBarcodeNode.value = getChildNode(3) // 打印条形码
  doctorTriageNode.value = getChildNode(4) // 医生分诊台
  chiefTriageNode.value = getChildNode(5) // 总检分诊台
  personalExportNode.value = getChildNode(6) // 个人数据导出
}

// 检查是否有流程数据
const hasProcessData = computed(() => {
  return !!(
    personalRegisterNode.value ||
    examReportNode.value ||
    printGuidanceNode.value ||
    printBarcodeNode.value ||
    doctorTriageNode.value ||
    chiefTriageNode.value ||
    personalExportNode.value
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
  const hasChildren = loadPpExaminationRoutes()
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
    if (ppExaminationRoutesVal.value?.length) {
      return ppExaminationRoutesVal.value[0].children
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
