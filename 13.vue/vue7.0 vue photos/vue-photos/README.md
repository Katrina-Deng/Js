# vue-photos

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 请求后端接口

- 创建文件夹 api

### axios http.js

- 一般做项目的时候，需要自己封装一下 axios 做一下拦截
- 设置请求超时时间
- 设置请求拦截器(设置头信息)
- 响应拦截器
  - 当用户没有登录的时候，就返回到登录页面,响应的时候拦截起来
  - 但是我们刷新时候会再次请求 getphotos，所以我们可以利用路由守卫拦截
  - 参考 http.js

### 登录设置完 token

- 再次请求页面就也会报 401，
- 因为再 store 中只有再 token 中才会赋值，可以存在本地 localstorage
- 看 store/index.js
