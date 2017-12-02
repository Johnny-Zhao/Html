(function() {
    // 匹配 {hello Linshui Zhaoying2333}
    // 变为Linshui Zhaoying2333 hello
    var regex = /^(\w+)\s(\w+)\s(\w+)/gi;
    var str = 'hello Linshui Zhaoying2333';
    var newstr = str.replace(regex, '$2 $3 $1');
    console.log(newstr);

    // 手机号码匹配
    var regex1 = /^1[34578]\d{9}$/gi; //如果有位数限制在最后加$
    var phone = 18368821784;
    if (!(regex1.test(phone))) { console.log('error') } else { console.log('ok') }

    // 匹配中文
    var regex2 = /([\u4e00-\u9fff])/gi;
    var s = 'hello 啊Linshui哈 Zhaoying2333';
    var news = s.match(regex);
    console.log(news.join('')); // 啊哈

    // 匹配邮箱
    // 域名由各国文字的特定字符集、英文字母、数字及“ - ” ( 即连字符或减号 ) 任意组合而成，但开头及结尾均不能含有“ - ”。域名中字母不分大小写
    var regex3 = /^[a-z0-9]+([_]?[a-z0-9]+)@[a-z0-9]+[-]?[a-z0-9]+[.][a-z]+([.][a-z]+)?$/i; // *匹配前一个表达式0次或多次。等价于{0,}
    // ?匹配前面一个表达式0次或者1次。等价于 {0,1}
    var array = ["4799109@qq.com", "a@qq.com.cn", "asd_@qq.com", "ccc@mail."]
    for (var i = array.length - 1; i >= 0; i--) {
        console.log(array[i] + "  " + (regex3.test(array[i]) == true ? "验证通过" : "验证失败"))
    }

    // Stack Overflow最高票的答案
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //匹配URL
    function getQueryObject(url) {
        url = url == null ? window.location.href : url;
        var search = url.substring(url.lastIndexOf("?") + 1);
        var obj = {};
        var reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, function(rs, $1, $2) {
            var name = decodeURIComponent($1);
            var val = decodeURIComponent($2);
            val = String(val);
            obj[name] = val;
            return rs;
        });
        return obj;
    }
    getQueryObject('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=92109629_hao_pg&wd=substring&oq=lastIndexOf&rsv_pq=8c862b9f000180e3&rsv_t=b96d1RM9tEmUr1JUkzr1Q%2Bn5ixkFFBmfpD7B1NVw1Wwq3rs79yaQ%2BsjgD1rCcn52K4SNNLEJ&rqlang=cn&rsv_enter=1&rsv_n=2&rsv_sug3=1&bs=lastIndexOf')
})()