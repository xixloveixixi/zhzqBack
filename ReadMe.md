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

## 6、编写路由

我们怎么将不同的url返回不同的数据呢，就是使用的路由：实现url调用处理函数

1、下载koa-router

```
npm i koa-router
```

2、创建文件

src/router/user.router.js

3、编写路由配置

```
// 1、引入router
const Router = require('koa-router');
// 2、创建一个router实例
const router = new Router({prefix : '/users'});
// 3、 定义一个简单的路由
router.get('/' , (ctx) => {
ctx.body = 'Hello users';
})

// 4、导出
module.exports = router;
```

4、改写main.js

```
// 注意啦，Koa是按照顺序执行的，所以需要先定义路由中间件
app.use(userRouter.routes());
// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, api!';
});
```

## 7、优化项目结构

### 7.1 将 http 服务和 app 业务拆分

把app的部分放在src/app/index.js

```
// 进行业务相关的配置
const Koa = require('koa');
// 引入router
const userRouter = require('../router/user.router');

// 创建一个新的Koa应用实例
const app = new Koa();
// 定义路由中间件
// 注意啦，Koa是按照顺序执行的，所以需要先定义路由中间件
app.use(userRouter.routes());
// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, api!';
});

// 导出
module.exports = app;
```

改写main.js

```
// 引入
const app = require('./app/index')

// 导入配置文件
const {APP_PORT} = require('./config/config.default');

// 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
```

### 7.2 将路由和控制器拆分

其实就是把回调函数写到一个文件夹当中

src/controller/userController

```
// 把回调函数部分写在这里面

class UserController {
    async register(ctx){
        ctx.body = 'User registration successful';
    }
}

// 导出UserController,实例的方式
module.exports = new UserController();
```

改写router

```
// 1、引入router
const Router = require('koa-router');
// 2、创建一个router实例
const router = new Router({prefix : '/users'});

// 3、引入用户控制器
const {register} = require('../controller/userController')
// 4、 定义一个简单的路由
router.get('/register' , register)

// 5、导出
module.exports = router;
```

## 8、解析body

1、引入koa-body

```
npm install koa-body
```

2、注册中间件

```
const Koa = require('koa');
const KoaBody = require('koa-body'); // 确保已安装
const userRouter = require('../router/user.router');

const app = new Koa();

// 先注册解析请求体的中间件
app.use(KoaBody());
```

3、解析body

- 获取参数
- 操作数据库，在service层
- 返回结果

```
const {createUser} = require('../service/user.service');
class UserController {
    async register(ctx){
        // 1、获取数据
        const {username, password} = ctx.request.body;
        // 2、操作数据库：service层
        const res = await createUser(username , password);
        console.log(res);
        // 3、返回结果
        ctx.body = ctx.request.body;
    }
}
```

4、service层

```
class UserService {
    async createUser(username , password){
        return 'User created successfully';
    }
}

// 导出
module.exports = new UserService();
```

