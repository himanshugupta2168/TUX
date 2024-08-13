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
const blogSchema_1 = __importDefault(require("../models/blogSchema"));
const router = (0, express_1.Router)();
const authMiddleware_1 = require("../authMiddleware");
router.get("/bulk", authMiddleware_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogSchema_1.default.find({
            published: true,
        }).populate("authorId", "-password").sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Blogs fetched Successfully",
            data: blogs,
        });
    }
    catch (error) {
        console.error("Error fetching published blogs:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch published blogs at the moment",
            error: error.message,
        });
    }
}));
router.get("/:id", authMiddleware_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blog = yield blogSchema_1.default.findById({
            _id: id,
        }).populate("authorId", "-password");
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        });
    }
    catch (error) {
        console.error("Error fetching blog by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch blog at the moment",
            error: error.message,
        });
    }
}));
router.post("/publish", authMiddleware_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = cohort_medium_common_1.createBlogInput.safeParse(req.body);
        if (!success) {
            throw new Error("Invalid Data type");
        }
        let title = req.body.title;
        let content = req.body.content;
        const response = yield blogSchema_1.default.create({
            title: title,
            content: content,
            authorId: req.body.authorId,
        });
        if (!response) {
            throw new Error("Error in publishing blog");
        }
        return res.status(200).json({
            success: true,
            message: "Blog Published Successfully",
        });
    }
    catch (error) {
        console.error("Error in creating blog:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating blog",
            error: error.message,
        });
    }
}));
exports.default = router;
