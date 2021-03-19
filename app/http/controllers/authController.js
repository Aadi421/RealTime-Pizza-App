// this is a factory function(return a object)
function authController(){
    return {
        login(req,res){ // login:function (){ ,this is same
            return res.render("auth/login")
        },
        register(req,res){
            return res.render("auth/register")
        }
    }
}

module.exports=authController;