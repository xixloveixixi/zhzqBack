
// 查找、编辑和删除
// 创建账单控制器

const { buildingGetError, buildingDeleteError } = require("../constant/err.types");
const { getBuildingList, deleteBuildingByName, updateBuilding } = require("../service/building.service");



class BuildingController {
  // 获取账单list
  async getBuilding(ctx) {
    try {
      const { name, person, pageSize, page } = ctx.request.body;
      const buildingList = await getBuildingList({
        name,
        person,
        pageSize,
        page,
      });
      // 返回结果
      ctx.body = {
        code: 200,
        message: "楼宇查询成功",
        data: buildingList,
      };
    } catch (err) {
      console.error("楼宇查询失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", buildingGetError, ctx);
      return;
    }
  }

  // 删除账单
  async deleteBuilding(ctx) {
    try {
      const { name } = ctx.request.body;
      console.log("删除楼宇，name:", name);

      // 1. 执行删除操作
      const deleteResult = await deleteBuildingByName(name);

      if (!deleteResult) {
        ctx.body = {
          code: 404,
          message: "未找到对应楼宇",
          data: null,
        };
        return;
      }

      // 2. 删除成功后，获取最新账单列表（使用与getBill相同的查询参数）
      const {  person, pageSize, page } = ctx.request.query; // 或从body获取
      const latestBuildingList = await getBuildingList({
        name,
        person,
        pageSize,
        page,
      });

      // 3. 返回删除结果和最新列表
      ctx.body = {
        code: 200,
        message: "楼宇删除成功",
        data: latestBuildingList
      };
    } catch (err) {
      console.error("楼宇删除失败详细信息:", err); // 添加完整错误对象打印
      ctx.app.emit("error", buildingDeleteError, ctx);
      return;
    }
  }
    async updateBuiding(ctx){
        const { name, person, tel, status, vacancyRate, propertyFee } = ctx.request.body;
        console.log("更新楼宇，参数:", {
            name,
            person,
            tel,
            status,
            vacancyRate,
            propertyFee,
        });
        const updateResult = await updateBuilding({
            name,
            person,
            tel,
            status,
            vacancyRate,
            propertyFee,
        });
        console.log("更新楼宇，结果:", updateResult);
        if(updateResult){
            ctx.body = {
                code: 200,
                message: "楼宇更新成功",
                data: updateResult,
            };
        }else{
            ctx.body = {
                code: 404,
                message: "未找到对应楼宇",
                data: null,
            };
        }

    }
  
}
module.exports = new BuildingController();
