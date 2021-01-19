export default class GameEvent {
    constructor() {
        this.handle = {};
    }
    //添加事件
    addEvent(eventName,fn) {
        //首次没有定义 eventName
        if(typeof this.handle[eventName] === "undefined"){
            this.handle[eventName] = [];
        }
        this.handle[eventName].push(fn);
    }
    //触发对象
    triggerEvent(eventName,...arg) {
        //如果该事件名称没有定义直接返回不执行
        if(typeof this.handle[eventName] === "undefined"){
            return  console.log("没有该事件");
        }
        this.handle[eventName].forEach(fn =>{
            fn(...arg);
        })
    }
    removeEvent(eventName,fn) {
        if(typeof this.handle[eventName] === "undefined"){
            return  console.log("没有该事件");
        }
        this.handle[eventName].forEach((fnItem,index) =>{
            if(fn == fnItem){
                this.handle[eventName].splice(index,1)
            }
        })
    }
}