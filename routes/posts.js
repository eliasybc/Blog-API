const express = require('express');
const router = express.Router()
const auth = require('./auth');
const Post = require('../models/Post'); 
const joi = require('joi');



//get all posts
router.get('/', async(req,res)=>{

    try{
        const allpost = await Post.find().sort({PostDate: 'descending'});
        res.json(allpost);
    }catch(err)
    {
        res.json({message:err});
    }
  
});

//make postes
router.post('/post',auth, async (req,res)=>{
const posts = joi.object({ title:joi.string().min(1).max(100).required(),Post:joi.string().min(8).max(2000),Media:joi.string()});
const isEr = posts.validate(req.body)
if(isEr.error)
res.json(isEr.error.details[0].message);
else 
{
    const post =  Post({PosterId: req.user,title:req.body.title,Post:req.body.Post,Media:req.body.Media})
        try{
            const posted = await post.save();
            res.json(posted._id);
        }catch(err)
        {
            res.json({message:err})
        }
}
});


module.exports = router;












module.exports = router;
