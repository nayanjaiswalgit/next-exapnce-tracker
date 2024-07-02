    import { connect } from "@/dbConfig/dbConfig";
    import User from "@/models/userModal";
    import { NextRequest, NextResponse } from "next/server";
    import bcryptjs from "bcryptjs";
    import jwt from "jsonwebtoken";

    connect();

    export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('Request Body:', reqBody);

        // Find user by email
        const user = await User.findOne({ email });
        console.log('User from DB:', user);

        if (!user) {
        return NextResponse.json(
            { error: "User does not exist" },
            { status: 400 }
        );
        }

        console.log('Stored Hashed Password:', user.password);

        // Compare provided password with stored hashed password
        const validPassword = await bcryptjs.compare(password, user.password);
        console.log('Password Valid:', validPassword);

        if (!validPassword) {
        return NextResponse.json(
            { error: "Invalid Password" },
            { status: 400 }
        );
        }

        // Generate JWT token
        const tokenData = {
        id: user._id,
        username: user.username,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: '1d'
        });

        // Return response with token set in cookie
        const response = NextResponse.json({
        message: "Logged In successfully",
        success: true
        });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    }
