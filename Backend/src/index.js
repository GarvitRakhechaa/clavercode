import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

dotenv.config()
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res)=> {
    res.send("ClaverCode: launching soon ❤️‍🔥🔥 ")
})


app.use("/api/v1/auth", authRoutes)

app.listen(PORT, ()=> {
    console.log(`server is listening on `, PORT);
})


