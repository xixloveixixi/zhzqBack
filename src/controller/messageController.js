
const { getAllMessage, addMessage } = require("../service/message.service");
class messageController{
   async getAllMessage(ctx){
    const { page, pageSize } = ctx.request.query;  // 从查询参数获取分页信息
    const messageList = await getAllMessage({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 5
    })
    ctx.body = {
        code: 200,
        message: "消息查询成功",
        data: messageList,
        pagination: {
            currentPage: Number(page) || 1,
            pageSize: Number(pageSize) || 5,
            total: messageList.length  // 实际应用中应查询总条数
        }
    };
}
    async sendMessage(ctx){
      try {
        const { sender, content } = ctx.request.body;
        const message = await addMessage({
            sender,
            content,
        })
        if(message){
            ctx.body = {
                code: 200,
                message: "消息发送成功",
                data: message,
              };
        }else {
            ctx.body = {
                code: 400,
                message: "消息发送失败",
                data: null,
              };
        }
      } catch (error) {
        ctx.body = {
            code: 400,
            message: "消息发送失败",
            data: null,
        }
      }

    }

}

module.exports = new messageController();

