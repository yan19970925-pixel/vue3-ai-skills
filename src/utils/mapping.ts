// 对应的数据元 住院
export const eleList = {
  '656b723c6e4c4314a89247a72ca61961': 'inpNo', //住院号
  '8bfe9dc506f54f5ab01d8617c3956b43': 'deptAdmissionTo', //病区名称
  a4c94cfbe45b44b6a702438eb5b84b96: 'deptName', //科室名称
  '85ee0b08e62c41c0be5092064c8f230c': 'deptName', //科室名称
  ece53737bba645fc8b367ff1204b21c3: 'adtRoomNo', //病房号
  '74e2896b90894ee28a1de54efca903a2': 'bedNo', //病床号
  '1fb2af500c1f4869840fb1f6ca148c71': 'name', //患者姓名
  f24a003d9c9a4c7c8d7df9a4102d2406: 'sex', //性别代码
  d1be898ee8e74bda94cf58374b13297c: 'age', //年龄
  '3b1804981823432081b86d638b19b68b': 'visitId', //住院次数
  a64a2dfcd6b74eada30b9409476cf578: 'age', //婚姻状况
  f3c093e212e24fbb9a586a9eeb1b3dac: 'job', //籍贯
  '079a5415d341416bb0a669ca90446b79': 'job', //职业
  '9b02bba1f6f5438eb02c4767bb265375': 'job', //主诉
  '1f4617d34f0c473abb63892765571cd0': 'job', //现病史
  '34ebbc62e33342188363351e88228aa6': 'job', //既往史
  '7db9f8064d024c11ae5c915dea51e4cb': 'job', //个人史
  '39f4def3ec05472a9878429bbb892b31': 'job', //婚育史
  '6ea3d41396df49b2b5e9d9f9f1886f60': 'job', //家族史
  '8f56f28624ae40c4954776aafd8c28be': 'job', //体格检查-体温（℃）
  '2ed2941d2faa4bfb9c7febfb9383d90d': 'job', //体格检查-脉率（次／min）
  c7db7ac289e24e4088822ff1fc7b9c00: 'job', //体格检查-呼吸频率（次／min)
  '3ca149526e29445c9ed10567655e0f6c': 'job', //体格检查-收缩压（mm-Hg)
  bcc75b0452a64295a8f07e27d2735706: 'job', //体格检查-舒张压(mmHg)
  c03ab0cea8f3464b9c306be265342042: 'job', //民族
  '6c303df252a14b0792ee51e512d7de79': 'admissionDateTime', //入院日期时间
  '583d7e7425b444d4be22221e30c7c79c': 'job', //现住址市（地区、州）
  '82aaa0d7fc06423b8e7eb989fe976f40': 'job', //病史采集时间
  '44e68e439ffa4d828b41aa4f503e0f02': 'job', //身份证件类别代码
  '7a2133e9c61545108e8520390125038d': 'job', //联系人姓名
  '38e44856830e430eb087cef660956a37': 'job', //联系人与患者的关系代码
  '3ef3be354033486cb466ce4f2292c230': 'job', //病史陈述者姓名
  '653a4636bf5c4c249b3241a2be6b9382': 'job', //"联系人地址市（地区、州）"
  '3248e08b68aa4c1dad78e6d4e402b8ac': 'job', //陈述内容可靠标志
  fa67f60f432d4fab9ba02798b737c28d: 'job', //联系人电话号码
  '66295bfdf2d141ebae17884e40c02335': 'job', //入院情况
  '2033708dd49e4d1d983d4bbcd114ba84': 'job' //过敏史
}
export const eleListMer = {}
// 时间类型对应
export const timeType = {
  D4: 'MM-DD',
  CD4: 'MM月DD',
  CD8: 'YYYY年MM月DD日',
  DT8: 'MM-DD hh:mm',
  CDT8: 'MM月DD hh时mm分',
  DT15: 'yyyy-MM-dd hh-mm-ss',
  CDT15: 'YYYY年MM月DD hh时mm分ss秒',
  T6: 'hh:mm:ss',
  CT6: 'hh时mm分ss秒',
  T4: 'hh:ss',
  D8: 'hh时ss秒'
}
// 处理table
let keyArr: any = []
export const getTableData = (tableData) => {
  if (keyArr == null) {
    keyArr = []
  }
  typeof tableData === 'object' &&
    tableData.forEach((item) => {
      if (item.hasOwnProperty('trList')) {
        getTableData(item.trList)
      }
      if (item.hasOwnProperty('tdList')) {
        getTableData(item.tdList)
      }
      if (item.hasOwnProperty('value')) {
        if (item.value !== '' && item.value.length > 1) {
          item.value.forEach((ele) => {
            keyArr.push(ele)
          })
        } else if (item.value !== '' && item.value.length == 1) {
          keyArr.push(item.value[0])
        }
      }
    })
  return keyArr
}
export const getTableList = (tableData) => {
  keyArr = null
  return getTableData(tableData)
}
