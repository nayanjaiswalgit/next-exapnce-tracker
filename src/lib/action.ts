'use server'
import {z} from "zod";
import { axiosInstance } from "./axios";
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    email: z.string(),
    password: z.string(),
})

const Login = FormSchema.omit({});

export async function login(fromData : FormData){
    console.log(fromData)
    const cred = Login.parse({
        email: fromData.get('email'),
        password: fromData.get('password')
    })
   await axiosInstance.post('/users/login/',cred)
   redirect('/');

    
}