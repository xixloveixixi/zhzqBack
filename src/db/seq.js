// 连接数据库
const Sequelize = require('sequelize');


// 分别传递参数 (其它数据库)

const sequelize = new Sequelize('yqgl', 'root', '123456', {
  host: 'localhost',
  dialect:'mysql'
});

// 测试连接
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// 导出
module.exports = sequelize;