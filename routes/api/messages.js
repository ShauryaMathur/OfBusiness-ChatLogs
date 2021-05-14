const express=require('express');
const router=express.Router();

const Message=require('../../models/Message');

// @route POST chatlogs/:user
// @desc  POSTS a new chat Log for a user
router.post('/:user',(req,res)=>{

    const {message,timestamp,isSent} = req.body;

    const newMessage=new Message({
        user:req.params.user,
        message,timestamp,isSent
    });
    newMessage.save().then(message=>res.json(message._id));
});

// @route GET chatlogs/:user
// @desc  Get All Chat Logs for A User
router.get('/:user',(req,res)=>{

    let limit = (req.query.limit === undefined)?10:req.query.limit;
    let start = req.query.start === undefined?0:req.query.start;
    Message.find({ user: req.params.user})
        .sort({timestamp:-1})
        .skip(parseInt(start))
        .limit(parseInt(limit))
        .then(messages=>res.json(messages))
        .catch(console.error);
});

// @route DELETE chatlogs/:user
// @desc  Deletes All Chat Logs for A User
router.delete('/:user',(req,res)=>{
    Message.deleteMany({user:req.params.user})
    .then(msg=>res.json(msg))
    .catch(console.error);
})

// @route DELETE chatlogs/:user/:msgid
// @desc  Deletes a specific message from chat log for a user
router.delete('/:user/:msgid',(req,res)=>{
    Message.findOneAndRemove({_id:req.params.msgid,user:req.params.user})
    .then(msg=>res.json(msg))
    .catch(err=>{
        res.status(404).json("Msg ID not Found");
        console.error;
    });

})

module.exports=router;