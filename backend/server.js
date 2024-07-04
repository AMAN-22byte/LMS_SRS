import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "../config/db";
import {errorHandler } from "./middlewares/error";

dotenv.config();  // attach env var in

const app = express();  // create express app
app.use(cors());  // enable cors
app.use(express.json());  // parse json body these two are middlewares
const port= process.env.PORT || 5000;

//Routes
app.use("/api/videos", videoRoutes);  // one end point for mongodb storing
app.use("/api/sign-upload", signUploadRoutes);  // generate signature for autheticated
app.use (errorHandler);
//listen req 
app.listen(port,()=>{
    //connect t db
    connectDB();  // inside config folder
    console.log(`Server is running on port ${port}`);
});
