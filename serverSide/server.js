const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");
const fs = require('fs');
let htmlTemplate;

fs.readFile('./views/index.html', "utf8", function (err, data){
 if(err){
 	console.log(err);
 }
 else{
	htmlTemplate = data;
	}	
});

app.use(bodyParser.json());
app.use(cors());
app.set('views', __dirname + '/views');
app.set('view engine', 'pug')


"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // you can use any smtp, Gmail/Yahoo/Outlook etc..
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user,  //process.env.Email, // your host user
      pass: account.pass ///process.env.Pass // your host password
    }
    
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"John Doe" <Johndoe@email.com>', // Your Sending address 
    to: '"test@example.com", "another@example.com"', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlTemplate

		// html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



app.get('/', function (req,res){
	main().catch(error => console.log(error));
	res.json("Email Sent");
});

app.listen(3000, () => {
	console.log('Port Running');
});