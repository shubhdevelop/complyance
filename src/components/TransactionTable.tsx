import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
import { columns } from './transaction-columns'

export type Transaction = {
    id: string
    amount: number
    status: "PENDING" | "APPROVED" | "REJECTED",
    createdBy: string,
}

function TransactionTable() {
    const [data, setData] = useState([]);

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
            console.error('Error Fetching transaction:', error);
            throw error;
        }
    }

    useEffect(() => {
        getTransaction()
    }, [setData])

    return (
        <>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>TRANSACTIONS ({data.length})</h1>
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default TransactionTable