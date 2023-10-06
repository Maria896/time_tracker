import JWT from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authHandler = async (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      try {
        let [, token] = req.headers.authorization.split(' ');
        let { id } = JWT.verify(token, process.env.JWT_SECRET_KEY);
        let user = await prisma.user.findUnique({
            where:{
                id:id
            }
        });
        req.userId = user.id
        req.user = user;
        next();
      } catch (error) {
        console.log(error);
        res.statusCode = 401;
        throw new Error('Unauthorized');
      }
    } else {
      res.statusCode = 401;
      throw new Error('Unauthorized');
    }
  };