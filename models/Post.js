const mongo =require('mongoose');

const newPost = new mongo.Schema({
    PosterId:{
        type:String,
        required:true,
        max:1000,
        min:1,
    },
    title:{
        type:String,
        max:100,
        min:1,
        required:true
    },
    Post:{
        type:String,
        max:900,
        min:10,
        required:true
    },
    PostDate:{
        type:Date,
        default: Date.now,

    },
    Media:{
        type:String,
        max:100,
        default:"none.png"
    }

})



module.exports = mongo.model('Posts',newPost);
