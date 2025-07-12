// 把回调函数部分写在这里面

class UserController {
    async register(ctx){
        ctx.body = 'User registration successful';
    }
}

// 导出UserController,实例的方式
module.exports = new UserController();