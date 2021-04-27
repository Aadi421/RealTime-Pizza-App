const User=require('../../models/user')
const bcrypt=require('bcrypt')

// this is a factory function(return a object)
function authController(){
    const _getRedirectUrl=(req)=>{
        return req.user.role==='admin'?'/admin/orders':'/customer/orders'
    }

    return {
        login(req,res){ // login:function (){ ,this is same
            return res.render("auth/login")
        },
        postLogin(req,res){ // login:function (){ ,this is same
            req.flash('success','Logged in successfully');
            return res.redirect(_getRedirectUrl(req));
        },
        register(req,res){
            return res.render("auth/register")
        },
        async postRegister(req,res){
            const {firstName,lastName,email,password}=req.body
            // validate user
            if(!firstName || !lastName || !email || !password){
                req.flash('error','All field are required');
                req.flash('firstName',firstName);
                req.flash('lastName',lastName);
                req.flash('email',email);
                return res.redirect("/register")
            }

            // check if email exist
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','Email already taken');
                    req.flash('firstName',firstName);
                    req.flash('lastName',lastName);
                    req.flash('email',email);
                    return res.redirect("/register")
                }
            });
            //hash password
            const hashedPassword=await bcrypt.hash(password,10)

            // create user
            const user=new User({
                firstName,
                lastName,
                email,
                password:password
            })
            user.save().then((user)=>{
                req.flash('success','User created successfully');
                return res.redirect('/login')
            }).catch((err)=>{
                    req.flash('error','Something went wrong');
                    
                    return res.redirect("/register")
            })

        },
        logout(req,res){
            req.logout();
            req.flash('success','Logout successfully');
            return res.redirect('/login')

        }
        
    }
}

module.exports=authController;