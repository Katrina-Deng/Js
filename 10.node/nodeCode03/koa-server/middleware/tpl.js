const nunjucks =require('nunjucks');

//
// //配置模板环境
//
// let tpl = new nunjucks.Environment(
//     //自动加载views
//     new nunjucks.FileSystemLoader('views')
// )
//
// module.exports = function (ctx, next) {
//     //和外面的接口相对应,传入页面名称和数据
//     ctx.render = function (filename,data) {
//         //这里调用nunjucks render
//         ctx.body = tpl.render(filename, data);
//     }
//
//     next();
// }


module.exports = function (dir) {
    return function (ctx ,next) {

        let tpl = new nunjucks.Environment(
            //自动加载views
            new nunjucks.FileSystemLoader(dir,{
                //实时更新数据
                watch:true,
                noCache:true
        })
        )
        ctx.render = function (filename,datas) {
            //这里调用nunjucks render
            ctx.body = tpl.render(filename, datas);
        }
        next();
    }
}

