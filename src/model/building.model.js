const sequelize = require("../db/seq");
const { DataTypes } = require("sequelize");

const Building = sequelize.define("building", {
     key:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "楼栋key",
     },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "楼栋名称",
    },
    person:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系人",
    },
    tel:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系电话",
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "楼栋状态 建设中、使用中、已竣工",
    },
    vacancyRate:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: " vacancyRate",
    },
    propertyFee:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: " propertyFee",
    }

});
module.exports = Building;