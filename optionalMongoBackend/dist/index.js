"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_1 = require("./config/dbConnect");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const app = (0, express_1.default)();
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
// Body parsing middleware
app.use(express_1.default.json());
// API routes
app.use((0, cors_1.default)());
app.use("/api/v1/auth", userRoutes_1.default);
app.use("/api/v1/blog", blogRoutes_1.default);
// Redirect root to the authentication API
// app.get("/", (req: Request, res: Response) => {
//     return res.redirect("/api/v1/auth");
// });
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not specified
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Connect to the database
(0, dbConnect_1.dbConnect)();
