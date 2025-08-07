const Koa = require('koa');
const KoaBody = require('koa-body'); 
const userRouter = require('../router/user.router');
const billRouter = require('../router/bill.router');
const tenantRouter = require('../router/tenant.router');
const buildingRouter = require('../router/building.router');

const errStatus = require('../app/errStatus'); // 确保路径正确
const app = new Koa();
const cors = require('@koa/cors');
// 先注册解析请求体的中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(KoaBody({
  enableTypes: ['json', 'form'],
  // 关键：忽略 OPTIONS 请求的请求体解析
  ignoreMethods: ['OPTIONS']
}));

// 再注册路由中间件
app.use(userRouter.routes());
app.use(billRouter.routes());
app.use(tenantRouter.routes());
app.use(buildingRouter.routes());

// 最后定义全局中间件（404 处理）
app.use(async (ctx) => {
  if (!ctx.body) {
    ctx.body = 'Hello, api!';
  }
});


// 统一处理错误
app.on('error',errStatus );

module.exports = app;
