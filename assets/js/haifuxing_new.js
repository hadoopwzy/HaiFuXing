(function ($) {
    "use strict";
    // var host = "http://127.0.0.1:8123";

    // console.log(response);
// ===================================分页=======================================>
    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXNewData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {'page_num':page_num} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var page_total = retdata['result']['page_total'];
            console.log(page_total)
            for (let page=2;page<page_total+1;page++){
                const page_html='<li class="page_num"><a href="#">'+page+'</a></li>'
                $('.page').children().last().before(page_html)
                // $('.page').append(page_html)
            }
        },
    
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });


// ===================================新闻信息=======================================>
    var page_num = 1;
    function CreateNew(page_num){
        $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
            type: "POST",
            url: host + '/getHFXNewData',
            contentType: "application/json",
            data: JSON.stringify({ "params": {"page_num":page_num} }),
            success: function (retdata) {  // 请求成功后的回调
                console.log(retdata);  // 输出服务器响应结果
                var news = retdata['result']['news'];
                news.forEach(function(new_id,index){
                    const news_html='<div class="col-sm-6 offset-sm-3 offset-lg-0 col-lg-4">\
                                        <div class="blog-item">\
                                            <ul class="top">\
                                                <li>'+new_id.show_date+'</li>\
                                            </ul>\
                                            <h3>\
                                                <a href="haifuxing_new_content.html?id='+new_id.id+'">'+new_id.new_title+'</a>\
                                            </h3>\
                                            <a href="haifuxing_new_content.html?id='+new_id.id+'"><p>'+new_id.abstract+'</p></a>\
                                            <ul class="bottom">\
                                                <li>\
                                                    <img src="'+host+new_id.img+'" alt="Blog">\
                                                </li>\
                                            </ul>\
                                        </div>\
                                    </div>'
                    $('.news').append(news_html)
                })
            },
            // 请求失败，返回异常信息
            error: function (data) {
                console.log(data);
            }
        })};

    // 更新项目页面
    CreateNew(page_num)

    // 点击分页按钮事件
    $(".pagination-area .page").on("click", ".page_num", function (){
        var page_num = $(this).text(); // 重新获取页数
        console.log(page_num)
        $('.news').empty() // 清空元素内容
        CreateNew(page_num) // 重新更新页面
        $(this).parent('.page').children().find('.active').removeClass('active');
        $(this).children().addClass('active');
        // $(this).addClass("active").siblings().removeClass("active");
    });

    // 上一页
    $(".pagination-area .page").on("click", ".page_up", function (){
        var page_num = parseInt($(this).parent('.page').children().find('.active').text())-1; // 重新获取页数
        console.log(page_num)
        $('.news').empty() // 清空元素内容
        if (page_num<1){
            CreateNew(page_num+1) // 重新更新页面
        }
        else{
            CreateNew(page_num) // 重新更新页面
            // $(this).parent('.page').children().find('active').parent('page_num').children().addClass('active');
            $(this).parent('.page').children().find('.active').removeClass('active');
            $(this).parent('.page').children().find(':contains("'+page_num+'")').addClass("active");
            
            
        }
    });

    // 下一页
    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXNewData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {'page_num':page_num} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var page_total = retdata['result']['page_total'];
            console.log(page_total)
            $(".pagination-area .page").on("click", ".page_down", function (){
                var page_num = parseInt($(this).parent('.page').children().find('.active').text())+1; // 重新获取页数
                console.log(page_num)
                $('.news').empty() // 清空元素内容
                if (page_num>page_total){
                    CreateNew(page_num-1) // 重新更新页面
                }
                else{
                    CreateNew(page_num) // 重新更新页面
                    // $(this).parent('.page').children().find('active').parent('page_num').children().addClass('active');
                    $(this).parent('.page').children().find('.active').removeClass('active');
                    $(this).parent('.page').children().find(':contains("'+page_num+'")').addClass("active");
                }
            });
        },
    
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });

    


})(jQuery);;