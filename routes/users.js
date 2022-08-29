const express = require("express");
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLogin);

const validateProduct = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const err = errors.array();
    return res.status(422).render("/users/post-product", {
        path: "/post-product",
        isLogin: req.session.isLogin,
        errors: err,
        hasError: err.length,
        oldValues: {
          
        },
      });
  };
};

/* GET users listing. */
router.get("/post-product", userController.getPostProductForm);
router.post("/post-product",validateProduct([
    body('')
]), userController.postProduct);

router.get("/profile", userController.getProfileProducts);
router.get("/profile/clear-cart", userController.clearCart);
router.get("/me", userController.getMyInfo);
router.post("/updateMe", userController.updateMe);


router.get("/products/:productId", userController.getUserProductDetail);
router.get("/products/:productId/edit", userController.getEditProduct);
router.post("/product/:productId/edit", userController.editProduct);
router.post("/products/:productId/delete", userController.deleteProduct);

router.get("/cart", userController.getCart);
router.post("/cart", userController.postCart);

router.get("/profile/check", userController.getCheckout);
router.post("/profile/check", userController.checkout);

router.get("/profile/order", userController.getOrder);
router.get("/profile/sell", userController.getSellList);

router.get("/:userId", userController.getOtherUserProfile);

module.exports = router;
