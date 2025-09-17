import { cssStyle } from './index'
const styles = {
  ...cssStyle,
  table: `border-collapse: collapse;border: 1px solid black;width:100%;`,
  cell: `border: 1px solid black;
         border-top-width: 0;
         border-left-width: 0;
         height:32px;`,
  th: `position: sticky;
       top: 0;
      `,
  hiddenBoder: `border:1px solid transparent;`,
  hiddenText: `color:transparent;`,
  titleTop: `display: flex;font-size: 15px;line-height: 38px;padding-left: 4px;`,
  titleText: `font-size: 20px; font-weight: bold;text-align:center;overflow:hidden;`,
  spanLineBox: `display:flex;justify-content:space-between;height:22px;line-height:22px;margin-top:2px;margin-bottom:2px;`,
  spanLine: `border-bottom:1px solid #bbb;flex:1;margin:0 10px;font-weight:normal;`,
  spanLine2: `border-bottom:1px solid #bbb;padding:0 10px;margin:0 5px;font-weight:normal;`,
  thCss: `border-right:1px solid black;border-top:1px solid black;`,
  trCss: `width:100%;height:28px;line-height:28px;`,
  width30: `display:inline-block;width:18px;height:18px;border:1px solid #aaa;text-align:center;line-height:18px;color:#000;margin-left:4px;margin-right:4px;font-weight:normal;`
}
export const getCheckItem2 = (item, index): string => {
  return `<tr style="${styles.trCss}font-size:13px;height:28px;">
            <td style="width:35%;${
              styles.thCss
            }"><div style="width:100%;display:flex;justify-content:space-between;height:28px;"><span style="width:18%;height:28px;overflow:hidden;display:block;">
            ${
              index == 0 && item.diagnosisDesc2 != ''
                ? '主病'
                : index == 1 && item.diagnosisDesc2 != ''
                ? '主症'
                : ''
            }</span><span style="width:82%;overflow:hidden;display:block;height:28px;font-weight:normal;font-size:${
    item.diagnosisDesc2 && item.diagnosisDesc2.length > 13 ? '12px' : '14px'
  };line-height:${item.diagnosisDesc2 && item.diagnosisDesc2.length > 13 ? '14px' : '28px'};">${
    item.diagnosisDesc2
  }</span></div></td>
            <td style="width:10%;${
              styles.thCss
            }font-weight:normal"><span style="margin-left:2px;overflow:hidden;display:block;height:28px;">${
    item.diagnosisCode2 || ''
  }</span></td>
            <td style="width:5%;${styles.thCss}text-align:center;font-weight:normal">${
    item.admissionCondition2 || ''
  }</td>
            <td style="width:35%;${
              styles.thCss
            }"><div style="width:100%;display:flex;justify-content:space-between;height:28px;"><span style="width:26%;height:28px;overflow:hidden;display:block;font-size:12px;">
            ${
              index == 0 && item.diagnosisDesc != ''
                ? '主要诊断'
                : index == 1 && item.diagnosisDesc != ''
                ? '其他诊断'
                : ''
            }</span><span style="width:74%;overflow:hidden;display:block;height:28px;font-weight:normal;font-size:${
    item.diagnosisDesc && item.diagnosisDesc.length > 11 ? '12px' : '14px'
  };line-height:${item.diagnosisDesc && item.diagnosisDesc.length > 11 ? '14px' : '28px'};">${
    item.diagnosisDesc || ''
  }</span></div></td>
            <td style="width:10%;${
              styles.thCss
            }font-weight:normal"><span style="margin-left:2px;overflow:hidden;display:block;height:28px;">${
    item.diagnosisCode || ''
  }</span></td>
            <td style="width:5%;${styles.thCss}text-align:center;font-weight:normal">${
    item.admissionCondition || ''
  }</td>
        </tr>`
}
export const getCheckItem = (item): string => {
  return `<div style="${cssStyle.flexBetween};font-size:12px;${styles.trCss}">
          <div style="width:10%;${styles.thCss}overflow:hidden;"><span style="margin-left:2px;">${
    item.operationCode || ''
  }</span>
          </div>
          <div style="width:12%;${styles.thCss}text-align:center;">${item.operatingDate || ''}
          </div>
          <div style="width:4%;${styles.thCss}text-align:center;">${item.operationScale || ''}
          </div>
          <div style="width:28%;${
            styles.thCss
          };overflow:hidden;"><span style="margin-left:2px;display:inline-block;height:28px;line-height:${
    item.operationDesc && item.operationDesc.length > 16 ? '14px' : '28px'
  };">${item.operationDesc || ''}</span></div>
          <div style="width:21%;${styles.flexBetween}">
            <div style="width:33%;${styles.thCss}"><span style="margin-left:2px;">${
    item.operator || ''
  }</span>
            </div>
            <div style="width:33%;${styles.thCss}"><span style="margin-left:2px;">${
    item.firstAssistant || ''
  }</span>
            </div>
            <div style="width:34%;${styles.thCss}"><span style="margin-left:2px;">${
    item.secondAssistant || ''
  }</span>
            </div>
          </div>
          <div style="width:6%;${styles.thCss}text-align:center;font-weight:800">${
    item.woundGrade || ''
  }/${item.heal || ''}
            </div>
          <div style="width:15%;${styles.thCss}"><span style="margin-left:2px;">${
    item.anaesthesiaMethod || ''
  }</span></div>
          <div style="width:7%;${styles.thCss};border-right:none;"><span style="margin-left:2px;">${
    item.anesthesiaDoctor || ''
  }</span>
          </div>
        </div>`
}
export const html = (data): string => {
  return `<section style="font-family:SimSun;${
    cssStyle.padding10LR
  }"><style type="text/css" media="print">@page { size: A4;margin:0mm; }</style>
  <section style="width:100%;height:98vh;box-sizing:border-box;font-size:14px;font-weight:800;padding-top:30px;">
      <div
        style="
          ${styles.titleTop}
        "
      >
        <div style="width: 30%;display:flex;font-weight:normal;">
          <img style="width: 130px; height: 38px;" src="${data.img}" /><div
            style="display: inline-block; margin-left: 10px;"
            >医疗机构</div
          >
        </div>
        <div style="width: 37%;${styles.titleText};">
          <div style="width:100%;overflow:hidden;font-weight:800;height:38px;">${
            data.hospitalName
          }</div></div
        >
        <div style="width: 33%;text-align:right;font-weight:normal;">(组织机构代码:<span style="border-bottom:1px solid #bbb;flex:1;margin:0 4px;">${
          data.hospitalCode
        }</span>) </div>
      </div>
      <div
        style="display: flex;font-size: 14px;padding-left: 4px;height:32px;line-height:32px;"
      >
        <div style="width: 30%;color:red;font-weight:normal;"
          >医疗付费方式：<span style="${styles.width30}">${
    data.mrBaseInfo.medicalPayWay || '—'
  }</span></div
        >
        <div style="width: 40%; ${
          styles.titleText
        };border-bottom:none;font-weight:800;"> <strong>住院病案首页</strong></div>
        <div style="width: 10%;"></div>
        <div style="width: 20%;${styles.spanLineBox}font-weight:normal;">病案号：<span style="${
    styles.spanLine
  }">${data.mrBaseInfo.inpNo}</span></div>
      </div>
      <div
        style="${
          cssStyle.flexBetween
        };height:24px;line-height:24px;padding-left:4px;margin-bottom:4px;padding-bottom:2px;font-weight:normal;"
      >
        <div style="width: 30%;${styles.spanLineBox}"
          >健康卡号：<span style="${styles.spanLine};display:inline-block;">${
    data.mrBaseInfo.healthyCardNo || '——'
  }</div
        >
        <div style="width: 40%;text-align:center;"><div style="margin:0 auto;width:36%;${
          styles.spanLineBox
        }">第<span style="border-bottom:1px solid #bbb;padding:0 5px;margin:0 2px;">${
    data.mrBaseInfo.visitId
  }</span>次住院</div></div>
        <div style="width: 10%;"></div>
        <div style="width: 22%;${styles.spanLineBox}">病人ID：
          <span style="${styles.spanLine}">${data.mrBaseInfo.patientId}</span></div>
      </div>
      <section style="border:1px solid black;padding:5px;border-bottom:none;">
        <div style="${cssStyle.flexBetween}">
          <div style="width:20%;${styles.spanLineBox}overflow:hidden;">姓名<span style="${
    styles.spanLine
  }height:24px;">${data.mrBaseInfo.name || '——'}</span></div>
          <div style="width:20%;position:relative;top:2px;">性别<span style="${styles.width30}">${
    data.mrBaseInfo.sex || '—'
  }</span><span style="font-weight:normal">1.男 2.女</span></div>
          <div style="width:30%;${styles.spanLineBox}">出生日期<span style="${styles.spanLine}">${
    data.mrBaseInfo.dateOfBirth || '——'
  }</span></div>
          <div style="width:13%;${styles.spanLineBox}">年龄<span style="${styles.spanLine}">${
    data.mrBaseInfo.age
  }${data.mrBaseInfo.age > 1 ? '岁' : ''}</span></div>
          <div style="width:17%;${styles.spanLineBox}">国籍<span style="${styles.spanLine}">${
    data.mrBaseInfo.citizenShip || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}margin:3px 0">
          <div style="width:35%;"><span style="font-weight:normal;">（年龄不足1周岁）</span>年龄<span style="${
            styles.spanLine2
          }">${data.mrBaseInfo.age < 1 ? data.mrBaseInfo.newBornAge : '——'}</span></div>
          <div style="width:30%;text-align:center">新生儿出生体重<span style="${
            styles.spanLine2
          }">${data.mrBaseInfo.newbornBirthWeight || '——'}</span>克</div>
          <div style="width:30%;">新生儿入院体重<span style="${styles.spanLine2}">${
    data.mrBaseInfo.newbornWeight || '——'
  }</span>克</div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:40%;${styles.spanLineBox}">出生地<span style="${styles.spanLine}">${
    data.mrBaseInfo.birthPlace || '——'
  }</span></div>
          <div style="width:40%;${styles.spanLineBox}">籍贯<span style="${styles.spanLine}">${
    data.mrBaseInfo.nativePlace || '——'
  }</span></div>
          <div style="width:20%;${styles.spanLineBox}">民族<span style="${styles.spanLine}">${
    data.mrBaseInfo.nation || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:40%;${styles.spanLineBox}">身份证号<span style="${styles.spanLine}">${
    data.mrBaseInfo.idNo || '——'
  }</span></div>
          <div style="width:20%;${styles.spanLineBox}">职业<span style="${styles.spanLine}">${
    data.mrBaseInfo.occupation || '——'
  }</span></div>
          <div style="width:40%;">婚姻：<span style="${styles.width30}">${
    data.mrBaseInfo.maritalStatus || '—'
  }</span><span style="font-weight:normal">1.未婚2.已婚3.丧偶4.离婚9其他</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:56%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">现住址<span style="${styles.spanLine}">${
    data.mrBaseInfo.patientAreaAddress || '无'
  }</span></div>
          <div style="width:28%;${styles.spanLineBox}">电话<span style="${styles.spanLine}">${
    data.mrBaseInfo.patPhone || '未提供'
  }</span></div>
          <div style="width:16%;${styles.spanLineBox}">邮编<span style="${styles.spanLine}">${
    data.mrBaseInfo.patZip || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:84%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">户口地址<span style="${styles.spanLine}">${
    data.mrBaseInfo.mailingAddress || '无'
  }</span></div>
          <div style="width:16%;${styles.spanLineBox}">邮编<span style="${styles.spanLine}">${
    data.mrBaseInfo.zipCode || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:56%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">工作单位<span style="${styles.spanLine}">${
    data.mrBaseInfo.serviceAgency || '无'
  }</span></div>
          <div style="width:28%;${styles.spanLineBox}">电话<span style="${styles.spanLine}">${
    data.mrBaseInfo.phoneNumberBusiness || '未提供'
  }</span></div>
          <div style="width:16%;${styles.spanLineBox}">邮编<span style="${styles.spanLine}">${
    data.mrBaseInfo.businessZipCode || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:20%;${styles.spanLineBox};overflow:hidden;">联系人姓名<span style="${
    styles.spanLine
  }">${data.mrBaseInfo.nextOfKin || '——'}</span></div>
          <div style="width:20%;${styles.spanLineBox}">关系<span style="${styles.spanLine}">${
    data.mrBaseInfo.relationship || '——'
  }</span></div>
          <div style="width:36%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">地址<span style="${
    styles.spanLine
  }height:24px;overflow:hidden">${data.mrBaseInfo.nextOfKinAddr || '无'}</span></div>
          <div style="width:24%;${styles.spanLineBox}">电话<span style="${styles.spanLine}">${
    data.mrBaseInfo.nextOfKinPhone || '未提供'
  }</span></div>
        </div>
        <div>入院途径    <span style="${styles.width30}">${
    data.mrBaseInfo.patientClass || '—'
  }</span><span style="font-weight:normal;">1.急诊    2.门诊    3.其他医疗机构转入    9其他</span></div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:30%;${styles.spanLineBox}">入院日期<span style="${styles.spanLine}">${
    data.mrBaseInfo.admissionDateTime
  }</span></div>
          <div style="width:26%;${styles.spanLineBox};overflow:hidden">入院科别<span style="${
    styles.spanLine
  }">${data.mrBaseInfo.deptAdmissionTo || '——'}</span></div>
          <div style="width:16%;${styles.spanLineBox}">床号<span style="${styles.spanLine}">${
    data.mrBaseInfo.bedNo
  }</span></div>
          <div style="width:28%;${styles.spanLineBox};overflow:hidden">转院科别<span style="${
    styles.spanLine
  }">${data.mrBaseInfo.transDeptName || '——'}</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:30%;${styles.spanLineBox}">出院日期<span style="${styles.spanLine}">${
    data.mrBaseInfo.dischargeDateTime || '——'
  }</span></div>
          <div style="width:26%;${styles.spanLineBox};overflow:hidden">出院科别<span style="${
    styles.spanLine
  }">${data.mrBaseInfo.deptDischargeFrom || '——'}</span></div>
          <div style="width:16%;${styles.spanLineBox}">床号<span style="${styles.spanLine}">${
    data.mrBaseInfo.bedNo || '——'
  }</span></div>
          <div style="width:28%;${styles.spanLineBox}">实际住院<span style="${styles.spanLine}">${
    data.mrBaseInfo.zyts || '——'
  }</span>天</div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:72%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">门(急)诊西医诊断<span style="${styles.spanLine}">${
    data.mrDiagnosisInfo.mzList[0].diagnosisDesc || '——'
  }</span></div>
          <div style="width:28%;${styles.spanLineBox}">疾病编码<span style="${styles.spanLine}">${
    data.mrDiagnosisInfo.mzList[0].diagnosisCode || '——'
  }</span></div>
        </div>
        <div style="${cssStyle.flexBetween}">
          <div style="width:72%;${
            styles.spanLineBox
          };height:22px;overflow:hidden;">门(急)诊中医诊断<span style="${styles.spanLine}">${
    data.mrTcmDiagnosisInfo.zyryList && data.mrTcmDiagnosisInfo.zyryList.length > 0
      ? data.mrTcmDiagnosisInfo.zyryList[0].diagnosisDesc
      : '——'
  }</span></div>
          <div style="width:28%;${styles.spanLineBox}">疾病编码<span style="${styles.spanLine}">${
    data.mrTcmDiagnosisInfo.zyryList && data.mrTcmDiagnosisInfo.zyryList.length > 0
      ? data.mrTcmDiagnosisInfo.zyryList[0].diagnosisCode
      : '——'
  }</span></div>
        </div>
      </section>
        <table style="width:100%;border:1px solid black;border-right:none;border-top:none;" cellspacing="0">
        <tr style="${styles.trCss}font-size:13px;height:28px;">
            <th style="width:35%;${styles.thCss}">出院中医诊断</th>
            <th style="width:10%;${styles.thCss}">疾病编码</th>
            <th style="width:5%;${
              styles.thCss
            }"><div style="height:14px;line-height:14px;">入院</div><div style="height:14px;line-height:14px;">病情</div></th>
            <th style="width:35%;${styles.thCss}">出院西医诊断</th>
            <th style="width:10%;${styles.thCss}">疾病编码</th>
            <th style="width:5%;${
              styles.thCss
            }"><div style="height:14px;line-height:14px;">入院</div><div style="height:14px;line-height:14px;">病情</div></th>
        </tr>
        ${data.dianoseArr.map((item, index) => getCheckItem2(item, index)).join('')}
        <tr style="${styles.trCss}">
          <td style="width:100%;padding-left:15px;font-weight:normal;${
            styles.thCss
          }" colspan="6">入院病情：1.有，2.临床未确定，3.情况不明，4.无</td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:80%;float:left;">损伤.中毒的外部原因<span style="margin-left:5px;font-weight:normal">${
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList.length > 0 &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList[0].diagnosisDesc
      ? data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList[0].diagnosisDesc
      : '——'
  }</span></div><div style="width:20%;float:left;">疾病编码<span style="margin-left:5px;font-weight:normal">${
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList.length > 0 &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList[0].diagnosisCode
      ? data.mrDiagnosisInfo.mrOtherDiagnosisVO.sszdList[0].diagnosisCode
      : '——'
  }</span></div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:60%;float:left;">病理诊断<span style="margin-left:5px;font-weight:normal">${
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList.length > 0 &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].diagnosisDesc
      ? data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].diagnosisDesc
      : '——'
  }</span></div><div style="width:20%;float:left;">病理号<span style="margin-left:5px;font-weight:normal">${
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList.length > 0 &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].pathologyNo
      ? data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].pathologyNo
      : '——'
  }</span></div><div style="width:20%;float:left;">疾病编码<span style="margin-left:5px;font-weight:normal">${
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList.length > 0 &&
    data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].diagnosisCode2
      ? data.mrDiagnosisInfo.mrOtherDiagnosisVO.blzdList[0].diagnosisCode2
      : '——'
  }</span></div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:70%;float:left;height:28px;overflow:hidden;">药物过敏    <span style="${
    styles.width30
  };position:relative;top:1px;">${
    data.mrOtherInfo[0].alergyDrugsCode || '—'
  }</span><span style="font-weight:normal">1.无    2.有    </span>过敏药物：<span style="font-weight:normal">${
    data.mrOtherInfo[0].alergyDrugs || '——'
  }</span></div><div style="width:30%;float:left;text-align:right;">死亡患者尸检    <span style="${
    styles.width30
  }">${
    data.mrOtherInfo[0].autopsyIndicator || '—'
  }</span><span style="font-weight:normal">1.是    2.否</span></div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:50%;float:left;">血    型    <span style="${
    styles.width30
  }">${
    data.mrOtherInfo[0].bloodType || '—'
  }</span><span style="font-weight:normal">1.A    2.B    3.O    4.AB    5.不详    6.未查    </span></div><div style="width:50%;float:left;text-align:right;">Rh    <span style="${
    styles.width30
  }">${
    data.mrOtherInfo[0].bloodTypeRh || '—'
  }</span><span style="font-weight:normal">1.阴    2.阳    3.不详    4.未查</span></div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:25%;float:left;position:relative;">科主任    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].directorSignValue == undefined ||
      data.mrOtherInfo[0].directorSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].director || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].directorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 50px" />`
  }</div><div style="width:25%;float:left;position:relative;">主任(副主任)医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].chiefDoctorSignValue == undefined ||
      data.mrOtherInfo[0].chiefDoctorSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].chiefDoctor || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].chiefDoctorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 120px" />`
  }</div><div style="width:25%;float:left;position:relative;">主治医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].attendingDoctorSignValue == undefined ||
      data.mrOtherInfo[0].attendingDoctorSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].attendingDoctor || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].attendingDoctorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;position:relative;">住院医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].doctorInChargeSignValue == undefined ||
      data.mrOtherInfo[0].doctorInChargeSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].doctorInCharge || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].doctorInChargeSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:25%;float:left;position:relative;">责任护士    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].dutyNurseSignValue == undefined ||
      data.mrOtherInfo[0].dutyNurseSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].dutyNurse || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].dutyNurseSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;position:relative;">进修医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].advancedStudiesDoctorSignValue == undefined ||
      data.mrOtherInfo[0].advancedStudiesDoctorSignValue == '')
      ? `<span style="font-weight:normal">${
          data.mrOtherInfo[0].advancedStudiesDoctor || '——'
        }</span>`
      : `<img src="${
          data.mrOtherInfo[0].advancedStudiesDoctorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;position:relative;">实习医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].practiceDoctorSignValue == undefined ||
      data.mrOtherInfo[0].practiceDoctorSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].practiceDoctor || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].practiceDoctorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;position:relative;">编码员    <span style="font-weight:normal">${
    data.mrOtherInfo[0].cataloger || '——'
  }</span></div></td>
        </tr>
        <tr style="${styles.trCss}">
          <td style="width:100%;${
            styles.thCss
          }" colspan="6"><div style="width:27%;float:left;">病案质量<span style="${
    styles.width30
  }position:relative;top:1px;">${
    data.mrOtherInfo[0].mrQuality || '—'
  }</span><span style="font-weight:normal">1.甲2.乙3.丙</span></div><div style="width:23%;float:left;position:relative;">质控医师    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].qualityDoctorSignValue == undefined ||
      data.mrOtherInfo[0].qualityDoctorSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].qualityDoctor || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].qualityDoctorSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;position:relative;">质控护士    ${
    data.mrOtherInfo[0] &&
    (data.mrOtherInfo[0].qualityNurseSignValue == undefined ||
      data.mrOtherInfo[0].qualityNurseSignValue == '')
      ? `<span style="font-weight:normal">${data.mrOtherInfo[0].qualityNurse || '——'}</span>`
      : `<img src="${
          data.mrOtherInfo[0].qualityNurseSignValue || ''
        }" style="width:52px;height:26px;position:absolute;bottom:1px;left: 60px" />`
  }</div><div style="width:25%;float:left;">质控日期    <span style="font-weight:normal">${
    data.mrOtherInfo[0].qualityDate || '——'
  }</span></div></td>
        </tr>
    </table>
    </section>
    </section>
    <section id="two-page" style="font-family:SimSun;${
      cssStyle.padding10LR
    }width:100%;height:98vh;font-size:14px;padding-top:30px;box-sizing:border-box;">
      <div style="border:1px solid black;width:100%;border-top:none;padding-bottom:30px;">
        <div style="${
          cssStyle.flexBetween
        };text-align:center;font-size:12px;height:40px;width:100%;">
          <div style="width:10%;${styles.thCss};padding-top:5px;font-weight:800">
            <span style="display:block;">手术及</span>
            <span style="display:block;">操作编码</span>
          </div>
          <div style="width:12%;${styles.thCss};padding-top:5px;font-weight:800">
            <span style="display:block;">手术及</span>
            <span style="display:block;">操作日期</span>
          </div>
          <div style="width:4%;${styles.thCss};padding-top:5px;font-weight:800">
            <span style="display:block;">手术</span>
            <span style="display:block;">级别</span>
          </div>
          <div style="width:28%;line-height:40px;font-weight:800;${
            styles.thCss
          }">手术及操作名称</div>
          <div style="width:21%;${styles.thCss}font-weight:800">
            <span style="display:block;line-height:20px;">手术及操作医师</span>
            <div style="${cssStyle.flexBetween};width:100%;border-top:1px solid black;">
              <span style="display:block;width:33%;line-height:19px;border-right:1px solid black;">术者</span>
              <span style="display:block;width:33%;line-height:19px;border-right:1px solid black;">Ⅰ助</span>
              <span style="display:block;width:34%;line-height:19px;">Ⅱ助</span>
            </div>
          </div>
          <div style="width:6%;${styles.thCss};padding-top:5px;font-weight:800">
            <span style="display:block;">切口愈</span>
            <span style="display:block;">合等级</span>
          </div>
          <div style="width:15%;line-height:40px;${styles.thCss}font-weight:800">麻醉方式</div>
          <div style="width:7%;${styles.thCss};padding-top:5px;border-right:none;font-weight:800">
            <span style="display:block;">麻醉</span>
            <span style="display:block;">医师</span>
          </div>
        </div>
        ${data.mrOperationInfo.map((item) => getCheckItem(item)).join('')}
        <div style="display:flex${styles.trCss}${
    styles.spanLineBox
  };border-top:1px solid black;padding-left:4px;padding-top:4px;position:relative;top:-2px;">
          <span style="font-weight:800">离院方式：</span><span style="${styles.width30}">${
    data.mrOtherInfo[0].dischargeDisposition || '—'
  }</span>1.医嘱离院        2.医嘱转院，拟接受医疗机构名称：<span style="${
    styles.spanLine
  };overflow:hidden;display:inline-block;height:24px;">${
    data.mrOtherInfo[0].transHospital || '——'
  }</span>    
        </div>
