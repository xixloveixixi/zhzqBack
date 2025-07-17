const Koa = require('koa');
const KoaBody = require('koa-body'); // 确保已安装
const userRouter = require('../router/user.router');
const errStatus = require('../app/errStatus'); // 确保路径正确
const app = new Koa();

// 先注册解析请求体的中间件
app.use(KoaBody());

// 再注册路由中间件
app.use(userRouter.routes());

// 最后定义全局中间件（404 处理）
app.use(async (ctx) => {
  if (!ctx.body) {
    ctx.body = 'Hello, api!';
  }
});

// 统一处理错误
app.on('error',errStatus );

module.exports = app;
