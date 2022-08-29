const Product = require("../models/product");
const Category = require("../models/category");
const Cart = require("../models/cart");
const CartItem = require("../models/cart_item");
const Order = require("../models/order");
const OrderItem = require("../models/order_item");
const User = require("../models/user");

exports.getPostProductForm = async (req, res) => {
  try {
    const errors = req.flash("errors");
    const [categories, fields] = await Category.getCategories();
    if (categories.length > 0) {
      res.render("users/post-product", {
        path: "/users/post-product",
        isLogin: req.session.isLogin,
        errors: errors,
        hasError: errors.length,
        categories: categories,
      });
    }
  } catch (error) {
    throw error;
  }
};
exports.postProduct = async (req, res) => {
  const pname = req.body.pname;
  const price = req.body.price;
  const discount = req.body.discount;
  const description = req.body.description;
  const image = req.file;
  const quantity = req.body.quantity;
  const catId = Number(req.body.catId);
  const userId = req.session.user.id;
  const createdDate = new Date();
  const modifiedDate = new Date();

  // const product = new Product(pname,Number(price),Number(discount),description,userId,new Date(),new Date());
  const product = new Product();
  product.name = pname;
  product.price = price;
  product.discount = discount;
  product.quantity = quantity;
  product.description = description;
  product.image = image.path;
  product.categoryId = catId;
  product.userId = userId;
  product.creadedDate = createdDate;
  product.modifiedDate = modifiedDate;
  console.log(product);
  try {
    const results = await product.save();
    if (results[0]) {
      return res.redirect("/");
    }
    return res.redirect("/post-product");
  } catch (error) {
    throw error;
  }
};

