$(function(){
  var $time = $(".clock").find("span");
  var flag = false;
  var doubleClick = false;
  var height = $("#mask").height();
  $("#add").click(function(){
    $("#minus").attr('disabled',false);
    var $n = $(".timeLength").find("span");
    $n.text(parseInt($n.text())+1);
    if($n.text()>=0 && $n.text()<=9){
      $time.text('0' + $n.text());
    }else{
      $time.text($n.text());
    }
    if($n.text()==60){
      $("#add").attr('disabled',true);
    } 
  })
  $("#minus").click(function(){
    $("#add").attr('disabled',false);
    var $n = $(".timeLength").find("span");
    $n.text(parseInt($n.text())-1);
    if($n.text()>=0 && $n.text()<=9){
      $time.text('0' + $n.text());
    }else{
      $time.text($n.text());
    }
    if($n.text()==1){
      $("#minus").attr('disabled',true);
    }
  })
  var timer = null;
  $("#clock").click(function(){
    if(!doubleClick){
      var zeroFlag2 = false;
      if(!flag){
        if($(".timeLength").find("span").text() <= 10){
          $time.text('0' + (parseInt($time.text())-1) +':59');
        }else{
          $time.text(parseInt($time.text())-1 +':59');
        }
        flag = true;
      }
      $time.css("left","38%");
      $("#add").attr('disabled',true);
      $("#minus").attr('disabled',true);
      var arr = $time.text().split(":");
      setTimeout(function(){},1000);
      timer = setInterval(function(){
        var zeroFlag1 = false;
        if(parseInt(arr[0]) == 0 && parseInt(arr[1]) == 1){
          setTimeout(function(){
            $time.text('00:00');
            $("#clock").attr('disabled',true);
            $("#add").attr('disabled',false);
            $("#minus").attr('disabled',false);
          },1000);
          clearInterval(timer);
        }
        arr[1] -= 1;
        if(!zeroFlag1){
          if(arr[1]>=0 && arr[1]<=9){
            arr[1] = '0' + arr[1];
            zeroFlag1 = true;
          }
        }
        if(!zeroFlag2){
          if(arr[0]>=0 && arr[0]<=9){
            arr[0] = '0' + arr[0];
            zeroFlag2 = true;
          }
        }
        var count = 0;
        for(var i = 0; i<arr[0].length;i++){
          if(arr[0][i].indexOf('0')!==-1){
            count++;
          }
        }
        if(count==2){
          arr[0] = arr[0] + '';
          console.log(arr[0]);
          arr[0] = arr[0].substring(1);
        }
        $time.text(arr.join(":"));
        var totalSeconds = (parseInt($(".timeLength").find("span").text()))*60;
        var stillSeconds = (parseInt(arr[0]))*60+parseInt(arr[1]);
        $("#mask").css("height",Math.floor((stillSeconds/totalSeconds)*height));
        if(arr[1] == '00'){
          arr[0] -= 1;
          arr[1] = '60';
          zeroFlag2 = false;
        }
      },1000)
      doubleClick = true;
    }else{
      clearInterval(timer);
      doubleClick = false;
    }
  })
})