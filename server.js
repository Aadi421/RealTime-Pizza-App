const express=require("express");
const app=express();
const path=require("path")
const PORT=process.env.PORT || 8000;
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");





app.get('/',(req,res)=>{
    res.render("home")
})

app.use(express.static('public'));
app.use(expressLayout);
// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./resources/views'))
// server fireup
app.listen(PORT,()=>{
    console.log(`Yup! My server listening on ${PORT}`);
})