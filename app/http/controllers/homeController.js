const menu=require('../../models/menu')
function homeController(){
    return {
         async index(req,res){
            try{
                let pizzas=await menu.find({});
                console.log(pizzas);
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