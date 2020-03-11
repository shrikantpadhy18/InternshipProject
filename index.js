const express=require('express');
const expresslayout=require('express-ejs-layouts');
const mongoose=require('mongoose');

const app=express();
const db=require('./config/key.js').MongoURI;
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log("Database Connected")).catch(err=>console.log("Not Connected"));
app.use(expresslayout);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',require('./Routes/dashboard.js'));

app.use('/user',require('./Routes/user.js'));

//
const PORT=process.env.PORT||5000
app.listen(PORT,console.log(`process started at ${PORT}`));