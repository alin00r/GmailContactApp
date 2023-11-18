const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  // console.log('Hello World');
  res.render('index', { title: 'Contact Us' });
});
app.post('/contact/send', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: 'Ali Nour <Feedback@test.com>',
    to: 'alinoorspam@gmail.com',
    subject: 'Form Submission',
    text:
      'You have a submisson with the following details....Name: ' +
      req.body.name +
      'Email: ' +
      req.body.email +
      'Message:' +
      req.body.message,
    html:
      '<p>You have a submisson with the following details....</p><ul><li>Name: ' +
      req.body.name +
      '</li><li>Email: ' +
      req.body.email +
      '</li><li>Message:' +
      req.body.message +
      '</li></ul>',
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message Sent:' + info.response);
      res.redirect('/');
    }
  });
});

app.listen(3000);
console.log('Server is running on port 3000....');
