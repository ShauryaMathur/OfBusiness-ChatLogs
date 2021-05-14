const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MessageSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    isSent:{
        type:Boolean,
        default:true
    }
});

module.exports=Message=mongoose.model('message',MessageSchema);