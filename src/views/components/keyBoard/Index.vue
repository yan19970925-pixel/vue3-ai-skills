<template>
  <div class="keyBoardBox">
    <div
      ><el-button
        v-for="(item, index) in keyBoardDatas1"
        :key="index"
        class="keyBoardButton"
        @click.stop="addKeyBoardSearch(item)"
      >
        {{ item.label }}
      </el-button></div
    >
    <div style="padding-left: 30px"
      ><el-button
        v-for="(item, index) in keyBoardDatas2"
        :key="index"
        class="keyBoardButton"
        @click.stop="addKeyBoardSearch(item)"
      >
        {{ item.label }}
      </el-button></div
    >
    <div style="padding-left: 30px"
      ><el-button
        v-for="(item, index) in keyBoardDatas3"
        :key="index"
        class="keyBoardButton"
        @click.stop="addKeyBoardSearch(item)"
      >
        {{ item.label }} </el-button
      ><el-button class="keyBoardButton" @click.stop="deleteKeyBoardSearch()"> ⬅ </el-button
      ><el-button
        class="keyBoardButton"
        style="background: red; color: #fff"
        @click.stop="resetKeyWord"
      >
        X
      </el-button></div
    >
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['addKeyBoard', 'deleteKeyBoard', 'resetKeyBoard'])
const keyBoardDatas1 = ref([
  { label: 'Q', value: 'q' },
  { label: 'W', value: 'w' },
  { label: 'E', value: 'e' },
  { label: 'R', value: 'r' },
  { label: 'T', value: 't' },
  { label: 'Y', value: 'y' },
  { label: 'U', value: 'u' },
  { label: 'I', value: 'i' },
  { label: 'O', value: 'o' },
  { label: 'P', value: 'p' }
])
const keyBoardDatas2 = ref([
  { label: 'A', value: 'a' },
  { label: 'S', value: 's' },
  { label: 'D', value: 'd' },
  { label: 'F', value: 'f' },
  { label: 'G', value: 'g' },
  { label: 'H', value: 'h' },
  { label: 'J', value: 'j' },
  { label: 'K', value: 'k' },
  { label: 'L', value: 'l' }
])
const keyBoardDatas3 = ref([
  { label: 'Z', value: 'z' },
  { label: 'X', value: 'x' },
  { label: 'C', value: 'c' },
  { label: 'V', value: 'v' },
  { label: 'B', value: 'b' },
  { label: 'N', value: 'n' },
  { label: 'M', value: 'm' }
])
const addKeyBoardSearch = async (item: any) => {
  emit('addKeyBoard', item)
}
const deleteKeyBoardSearch = () => {
  emit('deleteKeyBoard')
}
const resetKeyWord = () => {
  emit('resetKeyBoard')
}
</script>
<style lang="scss" scoped>
.keyBoardBox {
  height: 106px;
  width: 100%;
  background-color: #fff;
  padding: 8px 20px 5px 20px;
  box-sizing: border-box;
  overflow: hidden;
  border: none !important;
}
.keyBoardButton {
  width: 60px;
  height: 26px;
  line-height: 26px;
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 6px;
  background: #f7f8fc;
}
</style>
