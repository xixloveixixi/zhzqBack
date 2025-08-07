
// const { getBillList } = require("../service/bill.service");
const Router = require('koa-router');
const { getBuilding, deleteBuilding, updateBuiding } = require('../controller/buldingController');

const router = new Router({ prefix: '/building' });


router.post('/buildingList', getBuilding);
router.post('/deleteBuilding',deleteBuilding);
router.post('/updateBuilding', updateBuiding);



module.exports = router;