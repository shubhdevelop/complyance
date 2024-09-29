"use client"

import { createTransactionSchema } from "@/schemas/createTransactionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export function TransactionFrom() {


    async function createTransaction(transactionData: { amount: number, description: string }) {
        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
                credentials: 'include', // This is important for including cookies (session)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create transaction');
            }

            const result = await response.json();
            return result.transaction;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }

    // const { reset } = useForm()


    const form = useForm<z.infer<typeof createTransactionSchema>>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            amount: 0,
            description: "",
            type: "",
        },
    })

    async function onSubmit(values: z.infer<typeof createTransactionSchema>) {
        try {
            await createTransaction(values);
            toast.success("Transaction submitted succesfully!")
            form.reset({
                amount: 0,
                description: "",
                type: "",
            });
        } catch (err) {
            toast.error("Error submitting form");
            console.log(err);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="amount" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormDescription>
                                Enter Your Amount!
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide Some description
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input placeholder="type" {...field} />
                            </FormControl>
                            <FormDescription>
                                Give your Transaction type
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}


