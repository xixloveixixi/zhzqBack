const Koa = require('koa');

// 导入配置文件
const {APP_PORT} = require('./config/config.default');
// 创建一个新的Koa应用实例
const app = new Koa();
// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, api!';
});
// 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});