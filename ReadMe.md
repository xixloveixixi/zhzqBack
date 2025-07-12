# ReadMe

## 1、npm初始化

```
npm init -y 
```

生成packga.json，记住项目的依赖

## 2、git初始化

```
git init 
```

生成git

## 3、创建ReadMe

编写文件

## 4、搭建一个简单的koa项目

引入koa

```
npm i koa
```

```
const Koa = require('koa');
// 创建一个新的Koa应用实例
const app = new Koa();
// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, Koa!';
});
// 启动服务器，监听3000端口
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## 5、优化

### 5.1 自动重启

1、使用nodemon进行重启

```
npm i nodemon
```

2、修改package配置--启动脚本

```
 "scripts": {
    "dev" : "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 5.2 读取配置文件

1、下载配置dotenv

```
npm i dotenv
```

2、环境变量

根目录下：.env

```
APP_PORT = 8000
```

3、配置文件

src/config/config.default.js

```
// 1、导入doteenv
const dotenv = require('dotenv');
// 2、启动dotenv
dotenv.config();

// 3、导出配置对象

module.exports = process.env;
```

4、改写main.js

```
// 导入配置文件
const {APP_PORT} = require('./config/config.default');
// 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
```

