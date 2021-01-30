const koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs');
const koaStc = require('koa-static-cache');
const  tplS = require('./middleware/tpl');
const  data =require('./data/data.json')

const server = new koa();
const koaRouters = new koaRouter();

//处理静态
server.use(koaStc('./static',{
    prefix:'/static',
    gzip:true
}))

//新闻首页
koaRouters.get('/',(ctx)=>{
    //把数据传入模板中，渲染出最终页面
    //分页处理
    //每页数量
    let pageNum = 5;

    //起始页
    let page  = ctx.query.page ||1 ;
    page = Number(page)
    //起始点,因为slice 是包头不包尾，
    //page = 1 start = 0 ; page = 2 start = 5 ..
    let start = (page - 1) * pageNum;
    //结束点
    // start = 1 end = 5 , start = 2 end =10
    let end = start + pageNum
    //所以截取的点就出来了
    let dataGroup = data.slice(start,end);

    //页码处理
    let pageNumber = Math.ceil((data.length/pageNum));

    ctx.render ('index.html',{
        data: dataGroup,
        pageNumber,
        page
    });
})

//详情页
koaRouters.get('/detail/:id(\\d+)',(ctx)=>{
    //把数据传入模板中，渲染出最终页面
    let id = Number(ctx.params.id)
    //通过id寻找数据
    let dataItem = data.find(item => item.id === id)
    //没有这条数据的处理
    if(!dataItem){
        ctx.write('404');
        ctx.end();
    }
    //传递数据
    ctx.render ('detail.html',{
        dataItem
    });
})

server.use(tplS('views'));
server.use(koaRouters.routes());

server.listen(3001,function () {
    console.log('服务启动, http://localhost:3001');
})
