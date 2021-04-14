const nodeMailer = require("../app/config/nodemailer");
const moment=require("moment")

module.exports.newOrder=(order) => {
  console.log('inside mailers');  
  console.log(order);
  
   
   let htmlString=nodeMailer.renderTemplate({order:order,moment:moment},'/orders/newOrder.ejs');
  // send mail with defined transport object
 nodeMailer.transporter.sendMail({
    from: 'adarshchaudhary434@gmail.com', // sender address
    to:order.customerId.email, // list of receivers
    subject: "Order palced!",// Subject line
    // text: "Hello world?", // plain text body
    html:htmlString, // html body
 },(err,info) =>
    {
      if(err){console.log(err,'error in sending mails'); return}
      console.log('message sent',info);
      return;
    });
}

