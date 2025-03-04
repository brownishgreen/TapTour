import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

console.log('Passport 已載入')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value
    }
    done(null, user)
  } catch (error) {
    done(error)
  }
}))