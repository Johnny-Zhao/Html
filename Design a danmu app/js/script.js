$(function(){
  var colors = [
  '#00A0B0',
  '#6A4A3C',
  '#CC333F',
  '#EB6841',
  '#EDC951',
  '#3FB8AF',
  '#7FC7AF',
  '#FF9E9D',
  '#C6A49A',
  '#99B898',
  '#2A363B',
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
  '#B3CC57',
  '#FFBE40',
  '#CC0C39',
  '#E6781E',
  '#02AAB0'
];

  var texts=[];

  var randomTextNumber = Math.floor(Math.random() * (texts.length));
  var newText = texts[randomTextNumber];

  var contentH = $('.content').height();
  var contentW = $('.content').width();
  var Top;
  

  $('#send').bind("click",auto);

  document.onkeydown=function(e){
    if(e.keyCode == 13){
      auto();
    }
  }

  function auto(){
    var creSpan=$("<span class='string'></span>");
    var text=$("#text").val();
    creSpan.text(text);
    $('#text').val('');
    Top=parseInt(contentH*(Math.random()));
    if(Top>contentH-90){
      Top=contentH-90;
    }
    var randomColorNumber = Math.floor(Math.random() * (colors.length));
    var newColor = colors[randomColorNumber];
    creSpan.css({"top":Top,"right":-150,"color":newColor});
    console.log(creSpan.html());
    //texts.push(creSpan);
    $('.content').append(creSpan);
    var spanDom=$(".content>span:last-child");
    spanDom.animate({"right":contentW+300},10000,"linear",function(){
        $(this).remove();
    });
  }

});
