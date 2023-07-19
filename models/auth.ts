export interface LoginPayload {
    username: string;
    password: string;
}
export interface RespAuthData {
    accessToken: string;
    expiredAt: string;
}

export interface UserProfile {
    username: string;
    role: string;
}
