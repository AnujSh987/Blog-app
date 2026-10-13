//import like and post models
const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    //update the post collectio based on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { returnDocument: "after" },
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    console.error("error while liking post " + err);
    res.status(400).json({
      error: "error in liking post",
    });
  }
};

// unlike a post

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { returnDocument: "after" },
    );

    res.json({
        post: updatedPost
    })
  } catch (err) {
    console.error("error while liking post " + err);
    res.status(400).json({
      error: "error in liking post",
    });
  }
};
