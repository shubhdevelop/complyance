"use client"

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';

export default function SignUp() {
    const handleSignup = async () => {
        await signIn('github', { callbackUrl: '/select-role' });
    };

    return (
        <div className='border-[.7px] shadow-xl gap-3 mt-24 h-[500px] w-[700px] ml-auto mr-auto rounded-xl flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='font-extrabold underline underline-offset-2 text-xl'>Sign Up </h1>
            </div>
            <div className='border-[.7px] px-3 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer' onClick={handleSignup}> <GitHubLogoIcon /> Sign up with GitHub</div>
        </div >
    );
}
