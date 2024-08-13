import express, { Application, Request, Response } from "express";
import { dbConnect } from "./config/dbConnect";
import userRoutes from "./routes/userRoutes"
import blogRoutes from "./routes/blogRoutes"
const app: Application = express();
require("dotenv").config();
import cors from "cors"
// Body parsing middleware
app.use(express.json());

// API routes
app.use(cors())
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Redirect root to the authentication API
// app.get("/", (req: Request, res: Response) => {
//     return res.redirect("/api/v1/auth");
// });

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not specified

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
dbConnect();
