const router = require("express").Router();
const Group = require("../models/Group");
const groupPost = require("../models/groupPost");

// create new group
router.post("/creategroups", async (req, res) => {
    try {
        let numEmails = req.body.memberEmails.length;
        if (numEmails > 6) {
            return res.status(400).json("A group can have a maximum of 6 members.")
        }
        // create new group
        const newGroup = new Group({
            groupName: req.body.groupName,
            memberEmails: req.body.memberEmails,
            createdBy: req.body.createdBy,
            description: req.body.description,
            image: req.body.image,
        });
        const savedGroup = await newGroup.save();
        res.status(200).json(savedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create post within a group


router.post("/creategroupspost", async (req, res) => {
    const {groupId,description,createdBy,image,memberEmails} =req.body;
    let existingUser;
    try{
        existingUser = await Group.findOne({memberEmails:memberEmails});
    }catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "No user for this email"})
    }
    
    try {
        
        // create new post
        const newGroupPost = new groupPost({
            groupId,
            description,
            createdBy,
            image,
            memberEmails,

        });
        const savedGroupPost = await newGroupPost.save();
        // add post to group's groupPosts array
         await Group.findOneAndUpdate({ _id: req.body.groupId }, { $push: { groupPosts: savedGroupPost._id } });
        res.status(200).json(savedGroupPost);
    } catch (err) {
        res.status(500).json(err);
    }
   
});

module.exports = router;