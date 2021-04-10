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
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal=require('./app/config/passport-local-strategy');

const customMware=require('./app/http/middlewares/flash');
const Emitter=require('events');

// Event emitter
const eventEmitter= new Emitter();
app.set('eventEmitter',eventEmitter);


//session config
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


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());

//global middleware
app.use((req,res,next)=>{
  res.locals.session=req.session;
  next();
})

app.use(flash());
// flash middleware

app.use(customMware.setFlash);
// app.use((req,res,next)=>{
//     res.locals.flash={
//         'success':req.flash('success'),
//         'error':req.flash('error')
//     }
//     next();
// })
//assets
app.use(express.static('public'));
app.use(expressLayout);
//extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./resources/views'));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routes
require('./routes/web')(app);

// server fireup
const server=app.listen(PORT,()=>{
    console.log(`Yup! My server listening on ${PORT}`);
})


const io=require('socket.io')(server);

io.on('connection',(socket)=>{
  //join
  console.log('socket connected',socket.id);
  socket.on('join',(orderID)=>{
    socket.join(orderID)
    
  })
});
eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
    console.log(data);
})

eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
    console.log('orderdata',data);
})