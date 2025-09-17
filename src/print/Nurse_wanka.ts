import { cssStyle as style } from './index'
const cssStyle = {
  ...style,
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;',
  fontBold: 'font-weight:bold',
  borderRight: 'border-right:1px solid black;box-sizing:border-box;'
}
const html = (data): string => {
  const manStr = `<html><section style="width:14mm;height:115mm;position:relative;font-size:12px;font-family:SimSun;border:1px solid black;box-sizing:border-box;transform: translate(50%, 123%);">
            <style type="text/css" media="print"></style>
            <div style="width:115mm;height:14mm;transform-origin: center top;transform: translateX(-50%) rotate(-90deg);position: absolute;bottom: 39%;">         
              <div style="${cssStyle.flex};">
              <img src="${
                data.ewmUrl
              }" style="width:12mm;height:12mm;margin-right:5px;margin-top:3px" v-if="${
    data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
  }">
                <div style="flex:1">
                <div style="font-size: 16px;text-align: left;line-height: 16px;padding-left: 60px;">${
                  data.hospitalName
                }</div>
                  <div style="${
                    cssStyle.flexBetween
                  }line-height: 16px;"><div style="width:33%;">住院号：<span style="font-size: 16px">${
    data.inpNo || ''
  }</span></div><div style="width:33%;">姓名：<span style="font-size: 16px">${
    data.name || ''
  }</span></div><div style="width:33%;">床号：<span style="font-size: 16px">${
    data.bedLabel || ''
  }</span></div></div>
  <div style="${
    cssStyle.flex
  };line-height: 16px;"><div style="width:25%;">性别：<span style="font-size: 16px">${
    data.sex || ''
  }${
    data.sex || '' ? '性' : ''
  }</span></div><div style="width:45%;text-align: left">科室：<span style="font-size: 16px">${data.deptTransferedToName.substring(
    0,
    9
  )}</span></div><div style="width:20%;">年龄：<span style="font-size: 16px">${
    data.age || ''
  }</span></div></div>
                </div>
              </div>           
            </div>
          </section><div class="paging"></div></html>`
  const childStr = `<html><section style="width:18mm;height:85mm;position:relative;font-size:12px;font-family:SimSun;border:1px solid black;box-sizing:border-box;transform: translate(23%, 203%);">
            <div style="width:85mm;height:18mm;transform-origin: center top;transform: translateX(-50%) rotate(-90deg);position: absolute;bottom: 29%;">         
              <div style="${cssStyle.flex};">
              <img src="${
                data.ewmUrl
              }" style="width:12mm;height:12mm;margin-top:10px;margin-left: 3px;" v-if="${
    data.ewmUrl === '' || data.ewmUrl === undefined ? false : true
  }">
                <div style="flex:1">
                <div style="font-size: 12px;text-align: left;line-height: 18px;padding-left: 35px;">${
                  data.hospitalName
                }</div>
              <div style="${
                cssStyle.flexBetween
              }line-height: 16px;"><div style="width:38%;transform: scale(0.9);">住院号:<span>${
    data.inpNo || ''
  }</span></div><div style="width:35%;overflow:hidden;transform: scale(0.9);">姓名:<span style="overflow:hidden;">${
    data.name
  }</span></div><div style="width:27%;transform: scale(0.9);">床号:<span>${
    data.bedLabel || ''
  }</span></div></div>
  <div style="${
    cssStyle.flex
  };line-height: 16px;"><div style="width:20%;transform: scale(0.9);">性别:<span>${data.sex || ''}${
    data.sex || '' ? '性' : ''
  }</span></div><div style="width:47%;text-align: left;transform: scale(0.9);">科室:<span>${data.deptTransferedToName.substring(
    0,
    9
  )}</span></div><div style="width:33%;transform: scale(0.9);">年龄:<span>${
    data.age || ''
  }</span></div></div>
    <div style="${
      cssStyle.flex
    }line-height: 16px;"><div style="width:27%;transform: scale(0.9);">体重:<span>${
    data.weight || ''
  }</span></div><div style="width:68%;transform: scale(0.9);"><span>出生日期:</span><span>${
    data.dateOfBirth || ''
  }</span></div>
    </div>
                </div>
              </div>           
            </div>
          </section><div class="paging"></div></html>`
  return data.isChild ? childStr : manStr
}

export default html
