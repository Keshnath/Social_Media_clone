const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comment_mailer');


module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);
        // post.comments.sort('-createdAt');

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            post.comments.push(comment);
           
            post.save();
            
          
            comment = await comment.populate('user','name');
            
            if(req.xhr){
                
                return res.status(200).json({
                    data : {
                        comment : comment
                    
                    },
                    message : "comment is created"
                })
            }
            
            
            req.flash('success','comment is added ')

            res.redirect('/');
        }
        
    }catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    }
                })
            }
            req.flash('success','comment is deleted !')
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
    
}