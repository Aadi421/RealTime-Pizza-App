const Menu=require('../../models/menu')
function homeController(){
    return {
         async index(req,res){
            try{
                let pizzas=await Menu.find({});
               
                return res.render("home",{
                     pizzas:pizzas
                 });
            }
            catch(err){
                console.log('error in finding menu');
            }
            
           
        }
    }
}

module.exports=homeController;