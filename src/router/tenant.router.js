
// const { getBillList } = require("../service/bill.service");
const Router = require('koa-router');
const router = new Router({ prefix: '/tenant' });
const {getTenant , editTenant ,deleteTenant , deleteTenants , addTenant} = require("../controller/tenantController");

// 确保导入路径和文件名完全正确
// const { bill } = require('../middleware/bill.middleware');
const BillController = require('../controller/billController');

router.post('/tenantList', getTenant);
router.post('/deleteTenant', deleteTenant);
router.post('/deleteTenants', deleteTenants);
router.post('/addTenant', addTenant);
// 编辑
router.post('/editTenant', editTenant);


module.exports = router;