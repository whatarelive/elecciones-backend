"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRole = void 0;
// TypeGuard del Type Role.
const isRole = (object) => {
    return 'Admin' in object || 'User' in object;
};
exports.isRole = isRole;
