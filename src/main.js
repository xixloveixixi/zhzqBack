const Koa = require('koa');

// 导入配置文件
const {APP_PORT} = require('./config/config.default');
// 引入router
const userRouter = require('./router/user.router');

// 创建一个新的Koa应用实例
const app = new Koa();
// 定义路由中间件
// 注意啦，Koa是按照顺序执行的，所以需要先定义路由中间件
app.use(userRouter.routes());
// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, api!';
});
// 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});