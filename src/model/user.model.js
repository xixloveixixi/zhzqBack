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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        comment: '用户角色'
    }
});

// 强制同步数据库
sequelize.sync({ force: true });

// 导出User模型
module.exports = User;