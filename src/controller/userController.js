const { userRegisterError } = require('../constant/err.types');
const { createUser , getUserInfo , updateUserInfoById } = require('../service/user.service');
const { JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken');
   
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
     async login(ctx){
        const {username} = ctx.request.body;
        try{
            const {password , ...res} =await getUserInfo({username});
               ctx.body = {
            code:0,
            message:'用户登陆成功',
            result:{
                token: jwt.sign(res , JWT_SECRET , {expiresIn : '1d'})
            }
        }
        }catch(error){
            console.error('用户登录失败' , error);
        }
     }
     async changePassword(ctx , next){
        // 获取password
        // 通过id找到用户
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        // 更新数据库
        if(await updateUserInfoById({id , password})){
            ctx.body = {
                code:0,
                message:'密码修改成功',
                result:''
            }
        }else {
            ctx.body = {
                code:'10007',
                message:'密码修改失败',
                result:''
            }
        }
        // 返回结果
     }
}

// 导出UserController,实例的方式
module.exports = new UserController();
