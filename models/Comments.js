const mongo = require('mongoose');

const comm = new mongo.Schema({
    PostId:{
        type:String,
        required:true,
    },
    UserId:{
        type:String,
        required:true,
    },
    Comment:{
        type:String,
        required:true
    }

});



module.exports = mongo.model('Comments',comm);