const Menu = require("../../../models/menu")
const path=require('path');
const multer=require('multer');


function menuController() {
    //multer storage
    var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'../../../../public/img/menuImage')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
    })
    
    upload= multer(
        { 
        storage: storage }
    ).single('image')
    return {
        index(req,res){
            // const {name,email,password}=req.body
            Menu.upload.single('image')(req, res, function (err) { 
                name=req.body.name;
                size=req.body.size;
                price=req.body.price;

                image=`public/img/menuImage${req.file.filename}`;
            })
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
                
                
                user.save();
                return res.redirect('back');
                
            

        }
    }
}

module.exports = menuController