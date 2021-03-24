const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema({
    
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required:true
    },
    items:{type:Object,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    paymentType:{type:String,default:'COD'},
    status:{type:String,default:'order_placed'},
  },{
        timestamps:true
   });

const ORDER = mongoose.model('ORDER', orderSchema);

module.exports = ORDER;