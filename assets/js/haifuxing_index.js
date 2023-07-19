var host = "https://app.haifuxing.com";

;(function ($) {
  'use strict'
  // console.log(response);
  console.log(host)
  $.ajax({
    // 使用POST方法向host+/getIndexData发送JSON数据{"params":{}}，并且设置请求的数据类型为 JSON
    type: 'POST',
    url: host + '/getHFXIndexData',
    contentType: 'application/json',
    data: JSON.stringify({ params: {} }),
    success: function (retdata) {
      // 请求成功后的回调
      console.log(retdata) // 输出服务器响应结果
      var banners = retdata['result']['banners']
      var products = retdata['result']['products']
      var partner_contents = retdata['result']['partner_contents']
      var partners = retdata['result']['partners']
      var news = retdata['result']['news']
      // ===================================遍历首页横幅列表=======================================>
      banners.forEach(function (banner, index){
        const index_content_html='<div class="d-table-cell">\
                                    <div class="container-fluid">\
                                        <div class="row">\
                                            <div class="banner-content p-5">\
                                                <span>\
                                                    <img src="assets/img/sass/banner-shape4.png" alt="Shape">'+banner.sub_title1+'</span>\
                                                <h1>'+banner.main_title+'</h1>\
                                                <p class="col-lg-8">'+banner.content+'</p>\
                                                <div class="banner-btn">\
                                                    <a href="haifuxing_business.html" class="cmn-btn">了解更多<i class="bx bx-plus"></i></a>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>'
        $('.index_content').append(index_content_html)
        $('.index_banner').attr('src',host+banner.img)
      })

      // ===================================遍历产品列表=======================================>
      let product_num = 0;
      products.forEach(function (product, index){
        
        // 产品内容
        const product_content_html='<div class="col-lg-6">\
                                        <div class="feature-content">\
                                            <div class="feature-top">\
                                                <h2>'+product.name+'</h2>\
                                                <p>'+product.abstract+'</p>\
                                            </div>\
                                            <a href="#" class="cmn-btn">发现更多<i class="bx bx-plus"></i>\
                                            </a>\
                                        </div>\
                                    </div>'

        // 产品封面
        const product_img_html='<div class="col-lg-6">\
                                    <div class="feature-img">\
                                        <img src="'+host+product.img+'" alt="Feature">\
                                    </div>\
                                </div>'
        product_num += 1
        if (product_num%2==0){
            $('.products').append(product_img_html)
            $('.products').append(product_content_html)
        }
        else{
            $('.products').append(product_content_html)
            $('.products').append(product_img_html)
        }
      })

      // ===================================遍历客户列表=======================================>
      partner_contents.forEach(function (partner_content, index){
        const partner_content_html='<div class="testimonials-item">\
                                        <p>'+partner_content.content+'</p>\
                                        <h3>'+partner_content.company+'</h3>\
                                        <span>'+partner_content.name+'</span>\
                                    </div>'
        // $('.partner_content.testimonials-slider.owl-theme.owl-carousel').owlCarousel({
        //     loop: true,
        //     nav: true,
        //     items: 1,
        //     })
        $('.partner_content.testimonials-slider.owl-theme.owl-carousel').append(partner_content_html);
        // $('.partner_content.testimonials-slider.owl-theme.owl-carousel').owlCarousel("refresh");
        
        // 客户心声图片
        const partner_content_img_html = '<img src="'+host+partner_content.img+'" alt="Client">'
        $('.partner_content_img').append(partner_content_img_html)
      });

      $('.partner_content.testimonials-slider').owlCarousel({
      	items: 1,
      	loop: true,
      	margin: 20,
      	nav: true,
      	dots: false,
      	smartSpeed: 1000,
      	autoplay: true,
      	autoplayTimeout: 4000,
      	autoplayHoverPause: true,
      	navText: [
      		"<i class='bx bx-left-arrow-alt'></i>",
      		"<i class='bx bx-right-arrow-alt'></i>"
      	],
      });

      partners.forEach(function (partner, index){
        // 客户logo滚动图片
        const partner_img_html='<div class="partner-item">\
                                    <img src="'+host+partner.img+'" class="partner-item-logo1" alt="Partner">\
                                </div>'
        $('.partner_img').append(partner_img_html)
	});
    $('.partner-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: false,
		smartSpeed: 1000,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items: 2,
			},
			600:{
				items: 3,
			},
			1000:{
				items: 6,
			}
		}
	});
        
      // })

      // ===================================遍历新闻列表=======================================>
      news.forEach(function (new_id, index){
        const news_html='<div class="col-sm-6 offset-sm-3 offset-lg-0 col-lg-4">\
                              <div class="blog-item">\
                                  <ul class="top">\
                                      <li>'+new_id.show_date+'</li>\
                                  </ul>\
                                  <h3>\
                                      <a href="haifuxing_new_content.html?id='+new_id.id+'">'+new_id.name+'</a>\
                                  </h3>\
                                  <a href="haifuxing_new_content.html?id='+new_id.id+'"><p>'+new_id.abstract+'</p></a>\
                              </div>\
                          </div>'
        $('.new').append(news_html)
      })
      
      
    },

    // 请求失败，返回异常信息
    error: function (data) {
      console.log(data)
    },
  })
})(jQuery)
