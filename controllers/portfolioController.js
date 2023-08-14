const nodemailer = require('nodemailer')
const mailGunTransporter = require('nodemailer-mailgun-transport')

// transporter
const transport = nodemailer.createTransport(
    mailGunTransporter({
        auth: {
            api_key: process.env.API_MAILGUN,
            domain: process.env.MAILGUN_DOMAIN
        }
    })
)


const sendEmailController = (req, res) => {
     try {
        const {fname, lname, email, message} = req.body

        // Validation
        if(!fname || !lname || !email || !message){
            return res.status(500).send({
                success: false,
                message: 'Please Fill All Fields'
            })
        }

        transport.sendMail({
            to: 'reffaisyed0@gmail.com',
            from: 'haseebshah.reffai@gmail.com',
            subject: 'Regarding My Portfolio App',
            html: `
                <h5>Detail Information</h5>
                <ul>
                   <li><p>Name: ${fname} ${lname}</p></li>
                   <li><p>email: ${email}</p></li>
                </ul>
                <p>Message: ${message}</p>
            `
        })
        return res.status(200).send({
            success: true,
            message: "Your message send successfully"
        })
     } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Send Email Not Send",
            error
        })
     }
};

module.exports = { sendEmailController }