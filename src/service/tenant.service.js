
// 查看，删除，批量删除，新增
// 账单服务层
const { Op } = require("sequelize");
const Tenant = require("../model/tenant.model");

class TenantService {
  async getTenantList({
    name,
    tel,
    pageSize,
    page,
  }) {
    const whereOpn = {};
    if (name) whereOpn.name = name;
    if (tel) {
      whereOpn.tel = tel;
    }
    if (pageSize) pageSize = pageSize;
    if (page) page = page;

    // 执行查询
    console.log("进入客户查询服务层，参数:", {
      name,
      tel,
      page,
      pageSize
    }); // 添加此行
    try {
      const list = await Tenant.findAndCountAll({
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
        list: list.rows,
        total: list.count,
      };
    } catch (err) {
      console.error("账单查询数据库错误:", error);
      return;
    }
  }
  // 编辑
  async editTenant({
    ID,
    name,
    status,
    tel,
    business,
    email,
    creditCode,
    industryNum,
    legalPerson,
  }) {
    try {
      const result = await Tenant.update({
        name,
        status,
        tel,
        business,
        email,
        creditCode,
        industryNum,
        legalPerson,
      }, {
        where: {
          industryNum,
        },
      });
      return result;
    } catch (error) {
      console.error("编辑客户数据库错误:", error);
      return;
    }
  }

  // 通过accoountNo删除单个菜单
  async deleteTenantByIndustryNum(industryNum) {
    try {
      const result = await Tenant.destroy({
        where: {
          industryNum,
        },
      });
      return result;
    } catch (error) {
      console.error("删除客户数据库错误:", error);
      return;
    }
  }

  // 批量删除客户
  async deleteTenantsByIndustryNums(industryNums) {
    try {
      const result = await Tenant.destroy({
        where: {
          industryNum: {
            [Op.in]: industryNums,
          },
        },
      });
      return result;
    } catch (error) {
      console.error("批量删除账单数据库错误:", error);
      return;
    }
  }
//   新增
async addTenant({
    ID,
    name,
    status,
    tel,
    business,
    email,
    creditCode,
    industryNum,
    legalPerson,
}) {
  try {
    const result = await Tenant.create({
      ID,
    name,
    status,
    tel,
    business,
    email,
    creditCode,
    industryNum,
    legalPerson,
    });
    return result;
  } catch (error) {
    console.error("新增客户数据库错误:", error);
    return;
  }
}




}
module.exports = new TenantService();
