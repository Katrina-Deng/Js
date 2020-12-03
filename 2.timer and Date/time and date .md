

## 主题

1. 详解定时器的使用方式和场景
2. 利用日期对象实现具体功能

## 目标

1. 掌握俩种定时器的使用
2. 掌握日期对象的使用

## 知识点

#### setTimeout 延迟定时器

​	setTimeout (code,time,[parma1...parmaN]).

​	--parma 是code 的参数的具体值  ie9 以下 不兼容

​	--time 默认值为0 

​	 clearTimeout
- clearTimeout 清除定时器,每个定时器都有一个返回值，返回值就是id
  - id 是唯一
  - 正整数
- clearTimeout(id) id 
  - id 需要注意定义的位置
  - 传入需要关闭的定时器的id

#### setInterval间隔定时器

​	setInterval (code,time,[parma1...parmaN]).

​	--parma 是code 的参数的具体值  ie9 以下 不兼容

​	--time 默认值为0 

- clearInterval(id) id 
  - id 需要注意定义的位置
  - 传入需要关闭的定时器的id
  
- 清除间隔定时器注意事项
  - 鼠标每点击一次，会产生新的间隔定时器，而清除定时器的id总是最新，所以旧的定时器无法关闭，导致定时器继续执行
  - 解决方法：
    
    - 1-每次开启间隔定时器前，通过外部定义的time id 清楚上一次的定时器
    
    - 2.利用开关。
    
      - ```javascript
        let onoff = true
        //....
        if(!onoff){
        	return;
        }
        onoff = false;
        timer = serInterval(function(){
            num++;
            //.......其他代码
        },16);
        
        //再点击清除定时器的方法中将
        onoff = true;
        ```
    
        
  
  #### 定时器的注意事项：
  
  - this的指向，定时器this 指向的是window,可以使用_this变量的把元素的this保存起来再使用
  - 定时器第一个参数不推荐使用字符串，如果是函数字符串，他要先解析字符串，再解析函数。第二是会有xss注入，
  - 时间参数默认为0，但是这个函数不是马上执行的，因为他是异步函数。**经典面试题（for循环里面套定时器）**
  - 传参的问题：如果是有名函数，那么传参我们需要放到小括号，但是一旦有小括号，这个函数就被调用了，设置的时间就无效了
    - 解决方法一：字符串（不推荐使用，影响性能），字符串会被解析两次
    - 解决方案二：用匿名函数包一下
    - 解决方案三：bind() - > 小于ie9是不能用的
  

#### 日期对象

- 获取系统时间
  - Date() 基于这个新建的对象，使用get set 方法
  - getDate()、getDay()（星期）、getMonth()、getFullYear()、getHours()、getMinutes()、getSeconds()、getMilliseconds()
  - getMonth()，比较特殊，是从0开始
  - getTime()、Date.now()
- 设置日期对象
  - Date()、setDate()、setMonth()、setFullYear()、setHours()、setMinutes()、setSeconds()、setTime()







