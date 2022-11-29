const express = require('express');
const cookieParser = require('cookie-parser');
const app = express() 
const port = 8000;
const db = require('./config/mongoose');

// used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');

const { Store } = require('express-session');
const MongoSotre = require('connect-mongo');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix :'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());
// use express router before server start using middleware
// it is middleware so we have to use app.use
// setup view engine
app.set('view engine','ejs');
app.set('views','./views'); 

app.use(session({
    name:'User',
    //todo change the secret before deplyoment 
    secret :'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost/codeial_development',
        autoRemove :'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));


app.use(express.static('assets'));





app.listen(port,function(err){
    if(err){
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});
