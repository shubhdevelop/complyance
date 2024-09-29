import React from 'react';
import { stringify } from 'csv-stringify/sync';
import { Button } from '@/components/ui/button';
import { Transaction } from './transaction-columns';
import { Log } from './log-columns';

const CsvDownloader = ({ transactions, text }: { transactions: Transaction[] | Log[], text: string }) => {
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
        <div>
            <Button onClick={downloadTransactionsCSV}>
                {text}
            </Button>
        </div>
    );
};

export default CsvDownloader;
