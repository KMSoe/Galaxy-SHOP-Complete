exports.getIndex=function(req, res) {
    res.render('index', { 
      
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
    const error=req.flash('error');
    const info=req.flash('info');
    console.log(error,info);
    res.render('forgot-form',{
      error:error,
      info:info,
      hasError:error.length,
      hasInfo:info.length
    });
}