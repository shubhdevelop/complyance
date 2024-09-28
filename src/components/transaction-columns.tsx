import { Button } from "@/components/ui/button"
import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"


export type Transaction = {
    id: string
    amount: number
    status: "PENDING" | "APPROVED" | "REJECTED",
    createdBy: string,
}
export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "createdBy",
        header: ({ column }) => {
            return (
                <Button className="text-left"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created By
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left ml-3font-medium">{row.getValue("createdBy")}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="ml-5 text-left">Action</div>,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <div className=' ml-5 flex gap-2'>
                    <Button className='bg-green-600'
                        onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                        Approve
                    </Button>
                    <Button
                        className='bg-red-600' onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                        Reject
                    </Button>
                </div>
            )
        },
    },
]