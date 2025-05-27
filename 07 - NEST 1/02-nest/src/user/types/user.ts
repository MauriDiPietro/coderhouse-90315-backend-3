export interface UserLogin {
    email: string;
    password: string;
}

export interface RequestUser extends Request {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    }
}