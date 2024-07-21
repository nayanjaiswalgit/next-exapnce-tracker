"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { signUpschema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TbLoader2 } from "react-icons/tb";
import { Button } from "@/components/ui/button";
const SignIn = () => {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmittion] = useState(false);
    const debounce = useDebounceCallback(setUsername, 500);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpschema>>({
        resolver: zodResolver(signUpschema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });
    console.log(usernameMessage)
    useEffect(() => {
        const checkUsernameUniqueness = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try {
                    const res = await fetch(
                        `/api/check-username-unique?username=${username}`
                    );
                    console.log(res);
                    if (res.ok) {
                        const data = await res.json();
                        setUsernameMessage(data.message);

                        return data.available;
                    }
                } catch (error) {
                    const axiosError = error as AxiosError;
                    console.log(axiosError)
                    setUsernameMessage(String(axiosError?.response?.data) ?? "Error checking username");
                    console.error("Error checking username availability:", error);
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUsernameUniqueness();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpschema>) => {
        setIsSubmittion(true)
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data)
            router.replace('/verify/${username}')
        }
        catch (error) {
            const axiosError = error as AxiosError;
            console.error("Error signing up user:", axiosError?.response?.data ?? "Error signing up user")
            setIsSubmittion(false)
        }
    }

    return <div className=" flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-start"
            >
                <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
                <p className="mb-4">Sign up to start your adventure</p>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounce(e.target.value)
                                            }} />
                                    </FormControl>
                                    {/* <FormDescription>This is Your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        {usernameMessage}
                        {isCheckingUsername && <TbLoader2 className="animate-spin" />}

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is Your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is Your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <Button type="submit">{
                            isSubmitting ? (
                                <>
                                    <TbLoader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                </>
                            ) : ('Signup')
                        }</Button>
                    </form>

                </Form>





            </div>
        </div>



    </div>;
};

export default SignIn;
