/*
Class: PluginNSV
Version: 1.0.1
Date: 2019/03/20
Description:
   Fix showURL function parsing error on local characters.
 */

function getNetProtocol() {
  if (!!window.WebSocket && window.WebSocket.prototype.send) {
    return 'WebSocket'
  } else return 'Http'
}

export default function PluginNSV() {
  this.NetProtocol = getNetProtocol()
  if (this.NetProtocol === 'WebSocket') this.net = getWSNetObject()
  else this.net = getHttpNetObject()
}

PluginNSV.prototype.InitPlugin = function (result_callback) {
  if (this.net == null) {
    result_callback(0)
  }
  this.func_callback = []
  this.invoke_state = []
  this.invoke_id = 10000
  this.init_result = result_callback

  this.net.setStateCallback(this, this.net_state_callback)
  this.net.setDataCallback(this, this.net_data_callback)
  if (this.NetProtocol === 'WebSocket') this.net.connect('localhost:10430')
  else this.net.connect('localhost:10431')
}

PluginNSV.prototype.DestroyPlugin = function () {
  this.net.setStateCallback(null, null)
  this.net.setDataCallback(null, null)
  this.net.disconnect()

  this.func_callback = []
}

PluginNSV.prototype.net_state_callback = function (object, state) {
  //current "this" object is the "net" scope.
  var plugin = object
  if (!!plugin.onStateChange) {
    plugin.onStateChange(state)
  }
  if (!!plugin.init_result) {
    plugin.init_result(state)
    plugin.init_result = null
  }
}

PluginNSV.prototype.net_data_callback = function (object, data) {
  var plugin = object
  var context = data.split(',')

  var msg_type = parseInt(context[0])
  switch (msg_type) {
    case NSV_Msg_Type.Func_Invoke:
      {
      }
      break
    case NSV_Msg_Type.Func_Result:
      {
        var invoke_id = context[1]
        var func_id = context[2]
        var func_name = context[3]
        var state = context[4] === '1'

        var args = []
        var index = 0
        for (var ele in context) {
          if (index > 4) {
            args.push(context[index])
          }
          index++
        }

        if (plugin.func_callback.hasOwnProperty(func_id)) {
          if (typeof plugin.func_callback[func_id] === 'function') {
            plugin.func_callback[func_id](state, args)
          }
          plugin.func_callback[func_id] = null

          if (plugin.invoke_state.hasOwnProperty(invoke_id)) {
            //clear invoke state
            clearTimeout(plugin.invoke_state[invoke_id].timer)
            plugin.invoke_state[invoke_id] = null
          }
        }
      }
      break
    case NSV_Msg_Type.Data_Event:
      {
        var id = parseInt(context[1])
        switch (id) {
          case NSV_Event_Id.Event_Id_Click:
            {
            }
            break
          case NSV_Event_Id.Event_Id_Touch:
            {
            }
            break
          case NSV_Event_Id.Event_Id_Key:
            {
            }
            break
          case NSV_Event_Id.Event_Id_User:
            {
              var type = parseInt(context[2])
              switch (type) {
                case NSV_User_Event.User_Event_Confirm:
                  {
                    if (!!plugin.onConfirm && typeof plugin.onConfirm === 'function') {
                      //invoke callback function
                      plugin.onConfirm()
                    }
                  }
                  break
                case NSV_User_Event.User_Event_Clear:
                  {
                    if (!!plugin.onClear && typeof plugin.onClear === 'function') {
                      //invoke callback function
                      plugin.onClear()
                    }
                  }
                  break
                case NSV_User_Event.User_Event_Cancel:
                  {
                    if (!!plugin.onCancel && typeof plugin.onCancel === 'function') {
                      //invoke callback function
                      plugin.onCancel()
                    }
                  }
                  break
                case NSV_User_Event.User_Event_NoSigned:
                  {
                    /* if (!!plugin.onConfirm && (typeof plugin.onConfirm) === "function") */ {
                      //invoke callback function
                      plugin.NoSigned()
                    }
                  }
                  break
              }
            }
            break
        }
      }
      break
    case NSV_Msg_Type.Sys_State:
      {
        var id = parseInt(context[1])
        switch (id) {
          case NSV_Sys_Id.Sys_Id_State:
            {
              /*state*/
              if (
                plugin.onDevNotifyEvent != null &&
                typeof plugin.onDevNotifyEvent === 'function'
              ) {
                var state = parseInt(context[2])
                plugin.onDevNotifyEvent(state)
              }
            }
            break
        }
      }
      break
  }
}

