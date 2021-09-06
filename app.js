const expres = require('express');
const app = expres();
var mongo = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(expres.json());
app.use(cors());
const commnt = require('./routes/comment');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
app.use('/posts', postsRoute);
app.use('/user',userRoute);
app.use('/comment', commnt);









mongo.connect('mongodb://localhost:27017/myblogdb',{useNewUrlParser:true},()=>{console.log("Database connection success!")});
app.listen(3000,()=>{console.log("API is runing......")});