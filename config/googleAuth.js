const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../routes/registerModels");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "642040040203-rnvf8lojm5ar1p2agc1f1kokilokm69h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        {
          name: profile.displayName,
          email: profile.email,
          provider: "GOOGLE",
        },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
