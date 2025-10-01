const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenexpirederror, invalidToken , userNoPermission } = require("../constant/err.types");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   return ctx.app.emit("error", invalidToken, ctx);
  // }
   let token = ctx.cookies.get('token');
   // 如果cookie中没有token，尝试从Authorization头中获取
  if (!token) {
    const { authorization } = ctx.request.header;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.split(" ")[1];
    }
  }
  
  if (!token) {
    // 确保用户在没有权限时不会返回404
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: '未授权访问',
      result: ''
    };
    return;
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // console.log(user);
    ctx.state.user = user;
  } catch (error) {
    // 失败的情况
    // token过期
    // token错误：invalid......
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token已过期", error);
        return ctx.app.emit("error", tokenexpirederror, ctx);
      case "JsonwebTokenError":
        console.error("无效的token", error);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }
  await next();
};

module.exports = {
  auth,
};
