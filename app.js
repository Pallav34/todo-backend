import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app= express();

//const router = express.Router();

config({
    path:"./Data/config.env"
})

//middlewares to access req.body
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, //send credentials to frontend
}))
//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.get("/",(req,res)=>{
    res.send("Nice working");
})

//middleware to handle errors
app.use(errorMiddleware);
