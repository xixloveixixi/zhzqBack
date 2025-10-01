const { Require, User } = require("../model/index");
const { Op } = require('sequelize');
class RequireService {
  async getRequireList(username) {
    // 先去数据库当中找到username的role
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("用户不存在");
    }

    let requireList;
    // 如果role为admin或者是manage就全部返回，如果不是就查找到创建人是creator的
    if (user.role === "admin" || user.role === "manage") {
      requireList = await Require.findAndCountAll({
        raw: true
      });
    } else {
      requireList = await Require.findAndCountAll({
        raw: true,
        where: {
          creator: username,
          process: { [Op.ne]: 'completed' }
        },
      });
    }


    return {
      list: requireList.rows,
      total: requireList.count,
    };
  }

  async getRequireManage(requireNo, creator, page , pageSize ) {
   const where = {
        // 添加状态不为completed的条件
        process: { [Op.ne]: 'completed' }
    };
    if (requireNo) {
      where.requireNo = requireNo;
    }
    if (creator) {
      where.creator = creator;
    }
    if(page){
      page = page;
    }
    if(pageSize){
      pageSize = pageSize;
    }

    const requireManage = await Require.findAndCountAll({
      raw: true,
      where: where,
      limit: parseInt(pageSize, 10) || 10,
      offset:
        parseInt(page, 10) > 0
          ? (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
          : 0,
    });
    if (!requireManage) {
      throw new Error("需求不存在");
    }

    return {
      list: requireManage.rows,
      total: requireManage.count,
    };
  }

//   删除
async deleteRequire(requireNo){
    try {
      const result = await Require.destroy({
        where: {
          requireNo,
        },
      });
      return result;
    } catch (error) {
      console.error("删除需求数据库错误:", error);
      return;
    }
}

//  更新
async updateRequire(requireNo, description, phone, address) {

  try {
    const result = await Require.update({description, phone, address}, {
      where: {
        requireNo,
      },
    });
    return result;
  } catch (error) {
    console.error("更新需求数据库错误:", error);
    return;
  }
}

// 添加
async addRequire( tag , title ,description, phone, address, creator , createTime , requireNo) {
  try {
    const result = await Require.create({
      description,
      phone,
      address,
      creator,
      createTime,
      requireNo,
      tag,
      title,


    });
    return result;
  } catch (error) {
    console.error("添加需求数据库错误:", error);
    return;
  }
}


}

module.exports = new RequireService();
