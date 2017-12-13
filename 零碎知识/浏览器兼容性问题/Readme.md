> 一：dom中绑定事件事件 

> dom0级绑定：兼容所有浏览器，dom0.onclick=function(){}    
> dom2级：dom0.addEventListener('click',function(){}),          
> ie浏览器：dom0.attachEvent('click',function(){})

> 二：获取事件对象：    
```
document.onclick = function(e) {
    var evt = e || window.event;
    console.log(e);
};
ie: 用window.event;
```


三：ajax请求时：创建兼容的xhr对象        
```
function createXHR() {
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                xhr = false;
            }
        }
    }
    return xhr;
}
var xhr = createXHR();
```


四：获取浏览器窗口尺寸
    
```
var w=window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
var h=window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
```
>     不包括工具栏和滚动条
    
> 五：一些h5标签：

```
[if lte ie8]
        document.createElement('header');
        document.createElement('nav');
        document.createElement('section');
        document.createElement('article');
        document.createElement('aside');
        document.createElement('footer');
    [endif]
```
> 六：盒模型兼容：

ie8及更早ie版本不支持填充的宽度和宽度属性，解决办法在文档开头加<!DOCTYPE html>
> 七：webapp:

移动端事件

overflow-y：scroll:让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁。
> 八：

```
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
```
> 九：判断浏览器类型：


```
if(navigator.userAgent.indexOf('Opera') != -1) { 
    alert('Opera'); 
} 
else if(navigator.userAgent.indexOf('MSIE') != -1) { 
    alert('Internet Explorer'); 
} 
else if(navigator.userAgent.indexOf('Firefox') != -1) { 
    alert('Firefox'); 
} 
else if(navigator.userAgent.indexOf('Netscape') != -1) { 
    alert('Netscape'); 
} 
else if(navigator.userAgent.indexOf('Safari') != -1) { 
    alert('Safari'); 
} 
else{ 
    alert('无法识别的浏览器。'); 
}
```

（1）png24为的图片在IE6浏览器上出现背景，解决方案是做成PNG8。

（2）浏览器默认的margin和padding不同，解决方案是加一个全局的*{margin:0;padding:0;}来统一。

（3）IE6双边距bug:块属性标签float后，又有横行的margin情况下，在IE 6显示margin比设置的大。

（4）浮动ie产生的双边距问题：块级元素就加display：inline；行内元素转块级元素display：inline后面再加display：table。
>           .bb{
>            background-color:#f1ee18; /*所有识别*/
>           .background-color:#00deff\9;/*IE6、7、8识别*/
>           +background-color:#a200ff;/*IE6、7识别*/
>           _background-color:#1e0bd1;/*IE6识别*/
>           }

> 实践中总结出来的，其实只用display:flex;会有兼容问题。因为这算是最新的规范了吧，一些老一点浏览器支持并不是很好。其实以前应该还有display：box；当然一般还会加上前缀，display:-webkit-box;子元素会写成box-flex=1;等等。针对这种情况，在实际开发中会把以前旧版的规范写在前面，后面写上新版的规范。比如这样：

```
.box{
    display:-webkit-box;
    display:box;
    display:-webkit-flex;
    display:flex;
}
```


touch对象包含属性：
- clientX触摸目标在视口中的x坐标
- clientY触摸目标在视口中的y坐标

- identifier标识触摸的唯一ID
- pageX触摸目标在页面中的x坐标（包含滚动）
- pageY触摸目标在页面中的y坐标（包含滚动）
- screenX触摸目标在屏幕中的x坐标
- screenY触摸目标在屏幕中的y坐标
- target触摸的DOM节点目标


> 局部弹性滚动(安卓不支持)

```
overflow:scroll;
-webkit-overflow-scrolling:touch;
```