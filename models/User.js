const mong = require('mongoose');


const userSchema = new mong.Schema({
    name:{
        type:String,
        max:100,
        min:8,
        required:true
    },
    email:{
        type:String,
        max:120,
        min:8,
        required:true
    },
    password:{
        type:String,
        max:120,
        min:8,
        require:true
    },
    Avater:
    {
        type:String,
        max:1000,
        default:'user.png'
    }
})


module.exports = mong.model('Users',userSchema);