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