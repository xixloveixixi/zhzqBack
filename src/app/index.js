const Koa = require('koa');
const KoaBody = require('koa-body'); // 确保已安装
const userRouter = require('../router/user.router');

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

module.exports = app;
