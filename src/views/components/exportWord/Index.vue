<template>
  <div> </div>
</template>
<script setup lang="ts">
import { exportWordImage, getWordImage } from '@/utils/print/exportFile'
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const dialogVisible = ref(false)
// const startSchemeTemplate = ref({
//   unitName: '某公司测试团队报告',
//   unitCode: '1234567890',
//   peprDate: '2023-07-18',
//   preParedDate: '2023-07-19',
//   printDate: '2023-07-19 12:00:32',
//   deadLineDate: '2023-07-19 12:00:32',
//   perTotal: 100,
//   male: 20,
//   female: 80,
//   ageTableData: [
//     {
//       order: 1,
//       col: '0-20',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 2,
//       col: '21-30',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 3,
//       col: '31-40',
//       col1: 0,
//       col2: 15,
//       col3: 15,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 4,
//       col: '41-50',
//       col1: 0,
//       col2: 21,
//       col3: 21,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 5,
//       col: '51-60',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 6,
//       col: '61-70',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 7,
//       col: '70以上',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     }
//   ],
//   ageDistributionChart: '',
//   abResultsData: [
//     {
//       order: 1,
//       col: '乳腺结节',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 2,
//       col: '乳腺导管扩张',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 3,
//       col: '子宫结节（小）',
//       col1: 0,
//       col2: 15,
//       col3: 15,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 4,
//       col: '子宫肌层不均质',
//       col1: 0,
//       col2: 21,
//       col3: 21,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 5,
//       col: '高危型HPV：阳性',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 6,
//       col: '子宫内膜不均质增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 7,
//       col: '子宫肌瘤（大）',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 8,
//       col: '子宫内膜欠均质',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 9,
//       col: '子宫内膜增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 10,
//       col: '子宫内膜欠均质增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 11,
//       col: '子宫内膜增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 12,
//       col: '子宫内膜欠均质增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 13,
//       col: '右附件区肿物-畸胎瘤？',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 14,
//       col: '左附件区囊肿(小),子宫内膜欠均质',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 15,
//       col: '子宫腺肌症',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 16,
//       col: '子宫肌瘤（小）子宫内膜欠均质',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     },
//     {
//       order: 17,
//       col: '子宫肌层不均质  子宫内膜不均质增厚',
//       col1: 0,
//       col2: 0,
//       col3: 0,
//       col4: '0%',
//       col5: 0,
//       col6: 0
//     }
//   ],
//   MWabnormalitiesChart: '',
//   WabnormalitiesChart: '',
//   MabnormalitiesChart: '',
//   MWdiseaseChart: '',
//   healthProList: [
//     {
//       index: 1,
//       itemName: '乳腺结节',
//       total: 23,
//       itemList: [
//         {
//           order: 1,
//           peId: '1234567890',
//           name: '张三',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 2,
//           peId: '1234567890',
//           name: '李四',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 3,
//           peId: '1234567890',
//           name: '王五',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 4,
//           peId: '1234567890',
//           name: '赵六',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 5,
//           peId: '1234567890',
//           name: '孙七',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 6,
//           peId: '1234567890',
//           name: '周八',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 7,
//           peId: '1234567890',
//           name: '吴九',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 8,
//           peId: '1234567890',
//           name: '郑十',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 9,
//           peId: '1234567890',
//           name: '王十一',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 10,
//           peId: '1234567890',
//           name: '张十二',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         }
//       ],
//       Mtotal: 1,
//       Wtotal: 10,
//       Mtotals: 2,
//       Wtotals: 24,
//       totals: 44,
//       MtotalP: '20%',
//       WtotalP: '30%',
//       totalP: '100%',
//       suggList: [
//         { index: 1, suggesTion: '乳腺科进一步检查' },
//         { index: 2, suggesTion: '乳腺科进2步检查' },
//         { index: 3, suggesTion: '乳腺科进3步检查' },
//         { index: 4, suggesTion: '乳腺科进4步检查' }
//       ]
//     },
//     {
//       index: 2,
//       itemName: '乳腺导管扩张',
//       total: 23,
//       itemList: [
//         {
//           order: 1,
//           peId: '1234567890',
//           name: '小王',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 2,
//           peId: '1234567890',
//           name: '小四',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 3,
//           peId: '1234567890',
//           name: '王五2',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 4,
//           peId: '1234567890',
//           name: '赵六刘',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 5,
//           peId: '1234567890',
//           name: '孙七是',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 6,
//           peId: '1234567890',
//           name: '周八大',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 7,
//           peId: '1234567890',
//           name: '吴的九',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 8,
//           peId: '1234567890',
//           name: '郑啊十',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 9,
//           peId: '1234567890',
//           name: '王发十一',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 10,
//           peId: '1234567890',
//           name: '张十啊二',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         }
//       ],
//       Mtotal: 1,
//       Wtotal: 10,
//       Mtotals: 2,
//       Wtotals: 24,
//       totals: 44,
//       MtotalP: '20%',
//       WtotalP: '30%',
//       totalP: '100%',
//       suggList: [
//         { index: 1, suggesTion: '是的是的检查' },
//         { index: 2, suggesTion: '大撒大撒大撒' },
//         { index: 3, suggesTion: '三四十' },
//         { index: 4, suggesTion: '乳腺科给哥哥飒飒大大进4步检查' }
//       ]
//     },
//     {
//       index: 3,
//       itemName: '子宫结节（小）',
//       total: 33,
//       itemList: [
//         {
//           order: 1,
//           peId: '1234567890',
//           name: '是的',
//           age: 30,
//           sex: '女',
//           unitName: '说的都是'
//         },
//         {
//           order: 2,
//           peId: '1234567890',
//           name: '小带的四',
//           age: 30,
//           sex: '女',
//           unitName: '啊啊'
//         },
//         {
//           order: 3,
//           peId: '1234567890',
//           name: '大苏打',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 4,
//           peId: '1234567890',
//           name: '大苏打',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 5,
//           peId: '1234567890',
//           name: '啊啊啊',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 6,
//           peId: '1234567890',
//           name: '点点的',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 7,
//           peId: '1234567890',
//           name: '天天',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 8,
//           peId: '1234567890',
//           name: '儿是',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 9,
//           peId: '1234567890',
//           name: '犹太人',
//           age: 30,
//           sex: '女',
//           unitName: '某公司测试'
//         },
//         {
//           order: 10,
//           peId: '1234567890',
//           name: '他衣服',
//           age: 30,
//           sex: '女',
//           unitName: '大苏打'
//         }
//       ],
//       Mtotal: 1,
//       Wtotal: 10,
//       Mtotals: 2,
//       Wtotals: 24,
//       totals: 44,
//       MtotalP: '20%',
//       WtotalP: '30%',
//       totalP: '100%',
//       suggList: [
//         { index: 1, suggesTion: '大苏打顶顶顶顶' },
//         { index: 2, suggesTion: '国防费烦烦烦' },
//         { index: 3, suggesTion: '大大啊啊啊啊' },
//         { index: 4, suggesTion: '由于英国国防高等' }
//       ]
//     }
//   ]
// })

const imgSize = ref({
  ageDistributionChart: [650, 400],
  MWabnormalitiesChart: [650, 400],
  WabnormalitiesChart: [650, 400],
  MabnormalitiesChart: [650, 400]
})

const downLoad = () => {
  // 确保图表渲染完成后再转换
  nextTick(() => {
    exportWordImage('../reportDemo.docx', props.data, props.data.unitName, imgSize.value)
  })
}

onMounted(() => {
  console.log('父组件：', props.data)
})
// 暴露方法给父组件
defineExpose({
  downLoad
})
</script>
<style scoped lang="scss"></style>
