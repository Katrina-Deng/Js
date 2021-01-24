class Mypromise {
    constructor(handle) {
        this.status = 'pending';
        this.value = undefined;
        handle(this._resolve.bind(this),this._reject.bind(this));
        this.onResolvedQueue = [];
        this.onRejectedQueue = [];

    }
    _resolve (val){
        this.status = 'fulfilled';
        this.value = val;

        const run =  () => {
            let cb;
            while (cb = this.onResolvedQueue.shift()) {
                cb && cb(val);
            }
        }

        // setTimeout(run);

        let ob = new MutationObserver(run);
        ob.observe(document.body,{
            attributes:true
        })
        document.body.setAttribute("attr",Math.random());
    }
    _reject (val){
        this.status = 'rejected';
        this.value = val;

        const run = () => {
            let cb;
            while (cb = this.onRejectedQueue.shift()) {
                cb && cb(val);
            }
        }
        // setTimeout(run);
        let ob = new MutationObserver(run);
        ob.observe(document.body,{
            attributes:true
        })
        document.body.setAttribute("attr",Math.random());

    }

    then(onResolved,onRejected){

        // this.onResolvedQueue.push(onResolved);
        // this.onRejectedQueue.push(onRejected);
        return new Mypromise((resolve,reject)=>{
            // 直接执行；错误的；
            // let res =  onResolved && onResolved();
            // // 对象；
            // if(res instanceof Mypromise){
            //     return res;
            // }
            // // 普通值；
            // resolve(res);

            // push不去执行；执行和逻辑分开
            this.onResolvedQueue.push(val=>{
                let res = onResolved && onResolved(val);
                if(res instanceof Mypromise){
                    // 返还 Mypromise对象
                    // return res.then(res=>{
                    //     resolve(res)
                    // });
                    // console.log(resolve)
                    return res.then(resolve);
                }
                resolve(res);
            })
            this.onRejectedQueue.push(val=>{
                onRejected && onRejected(val);
                reject(val);
            })
            // reject("err")
        })
    }
    catch(onRejected){
        this.then(undefined,onRejected);
    }
    static resolve(val){
        return new Mypromise(resolve=>{
            resolve(val);
        })
    }
    static reject(val){
        return new Mypromise((resolve,reject)=>{
            reject(val);
        })
    }
    static all(lists){
        let arr = [];
        return new Mypromise((resolve)=>{
            lists.forEach(item=>{
                item.then(res=>{
                    arr.push(res);
                    if(arr.length===lists.length){
                        resolve(arr);
                    }
                })
            })
        })
    }
    static race(lists){
        return new Mypromise((resolve,reject)=>{
            lists.forEach(item=>{
                item.then(res=>{
                    resolve(res);
                },err=>{
                    reject(err);
                })
            })
        })
    }
    finally(cb){
        this.then(cb,cb);
    }
    
}