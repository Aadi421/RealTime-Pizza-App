const Order = require("../../../models/order")



function orderController() {
    return {
        async index(req,res) {
           let order=await Order.find({ status: { $ne: 'completed' } })
           .sort('-createdAt')
           .populate('customerId', '-password')
                
                
               if(req.xhr) {
                   return res.json(order)
                   req.flash('success','Orders diplayed')
               } else {
                   req.flash('success','Orders diplayed')
                  return res.render('admin/orders')
                
               }
           
        }
    }
}

module.exports = orderController