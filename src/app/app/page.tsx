"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AnimatedModal } from '@/components/Modal';
import { TransactionFrom } from '@/components/TransactionForm';
import LogTable from '@/components/LogTable';
import TransactionTable from '@/components/TransactionTable';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import User from '@/model/User.model';
import toast from 'react-hot-toast';

function App() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-in")
    const [active, setActive] = useState('transaction')
    const [self, setSelf] = useState<User>();
    const role = self?.role;
    const isManagerOrAdmin = "ADMIN" === role || role === "MANAGER";
    const [logData, setLogData] = useState([]);
    const [transactionData, seTtransactionData] = useState([]);

    async function getSelf() {
        try {
            const response = await fetch('/api/users/self', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important for including cookies (session)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to Get Users');
            }

            const result = await response.json();

            setSelf(result.user)
        } catch (error) {
            console.error('Error Fetching transaction:', error);
            throw error;
        }
    }


    async function getLogs() {
        try {

            const response = await fetch('/api/logs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important for including cookies (session)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create transaction');
            }

            const result = await response.json();
            setLogData(result.logs)
        } catch (error) {
            console.error('Error Fetching transaction:', error);
            throw error;
        }
    }


    async function getTransaction() {
        try {
            const response = await fetch('/api/transactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important for including cookies (session)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create transaction');
            }

            const result = await response.json();
            console.log(result);

            seTtransactionData(result.transaction)
        } catch (error) {
            toast.error(`Error ${error}`)
        }
    }

    useEffect(() => {
        getSelf()
        getLogs()
        getTransaction()
    }, [setLogData, seTtransactionData])


    return (
        <>
            <NavigationMenu >
                <NavigationMenuList className='flex gap-5 '>
                    <NavigationMenuItem className={`${active === "transaction" ? "border-b-[3px]" : ""} p-3 border-black cursor-pointer  `} onClick={() => setActive("transaction")}>
                        <Link href={"?transaction"}>
                            Transactions
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={` p-3 border-black cursor-pointer  `} onClick={() => setActive("transaction")}>
                        |
                    </NavigationMenuItem>
                    {
                        isManagerOrAdmin ? <NavigationMenuItem className={`${active === "logs" ? "border-b-[3px]" : ""} p-3 border-black cursor-pointer `} onClick={() => setActive("logs")}>
                            <Link href={"?log"}>
                                Log
                            </Link>
                        </NavigationMenuItem> : null
                    }

                </NavigationMenuList>
            </NavigationMenu >
            <div className='w-full flex justify-end'>
                <AnimatedModal trigger={
                    <div className="bg-blue-700 border-[.3px] px-3 py-2 text-white rounded-md">Submit New Transaction</div>
                }>
                    <TransactionFrom update={getTransaction} />
                </AnimatedModal>

            </div>
            <p className='text-lg'><b>Current Role</b> : <span className='text-blue-600'>{self?.role}</span></p>
            {
                active === "logs" ? <LogTable data={logData} setData={setLogData} /> : <TransactionTable data={transactionData} setData={seTtransactionData} />
            }
        </>

    )
}

export default App;