<div style="${cssStyle.flexBetween}${styles.trCss}${
    styles.spanLineBox
  };border:none;padding-left:4px;">
          3.医嘱转社区卫生服务机构/乡镇卫生院，拟接受医疗机构名称：<span style="${
            styles.spanLine
          }">${data.mrOtherInfo[0].transCommunity || '——'}</span>    
        </div>
<div style="${cssStyle.flexBetween}${styles.trCss}${cssStyle.border1pxBottom}padding-left:4px;">
          4.非医嘱离院        5.其他        9.其他</div>
<div style="display:flex;${styles.trCss}${
    cssStyle.border1pxBottom
  }padding-left:4px;overflow:hidden;height:24px;">
    是否有出院31天内再住院计划<span style="${styles.width30}">${
    data.mrOtherInfo[0].plan31Admission || '—'
  }</span>1.无        2.有        目的：${data.mrOtherInfo[0].reason31Admission || '——'}   
        </div>
<div style="display:flex;${styles.trCss}${cssStyle.border1pxBottom}${
    styles.spanLineBox
  }padding-left:4px;padding-bottom:2px;">
          颅脑损伤患者昏迷时间:   入院前<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
            data.mrOtherInfo[0].comaTimesB0 || '—'
          }</span>天<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
    data.mrOtherInfo[0].comaTimesB1 || '—'
  }</span>小时<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
    data.mrOtherInfo[0].comaTimesB2 || '—'
  }</span>分钟   入院后<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
    data.mrOtherInfo[0].comaTimesA0 || '—'
  }</span>天<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
    data.mrOtherInfo[0].comaTimesA1 || '—'
  }</span>小时<span style="border-bottom:1px solid #bbb;padding:0 5px;">${
    data.mrOtherInfo[0].comaTimesA2 || '—'
  }</span><span style="position:relative;left:-5px;">分钟</span>
        </div>
        <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:50%;display:flex;justify-content:space-between;padding-left:4px;">住院费用总计(元):<span style="${
        styles.spanLine
      }text-align:center">${data.mrCostInfo.totalCosts || '—'}</span>
      </div><div style="width:30%;display:flex;justify-content:space-between;">(自付金额:<span style="${
        styles.spanLine
      }text-align:center">${data.mrCostInfo.zfje || '—'}</span>)</div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">1.综合医疗服务类:
      </div>
      <div style="width:38%;">
      <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(1) 一般医疗服务费:<span style="${
        styles.spanLine
      }">${data.mrCostInfo.costs01}</span></div>
      <div style="width:100%;display:flex;justify-content:space-between;">(3) 护理费:<span
          style="${styles.spanLine}">${data.mrCostInfo.costs03}</span></div>
    </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(2) 一般治疗操作费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs02}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(4) 综合医疗服务费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs04}</span></div>
      </div>
    </div>

    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">2.诊断类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(5) 病理诊断费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs05}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(7) 影像学诊断费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs07}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(6) 实验室诊断费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs06}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(8) 临床诊断项目费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs08}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">3.治疗类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(9) 非手术治疗项目费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs09}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(10) 手术治疗费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs10}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(临床物理治疗费:)<span
            style="${styles.spanLine}">${data.mrCostInfo.costs0901}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(麻醉费:<span
            style="${styles.spanLine}text-align:center">${
    data.mrCostInfo.costs1001
  }</span>)(手术费:<span style="${styles.spanLine}text-align:center">${
    data.mrCostInfo.costs1002
  }</span>)</div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">4.康复类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(11) 康复费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs11}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">5.中医类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(12) 中医治疗费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs12}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">6.西药类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(13) 西药费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs13}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(抗菌药物费用:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs1301}</span>)</div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">7.中药类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(14) 中成药费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs14}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(15) 中草药费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs15}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">8.血液和血液制品类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(16) 血费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs16}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(18) 球蛋白类制品费:<span
            style="${styles.spanLine}">${
    data.mrCostInfo.costs18
  }</span></div><div style="width:100%;display:flex;justify-content:space-between;">(20) 细胞因子类制品费:<span
                style="${styles.spanLine}">${data.mrCostInfo.costs20}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(17) 血蛋白类制品费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs17}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(19) 凝血因子类制品费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs19}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;">
      <div style="width:19%;font-weight:800;padding-left:4px;">9.耗材类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(21) 检查用一次性医用材料费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs21}</span></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(22) 治疗用一次性医用材料费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs22}</span></div>
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:3px;height:22px;"></div>
        <div style="width:100%;display:flex;justify-content:space-between;">(23) 手术用一次性医用材料费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs23}</span></div>
      </div>
    </div>
    <div style="width:100%;display:flex;line-height:26px;padding-bottom:10px;border-bottom:1px solid black">
      <div style="width:19%;font-weight:800;padding-left:4px;">10.其他类:
      </div>
      <div style="width:38%;">
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:1px;">(24) 其他费:<span
            style="${styles.spanLine}">${data.mrCostInfo.costs24}</span></div>
      </div>
    </div>
      </div>
      <div style="line-height:22px;margin-top:5px;">说明：(一)医疗付费方式  1.城镇职工基本医疗保险  2.城镇居民基本医疗保险  3.新型农村合作医疗  4.贫困救助</div>
    <div style="line-height:22px;padding-left:70px;">5.商业医疗保险  6.全公费  7.全自费  8.其他社会保险  9.其他</div>
    <div style="line-height:22px;padding-left:46px;">(二)凡可由医院信息系统提供住院费用清单的，住院病案首页中可不填写“住院费用”</div>
    </section>`
}
export default html
