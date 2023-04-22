const Post = require('../models/post');
const Comment = require('../models/comment');



module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if(req.xhr){
            post = await post.populate('user','name');
            return res.status(200).json({
                data : {
                    post : post
                
                },
                message : "post is created"
            })
        }
        req.flash('success','Post is created successfully !');
    
        return res.redirect('back');

    }catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        
            
            if (post.user == req.user.id){

                

                await Comment.deleteMany({post: req.params.id});
                post.remove();
                
                if(req.xhr){
                    
                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                        },
                        message : "post is deleted"
                    })
                }
            req.flash('success','post associated with comments deleted successfully !')
            return res.redirect('back');
        }else{
            req.flash('error','you are authorised to delete this post !');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
    
}