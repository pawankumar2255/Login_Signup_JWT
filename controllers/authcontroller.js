const User = require("../src/models/model")
const bcrypt = require("bcrypt")
const{generateToken} = require("../auth/auth")
const joi = require("joi")

const validationCheck = (dataToInsert)=>{
    const vSchema = joi.object({
        name:joi.string().min(3).max(30).required(),
        email:joi.string().min(3).required().email(),
        phone:joi.string().min(10).max(12).required(),
        password:joi.string().min(8).max(20).required()
    })


        const schemaValidation = vSchema.validate(dataToInsert)
        if(schemaValidation.error){
            return {err:"error while validation"}
        }
        return [true, schemaValidation.value]
}

const signup =async(req,res)=>{
    try{
        const value = validationCheck(req.body)
        const currData = await User.find({
            email:req.body.email
        })
        if(currData.length !== 0){
            res.send("user with given email is already exist")
        }else{
            if(value[0]){
                const hashpass = bcrypt.hashSync(value[1].password,10)
                const data = await User({name:value[1].name,email:value[1].email,password:hashpass,phone:value[1].phone})
                await data.save()
                res.send(data)
            }else{
                res.send("invalid details format")
            }
        }
    }catch(err){
        res.send(err)
    }
}


const login = async(req,res)=>{
    try{
        const email = await req.body.email
        const password = await req.body.password
        const data = await User.find({email})

        const passwordIsValid = bcrypt.compareSync(password,data[0].password)
        if (passwordIsValid && email === data[0].email){
            const token = generateToken(data[0].id)
            res.cookie("usertoken",token).send("you are logged in ")
        }else{
            res.send("invalid credential") 
        }

    }catch(err){   
        res.send({err})
    }
}


const showProfile = (req,res)=>{

    res.send(req.userData.name+", Login Successful!")
}

module.exports = {signup,login,showProfile}