<template>
  <div class="home-card" @click="onClickRouter">
    <img alt="" :src="props.icon" class="w-52px h-52px mb-8px img-hover" />
    <section class="home-card-title">{{ props.text }}</section>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { useAppStore } from '@/store/modules/app'
// import { useCache, CACHE_KEY } from '@/hooks/web/useCache'
import { useTagsViewStore } from '@/store/modules/tagsView'
const tagsViewStore = useTagsViewStore()
const emit = defineEmits(['onClickCard'])

const appStore = useAppStore()

const props = defineProps({
  id: propTypes.string,
  icon: propTypes.string,
  text: propTypes.string,
  link: propTypes.string,
  value: propTypes.string,
  type: propTypes.string,
  showTag: propTypes.bool
})

const onClickRouter = () => {
  appStore.setAppModule(props.value)
  appStore.setTitle(props.text)

  tagsViewStore.delAllViews()
  appStore.setTagsView(props.showTag || false)
  emit('onClickCard', { link: props.link, value: props.value, type: props.type })
}
</script>

<style lang="scss" scoped>
.home-card {
  border: 1px solid transparent;
  cursor: pointer;
  float: left;
  width: 112px;
  text-align: center;
  margin-bottom: 12px;
  .home-card-title {
    color: #2f2f2fff;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Microsoft Yahei UI';
    text-align: center;
    height: 22px;
    line-height: 22px;
  }
  &:hover {
    .home-card-title {
      font-weight: 550;
    }
  }
}
.img-hover {
  box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.08), 0px 3px 8px rgba(0, 0, 0, 0.12),
    0px 2px 4px -2px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  margin: 0 auto 10px;
  display: block;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.08), 0px 3px 8px rgba(0, 0, 0, 0.12),
      0px 2px 4px -2px rgba(0, 0, 0, 0.16);
  }
}
</style>
