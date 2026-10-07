import express from "express";
import mongoose from "mongoose";
import { configExpress } from "./configs/configExpress.js";
import { router as routes } from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

configExpress(app);

app.use(authMiddleware);

app.use(routes);

app.use(errorMiddleware);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB connected!");
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}...`)
    );
  })
  .catch((err) => console.log("Failed connecting DB", err));
