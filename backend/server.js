import path from "path"

import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import { app, server } from "./socket/socket.js"


const allowedOrigins = [
  "http://localhost:3000",               // for local dev
  "https://chat-app-wk5z.onrender.com"   // your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())


const __dirname = path.resolve() 

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"



console.log("Loaded MONGO_URL:", process.env.MONGO_URL);



const PORT = process.env.PORT || 5001

import connectToMongoDb from "./db/connectToMongoDB.js"

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get((req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`Server running on PORT ${PORT}`);
})