//import post and comment model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel")


//business logic
exports.createComment = async (req, res)=>{
    try{
        //fetch data from req body
        const {post, user, body} = req.body;

        //create a comment obj
        const comment = new Comment({
            post, user, body
        });
        // save the new comment into database 

        const savedComment = await comment.save();


        //find the post by id, add the new comment in comment array of the post 
        const updatedPost = await Post.findByIdAndUpdate(post , {$push:{comments:savedComment._id}}, {new:true})
        .populate("comments")// populate the comment array with comment document 
        .exec();

        res.status(200).json({
            post:updatedPost
        })
       
    }
    catch(err){
        console.error("error while creating comment "+ err);
        return res.status(500).json({
            
            err: "error while creating comment "
        })
    }   
}