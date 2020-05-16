const Product = require('../models/product');

exports.getPostProductForm = (req,res)=>{
    const errors=req.flash('errors');
    res.render('users/post-product',{
      isLogin:req.session.isLogin,
      errors:errors,
      hasError:errors.length
    });
}
exports.postProduct = async (req,res)=>{
  const pname = req.body.pname;
  const price = req.body.price;
  const discount = req.body.discount;
  const description = req.body.description;
  // const immage = req.files.image;
  const quantity = req.body.quantity
  const userId = req.session.user.id;
  const createdDate = new Date();
  const modifiedDate = new Date();
  console.log(pname,description);
  // const product = new Product(pname,Number(price),Number(discount),description,userId,new Date(),new Date());
  const product = new Product();
  product.name =pname;
  product.price = price;
  product.discount = discount;
  product.quantity = quantity;
  product.description = description;
  product.userId = userId;
  product.creadedDate = createdDate;
  product.modifiedDate = modifiedDate;
  try {
    const results = await product.save();
    if(results[0]){
      return res.redirect('/');
    }
    return res.redirect('/post-product');
  } catch (error) {
    throw error;
  }
}

exports.getProfileProducts = async (req,res)=>{
  console.log(req.session.user.id);
  try {
    const [rows,fields] = await Product.getProductByUserId(req.session.user.id);
    if(rows){
      return res.render('users/profile-products',{
        isLogin:req.session.isLogin,
        products : rows,
      });
    }
  } catch (error) {
    
  }
  
}

exports.getEditProduct = async  (req,res)=>{
  try {
    const [results,fields] = await Product.getProductById(req.params.productId);
    // if(results[0])
    console.log(results);
    const errors=req.flash('errors');
    return res.render('users/edit-product',{
      isLogin:req.session.isLogin,
      errors:errors,
      hasError:errors.length,
      product: results[0],
  });
  } catch (error) {
    throw error;
  }
  
}
exports.editProduct = async (req,res)=>{
  const pId = req.params.productId;
  try {
    const product = new Product();
    product.name = req.body.pname;
    product.price =req.body.price;
    product.discount = req.body.discount;
    product.quantity = req.body.quantity;
    product.description = req.body.description;
    product.modifiedDate = new Date();
    const results = await product.updateProduct(pId);
    if(results[0]){
      return res.redirect('/users/profile');
    }
    res.redirect('/');
  } catch (error) {
    throw error;
  }
}
exports.deleteProduct= async (req,res)=>{
  const pId = req.params.productId;
  try {
    const results =await Product.deleteProduct(pId);
    if(results[0].affectedRows){
      res.redirect('/users/profile');
    }
  } catch (error) {
    throw error;
  } 
}

exports.getUserProductDetail = async (req,res)=>{
  const pId = req.params.productId;
  try {
    const [rows,feilds] = await Product.getProductById(pId);
    if(rows[0]){
      console.log(rows[0]);
      res.render('users/product-detail',{
        isLogin:req.session.isLogin,
      });
    }
  } catch (error) {
    throw error;
  }
}