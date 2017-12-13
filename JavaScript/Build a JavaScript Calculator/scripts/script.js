$(function(){
  var $keys = $("#keys").find("li");
  var $calInput = $("#calInput");
  var sum = 0;
  var flag = true;
  var calFlag = false;
  $keys.each(function(i){
    var _this = $(this);
    $(this).click(function(){
      switch(_this.text()){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          $calInput.val(function(){
            return $calInput.val() + _this.text();
          });
          calFlag = false;
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
          if(!calFlag){
            $calInput.val(function(){
              return $calInput.val() + _this.text();
            });
          }
          calFlag = true;
          flag = true;
          break;
        case '.':
          if(flag){
            $calInput.val(function(){
              return $calInput.val() + _this.text();
            });
          }
          flag = false;
          break;
        case 'AC':
          $calInput.val('');
          break;
        case 'CE':
          $calInput.val($calInput.val().substring(0,$calInput.val().length-1));
          break;
        case '=':
          $calInput.val(eval($calInput.val()));
          // var arr = [];
          // if($calInput.val().indexOf('+')!==-1){
          //   var n1 = $calInput.val().substring(0,$calInput.val().indexOf('+'));
          //   var n2 = $calInput.val().substring($calInput.val().indexOf('+')+1,$calInput.val().length);
          //   sum = parseFloat(n1)+parseFloat(n2);
          //   arr.push(n1,n2);
          // }
          // $calInput.val(sum);
          break;
      }
    })
  })
})