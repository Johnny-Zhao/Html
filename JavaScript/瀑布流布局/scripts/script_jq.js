$(window).on('load',function(){
	$(window).on("resize",function(){
		waterfall();
	});
	waterfall();
	var dataInt={'data':[{'src':'0 (1).jpg'},{'src':'0 (2).jpg'},{'src':'0 (3).jpg'},{'src':'0 (4).jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs = $('#main>div');
	//本身的宽
	//var w = $boxs.eq(0).width();
	//包含padding、border等
	var w = $boxs.eq(0).outerWidth();
	var cols =Math.floor($(document).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide(){
	// var $lastBox = $('main>div').last();
	// var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var $lastBox = $( "#main>div" );
    var lastPinH = $lastBox.last().get(0).offsetTop + Math.floor($lastBox.last().height()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastPinH<scrollTop+documentH)?true:false;
}