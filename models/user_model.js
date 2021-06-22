const mongoose =require('mongoose')
const Schema =mongoose.Schema

const userSchema =new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default:'i am new'
    },
    notes:[{
        type: Schema.Types.ObjectId,
        ref:'note'
    }]
})
module.exports=mongoose.model('user',userSchema)