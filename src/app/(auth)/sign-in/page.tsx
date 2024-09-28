"use client"

import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignIn() {
    const { status } = useSession();

    if (status === "authenticated") redirect("/app")
    const handleSignup = async () => {
        await signIn('github', { callbackUrl: '/app' });
    };

    return (
        <div>

            <button className='border-[.7px] px-3 py-2 b' onClick={handleSignup}>Sign In with GitHub</button>
        </div>
    );
}
