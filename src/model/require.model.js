const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const Require = sequelize.define('Require', {
  // 维修单号 (自动生成)
  requireNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '维修单号'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标题'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '故障描述'
  },
  creator: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '报修人'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '报修人电话'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '报修地址'
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标签'
  },
  process: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    comment: '处理状态: pending-待处理, processing-处理中, completed-已完成, cancelled-已取消'
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: '报修时间'
  }
},{
   timestamps: true, // 保留时间戳功能
  createdAt: 'createTime', // 将默认的 createdAt 字段映射到您的 createTime 字段
  updatedAt: 'updateTime', // （可选）如果您也需要更新时间，可以定义一个 updateTime 字段并映射到这里
});

module.exports = Require;

