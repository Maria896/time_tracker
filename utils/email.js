import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'joesph88@ethereal.email',
        pass: 'Pcz5sGGFqsCrjDng7E'
    }
});