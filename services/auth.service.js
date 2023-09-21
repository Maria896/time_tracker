import bcrypt from "bcrypt";
import crypto from "crypto"
import { transporter } from "../utils/email.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const register = async (name, email, password) => {
    
  try {
  const user = await prisma.User.findUnique({
    where: {
      email: email
    }
  });
  console.log("after finding user")
  if (user && user.is_verified == true) {
    throw {
        status:409,
        message:"User already exists please try another email"

    }
  } else if (user && user.is_verified == false) {
    const deleteUser = await prisma.User.delete({
      where: {
        email: email,
      },
    });
  }

  // Handle the 'user' object here
} catch (error) {
  console.error('Error:', error);
}
  
//const hashedPassword = bcrypt.hashSync(password, 10);
const verificationToken = generateVerificationToken();
  //console.log(verificationToken)

  const createdUser = await prisma.User.create({
    data: {
      name: name,
      email: email,
      password: password,
      verification_token: verificationToken
    },
  });

  if(!createdUser){
    throw {
        status: 400,
        message: "User not created",
      };
  }else{
    await sendEmailVerificationLink(createdUser.email,verificationToken);
    return{
        status:201,
        message: "Register successfully. Please check your email to verify your account.",
    }
  }

  
};

// Function for hashed password
const hashedPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

// Function for creating verification token
const generateVerificationToken = () => {
  let token;
  crypto.randomBytes(10, function (err, buffer) {
    token = buffer.toString("hex");
  });
  return token;
};

// Send Email Verification Link
const sendEmailVerificationLink = async (to, token) => {
	console.log(to, token);
	try {
		await transporter.sendMail({
			from: "admin@gmail.com",
			to: to,
			subject: "Verify Your Account",
			html: `<p>Please click the following link to verify your account:</p><p><a href="http://localhost:5173/email-verification/${token}">Verify Now`,
		});
		console.log("Email sent");
	} catch (error) {
		console.log("Email not sent", error);
	}
};