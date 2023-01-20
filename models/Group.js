const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        require: true,
        max: 100
    },
    memberEmails: {
        type: [String],
        require: true,
        validate: {
            validator: function (value) {
                return value.length <= 6;
            },
            message: "A group can have a maximum of 7 members."
        }
    },
    description: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    image: {
        type: String,
        require: true,
    },


    groupPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupPost',
        require:true
    }],


},
    { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);