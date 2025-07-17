// 我们瑶抽离中间件
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
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

// 导出
module.exports = {
  validateUser,
  verifyUser,
};
