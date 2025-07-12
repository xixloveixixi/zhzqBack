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