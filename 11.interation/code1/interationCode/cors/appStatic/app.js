const koa = require('koa');
const koaStatic = require('koa-static-cache');

const app = new koa();

app.use(koaStatic('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

app.listen(3000,()=>{
    console.log('服务启动：http://localhost:3000');
})
