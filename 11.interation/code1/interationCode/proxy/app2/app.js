const sKey = 'Katrina';
const koa = require('koa');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static-cache');
const upload = require('./middleware/upload');
const mysql = require('mysql2/promise');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');

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

//jwt
app.use(koaJwt({
    secret: sKey }
    ).unless({
    path: [
        /^\/public/,
        /^\/login/
    ]
}));


app.use(koaStatic('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

router.get('/',function (ctx) {
    ctx.body='test success!!'
})

//用户登录 login
router.post('/login',koaBody({
    multipart:true
}),async function (ctx) {
    // console.log('body',ctx.request.body);
    let {username,password} = ctx.request.body;

    //用户名或者密码没有写
    if(!username || !password){
        ctx.status = 401
        return ctx.body = {
            code : 1,
            message: '用户名,密码不能为空'
        }
    }

    let [[rs]] = await db.query('SELECT * FROM `users` where `name` = ? ',[
        username
    ])

    //没有用户
    if(!rs){
        ctx.status = 404
        return ctx.body = {
            code : 2,
            message: '用户名不存在'
        }
    }

    if(password !== rs.password){
        ctx.status = 404
        return ctx.body = {
            code : 3,
            message: '密码错误'
        }
    }

    let token = jwt.sign({
        id:rs.id,
        username,
    }, sKey);

    ctx.set('Authorization',"Bearer "+token);
    ctx.status = 200;
    ctx.body = {
        code:5,
        message:'success',
        id:rs.id,
        username
    };


})

///getPhotos
router.get('/getPhotos',async ctx=>{

    console.log(ctx.request.header.authorization);

    //查询数据库
   let [rs] = await db.query('SELECT * FROM `photos` where `userId` = ? ',
       [
           ctx.state.user.id
       ]);
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
    let rs = await db.query("insert into `photos` (`name`,`imgName`,`userId`) values (?,?,?)",[
        pathname,
        ctx.request.files.file.name,
        ctx.state.user.id

    ])
    // console.log('rs',rs);
    ctx.body = {
        url : '/public/upload/'+ pathname,
        imgName: ctx.request.files.file.name
    }

})


app.use(router.routes());


app.listen(9527,()=>{
    console.log('服务启动：http://localhost:9527');
})


//封装一个验证得中间件
// function verify() {
//
//     return async  (ctx,next) => {
//         //验证头信息,成功拿到头信息
//         // console.log(ctx.request.header.authorization);
//         let authorization = ctx.request.header.authorization;
//         //验证代码
//         if(authorization === 'null'){
//             ctx.status = 401
//             ctx.body = {
//                 code:4,
//                 message:'用户没有登录'
//             }
//             return;
//         }//验证token值
//         else {
//             let user =  jwt.verify(ctx.request.header.authorization,'Katrina');
//             // console.log('verBool',verBool);
//             //如果验证不正确就返回
//             if(!user){
//                 ctx.status = 401
//                 ctx.body = {
//                     code:4,
//                     message:'用户没有登录'
//                 }
//                 return;
//             }
//
//             // console.log(user)
//             ctx._user = user;
//         }
//
//         await next();
//     }
//
//
// }