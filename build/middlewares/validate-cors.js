"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCors = void 0;
const cors_1 = __importDefault(require("cors"));
const ACCEPTED_ORIGIN = [
    'http://localhost:5173/'
];
const validateCors = () => {
    return (0, cors_1.default)({
        origin(requestOrigin, callback) {
            if (ACCEPTED_ORIGIN.includes(requestOrigin)) {
                return callback(null, true);
            }
            if (!requestOrigin) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
    });
};
exports.validateCors = validateCors;
