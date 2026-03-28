import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import db from "./util/db.js";
//router imports
import userRouter from "./routes/auth.routes.js";


dotenv.config()

const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin: true,
    credentials: true,
    methods:['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders:['Content-Type', 'Authorization']
}))
app.options("*", cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users", userRouter)

// DB connect
    db()
app.listen(port,()=>{
    console.log(`Port connected✅ ${port}`)
}) 




