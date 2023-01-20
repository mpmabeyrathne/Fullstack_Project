const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})
//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("post updated")
        } else {
            res.status(403).json("you cant update post");
        }
    } catch (err) {
        res.status(500).json(err);
    }

});
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("post deleted")
        } else {
            res.status(403).json("you cant delete post");
        }
    } catch (err) {
        res.status(500).json(err);
    }

});
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
       res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }

});
//get all post memofeed


module.exports = router;