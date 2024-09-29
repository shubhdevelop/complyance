import { DataTable } from './DataTable'
import { columns, Log } from './log-columns'
import CsvDownloader from './CsvDownload';
import React from 'react';


interface DataTableProps<TData> {
    data: TData[]
}

function LogTable({ data }: DataTableProps<Log>) {
    return (
        <>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>AUDIT LOGS ({data.length})</h1> <CsvDownloader transactions={data} text={"Download All Logs"} />
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default LogTable