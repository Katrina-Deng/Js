const http = require('http');
//引入fs 模块
const fs = require('fs');

let server = http.createServer((req,res)=>{

    let url = req.url;
    let content = ''
    // console.log('请求的地址',url);

    // switch (url) {
    //     case "/":
    //         content = fs.readFileSync('./template/index.html');
    //         res.write(content);
    //         break;
    //     case "/static/css/index.css":
    //         content = fs.readFileSync('./static/css/index.css');
    //         res.write(content);
    //         break;
    //     case "/logo.png":
    //         content = fs.readFileSync('./static/img/3.jpeg');
    //         res.write(content);
    //         break;
    // }
    // content = fs.readFileSync('./template/index.html')


    if(url.startsWith('/public'))
    {
       url = url.replace(/^\/public/g,'\\static');
        console.log('static',__dirname + url);
        content = fs.readFileSync(__dirname + url);
        res.write(content);

    }
    else {
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.write('欢迎来到我的nodeJs');
    }
    res.end();
})

server.listen(3000,()=>{
    console.log('服务启动成功, 地址：http://localhost:3000');
});