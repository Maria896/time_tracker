export const adminHandler = (req, res, next) => {
    if (req.user && req.user.role === "OWNER") {
      next();
    } else {
      res.statusCode = 401;
      throw new Error('Unauthorized');
    }
  };