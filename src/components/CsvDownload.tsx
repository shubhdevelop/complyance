import React from 'react';
import { stringify } from 'csv-stringify/sync';
import { Button } from '@/components/ui/button';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CsvDownloader = ({ transactions, text }: { transactions: any[], text: string }) => {
    const downloadTransactionsCSV = () => {
        // Convert transactions to CSV string
        const csvString = stringify(transactions, {
            header: true,
            columns: Object.keys(transactions[0])
        });

        // Create a Blob with the CSV data
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'transactions.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='mt-2'>
            <Button onClick={downloadTransactionsCSV}>
                {text}
            </Button>
        </div>
    );
};

export default CsvDownloader;
