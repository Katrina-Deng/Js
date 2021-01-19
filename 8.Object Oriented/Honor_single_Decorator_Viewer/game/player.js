import Yase from './heroes/yase.js';
import luban from './heroes/luban.js';

export default class Player {
    constructor(name) {
        this.name = name;
        this.heroes = [new Yase(), new luban()];
    }
}