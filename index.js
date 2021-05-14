const express=require('express');
const mongoose=require('mongoose');
const config=require('config');
const app=express();

app.use(express.json());

//DB Config
const db=config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('MonogDb Connected...!')).catch(err => console.log(err));

app.use('/chatlogs',require('./routes/api/messages'));

const port = process.env.PORT || 5000;
    
app.listen(port,()=>console.log(`Server started on port ${port}`));
