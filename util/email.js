const nodemailer=require('nodemailer');

const sendEmail= async options=>{
    //1. Create a transporter
    const transporter=nodemailer.createTransport({
        host:'smtp.mailtrap.io',
        port:25,
        auth : {
            user : '5b91288216caf4',
            pass: '2503c8ae5ccd0c'
        }
    });

    //2. Define the email options
    const mailOptions={
        from : 'Kaung Myat Soe <kms@mail.com>',
        to:options.email,
        subject: options.subject,
        text:options.message
    }


    //3. Actually send the email
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;