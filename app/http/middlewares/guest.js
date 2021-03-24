function guest(req,res,next) {
    if(!req.isAuthenticated()){ //isAuthenticated() provide by passport as a middleware
        return next();
    }
    return res.redirect('/')
    
}

module.exports=guest;