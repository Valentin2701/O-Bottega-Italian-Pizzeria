import express from "express";
import {router as authController} from "./controllers/authController.js";
import {router as productController} from "./controllers/productController.js"

const router = express.Router();

router.use(authController);
router.use("/products", productController);

export { router };