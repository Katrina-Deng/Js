import Player from './player.js';

// 游戏管理类；

class Game{
    constructor(){
        this.player = null;
    }
    login(name){
        this.player = new Player(name);
    }
}
//声明局部变量 不对外暴露 Game类防止多次实例化
let instance = null ;

export default function (...arg) {
    if (!instance){
        instance = new Game(...arg);
    }

    return instance;
}
