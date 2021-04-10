import axios from 'axios'

import { initAdmin } from './admin'
import moment from 'moment'


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



let statuses=document.querySelectorAll('.status_line')
let order=document.querySelector('#hiddenInput') ? document.querySelector('#hiddenInput').value : null;
order=JSON.parse(order);
let time=document.createElement('small');

//change auto status
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed');
        status.classList.remove('current')

    })
    let stepCompleted=true;

    statuses.forEach((status)=>{
        let dataProp=status.dataset.status;
        if(stepCompleted){
            status.classList.add('step-completed')

        }
        if(dataProp===order.status){
            stepCompleted=false
            time.innerText=moment(order.updateAt).format('hh:mm A')
            status.appendChild(time);
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}
updateStatus(order);


//socket
let socket=io();

//join

if(order){
socket.emit('join',`order_${order._id}`);
}

//
let adminAreaPath=window.location.pathname;

if(adminAreaPath.includes('admin')){
    initAdmin(socket);
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder={...order}
    updatedOrder.updateAt=moment().format();
    updatedOrder.status=data.status
    updateStatus(updatedOrder);
    new Noty({
            text: "Order Status Updated",
            theme:'relax',   
            type:'success',
            layout:'topRight',
            timeout:1500,
            progressBar:false,

        }).show();

    
})

