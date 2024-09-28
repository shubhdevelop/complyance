"use client"

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { AnimatedModal } from '@/components/Modal';
import { TransactionFrom } from '@/components/TransactionForm';
import LogTable from '@/components/LogTable';
import TransactionTable from '@/components/TransactionTable';

function App() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    return (
        <>
            <div className='w-full flex justify-end'>
                <AnimatedModal trigger={
                    <Button className="bg-blue-700 border-[.3px] px-3 py-2 text-white" onClick={() => { }}>Submit New Transaction</Button>
                }>
                    <TransactionFrom />
                </AnimatedModal>
            </div>
            <TransactionTable />
            <LogTable />
        </>

    )
}

export default App;

