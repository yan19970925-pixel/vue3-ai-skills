<template>
  <div class="box" ref="writeSignBox">
    <!--  <br /><br />
    连接状态（State）:
    <label id="label_state"></label>
    <br /><br />
    <div style="width: 615px; height: 272px; border: solid 1px #1b65ee; background-color: #fff">
      <img id="img_sign_result" src="" />
    </div>
    <br />
    <el-button type="primary" @click="beginSign">开始签名</el-button>
    <button @click="saveSignToBase64">保存为base64</button>
    <button @click="endSign">结束签名</button>
    <br /><br /> -->
  </div>
</template>

<script setup>
// import { onMounted, ref } from 'vue'
// import PluginNSV from '../../../utils/writeSign/js-NSV.js'

// const loadingBox = ref(null)

// function debugPrint(text) {
//   text = 'DebugPrint[' + text + ']'
//   console.log('%c Line:28 🍎 text', 'color:#fca650', text)
// }

// let plugin = null

// function initPlugin() {
//   if (!!plugin) {
//     plugin.DestroyPlugin()
//   }
//   plugin = new PluginNSV()
//   plugin.InitPlugin(function (state) {
//     if (state === 1) {
//       //set pen size
//       plugin.setPenSizeRange(1, 5, null)
//       //set pen color
//       plugin.setPenColor(0, 0, 0, null)

//       document.getElementById('label_state').innerText = '服务连接成功.'
//       debugPrint('initialize plugin OK.')
//     } else {
//       document.getElementById('label_state').innerText = '连接失败.'
//       debugPrint('initialize plugin fails.')
//     }
//   })

//   /*confirm event*/
//   plugin.onConfirm = function () {
//     saveSignToBase64()
//     endSign()
//   }
//   /*clear event*/
//   plugin.onClear = function () {
//     clearSign()
//   }
//   /*cancel event*/
//   plugin.onCancel = function () {
//     endSign()
//   }

//   plugin.NoSigned = function () {
//     NoSign()
//   }
// }

// function NoSign() {
//   if (!!plugin) {
//     plugin.NoSign(function (state, args) {
//       if (state) {
//         //The function call successful.
//         debugPrint('NoSign OK')
//       } else {
//         debugPrint('NoSign error,description:' + args[0])
//       }
//     })
//   }
// }

// function clearSign() {
//   if (!!plugin) {
//     //Reset the signature panel.
//     plugin.clearSign(function (state, args) {
//       if (state) {
//         debugPrint('clearSign OK')
//       } else {
//         debugPrint('clearSign error,description:' + args[0])
//       }
//     })
//   }
//   //清空图像
//   // document.getElementById('img_sign_result').src = ''
// }

// function beginSign() {
//   document.getElementById('img_sign_result').src = ''

//   if (!!plugin) {
//     plugin.beginSign(function (state, args) {
//       if (state) {
//         //The function call successful.
//         //Play the wizard sound, etc.
//         plugin.setDisplayMapMode(1, state)
//         debugPrint('beginSign OK')
//       } else {
//         debugPrint('beginSign error,description:' + args[0])
//       }
//     })
//   }
// }

// function endSign() {
//   if (!!plugin) {
//     plugin.endSign(function (state, args) {
//       if (state) {
//         //The function call successful.
//         debugPrint('endSign OK')
//       } else {
//         debugPrint('endSign error,description:' + args[0])
//       }
//     })
//   }
// }

// function saveSignToBase64() {
//   if (!!plugin) {
//     plugin.saveSignToBase64(0, 0, function (state, args) {
//       if (state) {
//         var img_base64_data = args[0]
//         //Show the signature image.
//         var img_base64 = 'data:image/png;base64,' + img_base64_data
//         console.log('%c Line:138 🍆 img_base64', 'color:#e41a6a', img_base64)
//         document.getElementById('img_sign_result').src = img_base64
//         debugPrint('saveSignToBase64 OK')
//       } else {
//         debugPrint('saveSignToBase64 error,description:' + args[0])
//       }
//     })
//   }
// }

// onMounted(() => {
//   initPlugin()
// })
</script>

<style lang="scss" scoped></style>
