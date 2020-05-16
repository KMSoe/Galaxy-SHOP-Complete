const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
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

passport.use(new GoogleStrategy({
    clientID: '402958633380-6n23a2eu4js49u3heecr6v317g1g63e1.apps.googleusercontent.com',
    clientSecret: 'VYbsz9q9luEIfqKCvbHJcHh0',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback:true
  },
   async (req,accessToken, refreshToken, profile, done) => {
       console.log('asf');
    try {
        const [rows,fields] =await User.isSignGoogle(profile.id);
        const {id,name} = profile;
        const email = profile.emails[0].value;
        if(rows[0]){
            return done(null,false,req.flash('errors',{msg:'Already exists.'}));
        }else{
            const newUser=new User('K ',name,email,'','',new Date(),'','',id);
            console.log(newUser);
            return (null,true);
            // const results=await newUser.save();
            // console.log(results[0]);
            // if(results[0].insertId){
            //     return done(null,true);
            // }
        }
    } catch (error) {
        return done(error);
    }
    
  }
));
// passport.use('google-signin',new GoogleStrategy({
//     clientID: '609798629994-q9uqdm9ks2o97ppo8q1k9eo09ogpho8r.apps.googleusercontent.com',
//     clientSecret: '6syV_WPRxLg5UJMfIvdRHFCY',
//     callbackURL: "http://localhost:3000/auth/google/signin/callback",
//     profileFields: ['id', 'displayName', 'photos', 'email'],
//     passReqToCallback:true
//   },
//    async (req,accessToken, refreshToken, profile, done) => {
//        console.log(profile.id);
//     try {
//         const [rows,fields] =await User.isSignFacebook(profile.id);
//         const { email, name } = profile._json;
//         console.log(rows[0],name,email);
//         if(!rows[0]){
//             return done(null,false,req.flash('errors',{msg:'Not exists.'}));
//         }else{
//             return done(null,true);
//         }
//     } catch (error) {
//         return done(error);
//     }
    
//   }
// ));
