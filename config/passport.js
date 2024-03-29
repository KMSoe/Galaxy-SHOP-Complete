const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../util/database");
const User = require("../models/user");
const Cart = require("../models/cart");

// let verifier=new Verifier()

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  pool
    .query(`select * from users where id=?`, [id])
    .then((rows) => {
      done(null, rows[0]);
    })
    .catch((err) => {
      done(err, rows[0]);
    });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const [
          rows,
          fields,
        ] = await pool.query(`select * from users where email=?`, [email]);
        if (rows.length > 0) {
          return done(
            null,
            false,
            req.flash("errors", { msg: "Email is already exists." })
          );
        } else {
          const pwd = await User.hashPassword(password);
          const newUser = new User();
          newUser.name = req.body.name;
          newUser.email = email;
          newUser.password = pwd;
          newUser.createdDate = new Date();
          const rows = await newUser.save();

          if (rows[0].insertId) {
            const cart = new Cart(rows[0].insertId);
            cart.save();
            return done(null, newUser);
          }
        }
      } catch (error) {
        return done(null, error);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log("asfdsf");
        const [
          rows,
          fields,
        ] = await pool.query(`select * from users where email=?`, [email]);
        console.log(rows);
        if (rows.length > 0) {
          const com = await User.comparePassword(password, rows[0].password);
          if (!com) {
            return done(
              null,
              false,
              req.flash("errors", { msg: "Invalid email or password" })
            );
          }
          req.session.isLogin = true;
          req.session.user = rows[0];
          return done(null, rows[0]);
        } else {
          return done(
            null,
            false,
            req.flash("errors", { msg: "Invalid email or password" })
          );
        }
      } catch (error) {
        return done(null, error);
      }
    }
  )
);
