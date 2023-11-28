const API_KEY ="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"
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);
const msg = {
  to: 'chandan.kumar@acelucid.com',
  from: 'suraj.adhikari@acelucid.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
(async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();