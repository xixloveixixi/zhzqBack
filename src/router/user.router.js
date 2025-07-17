// 1、引入router
const Router = require('koa-router');
// 2、创建一个router实例
const router = new Router({prefix : '/users'});
const { validateUser , verifyUser , cryptPassword } =   require('../middleware/user.middleware');
// 3、引入用户控制器
const {register} = require('../controller/userController')
// 4、 定义一个简单的路由
router.post('/register' ,validateUser,verifyUser, cryptPassword , register)

// 5、导出
module.exports = router;