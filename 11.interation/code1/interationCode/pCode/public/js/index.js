// ajax({
//     method: 'get',
//     url: '/getData',
//     query: {a: 1, b: 2},
//     data:{
//         x:1,
//         y:2
//     },
//     success(data) {
//         console.log('data', data)
//     }
// });
//
// ajax({
//     method: 'post',
//     url: '/getData',
//     query: {
//         a: 1,
//         b: 2
//     },
//     data:{
//         x:1,
//         y:2
//     },
//     success(data) {
//         console.log('data', data)
//     }
// });
//


const uploadBtnEl = document.querySelector('.uploadBtn');
const uploadFileEl = document.querySelector('#uploadFile');
const taskBodyEl = document.querySelector('.task_body');
const contentList = document.querySelector('.content-list');
const taskPanel = document.querySelector('.task_panel');
const contentUlEL = document.querySelector('.content-ul');


uploadBtnEl.addEventListener('click',function () {
    //点击选择文件
     uploadFileEl.click()
})

//获取全部 图片
function getAllImage() {
    ajax({

        method: 'get',
        url: '/getPhotos',
        success(data) {
            data = JSON.parse(data);
            console.log(data);
            //结构
            /*
            * <!--			<li><img src="/public/upload/upload_9b50c00fd664717a66403c2a1e879d6b.jpg" alt=""><div class="imgName">123.jpg</div></li>-->
<!--			<li><img src="/public/upload/upload_a510736552c67b908959899946a9b50b.jpeg" alt=""><div class="imgName">123.jpg</div></li>-->
<!--			<li><img src="/public/upload/upload_adf7fa0a1b51699f2d7575fb6a41250c.png" alt=""><div class="imgName">123.jpg</div></li>-->
*
* */
            data.forEach(item =>{
                let li = document.createElement('li');
                li.innerHTML = `
                    <img src="${item.url}" alt="">
                    <div class="imgName">${item.imgName}</div>
                `
                contentUlEL.appendChild(li);
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
            url:'/upload',
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
                //contentList
                let imgLi = document.createElement('li');
                imgLi.innerHTML = `
                    <img src="${data.url}" alt="">
                    <div class="imgName">${data.imgName}</div>`
                
                contentUlEL.appendChild(imgLi);

            }
        }
    )
}