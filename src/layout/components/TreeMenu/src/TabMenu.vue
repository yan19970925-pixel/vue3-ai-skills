<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/store/modules/permission'

export interface MenuItem {
  path: string
  name: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
  }
}

export default defineComponent({
  name: 'TabMenu',
  setup() {
    const permissionStore = usePermissionStore()
    const routers = computed(() => permissionStore.getAddTabRouters)
    const router = useRouter()
    const activeIndex = ref('')
    // 设置激活菜单项
    const setActiveMenu = () => {
      const currentPath = router.currentRoute.value.path
      activeIndex.value =
        unref(routers).find((item) => currentPath.startsWith(item.path))?.path || ''
    }

    // 处理菜单选择
    const handleSelect = async (path: string) => {
      if (permissionStore.getAddTabRouters.length === 0) {
        await permissionStore.generateTabRoutes()
      }
      router.push({
        path,
        query: {
          id: unref(routers).find((item) => item.path === path)?.name,
          title: unref(routers).find((item) => item.path === path)?.meta.title
        }
      })
      setActiveMenu()
    }

    onMounted(() => {
      handleSelect(router.currentRoute.value.path)
    })
    const getImageUrl = (path) => {
      return new URL(`../../../../assets/personnelFileMgmt/menu/${path}`, import.meta.url).href // 添加正确的相对路径
    }
    watch(() => router.currentRoute.value, setActiveMenu)
    return () => (
      <ElMenu
        default-active={activeIndex.value}
        mode="vertical"
        style="padding: 10px 0"
        onSelect={handleSelect}
      >
        {unref(routers)
          .filter((item) => !item.meta.hidden)
          .map((item) => {
            const isActive = activeIndex.value === item.path
            return (
              <ElMenuItem index={item.path} key={item.path} class={isActive ? 'is-active' : ''}>
                <ElIcon class="menu-icon">
                  <img src={getImageUrl(isActive ? item.meta.iconActive : item.meta.icon)} />
                </ElIcon>
                <span slot="title">{item.meta.title}</span>
              </ElMenuItem>
            )
          })}
      </ElMenu>
    )
  }
})
</script>

<style scoped>
.menu-icon {
  vertical-align: middle;
  margin-right: 8px;
  width: 1em;
  height: 1em;
}

.el-menu {
  border-right: none !important;
  user-select: none;
  background: #fff;
}

.el-menu-item {
  transition: all 0.3s;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f7f8fc !important;
  height: 48px !important;
}

.el-menu-item:hover {
  background-color: transparent !important;
}

.el-menu-item.is-active {
  background-color: #3473d1 !important;
  color: #fff;
}
.el-menu::-webkit-scrollbar {
  display: none !important;
}
</style>
