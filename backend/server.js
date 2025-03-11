import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// continue to watch the video
//https://youtu.be/lx3YJj0nJVk?t=8579

app.use(express.json());
app.use(cors());
app.use(helmet()); //helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // this will log the request

// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req,{
            requested:1 //each request is 1 token
            }    
        );
        if(decision.isDenied()){
            if(decision.isRateLimit()){
                return res.status(429).json({error:"Too many requests"});
            } else if(decision.isBot()){
                return res.status(403).json({error:"You are a bot"});
            } else {
                return res.status(403).json({error:"You are not allowed to access this resource"});
            }
            return;
        }

        // check or spoofed bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error:"You are a spoofed bot"});
            return;
        }
        next();
    }catch(error){
        console.log("Error in arcjet", error);
        next(error);
    }

});

app.use("/api/products", productRoutes);

// create a table in the database
async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        console.log("Database initialized");
    } catch (error) {
        console.log("Error initDB", error)
    }
}


initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})