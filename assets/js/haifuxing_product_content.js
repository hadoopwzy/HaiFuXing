(function ($) {
    "use strict";
    // var host = "http://127.0.0.1:8123";

    // console.log(response);

    function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}

	var id = GetQueryString('id');
    if(!id){
        id = 1;
    }

    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXProductContentData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {"id":id} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var product_content = retdata['result']['product_content'];
// ===================================新闻内容=======================================>
            product_content.forEach(function(product_content_id,index){
                const product_contnet_html='<div class="container">\
                                    <div class="row">\
                                        <div class="col-lg-12">\
                                            <div class="details-item">\
                                                <div class="details-digital">\
                                                    <h3>'+product_content_id.product_title+'</h3>\
                                                    <p>'+product_content_id.show_date+'</p>\
                                                    <div class="new_content_html"></div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>'
            $('.product_content').append(product_contnet_html)
            $('.product_content_html').html(product_content_id.content)
            })
        },
            
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });

})(jQuery);;
