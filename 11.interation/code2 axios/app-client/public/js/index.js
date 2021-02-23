
const uploadBtnEl = document.querySelector('.uploadBtn');
const uploadFileEl = document.querySelector('#uploadFile');
const taskBodyEl = document.querySelector('.task_body');
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

}
getAllImage()

uploadFileEl.addEventListener('change',function () {
    console.log(111)
})


//用户登录
const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const loginBtn = document.querySelector("#login");

loginBtn.addEventListener('click',function () {
    let username = usernameEl.value;
    let password = passwordEl.value;

    console.log('axios',axios);

})
