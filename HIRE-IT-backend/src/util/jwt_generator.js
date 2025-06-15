const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();

function generatetoken(payload,SECRET=process.env.SECRET_KEY,options={}){
    return jwt.sign(payload,SECRET,{expiresIn:'1hr',...options})
}

module.exports=generatetoken;