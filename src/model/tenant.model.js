// 引入 sequelize 实例
const sequelize = require('../db/seq');
const { Sequelize } = require("sequelize");

const Tenant = sequelize.define("Tenant", {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '客户名称'
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '经营状态 1-营业中 2-暂停营业 3-已关闭'
    },
    tel: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '联系电话'
    },
    business: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '所属行业'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '所属邮箱'
    },
    creditCode: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '统一信用代码'
    },
    industryNum: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '工商注册号'
    },
    legalPerson: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '法人名'
    }
},{
    tableName: 'tenant',
    timestamps: true,
    paranoid: true,
});

// 导出模型
module.exports = Tenant;