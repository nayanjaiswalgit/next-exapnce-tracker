import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

export async function connectDB(): Promise<void> {
    if(connection.isConnected) return


    try {
        const db = await mongoose.connect(process.env.MONGO_URL!);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }

}

export default connectDB;