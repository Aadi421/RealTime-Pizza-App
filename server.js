const express=require("express");
const app=express();
const path=require("path")
const PORT=process.env.PORT || 8000;
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");







app.use(express.static('public'));
app.use(expressLayout);
// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./resources/views'));

//routes
app.get('/',(req,res)=>{
    res.render("home")
})
app.get('/cart',(req,res)=>{
    res.render("customers/cart")
})
app.get('/login',(req,res)=>{
    res.render("auth/login")
})
app.get('/register',(req,res)=>{
    res.render("auth/register")
})
// server fireup
app.listen(PORT,()=>{
    console.log(`Yup! My server listening on ${PORT}`);
})