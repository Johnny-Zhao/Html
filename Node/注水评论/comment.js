var http = require('https');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '我是测试数据',
    'mid': 8837
})

var options = {
    hostname: 'www.imooc.com',
    port: 443,
    path: '/course/docomment',
    method: 'POST',
    header: {
        'Accept': 'application/json, text/javascript, *',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=611506f6-8b4a-4c15-8bcc-1d76dec3d066; imooc_isnew_ct=1502778109; UM_distinctid=15e54c6135afb-0763516f7c1be8-78147f73-100200-15e54c6135b6a; CNZZDATA1261110065=1076468291-1504657706-null%7C1510213589; loginstate=1; apsid=hhN2FlZTIxN2IwN2FmZWY3ZTg4MGQ0ZDBiYjNjNjUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzYzMDE1MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZkNjM2YjhkMWJjNWUxNzU2ZDJmNTg4MWNiODUzMjc4%2B70tWrMtAlg%3DYj; PHPSESSID=001s7u26nm9i6ssru3b9ptcei3; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1512882404,1512961579,1512973300,1512973771; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1512978976; imooc_isnew=2; cvde=5a2df60f91201-104',
        'Host': 'www.imooc.com',
        'Origin': 'https://www.imooc.com',
        'Referer': 'https://www.imooc.com/video/8837/0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4033.400 QQBrowser/9.6.12624.400',
        'X-Requested-With': 'XMLHttpRequest'
    }
}

var req = http.request(options,function(res){
  console.log(res.statusCode);
  console.log(JSON.stringify(res.headers));
  res.on('data',function(chunk){
    console.log(typeof chunk);
  })
  res.on('end',function(){
    console.log('评论完毕');
  })
  res.on('error',function(e){
    console.log(e.message);
  })
})

req.write(postData);
req.end();