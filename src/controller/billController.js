// 创建账单控制器

const { billGetError, billDeleteError } = require("../constant/err.types");
const {
  getBillList,
  deleteBillByAccountNo,
  deleteBillsByAccountNos,
} = require("../service/bill.service");

class BillController {
  // 获取账单list
  async getBill(ctx) {
    try {
      const { accountNo, roomNo, status, pageSize, page } = ctx.request.body;
      const billList = await getBillList({
        accountNo,
        roomNo,
        status,
        pageSize,
        page,
      });
      // 返回结果
      ctx.body = {
        code: 200,
        message: "账单查询成功",
        data: billList,
      };
    } catch (err) {
      console.error("账单查询失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", billGetError, ctx);
      return;
    }
  }

  // 删除账单
  async deleteBill(ctx) {
    try {
      const { accountNo } = ctx.request.body;
      console.log("删除单个账单，accountNo:", accountNo);

      // 1. 执行删除操作
      const deleteResult = await deleteBillByAccountNo(accountNo);

      if (!deleteResult) {
        ctx.body = {
          code: 404,
          message: "未找到对应账单",
          data: null,
        };
        return;
      }

      // 2. 删除成功后，获取最新账单列表（使用与getBill相同的查询参数）
      const { roomNo, status, pageSize, page } = ctx.request.query; // 或从body获取
      const latestBillList = await getBillList({
        roomNo,
        status,
        pageSize,
        page,
      });

      // 3. 返回删除结果和最新列表
      ctx.body = {
        code: 200,
        message: "账单删除成功",
        data: latestBillList
      };
    } catch (err) {
      console.error("账单删除失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", billDeleteError, ctx);
      return;
    }
  }

  // 批量删除
  async deleteBills(ctx) {
    try {
      const accountNos = ctx.request.body;
      const result = await deleteBillsByAccountNos(accountNos);
      if (result) {
        // 2. 删除成功后，获取最新账单列表（使用与getBill相同的查询参数）
        const { roomNo, status, pageSize, page } = ctx.request.query; // 或从body获取
        const latestBillList = await getBillList({
          roomNo,
          status,
          pageSize,
          page,
        });

        // 3. 返回删除结果和最新列表
        ctx.body = {
          code: 200,
          message: "账单删除成功",
          data: {
            deleted: true,
            billList: latestBillList,
          },
        };
      }
    } catch (err) {
      console.error("账单批量删除失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", billDeleteError, ctx);
      return;
    }
  }
}
module.exports = new BillController();
