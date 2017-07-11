$(document).ready(function(){
  //var h1=$('#nav_about').offset().top;
  var h2=$('.portfolio_top').offset().top-75;
  var h3=$('.contact_top').offset().top-75;
  $('#nav_about').click(function(){
    $('html,body').animate({scrollTop: 0}, 800);
  })
  $('#nav_portfolio').click(function(){
    $('html,body').animate({scrollTop: h2}, 800);
  })
  $('#nav_contact').click(function(){
    $('html,body').animate({scrollTop: h3}, 800);
  })

  // $('.nav li').mouseover(function(){
  //   $(this).css({"background-color":"#2DDED5","opacity":"0.8"});
  // })
  // $('.nav li').mouseout(function(){
  //   $(this).css({"background-color":"#789","opacity":"1"});
  // })

  changeA();
  $(window).scroll(function(){
    changeA();
  });
  function changeA(){
  var curheight=$(window).scrollTop();
  if (curheight>=0&&curheight<h2) {
      $('.nav li:last').css("background-color","#FFF");
      $('.nav li:last').prevAll('li').css("background-color","#789");
    }else if(curheight>=h2&&curheight<=h3){
      $('.nav li').eq(1).css("background-color","#FFF");
      $('.nav li').eq(1).next('li').css("background-color","#789");
      $('.nav li').eq(1).prev('li').css("background-color","#789");
    }else if(curheight>h3){
      $('.nav li:first').css("background-color","#FFF");
      $('.nav li:first').nextAll('li').css("background-color","#789");
    }
  };
  
});


