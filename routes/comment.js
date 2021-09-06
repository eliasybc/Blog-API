const express = require('express');
const router = express.Router();
const joi = require('joi');
const commnt = require('../models/Comments');
const auth = require('./auth');



//Get comment for spacfic post
router.get('/:postId',async (req,res)=>{
    try{
        const comnt = await commnt.find({PostId:req.params.postId});
        res.json(comnt)

    }catch(err)
    {
        res.json({message:err})
    }
});
//Add comment 
router.post('/comment',auth,async (req,res)=>{
    const comm = joi.object({PostId:joi.string().required(),comment:joi.string().required().min(1)});
    var isEr = comm.validate(req.body);
    if(isEr.error)
    res.json(isEr.error.details[0].message);
    else 
    {
        const com = commnt({PostId:req.body.PostId,UserId:req.user,Comment:req.body.comment});
        try {
                const mcomm = await com.save();
                res.json(mcomm);
        }catch(err)
        {
            res.json({message:err});
        }
    }
    

});


module.exports = router;