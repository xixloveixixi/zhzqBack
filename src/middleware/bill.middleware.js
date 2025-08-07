const { billFormatError } = require("../constant/err.types");

async function bill(ctx, next) {
  // 中间件逻辑
  const { status } = ctx.request.body;
  if (status && !['0', '1', '2'].includes(status)) {
    return ctx.app.emit('error', billFormatError, ctx);
  }
  await next(); // 必须调用 next()
}

// 关键修复：使用命名导出
module.exports = { bill };