const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');
const destructureProfile = require('../utils/destructure-google');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
        const { googleId, ...props } = destructureProfile(profile);
        
        try {
            let currentUser = await User.findOne({ googleId });
            if (!currentUser) {
                currentUser = await new User({ googleId, ...props }).save();
            }
            done(null, currentUser);
        } catch(err) {
            done(err);
        }
    })
);
