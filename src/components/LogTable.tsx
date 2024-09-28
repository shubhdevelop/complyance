import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
import { columns } from './log-columns'

function LogTable() {
    const [data, setData] = useState([]);

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
            console.log(result.logs);
            setData(result.logs)
        } catch (error) {
            console.error('Error Fetching transaction:', error);
            throw error;
        }
    }

    useEffect(() => {
        getLogs()
    }, [setData])

    return (
        <DataTable columns={columns} data={data} />
    )
}

export default LogTable