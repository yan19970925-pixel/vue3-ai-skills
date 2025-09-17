import { cssStyle as style } from './index'
const cssStyle = {
  ...style,
  divLine: `display:flex;line-height:30px;box-sizing:border-box;`,
  growleft: 'width:33%;text-align:left;line-height:26px;',
  alinCenter: 'text-align:center;font-weight:bold',
  fontBold: 'font-weight:bold',
  borderRight: 'border-bottom:1px solid black;box-sizing:border-box;'
}
const html = (data): string => {
  return `<section style="${cssStyle.printContainer}${
    cssStyle.padding40LR
  }width:50%;margin-left:50%;box-sizing:border-box;font-size:16px;">
            <style type="text/css" media="print">@page { size: A4;margin:0mm; }</style>
            <div style="border:1px solid black;width:100%;height:46%;box-sizing:border-box;">
              <div style="height:80px;${
                cssStyle.alinCenter
              };font-size:30px;line-height:80px;letter-spacing: 10px;margin-bottom:10px;">床头卡</div>
              <div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;height:30px;line-height:30px;${
                  cssStyle.alinCenter
                }">姓名</div><div style="width:30%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.name || ''}</span></div>
<div style="width:20%;${
    cssStyle.alinCenter
  };height:30px;line-height:30px;">性别</div><div style="width:30%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.sex || ''}${data.sex ? '性' : ''}</span></div></div>
  <div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">年龄</div><div style="width:30%;${
    cssStyle.borderRight
  };height:30px;line-height:30px;"><span style="margin-left:10px;">${data.age}</span></div>
<div style="width:20%;${
    cssStyle.alinCenter
  };height:30px;line-height:30px;">床号</div><div style="width:30%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.bedLabel || ''}</span></div></div>
<div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">病历号</div><div style="width:80%;${
    cssStyle.borderRight
  };height:30px;line-height:30px;"><span style="margin-left:10px;">${
    data.inpNo || ''
  }</span></div>         
  </div>
    <div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">科别</div><div style="width:80%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.deptName || ''}</span></div>
              </div>
              <div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">入院时间</div><div style="width:80%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.admWardDateTime || ''}</span></div>
              </div>
              <div style="height:30px;line-height:30px;${cssStyle.divLine};margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">护理等级</div><div style="width:80%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.nursingClassName || ''}</span></div>          
  </div>
              <div style="height:30px;line-height:30px;${cssStyle.divLine}margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">过敏史</div><div style="width:80%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:3px;">${data.allergicDrugs || ''}</span></div> </div>
              <div style="height:30px;line-height:30px;${cssStyle.divLine}margin-bottom:17px;">
                <div style="width:20%;${
                  cssStyle.alinCenter
                };height:30px;line-height:30px;">饮食情况</div><div style="width:80%;height:30px;line-height:30px;${
    cssStyle.borderRight
  }"><span style="margin-left:10px;">${data.diag || ''}</span></div>
              </div>
            </div>
          </section>`
}

export default html
