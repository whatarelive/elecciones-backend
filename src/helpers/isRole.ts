import { Role } from '../interfaces/interfaces';

// TypeGuard del Type Role.
export const isRole = (object: any): object is Role => {
    return 'Admin' in object || 'User' in object
} 
