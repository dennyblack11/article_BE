"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogModel = new mongoose_1.Schema({
    authorName: {
        type: String,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    content: {
        type: String,
    },
    displayImage: {
        type: String,
    },
    displayImageID: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("blogs", blogModel);
