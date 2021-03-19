const express=require("express");
const app=express();
const path=require("path")
const PORT=process.env.PORT || 8000;
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");



const db = require('./app/config/mongoose');



app.use(express.static('public'));
app.use(expressLayout);
// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./resources/views'));

//routes

require('./routes/web')(app);

// server fireup
app.listen(PORT,()=>{
    console.log(`Yup! My server listening on ${PORT}`);
})