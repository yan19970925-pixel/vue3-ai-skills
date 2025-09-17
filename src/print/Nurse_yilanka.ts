import { cssStyle as style } from './index'
const cssStyle = {
  ...style,
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold'
}
const html = (data): string => {
  return `<section style="width:100%;height:98vh;position:relative;font-size:13px;">
            <style type="text/css" media="print">@page { size: portrait;margin:0mm; }</style>
            <div style="width:14%;${cssStyle.alinCenter}">
              <div style="font-size:24px;height:40px;overflow:hidden;">${data.name}</div>
              <div style="font-size:16px;">${data.sex}    ${data.age}岁</div>
              <div style="font-size:16px;">${data.patientId}</div>
              <div style="font-size:16px;">${data.admWardDateTime}</div>
            </div>
          </section>`
}

export default html
