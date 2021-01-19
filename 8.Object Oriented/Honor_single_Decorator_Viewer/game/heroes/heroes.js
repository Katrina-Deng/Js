
import GameEvent from "../GameEvent.js";

export default class heroes extends GameEvent{
    constructor(name) {
        super();
        this.name = name;
        //添加事件
        this.addEvent("initHeroes",this.init);
    }
    init(){
        console.log('初始化英雄...');
    }
}

