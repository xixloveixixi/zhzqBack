module.exports = (err , ctx) => {
    let status = 500; // 默认状态码
    switch (err.code){
        case '10001':
            status = 400; // 错误请求
            break;
        case '10002':
            status = 409; // 冲突
            break;
        default:
            status = 500; // 内部服务器错误
    }
    ctx.status = status;
    ctx.body = err;

}