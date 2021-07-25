    const accountSid = 'AC7576bee11e67d056b81ef6c5c8aa5582';
    const authToken = '4f57c1699e06850e6f43e5dff752d3ae';
    const client = require('twilio')(accountSid, authToken);
    const sendSMS = (dataSMS) => {
        client.messages.create(dataSMS)
            .then(message => console.log(message.sid))
            .catch(console.log)
    }

    module.exports=sendSMS