var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
  'contect': '褚清是个大傻逼',
  'mid': 8837
})

var options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/docomment',
  method: 'POST',
  headers: {
    'Accept': 'application / json, text/javascript, */ *; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN, zh; q=0.9',
    'Connection': 'keep-alive',
    'Content-Length': postData.length,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'imooc_uuid = 4de8c7ce-8e6e-4180 - a7be - e2fabff4dd9a; imooc_isnew_ct=1516203344; bdshare_firstime=1516934280074; imooc_isnew=2; PHPSESSID=mme7ieot676km5j1d5c5gk6qq5; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1525678433; loginstate=1; apsid=I2ZTM5MWYxZWVhMWNhMGRiZDY4YzBiYTk2ZjEzOWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDU0NTAzOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA4NTE3YTRkNTkyNmQ0MWM1ZDBlNWYyOTMxYzhkZDVm % 2BWnxWvlp8Vo% 3DYm; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1525955307; cvde=5ac1a8ca9a03d-197',
    'Host': 'www.imooc.com',
    'Origin': 'https://www.imooc.com',
    'Referer': 'https://www.imooc.com/video/8837',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36(KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
  }
}

var req = http.request(options, function (res) {
  console.log('Status:' + res.statusCode)
  console.log('headers:' + JSON.stringify(res.headers))

  res.on('data', function (chunk) {
    console.log(Buffer.isBuffer(chunk))
    console.log(typeof chunk)
  })
  res.on('end', function () {
    console.log('评论完毕')
  })
})

req.on('error', function (e) {
  console.log(e.message)
})

req.write(postData)
req.end()