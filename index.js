const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

app.use(cors());

const accountSid = process.env.VITE_API_ACCOUNT_SID;
const authToken = process.env.VITE_API_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.get("/about", async(req, res) => {
    console.log('entering body');
    res.json('okey shijith')

});



app.use(express.json());

const sendData = async (data) => {
  try {
      const templatePath = path.join(__dirname, 'data.html');
      const source = fs.readFileSync(templatePath, 'utf-8').toString();
      const template = handlebars.compile(source);
      const replacement = {
          name:data.name,
          place:data.place,
          email:data.email,
          district:data.district,
          phone:data.phone,
          event:data.event
      };
      const htmlToSend = template(replacement);
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.NODE_MAILER_ID,
              pass: process.env.NODE_MAILER_KEY
          }
      });

      const emailOptions = {
          from: data.email,
          to: process.env.MY_EMAIL,
          subject: 'Customer Data',
          text: `Your OTP is . Please enter this code to verify your account.`,
          html: htmlToSend
      };

      const result = await transporter.sendMail(emailOptions);
      console.log(result);
  } catch (error) {
      console.log(error.message);
  }
};

app.post('/sendMessage', async (req, res) => {
  const data = req.body;
try {
  const one = sendData(data);
  res.json('success')
} catch (error) {
  console.log(error);
  res.json('Error')
}

});

const PORT = process.env.PORT;

let port
PORT ? port = "sucess" : port = "fail"

app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
});
