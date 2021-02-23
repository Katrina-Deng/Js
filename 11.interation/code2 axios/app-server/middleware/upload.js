// koabody 处理数据

const koaBody = require('koa-body');

module.exports = function upload(dir) {
    return new koaBody({
        //让他支持 `multipart-formdata` 的表单
        multipart:true,
        //处理文件参数
        formidable:{
            keepExtensions:true,
            uploadDir : __dirname + '/../public/' + dir
        }
    })
}