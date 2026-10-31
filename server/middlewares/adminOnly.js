const ADMIN_EMAIL = "administrator@gmail.com";

export const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "You must be an admin to access this route."
    });
  }

  if (req.user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Administrator access required."
    });
  }

  next();
};