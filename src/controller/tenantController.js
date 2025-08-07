// 创建账单控制器

const {
  billGetError,
  billDeleteError,
  tenantGetError,
} = require("../constant/err.types");
const {
  getTenantList,
  deleteTenantByIndustryNum,
  deleteTenantsByIndustryNums,
  addTenant,
  editTenant
} = require("../service/tenant.service");

class TenantController {
  // 获取账单list
  async getTenant(ctx) {
    try {
      const { name, tel, pageSize, page } = ctx.request.body;
      const tenantList = await getTenantList({
        name,
        tel,
        pageSize,
        page,
      });
      // 返回结果
      ctx.body = {
        code: 200,
        message: "租户查询成功",
        data: tenantList,
      };
    } catch (err) {
      console.error("租户查询失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", tenantGetError, ctx);
      return;
    }
  }
  async editTenant(ctx){
    try {
      const {   ID,
        name,
        status,
        tel,
        business,
        email,
        creditCode,
        industryNum,
        legalPerson, } = ctx.request.body;
        const editResult = await editTenant({
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
        if(editResult){
          ctx.body = {
            code: 200,
            message: "租户编辑成功",
            data: editResult,
          };
        }
    } catch (err) {
      console.error("租户编辑失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", tenantEditError, ctx);
      return;
    }
  }

  // 删除账单
  async deleteTenant(ctx) {
    try {
      const { industryNum } = ctx.request.body;
      console.log("删除单个租户，industryNum:", industryNum);

      // 1. 执行删除操作
      const deleteResult = await deleteTenantByIndustryNum(industryNum);

      if (!deleteResult) {
        ctx.body = {
          code: 404,
          message: "未找到对应账单",
          data: null,
        };
        return;
      }

      // 2. 删除成功后，获取最新账单列表（使用与getBill相同的查询参数）
      const { name, tel, pageSize, page } = ctx.request.query; // 或从body获取
      const latestTenantList = await getTenantList({
        name,
        tel,
        pageSize,
        page,
      });

      // 3. 返回删除结果和最新列表
      ctx.body = {
        code: 200,
        message: "账单删除成功",
        data: latestTenantList,
      };
    } catch (err) {
      console.error("账单删除失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", tenantDeleteError, ctx);
      return;
    }
  }

  // 批量删除
  async deleteTenants(ctx) {
    try {
      const industryNums = ctx.request.body;
      const result = await deleteTenantsByIndustryNums(industryNums);
      if (result) {
        // 2. 删除成功后，获取最新账单列表（使用与getBill相同的查询参数）
        const { name, tel, pageSize, page } = ctx.request.query; // 或从body获取
        const latestTenantList = await getTenantList({
          name,
          tel,
          pageSize,
          page,
        });

        // 3. 返回删除结果和最新列表
        ctx.body = {
          code: 200,
          message: "租户删除成功",
          data: {
            deleted: true,
            tenantList: latestTenantList,
          },
        };
      }
    } catch (err) {
      console.error("租户批量删除失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", tenantDeleteError, ctx);
      return;
    }
  }
  // 添加租户
  async addTenant(ctx) {
    try {
      const {
        ID,
        name,
        status,
        tel,
        business,
        email,
        creditCode,
        industryNum,
        legalPerson,
      } = ctx.request.body;
      const result = await addTenant({
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
      if (result) {
        ctx.body = {
          code: 200,
          message: "租户添加成功",
          data: {
            added: true,
          },
        };
      }
    } catch (err) {
      console.error("租户添加失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", tenantAddError, ctx);
      return;
    }
  }
}
module.exports = new TenantController();
