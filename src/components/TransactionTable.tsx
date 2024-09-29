import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
import { normalColumns, empColumns } from './transaction-columns'
import User from '@/model/User.model'
import CsvDownloader from './CsvDownload'
import toast from 'react-hot-toast'

export type Transaction = {
    id: string
    amount: number
    status: "PENDING" | "APPROVED" | "REJECTED",
    createdBy: string,
}

function TransactionTable() {
    const [data, setData] = useState([]);
    const [self, setSelf] = useState<User>();

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

            setData(result.transaction)
        } catch (error) {
            toast.error(`Error ${error}`)
        }
    }

    useEffect(() => {
        getSelf()
        getTransaction()
    }, [setData])

    return (
        <>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>TRANSACTIONS ({data.length})</h1> <CsvDownloader transactions={data} text={"Download All Transaction"} />
            <DataTable columns={self?.role === "EMPLOYEE" ? empColumns : normalColumns} data={data} />
        </>
    )
}

export default TransactionTable