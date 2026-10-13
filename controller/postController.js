const Post = require("../models/postModel")

exports.createPost = async(req,res)=>{
    try{
        const {title, body} = req.body;

        const post = new Post({
            title, body,
        })

        const savedPost = await post.save();

        res.status(200).json({
            post:savedPost,
        })
    }
    catch(err){
        console.error("Error occured in creatin post :"+ err);

        res.status(400).json({
            error:"post creation failed"
        })
    }
}

exports.getAllPosts= async(req,res)=> {
    try{
        const posts = await Post.find().populate("comments")    
        res.json({
            posts,
        })
    }
    catch(error){
        console.error("error in getting all posts :"+ error)
        res.status(400).json({
            error:"something went wrong in fetching posts "
        })
    }

}