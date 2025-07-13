const { createUser , getUserInfo } = require('../service/user.service');

class UserController {
    async register(ctx) {
        // 1、获取数据
        const { username, password } = ctx.request.body;

        // 进行错误判断
        // 合理性：是否为空
        if(!username || !password){
            ctx.body = {
                code:400 ,// 错误码
                message: '用户名或密码不能为空',
                result: ''
            }
            return;
        }
        // 合法性：不能重复
        if(getUserInfo( { username})){
            // 如果存在
            ctx.body = {
                code: 409,// 产生冲突
                message: '用户名已存在',
                result: ''
            }
            return ;
        }


        // 2、操作数据库：service层
        const res = await createUser(username, password);

        // 3、返回结果
        ctx.body = {
            code: 200,
            message: '注册成功',
            data: {
                username : res.dataValues.username,
                id: res.dataValues.id,
            }
        };
        return ctx.body;
    }
}

// 导出UserController,实例的方式
module.exports = new UserController();
