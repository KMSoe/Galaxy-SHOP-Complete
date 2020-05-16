const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.get('/post-product',userController.getPostProductForm);
router.post('/post-product',userController.postProduct);

router.get('/profile',userController.getProfileProducts);
router.get('/products/:productId',userController.getUserProductDetail);
router.get('/products/:productId/edit',userController.getEditProduct);
router.post('/product/:productId/edit',userController.editProduct);
router.post('/products/:productId/delete',userController.deleteProduct);

module.exports = router;
