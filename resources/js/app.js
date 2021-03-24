import axios from 'axios'

import { initAdmin } from './admin'


let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter')
function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerText=res.data.totalQty
        new Noty({
            text: "Item added to cart",
            theme:'relax',   
            type:'success',
            layout:'topRight',
            timeout:1500,
            progressBar:false,

        }).show();
    }).catch((err)=>{
        new Noty({
            text: "Something went wrong",
            theme:'relax',   
            type:'error',
            layout:'topRight',
            timeout:1500,
            progressBar:false,

        }).show();

    })

}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);

        updateCart(pizza)
    })
})

// Remove alert mesage after x second
 const alertMSg=document.querySelector('#success-alert');
 if(alertMSg){
     setTimeout(()=>{
         alertMSg.remove();
     },2000)
 }

initAdmin();