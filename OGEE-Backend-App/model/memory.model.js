const {Schema, model} = require("mongoose");

const MemorySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        require: true
    },

    image:{
        type: String,
        require:true,
    }
    
});
module.exports = model('Memory', MemorySchema);