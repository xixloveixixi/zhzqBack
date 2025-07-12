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