"use client"

import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignUp() {

    const { status } = useSession();

    if (status === "authenticated") redirect("/dashboard")

    const handleSignup = async () => {
        await signIn('github', { callbackUrl: '/dashboard' });
    };

    return (
        <div>
            <button className='border-[.7px] px-3 py-2 b' onClick={handleSignup}>Sign up with GitHub</button>
        </div>
    );
}
