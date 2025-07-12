// 引入
const app = require('./app/index')

// 导入配置文件
const {APP_PORT} = require('./config/config.default');

// 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});