const express=require("express");
const app=express();
require('dotenv').config()
const path=require("path")
const PORT=process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const db = require('./app/config/mongoose');
const session=require('express-session');

const MongoStore = require('connect-mongo')



//
// var mongoStore = new MongoStore({
//           mongooseConnection: db,
//             collection: 'sessions'
// });
// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
                maxAge:1000*60*60*24 
    },
    store: MongoStore.create({
    mongoUrl:'mongodb://localhost/pizza',
    collectionName:'sessions',
    
    
  })
    
    
}))
app.use(express.json());

//global middleware
app.use((req,res,next)=>{
  res.locals.session=req.session;
  next();
})
//assets
app.use(express.static('public'));
app.use(expressLayout);
//extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./resources/views'));

//routes

require('./routes/web')(app);

// server fireup
app.listen(PORT,()=>{
    console.log(`Yup! My server listening on ${PORT}`);
})