const koa = require('koa');
const koaStatic = require('koa-static-cache');
const proxy = require('koa-server-http-proxy');
const app = new koa();

app.use(proxy('/api', {
        target: 'http://localhost:9527',
        pathRewrite: {
            '^/api': ''
        },
    }
))


//静态
app.use(koaStatic('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

app.listen(3000,()=>{
    console.log('服务启动：http://localhost:3000');
})

