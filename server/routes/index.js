const Router = require('express');
const router = new Router;
const adminRouter = require('./adminRouter')
const typeRouter = require('./typeRouter')
const productRouter = require('./productRouter')

router.use('/admin', adminRouter);
router.use('/type', typeRouter);
router.use('/product', productRouter);

module.exports = router;