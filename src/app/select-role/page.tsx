"use client"


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function SelectRole() {
    const { status } = useSession();
    if (status !== "authenticated") redirect("/sign-up")
    const [role, setRole] = useState("EMPLOYEE");
    const router = useRouter()
    async function updateRole(role: string) {
        try {
            const response = await fetch('/api/users/self', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: role }),
                credentials: 'include', // This is important for including cookies (session)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update Role transaction');
            }

            router.push("/app")

        } catch (error) {
            console.error('Error Updating role:', error);
            throw error;
        }
    }


    const handleSignup = async () => {
        await updateRole(role);
    };

    return (
        <div className='border-[.7px] shadow-xl gap-3 mt-24 h-[500px] w-[300px] md:h-[500px] md:w-[700px] ml-auto mr-auto rounded-xl flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='font-extrabold underline underline-offset-2 text-xl'>Select Role</h1>
                <div className='flex flex-col md:flex-row gap-3 text-lg '>
                    <div className={`${role === "EMPLOYEE" ? "bg-gray-400 text-white" : ""} border-[.7px] px-4 py-2 cursor-pointer rounded-md`} onClick={() => setRole("EMPLOYEE")}>Employee</div>
                    <div className={`${role === "MANAGER" ? "bg-gray-400 text-white" : ""} border-[.7px] px-4 py-2 cursor-pointer rounded-md`} onClick={() => setRole("MANAGER")}>Manager</div>
                    <div className={`${role === "ADMIN" ? "bg-gray-400 text-white" : ""} border-[.7px] px-4 py-2 cursor-pointer rounded-md`} onClick={() => setRole("ADMIN")} >Admin</div>
                </div>
            </div>
            <div className='border-[.7px] px-3 py-2 w-36 text-center rounded-md items-center gap-2 cursor-pointer bg-gray-900 text-white' onClick={() => handleSignup()}>Select Role</div>

            <p className="text-sm text-muted-foreground text-center mt-6">Just for sake of demonstration, we allowing users to change role <br /> Ideally flow is we only let user to select role once, <br /> after that on some approval</p>
        </div >
    );
}
