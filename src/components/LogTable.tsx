import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
import { columns } from './log-columns'
import CsvDownloader from './CsvDownload';

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
        <>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>AUDIT LOGS ({data.length})</h1> <CsvDownloader transactions={data} />
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default LogTable