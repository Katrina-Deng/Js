export default class Dialog extends EventTarget{
    constructor(userOpts) {
        super();
        this.opts = {
            width: '400px',
            height: "250px",
            title: "测试标题",
            content: "测试内容",
            draggable: true, //是否可拖拽
            maskable: true, //是否有遮罩
            isCancel: true, //是否有取消
            success() {
            },
            cancel() {
            }
        }
        this.opts = Object.assign(this.opts, userOpts);
        //初始化函数
        this.init();
    }
    //初始化配置/查看配置
    init() {
        this.creatElement();
        this.addEvent();
        //添加事件绑定
        this.addEventListener('success',this.opts.success);
        this.addEventListener('cancel',this.opts.cancel);
        if (this.opts.draggable) {
            this.drag();
        }
    }

    //初始化组件
    creatElement(){
        let container = document.createElement('div');
        container.innerHTML = `
                ${this.opts.maskable? '<div class="k-wrapper"></div>':''}
                <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
        <div class="k-header">
            <span class="k-title">${this.opts.title}</span><span class="k-close">X</span>
        </div>
        <div class="k-body">
            <span>${this.opts.content}</span>
           
        </div>
        <div class="k-footer">
        ${this.opts.isCancel? '<span class="k-default">取消</span>':''}
            <span class="k-primary">确定</span>
        </div>
    </div>
        `
        container.style.display = 'none';
        document.body.appendChild(container);
        this.container = container;
    }

    //添加事件类
    addEvent(){
        //事件委托的方法
        let closeEvent = this.container.querySelector('.k-dialog');
        closeEvent.addEventListener('click',(e)=>{
            //获取事件的类
            switch (e.target.className) {
                case  'k-close' :
                    this.close();
                    break;
                case  'k-default' :
                    let cEvent = new CustomEvent('cancel');
                    this.dispatchEvent(cEvent);
                    this.close();
                    break;
                case  'k-primary' :
                    this.confirm();
                    this.close();
                    break;
                default :
                    break;
            }
        })
    }

    confirm(value){
        let sEvent = new CustomEvent('success',{detail:value});
        this.dispatchEvent(sEvent);
    }

    close(){
        this.container.style.display = 'none';
    }
    //显示提示框得方法
    open() {
        this.container.style.display = 'block';
    }

    drag(){
        let kDialog = this.container.querySelector('.k-dialog');
        // kDialog.onmousedown = function (e) {
        //
        //     let startX = e.clientX - this.offsetLeft;
        //     let startY = e.clientY - this.offsetTop;
        //
        //     this.onmousemove = function (e) {
        //         let nowX = e.clientX;
        //         let nowY = e.clientY;
        //         this.style.left = nowX - startX + 'px';
        //         this.style.top = nowY - startY + 'px';
        //     }
        // }
        // document.onmouseup = function () {
        //     kDialog.onmousemove = '';
        // }
        function getStyle(el,attr){
            return parseFloat(getComputedStyle(el)[attr]);
        }

        kDialog.addEventListener('mousedown',function(e) {

            let startL = getStyle(kDialog, 'left');
            let startT = getStyle(kDialog, 'top');

            // 记录鼠标按下的位置
            let startX = e.clientX;
            let startY = e.clientY;

            function move(e) {
                let nowX = e.clientX;
                let nowY = e.clientY;

                // 获取移动距离 - 差值
                let disX = nowX - startX;
                let disY = nowY - startY;

                // 原本的位置(left,top) + 移动的距离 =当前位置

                kDialog.style.left = startL + disX + 'px';
                kDialog.style.top = startT + disY + 'px';
            }

            window.addEventListener('mousemove', move)

            kDialog.addEventListener('mouseup', function () {
                // 清除鼠标移动事件
                window.removeEventListener('mousemove', move);

            }, {
                once: true
            })
            // 阻止浏览器默认选中文字或图片
            // e.preventDefault();
        })
    }
}

export class inputDialog extends Dialog {
    constructor(options) {
        super(options);
        this.creatInputElement();
    }

    creatInputElement() {
        let inpEle = document.createElement('input');
        let dBody = this.container.querySelector('.k-body');
        inpEle.classList.add('input-inner');
        dBody.appendChild(inpEle);
        this.inpEle = inpEle;
    }
    confirm() {
        super.confirm(this.inpEle.value);
        this.inpEle.value = '';
    }
}

class webDialog extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = `<button>WebClick</button>`
        let dialog = new Dialog({
            title: this.title,
            draggable: this.draggable,
            //触发事件
            success: ()=>{
                this.dispatchEvent(new CustomEvent('success'));
            }

        });
        this.onclick = function () {
            console.log(dialog.opts);
            dialog.open();
        }
    }
    get title(){
        return this.getAttribute('title') ?? '默认自定义组件标题'
    }
    get draggable(){
         return JSON.parse(this.getAttribute('draggable')) ;
    }

}

customElements.define('web-dialog',webDialog);