const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


// use because it is a middleware 
passport.use(new LocalStrategy({
    usernameField : 'email'
    }, 
    // done is a function which is predefined functio which take two arguments err or user or other 
    function(email , password , done){

        // find the user and establised the identity 
        User.findOne({email : email} , function(err , user){
            if(err){
                console.log('error in finding user ---> passport');
                return done(err);
            }
            if(!user || user.password != password ){
                console.log('invalid username / password');
                return done(null , false);
            }
            return done(null , user);

        });
    }));

    passport.serializeUser(function(user , done){
        done(null , user.id);
    });

    passport.deserializeUser(function(id , done){
        User.findById(id , function(err , user){
            if(err){return done(err);}
            return done(null , user);
        })
    })

    // check if the user is authenticated
passport.checkAuthentication = function(req , res , next ){
    // if the user is signed in then pass on the next function (controllers action)
    if(req.isAuthenticated()){
       return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/sign-in');
 }
 passport.setAuthenticatedUser = function(req , res ,next ){
    if(req.isAuthenticated()){
 
       // req.user contains the signed in user from the session cookies and we are just sending it tu the rautes for views 
       
       res.locals.user = req.user;
    }
    next();
 
 }
    module.exports = passport;