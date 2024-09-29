import { Button } from "@/components/ui/button"
import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import toast from "react-hot-toast"


export type Transaction = {
    _id: string
    amount: number
    status: "PENDING" | "APPROVED" | "REJECTED",
    createdBy: string,
}

export const normalColumns: ColumnDef<Transaction>[] = [
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
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
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button className="text-left"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left ml-3font-medium">{row.getValue("createdAt")}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="ml-5 text-left">Action</div>,
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <div className=' ml-5 flex gap-2'>
                    {row.getValue("status") === "PENDING" ?
                        <>
                            <Button className='bg-green-600'
                                onClick={() => {
                                    patchTransaction(`api/transactions/${transaction._id}/approve`, "approved")
                                }}
                            >
                                Approve
                            </Button>
                            <Button
                                className='bg-red-600' onClick={() => {
                                    patchTransaction(`api/transactions/${transaction._id}/reject`, "rejected")
                                }}
                            >
                                Reject
                            </Button>
                        </> : <p className="text-gray-500">
                            {row.getValue("status")}
                        </p>


                    }
                </div>
            )
        },
    },
]

export const empColumns: ColumnDef<Transaction>[] = [
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
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
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button className="text-left"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left ml-3font-medium">{row.getValue("createdAt")}</div>
        },
    },
]


async function patchTransaction(url: string, type: "approved" | "rejected") {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // This is important for including cookies (session)
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Error ${type} transaction! ${errorData.message}`)
        }

        const result = await response.json();
        if (result) {
            toast.success(`Transaction ${type} succesfully!`)
        }
    } catch (error) {
        toast.error("Error updating transaction!")
        console.error('Error updating transaction:', error);
    }
}