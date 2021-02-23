const koa = require('koa');
const koaStatic = require('koa-static-cache');
const http = require('http');

const app = new koa();

//跨域服务代理
app.use(async (ctx,next)=>{

    if(ctx.url ==='/api'){
        ctx.body =await proxyRequest(ctx);
    }


    await next();
})


//静态
app.use(koaStatic('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

app.listen(3000,()=>{
    console.log('服务启动：http://localhost:3000');
})

//proxy
function proxyRequest(ctx) {
    return new Promise(resolve=>{

        const options = {
            protocol:'http:',
            hostname: 'localhost',
            port: 9527,
            path: '/getPhotos',
            method: 'get',
            headers: ctx.request.headers
        };


        const req = http.request(options,(res)=>{
            let data =''
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
                // console.log('no data query');
            });
        });

        req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        req.write('');
        req.end();
    })

}