const Product = require("../models/product");
const Category = require("../models/category");
const Review = require("../models/reviewModel");

exports.getIndex = async (req, res) => {
  let name;
  if (req.session.cookie.originalMaxAge) {
    name = "Kaung Myat";
  }
  const [categories, info] = await Category.getCategories();
  res.render("index", {
    path: "/",
    categories,
    isLogin: req.session.isLogin,
    name: name,
    user: req.session.user
  });
};

exports.getShop = async (req, res) => {
  try {
    console.log(req.query);
    const data = [];
    if (req.query.categoryId) {
      const [rows, fields] = await Product.getProductAndSellerByCatId(Number(req.query.categoryId));
      for (let product of rows) {
        const [results, fields] = await Category.getCategoryById(product.catId);
        product.categoryName = results[0].name;
        data.push(product);
      }
    } else {
      const [rows, fields] = await Product.getProductAndSeller();
      for (let product of rows) {
        const [results, fields] = await Category.getCategoryById(product.catId);
        product.categoryName = results[0].name;
        data.push(product);
      }
    }

    const [categories, catInfo] = await Category.getCategories();
    return res.render("shop", {
      path: "/shop/products",
      isLogin: req.session.isLogin,
      products: data,
      categories,
    });
  } catch (error) {
    throw error;
  }
};
exports.getProductDetail = async (req, res) => {
  const pId = req.params.productId;
  try {
    const [rows, fields] = await Product.getProductAndSellerById(pId);
    if (rows.length > 0) {
      const [results, fields] = await Category.getCategoryById(rows[0].catId);
      const [reviews, reviewInfo] = await Review.getReviewsByProductId(rows[0].id);
      // let isReview;
      for (const review of reviews) {
        if(review.userId === req.session.user.id){
          review.isReview = true;
        }
      }
      console.log(rows[0]);
      if (results.length > 0) {
        return res.render("product-detail", {
          path: "/shop/products",
          isLogin: req.session.isLogin,
          product: rows[0],
          categoryName: results[0].name,
          reviews,
          // isReview,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
exports.getSignin = (req, res) => {
  const errors = req.flash("errors");
  res.render("sign-in", {
    path: "/sign-in",
    isLogin: req.session.isLogin,
    errors: errors,
    hasError: errors.length,
    oldValues: {
      email: "",
      passowrd: "",
    },
  });
};
exports.getSignup = (req, res) => {
  const errors = req.flash("errors");
  const params = req.flash("params");
  res.render("sign-up", {
    path: "/sign-up",
    isLogin: req.session.isLogin,
    errors: errors,
    hasError: errors.length,
    oldValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};
exports.getForgotForm = (req, res) => {
  const errors = req.flash("errors");
  const info = req.flash("info");

  res.render("forgot-form", {
    path: "/forgot",
    isLogin: req.session.isLogin,
    errors: errors,
    info: info,
    hasError: errors.length,
    hasInfo: info.length,
  });
};
