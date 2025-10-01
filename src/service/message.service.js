
// 导入 Message 模型和 Sequelize 的 Op 操作符
const Message = require("../model/message.model");
const { Op } = require('sequelize'); // 导入 Op 操作符用于条件查询

class messageService{
 async getAllMessage(params){

    // 从参数中解构，只使用提供的参数
    const {
        page,
        pageSize,
        createdAt // 用户创建时间
    } = params;
    
    // 确保分页参数是数字类型
    const pageNum = Number(page) || 1;
    const sizeNum = Number(pageSize) || 10;
    console.log('getAllMessage', pageNum, sizeNum, createdAt);
    
    // 构建查询条件
    let whereOpn = {};
    
    // 如果提供了用户创建时间，添加消息创建时间大于等于用户创建时间的条件
    let hasUserCreatedAtCondition = false;
    if (createdAt) {
        whereOpn.createTime = {
            [Op.gte]: new Date(createdAt)
        };
        hasUserCreatedAtCondition = true;
    }
    
    // 计算偏移量，确保不会出现负数
    const offset = Math.max(0, (pageNum - 1) * sizeNum);
    
    // 使用limit、offset和where条件进行分页和筛选查询
    let messageList = await Message.findAll({
        where: whereOpn,
        order: [
           ['createTime', 'DESC'],
        ],
        limit: sizeNum,
        offset: offset
    })
    
    // 同时查询总条数（根据筛选条件）
    const total = await Message.count({
        where: whereOpn
    });
    
    // 格式化日期字段为ISO字符串，确保前端正确显示
    const formattedMessageList = messageList.map(msg => ({
        ...msg.toJSON(),
        createTime: msg.createTime ? msg.createTime.toISOString() : null,
        updateTime: msg.updateTime ? msg.updateTime.toISOString() : null
    }));
    
    // 返回消息列表和分页信息
    return {
        list: formattedMessageList,
        total,
        page: pageNum,
        pageSize: sizeNum,
        totalPages: Math.ceil(total / sizeNum)
    };
}
    async addMessage({ sender, content }){    
        const message = await Message.create({
            sender,
            content,
            createTime: new Date(),
        updateTime: new Date()
        })
        if(message){
            return message;
        }
        return false;
    }
}

module.exports = new messageService();

