"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BasicParams_1 = require("./BasicParams");
const AdminSchema = new mongoose_1.Schema({
    name: BasicParams_1.basicParams['name'],
    password: {
        type: String,
        required: true,
    }
});
exports.default = (0, mongoose_1.model)('AdminModel', AdminSchema);
