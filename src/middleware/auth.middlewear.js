const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenexpirederror, invalidToken , userNoPermission } = require("../constant/err.types");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return ctx.app.emit("error", invalidToken, ctx);
  }
  const token = authorization.split(" ")[1];
  if(!token){
    return ctx.app.emit("error", userNoPermission, ctx);
  }
  // console.log(token);
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
