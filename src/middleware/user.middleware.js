// 我们瑶抽离中间件
const bcrypt = require('bcryptjs')
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
  userDoseNotExist,
  userLoginError,
  userInvalidPassword
} = require("../constant/err.types");
const validateUser = async (ctx, next) => {
  // 1、获取数据
  const { username, password } = ctx.request.body;

  // 进行错误判断
  // 合理性：是否为空
  if (!username || !password) {
    console.error("用户名或密码不能为空", ctx.request.body);
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  // 放行下一个中间件
  await next();
};
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await getUserInfo({ username });
    if (user) {
      console.error("用户名已存在", ctx.request.body);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.error('获取用户信息错误！');
    ctx.app.emit("error", userRegisterError, ctx);
    return;//防止向下执行
  }

  await next();
};

const cryptPassword =async (ctx , next) => {
// 导出password
const {password} = ctx.request.body;
// 同步生成言
const salt = bcrypt.genSaltSync(10);
// hash进行加密
const hash = bcrypt.hashSync(password , salt);
// 把密文将明文覆盖掉
ctx.request.body.password = hash;

await next();
}

const verifyLogin = async(ctx , next) => {
  // 1、根据用户名查数据库->service层
  const {username , password } = ctx.request.body;
 try{
   const res = await getUserInfo({username});
  if(!res){
  // 2、不存在->登录不成功
    console.error('用户不存在' , {username});
    ctx.app.emit('error' , userDoseNotExist , ctx);
    return ;
  }
  console.log(res);
   // 3、存在->比对密码是否匹配(不匹配报错)
  if(!bcrypt.compareSync(password , res.password)){
    ctx.app.emit('error' ,userInvalidPassword , ctx );
    return ;
  }
 }catch(error){
  console.error(error);
  ctx.app.emit('error' ,userLoginError  , ctx);
  return ;
 }
  await next();



}
// 导出
module.exports = {
  validateUser,
  verifyUser,
  cryptPassword,
  verifyLogin
};
