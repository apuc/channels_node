export interface User {
    username: string;
    avatar: string | null;
    user_id: number;
    email: string;
}

export interface friendRequest {
    to: number;
    from: User;
}
