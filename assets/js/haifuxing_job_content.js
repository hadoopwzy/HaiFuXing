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
    var job_type_id = GetQueryString('id');
    if(!job_type_id){
        job_type_id = 1;
    }

    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXJobContentData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {"id":id} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var jobs = retdata['result']['jobs'];
// ===================================岗位内容=======================================>
            jobs.forEach(function(job,index){
                const job_contnet_html='<div class="details-item">\
                                            <div class="details-digital">\
                                                <h3>'+job.name+'</h3>\
                                                <p>发布日期：'+job.show_date+'</p>\
                                                <p>工作地点：'+job.state+' '+job.city+'</p>\
                                                <p>薪资：'+job.salary+'</p>\
                                                <p>岗位要求：</p>\
                                                <div class="job_content_html"></div>\
                                            </div>\
                                        </div>'
            $('.job_content').append(job_contnet_html)
            $('.job_content_html').html(job.content)

            })
        },
            
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });
    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXJobData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {"job_type_id":job_type_id} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var jobs = retdata['result']['jobs'];
// ===================================岗位内容=======================================>
            jobs.forEach(function(job,index){
                const job_contnet_html='<div class="details-item">\
                                            <div class="details-digital">\
                                                <h3>'+job.name+'</h3>\
                                                <p>发布日期：'+job.show_date+'</p>\
                                                <p>工作地点：'+job.state+' '+job.city+'</p>\
                                                <p>薪资：'+job.salary+'</p>\
                                                <p>岗位要求：</p>\
                                                <div class="job_content_html"></div>\
                                            </div>\
                                        </div>'
            $('.job_content').append(job_contnet_html)
            $('.job_content_html').html(job.content)

            const job_recommend_html='<h3>其他岗位</h3>\
                                    <ul>\
                                        <li>\
                                            <a href="#">Design</a>\
                                            <span>(1)</span>\
                                        </li>\
                                        <li>\
                                            <a href="#">Lifestyle</a>\
                                            <span>(4)</span>\
                                        </li>\
                                        <li>\
                                            <a href="#">Campaigns</a>\
                                            <span>(3)</span>\
                                        </li>\
                                        <li>\
                                            <a href="#">Device</a>\
                                            <span>(6)</span>\
                                        </li>\
                                        <li>\
                                            <a href="#">Internet</a>\
                                            <span>(8)</span>\
                                        </li>\
                                    </ul>'
        // $('.job_recommend').append(job_recommend_html)

            })
        },
            
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });

})(jQuery);;
