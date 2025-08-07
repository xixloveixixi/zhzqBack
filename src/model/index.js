// 引入数据库实例
const sequelize = require('../db/seq');

// 导入所有模型
const Bill = require('./bill.model');
const Tenant = require('./tenant.model');
const User = require('./user.model');
const Building = require('./building.model')
// 定义模型之间的关系（如果有）
// 例如：Tenant.hasMany(Bill);

// 导出所有模型
module.exports = {
    sequelize,
    Bill,
    Tenant,
    User,
    Building

};