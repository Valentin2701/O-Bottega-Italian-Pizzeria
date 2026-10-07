import express from "express";
import * as authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", isGuest, async (req, res, next) => {
  const userData = req.body;
  try {
    if (userData.password !== userData.rePass)
      throw new Error("Passwords don't match!");

    const result = await authService.register({
      ...userData,
      password: userData.passGroup.password,
    });

    res.cookie("auth", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ user: result.user, message: "Registered successfully!" });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", isGuest, async (req, res, next) => {
  const userData = req.body;
  try {
    const result = await authService.login(userData);

    res.cookie("auth", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ user: result.user, message: "Logged in succesfully" });
  } catch (err) {
    return next(err);
  }
});

router.post("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.end();
});

router.get("/user", async (req, res) => {
  const userId = req.user?._id;
  const user = await authService.getUser(userId);
  res.json(user);
});

export { router };
