import * as jwt from "../lib/jsonwebtoken.js";
import { getCart } from "../services/productService.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.auth;

  if (!token) {
    return next();
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET);

    req.user = decodedToken;

    return next();
  } catch (err) {
    req.user = undefined;
    return next();
  }
};

export const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};

export const isGuest = (req, res, next) => {
  if(req.user) return res.status(402);
  next();
}