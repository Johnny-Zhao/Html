//页面加载完毕后触发
window.onload = function(){
	var obtn = document.getElementById('rollBtn');
	//获取页面可视区域高度
	var clientHeight = document.documentElement.clientHeight;
	var isScroll = document.getElementById('IsScroll');
	var timer = null;
	var isTop = true;
	/*window.onscroll = function(){
		isScroll.onclick = function(){
			clearInterval(timer);
		}
	}*/
	//滚动时按下滚轮触发
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(osTop >= clientHeight){
			obtn.style.display = 'block';
		}else{
			obtn.style.display = 'none';
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	obtn.onclick = function(){
		clearInterval(timer);
		//设置定时器
		timer = setInterval(function(){
			//获取滚动条距离顶部的高度
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;	
			var ispeed = Math.ceil(osTop / 5);
			document.documentElement.scrollTop = document.body.scrollTop = osTop - ispeed ;
			isTop = true;
			if(osTop == 0){
				clearInterval(timer);
			}
		},30);
	}
}