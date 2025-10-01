const { userRegisterError } = require("../constant/err.types");
const {
  createUser,
  getUserInfo,
  updateUserInfoById,
} = require("../service/user.service");
const { JWT_SECRET } = require("../config/config.default");
const jwt = require("jsonwebtoken");
const menuConfig = require("../config/menu.config");

class UserController {
  async register(ctx) {
    try {
      const { username, password } = ctx.request.body;
      console.log(username , password);
      let role = 'user';
      if (username === 'admin') {
        role = 'admin';
      } else if (username === 'manage') {
        role = 'manage';
      }
      const res = await createUser(username, password);
      ctx.body = {
        code: 200,
        message: "注册成功",
        data: {
          username: res.username,
          id: res.id,
          role: res.role,
        },
      };
    } catch (error) {
      console.error("注册失败:", error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx) {
    const { username } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ username });
      let authBtn = [];
      let createdAt = res.createdAt;
      if (res.username === "admin") {
        authBtn = ["add", "edit", "delete"];
      } else if (res.username === "manage") {
        authBtn = ["add", "edit"];
      } else {
        authBtn = ["view"];
      }
      // 生成token
      const token = jwt.sign(res, JWT_SECRET, { expiresIn: "1d" });
      // 设置cookie
      ctx.cookies.set('token', token, {
         httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      secure: false,
      sameSite: 'none'
      });
      ctx.body = {
        code: 200,
        message: "用户登陆成功",
        result: {
          token: token,
          username: res.username,
          authBtn: authBtn,
          createdAt : createdAt
        },
      };
    } catch (error) {
      console.error("用户登录失败", error);
    }
  }
  async changePassword(ctx, next) {
    // 获取password
    // 通过id找到用户
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // 更新数据库
    if (await updateUserInfoById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "密码修改成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "密码修改失败",
        result: "",
      };
    }
    // 返回结果
  }
  // 获取角色对应的菜单实例
  async getMenu(ctx) {
    const { role } = ctx.state.user;
    const menuList = menuConfig[role];
    // console.log(ctx.state.user);
    try {
      ctx.body = {
        code: 200,
        message: "获取菜单成功",
        result: menuList,
      };
    } catch (error) {
      ctx.body = {
        code: 10008,
        message: "获取菜单失败",
        result: "",
      };
    }
  }
}

// 导出UserController,实例的方式
module.exports = new UserController();
