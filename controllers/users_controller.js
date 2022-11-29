const passport = require('passport');
const User = require('../models/user');

module.exports.profile = function(req , res){
   return res.render('user_profile',{
      title : 'User Profile',
      
   })
}

module.exports.sign_in = function(req,res){
   // this is written so that once the user sign in it will not able to go back to sign in page again 
   if(req.isAuthenticated()){
      return res.redirect('/users/profile')
   }
   return res.render('user_sign_in',{
      title : "Codeial | Sign In"
   });
}

module.exports.sign_up = function(req,res){
   // this is written so that once the user sign in it will not able to go back to sign up page again 
   if(req.isAuthenticated()){
      return res.redirect('/users/profile')
   }
   return res.render('user_sign_up',{
      title : "Codeial | Sign Up"
   });
}

// creating a user using form data if password wrong redirect to back 
// elif the data match and user not present in db then creating a new user 

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
      return req.redirect('back');
    }
    User.findOne({email : req.body.email} , function(err , user){
      if(err){console.log('error in finding user in signing up'); return }
      if(!user){
         // crating user in database

         User.create(req.body , function(err , user){

            if(err){console.log('error in creating user '); return }

            return res.redirect('/users/sign-in')
         })
      }
      else{
         return res.redirect('back')
      }

    })

   
}
 
// this is the authentication done with the help of passport local 

module.exports.createSession = function(req , res){
   return res.redirect('/');
} 

module.exports.destroySession = function(req , res ){
   req.logout(function(err){
      console.log(err);
   })
   return res.redirect('/');
}


// this is for manual authentication part leaving the master branch of the project i.e local brach 

// module.exports.profile = function(req ,res){
//    if(req.cookies.user_id){
//       User.findById(req.cookies.user_id , function(err , user){
//          // if(err){return}
//          if(user){
//             return res.render('user_profile',{
//                title:"user",
//                user : user
//             });
            
//          }
//          return res.redirect('/users/sign-in');

//       });
//    }else{
//       return res.redirect('/users/sign-in')

//    }  
// }

// module.exports.createSession= function(req , res){
//    // steps to authenticate 

//    // find the user
//    User.findOne({email: req.body.email},function(err , user){
//       if(err){console.log('error in finding user'); return }

//       // handle user found
//       if(user){
//          if(user.password != req.body.password){
//             return res.redirect('back');
//          }

//          // handle session creation 

//          res.cookie('user_id',user.id);
//          return res.redirect('/users/profile');

//       }else{
//          return res.redirect('back');
//       }
//    })
   

// }
// module.exports.endSession = function(req,res){
//    if(req.body.submit){
//       return res.redirect('/users/sign-in');
//    }

// }

