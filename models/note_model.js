const mongoose =require('mongoose')
const Schema =mongoose.Schema

const noteSchema =new Schema(
    {
        title:{
            type: String,
            required:true
        },
        content:{
            type: String,
            required:true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'user',
            required:true
        }
    },
    {timestamps:true}
)
module.exports= mongoose.model('note',noteSchema)