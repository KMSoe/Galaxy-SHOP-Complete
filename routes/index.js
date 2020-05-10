const express = require('express');
const passport=require('passport');
const {body,validationResult}=require('express-validator');
const nodeMailer=require('nodemailer');
// const smtpTransport=require('nodemailer-smtp-transport');
const async=require('async');
const crypto=require('crypto');
const User=require('../models/user');
const secret=require('../secret/secret');

var router = express.Router();

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    req.flash('errors',errors.array());
    res.redirect('/sign-up');
    // res.status(422).json({ errors: errors.array() });
  };
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Express',
    isLogin:req.session.isLogin,
  });
});
router.get('/shop', function(req, res) {
  res.render('shop', { 
    
  });
});
router.get('/sign-up',(req,res)=>{
  const errors=req.flash('errors');
  res.render('sign-up',{
    errors:errors,
    hasError:errors.length
  });
});
router.post('/sign-up', validate([
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').notEmpty(),
  body('email').isEmail(),
  body('password','Password must be minimum 5').isLength({ min: 6 })
]),passport.authenticate('local-signup',{
  successRedirect:'/sign-in',
  failureRedirect:'/sign-up',
  failureFlash:true
}));

router.get('/sign-in',(req,res)=>{
  const errors=req.flash('errors');
  res.render('sign-in',{
    errors:errors,
    hasError:errors.length
  });
});
router.post('/sign-in',passport.authenticate('local-signin',{
  successRedirect:'/',
  failureRedirect:'/sign-in',
  failureFlash:true
}));
router.get('/forgot-form',(req,res)=>{
  const error=req.flash('error');
  const info=req.flash('info');
  res.render('forgot-form',{
    error:error,
    info:info
  });
});
router.post('/forgot',(req,res,next)=>{
  async.waterfall([
    function(callback){
      crypto.randomBytes(20,(err,buf)=>{
        const rand=buf.toString('hex');
        callback(err,rand);
      });
    },
    async function(rand,callback){
      const [rows,fields]=await pool.query(`select * from users where email=?`,[req.body.email]);
      if(!rows[0].email){
        req.flash('error',{msg: 'Email is not exists' });
        return res.redirect('/forgot-form');
      }
      rows[0].passwordResetToken=rand;
      rows[0].passwordResetExpires=Date.now()+ 1000*60*60;

      const user=new User(rows[0].fname,rows[0].lname,rows[0].email,rows[0].password,rows[0].passwordResetToken,rows[0].passwordResetExpires);
      try {
        const rows=await user.updateUser();
        if(rows[0]){
          callback(rand, user);
        }
      } catch (error) {
          throw error;
      } 
    },
    function(rand,user,callback){
      const smtpTransport=nodeMailer.createTransport({
        service:'Gmail',
        auth:{
          user:secret.auth.user,
          pass:secret.auth.passowrd
        }
      });
      const mailOption={
        to:user.email,
        from:`Galaxy <${secret.auth.user}>`,
        subject:'Reset Token',
        text:`htt`
      };
      smtpTransport.sendMail(mailOption,(err,response)=>{
        req.flash('info',{msg:'Reset Token has been sent.'});
        return callback(err,user);
      });
    }
  ],err=>{
    if(err){
      return next(err);
    }
    res.redirect('/forgot-form')
  });

});

module.exports = router;


// function validate(req,res,next){
//   req.checkBody('firstName','first name is required').notEmpty();
//   req.checkBody('lastName','last name is required').notEmpty();
//   req.checkBody('email','Email is required').notEmpty();
//   req.checkBody('password','Password must not be less than 5').isLength({min:5});

//   const errors=req.validationErrors();
//   if(errors){
//     let messages=[];
//     errors.forEach(error => {
//       messages.push(error);
//     });
//   }
//   req.flash('errors',messages);
//   res.redirect('/');
// }