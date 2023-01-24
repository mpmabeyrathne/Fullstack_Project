const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    personalMemories: [{
        type: Schema.Types.ObjectId,
        ref: 'Memory',
    }],
    socketId: {
        type: String,
    }
});

module.exports = model('User', UserSchema);