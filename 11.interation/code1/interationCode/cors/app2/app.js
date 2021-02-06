const koa = require('koa');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static-cache');
const upload = require('./middleware/upload');
const mysql = require('mysql2/promise');


const app = new koa();
const router = new koaRouter();

//链接数据库
let db

~ async function () {
   db= await mysql.createConnection({
        host:'localhost',
        port:3307,
        user:'root',
        password:'123456',
        database: 'ajax_photos'
    })
}()


app.use(koaStatic('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

router.get('/',function (ctx) {
    ctx.body='test success!!'
})

///getPhotos
router.get('/getPhotos',async ctx=>{
    //查询数据库
   let [rs] = await db.query('SELECT * FROM `photos` ');
    // console.log('rs',rs)
    rs =  rs.map((r)=>({
        ...r,
        url: '/public/upload/'+ r.name
    }))
    ctx.body = rs
})

router.post('/upload',upload('upload'),async (ctx)=>{
    // console.log(ctx.request.files);
    let pathIndex = ctx.request.files.file.path.lastIndexOf('\\');
    let pathname = ctx.request.files.file.path.substring(pathIndex+1);
    // console.log('pathname',pathname);

    //插入数据库
    //INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
    let rs = await db.query("insert into `photos` (`name`,`imgName`) values (?,?)",[pathname,ctx.request.files.file.name])
    console.log('rs',rs);
    ctx.body = {
        url : '/public/upload/'+ pathname,
        imgName: ctx.request.files.file.name
    }

})

//cors head
app.use(async (ctx,next)=>{

    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    if(ctx.method === 'OPTIONS'){

        ctx.set('Access-Control-Allow-Methods','POST, GET, OPTIONS');

        //返回前端,请求完毕
        ctx.body = '';
    }

    await next();
})

app.use(router.routes());


app.listen(9527,()=>{
    console.log('服务启动：http://localhost:9527');
})
