// 账单服务层
const { Op } = require("sequelize");
const Bill = require("../model/bill.model");

class BillService {
  async getBillList({
    accountNo,
    roomNo,
    status,
    pageSize,
    page,
  }) {
    const whereOpn = {};
    if (roomNo) whereOpn.roomNo = roomNo;
    if (status && ["1","2" ].includes(status)) {
      whereOpn.status = status;
    }
    if (accountNo) whereOpn.accountNo = accountNo;

    if (pageSize) pageSize = pageSize;
    if (page) page = page;

    // 执行查询
    console.log("进入账单查询服务层，参数:", {
      accountNo,
      roomNo,
      status,
      page,
      pageSize
    }); // 添加此行
    try {
      const billList = await Bill.findAndCountAll({
        where: whereOpn,
        raw:true,
        limit: parseInt(pageSize, 10) || 10,
        offset:
          parseInt(page, 10) > 0
            ? (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
            : 0,
        order: [["createdAt", "DESC"]],
      });
      // console.log(billList.rows);

      return {
        list: billList.rows,
        total: billList.count,
      };
    } catch (err) {
      console.error("账单查询数据库错误:", error);
      return;
    }
  }

  // 通过accoountNo删除单个菜单
  async deleteBillByAccountNo(accountNo) {
    try {
      const result = await Bill.destroy({
        where: {
          accountNo,
        },
      });
      return result;
    } catch (error) {
      console.error("删除账单数据库错误:", error);
      return;
    }
  }

  // 批量删除账单
  async deleteBillsByAccountNos(accountNos) {
    try {
      const result = await Bill.destroy({
        where: {
          accountNo: {
            [Op.in]: accountNos,
          },
        },
      });
      return result;
    } catch (error) {
      console.error("批量删除账单数据库错误:", error);
      return;
    }
  }


}
module.exports = new BillService();
