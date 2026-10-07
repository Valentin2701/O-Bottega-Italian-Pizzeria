import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: "https://o-bottega.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

export const configExpress = (app) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
};