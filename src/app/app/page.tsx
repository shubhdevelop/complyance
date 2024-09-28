"use client"

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Dashboard() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    return (
        <>
            <div className='w-full flex justify-end'>
                <Button className="bg-blue-700 border-[.3px] px-3 py-2 text-white" onClick={() => { }}>Submit New Transaction</Button>
            </div>
        </>

    )
}

export default Dashboard