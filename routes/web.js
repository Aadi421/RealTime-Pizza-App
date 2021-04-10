const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderController')
const adminOrderController=require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController')

const passport=require('passport');

//
const guest=require('../app/http/middlewares/guest')
const admin=require('../app/http/middlewares/admin')


function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest,authController().login)
    app.post('/login',passport.authenticate('local', {
                                   failureRedirect: '/login',
                                   failureFlash: true }),authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.get('/logout',authController().logout)

    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
    

    // Customer routes
    app.post('/orders',orderController().store)
    app.get('/customer/orders',passport.checkAuthentication,orderController().index)
    app.get('/customer/orders/:id',passport.checkAuthentication,orderController().show)

    //admin routes
    app.get('/admin/orders',admin,adminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)


}


module.exports=initRoutes;