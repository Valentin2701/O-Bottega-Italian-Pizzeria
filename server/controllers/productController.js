import express from "express";
import mongoose from "mongoose";
import { isAuth } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import * as productService from "../services/productService.js";
import * as authService from "../services/authService.js";
import { ObjectId } from "bson";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getAll();

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/recent", async (req, res, next) => {
  try {
    const products = await productService.getRecent();

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAuth, adminOnly, async (req, res, next) => {
  const data = req.body;

  try {
    await productService.create({
      ...data,
      owner: req.user?._id,
    });

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.post("/buy", isAuth, async (req, res, next) => {
  const { products } = req.body;
  const userId = req.user?._id;
  try {
    const productIds = products.map(product => ObjectId.createFromHexString(product._id));
    await productService.buy(productIds, userId);
    productIds.forEach(async (id) => await productService.removeFromCart(id, userId));

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    const { search } = req.body;
    const products = await productService.search(search);

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/cart", isAuth, async (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;
  console.log("Adding product to cart:", productId, "for user:", user?._id);
  try {
    const product = await productService.getSingle(productId);
    if (user?._id != product.owner)
      await productService.addToCart(productId, user?._id);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.get("/cart", isAuth, async (req, res, next) => {
  const userId = req.user?._id;
  try {
    const user = await productService.getCart(userId);
    console.log(user.cart);

    res.status(200).json(user.cart);
  } catch (err) {
    next(err);
  }
});

router.delete("/cart/:id", isAuth, async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user?._id;
  try {
    const user = await authService.getUser(userId);
    if (user.cart.some((id) => id == productId))
      await productService.removeFromCart(
        ObjectId.createFromHexString(productId),
        userId
      );

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log("Ran this route");
    const product = await productService.getSingle(productId);

    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isAuth, adminOnly, async (req, res, next) => {
  const productId = req.params.id;
  const user = req.user;
  const data = req.body;
  const product = await productService.getSingle(
    ObjectId.createFromHexString(productId)
  );
  try {
    if (product.owner == user?._id)
      await productService.edit(ObjectId.createFromHexString(productId), data);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAuth, adminOnly, async (req, res, next) => {
  const user = req.user;
  const productId = req.params.id;
  const product = await productService.getSingle(
    ObjectId.createFromHexString(productId)
  );
  try {
    if (product.owner == user?._id)
      await productService.remove(ObjectId.createFromHexString(productId));

    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

export { router };
