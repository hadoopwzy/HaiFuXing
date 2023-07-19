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
        url: host + '/getHFXProjectContentData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {"id":id} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var project_content = retdata['result']['project_content'];
// ===================================新闻内容=======================================>
            project_content.forEach(function(project_content_id,index){
                const project_contnet_html='<div class="container">\
                                                <div class="row">\
                                                    <div class="col-lg-12">\
                                                        <div class="details-item">\
                                                            <div class="details-digital">\
                                                                <h3>'+project_content_id.project_title+'</h3>\
                                                                <p>'+project_content_id.show_date+'</p>\
                                                                <div class="project_content_html"></div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>'
                $('.project_content').append(project_contnet_html)
                $('.project_content_html').html(project_content_id.content)
            })
        },
            
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });

})(jQuery);;
