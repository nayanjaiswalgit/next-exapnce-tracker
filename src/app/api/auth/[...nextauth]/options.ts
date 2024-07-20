import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModal from "@/models/User";

export const authOptions = {
 
};