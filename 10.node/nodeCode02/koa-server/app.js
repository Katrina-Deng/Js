const koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs');
const koaStc = require('koa-static-cache');


const server = new koa();
const koaRouters = new koaRouter();
let content = ''

server.use(koaStc('./static',{
    prefix:'/static',
    gzip: true,
    dynamic: true
}))


koaRouters.get('/',ctx=>{
    // console.log(ctx.req.url);
    // ctx.body = 'hello koa'
    content = fs.readFileSync('./static/index.html');
    ctx.body = content.toString();
})

koaRouters.get('/login',ctx=>{
    // console.log(ctx.req.url);
    // ctx.body = 'hello koa'
    content = fs.readFileSync('./static/login.html');
    ctx.body = content.toString();
})

koaRouters.get('/register',ctx=>{
    // console.log(ctx.req.url);
    // ctx.body = 'hello koa'
    content = fs.readFileSync('./static/register.html');
    ctx.body = content.toString();
})

server.use(koaRouters.routes());

server.listen(3001,function () {
    console.log('服务启动, http://localhost:3001');
})

