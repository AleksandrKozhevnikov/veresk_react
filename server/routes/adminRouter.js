const Router = require('express');
const router = new Router;
const adminController = require('../controllers/adminController')
const authMiddleware = require('../moddleware/authMiddleware')

router.post('/registration', authMiddleware, adminController.registration)
router.post('/login', adminController.login);
router.get('/check', adminController.check);

module.exports = router;