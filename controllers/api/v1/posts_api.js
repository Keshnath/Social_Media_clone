const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req , res){
    let posts = await Post.find({}).sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200 , {
        message : "lists of posts",
        posts : posts
    })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : "post is deleted"
                })
            }
            await Comment.deleteMany({post: req.params.id});
            // req.flash('success','post associated with comments deleted successfully !')
            return res.json(200, {
                message : 'post delete succefully'
            })
        }else{
           return res.json(401 , {
            message : "you can't delete this post !"
           })
        }

    }catch(err){
        // req.flash('error',err)
        console.log('*******',err)
        return res.json(500 , {
            message : 'error  internal '
        });
    }
    
}