PluginNSV.prototype.callbackTimeOut = function (sender, invoke_flag) {
  if (!!sender) {
    if (sender.invoke_state.hasOwnProperty(invoke_flag)) {
      var ele = sender.invoke_state[invoke_flag]
      if (!!ele.func) {
        var args = []
        args.push('invoke function timeout')
        ele.func(0, args)
      }
    }
  }
  // alert("invoke timer");
}

PluginNSV.prototype.invoke_interface = function (id, code, _callback) {
  this.func_callback[id] = _callback

  if (this.invoke_id >= 0xffff) {
    this.invoke_id = 10000
  }

  var invoke_id = ++this.invoke_id
  var set = code.join(',')
  set = invoke_id.toString() + ',' + set

  this.net.write(set)
  //add invoke flag
  this.invoke_state[invoke_id.toString()] = {
    func: _callback,
    timer: setTimeout(this.callbackTimeOut, 2000, this, invoke_id.toString())
  }
}

/*
=============================================================================
plugin constants
*/
/*message type*/
var NSV_Msg_Type = {
  Func_Invoke: 1001,
  Func_Result: 1002,
  Data_Event: 1003,
  Sys_State: 1004
}

/*function id*/
var NSV_Func_Id = {
  SetPenSizeRange: 1,
  GetPenSizeRange: 2,
  SetPenColor: 3,
  GetPenColor: 4,
  SetBKColor: 5,
  GetBKColor: 6,
  SetBorderColor: 7,
  GetBorderColor: 8,
  IsConnected: 9,
  ClearSign: 10,
  SaveImageToFile: 11,
  SaveImageToFileEx: 12,
  SaveSignToFile: 13,
  SetPenMode: 14,
  RegBtnClickEvent: 15,
  UnregBtnClickEvent: 16,
  SaveImageToBase64: 17,
  SaveSignToBase64: 18,
  GetScreenRect: 19,
  EnableSystemTouch: 20,
  SetScreenRotation: 21,
  MouseControl: 22,
  GetNSVVersion: 23,
  GetDeviceSN: 24,
  NoSign: 25
}

/*function id extend*/
var NSV_Func_Id_Ex = {
  BeginSign: 81,
  EndSign: 82,
  MoveSignWindow: 83,
  ShowURL: 84,
  CloseURL: 85
}

/*property id*/
var NSV_Property_Id = {
  Set_BorderVisible: 101,
  Get_BorderVisible: 102,
  Set_ExtendDisplay: 103,
  Get_ExtendDisplay: 104,
  Set_DisplayMapMode: 105,
  Get_DisplayMapMode: 106,
  Set_SignMode: 107,
  Get_SignMode: 108
}

/*data event sub id*/
var NSV_Event_Id = {
  Event_Id_Click: 301,
  Event_Id_Touch: 302,
  Event_Id_Key: 303,
  Event_Id_User: 304
}

var NSV_User_Event = {
  User_Event_Confirm: 1,
  User_Event_Clear: 2,
  User_Event_Cancel: 3,
  User_Event_NoSigned: 4
}

/*system state event sub id*/
var NSV_Sys_Id = {
  Sys_Id_State: 401
}

