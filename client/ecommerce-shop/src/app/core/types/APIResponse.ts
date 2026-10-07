import { User } from "./User";

export interface APIResponse{
    user: User | null,
    error: boolean,
    message: string,
}