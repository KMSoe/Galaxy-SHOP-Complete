const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex=function(req, res) {
  let name;
  if(req.session.cookie.originalMaxAge){
    name="Kaung Myat";
  }
    res.render('index', { 
      path:'/',
      isLogin:req.session.isLogin,
      name: name
    });
}

exports.getShop = async (req, res)=> {
  try {
    const data = [];
    const [rows,fields] = await Product.getProductAndSeller();
    for (let product of rows) {
      const [results,fields] = await Category.getCategoryById(product.catId);
      product.categoryName = results[0].name;
      data.push(product);
    }
    return res.render('shop', { 
      path:'/shop/products',
      isLogin:req.session.isLogin,
      products : data
    });
  } catch (error) {
    throw error;
  }
    
}
exports.getProductDetail = async (req,res) =>{
  const pId= req.params.productId;
  try {
    const [rows,fields] = await Product.getProductAndSellerById(pId);
    if(rows[0]){
      const [results,fields] = await Category.getCategoryById(rows[0].catId);
      
      if(results[0]){
        return res.render('product-detail',{
          path:'/shop/products',
          isLogin:req.session.isLogin,
          product : rows[0],
          categoryName : results[0].name
        });
      }
    } 
  } catch (error) {
    throw error;
  }
}
exports.getSignin=(req,res)=>{
    const errors=req.flash('errors');
    res.render('sign-in',{
      path:'/sign-in',
      isLogin:req.session.isLogin,
      errors:errors,
      hasError:errors.length,
      oldValues :{
        email :'',
        passowrd :'',
      }
    });
}
exports.getSignup=(req,res)=>{
    const errors=req.flash('errors');
    const params=req.flash('params');
    res.render('sign-up',{
      path:'/sign-up',
      isLogin:req.session.isLogin,
      errors:errors,
      hasError:errors.length,
      oldValues :{
        firstName :'',
        lastName :'',
        email :'',
        password:'',
        confirmPassword :'',
      }
    });
}
exports.getForgotForm=(req,res)=>{
  
    const errors=req.flash('errors');
    const info=req.flash('info');
    
    res.render('forgot-form',{
      path:'/forgot',
      isLogin:req.session.isLogin,
      errors:errors,
      info:info,
      hasError:errors.length,
      hasInfo:info.length
    });
}