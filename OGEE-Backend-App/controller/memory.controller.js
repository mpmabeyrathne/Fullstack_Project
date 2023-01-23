const MemoryModel = require('../model/memory.model');
const GroupModel = require('../model/group.model');
const UserModel = require('../model/user.model');
const addMemory = async (req, res) => {
    try {
        
        const { image, groupId, description } = req.body;
        const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: 'Group not found' });
        }
        const user = await UserModel.findOne({username: req.body.username});
        console.log(group.members);
        
        if (!user || !group.members.includes(user.email)) 
        {
            return res.status(400).json({ message: 'User is not a member of this group' });
        }
       
        const memory = await MemoryModel.create({ image, description, username: req.body.username });
        group.memories.push(memory._id);
        await group.save();
        return res.json({ message: 'Memory added to group successfully', memory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error adding memory to group' });
    }
};

//=====================personal memoo
const createPersonalMemory = async (req, res) => {
    try {
        const { image, description } = req.body;
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const memory = await MemoryModel.create({ image, description, username: req.body.username });
        user.personalMemories.push(memory._id);
        await user.save();
        return res.json({ message: 'Personal memory created successfully', memory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating personal memory' });
    }
};
module.exports = {addMemory, createPersonalMemory}