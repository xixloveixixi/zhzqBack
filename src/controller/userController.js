const { userRegisterError } = require('../constant/err.types');
const { createUser , getUserInfo } = require('../service/user.service');

class UserController {
    async register(ctx) {
    try {
        const { username, password } = ctx.request.body;
        const res = await createUser(username, password);
        ctx.body = {
            code: 200,
            message: '注册成功',
            data: {
                username : res.username,
                id: res.id,
            }
        };
    } catch (error) {
        console.error('注册失败:', error);
        ctx.app.emit('error', userRegisterError, ctx);
    }
}
}

// 导出UserController,实例的方式
module.exports = new UserController();
