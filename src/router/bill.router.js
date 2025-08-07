
// const { getBillList } = require("../service/bill.service");
const Router = require('koa-router');
const router = new Router({ prefix: '/bill' });
const { getBill } = require("../controller/billController");
// 确保导入路径和文件名完全正确
// const { bill } = require('../middleware/bill.middleware');
const BillController = require('../controller/billController');

router.post('/billList', getBill);
router.post('/deleteBill', BillController.deleteBill);
router.post('/deleteBills', BillController.deleteBills);

module.exports = router;