const GroupModel = require('../model/group.model');
const UserModel = require('../model/user.model');
const createGroup = async (req, res) => {
    try {
        const { name, members, image, desc } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Group name is required' });
        }
        if (!members) {
            return res.status(400).json({ message: 'Group members are required' });
        }
        if (await GroupModel.findOne({ name: req.body.name })) {
            return res.status(400).json({ message: 'Group already exists' });
        }
        if (members.length > 6) {
            return res.status(400).json({ message: 'Group cannot have more than 6 members' });
        }
        if (members.length === 0) {
            return res.status(400).json({ message: 'Please provide at least one member email' });
        }
    
        for(let i=0; i < members.length; i++) {
            const user = await UserModel.findOne({ email: members[i] });
            if (!user) {
                return res.status(400).json({ message: `User with email ${members[i]} not found` });
            }
        }
    
        const group = await GroupModel.create({ name, members, image, desc });
        return res.json({ message: 'Group created successfully', group });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating group' });
    }
}

module.exports = {createGroup}