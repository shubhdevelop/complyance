"use client"

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

function Profile() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    return (
        <Button className='bg-red-500 border-[.3px]px - 3 py - 2 text - white'
            onClick={() => signOut()
            }>
            Sign out
        </Button >
    )
}

export default Profile