/*
=============================================================================
plugin interface
*/
PluginNSV.prototype.setPenSizeRange = function (min, max, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetPenSizeRange.toString()
  code.push(func_id_string)
  code.push('SetPenSizeRange')

  code.push(min.toString())
  code.push(max.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[min,max])*/
PluginNSV.prototype.getPenSizeRange = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetPenSizeRange.toString()
  code.push(func_id_string)
  code.push('GetPenSizeRange')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.setPenColor = function (r, g, b, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetPenColor.toString()
  code.push(func_id_string)
  code.push('SetPenColor')

  code.push(r.toString())
  code.push(g.toString())
  code.push(b.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[r,g,b])*/
PluginNSV.prototype.getPenColor = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetPenColor.toString()
  code.push(func_id_string)
  code.push('GetPenColor')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.setBKColor = function (r, g, b, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetBKColor.toString()
  code.push(func_id_string)
  code.push('SetBKColor')

  code.push(r.toString())
  code.push(g.toString())
  code.push(b.toString())
  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[r,g,b])*/
PluginNSV.prototype.getBKColor = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetBKColor.toString()
  code.push(func_id_string)
  code.push('GetBKColor')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.setBorderColor = function (r, g, b, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetBorderColor.toString()
  code.push(func_id_string)
  code.push('SetBorderColor')

  code.push(r.toString())
  code.push(g.toString())
  code.push(b.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[r,g,b])*/
PluginNSV.prototype.getBorderColor = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetBorderColor.toString()
  code.push(func_id_string)
  code.push('GetBorderColor')

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[state])*/
PluginNSV.prototype.isConnected = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.IsConnected.toString()
  code.push(func_id_string)
  code.push('IsConnected')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.clearSign = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.ClearSign.toString()
  code.push(func_id_string)
  code.push('ClearSign')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.NoSign = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.NoSign.toString()
  code.push(func_id_string)
  code.push('NoSign')

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.saveImageToFile = function (path, format, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SaveImageToFile.toString()
  code.push(func_id_string)
  code.push('SaveImageToFile')

  code.push(path)
  code.push(format.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.saveImageToFileEx = function (
  path,
  format,
  width,
  height,
  quality,
  result_callback
) {
  var code = []
  var func_id_string = NSV_Func_Id.SaveImageToFileEx.toString()
  code.push(func_id_string)
  code.push('SaveImageToFileEx')

  code.push(path)
  code.push(format.toString())
  code.push(width.toString())
  code.push(height.toString())
  code.push(quality.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.saveSignToFile = function (path, width, height, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SaveSignToFile.toString()
  code.push(func_id_string)
  code.push('SaveSignToFile')

  code.push(path)
  code.push(width.toString())
  code.push(height.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.setPenMode = function (mode, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetPenMode.toString()
  code.push(func_id_string)
  code.push('SetPenMode')

  code.push(mode.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.regBtnClickEvent = function (btn_index, x, y, width, height, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.RegBtnClickEvent.toString()
  code.push(func_id_string)
  code.push('RegBtnClickEvent')

  code.push(btn_index.toString())
  code.push(x.toString())
  code.push(y.toString())
  code.push(width.toString())
  code.push(height.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.unregBtnClickEvent = function (btn_index, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.UnregBtnClickEvent.toString()
  code.push(func_id_string)
  code.push('UnregBtnClickEvent')

  code.push(btn_index.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[base64string])*/
PluginNSV.prototype.saveImageToBase64 = function (format, width, height, quality, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SaveImageToBase64.toString()
  code.push(func_id_string)
  code.push('SaveImageToBase64')

  code.push(format.toString())
  code.push(width.toString())
  code.push(height.toString())
  code.push(quality.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[base64string])*/
PluginNSV.prototype.saveSignToBase64 = function (width, height, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SaveSignToBase64.toString()
  code.push(func_id_string)
  code.push('SaveSignToBase64')

  code.push(width.toString())
  code.push(height.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[left,top,right,bottom])*/
PluginNSV.prototype.getScreenRect = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetScreenRect.toString()
  code.push(func_id_string)
  code.push('GetScreenRect')

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.setScreenRotation = function (angle, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.SetScreenRotation.toString()
  code.push(func_id_string)
  code.push('SetScreenRotation')

  code.push(angle.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.mouseControl = function (enabled, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.MouseControl.toString()
  code.push(func_id_string)
  code.push('MouseControl')

  if (enabled && enabled !== '0' && enabled !== 0) {
    enabled = 1
  } else {
    enabled = 0
  }
  code.push(enabled.toString())
  this.invoke_interface(func_id_string, code, result_callback)
}
/*
=============================================================================
plugin interface extend
*/
/*callback func(state,args[])*/
PluginNSV.prototype.beginSign = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id_Ex.BeginSign.toString()
  code.push(func_id_string)
  code.push('BeginSign')

  this.invoke_interface(func_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.endSign = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id_Ex.EndSign.toString()
  code.push(func_id_string)
  code.push('EndSign')

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.moveSignWindow = function (x, y, width, height, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id_Ex.MoveSignWindow.toString()
  code.push(func_id_string)
  code.push('MoveSignWindow')

  code.push(x.toString())
  code.push(y.toString())
  code.push(width.toString())
  code.push(height.toString())

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.showURL = function (url, result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id_Ex.ShowURL.toString()
  code.push(func_id_string)
  code.push('ShowURL')

  url = url.replace(/\\/gi, '/')
  if (url.search('%') == -1) url = encodeURI(url)

  code.push(url)

  this.invoke_interface(func_id_string, code, result_callback)
}

PluginNSV.prototype.closeURL = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id_Ex.CloseURL.toString()
  code.push(func_id_string)
  code.push('CloseURL')

  this.invoke_interface(func_id_string, code, result_callback)
}
PluginNSV.prototype.GetDeviceSN = function (result_callback) {
  var code = []
  var func_id_string = NSV_Func_Id.GetDeviceSN.toString()
  code.push(func_id_string)
  code.push('GetDeviceSN')

  this.invoke_interface(func_id_string, code, result_callback)
}
/*
=============================================================================
plugin property
*/
/*callback func(state,args[])*/
PluginNSV.prototype.setBorderVisible = function (visible, result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Set_BorderVisible.toString()
  code.push(property_id_string)
  code.push('Set_BorderVisible')

  code.push(visible === false || visible === 'undefined' || visible == null ? '0' : '1')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[visible])*/
PluginNSV.prototype.getBorderVisible = function (result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Get_BorderVisible.toString()
  code.push(property_id_string)
  code.push('Get_BorderVisible')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.setExtendDisplay = function (extend, result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Set_ExtendDisplay.toString()
  code.push(property_id_string)
  code.push('Set_ExtendDisplay')

  code.push(extend === false || extend === 'undefined' || extend === null ? '0' : '1')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[extend])*/
PluginNSV.prototype.getExtendDisplay = function (result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Get_ExtendDisplay.toString()
  code.push(property_id_string)
  code.push('Get_ExtendDisplay')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.setDisplayMapMode = function (mode, result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Set_DisplayMapMode.toString()
  code.push(property_id_string)
  code.push('Set_DisplayMapMode')

  code.push(mode.toString())

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[mode])*/
PluginNSV.prototype.getDisplayMapMode = function (result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Get_DisplayMapMode.toString()
  code.push(property_id_string)
  code.push('Get_DisplayMapMode')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[])*/
PluginNSV.prototype.setSignMode = function (mode, result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Set_SignMode.toString()
  code.push(property_id_string)
  code.push('Set_SignMode')

  code.push(mode.toString())

  this.invoke_interface(property_id_string, code, result_callback)
}

/*callback func(state,args[mode])*/
PluginNSV.prototype.getSignMode = function (result_callback) {
  var code = []
  var property_id_string = NSV_Property_Id.Get_SignMode.toString()
  code.push(property_id_string)
  code.push('Get_SignMode')

  this.invoke_interface(property_id_string, code, result_callback)
}

/*
=============================================================================
plugin service events
*/
/*callback func(state)*/
PluginNSV.prototype.onStateChange = null
/*
=============================================================================
plugin device events
*/
/*callback func(state)*/
PluginNSV.prototype.onDevNotifyEvent = null

/*callback func(index)*/
PluginNSV.prototype.onBtnClickEvent = null

/*callback func(index)*/
PluginNSV.prototype.onTouchEvent = null

/*callback func(physical_key,virtual_key)*/
PluginNSV.prototype.onKeyEvent = null

/*
=============================================================================
plugin extended events
*/
/*callback func()*/
PluginNSV.prototype.onConfirm = null

/*callback func()*/
PluginNSV.prototype.onClear = null

/*callback func()*/
PluginNSV.prototype.onCancel = null

PluginNSV.prototype.NoSigned = null

/*
=============================================================================
WSNetObject class
*/

// 获取WebSocket网络对象的工厂函数
function getWSNetObject() {
  // 返回一个包含WebSocket相关属性和方法的对象
  return {
    // WebSocket实例
    ws: null,
    // 连接的URL地址
    url: null,
    // 超时时间（毫秒）
    time_out: 3000,
    // 超时处理函数
    time_out_func: null,
    // 状态变化回调函数
    state_callback: null,
    // 状态变化回调函数的上下文对象
    state_object: null,
    // 数据接收回调函数
    data_callback: null,
    // 数据接收回调函数的上下文对象
    data_object: null,
    // 重连定时器
    timer_reconn: null,

    // 连接方法
    connect: function (url) {
      // 检查浏览器是否支持WebSocket
      if (!(!!window.WebSocket && window.WebSocket.prototype.send)) {
        // 不支持则返回null
        return null
      }
      // 保存URL地址
      this.url = url
      // 添加WebSocket协议前缀
      url = 'ws://' + url
      // 创建WebSocket连接
      this.ws = new WebSocket(url)
      // 设置WebSocket的所有者为当前对象
      this.ws.owner = this

      // WebSocket连接打开时的处理函数
      this.ws.onopen = function () {
        // 获取所有者对象
        var owner = this.owner
        // 如果设置了状态回调函数，则调用它
        if (!!owner.state_callback) {
          owner.state_callback(owner.state_object, 1)
        }
      }

      // WebSocket连接关闭时的处理函数
      this.ws.onclose = function (evt) {
        // 获取所有者对象
        var owner = this.owner
        // 如果设置了状态回调函数，则调用它
        if (!!owner.state_callback) {
          owner.state_callback(owner.state_object, 0)
        }
      }

      // WebSocket接收到消息时的处理函数
      this.ws.onmessage = function (evt) {
        // 获取所有者对象
        var owner = this.owner
        // 如果设置了数据回调函数，则调用它
        if (!!owner.data_callback) {
          owner.data_callback(owner.data_object, evt.data)
        }
      }

      // WebSocket发生错误时的处理函数
      this.ws.onerror = function (evt) {
        // 获取所有者对象
        var owner = this.owner
        // 断开连接
        owner.disconnect()
      }
      // 返回true表示连接成功启动
      return true
    },

    // 断开连接方法
    disconnect: function () {
      // 如果WebSocket存在
      if (this.ws != null) {
        // 关闭WebSocket连接
        this.ws.close()
        // 清空WebSocket引用
        this.ws = null
      }
    },

    // 重新连接方法
    reconnect: function () {
      // 先断开现有连接
      this.disconnect()
      // 使用保存的URL重新连接
      this.connect(this.url)
    },

    // 开始重连定时器
    beginReconnect: function () {
      // 如果定时器未设置
      if (this.timer_reconn == null) {
        // 设置定时器，定期执行重连
        this.timer_reconn = setInterval(callback_reconn(this), this.time_out)
      }
    },

    // 结束重连定时器
    endReconnect: function () {
      // 如果定时器存在
      if (this.timer_reconn != null) {
        // 清除定时器
        clearInterval(this.timer_reconn)
        // 清空定时器引用
        this.timer_reconn = null
      }
    },

    // 获取连接状态方法
    getConnectionState: function () {
      // 如果WebSocket存在
      if (!!this.ws) {
        // 返回WebSocket是否处于打开状态
        return this.ws.readyState === WebSocket.OPEN
      }
      // 如果WebSocket不存在，返回false
      return false
    },

    // 设置状态变化回调函数
    setStateCallback: function (object, func) {
      // 保存回调函数的上下文对象
      this.state_object = object
      // 保存状态变化回调函数
      this.state_callback = func
    },

    // 设置数据接收回调函数
    setDataCallback: function (object, func) {
      // 保存回调函数的上下文对象
      this.data_object = object
      // 保存数据接收回调函数
      this.data_callback = func
    },

    // 发送数据方法
    write: function (data) {
      // 检查连接是否处于打开状态
      if (this.getConnectionState()) {
        try {
          // 发送数据
          this.ws.send(data)
        } catch (e) {
          // 发生异常则返回false
          return false
        }
        // 发送成功返回true
        return true
      }
      // 连接未打开则返回false
      return false
    }
  }
}

function _callback_reconn(obj) {
  // console.log("reconnect...");
  if (obj != null) {
    obj.reconnect()
  }
}

var callback_reconn = function (obj) {
  return function () {
    _callback_reconn(obj)
  }
}

/*
=============================================================================
HttpNetObject class
*/
function getHttpNetObject() {
  return {
    http: null,
    url: null,
    time_out: 3000,
    time_out_func: null,
    state_callback: null,
    state_object: null,
    data_callback: null,
    data_object: null,
    timer_reconn: null,
    connect: function (url) {
      if (url.substring(0, 7) !== 'http://') {
        url = 'http://' + url
        this.url = url
        this.http = new NSV_Ajax(url)
        this.http.owner = this
        this.http.onopen = function () {
          var owner = this.owner
          if (!!owner.state_callback) {
            owner.state_callback(owner.state_object, 1)
          }
        }
        this.http.onclose = function (evt) {
          var owner = this.owner
          if (!!owner.state_callback) {
            owner.state_callback(owner.state_object, 0)
          }
        }
        this.http.onmessage = function (data) {
          var owner = this.owner
          if (!!owner.data_callback) {
            owner.data_callback(owner.data_object, data)
          }
        }
        this.http.onerror = function (evt) {
          console.log(evt)
        }
      }
    },
    disconnect: function () {
      if (this.http != null) {
        this.http.close()
        this.http = null
      }
    },
    getConnectionState: function () {
      if (!!this.http) {
        return this.http.state === NSV_Ajax_State.Open
      }
      return false
    },
    setStateCallback: function (object, func) {
      this.state_object = object
      this.state_callback = func
    },
    setDataCallback: function (object, func) {
      this.data_object = object
      this.data_callback = func
    },
    write: function (data) {
      if (this.getConnectionState()) {
        try {
          this.http.send(data)
        } catch (e) {
          return false
        }
        return true
      }
      return false
    }
  }
}

/*
=============================================================================
Class: NSV_Ajax
Version: 1.0.0
Date: 2018/12/17
 */
function getXMLHttpRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    return ActiveXObject('Microsoft.XMLHttp')
  }
}

function NSV_Ajax(url) {
  if (url.substring(0, 7) !== 'http://') {
    url = 'http://' + url
  }
  this.state = NSV_Ajax_State.Closed
  this.http_url = url
  this.http_url_event =
    url.substring(0, url.length - 5) + (parseInt(url.substring(url.length - 5, url.length)) + 1)

  this.handShake()
}

/*
==================================================
constant
*/
var NSV_Ajax_State = {
  Closed: 0,
  Open: 1
}

var NSV_Ajax_Protocol = {
  Connect: 'connect',
  Data: 'data',
  Close: 'close'
}

/*
==================================================
property
*/
NSV_Ajax.prototype.state = NSV_Ajax_State.Closed
NSV_Ajax.prototype.http_url = ''
NSV_Ajax.prototype.http_url_event = ''
NSV_Ajax.prototype.xhrRecv = null

NSV_Ajax.prototype.PumpMessage = null

//open event
NSV_Ajax.prototype.onopen = null
//close event
NSV_Ajax.prototype.onclose = null
//message event
NSV_Ajax.prototype.onmessage = null
//error event
NSV_Ajax.prototype.onerror = null

/*
==================================================
method
*/
NSV_Ajax.prototype.handShake = function () {
  if (!!this.http_url) {
    var xhr = getXMLHttpRequest()
    xhr.open('POST', this.http_url, true)
    xhr.responseType = 'text'
    xhr.timeout = 2000
    xhr.setRequestHeader('msg-type', '' + NSV_Ajax_Protocol.Connect)
    xhr.owner = this
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        try {
          if (this.status === 200) {
            if (this.responseText === 'OK') {
              //server is running
              this.owner.state = NSV_Ajax_State.Open
              //activate open event
              if (!!this.owner.onopen && typeof this.owner.onopen === 'function') {
                this.owner.onopen()
              }
              this.owner.postRecvRequest(this.owner)
            }
          }
        } catch (e) {
          if (!!this.owner.onerror && typeof this.owner.onerror === 'function') {
            //this.owner.onclose();
            this.owner.onerror(e)
          }
        }
      }
    }
    xhr.ontimeout = function (e) {
      if (!!this.owner.onerror && typeof this.owner.onerror === 'function') {
        this.owner.onclose()
        // this.owner.onerror(e);
      }
    }
    xhr.send('HandShake')
  }
}

NSV_Ajax.prototype.postRecvRequest = function (owner) {
  if (!!this.http_url) {
    /*create a new http connection*/
    this.xhrRecv = getXMLHttpRequest()
    this.xhrRecv.open('POST', this.http_url_event, true)
    this.xhrRecv.setRequestHeader('msg-type', '' + NSV_Ajax_Protocol.Data)
    this.xhrRecv.responseType = 'text'
    this.xhrRecv.owner = owner
    this.xhrRecv.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (!!this.owner.onmessage && typeof this.owner.onmessage === 'function') {
            this.owner.onmessage(this.responseText)
          }
          // this.owner.recvHandler(this.responseText);

          this.owner.postRecvRequest(owner)
        }
      }
    }
    this.xhrRecv.send('Recv')
  }
}

NSV_Ajax.prototype.recvHandler = function (data) {
  console.log(data)
}

NSV_Ajax.prototype.postSendRequest = function (data, _callback, timeout) {
  if (!!this.http_url) {
    var xhr = getXMLHttpRequest()
    xhr.open('POST', this.http_url, true)
    xhr.responseType = 'text'
    xhr.setRequestHeader('msg-type', '' + NSV_Ajax_Protocol.Data)
    //bind callback
    xhr.owner = this
    xhr.send_callback = _callback
    if (!!timeout && timeout > 0) {
      xhr.timeout = timeout
    }
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (!!this.send_callback && typeof this.send_callback === 'function') {
            this.send_callback(this.responseText)
            this.owner.onmessage(this.responseText)
            // console.log("send result"+this.responseText);
          }
        }
      }
    }
    xhr.send(data)
  }
}

NSV_Ajax.prototype.close = function () {
  this.state = NSV_Ajax_State.Closed
}

NSV_Ajax.prototype.send = function (data) {
  this.postSendRequest(data, this.recvHandler, 2000)
}
