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
exports.stream = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const stream = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary_1.default.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    }
                    else {
                        reject(error);
                    }
                });
                streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        function upload(req) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield streamUpload(req);
            });
        }
        return upload(req);
    }
    catch (error) {
        return error;
    }
});
exports.stream = stream;
