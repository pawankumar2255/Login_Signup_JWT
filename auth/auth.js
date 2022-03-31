require("dotenv").config()
const jwt = require("jsonwebtoken")
const Users = require("../src/models/model")

exports.generateToken = (id)=>{
    return jwt.sign(id, process.env.TOKEN_SECRET)
}

exports.verifyToken = async (req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split("=")[1]
        const idToken = jwt.verify(token,"pawan")
        const data = await Users.findById(idToken)
        req.userData = data
        next()
    }else{
        res.send("Log in first please")
    }
}