
const  { getRequireList , getRequireManage ,deleteRequire  , updateRequire , addRequire}  = require( "../service/require.service")
class requireController {
    async getRequireList (ctx){
      const { username } = ctx.state.user;
        const requireList = await getRequireList(username);
        ctx.body = {
            code:200,
            msg:'获取需求列表成功',
            data:
              requireList
            
        }
    }
    async getRequireManage(ctx){
        const {requireNo , creator , page , pageSize} = ctx.request.body;
        const requireManage = await getRequireManage( requireNo , creator , page , pageSize)
        // 只筛选出状态不成功的

        ctx.body = {
            code:200,
            msg:'获取需求管理列表成功',
            data:
              requireManage
            
        }
    }
    async deleteRequire(ctx){
        const {requireNo} = ctx.request.body;
        const result = await deleteRequire(requireNo)
        ctx.body = {
            code:200,
            msg:'删除需求成功',
            data:result
        }
    }
    async updateRequire(ctx){
        const {requireNo  , description  ,phone , address} = ctx.request.body;
        const result = await updateRequire(requireNo , description , phone , address)

        ctx.body = {
            code:200,
            msg:'更新需求成功',
            data:result
        }
    }
    async addRequire(ctx){
        const {description , title , tag ,phone , address , requireNo , creator , createTime} = ctx.request.body;
        const result = await addRequire(tag , title , description , phone , address , creator , createTime , requireNo)

        ctx.body = {
            code:200,
            msg:'添加需求成功',
            data:result
        }
    }



}

module.exports = new requireController();
