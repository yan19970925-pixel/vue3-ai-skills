var IEtype = -1 // 0为IE 1为支持H5接口标准的
var g_strSignSrc //签名原文

//获取签名随机数
function GetRandom() {
  var rand = Math.random()
  rand = Math.ceil(rand * 1000000000)
  $('#sourcedata').val(rand)
  return rand
}

//用于cb_SelectCert获取数据
var g_jshnca_Certbase64id = ''
var g_jshnca_CertCNid = ''
var g_jshnca_CertOid = ''
var g_jshnca_CertDNid = ''
var g_jshnca_certkeyid = ''
var g_jshnca_certStartTime = ''
var g_jshnca_certEndTime = ''

//获取证书信息的页面调用
export function SelectCert(
  Certbase64id,
  CertCNid,
  CertOid,
  CertDNid,
  certkeyid,
  certStartTime,
  certEndTime,
  certKZ,
  certSN,
  CAInfoCallback
) {
  //用于cb_SelectCert获取数据
  g_jshnca_Certbase64id = Certbase64id
  g_jshnca_CertCNid = CertCNid
  g_jshnca_CertOid = CertOid
  g_jshnca_CertDNid = CertDNid
  g_jshnca_certkeyid = certkeyid
  g_jshnca_certStartTime = certStartTime
  g_jshnca_certEndTime = certEndTime
  // g_jshnca_certKZ = certKZ;

  if (IEtype == -1) {
    //获取浏览器的类型 IE为0，非IE为1
    IEtype = BrowserType()
  }

  var res = -1
  if (IEtype == 0) {
    // alert("it = 2");
    res = hncaCtrl_SelectCert(
      Certbase64id,
      CertCNid,
      CertOid,
      CertDNid,
      certkeyid,
      certStartTime,
      certEndTime,
      certKZ,
      certSN
    )

    cb_SelectCert(res)
  } else if (IEtype == 1) {
    // alert("it = 1");
    hnca_SelectCert(
      Certbase64id,
      CertCNid,
      CertOid,
      CertDNid,
      certkeyid,
      certStartTime,
      certEndTime,
      certKZ,
      certSN,
      CAInfoCallback,
      cb_SelectCert
    )
  }
}

//SelectCert的回调函数
function cb_SelectCert(res) {
  if (res == 0) {
    // alert("获取key信息成功");
    sessionStorage.setItem('socketType', 'open')
  } else if (res == -1) {
    // alert('选择证书失败') //目前流程中是在页面中显示可以屏蔽
    sessionStorage.setItem('socketType', 'error')
  } else if (res == -2) {
    //用于非IE内核浏览器
    // alert('获取证书base64失败')
    sessionStorage.setItem('socketType', 'error')
  } else if (res == -3) {
    //用于非IE内核浏览器
    alert('获取证书终止时间失败')
  } else if (res == -4) {
    alert('获取证书起始时间失败')
  } else if (res == -5) {
    alert('获取证书序列号失败')
  } else if (res == -6) {
    alert('获取证书扩展项失败')
  } else if (res == -7) {
    alert('获取证书keyID失败')
  }
}

function cb_getSignCertBase64(res) {
  if (res == 0) {
    // alert("获取签名证书数据成功");
    $('#signCert').val(res)
  } else if (res == -9) {
    // alert("获取签名证书数据失败");
  }
}

//获取证书和签章数据
export function getSealPicBase64(certSN, sealImg, baseCallBack) {
  var res = -1
  if (IEtype == -1) {
    IEtype = BrowserType()
  }
  if (IEtype == 0) {
    //IE内核调用
    var certSNData = document.getElementById(certSN).value
    var sealImgData = hnca_GetGMSealPicBase64FromDev(certSNData)
    // alert("图片："+sealImgData);
    document.getElementById('sealImg').value = sealImgData
  } else if (IEtype == 1) {
    //非IE调用
    HNCA_getSealPicBase64(certSN, sealImg, baseCallBack, cb_getSealPicBase64)
  }
}
function cb_getSealPicBase64(res) {
  if (res == 0) {
    alert('获取印章数据成功')
  } else if (res == -9) {
    // alert("获取印章数据失败");
  }
}
//校验密码并签名
//certPinid 表单中用于输入的密码的标签id
//certDNid 表单中用于存储证书DN(企业名称)的标签id
export function checkCertPin(certPinid, certDNid, caLogin) {
  //获取浏览器版本0为IE，1为非IE
  if (IEtype == -1) {
    IEtype = BrowserType()
  }

  var res = -1
  var strSignData = ''
  g_strSignSrc = GetRandom()
  if (IEtype == 0) {
    //IE内核调用
    strSignData = hncaCtrl_checkCertPin(certPinid, certDNid, g_strSignSrc)
    cb_checkCertPin(strSignData)
  } else if (IEtype == 1) {
    //非IE内核调用
    hnca_checkCertPin(certPinid, certDNid, g_strSignSrc, caLogin, cb_checkCertPin)
  }
}

function cb_checkCertPin(strSignData) {
  var res = -1
  if (strSignData.length > 0) {
    //签名成功
    document.getElementById('signdata').value = strSignData
  } else {
    // alert("签名失败");//目前流程中是在页面中显示可以屏蔽
  }
}
