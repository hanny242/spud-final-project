
const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const ensureLogin = require("connect-ensure-login");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

//login
router.get("/", (req, res, next) => {
    res.render("/login");
});
  
router.post("/", passport.authenticate("local", {
  failureFlash: true,
  passReqToCallback: true
}), (req,res)=> {
  res.json(req.session.passport);
});

//redirect to "profile" needs to be finished
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Foute gebruikersnaam of wachtwoord" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Foute gebruikersnaam of wachtwoord" });
    }

    return next(null, user);
  });
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

//passport OAuth

router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/private-page",
      failureRedirect: "/" 
    })
  );
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: "350032470445-2vus698s1e3oe7m1nflcq2bm2gbctted.apps.googleusercontent.com",
        clientSecret: "Me4FvZjTIRNWwXYmFHiv9SIA",
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("Google account details:", profile);
        debugger
        User.findOne({ googleID: profile.id })
          .then(user => {
            if (user) {
              done(null, user);
              return;
            }
  
            return User.create({ 
              googleID: profile.id,
              username: profile.displayName
            })
              .then(newUser => {
                done(null, newUser);
              })
          })
          .catch(err => done(err)); 
      }
    )
  );
  
  module.exports = router;
