import { verifySchema } from '@/schemas/verifySchema'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { z } from "zod";

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const VerifyAccount = () => {
    const router = useRouter()
    const param = useParams<{ username: string }>()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: param.username,
                code: data.code,
            })
            console.log(response)
            router.replace('sign-in')
        }
        catch (error) {
            alert('Invalid verification code')
            form.reset()
        }
    }

    return (
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
    )
}

export default VerifyAccount