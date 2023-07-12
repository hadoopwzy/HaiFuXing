(function ($) {
    "use strict";
    // var host = "http://127.0.0.1:8123";

    // console.log(response);

    $.ajax({ // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
        type: "POST",
        url: host + '/getHFXAboutData',
        contentType: "application/json",
        data: JSON.stringify({ "params": {} }),
        success: function (retdata) {  // 请求成功后的回调
            console.log(retdata);  // 输出服务器响应结果
            var abouts = retdata['result']['abouts'];
            var teams = retdata['result']['teams'];
            var projects = retdata['result']['projects'];
            // console.log(articles)

// ===================================关于我们=======================================>
            abouts.forEach(function(about,index){
               const about_html = '<div class="section-title two">\
                                        <span class="sub-title">'+about.sub_title+'</span>\
                                        <h1>'+about.main_title+'</h1>\
                                    </div>\
                                    <p>'+about.content+'</p>'
                $('.about').append(about_html)

                const about_img_html = '<img src="'+host+about.img+'" alt="Design">'
                $('.about_img').append(about_img_html)
            })

// ===================================我们的团队=======================================>、
            teams.forEach(function(team,index){
                const team_html = '<div class="section-title two">\
                                        <h2>'+team.main_title+'</h2>\
                                        <p>'+team.content+'</p>\
                                    </div>\
                                    <a href="team.html" class="cmn-btn">了解更多<i class="bx bx-plus"></i></a>'
                $('.team-content').append(team_html)
                
                let count = 0
                team.team_massage.forEach(function(team_massage,index){
                    count += 1
                    const team_img_html1 = '<div class="col-sm-6 col-lg-6">\
                                                <div class="team-item">\
                                                <img src="'+host+team_massage.img+'" alt="Team">\
                                                </div>\
                                            </div>'
                    const team_img_html2 = '<div class="col-sm-6 col-lg-6">\
                                                <div class="team-item two">\
                                                <img src="'+host+team_massage.img+'" alt="Team">\
                                                    <div class="team-bottom">\
                                                    </div>\
                                                </div>\
                                            </div>'
                    if (count%2==0){
                        $('.team_img').append(team_img_html2)
                    }
                    else{
                        $('.team_img').append(team_img_html1)
                    }
                })
             })
// ===================================遍历产品列表=======================================>
            // let project_num = 0;
            // projects.forEach(function (project, index){
            
            // // 产品内容
            // const project_content_html='<div class="col-lg-6">\
            //                                 <div class="feature-content">\
            //                                     <div class="feature-top">\
            //                                         <h2>'+project.name+'</h2>\
            //                                         <p>'+project.abstract+'</p>\
            //                                     </div>\
            //                                     <a href="haifuxing_projects.html" class="cmn-btn">发现更多<i class="bx bx-plus"></i>\
            //                                     </a>\
            //                                 </div>\
            //                             </div>'

            // // 产品封面
            // const project_img_html='<div class="col-lg-6">\
            //                             <div class="feature-img">\
            //                                 <img src="'+host+project.img+'" alt="Feature">\
            //                             </div>\
            //                         </div>'
            // project_num += 1
            // if (project_num%2==0){
            //     $('.projects').append(project_img_html)
            //     $('.projects').append(project_content_html)
            // }
            // else{
            //     $('.projects').append(project_content_html)
            //     $('.projects').append(project_img_html)
            // }
            // })
        },
        // 请求失败，返回异常信息
        error: function (data) {
            console.log(data);
        }
    });

})(jQuery);;