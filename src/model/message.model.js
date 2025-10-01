const sequelize = require("../db/seq");
const { DataTypes } = require("sequelize");

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键",
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "消息内容",
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "发送者",
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: "创建时间",
  },
  updateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: "更新时间",
  },
}, {
  timestamps: false  // 配置选项正确
});
module.exports = Message;
