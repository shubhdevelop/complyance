"use client"

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignUp() {
    const { data: session, status } = useSession();

    if (status !== "authenticated") redirect("/sign-up")

    return (
        <div className='border-[.7px] shadow-xl gap-3 mt-24 h-[500px] w-[700px] ml-auto mr-auto rounded-xl flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='font-extrabold  text-xl'>Profile</h1>
                <img src={session.user?.image || ""} width={300} height={300} alt="Profile-pc" className='rounded-full' />
                <h3 className='font-black text-lg'>Email</h3>
                <p>{session.user?.email}</p>
            </div>

            <Button className='bg-red-500 border-[.3px]px - 3 py - 2 text - white'
                onClick={() => signOut()
                }>
                Sign out
            </Button >
        </div>
    );
}