function noop() {}

function ajax(options) {
    //合并配置
      options = {
        ...{
            method:'get',
            url:'',
            success:noop
        },
         ...options
    }


    //处理query
    if(options.query){
        let queryData = queryParse(options.query)
        options.url += '?' + queryData;
    }

    //创建ajax对象
    let xhr = new XMLHttpRequest();

     //请求回调
    xhr.onload = function () {
        options.success(xhr.responseText);
    }
    //onload 的钩子
    xhr.upload.onprogress = options.onprogress;


    //打开请求配置
    xhr.open(options.method,options.url,true);

    //处理body数据
    let bodyData = null;
    if (options.data){
        bodyData = bodyParse(options.data);
    }


    //发送请求
    xhr.send(bodyData);
}

function queryParse(obj) {
    let arr = [];
    for (let item in obj){
        arr.push(`${item}=${obj[item]}`)
    }

    return arr.join('&');
}

function bodyParse(obj) {
    let fd = new FormData();

    for (let item in obj){
        fd.append(item,obj[item]);
    }
    return fd
}