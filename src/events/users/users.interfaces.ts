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

export interface UserPush {
    id: number;
    endpoints:[Endpoint]
}

export interface Endpoint {
    endpoint:String;
    expirationTime?: string;
    keys: {
        auth:String,
        p256dh:String,
    }
}
