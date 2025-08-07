// 编辑和删除
// 账单服务层
const { Op } = require("sequelize");
const Building = require("../model/building.model");

class BuildingService {
  async getBuildingList({
    name,
    person,
    page,
    pageSize
  }) {
    const whereOpn = {};
    if (name) whereOpn.name = name;
    if (person) whereOpn.person = person;
    // 移除 page 和 pageSize 作为查询条件
    // 执行查询
    console.log("进入楼宇查询服务层，参数:", {
    name,
    person,
    page,
    pageSize
    });
    try {
      const buildingList = await Building.findAndCountAll({
        where: whereOpn,
        raw:true,
        limit: parseInt(pageSize, 10) || 10,
        offset:
          parseInt(page, 10) > 0
            ? (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
            : 0,
        order: [["createdAt", "DESC"]],
      });

      return {
        list: buildingList.rows,
        total: buildingList.count,
      };
    } catch (err) {
      console.error("楼宇查询数据库错误:", err);
      return;
    }
  }

  // 通过accoountNo删除单个菜单
  async deleteBuildingByName(name) {
    try {
      const result = await Building.destroy({
        where: {
          name,
        },
      });
      return result;
    } catch (error) {
      console.error("删除楼栋数据库错误:", error);
      return;
    }
  }

//   编辑
  async updateBuilding({
    key,
    name,
    person,
    tel,
    status,
    vacancyRate,
    propertyFee,
  }){
    try {
      const result = await Building.update({
        key,
        name,
        person,
        tel,
        status,
        vacancyRate,
        propertyFee,
      },{
        where:{
          name,
        }
      })
      return result;
    } catch (error) {
      console.error("编辑楼栋数据库错误:", error);
      return;
    }
  }    



 

}
module.exports = new BuildingService();
