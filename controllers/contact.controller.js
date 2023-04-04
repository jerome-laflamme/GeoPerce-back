const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendForm = async (req,res,next) => {
  
    // set transporter
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4aba6600745c0f",
          pass: "1fd1e6e89587d2"
        }
      });
  
    // send mail with defined transporter object
    let info = await transporter.sendMail({
      from: `${req.body.name} <${req.body.email}>`, // sender address
      to: "webwise.can@gmail.com", // list of receivers(separate with comma)
      subject: "Contact général GéoPercé", // subject line
      text: `${req.body.message}`, // plain text body
      html: `
      <p>Demande de contact pour GéoPercé</p></br>
      <p>Nom: ${req.body.name}</p>
      <p>Telephone: ${req.body.phone}</p>
      <p>Courriel: ${req.body.email}</p></br>
      <p>Message: </p>
      <b>${req.body.message}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }