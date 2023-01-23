const {Schema, model} = require("mongoose");

const GroupSchema = new Schema({
name: {
    type: String,
    required: true,
    unique: true
},
members: {
    type: [String],
    required: true,
    validate: {
        validator: function (value) {
            return value.length <= 6;
        },
        message: "A group can have a maximum of 7 members."
    }
},
memories: [{
    type: Schema.Types.ObjectId,
    ref: 'Memory',
    require: true
}],
desc: {
    type: String,
    require: true,
    
},
image: {
    type: String,
    require: true,
    
},
});
module.exports = model('Group', GroupSchema);