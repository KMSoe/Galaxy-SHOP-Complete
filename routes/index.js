const express = require('express');
const passport=require('passport');
const indexController=require('../controllers/indexController');
const {body,validationResult}=require('express-validator');
const crypto=require('crypto');
const User = require('../models/user');
const sendEmail=require('../util/email');

const router = express.Router();

const signupValidate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array();
      console.log(err.find(e=> e.param==='firstName') ? 'invalid':'');
      return res.status(422).render('sign-up',{
        isLogin:req.session.isLogin,
        errors:err,
        hasError:err.length,
        oldValues :{
          firstName :req.body.firstName,
          lastName :req.body.lastName,
          email :req.body.email,
          passowrd :req.body.passowrd,
          confirmPassword :req.body.confirmPassword,
        }
      });
    }
    return next();
  };
};

const signinValidate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array();
      return res.status(422).render('sign-in',{
        isLogin:req.session.isLogin,
        errors:err,
        hasError:err.length,
        oldValues :{
          email :req.body.email,
          passowrd :req.body.passowrd,
        }
      });
    }
    return next();
  };
};

/* GET home page. */
router.get('/', indexController.getIndex);

/* GET SHOP page. */
router.get('/shop',indexController.getShop);

/* GET Sign up page. */
router.get('/sign-up',indexController.getSignup);

/* Sign up. */
router.post('/sign-up', signupValidate([
  body('firstName').notEmpty().trim().withMessage('First Name must be subbmit'),
  body('lastName').notEmpty().trim().withMessage('Last Name must be subbmit'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
  body('password').trim().isLength({ min: 8 }).withMessage('Invalid Password'),
  body('confirmPassword').custom((value,{req})=>{
    if(value !== req.body.password){
      throw new Error('Password have to match!!!');
    }
    return true;
  })
]),passport.authenticate('local-signup',{
  successRedirect:'/sign-in',
  failureRedirect:'/sign-up',
  failureFlash:true
}));

/*Sign in */
router.get('/sign-in',indexController.getSignin);
router.post('/sign-in',passport.authenticate('local-signin',{
  // successRedirect:'/',
  failureRedirect:'/sign-in',
  failureFlash:true
}),(req,res)=>{
  console.log(req.body.rememberme);
  if(req.body.rememberme){
    req.session.cookie.maxAge = 1000*60*60*24;
  }else{
    req.session.cookie.expires = null;
  }
  res.redirect('/');
});

router.get('/forgot-form',indexController.getForgotForm);
router.post('/forgot',async (req,res)=>{
  const [rows,fields]=await User.findUser(req.body.email);
  if(!rows[0]){
    req.flash('errors',{msg:'Email not exists.'});
    return res.redirect('/forgot-form');
  }
  crypto.randomBytes(20,async (err,buf)=>{
    // const rand=buf.toString('hex');
    // console.log(rand);
    const expireTime=new Date().getTime() +1000*60*10;
    const fname=rows[0].fname;
    const lname=rows[0].lname;
    const email=rows[0].email;
    const password=rows[0].password;
    const passwordResetToken = buf.toString('hex');
    const passwordResetExpires=new Date(expireTime);

    const user = new User(fname,lname,email,password,passwordResetToken,passwordResetExpires);
    console.log(user);
    const results=await user.updateUser(email);
    if(results[0]){
      //Send Email
      const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${passwordResetToken}`;

      const message = `Forgot your password? Click this link.${resetUrl}`;
      //To use axios
      try {
        await sendEmail({
          email : email,
          subject : `Your reset passowrd token (valid for 10 min)`,
          message  : message
        });
        req.flash('info',{msg:`Reset Token is sent to email : ${email}`});
        return res.redirect('/forgot-form');
      } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.updateUser(email);
        return res.redirect('/');
      }
      
    }
  });
});


router.get('/resetPassword/:token', async (req,res)=>{
  try {
    const [rows,fields]=await User.findUserByResetToken(req.params.token,new Date());
    console.log(rows[0],new Date());
    if(rows[0]){
      return res.render('reset',{
        token:req.params.token
      });
    }
    req.flash('errors',{msg:'Invalid or Expire Token'});
    return res.redirect('/forgot-form')
  } catch (error) {
    throw error;
  }
});


router.post('/resetPassword/:token', async (req,res)=>{
  try {
    const pwd= await User.hashPassword(req.body.password);
    const [rows,fields]=await User.findUserByResetToken(req.params.token,new Date());
    
    if(rows[0]){
      const {fname,lname,email} =rows[0];
      const user = new User(fname,lname,email,pwd,null,null);
      const results=await user.updateUser(email);
      if(results[0]){
        return res.redirect('/')
      }
    }
    // req.flash('errors',{msg:'Invalid or Expire Token'});
    return res.redirect('/resetPassword/:token');
  } catch (error) {
    throw error;
  }
});

router.get('/auth/facebook',passport.authenticate('facebook-signup',{scope:'email'}));

router.get('/auth/facebook/callback',passport.authenticate('facebook-signup',{
  // successRedirect:'/sign-in',
  failureRedirect:'/sign-up',
  failureFlash:true
}),(req,res)=>{
  res.redirect('/');
}
);
router.get('/auth/facebook/signin',passport.authenticate('facebook-signin',{scope:'email'}));

router.get('/auth/facebook/signin/callback',passport.authenticate('facebook-signin',{
  // successRedirect:'/sign-in',
  failureRedirect:'/sign-up',
  failureFlash:true
}),(req,res)=>{
  res.redirect('/');
}
);
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile','openid'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/sign-up' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.get('/signout',(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  })
})


module.exports = router;

//AIzaSyCZXo4HSlfQ1M4tHYGr0Hvftwstpqt4978