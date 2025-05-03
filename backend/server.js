import { config } from "dotenv";
import express from "express";

import cloudinary from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// used to access cookies generated
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// alternative of multer
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connection();
app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
