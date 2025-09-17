import { cssStyle as style } from './index'
// export interface CheckItemProps {
//   consultationDoctorName: string
//   consultationDeptName: string
// }
// export interface CheckIdeaProps {
//   consultationDoctor?: string
//   consultationIdea?: string
// }

const cssStyle = {
  ...style,
  divLine: `${style.flexBetween}line-height:24px;`,
  growleft: 'width:33%;text-align:left;line-height:32px;',
  borderRight: 'box-sizing: border-box;border-right:1px solid black;'
}
export const getCheckItem = (item): string => {
  return `<div style="width:80%;height:32px;line-height:32px;display:flex;${cssStyle.flexBetween}">
              <section style="width:40%;height:32px;line-height:32px;display:flex;"><div style="flex:1;height:32px;line-height:32px;"><span style="display:block;width:100%;line-height:32px;text-align:center;border-bottom:1px solid black">${
                item.consultationDeptName
              }</span></div><div style="width:32px;text-align:center;height:32px;line-height:32px;">科</div></section>
              <section style="width:60%;height:32px;line-height:32px;display:flex;"><div style="flex:1;height:32px;line-height:32px;"><span style="display:block;width:100%;line-height:32px;height:32px;text-align:center;border-bottom:1px solid black">${
                item.consultationDoctorName || ''
              }</span></div><div style="width:84px;text-align:center;height:32px;line-height:32px;">医师会诊</div></section>
            </div>`
}
export const getCheckIdea = (item): string => {
  return `<div style="width:100%;height:24px;line-height:24px;${cssStyle.flexBetween}">
              <section style="width:100%;">${item.consultationDoctor}：${item.consultationIdea}</section>
            </div>`
}

