const {Schema, model} = require("mongoose");


const GroupInvitationSchema = new Schema({
    groupId: {
        type: String,
        required: true
    },
    invEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
});

module.exports = model('GroupInv', GroupInvitationSchema);