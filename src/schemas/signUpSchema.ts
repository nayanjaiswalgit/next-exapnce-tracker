import { z } from "zod";

export const userNameValidation = z.string()
  .min(2, "UserName must be at least 2 characters")
  .max(20, "UserName must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters");

export const signUpschema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
