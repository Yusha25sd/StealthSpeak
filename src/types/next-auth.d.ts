import nextAuth, { DefaultSession } from "next-auth";
import { DefaultSerializer } from "v8";

declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
    interface Session{
        user: {
            _id?: string;
            isVerified: boolean;
            isAcceptingMessages?: boolean;
            username?: string
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
}




