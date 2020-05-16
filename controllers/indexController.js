exports.getIndex=function(req, res) {
  let name;
  if(req.session.cookie.originalMaxAge){
    name="Kaung Myat";
  }
    res.render('index', { 
      isLogin:req.session.isLogin,
      name: name
    });
}
exports.getShop=(req, res)=> {
    res.render('shop', { 
      isLogin:req.session.isLogin,
    });
}
exports.getSignin=(req,res)=>{
    const errors=req.flash('errors');
    res.render('sign-in',{
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
      isLogin:req.session.isLogin,
      errors:errors,
      info:info,
      hasError:errors.length,
      hasInfo:info.length
    });
}