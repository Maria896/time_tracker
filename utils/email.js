import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jarrod.bauch58@ethereal.email',
        pass: '2CCV7EWNZZ4BsTnNGC'
    }
});