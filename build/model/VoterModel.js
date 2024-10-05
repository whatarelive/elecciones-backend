"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BasicParams_1 = require("./BasicParams");
const VoterSchema = new mongoose_1.Schema({
    ...BasicParams_1.basicParams,
    ci: {
        required: true,
        unique: true,
        type: String
    },
    isValidVoter: {
        required: true,
        type: Boolean
    }
});
exports.default = (0, mongoose_1.model)('VoterModel', VoterSchema);
