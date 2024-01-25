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
exports.viewOneUserBlog = exports.viewAllBlogs = exports.createBlog = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const blogModel_1 = __importDefault(require("../model/blogModel"));
const stream_1 = require("../utils/stream");
const mongoose_1 = require("mongoose");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, content, category } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const { secure_url, public_id } = yield (0, stream_1.stream)(req);
        if (user) {
            const blog = yield blogModel_1.default.create({
                authorName: user.FullName,
                title,
                content,
                category,
                displayImage: secure_url,
                displayImageID: public_id,
            });
            user === null || user === void 0 ? void 0 : user.blogs.push(new mongoose_1.Types.ObjectId(blog._id));
            user.save();
            return res.status(201).json({
                message: "Blog created",
                data: blog,
                status: 201,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating Blog",
            data: error.message,
            status: 404,
        });
    }
});
exports.createBlog = createBlog;
const viewAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield blogModel_1.default.find();
        return res.status(200).json({
            message: "finding all blog",
            data: user,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error finding all blog",
            status: 404,
        });
    }
});
exports.viewAllBlogs = viewAllBlogs;
const viewOneUserBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const blog = yield userModel_1.default.findById(userID).populate({
            path: "blogs",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "finding one user's blog",
            data: blog,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error finding one user",
            status: 404,
        });
    }
});
exports.viewOneUserBlog = viewOneUserBlog;