exports.getProfileProducts = async (req, res) => {
  try {
    const [rows, fields] = await Product.getProductByUserId(
      req.session.user.id
    );
    if (rows) {
      return res.render("users/profile-products", {
        path: "/profile",
        isLogin: req.session.isLogin,
        products: rows,
        user: req.session.user
      });
    }
  } catch (error) {
    throw error;
  }
};
exports.getMyInfo = async (req, res) => {
  return res.render("users/my-info", {
    path: "/profile",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};
exports.updateMe = async (req, res) => {
  try {
    const [users, fields] = await User.getUserById(req.session.user.id);

    if (users.length > 0) {
      const updatedUser = users[0];
      updatedUser.name = req.body.name;
      console.log(updatedUser);
      // const u = new User(updatedUser);
      // console.log(u);
      // req.session.user = updatedUser;
    }
    return res.render("users/my-info", {
      path: "/profile",
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (error) {}
};
exports.getEditProduct = async (req, res) => {
  try {
    const [results, fields] = await Product.getProductById(
      req.params.productId
    );
    const [categories, categoryInfo] = await Category.getCategories();

    const errors = req.flash("errors");
    return res.render("users/edit-product", {
      path: "/profile",
      isLogin: req.session.isLogin,
      errors: errors,
      hasError: errors.length,
      product: results[0],
      categories,
    });
  } catch (error) {
    throw error;
  }
};
exports.editProduct = async (req, res) => {
  const pId = req.params.productId;
  const image = req.file;
  try {
    const product = new Product();
    product.name = req.body.pname;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.quantity = req.body.quantity;
    product.categoryId = req.body.catId;
    // product.image = req.file.path;
    product.description = req.body.description;
    product.categoryId = req.body.catId;
    product.modifiedDate = new Date();

    if (image) {
      product.image = image.path;
    } else {
      const [pd, info] = await Product.getProductById(pId);
      product.image = pd[0].image;
    }
    console.log(product.image);
    const results = await product.updateProduct(pId);
    if (results[0]) {
      return res.redirect("/users/profile");
    }
  } catch (error) {
    throw error;
  }
};
exports.deleteProduct = async (req, res) => {
  const pId = req.params.productId;
  try {
    const results = await Product.deleteProduct(pId);
    if (results[0].affectedRows) {
      res.redirect("/users/profile");
    }
  } catch (error) {
    throw error;
  }
};

exports.getUserProductDetail = async (req, res) => {
  const pId = req.params.productId;
  try {
    const [rows, fields] = await Product.getProductAndSellerById(pId);
    if (rows.length > 0) {
      const [results, fields] = await Category.getCategoryById(rows[0].catId);
      console.log(pId,rows[0]);
      if (results.length > 0) {
        return res.render("users/product-detail", {
          path: "/profile",
          isLogin: req.session.isLogin,
          product: rows[0],
          user: req.session.user,
          categoryName: results[0].name,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
exports.getCart = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [cartId, fields] = await Cart.getCartByUserId(userId);
    if (cartId[0].id) {
      const [rows, fields] = await CartItem.getItemAndProduct(cartId[0].id);
      let totalQuantity, totalBill;
      if (rows.length > 1) {
        [totalQuantity, totalBill] = rows.reduce((a, n) => [
          a.quantity + n.quantity,
          (a.price - a.discount) * a.quantity +
            (n.price - n.discount) * n.quantity,
        ]);
      } else if (rows.length === 0) {
        return res.render("users/cart", {
          path: "/profile",
          isLogin: req.session.isLogin,
          cartItems: rows,
          totalQuantity: 0,
          totalBill: 0,
          user: req.session.user
        });
      } else {
        [totalQuantity, totalBill] = [
          rows[0].quantity,
          (rows[0].price - rows[0].discount) * rows[0].quantity,
        ];
      }

      return res.render("users/cart", {
        path: "/profile",
        isLogin: req.session.isLogin,
        cartItems: rows,
        totalQuantity,
        totalBill,
        user: req.session.user
      });
    }
  } catch (error) {
    throw error;
  }
};
exports.postCart = async (req, res) => {
  const pId = req.body.productId;
  const pQty = Number(req.body.productQty);
  const userId = req.session.user.id;
  try {
    const [rows, fields] = await Cart.getCartByUserId(userId);
    if (rows[0]) {
      const cartItem = new CartItem();
      cartItem.productId = pId;
      cartItem.cartId = rows[0].id;
      cartItem.quantity = 1;
      const [
        cartItems,
        feilds,
      ] = await CartItem.getCartItemsByProductIdAndCartId(pId, rows[0].id);
      if (cartItems[0]) {
        if (cartItems[0].quantity >= pQty) {
          cartItem.quantity = pQty;
        } else {
          cartItem.quantity = cartItems[0].quantity + 1;
        }
        const results = await cartItem.updateQuantity();
        if (results[0]) {
          return res.redirect(`/shop/products/detail/${pId}`);
        }
      } else {
        const results = await cartItem.save();
        if (results[0].insertId) {
          return res.redirect(`/shop/products/detail/${pId}`);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
exports.clearCart = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [cartId, fields] = await Cart.getCartByUserId(userId);
    const [result, info] = await CartItem.clearCart(cartId[0].id);
    if(result.affectedRows > 0 ){
      return res.redirect(`/users/cart`);
    }
  } catch (error) {
    throw error;
  }
}
exports.getCheckout = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [cartId, fields] = await Cart.getCartByUserId(userId);
    if (cartId[0].id) {
      const [cartItems, fields] = await CartItem.getItemAndProduct(
        cartId[0].id
      );
      let totalQuantity, totalBill;
      if (cartItems.length > 1) {
        [totalQuantity, totalBill] = cartItems.reduce((a, n) => [
          a.quantity + n.quantity,
          (a.price - a.discount) * a.quantity +
            (n.price - n.discount) * n.quantity,
        ]);
      } else {
        [totalQuantity, totalBill] = [
          cartItems[0].quantity,
          (cartItems[0].price - cartItems[0].discount) * cartItems[0].quantity,
        ];
      }

      return res.render("users/checkout", {
        path: "/profile",
        isLogin: req.session.isLogin,
        name: `${req.session.user.fname} ${req.session.user.lname}`,
        cartItems,
        totalQuantity,
        totalBill,
        user: req.session.user
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.checkout = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const [cartId, fields] = await Cart.getCartByUserId(userId);
    if (cartId[0].id) {
      const [cartItems, fields] = await CartItem.getItemAndProduct(
        cartId[0].id
      );
      if (cartItems.length) {
        const order = new Order(
          userId,
          req.body.phoneno,
          req.body.address,
          0,
          new Date(),
          new Date()
        );
        const results = await order.save();

        if (results[0].insertId) {
          for (let i = 0; i < cartItems.length; i++) {
            const orderItem = new OrderItem();
            orderItem.productId = cartItems[i].productId;
            orderItem.orderId = results[0].insertId;
            orderItem.quantity = cartItems[i].quantity;
            const rows = await orderItem.save();
          }
          res.redirect("/users/profile/order");
        }
      }
    }
    res.redirect("/");
  } catch (error) {
    throw error;
  }
};

exports.getOrder = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const data = [];
    const [orders, fields] = await Order.getOrderByUserId(userId);

    for (let i = 0; i < orders.length; i++) {
      const items = [];
      const [orderItems, fields] = await OrderItem.getItemAndProduct(
        orders[i].id
      );
      console.log(orderItems);
      for (let j = 0; j < orderItems.length; j++) {
        const [seller, info] = await User.getUserById(orderItems[j].userId);
        const item = {};
        item.orderDate = orders[i].createdDate;
        item.orderId = orderItems[j].orderId;
        item.seller = `${seller[0].lname}`;
        item.product = orderItems[j].name;
        item.unitPrice = orderItems[j].price - orderItems[j].discount;
        item.quantity = orderItems[j].quantity;
        item.total = item.unitPrice * orderItems[j].quantity;
        //phone no
        items.push(item);
      }
      data.push(items);
    }

    console.log(data, orders);
    return res.render("users/order", {
      path: "/profile",
      isLogin: req.session.isLogin,
      data,
    });
  } catch (error) {
    throw error;
  }
};
exports.getSellList = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [products, fields] = await Product.getProductByUserId(userId);
    // console.log(products);
    if (products.length) {
      const items = [];
      for (let i = 0; i < products.length; i++) {
        const [
          sellProducts,
          fields,
        ] = await OrderItem.getItemAndProductByProductId(products[i].id);
        const [orders, info] = await Order.getOrderById(
          sellProducts[i].orderId
        );
        for (let j = 0; j < orders.length; j++) {
          const item = {};
          item.userId = orders[j].userId;
          item.product = sellProducts[i].name;
          item.quantity = sellProducts[i].quantity;
          item.totalBill =
            (sellProducts[i].price - sellProducts[i].discount) * item.quantity;
          item.phoneNo = orders[j].phoneNo;
          item.address = orders[j].address;
          item.orderDate = orders[j].createdDate;
          items.push(item);
        }
      }
    } else {
    }
  } catch (error) {
    throw error;
  }
  res.redirect("/users/profile");
};
exports.getOtherUserProfile = (req, res) => {
  res.render('other-profile',{
    path: "/others",
    isLogin: req.session.isLogin,
    user: req.session.user
  });
}