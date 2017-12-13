$(function(){
  var city='杭州';
  $citycode=urlencode(city);
  url='http://v.juhe.cn/weather/index?format=2&cityname='+$citycode+'&key=d15afc9dca8affb52ab8912cba161652';
  $.ajax({
    url:url,
    dataType:"jsonp",
    type:"get",
    data:{location:city},
    success:function(data){
      var sk = data.result.sk;
      var today = data.result.today; 
      var futur = data.result.future;
      $('.content span:first').append(sk.humidity);
      $('.content span').eq(1).append(today.dressing_index);
      $('.content span').eq(2).append(today.wash_index);
      $('.content span').eq(3).append(today.travel_index);
      $('.content span').eq(4).append(today.exercise_index);
      $('.content span:last').append(today.uv_index);
      for (var i = 0; i < futur.length; i++) {
        $('.furwea').append("<p>"+"日期："+futur[i].date+"  温度："+futur[i].temperature+"  天气："+futur[i].weather+"</p>"+"<br>");
      }
    }
  })
});

function urlencode (str) {   
    str = (str + '').toString();    
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').   
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');   
}  
