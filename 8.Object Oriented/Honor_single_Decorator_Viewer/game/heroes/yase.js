import S16610 from '../skills/s16610.js'
import S16620 from '../skills/s16620.js'
import S16630 from '../skills/s16630.js'

import Sk301660  from "../skins/301660.js";
import Sk301661 from "../skins/301661.js";
import Sk301662 from "../skins/301662.js";

import heroes from "./heroes.js";

export default class Yase extends heroes{
    constructor() {
        super("亚瑟");// this.name = "亚瑟";
        this.ico = "./sources/heros/yase1.png";
        this.skills = [new S16610, new S16620, new S16630];
        this.skin = [new Sk301660,new Sk301661,new Sk301662];
    }
    hurt(){
        console.log("释放一技能...");
    }
}