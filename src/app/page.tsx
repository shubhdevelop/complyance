'use client'

import AuthButton from "@/components/AuthButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession()
  if (status == "authenticated") redirect("/app")
  return (
    <div className='w-full h-full p-10 flex flex-row justify-center items-center'>
      <div className="">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-blue-400">Welcome to Complayance</h3>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">E-Invoicing Simplified for businesses</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4 " >Optimize compliance regulations, improve transaction security, and streamline your billing processes <br /> saving time and reducing errors</p>
        <AuthButton variant="Sign Up" to="sign-up" />
      </div>
      <div>
        <img src="https://cdn.prod.website-files.com/6595090b1c3579f5d318fc1b/65c0d1a2b888d8bf41250610_hero-images-p-2000.png" alt="hero image" width={800} height={800} />
      </div>
    </div>
  );
}
