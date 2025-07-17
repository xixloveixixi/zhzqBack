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

## 9、service端连接数据库

使用sequelize工具

[入门 | Sequelize中文文档 | Sequelize中文网](https://www.sequelize.cn/core-concepts/getting-started)

```
npm install --save sequelize
```

```
npm install --save mysql2
```

db/seq.js

```
// 连接数据库
const Sequelize = require('sequelize');


// 分别传递参数 (其它数据库)

const sequelize = new Sequelize('yqgl', 'root', '123456', {
  host: 'localhost',
  dialect:'mysql'
});

// 测试连接
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

```

## 10、model的创建

1. **引入依赖**：首先，从 `sequelize` 库中解构出 `DataTypes`（用于定义字段类型），并引入已经配置好的 `sequelize` 实例（通常连接到你的数据库）。
2. **定义模型结构**：使用 `sequelize.define('User', {...})` 方法定义了一个名为 `User` 的模型。
   - `'User'` 是模型的名字。
   - 传入的第二个参数是一个对象，描述了模型包含哪些字段（列）以及每个字段的属性：
     - `username`: 定义了一个字符串类型的字段，不允许为空 (`allowNull: false`)，并且值必须唯一 (`unique: true`)。
     - `password`: 定义了一个字符串类型的字段，不允许为空。
     - `is_admin`: 定义了一个布尔类型的字段，不允许为空，默认值为 `false`。
   - `comment` 是可选的，用于给数据库中的字段添加注释。
3. **同步数据库（注释掉）**：`sequelize.sync({ force: true })` 这行代码被注释掉了。如果取消注释并执行，它会尝试根据定义的 `User` 模型在数据库中创建一个名为 `users` 的表（如果不存在）。`force: true` 参数表示如果表已存在，则先删除再重新创建（这通常只用于开发环境）。
4. **导出模型**：最后，使用 `module.exports = User;` 将定义好的 `User` 模型导出，以便其他模块（如服务层、控制器层）可以导入并使用它来与数据库交互（例如，创建、查询、更新、删除用户记录）。

```
// 创建user的model
const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为管理员'
    }
});

// 强制同步数据库
// sequelize.sync({ force: true });

// 导出User模型
module.exports = User;
```

### 10.1 新建一个用户

完成register函数

判断合法性->判断合理性->操作数据库->返回结果

```
const { createUser , getUserInfo } = require('../service/user.service');

class UserController {
    async register(ctx) {
        // 1、获取数据
        const { username, password } = ctx.request.body;

        // 进行错误判断
        // 合理性：是否为空
        if(!username || !password){
            ctx.body = {
                code:400 ,// 错误码
                message: '用户名或密码不能为空',
                result: ''
            }
            return;
        }
        // 合法性：不能重复
        if(getUserInfo( { username})){
            // 如果存在
            ctx.body = {
                code: 409,// 产生冲突
                message: '用户名已存在',
                result: ''
            }
            return ;
        }


        // 2、操作数据库：service层
        const res = await createUser(username, password);

        // 3、返回结果
        ctx.body = {
            code: 200,
            message: '注册成功',
            data: {
                username : res.dataValues.username,
                id: res.dataValues.id,
            }
        };
        return ctx.body;
    }
}

// 导出UserController,实例的方式
module.exports = new UserController();

```

其中判断合法性用户不能重复->需要操作数据库所以要在数据库层写一个获取用户信息的方法

```
 async getUserInfo({id , username , password , is_admin}) {
        const whereOpn = {} ; // 根据传入的参数进行查询
        id && whereOpn.assign({id});
        username && whereOpn.assign({username});
        password && whereOpn.assign({password});
        is_admin && whereOpn.assign({is_admin});

        // 进行查询
        const res = await User.findOne({
            attributes: ['id', 'username', 'is_admin'],
            where: whereOpn
        });

        return res ? res.dataValues : null;

    }
```

### 10.2 抽离中间件

把合理性和合法性的中间件抽离出来

middleWare/user.middleware.js

```
// 我们瑶抽离中间件
const { getUserInfo } = require('../service/user.service');
const validateUser =   async(ctx , next) => {
     // 1、获取数据
        const { username, password } = ctx.request.body;

        // 进行错误判断
        // 合理性：是否为空
        if(!username || !password){
            ctx.body = {
                code:400 ,// 错误码
                message: '用户名或密码不能为空',
                result: ''
            }
            return;
        }
        // 放行下一个中间件
        await next();

}
const verifyUser = async(ctx , next) => {
      const { username, password } = ctx.request.body;

        if(getUserInfo( { username})){
            // 如果存在
            ctx.body = {
                code: 409,// 产生冲突
                message: '用户名已存在',
                result: ''
            }
            return ;
        }

        await next();

}

// 导出
module.exports = {
    validateUser,
    verifyUser
};
```

使用register函数之前使用

```
// 4、 定义一个简单的路由
router.post('/register' ,validateUser,verifyUser, register)
```

### 10.3 拆分中间件--错误处理

我们将错误处理拆解为一个中间件，进行统一错误处理

首先对每一个需要错误处理的地方进行修改：

```
  ctx.app.emit('error',userFormatError , ctx);
```

```
            ctx.app.emit('error', userAlreadyExisted, ctx);
```

发出错误指令

错误处理：

consitant/err.type.js

```
module.exports =  {
   userFormatError: {
         code: '10001',
         message: '用户名或密码不能为空',
         result :''
   },
    userAlreadyExisted: {
            code: '10002',
            message: '用户名已存在',
            result: ''
    },
}
```

错误代码：

```
module.exports = (err , ctx) => {
    let status = 500; // 默认状态码
    switch (err.code){
        case '10001':
            status = 400; // 错误请求
            break;
        case '10002':
            status = 409; // 冲突
            break;
        default:
            status = 500; // 内部服务器错误
    }
    ctx.status = status;
    ctx.body = err;

}


```

在使用service层的时候一定要记住try...catch

eg :verifyUser中使用getUserInfo

```
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await getUserInfo({ username });
    if (user) {
      console.error("用户名已存在", ctx.request.body);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.error('获取用户信息错误！');
    ctx.app.emit("error", userRegisterError, ctx);
    return;//防止向下执行
  }

  await next();
};
```

## 11、密码加密

bcrypt,js

安装

```
 npm install bcryptjs
```

加密的代码：

```
const cryptPassword =async (ctx , next) => {
// 导出password
const {password} = ctx.request.body;
// 同步生成言
const salt = bcrypt.genSaltSync(10);
// hash进行加密
const hash = bcrypt.hashSync(password , salt);
// 把密文将明文覆盖掉
ctx.request.body.password = hash;

await next();
}
```

记得使用：

```
// 4、 定义一个简单的路由
router.post('/register' ,validateUser,verifyUser, cryptPassword , register)

```

