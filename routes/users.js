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

router.get('/cart',userController.getCart);
router.post('/cart',userController.postCart);

router.get('/profile/check',userController.getCheckout);
router.post('/profile/check',userController.checkout);

router.get('/profile/order',userController.getOrder);
router.get('/profile/sell',userController.getSellList);

module.exports = router;
