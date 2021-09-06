const express = require('express');
const router = express.Router();
const User = require('../models/User');
const joi = require('joi');
const bcr = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register api...............
router.post('/register',async (req,res)=>{
    const salt = await bcr.genSalt(10);
    const isEmail = await User.findOne({email:req.body.email})
    const register = joi.object({name:joi.string().min(6).max(100).required(),email:joi.string().email().min(10).max(100),password:joi.string().required().max(100).min(8)})
    const isErr = register.validate(req.body)
    if(isErr.error)
    res.json(isErr.error.details[0].message);
    if(isEmail)
    res.send("Email already Exist");
    else
        {   
             const post = new User({name:req.body.name,email:req.body.email,password: await bcr.hash(req.body.password,salt) });
            try{
                    const user = await post.save();
                    const token = jwt.sign({_id: user._id},process.env.webtoken) 
                    res.header("auth-token",token).send(token);
                }
            catch(err)
                {
                    res.json({message:err})
                }
        }    
});


//login api..........
router.post('/login', async (req,res)=>{
    const isEmail =  await User.findOne({email:req.body.email});
    const login = joi.object({email:joi.string().required().email().min(8),password:joi.string().required().min(8)})
    const isLerr = login.validate(req.body);
    if(isLerr.error)
    res.json(isLerr.error.details[0].message);
    else if(!isEmail)
    res.send("Email not found");
    else 
    {
        const isUservalid = await bcr.compare(req.body.password,isEmail.password); 
        if(isUservalid)
        {
            const token = jwt.sign({_id: isEmail._id},process.env.webtoken) 
            res.header("auth-token",token).send(token); 
        }
        else
        res.send("Invalid Cridntial");

    }
})

module.exports = router;