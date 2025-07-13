// 创建user的model
const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为管理员'
    }
});

// 强制同步数据库
// sequelize.sync({ force: true });

// 导出User模型
module.exports = User;