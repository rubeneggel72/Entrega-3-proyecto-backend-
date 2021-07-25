
const sendWhatsApp=(data)=>{
const accountSid = 'AC7576bee11e67d056b81ef6c5c8aa5582';
const authToken = 'f8171bbea54de46b10a8efd6d22ca4eb';

const client = require('twilio')(accountSid, authToken);
client.messages.create({
      body: data,
      mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5493492520661'
      })
.then(message => console.log(message.sid))
.catch(console.log)    

}
module.exports=sendWhatsApp


