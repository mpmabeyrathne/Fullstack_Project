const Notifi = require('../model/notification.model')

const sendNotifi = async (req, res) => {
    const { groupId, invEmail } = req.body;

    // Create new group invitation
    const newInvitation = await new Notifi({
        groupId,
        invEmail,
        status: 'pending'
    });
    await newInvitation.save();

    // Send notification to invited user
    const user = await User.findOne({ invEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    io.to(user.socketId).emit('group_invitation', { groupId });

    res.json({ message: 'Group invitation sent successfully' });
};


module.exports = { sendNotifi };