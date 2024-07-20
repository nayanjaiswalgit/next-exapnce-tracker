import { Button } from "@/components/nayana-ui/button";
import { Input } from "@/components/nayana-ui/input";
import { FcGoogle } from "react-icons/fc";

import Image from "next/image";
import React from "react";
import { login } from "@/lib/action";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden md:flex w-full">
        {/* Left Side */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center md:text-left">Login</h2>
          <form  action={login} className="space-y-4">
            <Input name="email" label="Email" type="email" placeholder="Enter your email" />
            <Input name="password" label="Password" type="password" placeholder="Enter your password" />
            <div className="flex items-center justify-between">
              <div className="flex items-center mb-6">
                <input type="checkbox" id="remember_me" className="mr-2" />
                <label htmlFor="remember_me" className="text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2  rounded-md">
              Submit
            </Button>
          </form>
          <div className="mt-3">
            <p className="text-center text-gray-500">or</p>
          </div>
          <div className="mt-3">
            <Button icon ={<FcGoogle style={{fontSize:"20px"}}/>} className="w-full bg-white border border-gray-300 text-black py-2 rounded-md ">
            
              Login With Google
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 relative">
          <div className="hidden md:block absolute inset-0 overflow-hidden rounded-xl">
            <Image
              src="/login.png"
              alt="Login Image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
