const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');
// 创建账单模型
const Bill = sequelize.define('Bill' , {
     accountNo: {
    type: DataTypes.STRING(6),
    allowNull: false,
    comment: '账单编号'
  },
  status: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: '账单状态:0-全部, 1-未支付, 2-已支付'
  },
  roomNo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '房间号'
  },
  carNo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '车牌号'
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '联系电话'
  },
  costName1: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '费用1'
  },
  costName2: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '费用2'
  },
  costName3: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '费用3'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '开始日期'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '结束日期'
  },
  preferential: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    comment: '优惠金额'
  },
  money: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '总金额'
  },
  pay: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '支付方式'
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '公司名称'
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '联系人'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '联系电话'
  }
} , {
    tableName: 'bill',
    timestamps: true,
    paranoid: true
})

module.exports = Bill;