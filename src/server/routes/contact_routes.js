const nodemailer = require('nodemailer');

const sendMail = (data, callback) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dradigoldshtein@gmail.com',
      pass: 'pass234!!'
    }
  });

  const { name, email, phoneNumber, message } = data;
  let mailOptions = {
    from: '"Adi Goldshtein\'s Official Site 👻" <dradigoldshtein@gmail.com>',
    to: 'dradigoldshtein@gmail.com',
    subject: 'New Contact Request',
    html: `<h1>${name} approached you!</h1><br/><h3>Email</h3>${email}<br/><h3>Phone number</h3>${phoneNumber}<br/><h3>Message</h3>${message}`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    callback();
  });
};

module.exports = function(app, db) {
  app.post('/contact', (req, res) => {
    sendMail(req.body, () => res.send('OK'));
  });
};
