<script lang="tsx">
import { defineComponent, computed, ref } from 'vue'
import { Collapse } from '@/layout/components/Collapse'
import { UserInfo } from '@/layout/components/UserInfo'
import { Breadcrumb } from '@/layout/components/Breadcrumb'
//import { SizeDropdown } from '@/layout/components/SizeDropdown'
//import { LocaleDropdown } from '@/layout/components/LocaleDropdown'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import dayjs from 'dayjs'
import helpImg from '@/assets/patientlist/help.svg'

const { getPrefixCls, variables } = useDesign()

const prefixCls = getPrefixCls('tool-header')

const appStore = useAppStore()

// 面包屑
const breadcrumb = computed(() => appStore.getBreadcrumb)

// 折叠图标
const hamburger = computed(() => appStore.getHamburger)

// 全屏图标
// const screenfull = computed(() => appStore.getScreenfull)

// 尺寸图标
//const size = computed(() => appStore.getSize)

// 布局
const layout = computed(() => appStore.getLayout)

// 多语言图标
//const locale = computed(() => appStore.getLocale)

const messageCount = computed(() => appStore.getMessageCount)

const nowDate = ref(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))
let dateTimeout
const refreshDate = () => {
  dateTimeout && clearTimeout(dateTimeout)
  nowDate.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  dateTimeout = setTimeout(() => {
    refreshDate()
  }, 1000)
}
refreshDate()

export default defineComponent({
  name: 'ToolHeader',
  setup() {
    return () => (
      <div
        id={`${variables.namespace}-tool-header`}
        class={[
          prefixCls,
          'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
          'dark:bg-[var(--el-bg-color)]'
        ]}
      >
        {layout.value !== 'top' ? (
          <div class="h-full flex items-center">
            {hamburger.value && layout.value !== 'cutMenu' ? (
              <Collapse class="hover-trigger" color="var(--top-header-text-color)"></Collapse>
            ) : undefined}
            {breadcrumb.value ? <Breadcrumb class="<md:hidden"></Breadcrumb> : undefined}
          </div>
        ) : undefined}
        <div class="h-full flex items-center pl-16px">
          <section class="header-date">{nowDate.value}</section>
          <img alt="" src={helpImg} class="help-img" />
          {/* <section class="message-img-row">
            {messageCount.value > 0 ? (
              <span class="message-count">{messageCount.value}</span>
            ) : null}
            <img alt="" src={messageImg} class="message-img" />
          </section> */}
          <UserInfo class="hover-trigger"></UserInfo>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-tool-header;

.#{$prefix-cls} {
  transition: left var(--transition-time-02);
}
.header-date {
  color: #ffffffff;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Arial';
  padding: 0px 8px;
  width: 94px;
}

.help-img {
  width: 32px;
  height: 32px;
  margin: 0 24px;
  cursor: pointer;
}
.message-img-row {
  margin: 0 24px;
  margin-left: 0;
  position: relative;
  cursor: pointer;
  .message-img {
    width: 32px;
    height: 32px;
  }
  .message-count {
    position: absolute;
    right: -6px;
    top: -6px;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50% 50%;
    background-color: #f33d21;
    line-height: 18px;
    text-align: center;
    color: #ffffffff;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Arial';
  }
}
</style>
