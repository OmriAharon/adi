const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.handler = (event, context, callback) => {
    try {
       console.log(event, context)
       
       const oauth2Client = new OAuth2(
             "769772646461-87rf9d0k2g2lnha6kpe6dscfb86vsmms.apps.googleusercontent.com", // ClientID
             "hzh4OcFBGn7_e-5gq27Et0Hk", // Client Secret
             "https://developers.google.com/oauthplayground" // Redirect URL
        );
        
        oauth2Client.setCredentials({
            refresh_token: "1//04SM8tm9WxSywCgYIARAAGAQSNwF-L9Irk5ZRPgPZ-mrEttQaI2xts3N9xycxO-C4y9bxHGu3J673l8HvF3VrZ7tSBu90hQC9Cv0"
        });
        const accessToken = oauth2Client.getAccessToken()
        
         const smtpTransport = nodemailer.createTransport({
             service: "gmail",
             auth: {
                  type: "OAuth2",
                  user: "dradigoldshtein@gmail.com", 
                  clientId: "769772646461-87rf9d0k2g2lnha6kpe6dscfb86vsmms.apps.googleusercontent.com",
                  clientSecret: "hzh4OcFBGn7_e-5gq27Et0Hk",
                  refreshToken: "1//04SM8tm9WxSywCgYIARAAGAQSNwF-L9Irk5ZRPgPZ-mrEttQaI2xts3N9xycxO-C4y9bxHGu3J673l8HvF3VrZ7tSBu90hQC9Cv0",
                  accessToken: accessToken
             }
        });
        
        const {name, email, phoneNumber, message} = event;
         console.log(`Name: ${name}. Email: ${email}. PhoneNumber: ${phoneNumber}. Message: ${message}`);
         let mailOptions = {
           from: '"Adi Goldshtein\'s Official Site 👻" <dradigoldshtein@gmail.com>',
           to: 'dradigoldshtein@gmail.com',
           subject: `New Contact Request from ${name}`,
           html: `<h1>${name || ''} approached you!</h1><br/><h3>Email</h3>${email || ''}<br/><h3>Phone number</h3>${phoneNumber || ''}<br/><h3>Message</h3>${message || ''}`,
         }
         
         smtpTransport.sendMail(mailOptions, (error, response) => {
             if (error) {
                 console.log(error);
             } 
            console.log('Message sent: %s', response.messageId);
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
              console.log(response);
              callback(null, 'Email sent successfully'); 
             smtpTransport.close();
        });
       
    //   const transporter = nodemailer.createTransport({
    //      host: 'smtp.gmail.com',
    //      port: 465,
    //      secure: true,
    //      auth: {
    //       type: 'OAuth2',
    //       clientId: '769772646461-jcionjs8l7bu573ab9ntlk3sufpc2tt3.apps.googleusercontent.com',
    //       clientSecret: 'KYDK4OaUc6VQQslkGB-8zdwi'
    //      }
    //   });
  
    //  const {name, email, phoneNumber, message} = event;
    //  console.log(`Name: ${name}. Email: ${email}. PhoneNumber: ${phoneNumber}. Message: ${message}`);
    //  let mailOptions = {
    //   from: '"Adi Goldshtein\'s Official Site 👻" <dradigoldshtein@gmail.com>',
    //   to: 'dradigoldshtein@gmail.com',
    //   subject: `New Contact Request from ${name}`,
    //   html: `<h1>${name || ''} approached you!</h1><br/><h3>Email</h3>${email || ''}<br/><h3>Phone number</h3>${phoneNumber || ''}<br/><h3>Message</h3>${message || ''}`,
    //   auth: {
    //     user: 'dradigoldshtein@gmail.com',
    //     accessToken: 'ya29.Glv7BWroBBKajVTCj4sxQN_aEaDVu9KJXX7Y_d19DOvhKqYJd8Y92yq6PXUXmgEJ7Vzq68F07JzBQWPcix-Y-ewtR9OuhOKUZMZe5ugLD5FFp_Q-BaSauJxITiAZ',
    //     refreshToken: '1/xZPLt0rDF3x7NU1Mb4UW29edKUyEWEQ3Cu7KG94AlCo',
    //     expires: 1484314697598
    //   }
    //  };
  
    //  // send mail with defined transport object
    //  transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //      return console.log(error);
    //   }
    //   console.log('Message sent: %s', info.messageId);
    //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //   callback(null, 'Email sent successfully');
    //  });
   }
   catch (e) {
     callback(null, e.message + ' - CATCH' + JSON.stringify(e));
   }
};
