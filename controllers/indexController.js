exports.getIndex=function(req, res) {
    res.render('index', { 
      isLogin:req.session.isLogin,
      name: `${req.session.user.fname} ${req.session.user.lname}`
    });
}
exports.getShop=(req, res)=> {
    res.render('shop', { 
      
    });
}
exports.getSignin=(req,res)=>{
    const errors=req.flash('errors');
    res.render('sign-in',{
      errors:errors,
      hasError:errors.length
    });
}
exports.getSignup=(req,res)=>{
    const errors=req.flash('errors');
    res.render('sign-up',{
      errors:errors,
      hasError:errors.length
    });
}
exports.getForgotForm=(req,res)=>{
    const errors=req.flash('errors');
    const info=req.flash('info');
    
    res.render('forgot-form',{
      errors:errors,
      info:info,
      hasError:errors.length,
      hasInfo:info.length
    });
}