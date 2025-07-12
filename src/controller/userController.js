// 把回调函数部分写在这里面
const {createUser} = require('../service/user.service');
class UserController {
    async register(ctx){
        // 1、获取数据
        const {username, password} = ctx.request.body;
        // 2、操作数据库：service层
        const res = await createUser(username , password);
        console.log(res);
        // 3、返回结果
        ctx.body = ctx.request.body;
    }
}

// 导出UserController,实例的方式
module.exports = new UserController();