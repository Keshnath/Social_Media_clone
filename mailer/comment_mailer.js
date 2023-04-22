// const nodeMailer = require('../config/nodemailer');

// exports.newComment = (comment)=>{
    
//     nodeMailer.transporter.sendMail({
//         from : "keshnathgond22@gmail.com",
//         to : comment.user.email,
//         subject : "new comment Published",
//         html : "<h1>mail sent successfully !!</h1>"
//     },(err , info)=>{
//         if(err){
//             console.log(err)
//              return 
//             }
//         console.log("message sent",info);
//         return 
//     })

// }