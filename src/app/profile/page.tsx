"use client"

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

function Profile() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    return (
        <div className='w-full h-full m-3 bg-red-600' >
            <button className='bg-red-500 border-[.3px]px - 3 py - 2 text - white'
                onClick={() => signOut()
                }>
                Sign out
            </button >
        </div >

    )
}

export default Profile