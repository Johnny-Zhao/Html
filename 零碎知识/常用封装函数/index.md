
### 移动端rem适配方案
```
<script>   
(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window  'orientationchange'  'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth=750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100  (clientWidth  750) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>
```

---

### 封装getElementsByClassName函数
```
function getClassName(tagName, classname) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(classname);
    } else {
        var results = [];
        var elems = document.getElementsByTagName('*');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
```

