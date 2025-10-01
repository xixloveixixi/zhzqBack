const Router = require('koa-router');

const router = new Router({ prefix: '/require' });
const { getRequireList , getRequireManage , deleteRequire,updateRequire , addRequire } = require('../controller/requireControll');
const { auth } = require('../middleware/auth.middlewear');

router.post('/requireList', auth, getRequireList);
router.post('/requireManage', auth, getRequireManage);
router.post('/deleteRequire', auth, deleteRequire);
router.post('/updateRequire', auth, updateRequire);
router.post('/addRequire', auth, addRequire);


module.exports = router;
