// var host = 'http://yichuang.hsturing.com'
var host = "http://127.0.0.1:8123"

;(function ($) {
  'use strict'
  // console.log(response);

  $.ajax({
    // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
    type: 'POST',
    url: host + '/getHFXMessageData',
    contentType: 'application/json',
    data: JSON.stringify({ params: {} }),
    success: function (retdata) {
      // 请求成功后的回调
      console.log(retdata) // 输出服务器响应结果
      var messages = retdata['result']['messages']
      // ===================================遍历公司信息横幅列表=======================================>
      messages.forEach(function (message, index){
        $('.company_name').text(message.name)
        $('.company_address').text(message.address)
        $('.company_phone').text(message.phone)
        $('.company_email').text(message.email)

        const company_message_html='<li>\
                                        <a><i class="bx bx-map"></i>'+message.address+'</a\
                                    </li>\
                                    <li>\
                                        <a><i class="bx bx-phone-call"></i>'+message.phone+'</a>\
                                    </li>\
                                    <li>\
                                        <a><i class="bx bx-mail-send"></i>'+message.email+'</a>\
                                    </li>'
        $('.mail-call').append(company_message_html)
      })




      
      
    },

    // 请求失败，返回异常信息
    error: function (data) {
      console.log(data)
    },
  })
})(jQuery)
