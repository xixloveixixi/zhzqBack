const User = require("../model/user.model");

class UserService {
  async createUser(username, password) {
    const res = await User.create({
      username,
      password,
    });
    return res.dataValues;
  }

  //   获取用户信息
  async getUserInfo({ id, username, password, is_admin }) {
    const whereOpn = {}; // 根据传入的参数进行查询
    if (id) whereOpn.id = id;
    if (username) whereOpn.username = username;
    if (password) whereOpn.password = password;
    if (is_admin) whereOpn.is_admin = is_admin;

    // 进行查询
    const res = await User.findOne({
      attributes: ["id", "username", "is_admin", "password"],
      where: whereOpn,
    });

    return res ? res.dataValues : null;
  }

  // 根据id更新userInfo
  async updateUserInfoById({id, username, password, is_admin}){
    const whereOpn = {id};
    const newUser = {};
    if (username) newUser.username = username;
    if (password) newUser.password = password;
    if (is_admin) newUser.is_admin = is_admin;

    const res = await User.update( newUser, {where : whereOpn})
    console.log(newUser);
    return res[0] > 0 ? true : false;


  }

}

// 导出
module.exports = new UserService();
