
const { addMessage, getAllMessage } = require("./message.service");
// 存储在线用户
const onlineUsers = new Map();

class SocketService {
  handleConnection(socket) {
    console.log(socket.handshake.query)
    // 存储用户
    onlineUsers.set(socket.id, {
      id: socket.id,
    });
  }
  // 用户断开连接
  handleDisconnect(socket) {
    console.log("用户断开连接:", socket.id);
    // 移除用户
    onlineUsers.delete(socket.id);
  }
  // 处理消息
  async handleMessage(socket, message) {
    const { sender, content } = message;
    const savedMessage = await addMessage({
      sender,
      content,
    });
    return savedMessage;
  }
  // 获取历史消息
  async getHistory(page , pageSize , createdAt) {
    try {
      // 使用消息服务获取分页消息
      const history = (await getAllMessage(page , pageSize , createdAt)).list;
      return history;
    } catch (error) {
      console.error("获取历史消息失败:", error);
      throw error;
    }
  }
  getOnlineUserCount() {
    return onlineUsers.size;
  }
}
module.exports = new SocketService();
