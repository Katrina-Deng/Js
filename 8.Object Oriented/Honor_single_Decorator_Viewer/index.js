// console.log("index.js...");
// 分析对象(根据需求)  ---> 抽离对象共性特点；--》类 --->研究类之间逻辑关系；
// 亚瑟  鲁班...  英雄对象；  技能一、技能二... 技能  皮肤对象 皮肤一、皮肤二...; 玩家对象；（登录）;

// 亚瑟  鲁班 （英雄类（基类，继承）） 技能一类  技能二类 （技能类） 皮肤一类 皮肤二类（皮肤类）；玩家类；

import Instance from "./game/game.js";
let game = new Instance();
console.log(game);
//装饰

function hurtName() {
    console.log("圣光制裁>>>");
}
Function.prototype.DecoratorFn = function (fn1) {
    this();
    fn1();
}


// 所有的节点
let eles = {
    login: {
        loginView: document.querySelector(".login"),
        username: document.querySelector(".username"),
        loginSub: document.querySelector(".sub")
    },
    game: {
        gameView: document.querySelector(".game"),
        chioseusername: document.querySelector(".chioseusername"),
        heroContainer:document.querySelector('.heroContainer'),
        heroView: document.querySelector(".heroView"),
        heroShow: document.querySelector(".heroShow"),
        skillsView: document.querySelector(".skillsView"),
        skinShow: document.querySelector('.skinShow'),
        skinBtn: document.querySelector('.skinBtn'),
        skinView: document.querySelector('.skinView'),
        skinContainer:document.querySelector('.skinContainer'),

    }
}

eles.login.loginSub.onclick = function() {
    let username = eles.login.username.value;
    // console.log(username);
    if (username) {
        game.login(username);
        console.log(game);
        // 隐藏登录页面显示游戏页面;
        eles.login.loginView.style.display = "none";
        eles.game.gameView.style.display = "block";
        eles.game.skinShow.innerHTML = '';
        // 修改用户名；
        eles.game.chioseusername.innerHTML = username;
        renderHero(game.player.heroes);
    }
}

// 渲染英雄视图；
function renderHero(heroes) {
    eles.game.heroView.innerHTML = "";
    console.log(heroes);
    eles.game.skinBtn.innerHTML = '';
    heroes.forEach(hero => {
        //触发事件
        hero.triggerEvent("initHeroes");
        let heroItem = document.createElement("div");
        heroItem.classList.add("heroItem")
        heroItem.innerHTML = ` <img src="${hero.ico}" />
        <span>${hero.name}</span>`;
        eles.game.heroView.appendChild(heroItem);
        heroItem.onclick = function() {
            // 选中英雄呈现；
            eles.game.heroShow.innerHTML = '';
            eles.game.skinShow.innerHTML = '';
            let img = document.createElement("img");
            img.src = hero.ico;
            eles.game.heroShow.appendChild(img);
            // 皮肤按钮显示
            eles.game.skinBtn.innerHTML = "皮肤";
            eles.game.skinBtn.onclick = function () {
                eles.game.skinView.innerHTML = '';
                eles.game.heroContainer.style.display='none';
                eles.game.skinContainer.style.display='block';
                renderSkins(hero.skin);
            }
            renderSkills(hero.skills);
            hero.hurt.DecoratorFn(hurtName);
        }
    })
}
//技能视图
function renderSkills(skills) {
    eles.game.skillsView.innerHTML = "";
    skills.forEach(skill => {
        let img = document.createElement("img");
        console.log(skill);
        img.src = skill.ico;
        eles.game.skillsView.appendChild(img);
    })
}

//皮肤视图
function renderSkins(skin) {
    console.log(skin);
    skin.forEach(skinItem =>{
        let skinCon = document.createElement("div");
        skinCon.classList.add('skinItem');
        skinCon.innerHTML  += `
                    <img src=${skinItem.smallIco} />
                    <span>${skinItem.name}</span>`
        eles.game.skinView.appendChild(skinCon);
        skinCon.onclick = function () {
            eles.game.skinShow.innerHTML = '';
            eles.game.heroShow.innerHTML = '';
            eles.game.heroShow.innerHTML = `<img src=${skinItem.smallIco}>`;
            let img = document.createElement("img");
            img.src = skinItem.imgIco;
            eles.game.skinShow.appendChild(img);
        }
    })

}

