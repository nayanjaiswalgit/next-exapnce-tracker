import 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: stringl
        isVerfired?: boolean,
        username: string,
        email: string,
        password: string,
        forgotPasswordToken?: string,
        forgotPasswordTokenExpiry?: Date,

    }
    interface Session {
        user: {
            _id: string,
            username: string,
            email: string,
            isVerified: boolean,
        } & DefaultSession['user'],
    }
}

declare module 'next-auth/jwt' {
interface JWT {
    _id?: string,
    username: string,
    email: string,
    isVerified: boolean,
 
}

}