import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const db= ()=>{
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("✅ MongoDB connected"))
        .catch((err)=> console.log("Couldnot connect to MongoDB"))
}

export default db
