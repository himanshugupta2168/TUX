"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token available" });
        }
        const key = token.split("_").splice(1).join("_");
        const decodedToken = yield jsonwebtoken_1.default.verify(key, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }
        req.body.authorId = decodedToken.userId;
        next();
    }
    catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});
exports.Authenticate = Authenticate;
