import { Button } from "@/components/ui/button"
import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"



export type Log = {
    createdAt: string;
    createdBy: string;
    content: string;
    withRole: string;
    type: string;
    email: string,
}


export const columns: ColumnDef<Log>[] = [
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
        accessorKey: "type",
        header: "Log Type",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("type")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className="text-left"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
    {
        accessorKey: "content",
        header: () => <div className="text-left">Content</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("content")}</div>
        },
    },
    {
        accessorKey: "createdBy",
        header: ({ column }) => {
            return (
                <div className="text-left">

                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created By
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left ml-3font-medium">{row.getValue("createdBy")}</div>
        },
    },
    {
        accessorKey: "withRole",
        enableHiding: false,
        header: () => <div className="ml-5 text-left">With Role</div>,
        cell: ({ row }) => {
            return (
                <div className=' ml-5 flex gap-2'>
                    {row.getValue("withRole")}
                </div>
            )
        },
    },
]