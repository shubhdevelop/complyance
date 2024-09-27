"use client"

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Dashboard() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    return (
        <>
            <div>Dashboard</div>
            <button className='bg-red-500 border-[.3px] px-3 py-2 text-white' onClick={() => signOut()}>Sign out</button>
        </>

    )
}

export default Dashboard