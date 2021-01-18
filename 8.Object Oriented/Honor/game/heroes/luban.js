import S11210 from '../skills/S11210.js'
import S11220 from '../skills/S11220.js'
import S11230 from '../skills/S11230.js'

import Sk301120 from "../skins/301120.js";
import Sk301121 from "../skins/301121.js";
import Sk301122 from "../skins/301122.js";


export default class luban {
    constructor() {
        this.name = "鲁班七号";
        this.ico = "./sources/heros/luban1.png";
        this.skills = [new S11210(), new S11220(), new S11230()];
        this.skin = [new Sk301120(),new Sk301121(),new Sk301122()];
    }
}