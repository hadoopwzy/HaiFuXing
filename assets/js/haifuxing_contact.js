(function ($) {
    "use strict";
    // var host = "http://127.0.0.1:8123";
   
    $('#contact_button').on('click', function(){

        var name = $('#name').val(); // 获取用户名称的值，id为name的实际值
        var email = $('#email').val();
        var phone = $('#phone_number').val();
        var subject = $('#msg_subject').val();
        var message = $('#message').val();

        if(!name){
            alert("请填写您的姓名");
            return;
        }
        if(!email && !phone){
            alert("请填写您的联系方式");
            return;
        }

        if(!message){
            alert("请填写您的需求");
            return;
        }

        $.ajax({
            type:"POST",
            url: host+'/getHFXContactData',
            contentType: "application/json", //如果提交的是json数据类型，则必须有此参数,表示提交的数据类型      
            
            data: JSON.stringify({ "params":{'name':$('#name').val(),'phone':$('#phone_number').val(),'email':$('#email').val(),'theme':$('#msg_subject').val(),'content':$('#message').val()}}), 
             success: function (retdata) {
                alert("提交成功！");
             },
             error: function (data){
                alert("提交失败！");
             }
        });
        $('#name').val("")
        $('#phone_number').val("")
        $('#email').val("")
        $('#msg_subject').val("")
        $('#message').val("")
    });
})(jQuery);