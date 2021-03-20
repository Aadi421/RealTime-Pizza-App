const User=require('../../models/user')
const bcrypt=require('bcrypt')

// this is a factory function(return a object)
function authController(){
    return {
        login(req,res){ // login:function (){ ,this is same
            return res.render("auth/login")
        },
        postLogin(req,res){ // login:function (){ ,this is same
            req.flash('success','Logged in successfully');
            return res.redirect('/cart');
        },
        register(req,res){
            return res.render("auth/register")
        },
        async postRegister(req,res){
            const {name,email,password}=req.body
            // validate user
            if(!name || !email || !password){
                req.flash('error','All field are required');
                req.flash('name',name);
                req.flash('email',email);
                return res.redirect("/register")
            }

            // check if email exist
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','Email already taken');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect("/register")
                }
            });
            //hash password
            const hashedPassword=await bcrypt.hash(password,10)

            // create user
            const user=new User({
                name,
                email,
                password:password
            })
            user.save().then((user)=>{
                req.flash('success','User created successfully');
                return res.redirect('/')
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