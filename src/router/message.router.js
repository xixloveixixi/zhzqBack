
// const { getBillList } = require("../service/bill.service");
const Router = require('koa-router');
const router = new Router({ prefix: '/message' });
const { getAllMessage ,  sendMessage} = require("../controller/messageController");
const  { auth }  = require("../middleware/auth.middlewear") ;

router.post('/getmessage', auth, getAllMessage);

router.post('/sendmessage', auth, sendMessage);


module.exports = router;