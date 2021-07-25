const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
  


const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.email',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'rubenalbertoeggel@gmail.com',
            pass: 'auto4casa'
        }
      }));

 sendEmail=(mailOptions)=>{
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
  }
module.exports=sendEmail