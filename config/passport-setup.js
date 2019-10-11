const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');
const destructureProfile = require('../utils/destructure-google');

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
        } catch(e) {
            console.error(e);
        }
        
    })
);
