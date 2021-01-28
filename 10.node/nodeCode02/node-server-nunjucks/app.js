const http = require('http');
const fs = require('fs');
const mine = require('./mime.json');


const server = http.createServer((req, res) => {
    let content = '';
    let url = req.url;
    if (url.startsWith('/static')) {
        //如果请求的url 是/static 就读取静态资源文件
        let path = __dirname + url;

        try {
            //统一设置
            // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            //设置mime

            content = fs.readFileSync(path);
            let lastIndex = path.lastIndexOf('.');
            let ext = path.substring(lastIndex);
            // console.log('ext', ext);
            /*
            * ext .html
              ext .css
              ext .jpeg
            * */
            let mineName = mine[ext];
            // console.log(ext,mineName)
            res.writeHead(200,{'Content-Type':mineName});
            res.write(content);

        } catch (e) {
            content = fs.readFileSync('./static/404.html');
            res.write(content);

        } finally {
            res.end();
        }
    }


})

server.listen(3000, () => {
    console.log('server open', 'http://localhost:3000');
})