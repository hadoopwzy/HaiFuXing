// var host = 'http://yichuang.hsturing.com'
// var host = "http://127.0.0.1:8123"

;(function ($) {
  'use strict'
  // console.log(response);
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

    let job_type_id = GetQueryString('job_type_id');
    if(!job_type_id){
        job_type_id = 1;
    }
// ===================================遍历招聘岗位列表=======================================> 
    function CreateJob(job_type_id){
        $.ajax({
            // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
            type: 'POST',
            url: host + '/getHFXJobData',
            contentType: 'application/json',
            data: JSON.stringify({ "params": {"job_type_id":job_type_id} }),
            success: function (retdata) {
              // 请求成功后的回调
              console.log(retdata) // 输出服务器响应结果
              var jobs = retdata['result']['jobs']
              jobs.forEach(function (job, index){
                const job_html='<div class="collapse show details-user">\
                                    <img src="assets/img/blog-details4.jpg" alt="Details">\
                                    <div class="top">\
                                        <div class="row align-items-end">\
                                            <div class="col-lg-6">\
                                                <div class="top-left">\
                                                    <h3>\
                                                        <a href="haifuxing_job_content.html?id='+job.id+'">'+job.name+'</a>\
                                                    </h3>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="bottom">\
                                        <div class="row">\
                                            <div class="col-lg-6">\
                                                <p>工作地点：'+job.state+' '+job.city+'</p>\
                                            </div>\
                                            <div class="col-lg-6">\
                                                <p>薪资：'+job.salary+'k</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>'
                                // <img src="assets/img/blog-details5.jpg" alt="Details">\
                                // <img src="assets/img/blog-details6.jpg" alt="Details">\
                $('.job').append(job_html)
                })
            },
            // 请求失败，返回异常信息
            error: function (data) {
              console.log(data)
            },
          })
      }
// ===================================遍历招聘类型列表=======================================>
    $.ajax({
    type: 'POST',
    url: host + '/getHFXJobData',
    contentType: 'application/json',
    data: JSON.stringify({ "params": {"job_type_id":job_type_id} }),
    success: function (retdata) {
    // 请求成功后的回调
    console.log(retdata) // 输出服务器响应结果
    var job_types = retdata['result']['job_types']
    var jobs = retdata['result']['jobs']
    
    let job_type_num = 1
    job_types.forEach(function (job_type, index){
        const job_type_html='<li class="job_type_link">\
                                <a id="job_type'+job_type.id+'" class="job_type_a">'+job_type.type_name+'<span class="f-right"></span></a>\
                            </li>'
        $('#accordionExample').append(job_type_html)
        if (job_type_num==1){
            $('.job_type_a').eq(0).addClass('highlight')
        }
    })

    CreateJob(job_type_id)

    $(".job_type_link .job_type_a").on('click',function(){
        $('.job').empty() // 清空元素内容
        job_type_id = $(this).attr("id").match(/\d/g)[0]
        console.log(job_type_id)
        CreateJob(job_type_id)
        $('#accordionExample').children().find('.highlight').removeClass('highlight')
        $(this).addClass('highlight')
    })
    },
    

    // 请求失败，返回异常信息
    error: function (data) {
      console.log(data)
    },
  })

})(jQuery)

