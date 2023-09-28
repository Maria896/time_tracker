import JWT from "jsonwebtoken"

export const authHandler = (req, res, next) => {
    try {
     let token = req.headers.authorization;
     if (token) {
         token = token.split(" ")[1];
         let user = JWT.verify(token, process.env.JWT_SECRET_KEY);
         req.userId = user.id;
         req.userEmail = user.email
         //console.log(user)
         console.log("User ID:", req.userId);
         next();
     } else {
         res.status(401).json({ message: "Unauthorized User" });
     }
    } catch (error) {
     res.status(500).json({ message: "Internal server error", error });
    }
 };