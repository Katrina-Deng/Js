
const uploadBtnEl = document.querySelector('.uploadBtn');
const uploadFileEl = document.querySelector('#uploadFile');
const taskBodyEl = document.querySelector('.task_body');
const contentList = document.querySelector('.content-list');
const taskPanel = document.querySelector('.task_panel');
const contentUlEL = document.querySelector('.content-ul');
const userNameEl = document.querySelector('.userName');


let localName = localStorage.getItem('username');
if(!localName){
    userNameEl.innerHTML = '未登录';
}else {
    userNameEl.innerHTML = localName;
}


uploadBtnEl.addEventListener('click',function () {
    //点击选择文件
     uploadFileEl.click()
})

//获取全部 图片
function getAllImage() {
    ajax({

        method: 'get',
        url: '/api/getPhotos',
        success(data) {
            data = JSON.parse(data);
            console.log(data)
            if(data.code === 4){
                return;
            }

            data.forEach(item =>{
                createLI(item)
            })
        }
    })
}
getAllImage()

uploadFileEl.addEventListener('change',function () {

    taskPanel.style.opacity = '1'
    console.log(this.files)
     for (let file of this.files)
     {
         uploadFile({
             file
         });
     }
})

//发送数据给客户端
function uploadFile(data) {

    let li = document.createElement('li');
    console.log(data);
    li.innerHTML =     `
            <span>${data.file.name}</span>
            <div class="task-progress-status">
                    上传中……
               </div>
            <div class="progress"></div>
            `

    //获取元
    const taskProgressStatusEl = li.querySelector('.task-progress-status');
    const progressEl = li.querySelector('.progress');
    taskBodyEl.appendChild(li);

    ajax(
        {
            method:'post',
            url:'/api/upload',
            data,
            onprogress(ev){
                progressEl.style.width = (ev.loaded/ev.total) * 100 + '%';
            },
            success(data){
                taskProgressStatusEl.innerHTML = '上存成功'
                setTimeout(function () {
                    li.remove();
                    taskPanel.style.opacity = '0'
                },1000);
                data = JSON.parse(data);
                console.log(data)
                createLI(data)
            }
        }
    )
}

function createLI(data) {
    let imgLi = document.createElement('li');
    data.name = 'http://localhost:9527' + data.url ;
    imgLi.innerHTML = `
                    <img src="${data.name}" alt="">
                    <div class="imgName">${data.imgName}</div>`
    contentUlEL.appendChild(imgLi);
}

//用户登录
const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const loginBtn = document.querySelector("#login");

loginBtn.addEventListener('click',function () {
    let username = usernameEl.value;
    let password = passwordEl.value;

    ajax({
        method:'post',
        url:'/api/login',
        data: {
            username,
            password
        },
        success(data){
           data = JSON.parse(data);
            console.log('--',data);
            if(data.code === 5){
                localStorage.setItem('username',data.username);
                userNameEl.innerHTML = localStorage.getItem('username');
                window.location.reload(true);
            }
            //这里就可以拿到信息
            // console.log(this.getResponseHeader('authorization'));
            //然后存起来 localStorage cookie
            localStorage.setItem('authorization',this.getResponseHeader('authorization'))
        }

    })
})
