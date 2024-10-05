"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BasicParams_1 = require("./BasicParams");
const DeputySchema = new mongoose_1.Schema({
    ...BasicParams_1.basicParams,
    position: {
        required: true,
        type: String
    },
    biography: {
        required: true,
        type: String
    },
    votes: {
        required: true,
        type: Number
    },
});
exports.default = (0, mongoose_1.model)('DeputyModel', DeputySchema);
