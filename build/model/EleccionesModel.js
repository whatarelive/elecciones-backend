"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EleccionesSchema = new mongoose_1.Schema({
    elecciones: {
        type: String,
        unique: true,
        required: true
    },
    finalDate: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('EleccionesModel', EleccionesSchema);
