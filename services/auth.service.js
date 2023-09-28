import bcrypt from "bcrypt";
import crypto from "crypto";
import Jwt from "jsonwebtoken";
import { transporter } from "../utils/email.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (name, email, password) => {
  const user = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (user && user.is_verified == true) {
    throw {
      status: 409,
      message: "User already exists please try another email",
    };
  } else if (user && user.is_verified == false) {
    const deleteUser = await prisma.User.delete({
      where: {
        email: email,
      },
    });
  }

  const hashPassword = hashedPassword(password);
  const verificationToken = generateVerificationToken();
  // console.log(verificationToken);
  // console.log(`Name : ${name}, Email: ${email}, Password: ${password}`);
  const tokenExpirationTime = new Date();
  tokenExpirationTime.setMinutes(tokenExpirationTime.getMinutes() + 15);
  const createdUser = await prisma.User.create({
    data: {
      name: name,
      email: email,
      password: hashPassword,
      verification_token: verificationToken,
      designation: "PRODUCT_MANAGER",
      token_expiration : tokenExpirationTime
    },
  });

  if (!createdUser) {
    throw {
      status: 400,
      message: "User not created",
    };
  } else {
    await sendEmailVerificationLink(createdUser.email, verificationToken);
    return {
      status: 201,
      message:
        "Register successfully. Please check your email to verify your account.",
    };
  }

  
}


export const verifyUserEmail = async (token) => {
  const user = await prisma.User.findFirst({
    where: {
      verification_token: token,
    },
  });
  //console.log(user);
  if (!user && user.token_expiration < Date.now()) {
    throw {
      status: 404,
      message: "Invalid link",
    };
  } else {
    const verifiedUser = await prisma.User.update({
      where: {
        email: user.email,
      },
      data: {
        is_verified: true,
        verification_token : null
      },
    });
    return {
      status: 201,
      message: "Your email has been verified successfully",
    };
  }
};

export const login = async (email, password) => {
  const user = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw {
      status: 400,
      message: "User not found",
    };
  }
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    throw {
      status: 401,
      message: "Invalid password please enter valid password",
    };
  }
  const sceretKey = process.env.JWT_SECRET_Key;
  const token = Jwt.sign({ id: user.id }, sceretKey, { expiresIn: "7d" });
  return {
    status: 200,
    message: "Login successful.",
    token: token,
  };
};
 
export const joinAsATeamMember = async (organizationEmail,userEmail) => {
  // if(role === "EMPLOYEE"){
  //   const employee = await prisma.User.update({
  //     where: {
  //       email: userEmail,
  //     },
  //     data: {
  //       role:role
  //     },
  // })
  const findOrganization = await prisma.User.findUnique({
    where:{
      email:organizationEmail
    }
  })
  
  if(!findOrganization){
    throw {
      status: 401,
      message: "Organization not found please enter valid email",
    };
  }else{
    await sendEMailForInvitation(userEmail);
    return {
      status: 201,
      message:
        "Email sent please wait for confrimation",
    };
  }

}

export const createOrganization = async(role,organizationName,industryType,companyStrength,userEmail)=>{
  if(role === "OWNER"){
  //   const owner = await prisma.User.update({
  //     where: {
  //       email: userEmail,
  //     },
  //     data: {
  //       role:role
  //     },
  // })
  const createdOrganization = await prisma.Organization.create({
    data: {
      organization_name:organizationName,
      owner:userEmail,
      industry_type:industryType,
      company_strength : companyStrength,
    }
  })
  console.log(createOrganization)
  return {
    status: 201,
    message:"Organization created",
  };
  }
}

// Function for hashed password
const hashedPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

// Function for creating verification token
const generateVerificationToken = () => {
  const buffer = crypto.randomBytes(20);
  return buffer.toString("hex");
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

const sendEMailForInvitation = async (to) => {

  try {
    await transporter.sendMail({
      from: "admin@gmail.com",
      to: to,
      subject: "Request for Membership",
      html: `<p>Sending request to join your organization</p>`,
    });
    console.log("Sent Email for invitation");
  } catch (error) {
    console.log("Email not sent", error);
  }
};
