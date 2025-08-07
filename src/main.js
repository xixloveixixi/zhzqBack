// 引入
const app = require('./app/index');
// 导入配置文件
const { APP_PORT } = require('./config/config.default');
// 导入模型和数据库实例
const { sequelize } = require('./model/index');

// 同步模型到数据库
async function syncModels() {
    try {
        // 同步所有模型
        await sequelize.sync({
            alter: true // 修改表结构而不删除数据
            // force: true // 删除现有表并重新创建（谨慎使用）
        });
        console.log('模型同步成功');
    } catch (error) {
        console.error('模型同步失败:', error);
    }
}

// 先同步模型，再启动服务器
async function startServer() {
    await syncModels();
    // 启动服务器，监听3000端口
    app.listen(APP_PORT, () => {
        console.log(`Server is running on http://localhost:${APP_PORT}`);
    });
}

// 启动应用
startServer();