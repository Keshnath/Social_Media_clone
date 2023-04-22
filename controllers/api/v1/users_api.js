const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){

    try {

        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            console.log('success here ')
            return res.json(422,{
                message : "Invalid username / Password"
            })
        }
        console.log('we are here')
        return res.json(200 , {
            message : "sign in successfuly",
            data : {
                token : jwt.sign(user.toJSON(), 'codeial' ,{expiresIn : "2h"})
            }
        })

            
        
        
    } catch (error) {
        console.log('******* is there ',error)
        return res.json(500 , {
            message : 'error  internal '
        });
    }

    

    
}