const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config({path: "./config.env"})


passport.use(new googleStrategy({
    clientID : "47467322303-jc24r54if3mkt0dhqa3tdvfr0pu9ab2q.apps.googleusercontent.com" ,
    clientSecret : process.env.KEY,
    callbackURL :"http://localhost:8000/users/auth/google/callback" 
},function(accessToken , refreshToken , profile , done){
    User.findOne({email : profile.emails[0].value}).exec(function(err , user){
        if(err){
            console.log("error in google " ,err) 
            return 
        }
        // console.log(profile);
        // console.log("we are here ",profile.photos[0].value)
        if(user){
            return done(null , user);
        }
        else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex'),
                // avatar : profile.photos[0].value.toString().slice(8)
                
            } , function(err ,user){
                if(err){
                    console.log("error in creating user",err)
                }else{
                    return done(null , user)
                }
            })
        }
    })

}))


module.exports = passport