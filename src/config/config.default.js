// 1、导入doteenv
const dotenv = require('dotenv');
// 2、启动dotenv
dotenv.config();

// 3、导出配置对象

module.exports = process.env;