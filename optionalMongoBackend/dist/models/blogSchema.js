"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: true,
    },
    authorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.default = mongoose_1.default.model("Blog", BlogSchema);
