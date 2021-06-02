const Router = require('express');
const router = new Router;
const ApiError = require('../error/apiError')
const productController = require('../controllers/productController')

router.post('/create', productController.create);
router.post('/remove', productController.delete)
router.get('/', productController.getAll);
router.get('/:id', productController.getOne)

module.exports = router;