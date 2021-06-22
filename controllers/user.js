const User =require('../models/user_model')
const {validationResult} =require('express-validator/check')
const jwt =require('jsonwebtoken')
const bcrypt =require('bcryptjs')


exports.signup = async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error =new Error('vaidation failed!')
      error.statusCode= 422
      error.data =errors.array()
      throw error
    }

    const email =req.body.email
    const password =req.body.password
    const name =req.body.name
    try{
    const hashedpw = await bcrypt.hash(password,12)

    const user = new User({
        email:email,
        password:hashedpw,
        name:name
    })
    await user.save()
    res.status(201).json({message:'user created',userId: user._id}) 

    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.login = async (req,res,next)=>{
    const email =req.body.email
    const password =req.body.password

    let loadedUser
    try{
      const user = await User.find({email: email})
    
      if(!user){
          const error =new Error('A user with this email could not be found!')
         error.statusCode=401
          throw error
      }
      loadedUser =user[0]
      console.log(user)
    const isEqual = await bcrypt.compare(password, user[0].password)
    if(!isEqual){ 
        const error =new Error('incorrest password')
        error.statusCode=401
        throw error
         
    }
    const token = jwt.sign(
        {
            email: loadedUser.email,
            userId: loadedUser._id
        },
        'somesupersupersecret',
        {expiresIn: '1h'}
    )

    res.status(200).json({token: token,userId: loadedUser._id})

    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}
exports.getUserStatus = async (req,res,next)=>{
   try{
       const user = await User.findById(req.userId)
       if(!user){
           const error = new Error('user not found')
           error.statusCode= 404
           throw error
       }
      res.status(200).json({status: user.status})
   }catch(err){
    if(!err.statusCode){
        err.statusCode=500
    }
    next(err)
   }
}
exports.updateUserStatus = async (req,res,next)=>{
    const status =req.body.status
    try{
        const user = await User.findById(req.userId)
        if(!user){
            const error = new Error('user not found')
            error.statusCode= 404
            throw error
        }
    user.status = status
    await user.save()
       res.status(200).json({status: user.status})
    }catch(err){
     if(!err.statusCode){
         err.statusCode=500
     }
     next(err)
    }
 }