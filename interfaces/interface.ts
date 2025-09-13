import { UserRole } from "./enum";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    accessToken: string;
    refreshToken?: string;
}

export interface Finding {
    id: string;
    name: string;
    confidence: number;
    priority: string;
    priorityColor: string;
    coordinates?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}