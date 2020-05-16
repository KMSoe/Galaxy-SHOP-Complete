const passport=require('passport');
const FacebookStrategy=require('passport-facebook').Strategy;
const pool=require('../util/database');
const User=require('../models/user');


passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    pool.query(`select * from users where id=?`,[id])
        .then(rows=>{
            done(null,rows[0]);
        })
        .catch(err=>{
            done(err,rows[0])
        });
});

passport.use('facebook-signup',new FacebookStrategy({
    clientID: '864126277400252',
    clientSecret: 'dd1b1b4698e1c9dbd07fe9ea4b9adde5',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback:true
  },
   async (req,accessToken, refreshToken, profile, done) => {
       console.log(profile.id);
    try {
        const [rows,fields] =await User.isSignFacebook(profile.id);
        const { email, name } = profile._json;
        console.log(rows[0],name,email);
        if(rows[0]){
            return done(null,false,req.flash('errors',{msg:'Already exists.'}));
        }else{
            const newUser=new User('K ',name,email,'','',new Date(),profile.id,'asfadf');
            console.log(newUser);
            const results=await newUser.save();
            console.log(results[0]);
            if(results[0].insertId){
                return done(null,true);
            }
        }
    } catch (error) {
        return done(error);
    }
    
  }
));
passport.use('facebook-signin',new FacebookStrategy({
    clientID: '864126277400252',
    clientSecret: 'dd1b1b4698e1c9dbd07fe9ea4b9adde5',
    callbackURL: "http://localhost:3000/auth/facebook/signin/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback:true
  },
   async (req,accessToken, refreshToken, profile, done) => {
       console.log(profile.id);
    try {
        const [rows,fields] =await User.isSignFacebook(profile.id);
        const { email, name } = profile._json;
        console.log(rows[0],name,email);
        if(!rows[0]){
            return done(null,false,req.flash('errors',{msg:'Not exists.'}));
        }else{
            req.session.user = rows[0];
            req.session.isLogin = true;
            return done(null,true);
        }
    } catch (error) {
        return done(error);
    }
    
  }
));
