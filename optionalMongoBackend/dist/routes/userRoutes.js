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
const express_1 = require("express");
const cohort_medium_common_1 = require("cohort-medium-common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = cohort_medium_common_1.signInInput.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid Input formats" });
        }
        const salts = yield bcrypt_1.default.genSalt(parseInt(process.env.SALTS, 10));
        const hash = yield bcrypt_1.default.hash(req.body.password, salts);
        const user = yield userSchema_1.default.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token: `Bearer_${token}`,
            name: user.name
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ success: false, message: "Unable to create user at the moment", error: error.message });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = cohort_medium_common_1.signInInput.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid input formats" });
        }
        const user = yield userSchema_1.default.findOne({
            email: req.body.email,
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const comparedPasswords = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!comparedPasswords) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: `Bearer_${token}`,
            name: user.name
        });
    }
    catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ success: false, message: "Unable to sign in user at the moment", error: error.message });
    }
}));
router.get("/", (req, res) => {
    return res.send("Hello");
});
exports.default = router;
