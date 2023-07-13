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
        url: host + '/getHFXJobContentData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {"id":id} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var job_contents = retdata['result']['job_contents'];
// ===================================岗位内容=======================================>
            job_contents.forEach(function(job_content,index){
                const job_contnet_html='<div class="details-item p-5">\
                                            <div class="details-digital">\
                                                <h3>'+job_content.name+'</h3>\
                                                <p>发布日期：'+job_content.show_date+'</p>\
                                                <p>工作地点：'+job_content.state+' '+job_content.city+'</p>\
                                                <p>薪资：'+job_content.salary+'</p>\
                                                <p>岗位要求：</p>\
                                                <div class="job_content_html"></div>\
                                            </div>\
                                        </div>'
            $('.job_content').append(job_contnet_html)
            $('.job_content_html').html(job_content.content)
            
// ===================================推荐岗位=======================================>
            var job_type_id = job_content.job_type_id
            $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
                type: "POST",
                url: host + '/getHFXJobData',
                contentType: "application/json",
                data: JSON.stringify({ "params": {"job_type_id":job_type_id} }),
                success: function (retdata) {  // 请求成功后的回调
                    console.log(retdata);  // 输出服务器响应结果
                    var jobs = retdata['result']['jobs'];
                    jobs.forEach(function(job,index){
                        const job_recommenda_html='<li>\
                                                        <a class="highlight" href="haifuxing_job_content.html?id='+job.id+'">'+job.name+'</a>\
                                                    </li>'
                        if (job_content.name != job.name){
                            $('.job_recommend').append(job_recommenda_html)
                        }
                        
                    })
                },
                    
                // 请求失败，返回异常信息
                error: function (data) {
                    console.log(data);
                }
            });
            })
        },
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });
    
})(jQuery);;
