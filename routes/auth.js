const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.send("Acess died");
    try{
        const verfied = jwt.verify(token, process.env.webtoken);
        req.user = verfied;
        next();
    }catch(err)
    {
        res.send("Invalid Token");
    }

}