const html = (data): string => {
  return `<section style="${cssStyle.printContainer}${cssStyle.padding20LR}${
    cssStyle.borderbox
  };color:black">
            <style type="text/css" media="print">@page { size: A4 portrait; }</style>
            <div style="${cssStyle.title}${cssStyle.titleSize};margin-top:30px;">${
    data.hospitalName
  }</div>
            <div style="${cssStyle.title}margin-bottom:15px;margin-top:12px;${
    cssStyle.subTitleSize
  }">护理会诊申请单</div>
            <div style="border:1px solid black;height:calc(98vh - 190px);">           
                <section style="display:flex;width:100%;border-bottom:1px solid black">
              <div style="width:10%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              };letter-spacing:2px">科别</div>
              <div style="width:17%;text-align:left;line-height:40px;height:40px;padding:0 2px;${
                cssStyle.borderRight
              }">${data.deptName}</div>
              <div style="width:8%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">床号</div>
              <div style="width:8%;text-align:center;line-height:40px;${cssStyle.borderRight}">${
    data.bedLabel
  }</div>
              <div style="width:8%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">姓名</div>
              <div style="width:15%;text-align:center;line-height:40px;${cssStyle.borderRight}">${
    data.name
  }</div>
              <div style="width:8%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">性别</div>
              <div style="width:8%;text-align:center;line-height:40px;${cssStyle.borderRight}">${
    data.sex
  }</div>
              <div style="width:8%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">年龄</div>
              <div style="width:10%;text-align:center;line-height:40px;">${data.age}</div>
            </section>
                <section style="display:flex;width:100%;border-bottom:1px solid black;height:96px;">
              <div style="width:10%;text-align:center;line-height:96px;${
                cssStyle.borderRight
              }">住院号</div>
              <div style="width:17%;text-align:center;line-height:96px;${cssStyle.borderRight}">${
    data.inpNo
  }</div>
              <div style="width:8%;text-align:center;line-height:96px;${
                cssStyle.borderRight
              };letter-spacing:2px">诊断</div>
              <div style="width:65%;line-height:${
                data.diag && data.diag.length > 36 ? '24px' : '96px'
              };font-size:13px;height:96px;padding:4px;box-sizing: border-box;">${
    data.diag || ''
  }</div>
            </section>
            <section style="display:flex;width:100%;border-bottom:1px solid black;height:40px;">
              <div style="width:10%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">会诊类型</div>
              <div style="width:90%;text-align:left;line-height:40px;display:flex;">
              <div style="width:25%;display:flex;line-height:20px;height:20px;margin:10px 0 10px 10%;">
                 <div style="width:16px;height:16px;border:1px solid #333;margin-right:8px;font-size:18px;"><span style="position:relative;left:-2px;display:${
                   data.consultationType == 1 ? 'block' : 'none'
                 };">√</span>
                  </div>
                  <span>普通会诊</span>
              </div>
              <div style="width:25%;display:flex;line-height:20px;height:20px;margin:10px 0 10px 0;">
              <div style="width:16px;height:16px;border:1px solid #333;margin-right:8px;font-size:18px;"><span style="position:relative;left:-2px;display:${
                data.consultationType == 2 ? 'block' : 'none'
              };">√</span>
              </div>
              <span>紧急会诊</span>
              </div></div>
            </section>
            <section style="display:flex;width:100%;border-bottom:1px solid black;height:40px;">
              <div style="width:10%;text-align:center;line-height:40px;${
                cssStyle.borderRight
              }">会诊目的</div>
              <div style="width:90%;text-align:left;line-height:40px;overflow:hidden;height:40px;padding:0 2px;box-sizing:border-box">${
                data.consultationPurpose || ''
              }</div>
            </section>
            <section style="display:flex;width:100%;border-bottom:1px solid black;height:160px;">
              <div style="line-height:20px;font-size:13px;padding:6px;height:148px;overflow:hidden;">${
                data.consultationExplain || ''
              }</div>
            </section>
            <section style="display:flex;width:100%;border-bottom:1px solid black;height:64px;">
              <div style="width:10%;text-align:center;${cssStyle.borderRight}">
                <div style="letter-spacing:2px;margin-top:15px;margin-bottom:6px;">被邀会诊</div>
                <div>人员信息</div>
              </div>
              <div style="width:15%;text-align:center;${cssStyle.borderRight}">
                <div style="height:32px;border-bottom:1px solid black;line-height:32px;box-sizing: border-box;">科室</div>
                <div style="height:32px;line-height:32px;overflow:hidden;">${
                  data.consultationDeptName || ''
                }</div>
              </div>
              <div style="width:15%;text-align:center;${cssStyle.borderRight}">
                <div style="height:32px;border-bottom:1px solid black;line-height:32px;box-sizing: border-box;">职称</div>
                <div style="height:32px;line-height:32px;">${
                  data.consultationNurseTitle || ''
                }</div>
              </div>
              <div style="width:15%;text-align:center;${cssStyle.borderRight}">
                <div style="height:32px;border-bottom:1px solid black;line-height:32px;box-sizing: border-box;">姓名</div>
                <div style="height:32px;line-height:32px;">${data.consultationNurseName || ''}</div>
              </div>
              <div style="width:15%;text-align:center;${cssStyle.borderRight}">
                <div style="height:64px;line-height:64px;box-sizing: border-box;">申请会诊者信息</div>
              </div>
              <div style="width:15%;text-align:center;${cssStyle.borderRight}">
                <div style="height:32px;border-bottom:1px solid black;line-height:32px;box-sizing: border-box;">职称</div>
                <div style="height:32px;line-height:32px;">${data.title || ''}</div>
              </div>
              <div style="width:15%;text-align:center;">
                <div style="height:32px;border-bottom:1px solid black;line-height:32px;box-sizing: border-box;">姓名</div>
                <div style="height:32px;line-height:32px;">${
                  data.consultationApplyNurseName || ''
                }</div>
              </div>
            </section>
            <section style="display:flex;width:100%;border-bottom:1px solid black;height:40px;">
              <div style="width:10%;text-align:center;${cssStyle.borderRight};display:none">
                <div style="margin-top:15px;margin-bottom:6px;">护士长</div>
                <div style="letter-spacing:2px;">审核</div>
              </div>
              <div style="width:30%;text-align:center;${cssStyle.borderRight};display:none">
                <div style="height:64px;line-height:64px;box-sizing: border-box;">${
                  data.nurseHeadName || ''
                }</div>
              </div>
              <div style="width:100%;padding-left:20px;box-sizing:border-box;">
                <div style="height:40px;line-height:40px;box-sizing: border-box;">申请时间：${
                  data.applyDateTime || ''
                }</div>
              </div>
              <div style="width:75%;text-align:center;display:none">
                <div style="height:40px;line-height:40px;box-sizing: border-box;">${
                  data.applyDateTime || ''
                }</div>
              </div>
            </section>
            <section style="width:100%;height:340px;padding:6px;box-sizing:border-box;overflow:hidden;">
              <div style="font-weight:bold;">会诊意见：</div>
              <div style="font-size:13px;line-height:20px;heigth:270px;overflow:hidden;">
                  ${data.consultationIdea || ''}</div>
            </section>
            <div style="width:40%;margin-left:60%;height:60px;">
              <div style="height:30px;line-height:30px;">会诊人员签名：${
                data.consultationNurseName || ''
              }</div>
              <div style="height:30px;line-height:30px;">会诊时间：${data.startDateTime || ''}</div>
            </div>
            </div>         
            </div>
          </section><div class="paging"></div>`
}

export default html
