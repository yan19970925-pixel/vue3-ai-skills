import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { Menu } from '@/layout/components/Menu'
import { TagsView } from '@/layout/components/TagsView'
import { Breadcrumb } from '@/layout/components/Breadcrumb'
import { Logo } from '@/layout/components/Logo'
import AppView from './AppView.vue'
import ToolHeader from './ToolHeader.vue'
import { ElScrollbar } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('layout')

const appStore = useAppStore()

const pageLoading = computed(() => appStore.getPageLoading)

// 面包屑
const breadcrumb = computed(() => appStore.getBreadcrumb)

// 标签页
const tagsView = computed(() => appStore.getTagsView)

// logo
const logo = computed(() => appStore.logo)

// 固定头部
const fixedHeader = computed(() => appStore.getFixedHeader)

export const useRenderLayout = () => {
  const renderTop = () => {
    return (
      <>
        <div
          style="width:100vw"
          class="flex items-center justify-between bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)]"
        >
          {logo.value ? <Logo class="hover-trigger"></Logo> : undefined}
          <Menu class="flex-1 px-10px h-[var(--top-tool-height)]"></Menu>
          <ToolHeader></ToolHeader>
        </div>
        <div class={[`${prefixCls}-content`, 'w-full']} style="height: calc(100vh - 54px);">
          <ElScrollbar
            v-loading={pageLoading.value}
            class={[
              `${prefixCls}-content-scrollbar`,
              'layoutScrollbar',
              {
                'mt-[var(--tags-view-height)]': fixedHeader.value && breadcrumb.value
              }
            ]}
          >
            {tagsView.value ? (
              <TagsView
                class={[
                  'border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]',
                  {
                    '!fixed w-full top-[var(--top-tool-height)] left-0': fixedHeader.value
                  }
                ]}
                style="transition: width var(--transition-time-02), left var(--transition-time-02);"
              ></TagsView>
            ) : undefined}
            {breadcrumb.value ? (
              <Breadcrumb
                class={['<md:hidden', 'top-51px', 'h-36px', '!fixed w-full ml-0']}
                style="margin-left:25px"
              ></Breadcrumb>
            ) : undefined}

            <AppView></AppView>
          </ElScrollbar>
        </div>
      </>
    )
  }

  return {
    renderTop
  }
}
