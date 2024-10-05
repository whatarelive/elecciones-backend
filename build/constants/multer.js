"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, '/src/images/upload');
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage });
