
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cookieParser())

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

import connectToMongoDb from "./db/connecttoMongoDb.js"

const PORT = process.env.PORT || 5001

app.get("/",(req,res)=>{
    // route route http://localhost:5001/
    res.send("Hello World!!")

})

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`Server running on PORT ${PORT}`);
})