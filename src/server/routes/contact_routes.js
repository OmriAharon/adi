const nodemailer = require('nodemailer');

const sendMail = (data, callback, errorCallback) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'dradigoldshtein@gmail.com',
      accessToken: 'ya29.Glz4BfjPHLMXxPm5mmbP9QTb_6wELRWdfZ9LNpRiDqn5UiK0rnwHFQCOgRjvA8iiw9wol_o7bb4CueJ-_QdYO8_eU0Rfbsqj5a_cP-oGJIzpbIp5teQKIxZF0tiPkg',
      refreshToken: 'ya29.Glv4BSxYSVtm9ZcS6q4POhZ3U-CZ1dOaVYMkSnPmeWtgKa-QhP6eVyoNyeoG_3co8PGaRwuMj4P6cIAzmjswFfPrYZjbaH6l7zekZJP9ziVnCIcOKBj6B3SYg02J'
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
      errorCallback();
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    callback();
  });
};

module.exports = function(app, db) {
  app.post('/contact', (req, res) => {
    sendMail(req.body, () => res.send('OK'), () => { res.status(500); res.send('Not ok') });
  });
};
