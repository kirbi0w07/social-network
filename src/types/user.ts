import type { Profile } from "./profile";

export interface User {
    id: number;
    name: string;
    email: string;
    last_name: string;
    profile: Profile
}

