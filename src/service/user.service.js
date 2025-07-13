const User = require('../model/user.model');

class UserService {
  async createUser(username, password) {
    const res = await User.create({
      username,
      password
    });
    return res;
  }

//   获取用户信息
    async getUserInfo({id , username , password , is_admin}) {
        const whereOpn = {} ; // 根据传入的参数进行查询
        id && whereOpn.assign({id});
        username && whereOpn.assign({username});
        password && whereOpn.assign({password});
        is_admin && whereOpn.assign({is_admin});

        // 进行查询
        const res = await User.findOne({
            attributes: ['id', 'username', 'is_admin'],
            where: whereOpn
        });

        return res ? res.dataValues : null;

    }
}

// 导出
module.exports = new UserService();
