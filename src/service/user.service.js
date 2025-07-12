class UserService {
    async createUser(username , password){
        return 'User created successfully';
    }
}

// 导出
module.exports = new UserService();