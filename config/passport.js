const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const pool=require('../util/database');
const User=require('../models/user');
const Verifier=require('email-verifier');

// let verifier=new Verifier()

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

passport.use('local-signup',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
}, async (req,email,password,done)=>{
    try {
        
            const [rows,fields]=await pool.query(`select * from users where email=?`,[email]); 
            if(rows[0]){
                return done(null,false,req.flash('errors',{msg: 'Email is already exists.' }));
            }else{
                const pwd=await User.hashPassword(password);
                const newUser=new User(req.body.firstName,req.body.lastName,email,pwd);
                const rows= await newUser.save();
                
                if(rows[0].insertId){
                    return done(null, newUser);
                }
            }

    } catch (error) {
        return done(null,error);
    }
    
})
)


passport.use('local-signin',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
}, async (req,email,password,done)=>{
    try {
        const [rows,fields]=await pool.query(`select * from users where email=?`,[email]);
        
        if((rows[0].email != email) && (rows[0].password != password)){
            console.log('0');
            return done(null,false,req.flash('errors',{msg: 'Invalid email or password' }));
        }
        
        return done(null,rows[0]);
    } catch (error) {
        return done(null,error);
    }
    
})
)




