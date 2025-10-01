// 引入
const cors = require("@koa/cors");
const app = require("./app/index");
// 导入配置文件
const { APP_PORT } = require("./config/config.default");
// 导入模型和数据库实例
const { sequelize } = require("./model/index");
const http = require("http");
const server = http.createServer(app.callback());
// 引入服务
const socketService = require("./service/socket.service");

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
});

// 同步模型到数据库
async function syncModels() {
  try {
    // // 同步所有模型
    // await sequelize.sync({
    //     alter: true // 修改表结构而不删除数据
    //     // force: true // 删除现有表并重新创建（谨慎使用）
    // });
    // console.log('模型同步成功');
  } catch (error) {
    console.error("模型同步失败:", error);
  }
}


// 处理socket连接
function handleSocketConnection(){
    io.on('connection',(socket)=>{
        // 调用服务处理连接
        socketService.handleConnection(socket);

        // 监听客户端发送的消息
        socket.on('sendMessage' , async (message) => {
            try {
                // 调用服务处理消息
              const savedMessage = await socketService.handleMessage(socket, message);
                // 广播消息给所有客户端
                io.emit('receiveMessage', savedMessage);
            } catch (error) {
                console.error('处理消息失败:', error);
                // 向发送者发送错误消息
                socket.emit('messageError', { error: '消息发送失败' });
            }
        })

        // 监听客户端请求历史消息
        socket.on('getHistory', async (page , pageSize) => {
            try {
                const history = await socketService.getHistory(page , pageSize);
                socket.emit('historyMessages', history);
            } catch (error) {
                console.error('获取历史消息失败:', error);
                socket.emit('historyError', { error: '获取历史消息失败' });
            }
        })

        // 监听客户端断开连接
        socket.on('disconnect', () => {
            // 调用服务处理断开连接
           socketService.handleDisconnect(socket);
        })
        
    })
}

// 先同步模型，再启动服务器
async function startServer() {
  await syncModels();
  // 启动服务器，监听APP_PORT端口
  // 注意：这里使用server.listen而不是app.listen
  server.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
  });
  // 处理socket连接
  handleSocketConnection();
}
// 启动应用
startServer();
