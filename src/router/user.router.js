// 1、引入router
const Router = require('koa-router');
// 2、创建一个router实例
const router = new Router({prefix : '/users'});
const { validateUser , verifyUser , cryptPassword , verifyLogin } =   require('../middleware/user.middleware');
// 3、引入用户控制器
const {register , login , changePassword} = require('../controller/userController');
const { auth } = require('../middleware/auth.middlewear');
// 4、 定义一个简单的路由
router.post('/register' ,validateUser,verifyUser, cryptPassword , register)
router.post('/login' ,validateUser , verifyLogin ,  login)
// 判断用户是否登录(token是否有效果)+密码加密
router.patch('/' , auth , cryptPassword , changePassword)
// 5、导出
module.exports = router;